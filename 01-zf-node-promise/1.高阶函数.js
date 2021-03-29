// 高阶函数的概念：1、一个函数返回一个函数 2. 一个函数的可以接收一个函数作为参数
// 这两个条件满足任何一个即可 prmise 内部也是使用回调去做的

// 高阶函数有什么应用 扩展方法
function core() {
  // 核心代码
  // .....
  console.log("core")
  // .....
}

// 给core函数增加一些额外的逻辑 但是不能更改核心代码
Function.prototype.before = function (cb) {
  return () => {
    cb()
    this()
  }
}
let newCore = core.before(() => {
  console.log("before")
})
// 调用这个函数
newCore()
