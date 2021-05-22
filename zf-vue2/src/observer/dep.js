/**
 * 每个属性我都给它分配一个dep dep可以存放watcher 一个属性对应100个watcher vuex 中一个数据状态
 * 可以在多个组件中使用 事实上这种场景就是上面所说的。
 * 同样的watcher中可以存放多个dep
 *
 * 假如我有100个组件，我就有100watcher
 */
let id = 0
class Dep {
  constructor() {
    this.id = id++
    this.subs = [] // 用来存放watcher的
  }
  depend() {
    // 走到这个函数的时候 dep.target 已经存在
    if (Dep.target) {
      // Dep.target 就是 watcher 这相当于
      // watcher 上面有一个方法 addDep 把当前的 dep 存进watcher
      Dep.target.addDep(this)
    }
  }
  addSub(watcher) {
    this.subs.push(watcher)
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update())
  }
}
// 静态属性
Dep.target = null

export function pushTarget(watcher) {
  Dep.target = watcher
}

export function popTarget() {
  Dep.target = null
}

export default Dep
