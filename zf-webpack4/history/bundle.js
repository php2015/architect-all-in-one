;(function (modules) {
  // console.log(modules)
  // {
  //   './src/a.js': [Function: ./src/a.js],
  //   './src/index.js': [Function: ./src/index.js]
  // }
  // modules 其实就是一个对象
  // webpackBootstrap
  // The module cache 缓存
  var installedModules = {}

  // The require function 这里实现了一个require方法。
  function __webpack_require__(moduleId) {
    console.log(moduleId);
    // 检查这个模块是否在缓存中
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports
    }
    // Create a new module (and put it into the cache)
    // 安装一个模块 相当于在 installedModules 存放了一个关系
    // {
    //    "./src/a.js" : {}  //  
    // }
    var module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    })

    console.log(module)
    // { i: './src/index.js', l: false, exports: {} }
    // { i: './src/a.js', l: false, exports: {} }

    // 通过 对象的 key 找到后面对应的函数，然后执行 执行的时候
    // 使用的是call方法
    modules[moduleId].call(
      module.exports, // this 指向 剩下的三个都是参数
      module, 
      module.exports,
      __webpack_require__
    )

    // Flag the module as loaded
    module.l = true

    // Return the exports of the module
    return module.exports
  }

  // 调用了自定义的require方法 传入的参数是入口模块
  return __webpack_require__(("./src/index.js"))
})({
  "./src/a.js": function (module, exports) {
    eval(
      `module.exports = 'webpack4' \n\n
      //# sourceURL=webpack:///./src/a.js?`
    )
  },

  "./src/index.js": function (module, exports, __webpack_require__) {
    eval(
      `var a = __webpack_require__("./src/a.js")\n\n
      console.log(a);\n\n
      //# sourceURL=webpack:///./src/index.js?`
    )
  },
})
