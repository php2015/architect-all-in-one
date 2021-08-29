// promise2  === x的情况
const Promise1 = require('./source/3.promise')
let promise2 = new Promise((resolve, reject) => {
    resolve(1);
}).then(() => {
    return promise2 // x 
})

promise2.then(data => {
    console.log(data);
}, err => {
    console.log(err)
})

// x.then 这种情况就是别人写的promise 当我们调取 promise then方法的时候 可能会有风险。
let p = {}
let index = 0;
Object.defineProperty(p,'then',{
    get(){
        if(++index == 2)  throw new Error() 
      ;
    }
})

