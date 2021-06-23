export function createEle(vnode) {
  let { tag, children, key, data, text, vm } = vnode
  if (typeof tag === "string") {
    // 创建元素放在vnode.el 上
    vnode.el = document.createElement(tag)

    // 创建元素完毕之后, 给元素添加属性 第一次渲染时候添加的属性
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

    let el = vnode.el = oldVnode.el // 当前新的节点还没有渲染，先复用老节点
    // 如果两个虚拟节点是文本节点 比较文本内容。。。
    // console.log(oldVnode.data)
    // console.log(vnode)
    // 生成新旧节点 如果标签一样，比较属性
    // 传入新的虚拟节点和老的属性，用新的属性更新老的
    patchProps(vnode, oldVnode.data)

    // 一方有儿子 一方没有儿子
    let oldChildren = oldVnode.children || []
    let newChildren = vnode.children || []

    console.log(oldChildren)
    console.log(newChildren)

    if (oldChildren.length > 0 && newChildren.length > 0) {
      // 双方都有儿子 这块逻辑是最复杂的
    } else if (newChildren.length > 0) {
      // 老的没有儿子 但是新的有儿子
      // 循环创建子元素并渲染
      for (let i = 0; i < newChildren.length; i++) {
        let child = createEle(newChildren[i]) // child 是虚拟节点
        el.appendChild(child)
      }
    } else if (oldChildren.length > 0) {
      // 老的有儿子 新的没有儿子
      el.innerHTML = `` // 直接删除所有儿子
    }
  }
}

/**
 *
 * @param {*} vnode 新的虚拟节点
 * @param {*} oldProps 老的属性
 */
function patchProps(vnode, oldProps = {}) {
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
  // 如果老的属性有，新的没有 ，例如老的节点中有一个 a=1 这个属性
  // 新的节点中有一个 b=2 这个属性，就行该保留2 删除1 应该怎么做呢？
  // 还有一种情况，style中属性数量不一样，一个多 一个少，这个怎么操作呢
  let newStyle = newProps.style || {}
  let oldStyle = oldProps.style || {}

  for (let key in oldStyle) {
    if (!newStyle[key]) {
      el.style[key] = ""
    }
  }

  for (let key in oldProps) {
    // 循环老的属性
    if (!newProps[key]) {
      // 如果新的属性中不存在
      el.removeAttribute(key) // 删除这个属性 这个时候 操作的其实是真实的dom
    }
  }

  // 这里属性有两种情况 一种是样式属性 style 一种是普通的属性
  for (let key in newProps) {
    // 需要针对style单独做样式处理
    if (key === "style") {
      // 对style 这个对象做循环
      for (let styleName in newProps.style) {
        // console.log(newProps.style[styleName])
        el.style[styleName] = newProps.style[styleName]
      }
    } else {
      el.setAttribute(key, newProps[key])
    }
  }
}
