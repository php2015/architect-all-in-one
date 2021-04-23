// 函数柯里化 多个参数传入 把它转化为n个函数 可以暂存变量
// 一般柯里化参数要求都是一个个传递

// 判断一个变量的类型
// typeof 我们一般用于判断基础类型
// instanceof 判断谁是谁的实例 原理是什么
// Object.prototype.toString.call 判断具体的类型 返回的是一个字符串
// constructor 深拷贝
// function isType(val, typing) {
//   return Object.prototype.toString.call(val) === `[object ${typing}]`
// }

// console.log(isType("abc", "String"))
// console.log(isType(null, "String"))
// 柯里化 让函数变得更加具体  反柯里化 让函数范围变得大一些
// function isString(typing) {
//   return function (val) {
//     return Object.prototype.toString.call(val) === `[object ${typing}]`
//   }
// }
// 这是使用到了闭包的特性 第一次传入一个参数，返回一个函数 再传入一个参数 返回最后的结果
// let myString = isString("String")
// console.log(myString("abc"))
// console.log(myString(123))

// 实现通用的柯里化
// 很明确知道，传入的是一个fn 需要拿到函数的参数个数
function curring(fn) {
  // 这里有一个知识点 打印函数的长度
  // 但是函数自身的length属性的含义却并非如此，它是只读特性，返回的是函数需要的实参的数目，也就是在函数的形参列表中声明的形参的数目
  // console.log(fn,length) // 4
  // 存储每次调用时候传入的变量
  const inner = (args = []) => {
    // 传入的参数的个数和sum的需要实参的数目
    return args.length >= fn.length
      ? fn(...args)
      : (...userArgs) => inner([...args, ...userArgs])
    // 原有的函数执行 原有的函数是sum
  }
  return inner()
}

// 我要记录每次调用时候传入的参数 并且和函数的参数个数进行比较，如果不满足总个数
// 就返回新函数 如果传入的个数和参数一致 就执行原来的函数
function sum(a, b, c, d) {
  return a + b + c + d
}

let sum1 = curring(sum)
let sum2 = sum1(1)
let sum3 = sum2(2, 3)
let result = sum3(4)
console.log(result)
