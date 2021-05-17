const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*` // 这个这则匹配的是标签名称 <aa-aa></aa-aa> 类似于这样的东西
const qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")" // 用来获取标签名称
const startTagOpen = new RegExp("^<" + qnameCapture) // 标签开头的正则表达式
const endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>") // y用来匹配闭合标签的
const attribute =
  /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const startTagClose = /^\s*(\/?)>/
function start(tagName, attribute) {}

function end(tagName) {}

function chars(text) {}
function parserHTML(html) {
  // 具体的思路是我每解析了一个标签就把它删掉 这里使用while循环 直到为空 说明解析完成了
  while (html) {
    // 以这种尖角号开头的有可能是 开始标签 也有可能是结束标签 <div id="app">123123</div>
    let textEnd = html.indexOf('<')
    // < 出现在开头, 
    if(textEnd == 0) {
    }
  }
}

export function complileToFunction(template) {
  // console.log(template)
  parserHTML(template)
}
