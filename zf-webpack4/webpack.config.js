const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
module.exports = {
  mode: "production",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "bundle.[hash:8].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 8080,
    progress: true, // 进度条
    contentBase: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // 数组 存放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        removeAttributeQuotes: true, // 删除属性的双引号
        collapseWhitespace: true, // 折叠成一行
      },
      hash: true, // 生成hash戳
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
}
