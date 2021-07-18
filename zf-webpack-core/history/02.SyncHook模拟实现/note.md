## 分析webpack4打包之后的文件
1、webpack 打包之后的文件 是一个自执行函数。
2、这个自执行函数有一个对象作为参数，对象嘛 我们知道 key:value 的形式，key 是模块的路径，这个value 是一个函数，我们知道每个文件都是一个模块。
详情请见 history 文件中的文件的运行来查看具体笔记

## webpack-dev-server 安装和使用
安装完了 webpack-dev-server 之后 我们可以在命令行 直接执行

npx webpack-dev-server 默认会以当前目录起一个静态服务，可以通过8080访问。

