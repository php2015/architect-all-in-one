import { isReservedTag } from "../utils"

// 专门有一个包来处理虚拟节点
export function createElement(vm, tag, data = {}, ...children) {
  // 这里我们应该对于原生标签和 组件做一个区分，最简单的就是区分出原生标签
  // 剩下的就是组件标签
  if(isReservedTag(tag)) {
    return vnode(vm, tag, data, data.key, children, undefined)
  } else {
    console.log('组件的渲染')
  }
}

export function createTextElement(vm, text) {
  return vnode(vm, undefined, undefined, undefined, undefined, text)
}

function vnode(vm, tag, data, key, children, text) {
  return {
    vm,
    tag,
    data,
    key,
    children,
    text,
  }
}
