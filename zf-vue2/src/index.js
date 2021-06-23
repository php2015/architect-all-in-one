import { initGlobalApi } from "./global-api/index";
import { initMixin } from "./init"
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from "./render";
import { stateMixin } from "./state";

/**
 * 这里是一个函数声明，只有在new的时候才会调用
 * 接收一个 options 作为参数，options 是一个对象
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
// 并且是首先执行的，那么所有在mixin上挂载的所有原型
// 方法都会预先定义执行，init 是在new 的时候执行的
initMixin(Vue);
stateMixin(Vue);
renderMixin(Vue);  // 存放的是 _render
lifecycleMixin(Vue); // 存放的是 _update
initGlobalApi(Vue); // 初始化全局api

// 在这里 手动使用生成两个dom
import { complileToFunction } from "./compiler/index.js";
import {createEle} from "./vdom/patch.js"
let oldTemplate = `<div>{{message}}</div>`
let vm1 = new Vue({
  data:{
    message: 'hello world'
  }
})
const render1 = complileToFunction(oldTemplate);
const oldVnode = render1.call(vm1)
// console.log(createEle(oldVnode))
document.body.appendChild(createEle(oldVnode))

// 将vue导出
export default Vue
