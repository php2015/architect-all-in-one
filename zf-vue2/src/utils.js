export function proxy(vm, data, key) {
  Object.defineProperty(vm, key, {
    get() {
      return vm[data][key]; // vm._data.a
    },
    set(newVal) { // 触发set的时候，会得到这个值
      vm[data][key] = newVal; // vm._data.a = 100;
    }
  })
}

export function isFunction(val) {
  return typeof val === "function"
}

export function isObject(val) {
  return typeof val === "object" && val !== null
}
