export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    console.log("update")
  }
}

export function mountComponent(vm, el) {
  // 更新函数 数据变化后，会再次调用这个函数
  let updateComponent = () => {
    // 在这个函数的内部核心只做了两件事情 1、调用render方法生成虚拟dom 2、使用render方法 渲染真实的dom
    // 后续更新可以调用 updateComponent 这个方法
    // 这两个方法实例上都是具备的，说明是挂载在vue原型上面的
    vm._update(vm._render())
  }
  // 第一次渲染的时候先调用一次
  updateComponent()
}
