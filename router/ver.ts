import Router from "@koa/router";
import { type Context } from "koa";
const router = new Router();

function makeResponse() {
    return {
        "code": 0,
        "msg": "success",
        "data": {
            "com.tencent.mobileqq": [
                "9.1.90"
            ]
        },
        "tip": "女大口算签名，有时候会算错，慎用"
    };
}

router.get("/ver", async (ctx: Context) => {
    ctx.body = makeResponse();
});

router.post("/ver", async (ctx: Context) => {
    ctx.body = makeResponse();
});

export default router;
