import { patch } from "./vdom/patch"
import Watcher from "./observer/watcher"
import { nextTick } from "./utils"

export function lifecycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    // 这个方法既在初始化的时候调用，也会在更新的情况下调用
    const vm = this
    vm.$el = patch(vm.$el, vnode)
  }
  // 用户自己调用的nextTick 也是这个方法
  Vue.prototype.$nextTick = nextTick
}

export function mountComponent(vm, el) {
  // 更新函数 数据变化后，会再次调用这个函数
  let updateComponent = () => {
    // 在这个函数的内部核心只做了两件事情:
    //    1、调用render方法生成虚拟dom
    //    2、使用render方法渲染真实的dom
    // 后续更新可以调用 updateComponent 这个方法
    // 这里有一个细节需要注意, 在调用render的时候，会从vm上取值，必然触发 vm 上属性的get操作
    vm._update(vm._render())
  }
  // 第一次渲染的时候先调用一次
  // vue中视图更新是通过观察者模式实现的
  // 属性:  被观察者  观察者:刷新页面
  // 第一个参数是vm: 当前的实例
  // 第二个参数是更新方法，也就是 updateComponent 这个方法
  // 第三个参数是回调函数,就是更新完毕之后，需要执行的函数
  // 第四个参数 是一个标识，代表的是渲染watcher
  /**
   * true 渲染watcher 说明还有其他 watcher
   * 进行渲染的时候会创建一个watcher
   * 有了watcher 之后 我们希望属性能和watcher有一个关联
   */
  new Watcher(
    vm,
    updateComponent,
    () => {
      console.log("我更新了")
    },
    true
  )
}

/**
 * 当生命周期的钩子已经收集完毕之后
 * 需要进行调用操作
 */
export function callHook(vm, hook) {
  let handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0; i < handlers.length; i++) {
      handlers[i].call(vm)
    }
  }
}
