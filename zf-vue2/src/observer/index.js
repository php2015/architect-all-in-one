import { isObject } from "../utils"

// 对象没有类型 类有类型
class Observer {
  constructor(data) {
    this.work(data)
  }
  work(data) {
    // 这里使用object.keys 不会遍历原型上的属性
    Object.keys(data).forEach((key) => {
      // 将对象中的每一个属性都进行响应式处理
      defineReactive(data, key, data[key])
    })
  }
}

// vue2会对对象进行遍历，将每个属性 用defineProperty 重新定义 性能差
function defineReactive(data, key, value) { 
  observe(value) // 对象嵌套对象处理
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newV) {
      observe(newV) // 如果用户赋值一个新的对象 需要将这个对象进行劫持
      value = newV
    },
  })
}

export function observe(data) {
  // 响应式部分是针对对象来说的，如果不是对象直接略过
  if (!isObject(data)) {
    return
  }
  // 这里使用了一个类，之所以没有使用构造函数的原因是
  // 功能比较耦合
  return new Observer(data)
}
