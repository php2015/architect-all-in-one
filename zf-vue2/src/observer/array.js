let oldArrayPrototype = Array.prototype
/**
 * 每一个构造函数都拥有一个prototype属性
 * 每一个对象被创建的时候都拥有原型对象
 * 每一个对象通过__proto__属性访问到自己的原型对象
 */
export let arrayMethods = Object.create(oldArrayPrototype)
// arrayMethods.__proto__ = Array.prototype

// 下面的这7个方法要记住呀，非常的重要呀
let methods = ["push", "shift", "unshift", "pop", "reverse", "sort", "splice"]

// 下面这个写法非常重要，要注意了
methods.forEach((method) => {
  // arrayMethods 是一个对象 对象的每一个方法都是一个函数
  // 用户只要使用这7个方法，就会走到自己写的方法中。从而做到了数组劫持
  // 你看：虽然看似是数组劫持，其实是考察原型链的继承
  arrayMethods[method] = function (...args) {
    // 用户传递进来的参数列表 arr.push(1,2,3) ...args = [1,2,3]
    // 这里我之前一直不是很理解 其实这里 ...args 就是一个整体
    // 这里的this指向的是谁？ 谁调用就是谁 我们最终会使用 vm.arr.push() pop() 那this就是 数组
    // 这里数组没有监控索引的变化
    oldArrayPrototype[method].call(this, ...args)

    let inserted;
    // 这部分有些绕，绕的地方主要是两个this指的是啥
    // 这里的this 对应的是当前的数组 __ob__ 属性对应的是Observe实例
    let ob = this.__ob__; // 这是一个自定义的属性 
    // 对于数组的新增方法 需要做处理
    switch (method) {
      case 'push': // arr.push({a:1},{b:2})
      case 'unshift': // 这两个方法 都是追加，追加的内容可能是对象类型 应该被再次进行劫持
        inserted = args // 将args 赋值给这个需要插入的变量
        break;
      case 'splice': // vue.$set的原理
        inserted = args.slice(2); // arr.splice(0,1,{a:1})
      default:
        break;
    }

    if (inserted) {
      // 为了拿到observe 实例上面的 observeArray 方法 
      // 先提前将 这个实例绑定到了数组上面
      inserted = ob.observeArray(inserted); // 给数组新增的值也要进行观测
    }
    // 数组本身的watcher 更新
    ob.dep.notify();
  }
})
