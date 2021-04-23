// 默认执行文件使用node执行，会把这个文件当成一个模块, 模块中把this给改了
// 文件中的this指向的是谁？--> {}
console.log(this); // {}

// 在前端中访问变量是通过window属性 但是在后端中 想要访问全局需要通过 global
(function(){
  console.log(this);
})()
// Object [global] {
//   global: [Circular],
//   clearInterval: [Function: clearInterval],
//   clearTimeout: [Function: clearTimeout],
//   setInterval: [Function: setInterval],
//   setTimeout: [Function: setTimeout] {
//     [Symbol(nodejs.util.promisify.custom)]: [Function]
//   },
//   queueMicrotask: [Function: queueMicrotask],
//   clearImmediate: [Function: clearImmediate],
//   setImmediate: [Function: setImmediate] {
//     [Symbol(nodejs.util.promisify.custom)]: [Function]
//   }
// }

// __dirname  代表的是当前文件执行所在的目录 是写死的 是绝对路径
console.log(__dirname) // /Users/louis/Documents/myProject/zhufeng-architect/zf-node

// __filename  // 文件自己的绝对路径
console.log(__filename) // /Users/louis/Documents/myProject/zhufeng-architect/zf-node/1.js

// process  /Users/louis/Documents/myProject/zhufeng-architect
console.log(process.cwd());

// env 默认是undefined 
console.log(process.env.NODE_ENV)