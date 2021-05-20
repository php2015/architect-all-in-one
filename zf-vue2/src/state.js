import { observe } from "./observer/index.js"
import { isFunction, proxy } from "./utils"

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
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
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
function initComputed() {}
function initWatch() {}
