import { initState } from "./state"
// 将构造函数通过参数传递进去
export function initMixin(Vue) {
  // 扩展原型上的方法
  Vue.prototype._init = function (options) {
    // 原型方法中的this指向实例 所有的实例 都具有这些方法
    const vm = this
    // 用户传递进来的选项挂载到上面
    vm.$options = options
    // 初始化状态
    initState(vm)
  }
}
