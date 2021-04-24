// node中的事件环分为几个部分
// timers 这个部分主要存放一些定时器相关的代码 比方 setTimeOut setInterval()
// pending callbacks 这个暂时不用关心，就是当前一轮任务没有完成会放在这个里面
// idle prepare 仅系统内部调用
// poll 检索新的 I/O 事件;执行与 I/O 相关的回调， 几乎所有情况下，除了关闭的回调函数，那些由计时器和 setImmediate() 调度的之外），其余情况 node 将在适当的时候在此阻塞。
// check setImmediate() 回调函数在这里执行。
// close 一些关闭的回调函数，如：socket.on('close', ...)。

// 针对 poll 这个流程，有这样的一个过程
// 首先会执行这个异步io操作
// 执行 完毕之后，会清空check队列
// 如果check 队列清空了之后定时器还是没有到时间
// 会继续回到poll，直到定时器到了时间之后，再继续清空timers

// 举一个例子
const fs = require("fs")
const path = require("path")
// console.log(path.resolve(__dirname))
fs.readFile(path.resolve(__dirname) + "/note.md", (err, data) => {
  if (err) return console.error(err)
  console.log('data')
  setTimeout(() => {
    console.log("settimeout");
  },0);

  setImmediate(()=>{
    console.log("setImmediate");
  })
})
// data
// setImmediate
// settimeout
