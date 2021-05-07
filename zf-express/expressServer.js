const express = require("./express")

const app = express()

app.get("/",function(req,res)  {
  res.end("home")
})

app.get("/login",function(req,res)  {
  res.end("login")
})
// 匹配所有，上面的路由都匹配不到，就会走到这里
// app.all("*",function(req,res)  {
//   res.end("404")
// })

app.listen(3000)