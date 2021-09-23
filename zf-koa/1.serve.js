// 引用koa 默认情况下，会去 node_modules 里面寻找
// 找到koa 这个包 里面的package.json 文件中的main 字段对应的
// 就是入口位置。
const Koa = require("koa")

// 使用 koa 创建一个应用实例
const app = new Koa()

// ctx: 当前执行的上下文,ctx中扩展了请求和响应的方法
// 
app.use((ctx,next) => {
  ctx.body = "hello koa"
})

app.listen(3000, function () {
  console.log(`serve start 3000`)
})
