# custom-element

このディレクトリは、Vite のプロキシ機能を利用して CORS に対応するためのフロントエンド実装です。

## CORS 対応の考え方

開発時は `vite.config.ts` の `server.proxy` を使い、
フロントエンドからの `/api` リクエストを API サーバー（`http://localhost:3000`）へ転送します。

これによりブラウザから見ると同一オリジン経由の通信となり、
開発時の CORS 問題を回避できます。

## 設定の要点

- `/api` を API サーバーへプロキシ
- `rewrite` で `/api` プレフィックスを除去して API へ転送
