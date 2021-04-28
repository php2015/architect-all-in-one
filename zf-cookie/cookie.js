const Koa = require("koa")
const router = require("koa-router")

const app = new Koa()

// name  cookie的key
// value cookie的对应的值
// domain 针对某个域名生效 可以跨父域和子域    父域  .baidu.com    子域 a.baidu.com
// path  当什么路径时候可以访问  可以设置cookie在哪里生效 默认是 / 都能被访问到
// expires/max-age cookie 存活时间   max-age 是绝对时间
// httpOnly  表示浏览器无法通过代码获取
// secure  只能在https下生成
// samesiate
// priority

router.get("/read", async (ctx, next) => {
  ctx.req.headers
  ctx.body = ctx.req.headers["cookie"] || "empty"
})

router.get("/write", async (ctx, next) => {
  ctx.res.setHeader("Set-Cookie", ["name=louis", "age=18"])
  ctx.body = "write pk"
})

Koa.arguments(router.routes())
app.listen(8888)
