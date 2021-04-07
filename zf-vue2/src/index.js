import { initMixin } from "./init"

// 接收一个对象作为参数
function Vue(options) {
  // options 为用户传入的选项
  this._init(options) // 初始化操作
}

// 只要加载了index.js 这个文件下面的函数都会执行
initMixin(Vue)

// 将vue导出
export default Vue
