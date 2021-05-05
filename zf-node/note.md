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


## 模块分类
1、核心模块
2、第三方模块
3、文件模块

## commonjs 实现原理
1、将模块读取过来
2、给这个模块内容外面包装一个函数
3、最终被返回出去了

## node 中代码调试
1、vscode 调试

## 代码调试的流程
1、require 方法 -> Module.prototype.require方法
2、Module._load 使用这个方法加载模块
3、Module._resolveFilename 方法就是把路径变成了绝对路径 添加后缀名称 .js .json
4、new Module 创建模块
5、module.load 对模块进行加载
6、根据文件后缀 Module._extension[.js] 去做策略加载
7、用的是同步读取文件
8、增加一个函数的壳子 并且让函数执行 让module.export 作为了 this
9、用户会默认拿到module.exports的返回结果

## 文件模块
引用都是相对路径

## 第三方模块
1、包的安装 全局模块 会安装在全局的npm包下。
2、不要使用cnpm 无法锁定版本 会出现很多问题。
3、nrm npm nvm 


## 如何创建一个全局的模块 
- 全局安装只能在命令行里面使用，添加执行方式  bin  npm link 

1、创建一个文件夹 使用 npm init 初始化项目
2、创建一个bin目录，将可执行的脚本放进去  在命令行使用的时候
3、还有一个main 的配置，这个是给 requie 时候读取使用的
4、npm link 命令就是将当前文件 link 到全局node_module下。
5、将这个包发布到npm上。

## 解析npm run 的使用原理
有一个模块不是全局安装的，是项目中安装的比如 mime 这个模块。
全局执行 mime a.js 会提示 mime不是内部命令或外部命令 也不是可执行程序。

项目中使用 npm install mime 之后 会在 node_modules 目录下生成
一个bin目录，里面就有这个mime的可执行文件。

原理是: 执行npm run的时候，默认在执行命令之前，会将环境变量添加到全局下。
命令执行完毕之后，会删除对应的path，是一个临时的。


## npm包的发布
1、首先看下，这个包是否重名了。
2、切换到npm的源
3、登录账号发布


## node 中读取数据都是以2进制的形式来存储的
十进制中最大的是9
二进制中最大的是1 

一般情况下 我们以字节为单位存储数据 1024个字节 === 1k  8位 => 1个字节。

其他进制如何转化为10进制   当前值 * 进制 ^ 当前所在位

小数也需要转换为二进制。10进制的小数转换为二进制的时候 用来一个方法 叫做乘二取整法 

0.1 * 2 = 0.2  0
0.2 * 2 = 0.4  0
0.4 * 2 = 0.8  0
0.8 * 2 = 1.6  1
0.6 * 2 = 1.2  1
0.2 * 2 = 0.4  0
0.4 * 2 = 0.8  0
0.8 * 2 = 1.6  1
0.6 * 2 = 1.2  1

这样会形成一个无限循环 当计算机表示不了的时候 会有精度问题 最后加起来的时候 会比 0.3要大一些。

在服务端 我们需要一个东西可以标识内存 但是不能是字符串 因为字符串无法标识图片。












