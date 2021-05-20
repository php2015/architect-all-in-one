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
    this.getter();
  }
}

export default Watcher
