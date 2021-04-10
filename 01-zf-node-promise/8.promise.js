// promsie的特点 解决了什么问题 1、链式调用嵌套回调的问题 2、同步并发问题
// promsie的then 方法会返回一个新的promise。
// 情况1：then 方法返回的是一个 (普通值 不是promsie)的情况，会作为外层下一次then的成功结果
