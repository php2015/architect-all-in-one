/**
 * 每个属性我都给它分配一个 dep dep可以存放watcher
 * 一个属性如果对应100个watcher (vuex中一个state可能在很多个页面中使用)
 * 同样的 watcher中可能存在多个属性, 因为每个属性都给他分配了一个dep 所以watcher中可能存在多个dep
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
