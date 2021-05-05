// buffer 代表的是内存 内存是一块固定的空间 产生的内存是固定大小 不能随意添加
// buffer 像数组 数组可以扩展 buffer不能扩展 可以使用索引取值。
const buffer = Buffer.alloc(5);
console.log(buffer);


// base64 这种字符串可以放在任何路径的链接里面 （可以减少请求的发送）文件大小会变大 base64转化完毕之后比之前的文件大 
// 三分之一



