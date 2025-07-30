import Router from "@koa/router";
import { type Context } from "koa";
import { forwardToSignService } from "@util/forward";
import Redis from "@lib/Redis";
import { config } from "@config/config";
import { cmd_whitelist } from "@config/cmd_whitelist";
import { cmd_blacklist } from "@config/cmd_black";

const router = new Router();

async function handleSignRequest(ctx: Context, data: any) {
  try {
    const payload = {
      seq: data.seq,
      uin: data.uin,
      buffer: data.buffer,
      cmd: data.cmd,
    };

    switch (config.sign.cmd) {
      case "whitelist":
        if (!cmd_whitelist.includes(data.cmd)) {
          ctx.status = 403;
          ctx.body = {
            code: 403,
            msg: "cmd not allowed",
          };
          return;
        }
        break;
      case "blacklist":
        if (cmd_blacklist.includes(data.cmd)) {
          ctx.status = 403;
          ctx.body = {
            code: 403,
            msg: "cmd not allowed",
          };
          return;
        }
        break;
    }

    const response = await forwardToSignService("sign", payload);
    ctx.status = response.status;
    ctx.body = {
      code: 0,
      status: "success",
      data: response.data,
    };
    try {
      await Redis.incrementHashField("sign:count", data.uin.toString(), 1);
      await Redis.incrementHashField(`sign:count:${data.uin}`, data.cmd, 1);
    } catch (error) {
      Logger.error(error);
    }
  } catch (error: any) {
    Logger.error("Sign service error:", error.message);
    if (error.response) {
      ctx.status = error.response.status;
      ctx.body = error.response.data;
    } else if (error.request) {
      ctx.status = 502;
      ctx.body = {
        error: "Sign service unavailable",
        message: "Failed to connect to sign service",
      };
    } else {
      ctx.status = 500;
      ctx.body = {
        error: "Internal server error",
        message: error.message,
      };
    }
  }
}

router.get("/sign", async (ctx: Context) => {
  await handleSignRequest(ctx, ctx.query);
});

router.post("/sign", async (ctx: Context) => {
  await handleSignRequest(ctx, ctx.request.body || {});
});

export default router;
