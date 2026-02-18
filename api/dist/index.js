import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
const app = new Hono();
const port = Number(process.env.PORT ?? '3000');
app.get('/ping', (c) => {
    return c.text('pong');
});
serve({
    fetch: app.fetch,
    port
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
