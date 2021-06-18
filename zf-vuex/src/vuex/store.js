// 通过使用的时候用户是通过 new Vue.Store({xxx}) 这种形式调用的

import { Vue } from "./install"
// 可以猜想的是Store是一个类
class Store {
  /**
   * 这个options 就是用户传递进来的配置选项
   * @param {*} options
   */
  constructor(options) {
    let { state, mutation, actions, modules } = options

    // 这个状态在页面渲染的时候需要收集对应的渲染watcher，
    // 这样状态更新才能触发页面的重新渲染
    this._vm = new Vue({
      data: {
        $$state: state,
      },
    })
  }

  // 属性访问器，当调取 $store.state 的时候走这个方法
  get state() {
    return this._vm._data.$$state
  }
}

export default Store
