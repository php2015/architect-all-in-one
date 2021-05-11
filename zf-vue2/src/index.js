import { initMixin } from "./init"

/**
 * 接收一个option作为参数 是一个对象
 * 这个options就是用户传递进来的配置选项
 * 这个配置选项中包含 data el watch computed methods。。。
 * 一些列的参数，在使用vue-cli脚手架进行开发的时候
 * 都是单组件文件 每个组件本质上都是一个实例
 * @param {*} options 
 */
function Vue(options) {
  // options 为用户传入的选项
  this._init(options) // 初始化操作
}

// 只要加载了index.js 这个文件下面的函数都会执行
initMixin(Vue)

// 将vue导出
export default Vue
