export function proxy(vm, data, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[data][key] // vm._data.a
    },
    set(newVal) {
      // 触发set的时候，会得到这个值
      vm[data][key] = newVal // vm._data.a = 100;
    },
  })
}

export function isFunction(val) {
  return typeof val === "function"
}

export function isObject(val) {
  return typeof val === "object" && val !== null
}

// 用一个全局的callbacks 接收用户传递进来的更新回调
const callbacks = []
let waiting = false
// 用一个方法依次执行这些回调
function flushCallbacks() {
  callbacks.forEach((cb) => cb())
  waiting = false
}

function timer(flushCallbacks) {
  let timerFn = () => {}
  if (Promise) {
    timerFn = () => {
      Promise.resolve().then(flushCallbacks)
    }
  } else if (MutationObserver) {
    let textNode = document.createTextNode(1)
    let observe = new MutationObserver(flushCallbacks)

    observe.observe(textNode, {
      characterData: true,
    })

    timerFn = () => {
      textNode.textContent = 3
    }
  } else if (setImmediate) {
    timerFn = () => {
      setImmediate(flushCallbacks)
    }
  } else {
    timerFn = () => {
      setTimeout(flushCallbacks)
    }
  }
  timerFn()
}

// vue2中考虑了兼容性的问题 vue3中不再考虑兼容性问题
export function nextTick(cb) {
  callbacks.push(cb)
  if (!waiting) {
    setTimeout(() => {
      timer(flushCallbacks)
    }, 0)
    waiting = true
  }
}

let lifeCycleHooks = [
  "beforeCreate",
  "created",
  "beforeMount",
  "mounted",
  // ... 其他生命周期
]

// 策略对象
let strategy = {}

/**
 * 这个函数是策略函数
 * @param {*} parentVal
 * @param {*} childVal
 */
/**
 * 第一次： this.options:        {}              options: {beforeCreate: Fn}  =>  {beforeCreate: [fn]}
 * 第二次： this.options: {beforeCreate: [fn]}   options: {beforeCreate: Fn}  =>  {beforeCreate: [fn,fn]}
 */
function mergeHook(parentVal, childVal) {
  if (childVal) {  // 如果儿子有值 
    if(parentVal) { // 父亲也有值
      // 这里纠正一个误区,  
      return parentVal.concat(childVal)
    } else { // 父亲没有 将儿子拼装成一个数组
      return [childVal]
    }
  } else { // 如果对应的属性 儿子没有只有父亲有 那直接返回父亲的
    return parentVal
  }
}

lifeCycleHooks.forEach((hook) => {
  strategy[hook] = mergeHook
})

strategy.components = function(parentVal, childVal) {
  // console.log(parentVal) // 这里打印的是 undefined
  // 根据父对象构造一个新的对象
  let options = Object.create(parentVal||{});
  if(childVal) {
    for(let key in childVal) {
      options[key] = childVal[key]
    }
  }
  return options;
}

/**
 * 第一次： this.options:        {}              options: {beforeCreate: Fn}  =>  {beforeCreate: [fn]}
 * 第二次： this.options: {beforeCreate: [fn]}   options: {beforeCreate: Fn}  =>  {beforeCreate: [fn,fn]}
 */
export function mergeOptions(parent, child) {
  // 合并之后的结果
  const options = {}
  // 以父对象为准，循环遍历
  for (let key in parent) {
    mergeFileld(key)
  }
  // 循环完毕 父亲之后 以儿子为基准 循环
  for (let key in child) {
    // 如果父亲中也有这个key 不需要重复合并
    if (parent.hasOwnProperty(key)) {
      // 继续下一个key的遍历
      continue
    }
    mergeFileld(key)
  }

  function mergeFileld(key) {
    let parentVal = parent[key]
    let childVal = child[key]
    if (strategy[key]) {
      options[key] = strategy[key](parentVal, childVal)
    } else {
      // {a:1,data:{}} {data:{}} 类似于这种场景 我们需要判断
      // 父亲key 对应的对象和 孩子key 对应的对象 如果都是对象
      // 在大的option上面开辟一个key 合并这个两个
      if (isObject(parentVal) && isObject(childVal)) {
        options[key] = { ...parentVal, ...childVal }
      } else {
        // 其中有一个为对象，或者两个都不为对象
        options[key] = child[key] || parent[key]
      }
    }
  }
  return options
}

/**
 * 
 * @returns 
 */
export function isReservedTag(str) {
  return function() {
    let reservedTag = 'a,span,div,p,img,button,ul,li';
    console.log(reservedTag.includes(str));
    return reservedTag.includes(str);
  }
}