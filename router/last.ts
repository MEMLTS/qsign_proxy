import Router from "@koa/router";
import { type Context } from "koa";
const router = new Router();
import { forwardToSignService } from "@util/forward";

function makeResponse() {
    const response = forwardToSignService("last",{});
    return { "status": "success", "data": response };
}

router.get("/last", async (ctx: Context) => {
    ctx.body = makeResponse();
});

router.post("/last", async (ctx: Context) => {
    ctx.body = makeResponse();
});

export default router;
