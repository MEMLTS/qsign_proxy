import Router from "@koa/router";
import { type Context } from "koa";
import { cmd_blacklist } from "@config/cmd_black";
const router = new Router();

function makeWhitelist() {
  return {
    code: 0,
    msg: "女大口算签名，慎用",
    data: {
      list: cmd_blacklist,
    },
  };
}

router.all("/cmd_whitelist", async (ctx: Context) => {
    ctx.body = makeWhitelist();
});

export default router;
