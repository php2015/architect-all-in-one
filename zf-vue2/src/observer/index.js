import { isObject } from "../utils"

/**
 * vue2会对对象进行遍历，将每个属性 用defineProperty 重新定义 性能差
 * defineReactive 是一个包装 内部就是使用 
 * @param {*} data 
 * @param {*} key 
 * @param {*} value 
 */
function defineReactive(data, key, value) {
  /**
   * 你看这很显然就是一个递归的操作，发现对象里面嵌套对象
   * 还是可以进一步的做响应式的处理 
   */
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newV) {
      /**
       * 如果用户赋值一个新的对象 需要将这个对象进行劫持
       */
      observe(newV) 
      value = newV
    },
  })
}
/**
 * 对象没有类型 类有类型 使用类的话入参会在构造函数中被作为参数，接收到
 *
 */
class Observer {
  constructor(data) {
    this.work(data)
  }
  /**
   * data 是一个对象 遍历对象使用object.keys 
   * 这个方法已经很常见了。返回的是一个数组 数组的所有元素
   * 由这个对象的key组成 
   * 划重点是所有的属性做响应式，哈哈哈，这部分一直迷糊
   * @param {*} data 
   */
  work(data) {
    // console.log(Object.keys(data))  ["name", "showFlag"]
    // 这里使用object.keys不会遍历原型上的属性
    Object.keys(data).forEach((key) => {
      // 将对象中的每一个「属性」！！！都进行响应式处理
      defineReactive(data, key, data[key])
    })
  }
}

/**
 * 这个函数接收的是 处理后的data了，还记得在initState中
 * 对data的处理吗，如果判断是函数，就拿到函数的执行结果
 * 并且使用call来绑定this指向防止迷路。
 * @param {*} data
 * @returns
 */
export function observe(data) {
  // 响应式部分是针对对象来说的，如果不是对象直接略过
  if (!isObject(data)) {
    return
  }
  // 这里使用了一个类，之所以没有使用构造函数的原因是
  // 功能比较耦合,返回的是一个实例
  return new Observer(data)
}
