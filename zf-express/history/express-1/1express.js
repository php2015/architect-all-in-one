const http = require("http")
const url = require("url")
let routes = [
  {
    // 默认规则
    path: "*",
    method: "all",
    handler(req, res) {
      res.end(`cannot  found ${req.method}  ${req.url}`)
    },
  },
]
function createApplication() {
  return {
    get(path, handler) {
      routes.push({
        path,
        method: "get",
        handler,
      })
    },
    listen(...args) {
      const server = http.createServer((req, res) => {
        let { pathname } = url.parse(req.url)
        let requestMethod = req.method.toLocaleLowerCase()
        // 从第一项开始匹配
        for (let i = 1; i < routes.length; i++) {
          // 将每一项对应的元素解构出来
          let { path, method, handler } = routes[i]
          // 路由的匹配需要注意一点，路径和方法全部匹配到才算匹配到
          if (path === pathname && requestMethod === method) {
            return handler(req, res)
          }
        }
        // 都匹配不到走第一个
        routes[0].handler(req, res)
      })

      server.listen(...args)
    },
  }
}
module.exports = createApplication
