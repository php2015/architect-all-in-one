import { createElement, createTextElement } from "./vdom/index"

export function renderMixin(Vue) {
  Vue.prototype._c = function () {
    // createElement
    return createElement(this, ...arguments)
  }
  Vue.prototype._v = function (text) {
    // createTextElement
    return createTextElement(this, text)
  }
  Vue.prototype._s = function (val) {
    if (typeof val === "object") {
      return JSON.stringify(val)
    }
    return val
  }
  Vue.prototype._render = function () {
    const vm = this
    let render = vm.$options.render // 这个render 就是我们解析出来的render方法 同时也有可能是用户自己写的render

    let vnode = render.call(vm)

    return vnode
  }
}
