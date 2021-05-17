// 实现一个递归冻结
let obj = {
  name: "louis",
  home: {
    test: "北京",
  },
}
// 使用freeze冻结这个对象
// Object.freeze(obj);

// 修改
// obj.home.test = '南京'

// console.log(obj); 
// { name: 'louis', home: { test: '南京' } }
// 上面的例子说明 虽然对象被冻结了，但是修改内层还是对象
// 修改是能够成功的, 说明这个方法类似于浅拷贝

// 实现一个深度递归的冻结
function deepFreeze(obj) {
  Object.freeze(obj);
  for (let key in obj) {
    if (typeof obj[key] == 'object') {
      deepFreeze(obj[key])
    }
  }
}
// 执行冻结操作
deepFreeze(obj)

// 再次修改
obj.home.test = '南京'
console.log(obj); 
// { name: 'louis', home: { test: '北京' } }
// 修改就不会生效了





