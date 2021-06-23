export function createEle(vnode) {
  let { tag, children, key, data, text, vm } = vnode
  if (typeof tag === "string") {
    // 创建元素放在vnode.el 上
    vnode.el = document.createElement(tag)

    // 创建元素完毕之后, 给元素添加属性
    patchProps(vnode)

    children.forEach((child) => {
      // 遍历儿子，将儿子的渲染结果放进父亲中
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
    // 第一次渲染的时候 oldVode 传递的是$el

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
  } else {
    // 新旧节点的比较
    // console.log(oldVnode,vnode)
    // 如果标签名称不一样，直接删除掉老的换成新的节点
    if (oldVnode.tag !== vnode.tag) {
      // 我们之前在创建真实节点的时候, vnode.el = document.createElement(tag)
      // 因此能够找到现在真实dom元素
      return oldVnode.el.parentNode.replaceChild(createEle(vnode), oldVnode.el)
      // console.log(oldVnode.el.parentNode)
    }

    // 如果两个虚拟节点是文本节点 比较文本内容。。。

    // 如果标签一样，比较属性
  }
}

/**
 * 渲染属性 初次渲染的时候可以调用此方法
 * 后续更新也可以调用此方法
 */
function patchProps(vnode) {
  let newProps = vnode.data || {}
  let el = vnode.el
  // console.log(JSON.stringify(newProps, null, 2))
  /**
    {
      "style": {
        "color": "red"
      },
      "a": "1"
    } 
  */

  // 这里属性有两种情况 一种是样式属性 style 一种是普通的属性
  for (let key in newProps) {
    // 需要针对style单独做样式处理
    if (key === "style") {
      // 对style 这个对象做循环
      for (let styleName in newProps.style) {
        console.log(newProps.style[styleName])
        el.style[styleName] = newProps.style[styleName]
      }
    } else {
      el.setAttribute(key, newProps[key])
    }
  }
}
