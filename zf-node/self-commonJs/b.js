const fs = require("fs")
const path = require("path")
const vm = require("vm")

// Module是个类 这里使用es5的写法 是为了兼容老的代码
function Module(id) {
  this.id = id
  this.exports = {}
}

/**
 * 用于缓存模块
 */
Module.__catch = {}

// 在添加后缀名的方法中 使用了策略模式
Module._extentions = {
  ".js"(module) {
    let script = fs.readFileSync(module.id, "utf8")
    let templateFn = `(function(exports,module,require,__dirname,__filename){${script}})`

    let fn = vm.runInThisContext(templateFn)
    let exports = module.exports
    let thisValue = exports // this === module.exports === exports
    let filename = module.id
    let dirname = path.dirname(filename)
    fn.call(thisValue, exports, module, req, dirname, filename) // 这句代码写出来 调用了 a 模块
  },
  ".json"(module) {
    // 参数就是一个module
    let script = fs.readFileSync(module.id, "utf8")
    module.exports = JSON.parse(script)
  },
}

// 这个方法是 module的静态方法 这个方法的核心功能
// 就是将传入的文件绝对路径解析出来，并且加上文件后缀。
Module._resolveFilename = function (id) {
  let filepath = path.resolve(__dirname, id)
  // 这里使用到了 existsSync  传入路径之后判断文件是否存在
  let isExists = fs.existsSync(filepath)
  if (isExists) {
    return filepath
  }
  // 遍历后追名的key值
  let keys = Object.keys(Module._extentions)
  console.log(keys) // [ '.js', '.json' ]
  // 对keys进行遍历
  for (let i = 0; i < keys.length; i++) {
    let newPath = filepath + keys[i] // 这里就是字符串的拼接操作
    if (fs.existsSync(newPath)) {
      // 添加后缀名称
      return newPath
    }
  }
  throw new Error("module not found")
}

/**
 * 这个方法是原型上的方法
 */
Module.prototype.load = function () {
  // 每加载一个模块都会new 出来一个实例对象 this 指向当前对象
  let ext = path.extname(this.id)
  // 使用策略模式使用不同的策略
  Module._extentions[ext](this)
}

// 自己实现的require方法  入参是一个 文件名称
function req(filename) {
  // 调用_resolveFilename方法生成绝对路径，并且加上文件后缀名称
  filename = Module._resolveFilename(filename)

  let catchModule = Module._catch[filename]
  if (catchModule) {
    return catchModule.exports // 直接将上次缓存的模块返回出来
  }

  // new 出来的这就是个对象
  const module = new Module(filename)

  // 文件名是唯一的，将这个文件名缓存起来 根据的是文件名来缓存
  Module.__catch[filename] = module

  // 调用module.load 调用这个load的方法目的就是给module.exports赋值
  module.load()

  // 导出子构造函数中定义的对象
  return module.exports // 默认是空对象
}

const a = req("./a.js")
console.log(a)