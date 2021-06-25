const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require('webpack')

console.log('webpack.config.js:  '+process.env.NODE_ENV)
module.exports = {
  // mode: "production",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devServer: {
    compress: true, // 是否启动压缩
    port: 8083, // 指定HTTP 服务器的端口号
    open: true, // 自动打开浏览器
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: ["row-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // 插件也是一个数组
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new webpack.DefinePlugin({
      // 在模块中 打印这个参数 process.env.NODE_ENV_SELF 赋值传递进来的变量
      'process.env.NODE_ENV_SELF': JSON.stringify(process.env.NODE_ENV)
    })
  ],
}
