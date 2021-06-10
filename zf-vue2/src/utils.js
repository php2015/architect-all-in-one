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
