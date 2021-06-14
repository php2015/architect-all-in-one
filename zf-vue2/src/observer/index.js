import { isObject } from "../utils"
import { arrayMethods } from "./array"
import Dep from "./dep"



function dependArray(value) {
  for(let i = 0;i< value.length;i++) {
    // 这个 current 是数组中的数组 
    let current = value[i];
    current.__ob__ && current.__ob__.dep.depend();

    if(Array.isArray(current)) {
      dependArray(current)
    }
  }
}

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
  let childOb =  observe(value)
  // 这个value值也可能是一个数组，defineProperty 本身是不涉及value的
  // 这个value 是通过 defineReactive 这个函数传递进来的
  // 这个 defineReactive 每个属性都会执行, 在这里 创建一个dep
  let dep = new Dep()
  Object.defineProperty(data, key, {
    // 取值的时候创建一个dep
    get() {
      // 渲染之前的时候先将watcher放在了dep.target上
      // 然后将dep.target 置空 这样 在模板下面取值时候就不会依赖收集
      if (Dep.target) {
        dep.depend(); // 让dep记住watcher 这个是比较核心的逻辑
        if (childOb) {
          childOb.dep.depend();

          // 对于数组中子元素还是数组的情况，还需要做依赖收集
          if (Array.isArray(value)) {
            dependArray(value)
          }
        }
      }
      // console.log(key)
      return value
    },
    set(newV) {
      /**
       * 如果用户赋值一个新的对象 需要将这个对象进行劫持
       */
      if(newV !== value) {
        observe(newV)
        value = newV
        // 告诉当前的属性存放的watcher执行
        dep.notify()
      }
    },
  })
}

// 如果我们给对象新增一个属性并不会触发视图更新，为了解决这个问题，我们可以给（对象本身也增加一个dep  dep存watcher） 如果
// 增加一个属性后，我们就手动触发watcher的更新 这就是$set的实现原理。 
class Observer {
  constructor(data) {

    this.dep = new Dep();

    // 这里使用defineProperty 定义一个 __ob__ 属性
    // object.defineProperty 方法会直接在一个对象上定义一个新属性。
    // 或者修改一个对象的现有属性，并返回此对象。判断一个对象是否被观测过，看它有没有 __ob__ 属性
    // 注意 使用这个方法定义的属性是不会被枚举的到，不可枚举的好处是不会造成死循环，这里写的真的很好
    Object.defineProperty(data, "__ob__", {
      enumerable: false,
      configurable: false,
      value: this,
    })

    if (Array.isArray(data)) {
      // 对于对象来说，我们可以给他的属性添加dep，那对于数组该如何处理呢


      // 数组的处理 对数组原来的方法进行改写，这种思路就是面向切面编程
      // 虽然在最后还是会调用数组原来的方法，但是会在外面包一层函数,
      // 可以在包装的这层函数中加入自己的一些逻辑——高阶函数
      // 在学习这部分的内容时候对于原型的理解终究是有些模糊，推荐一篇文章
      // https://github.com/mqyqingfeng/Blog/issues/2
      // 文章中有一句话说的特别清晰：每一个JavaScript对象 (null) 除外都拥有__proto__属性 指向它的原型对象
      data.__proto__ = arrayMethods

      // 这里还需要处理一种情况，如果数组中的元素还是数组，或者数组中的元素是对象，
      // 我们原则上是需要支持观测内部对象变化的，虽然vue中对于数组没有监控索引的变化
      // 但是针对数组中元素是对象的情况还是做了处理。
      this.observeArray(data)
    } else {
      // 对象的处理
      this.work(data)
    }
  }
  /**
   * 观测对象
   * @param {*} data
   */
  observeArray(data) {
    // 对数组的每一项进行观测。
    data.forEach((item) => {
      observe(item)
    })
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

  // 这里做一个判断，如果当前的这个数据已经被响应式了
  // 直接返回就好，不需要重复响应式，最初添加这个属性是在Observer 这个类中做的
  // 所以被观测的属性，都具有 __ob__ 属性  这个属性的值 还记得是什么吗 是那个 observer 实例
  if (data.__ob__) {
    return data.__ob__;
  }

  // 这里使用了一个类，之所以没有使用构造函数的原因是
  // 功能比较耦合,返回的是一个实例
  return new Observer(data)
}
