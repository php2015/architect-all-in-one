class SyncHook {
  constructor(args) {
    // 参数是一个数组 ['name']
    this.tasks = []
  }

  // 根据在index.js 中的使用可以看出来 包含的是两个方法 tap:注册  还有一个方法是 call
  tap(name, task) {
    // 将将所有的函数都存放起来
    this.tasks.push(task)
  }
  call(...args) {
    console.log(...args) // louis 18 
    this.tasks.forEach((task) => task(...args))
  }
}

let hook = new SyncHook(["name"])
// 调用tap的时候，就是需要将函数放进一个数组中
hook.tap("react", function (name, age) {
  console.log("react", name)
})
hook.tap("node", function (name,age) {
  console.log("node", name)
})
hook.call('louis',18)
