## cookie seesion localStorage sessionStorage 区别
- 如果单纯的使用cookie 不建议放置敏感信息。
- 每个浏览器一般对请求头大小限制cookie不能大于4k,如果cookie过大 会导致页面白屏，每次访问服务器都会浪费流量 http-only 并不安全 
- sessionStroage 单页应用 访问存储滚动条位置
- localstorage 特点就是关掉浏览器依然存在 如果不手动清除就会一直存在
- session 每次在服务器开辟一个空间存储用户信息 session 是基于cookie的
- token jwt  jsonwebtoken  不需要服务器存储  没有跨域限制