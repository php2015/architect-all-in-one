import { observe } from "./observer/index.js"
import { proxy } from "./utils"
import Watcher from "./observer/watcher"

export function stateMixin(Vue) {
  /**
   *
   * @param {*} key
   * @param {*} handler
   * @param {*} options 可以接收用户传参立即调用
   */
  Vue.prototype.$watch = function (key, handler, options = {}) {
    options.user = true // 标识是用户自己写的watcher
    /**
     * 原型上的方法  this指向当前实例
     */
    new Watcher(this, key, handler, options)
  }
}

/**
 * 初始化数据处理函数 接收的参数是vm实例了
 * 因为很多组件的实例都是需要进行初始数据的
 * @param {*} vm
 */
export function initState(vm) {
  // 还记得在 init.js 中将用户传递的 options 赋值给 vm.$options
  // 这里可以直接取出来使用了
  const opts = vm.$options
  if (opts.props) {
    initProps(vm)
  }
  if (opts.methods) {
    initMethod(vm)
  }
  if (opts.data) {
    // 初始化data
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm, opts.computed)
  }
  if (opts.watch) {
    initWatch(vm, opts.watch)
  }
}
/**
 * 这个函数专门用来处理用户传递进来的data
 * 我们写过vue的都知道，这个data中一般存放的都是页面
 * 中用于显示的响应式数据 比方说一些 tableList 还是一些展示标志位
 * @param {*} vm
 */
function initData(vm) {
  let data = vm.$options.data
  // 这里使用 isFunction 工具函数判断传入的data是不是一个函数
  // 如果是一个函数就执行这个函数，但是执行时候需要绑定vm,因为我们希望在整个执行的过程中
  // this始终指向vm，也就是当前new出来的实例。
  // 使用_data 和 data 做一个关联 两者使用同一份引用地址
  vm._data = data = typeof data === "function" ? data.call(vm) : data

  for (let key in data) {
    proxy(vm, "_data", key)
  }
  // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty
  observe(data)
}
function initProps() {}
function initMethod() {}

/**
 *
 * @param {*} vm
 * @param {*} computed
 */
function initComputed(vm, computed) {
  for (let key in computed) {
    // 首先传递参数的时候 也是以对象的形式传递进来的
    // 用户定义的
    const userDef = computed[key]

    // 依赖的属性变化就是重新取值 get
    let getter = typeof userDef === "function" ? userDef : userDef.get

    // 每个计算属性本质就是watcher
    /**
     * computed 默认是不直接执行的 所以在options
     * 选项中 lazy 设置为true 不要默认执行
     */
    new Watcher(vm, getter, () => {}, { lazy: true })

    defineComputed(vm, key, userDef)
  }
}

function defineComputed(vm, key, userDef) {
  let sharedProperty = {}

  if (typeof userDef === "function") {
    sharedProperty.get = userDef
  } else {
    sharedProperty.get = userDef.get
    sharedProperty.set = userDef.set
  }
  Object.defineProperty(vm, key, sharedProperty)
}

/**
 *
 * @param {*} vm
 * @param {*} watch
 */
function initWatch(vm, watch) {
  // watch 传入的是一个对象 这里需要循环一下，拿到每一个key

  for (let key in watch) {
    let handler = watch[key]

    // 一个 属性可以接收多个回调函数，所以这里 handler 可能是个数组
    if (Array.isArray(handler)) {
      for (let i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i])
      }
    } else {
      // 如果不是一个数组，那就是一个简单的函数
      createWatcher(vm, key, handler)
    }
  }
}

/**
 * 创建watcher
 */
function createWatcher(vm, key, handler) {
  // 用户可能直接使用 vm.$watch 这种形式调用。
  // 我们需要在原型上定义 $watch 方法
  return vm.$watch(key, handler)
}
