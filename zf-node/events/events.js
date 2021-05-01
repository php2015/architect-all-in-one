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

// 将自己写的模块导出
module.exports = EventEmitter
