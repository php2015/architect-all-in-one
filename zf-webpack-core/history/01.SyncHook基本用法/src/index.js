// 因为webpack源码中使用了tapable这个模块,所以在依赖中已经安装了
let { SyncHook } = require("tapable")

// 首先创建一个类
class lesson {
  constructor() {
    this.hooks = {
      // 将同步钩子赋值给类中的archkey
      arch: new SyncHook(["name"]),
    }
  }
  // 注册监听函数
  tap() {
    this.hooks.arch.tap("node", function (name) {
      console.log("node", name)
    })
    this.hooks.arch.tap("react", function (name) {
      console.log("react", name)
    })
  }
  start() {
    this.hooks.arch.call("louis")
  }
}

let l = new lesson()
l.tap() // 注册这两个事件
l.start() // 启动钩子
