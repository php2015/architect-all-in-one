import { initState } from "./state"

/**
 * 将构造函数作为参数传递进去，对构造函数进行扩展，
 * 这里使用了在构造函数的原型上进行扩展的方式，所有的组件实例均可以共享
 * 表示在vue的基础上做一次混合操作 
 * 这种设计思想也是非常值得借鉴的。
 * @param {*} Vue 
 */
export function initMixin(Vue) {
  // 扩展原型上的方法
  Vue.prototype._init = function (options) {
    // 原型方法中的this指向实例 所有的实例 都具有这些方法
    // 这里用vm表示this的引用比较方便识别。假设在这个函数中
    // 直接有一个函数声明，函数声明中的this就不好说是谁了。
    // 但是可以在函数中使用vm,这个就特别类似于 var that = this 那种写法
    const vm = this
    // 用户传递进来的选项挂载到上面,我们能够操作 vm.$options
    vm.$options = options
    // 初始化状态 为什么要有这个 函数 不仅仅是 有watch
    // 还有computed props data 我们需要有一个统一的函数
    // 来处理这些参数。
    initState(vm)
  }
}
