const fs = require("fs")
const path = require("path")

function after(times, callback) {
  let arr = []
  return (data) => { // 这个函数就是out 是after 执行之后返回的函数
    arr.push(data)
    if (--times === 0) { // 多个请求并发 需要计数器实现
      callback(arr)
    }
  }
}

let out = after(2, (arr) => { // callback
  console.log(arr)
})

// console.log(path.resolve(__dirname, "a.txt"))
fs.readFile(path.resolve(__dirname, "a.txt"), "UTF8", function (err, data) {
  out(data)
})

fs.readFile(path.resolve(__dirname, "b.txt"), "UTF8", function (err, data) {
  out(data)
})
