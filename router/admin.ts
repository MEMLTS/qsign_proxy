import Router from "@koa/router";
import { config } from "@config/config";
import Redis from "@lib/Redis";
import { type Context } from "koa";

const router = new Router();

function validateToken(ctx: Context) {
  const token = ctx.headers["x-token"];
  if (token !== config.admin.token) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
    return false;
  }
  return true;
}

router.get("/admin/get_sign_count_list", async (ctx: Context) => {
  if (!validateToken(ctx)) return;
  ctx.body = await Redis.getHash("sign:count");
});

router.get("/admin/get_sign_count", async (ctx: Context) => {
  if (!validateToken(ctx)) return;
  const uin = ctx.query.uin;
  if (!uin) {
    ctx.status = 400;
    ctx.body = "Bad Request";
    return;
  }
  ctx.body = await Redis.getHashField("sign:count", String(uin));
});

router.get("/admin/get_uin_cmd_count", async (ctx: Context) => {
  if (!validateToken(ctx)) return;
  const uin = ctx.query.uin;
  if (!uin) {
    ctx.status = 400;
    ctx.body = "Bad Request";
    return;
  }
  ctx.body = await Redis.getHash(`sign:count:${uin}`);
});

router.get("/admin/get_run_time", async (ctx: Context) => {
  if (!validateToken(ctx)) return;
  ctx.body = {
    runTime: process.uptime(),
  };
});

router.get("/admin/del_sign_count", async (ctx: Context) => {
  if (!validateToken(ctx)) return;
  if (!ctx.query.uin) {
    ctx.status = 400;
    ctx.body = "Bad Request";
    return;
  }
  if (!(await Redis.exists(`sign:count:${ctx.query.uin}`))) {
    ctx.body = {
      status: 1,
    };
    return;
  }
  const res = await Redis.delHashField(`sign:count`, ctx.query.uin as string);
  ctx.body = {
    status: res,
  };
});

export default router;
