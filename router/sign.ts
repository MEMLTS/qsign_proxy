import Router from "@koa/router";
import koa from "koa";

const router = new Router();

router.get('/sign', (ctx) => {
    ctx.body = 'Hello World!';
});

router.post('/sign', (ctx) => {
    ctx.body = 'Hello World!';
});

export default router;