import Router from "@koa/router";
import { type Context } from "koa";
const router = new Router();

function makeResponse() {
  return {
    msg: "IAA 云天明 章北海 Genshin自用签名 无白名单",
    tip: "女大口算签名,欢迎使用,交流群:323262505",
    code: 0,
    data: {
      protocol: {
        code: "1029",
        package_name: "com.tencent.mobileqq",
        qua: "V1_AND_SQ_9.1.90_10290_YYB_D",
        version: "9.1.90",
      },
      instances: ["0c21-5", "0c21-4"],
      version: "11.45.14",
      support: ["9.1.90"],
    },
  };
}

router.get("/", async (ctx: Context) => {
  ctx.body = makeResponse();
});

router.post("/", async (ctx: Context) => {
  ctx.body = makeResponse();
});

router.get("/energy", async (ctx: Context) => {
  ctx.body = makeResponse();
});

router.post("/energy", async (ctx: Context) => {
  ctx.body = makeResponse();
});

export default router;
