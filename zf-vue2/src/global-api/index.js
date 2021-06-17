import { mergeOptions } from "../utils"

export function initGlobalApi(Vue) {
  Vue.options = {} // 用来存放全局的配置,每一个组件初始化的时候都会和options选项进行合并
  // vue.component
  // vue.filter
  // vue.directive
  Vue.mixin = function (options) {
    // 将用户通过mixin 传递进来的选项和 全局的配置做合并
    // 这里的this指的就是vue 后期可能是子组件
    this.options = mergeOptions(this.options, options)
    return this // 方面链式调用
  }
}
