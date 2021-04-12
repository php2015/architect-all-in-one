// 静态方法 promsie.resolve()

// 这个静态方法，会创建一个成功的promise
Promise.resolve(100).then((data) => {
  console.log(data) // 100
})

Promise.reject(100).then(
  (data) => {
    console.log(data) // 100
  },
  (err) => {
    console.log(err)
  }
)

// Promise.all Promsie.finally
Promise.all([
  1,
  2,
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success")
    }, 500)
  }),
]).then((data) => {
  console.log(data)
})

try {
  Promise.resolve().then(() => {
    throw new Error("Whoops.")
  })
} catch (e) {
  console.log(e) //
}
