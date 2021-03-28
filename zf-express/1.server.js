// 内部不是es6的写法 都是基于回调的处理
const express = require("express")

const app = express()

app.get("/",function(req,res)  {
  res.end("/")
})

app.get("/hello",function(req,res)  {
  res.end("/hello")
})

app.all("*",function(req,res)  {
  res.end("404")
})

app.listen(3000)