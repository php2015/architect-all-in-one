import { initState } from "./state"

/**
 * 将构造函数通过参数传递进去
 * 表示在vue的基础上做一次混合操作 
 * 这里参数是vue也是很好理解呀
 * 最终都是想要在vue上做混合操作
 * @param {*} Vue 
 */
export function initMixin(Vue) {
  // 扩展原型上的方法
  Vue.prototype._init = function (options) {
    // 原型方法中的this指向实例 所有的实例 都具有这些方法
    const vm = this
    // 用户传递进来的选项挂载到上面,我们能够操作 vm.$options
    vm.$options = options
    // 初始化状态 为什么要有这个 函数 不仅仅是 有watch
    // 还有computed props data 我们需要有一个统一的函数
    // 来处理这些参数。
    initState(vm)
  }
}
