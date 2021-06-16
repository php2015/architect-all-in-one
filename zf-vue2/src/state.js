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
  // 我希望做一个关联，将key 和watcher做一个关联
  // 在vm 上面放置一个属性_computedWatchers 和 watchers 用的是同一个对象
  const watchers = (vm._computedWatchers = {})

  // 为什么这里需要循环，因为计算属性很多，我需要创建多个watcher
  // computed 有两种写法 我平时习惯使用第一中 那种get 个 set的 不经常使用
  for (let key in computed) {
    // 首先传递参数的时候 也是以对象的形式传递进来的
    // 用户定义的
    const userDef = computed[key]

    // 依赖的属性变化就是重新取值
    // 这里做个简单的判断，如果是函数，那当前这个函数就是getter
    // 如果是对象 对象的get 方法就是要的那个值
    let getter = typeof userDef === "function" ? userDef : userDef.get

    /**
     * 感觉watcher 这个概念真的好难呀 有点理解不了
     * computed 默认是不直接执行的 所以在options
     * 选项中 lazy 设置为true 不要默认执行
     * 将watcher 和属性做一个映射 相当于一个map
     */
    watchers[key] = new Watcher(vm, getter, () => {}, { lazy: true })

    // 将key 定义在vm上
    defineComputed(vm, key, userDef)
  }
}

/**
 * 首先这个函数存在的意义是什么呢
 * 就是做一个缓存的功能，不要轻易触发getter方法
 * 这就是一个高阶函数
 */
function createComputedGetter(key) {
  // 取计算属性值的时候 走的是这个函数
  // 只要createComputedGetter 函数执行
  return function computedGetter() {
    // 这里的this 指的就是vm  this._computedWatchers 包含
    // 所有的计算属性 通过key 可以拿到对应的watcher wather 中包含对应的watcher
    let watcher = this._computedWatchers[key]

    // 看这个watcher是不是脏的 根据这个属性判断是否可以重新执行
    // 脏就是调用用户的getter 不脏就是不用调用用户的getter
    if (watcher.dirty) {
      watcher.evaluate()
    }

    return watcher.value
  }
}

/**
 *
 * @param {*} vm
 * @param {*} key
 * @param {*} userDef
 */
function defineComputed(vm, key, userDef) {
  let sharedProperty = {}

  if (typeof userDef === "function") {
    sharedProperty.get = userDef
  } else {
    sharedProperty.get = createComputedGetter(key)
    sharedProperty.set = userDef.set
  }
  // 本质上还是一个 Object.defineProperty
  // 定义在vm 上的 属性key 传入的 get 和 set 做了处理
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
