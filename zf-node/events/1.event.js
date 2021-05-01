/**
 * 继承有两种方式 继承实例属性 继承原型属性
 * Girl.prototype = EventEmitter.prototype
 * 使用这种写法是不对的，这样相当于父子使用的同一个原型，按照老师的说法 父亲好儿子的媳妇是同一个
 * Girl.prototype.__proto__ =  EventEmitter.prototype 可以使用这种方式
 * Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype) 这种写法和上面那种写法是等价的
 * Girl.prototype = Object.create(EventEmitter.prototype)
 */

const EventEmitter = require('./events')
const util = require("util")

function Girl() {}

// 使用node自带的继承模块
util.inherits(Girl, EventEmitter)

// 创建实例
let girl = new Girl();

// 先将事件订阅号
girl.on('女生失恋',()=> {
  console.log('哭');
})

girl.on('女生失恋',()=> {
  console.log('吃');
})

// 过了一段时间发布
setTimeout(() => {
  girl.emit('女生失恋')
}, 1000);
