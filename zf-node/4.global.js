// node 中的全局对象叫做global 对应的浏览器的全局属性叫做 window
// global上有属性可以直接访问的叫做全局属性，像 require exports module __dirname __filename 也可以直接访问，但是他们并不在global上


// 我们的常说的模块化规范，
// 对于umd这种统一的模块化规范来说，是兼容 amd 和 cmd 和 commonjs 规范的，但是很遗憾，并不兼容 esModule
// 所以一般我们代码打包的时候 打出两种包 一种shi esModule 包 一种是 umd的包

// commonjs规范 (是基于文件读写的 如果依赖了某个文件会进行文件的读取) 这是动态的
// 一个文件就是一个模块 使用这个模块就用 require 想要把这个模块给别人用就module.exports导出


// esModule 规范 (每次引用一个模块，发请求)是静态的 靠webpack编译
// es6 一个文件也是一个模块
// 使用模块 需要export 
// 用被人的模块就使用import 