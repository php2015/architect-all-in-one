## 你能简单的介绍下webpack吗？

本质上，webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle


## webpack如何安装的

安装的时候 webpack 是核心模块 webpack-cli 是它的命令行工具，都是放在一起使用的，使用 --save-dev 说明是开发依赖。也可以使用简写 -D。
```
npm install  webpack  webpack-cli --save-dev
```

## webpack的入口（entry）是什么
webpack 是使用node写出来的，配置文件需要使用的node的语法来运行


入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。默认值是 ./src/index.js，但你可以通过在 webpack configuration 中配置 entry 属性，来指定一个（或多个）不同的入口起点。

## webpack的输出（output）是什么
打包出来的文件必须是一个绝对路径, 因此output中的path配置中我们用到了node中的path模块。

output 属性告诉 webpack 在哪里输出它所创建的 bundle，以及如何命名这些文件，主要输出文件的默认值是 ./dist/main.js，其他生成文件默认放置在 ./dist 文件夹中。

## webpack的loader 是什么
webpack 只能理解 JavaScript 和 JSON 文件, loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中

## webpack的plugin 是什么
loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。包括：打包优化，资源管理，注入环境变量

## webpack.coonfig.js 最基本的配置
```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool:false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { 
        test: /\.txt$/, 
        use: 'raw-loader' 
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

## 你能简单介绍下webpack配置中的mode是什么吗？
- 日常开发中，我们一般都只有两套构建环境
- 一套是开发时候使用，用于本地调试，不进行代码压缩，会打印debug信息，包含sourcemap文件
- 一套构建后的结果是直接用于线上的，代码是压缩后的，运行时候不打印debug信息，静态文件不包括sourcemap
- webpack4.x 版本引入了mode的概念
- 当你指定使用 production mode 时，默认会启用各种性能优化的功能，包括构建结果优化以及 webpack 运行性能优化
- 而如果是 development mode 的话，则会开启 debug 工具，运行时打印详细的错误信息，以及更加快速的增量编译构建

development: 会将 process.env.NODE_ENV 的值设为 development. 启用 NamedChunksPlugin 和 NamedModulesPlugin
production: 会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin。


## 你使用过webpack-dev-server 这个插件吗？
安装:
```
npm install webpack-dev-server --save-dev
```
为了提高系统，使用了内存文件系统

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool:false,
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [
      { 
        test: /\.txt$/, 
        use: 'raw-loader' 
      }
    ]
  },
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    writeToDist: true, // 如果指定
    compress: true, // 是否启动压缩
    port: 8080, // 指定HTTP 服务器的端口号
    open: true // 自动打开浏览器
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
};
```

## 在webpack的配置文件中输出目录 output 中的 path 和 publicPath有什么区别
path: 指定输出到硬盘上的目录。
publicPath: 表示的是打包生成的index.html文件里面引用的资源的前缀。


## 我在配置webpack时候犯的错误：
- 1 在配置webpack 开发服务器的时候，需要安装 webpack-dev-server 这个插件 我忘记安装了
- 2 想要使用这个服务，必须配置一个key 这个key 就是 devServer 但是我却写成了 devServe 
- 3 新版的webpack 在配置使用 webpack-dev-server 的时候 package,json 中的配置是 webpack serve 这点尤其注意


## 关于处理css的一些loader。
1、css-loader 用来处理@import这种语法的。
2、style-loader 可以把css 插入到head标签中






