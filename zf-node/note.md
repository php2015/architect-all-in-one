## 多线程
- 优点：可以同时处理多个请求，适合cpu密集型 （运算）
- 缺点：如果多个线程操作同一个资源需要上锁
- 群发短信：多线程并不是一起去干一件事情 而是靠切换上下文


## 单线程
- 优点：不需要开启多个线程 节省资源 不适合做大量的cpu操作。


## 模块中的this
直接访问this指向的是 {} 默认是修改过的

自执行函数的this指向全局

```js
(function(){
  console.log(this);
})()

Object [global] {
  global: [Circular],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Function]
  }
}
```

## Buffer node中的二进制对象


## process
1、platform
2、chdir
3、cwd  当前工作目录
4、env
5、argv
6、nexttick

```js
// process  /Users/louis/Documents/myProject/zhufeng-architect
console.log(process.cwd());

// env 默认是undefined 
console.log(process.env.NODE_ENV)
```


## __dirname  和  __filename
- __dirname  代表的是当前文件执行所在的目录 是写死的 是绝对路径
console.log(__dirname) // /Users/louis/Documents/myProject/zhufeng-architect/zf-node

- __filename  // 文件自己的绝对路径
console.log(__filename) // /Users/louis/Documents/myProject/zhufeng-architect/zf-node/1.js

## 对于commander工具库的使用


## 模块化规范
- 1、node 中的全局对象叫做global 对应的浏览器的全局属性叫做 window，global上有属性可以直接访问的叫做全局属性，像 require exports module __dirname __filename 也可以直接访问，但是他们并不在global上。
- 2、我们的常说的模块化规范，对于umd这种统一的模块化规范来说，是兼容 amd 和 cmd 和 commonjs 规范的，但是很遗憾，并不兼容 esModule所以一般我们代码打包的时候 打出两种包 一种shi esModule 包 一种是 umd的包


## commonjs 和 esModule的区别
commonjs规范 (是基于文件读写的 如果依赖了某个文件会进行文件的读取) 这是动态的，一个文件就是一个模块 使用这个模块就用 require 想要把这个模块给别人用就 module.exports导出。

esModule 规范 (每次引用一个模块，发请求)是静态的 靠webpack编译，esModule一个文件也是一个模块
使用模块 需要 export 用被人的模块就使用import 

