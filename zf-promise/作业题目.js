// 1  打印失败 不会打印成功
let p = new Promise(function (resolve, reject) {
  reject()
  resolve()
})

p.then(
  function () {
    console.log("成功")
  },
  function () {
    console.log("失败")
  }
)

// 2： 1 2 3
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve() // resolve reject 没有终止代码执行的功能
  console.log(2)
})

promise.then(() => {
  console.log(3)
})

// 3  这道题目我没咋看懂  但是能猜出来 打印的是2
Promise.resolve(1)
  .then((res) => 2) // 返回一个2
  .catch((err) => 3) // catch 会有一个穿透的
  .then((res) => console.log(res))

// 4 
Promise.resolve(1)
  .then((x) => {
    x + 1 // 2
  })
  .then((x) => {
    throw new Error("My Error") // 抛出错误，会让catch捕获，
  })
  .catch(() => 1) // 返回一个普通值
  .then((x) => x + 1) // 2
  .then((x) => console.log(x)) // 2
  .catch(console.error) // undefined
