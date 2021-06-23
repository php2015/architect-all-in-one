import { wrapToVdom } from './utils'
/**
 *
 * @param {*} type 标签名
 * @param {*} config 参数配置 调用方法传递的第二个参数
 * @param {*} children 孩子元素
 */
function createElement(type, config, children) {
  let props = { ...config }
  if (arguments.length > 3) {
    // 说明有多个孩子元素
    // 我们将所有的孩子元素存放进一个数组里面
    props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
  } else { // 只有一个儿子元素
    props.children = wrapToVdom(children)
  }

  return {
    type,
    props,
  }
}

const React = {
  createElement,
}

export default React
