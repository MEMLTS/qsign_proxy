import Router from "@koa/router";
import { type Context } from "koa";
import { cmd_whitelist } from "@config/cmd_whitelist";
const router = new Router();

function makeWhitelist() {
  return {
    code: 0,
    msg: "女大口算签名，慎用",
    data: {
      list: cmd_whitelist,
    },
  };
}

router.get("/cmd_whitelist", async (ctx: Context) => {
    ctx.body = makeWhitelist();
});

router.post("/cmd_whitelist", async (ctx: Context) => {
    ctx.body = makeWhitelist();
});

export default router;
