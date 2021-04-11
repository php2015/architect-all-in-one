// promsie的特点 解决了什么问题 1、链式调用嵌套回调的问题 2、同步并发问题
// promsie的then 方法会返回一个新的 promise。
// 情况1：then 方法返回的是一个 (普通值 不是promsie)的情况，会作为外层下一次then的成功结果
// 情况2：then 中方法 执行出错 会走到外层下一次then的失败结果
// 情况3：如果then中的方法返回的是一个promsie对象 此时会根据promsie的结果来处理走成功还是失败
// 无论上一次then走的是成功还是失败，只要返回的是普通值 都会执行下一次then的成功

let Promise = require("./source/3.promise")

let promsie2 = new Promise((resolve, reject) => {
  resolve(1)
}).then((data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(111)
    }, 1000)
  })
})

// 返回一个新的promsie
promsie2.then(
  (data) => {
    console.log('data',data)
  },
  (err) => {
    console.log(err)
  }
)
