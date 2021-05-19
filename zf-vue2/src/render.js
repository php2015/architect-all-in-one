export function renderMixin(Vue) {
  Vue.prototype._render = function () {
    const vm = this;
    let render = vm.$options.render; // 这个render 就是我们解析出来的render方法 同时也有可能是用户自己写的render
    
    let vnode = render.call(vm);

    return vnode
  }
}
