import { observe } from "./observer/index.js"
import { isFunction } from "./utils"

export function initState(vm) {
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
function initProps() {}
function initMethod() {}
function initData(vm) {
  let data = vm.$options.data
  // 这里使用 isFunction 工具函数判断传入的data是不是一个函数
  // 如果是一个函数就执行这个函数，但是执行时候需要绑定vm,我们希望在整个执行的过程中
  // this使用执行vm 也就是当前new出来的实例。
  // 使用_data 和 data 做一个关联 两者使用同一份地址
  data = vm._data = isFunction(data) ? data.call(vm) : data
  // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty
  observe(data)
}
function initComputed() {}
function initWatch() {}
