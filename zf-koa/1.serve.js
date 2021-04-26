const Koa = require('koa')

// 使用koa 创建一个应用实例
const app = new Koa();

app.use((ctx)=>{
  ctx.body = 'hello'
})

app.listen(3000,function() {
  console.log(`serve start 3000`);
})