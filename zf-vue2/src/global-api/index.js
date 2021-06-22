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

  Vue.options._base = Vue // 无论后续创建多少个子类 都可以通过_base 找到Vue
  Vue.options.conponents = {}


  /**
   * 我们在自定义全局组件的时候，会使用这个api进行声明
   *
   */
  Vue.component = function (id, definition) {
    // 为了保证父子关系，我需要产生一个新的实例，
    // 这样做的目的是使得组件能够隔离，每个组件都会产生一个新的类
    // 去继承父类。
    definition = this.options._base.extend(definition)
    // 处理过之后 definition 就是一个类 这里做一个组件的映射表
    this.options.conponents[id] = definition

    console.log(this.options.conponents);
  }
  /**
   * 其实就是返回一个类
   * extend 方法就死产生一个继承与Vue的类
   * 并且身上有父类的功能
   */
  Vue.extend = function (opts) {
    const Super = this
    // Sub 是一个函数
    const Sub = function VueComponent() {
      this._init()
    }
    Sub.prototype = Object.create(Super.prototype)
    Sub.prototype.constructor = Sub // 原型继承
    // 只和 vue的options合并
    Sub.options = mergeOptions(Super.options, opts)
    return Sub
  }
}
