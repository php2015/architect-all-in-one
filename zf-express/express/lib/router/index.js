const url = require("url")

function Router() {
  this.stack = []
}
/**
 * 这个方法提供出来的主要能力是操作自己的栈
 */
Router.prototype.get = function (path, handler) {
  this.stack.push({
    path,
    handler,
    method: "get",
  })
}

Router.prototype.handle = function (req, res, done) {
  let { pathname } = url.parse(req.url)
  let requestMethod = req.method.toLocaleLowerCase()
  // 从第一项开始匹配
  for (let i = 0; i < this.stack.length; i++) {
    // 将每一项对应的元素解构出来
    let { path, method, handler } = this.stack[i]
    // 路由的匹配需要注意一点，路径和方法全部匹配到才算匹配到
    if (path === pathname && requestMethod === method) {
      return handler(req, res)
    }
  }
  // 如果路由系统处理不了，就交给应用系统来处理
  done()
}

module.exports = Router
