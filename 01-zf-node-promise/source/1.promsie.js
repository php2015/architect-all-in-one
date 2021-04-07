// 1、promsie 是一个类
// 2、promsie接收一个函数，叫做执行器。
// 3、当前executor中给了两个函数 用来描述promise的状态，promise 中有三个状态 成功 失败 等待 默认是等待，如果调用resolve会走成功
//    如果调用reject 会走失败态，如果调用异常会走失败态 。
// 4、每一个promsie实例都有一个then方法
// 5、promsie 一旦状态改变不能更改。
// promise 还是基于回调的。
class Promise {
  // new 的时候传入执行器
  constructor(executor) {

  }
}

// 导出这个包
module.exports = Promise
