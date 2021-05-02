function EventEmitter() {
  // 这个是_events 存放的是 {’事件名‘:[fn1,fn2,fn3]}
  this._events = {}
}

/**
 *
 * @param {*} eventName 订阅的事件名称
 * @param {*} callback  回调函数
 */
EventEmitter.prototype.on = function (eventName, callback) {
  if (!this._events) {
    // 这里的this代表的是 实例 girl
    this._events = {} // 这里做一个判空处理
  }
  if (this._events[eventName]) {
    // 如果存在这个订阅的时间名称
    this._events[eventName].push(callback)
  } else {
    // 没有订阅过事件 将对应的回调函数 放在数组中
    this._events[eventName] = [callback]
  }
}

/**
 *
 * @param {*} eventName 发布的事件名称
 * @param  {...any} args 传递的参数
 */
EventEmitter.prototype.emit = function (eventName, ...args) {
  this._events[eventName].forEach((fn) => {
    fn(...args)
  })
}

/**
 * 事件的解绑操作
 * @param {*} eventName
 * @param {*} callback
 */
EventEmitter.prototype.off = function (eventName, callback) {
  if (this._events && this._events[eventName]) {
    // 做一个方法过滤，如果和传入的方法相同我就不要了
    // 注意这里是过滤的回调方法，不是过滤的事件名称 这块需要搞清楚
    this._events[eventName] = this._events[eventName].filter(
      (fn) => fn !== callback
    )
  }
}

/**
 * 先执行on 方法,在 on 方法执行完之后解绑
 * @param {*} eventName
 * @param {*} callback
 */
EventEmitter.prototype.once = function (eventName, callback) {
  const one = () => {
    callback()
    this.off(eventName, one)
  }
  this.on(eventName, one)
}

// 将自己写的模块导出
module.exports = EventEmitter
