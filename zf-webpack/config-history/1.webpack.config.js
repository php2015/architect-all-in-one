const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  mode: "development", // 模式 
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    // publicPath: "outPutPublicPath",
  },
  devServer: {
    // devServe 会按照这个路径配置的 启动一个 http静态服务器。
    // 为了提高性能，使用的是内存文件系统
    contentBase: path.resolve(__dirname,'dist'),
    writeToDisk: false, // 将打包后的文件写入硬盘中一份
    compress: true, // 是否启动压缩
    port: 8080, // 指定HTTP 服务器的端口号
    open: true // 自动打开浏览器
  },
  module: {
    rules: [
      {
        test: /\.txt$/,
        use: ["row-loader"],
      },
    ],
  },
  plugins: [
    // 插件也是一个数组
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
}
