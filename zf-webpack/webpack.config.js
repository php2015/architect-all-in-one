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
  },
  devServer: {
    compress: true, // 是否启动压缩
    port: 8081, // 指定HTTP 服务器的端口号
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
  ],
}
