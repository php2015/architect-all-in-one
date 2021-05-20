import { patch } from "./vdom/patch";
import Watcher from "./observer/watcher";

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    // 这个方法既在初始化的时候调用，也会在更新的情况下调用
    const vm = this;
    vm.$el = patch(vm.$el, vnode)
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
  // vue中视图更新是通过观察者模式实现的
  // 属性是被观察者  观察者的作用是刷新页面
  // updateComponent()
  // 第一个参数是vm,当前的实例 第二参数是更新方法 第三个参数是回调函数
  /**
   * true 渲染watcher 说明还有其他watcher
   * 进行渲染的时候会创建一个watcher
   */
  new Watcher(vm, updateComponent, ()=>{
    console.log('我更新了');
  },true)
}
