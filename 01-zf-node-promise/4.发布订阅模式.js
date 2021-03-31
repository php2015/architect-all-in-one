// 发布订阅模式 是先订阅 然后再发布 主要的目的是解耦

const fs = require("fs")
const path = require("path")

let events = {
  _events: [],
  on(fn) {
    this._events.push(fn)
  },
  emit(data) {
    // 这里遍历数组 将data 传递给fn
    this._events.forEach((fn) => fn(data))
  },
}

// on 函数接收回调函数
events.on(() => {
  console.log("每读取一次就触发一次")
})

let arr = []
events.on((data) => {
  arr.push(data)
})

events.on(() => {
  if (arr.length === 2) {
    console.log("读取完毕", arr)
  }
})

fs.readFile(path.resolve(__dirname, "a.txt"), "UTF8", function (err, data) {
  events.emit(data)
})

fs.readFile(path.resolve(__dirname, "b.txt"), "UTF8", function (err, data) {
  events.emit(data)
})
