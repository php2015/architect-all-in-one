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

