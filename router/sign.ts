import Router from "@koa/router";
import { type Context } from "koa";
import { forwardToSignService } from "@util/forward";

const router = new Router();

function buildSignPayload(data: any): any {
    return {
        seq: data.seq,
        uin: data.uin,
        buffer: data.buffer,
        cmd: data.cmd
    };
}

function makeResponse(data: any): any {
    return {
        code: 0,
        status: "success",
        data: data
    };
}


function handleSignError(ctx: Context, error: any): void {
    Logger.error('Sign service error:', error.message);
    if (error.response) {
        ctx.status = error.response.status;
        ctx.body = error.response.data;
    } else if (error.request) {
        ctx.status = 502;
        ctx.body = {
            error: 'Sign service unavailable',
            message: 'Failed to connect to sign service'
        };
    } else {
        ctx.status = 500;
        ctx.body = {
            error: 'Internal server error',
            message: error.message
        };
    }
}

router.get('/sign', async (ctx: Context) => {
    try {
        const payload = buildSignPayload(ctx.query);
        const response = await forwardToSignService("sign", payload);
        ctx.status = response.status;
        ctx.body = makeResponse(response.data);
    } catch (error: any) {
        handleSignError(ctx, error);
    }
});

router.post('/sign', async (ctx: Context) => {
    try {
        const payload = buildSignPayload(ctx.request.body || {});
        const response = await forwardToSignService("sign", payload);
        ctx.status = response.status;
        ctx.body = makeResponse(response.data);
    } catch (error: any) {
        handleSignError(ctx, error);
    }
});

export default router;