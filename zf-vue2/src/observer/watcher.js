let id = 0;

class Watcher {
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.cb = cb
    this.options = options
    this.id = id++
    this.getter = exprOrFn
    this.get(); // new Watcher 的时候就会执行这个方法 这个方法实际上就会对于传递进来的函数做了一层包装 

  }
  // 默认应该让exprOrFn执行 就是updateComponent这个方法 render 去vm上取值 每次取的都是新的值
  get() {
    // 每个属性都能收集自己的watcher
    // 当我们执行 这个get方法的时候 会从defineProperty 执行get方法
    // 每个属性都可以收集自己的watcher
    // 一个组件有100个属性，那这100个属性都是属于这一个watcher的
    // 我希望一个属性可以对应多个watcher  同时一个watcher可以对应多个属性
    this.getter(); // 走到这个函数的时候 会从vm上取值，因为data上的属性已经被响应式了 会触发get方法
  }
}

export default Watcher
