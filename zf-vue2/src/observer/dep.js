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
  }
}

export default Dep
