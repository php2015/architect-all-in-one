const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    // publicPath: "outPutPublicPath",
  },
  devServer: {
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
