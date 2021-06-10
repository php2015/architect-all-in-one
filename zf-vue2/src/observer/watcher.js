import { popTarget, pushTarget } from "./dep"
import { queueWatcher } from "./scheduler"

let id = 0

class Watcher {
  /**
   * @param {*} vm 
   * @param {*} exprOrFn 表达式或者是个函数
   * @param {*} cb 
   * @param {*} options 
   */
  constructor(vm, exprOrFn, cb, options) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    this.cb = cb
    this.options = options
    // 每 new 一次 watcher 这个id 就会累加
    this.id = id++
    this.getter = exprOrFn
    this.deps = []
    // 每一个属性对应的是一个dep 这个我其实有点理解不了
    this.depsId = new Set()
    // new Watcher 的时候就会执行这个get方法 
    // 而这个get方法执行实际上就是我们传递进来 updateComponent 函数 执行
    this.get()
  }
  // 默认应该让exprOrFn执行 就是updateComponent这个方法 render 去vm上取值 每次取的都是新的值
  get() {
    // 在执行取值之前，先把这个watcher放进dep的target属性上
    pushTarget(this)
    // 每个属性都能收集自己的watcher
    // 当我们执行 这个get方法的时候 会从defineProperty 执行get方法
    // 每个属性都可以收集自己的watcher
    // 每个组件都拥有一个渲染watcher 组件有100个属性，那这100个属性都是属于这一个渲染watcher的
    // 对于vuex的使用场景来说，一个state 会在多个页面中用到，那这一个属性 对应的是多个 watcher
    // 当这个state变化了，是需要通知多个watcher一起更新的

    // 走到这个函数的时候 会从vm上取值，因为data上的属性已经被响应式了 会触发get方法
    this.getter()

    // 如果用户在模板外面取值，我们是不需要依赖收集的，此时清空
    popTarget()
  }
  update() { 
    // this.get()
    // 对于多次修改属性的情况，我们只希望执行一次更新的操作，这种情况下
    // 最好的就是对watcher做一个防抖的控制 限制它的更新频率
    // 多次调用watcher 我希望缓存起来，等一下一起更新
    // 所以说 vue中的更新操作是异步的
    queueWatcher(this);
  }
  run() {
    this.get();
  }
  addDep(dep) {
    // 同一个属性在响应式的时候 有一个id属性
    // 将这个id取出来
    let id = dep.id
    // 这里使用的set去重
    if (!this.depsId.has(id)) {
      // id 不存在 就将这个dep id 放进去
      this.depsId.add(id)
      // 然后将dep放进去  在页面中 可能使用多个属性 age name xxx
      // 一个watcher 存放多个dep
      this.deps.push(dep)
      // 同样的 需要在dep中存放watcher （其实这里并不是很明白 为什么要让dep记住watcher ）
      // 想想 vuex中的例子就知道了 dep 记录所有的 watcher
      dep.addSub(this)
    }
  }
}

export default Watcher
