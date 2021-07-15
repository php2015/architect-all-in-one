const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
module.exports = {
  mode: "development",
  entry: {
    page1: "./src/pages/page1/index.js", // 页面1
    page2: "./src/pages/page2/index.js", // 页面2
  },
  output: {
    filename: "js/[name]/[name]-bundle.js",
    path: path.resolve(__dirname, "dist") 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/pages/page1/index.html',
      filename: "page1.html",
      chunks: ['page1'],
    }),
    new HtmlWebpackPlugin({
      template: './src/pages/page2/index.html',
      filename: "page2.html",
      chunks: ['page2']
    })
  ]
}