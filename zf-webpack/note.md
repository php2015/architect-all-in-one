## 你能简单的介绍下webpack吗？

本质上，webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图对应映射到项目所需的每个模块，并生成一个或多个 bundle

## webpack如何安装的
安装的时候 webpack 是核心模块 webpack-cli 是它的命令行工具，都是放在一起使用的，使用 --save-dev 说明是开发依赖。也可以使用简写 -D。
```
npm install  webpack  webpack-cli --save-dev
```

## webpack的入口（entry）是什么
入口起点(entry point)指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点（直接和间接）依赖的。默认值是 ./src/index.js，但你可以通过在 webpack configuration 中配置 entry 属性，来指定一个（或多个）不同的入口起点。

## webpack的输出（output）是什么
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





