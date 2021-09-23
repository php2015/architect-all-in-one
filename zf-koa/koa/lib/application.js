const http = require("http") // 需要http模块

// koa 源码中就是这个名字，还记得我们使用的时候使用new操作符调用
// 实例可以使用 use 和 listen 两个方法，就在类中定义这个两个方法
class Application {
  // 用户在调用use方法的时候传递进来了一个函数，先保存起来，不考虑多个函数的情况
  // 我们先执行的use做了缓存操作，到了创建服务的时候再去执行的传入的函数
  // 这个use就是个订阅，将函数存起来
  use(fn) {
    this.fn = fn
  }

  // 请求来了之后，http.createServer 回调函数中接收两个参数 req res
  handleRequest = (req, res) => {
    // 这里就是发布
    this.fn(req,res)
  }

  // 执行listen方法的时候，传递的是一个3000的端口号，然后会触发一个回调
  // 本质还是调用http的创建的服务, 传递了两个参数 一个数端口号，一个是回调函数
  listen(...args) {
    const server = http.createServer(this.handleRequest)
    server.listen(...args)
  }
}

module.exports = Application
