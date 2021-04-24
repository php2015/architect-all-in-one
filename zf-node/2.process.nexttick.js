// nextTick 表示当前执行栈的底部,而且优先级比 promise 还要高
// 下面代码 先执行 222 再执行 111
Promise.resolve().then(()=>{
  console.log(111);
})

process.nextTick(()=>{
  console.log(222);
})
