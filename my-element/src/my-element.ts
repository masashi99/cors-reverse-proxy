import { LitElement, css, html } from 'lit'
import { customElement, state } from 'lit/decorators.js'

@customElement('my-element')
export class MyElement extends LitElement {
  @state()
  private loading = false

  @state()
  private result: 'idle' | 'success' | 'error' = 'idle'

  @state()
  private statusCode?: number

  @state()
  private responseText = ''

  @state()
  private errorMessage = ''

  render() {
    const statusLabel =
      this.result === 'idle'
        ? '未実行'
        : this.result === 'success'
          ? '成功'
          : '失敗'

    return html`
      <section class="card">
        <h1>CORS 検証</h1>
        <p class="target">GET /api/ping</p>
        <button @click=${this.checkPing} ?disabled=${this.loading}>
          ${this.loading ? '通信中...' : '疎通チェック実行'}
        </button>
        <dl>
          <div>
            <dt>結果</dt>
            <dd class=${`result ${this.result}`}>${statusLabel}</dd>
          </div>
          <div>
            <dt>HTTP Status</dt>
            <dd>${this.statusCode ?? '-'}</dd>
          </div>
          <div>
            <dt>レスポンス</dt>
            <dd><pre>${this.responseText || '-'}</pre></dd>
          </div>
          <div>
            <dt>エラー</dt>
            <dd><pre>${this.errorMessage || '-'}</pre></dd>
          </div>
        </dl>
      </section>
    `
  }

  private async checkPing() {
    this.loading = true
    this.result = 'idle'
    this.statusCode = undefined
    this.responseText = ''
    this.errorMessage = ''

    try {
      const response = await fetch('/api/ping', {
        method: 'GET',
      })
      this.statusCode = response.status
      this.responseText = await response.text()
      this.result = response.ok ? 'success' : 'error'
    } catch (error: unknown) {
      this.result = 'error'
      this.errorMessage =
        error instanceof Error ? error.message : '不明なエラーが発生しました'
    } finally {
      this.loading = false
    }
  }

  static styles = css`
    :host {
      display: block;
      max-width: 720px;
      margin: 0 auto;
      padding: 24px;
      box-sizing: border-box;
    }

    .card {
      background: #ffffff;
      border: 1px solid #d0d7de;
      border-radius: 12px;
      padding: 20px;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 24px;
    }

    .target {
      margin: 0 0 16px;
      color: #57606a;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    }

    button {
      border: none;
      border-radius: 8px;
      background: #0969da;
      color: #ffffff;
      padding: 10px 14px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }

    button:disabled {
      opacity: 0.6;
      cursor: wait;
    }

    dl {
      margin: 16px 0 0;
      display: grid;
      gap: 10px;
    }

    dt {
      font-weight: 600;
      margin-bottom: 2px;
    }

    dd {
      margin: 0;
    }

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-break: break-word;
      background: #f6f8fa;
      border-radius: 6px;
      padding: 8px;
    }

    .result.success {
      color: #1a7f37;
      font-weight: 700;
    }

    .result.error {
      color: #cf222e;
      font-weight: 700;
    }

    .result.idle {
      color: #57606a;
    }
  `
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
