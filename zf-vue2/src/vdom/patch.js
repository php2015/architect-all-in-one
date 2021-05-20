function createEle(vnode) {
  let { tag, children, key, data, text, vm } = vnode
  if (typeof tag === "string") {
    // 创建元素放在vnode.el 上
    vnode.el = document.createElement(tag)
    children.forEach(child => { // 遍历儿子，将儿子的渲染结果放进父亲中
      vnode.el.appendChild(createEle(child))
    })
  } else {
    // 创建文本
    vnode.el = document.createTextNode(text)
  }
  return vnode.el
}

export function patch(oldVnode, vnode) {
  if (oldVnode.nodeType == 1) {
    // 说明是真实的元素
    // console.log('真实元素');
    // 用vnode来生成真实的dom，替换虚拟dom

    // 1、首先找到当前dom元素的父元素
    let parentElment = oldVnode.parentNode
    // console.log(parentElment)

    // 2、根据虚拟节点创建元素
    let ele = createEle(vnode)

    // 3、将当前根据虚拟节点创建的元素插入到老元素的后面
    parentElment.insertBefore(ele, oldVnode.nextSibling)

    // 4、删除老的节点 打完收工
    parentElment.removeChild(oldVnode)
    // 将新创建的节点返回出去。
    return ele
  }
}
