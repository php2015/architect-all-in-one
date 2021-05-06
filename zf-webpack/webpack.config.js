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
    publicPath: "outPutPublicPath",
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
