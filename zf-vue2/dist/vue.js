(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.Vue = factory());
}(this, (function () { 'use strict';

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArrayLimit(arr, i) {
    if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  function proxy(vm, data, key) {
    Object.defineProperty(vm, key, {
      get: function get() {
        return vm[data][key]; // vm._data.a
      },
      set: function set(newVal) {
        // 触发set的时候，会得到这个值
        vm[data][key] = newVal; // vm._data.a = 100;
      }
    });
  }
  function isObject(val) {
    return _typeof(val) === "object" && val !== null;
  } // 用一个全局的callbacks 接收用户传递进来的更新回调

  var callbacks = [];
  var waiting = false; // 用一个方法依次执行这些回调

  function flushCallbacks() {
    callbacks.forEach(function (cb) {
      return cb();
    });
    waiting = false;
  }

  function timer(flushCallbacks) {
    var timerFn = function timerFn() {};

    if (Promise) {
      timerFn = function timerFn() {
        Promise.resolve().then(flushCallbacks);
      };
    } else if (MutationObserver) {
      var textNode = document.createTextNode(1);
      var observe = new MutationObserver(flushCallbacks);
      observe.observe(textNode, {
        characterData: true
      });

      timerFn = function timerFn() {
        textNode.textContent = 3;
      };
    } else if (setImmediate) {
      timerFn = function timerFn() {
        setImmediate(flushCallbacks);
      };
    } else {
      timerFn = function timerFn() {
        setTimeout(flushCallbacks);
      };
    }

    timerFn();
  } // vue2中考虑了兼容性的问题 vue3中不再考虑兼容性问题


  function nextTick(cb) {
    callbacks.push(cb);

    if (!waiting) {
      setTimeout(function () {
        timer(flushCallbacks);
      }, 0);
      waiting = true;
    }
  }
  var lifeCycleHooks = ["beforeCreate", "created", "beforeMount", "mounted" // ... 其他生命周期
  ]; // 策略对象

  var strategy = {};
  /**
   * 这个函数是策略函数
   * @param {*} parentVal
   * @param {*} childVal
   */

  /**
   * 第一次： this.options:        {}              options: {beforeCreate: Fn}  =>  {beforeCreate: [fn]}
   * 第二次： this.options: {beforeCreate: [fn]}   options: {beforeCreate: Fn}  =>  {beforeCreate: [fn,fn]}
   */

  function mergeHook(parentVal, childVal) {
    if (childVal) {
      // 如果儿子有值 
      if (parentVal) {
        // 父亲也有值
        // 这里纠正一个误区,  
        return parentVal.concat(childVal);
      } else {
        // 父亲没有 将儿子拼装成一个数组
        return [childVal];
      }
    } else {
      // 如果对应的属性 儿子没有只有父亲有 那直接返回父亲的
      return parentVal;
    }
  }

  lifeCycleHooks.forEach(function (hook) {
    strategy[hook] = mergeHook;
  });

  strategy.components = function (parentVal, childVal) {
    // console.log(parentVal) // 这里打印的是 undefined
    // 根据父对象构造一个新的对象
    var options = Object.create(parentVal || {});

    if (childVal) {
      for (var key in childVal) {
        options[key] = childVal[key];
      }
    }

    return options;
  };
  /**
   * 第一次： this.options:        {}              options: {beforeCreate: Fn}  =>  {beforeCreate: [fn]}
   * 第二次： this.options: {beforeCreate: [fn]}   options: {beforeCreate: Fn}  =>  {beforeCreate: [fn,fn]}
   */


  function mergeOptions(parent, child) {
    // 合并之后的结果
    var options = {}; // 以父对象为准，循环遍历

    for (var key in parent) {
      mergeFileld(key);
    } // 循环完毕 父亲之后 以儿子为基准 循环


    for (var _key in child) {
      // 如果父亲中也有这个key 不需要重复合并
      if (parent.hasOwnProperty(_key)) {
        // 继续下一个key的遍历
        continue;
      }

      mergeFileld(_key);
    }

    function mergeFileld(key) {
      var parentVal = parent[key];
      var childVal = child[key];

      if (strategy[key]) {
        options[key] = strategy[key](parentVal, childVal);
      } else {
        // {a:1,data:{}} {data:{}} 类似于这种场景 我们需要判断
        // 父亲key 对应的对象和 孩子key 对应的对象 如果都是对象
        // 在大的option上面开辟一个key 合并这个两个
        if (isObject(parentVal) && isObject(childVal)) {
          options[key] = _objectSpread2(_objectSpread2({}, parentVal), childVal);
        } else {
          // 其中有一个为对象，或者两个都不为对象
          options[key] = child[key] || parent[key];
        }
      }
    }

    return options;
  }
  /**
   * 
   * @returns 
   */

  function isReservedTag(str) {
    return function () {
      var reservedTag = 'a,span,div,p,img,button,ul,li';
      console.log(reservedTag.includes(str));
      return reservedTag.includes(str);
    };
  }

  function initGlobalApi(Vue) {
    Vue.options = {}; // 用来存放全局的配置,每一个组件初始化的时候都会和options选项进行合并
    // vue.component
    // vue.filter
    // vue.directive

    Vue.mixin = function (options) {
      // 将用户通过mixin 传递进来的选项和 全局的配置做合并
      // 这里的this指的就是vue 后期可能是子组件
      this.options = mergeOptions(this.options, options);
      return this; // 方面链式调用
    };

    Vue.options._base = Vue; // 无论后续创建多少个子类 都可以通过_base 找到Vue

    Vue.options.conponents = {};
    /**
     * 我们在自定义全局组件的时候，会使用这个api进行声明
     */

    Vue.component = function (id, definition) {
      // 为了保证父子关系，我需要产生一个新的实例，这样做的目的是使得组件能够隔离，每个组件都会产生一个新的类, 去继承父类。
      definition = this.options._base.extend(definition); // 处理过之后 definition 就是一个类 这里做一个组件的映射表

      this.options.conponents[id] = definition;
      console.log(this.options.conponents);
    };
    /**
     * 其实就是返回一个类
     * extend 方法就死产生一个继承与Vue的类
     * 并且身上有父类的功能
     */


    Vue.extend = function (opts) {
      var Super = this; // Sub 是一个函数

      var Sub = function VueComponent() {
        this._init();
      };

      Sub.prototype = Object.create(Super.prototype);
      Sub.prototype.constructor = Sub; // 原型继承
      // 只和vue的options合并

      Sub.options = mergeOptions(Super.options, opts);
      return Sub;
    };
  }

  // _c 类似于react中的 createElement 
  // _v 创建虚拟节点
  // _s 可以看成是json.stringify();
  // render() {
  //   return _c('div', 
  //              { 
  //                id: 'app', 
  //                style: { color: 'red' } 
  //              }, 
  //          _v( 'hello' + _s(name)), _c('span',null, _v('hello'))
  //          )
  // }
  var defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配双大括号
  // 生成属性方法 比如说 div中包含 {style: {}} 

  /**
   * 这个attrs 中就是一个数组
   * @param {*} attrs 
   */

  function genProps(attrs) {
    // [
    //   {name: "id", value: "app"},
    //   {name: "style", value: "color: red"}
    // ]
    // console.log(JSON.stringify(attrs)) 
    // [{"name":"id","value":"app"},{"name":"style","value":"font-size: 16px; background: yellowgreen;"}]
    var str = '';

    for (var i = 0; i < attrs.length; i++) {
      var attr = attrs[i]; // 对于style标签做特殊处理

      if (attr.name === 'style') {
        (function () {
          var obj = {}; // attr.value 是一个字符串 "font-size: 16px; background: yellowgreen;"}
          // 先用 ; 分割成了 一个数组
          // ["font-size: 16px", "background: yellowgreen",""]

          attr.value.split(';').forEach(function (item) {
            // 数组解构的方式
            if (item !== "") {
              // 如果最后一个属性后面有分号 数组的最后一项就会有一个 空 ”“
              var _item$split = item.split(':'),
                  _item$split2 = _slicedToArray(_item$split, 2),
                  key = _item$split2[0],
                  value = _item$split2[1];

              obj[key] = value;
            }
          });
          attr.value = obj; // console.log(attr.value) // {font-size: " 16px", " background": " yellowgreen"
        })();
      }

      str += "".concat(attr.name, ":").concat(JSON.stringify(attr.value), ","); // console.log(str) // generate.js:47 id:"app",style:{"font-size":" 16px"," background":" yellowgreen"},
    } // slice 方法可以提取字符串的某一个部分，并以新的字符串返回被提取的部分
    // stringObject.slice(start,stop)
    // start 开始位置，从某一个位置开始 
    // stop 结束位置  如果是负数, 意思是从倒着数 返回start 和 stop 中间的部分
    // 如果stop 不写，则返回的是从start 到结束的部分


    return "{".concat(str.slice(0, -1), "}");
  }

  function gen(node) {
    if (node.type == 1) {
      return generate(node);
    } else {
      // 如果是文本 
      var text = node.text; // 获取文本
      // 如果是普通文本

      if (!defaultTagRE.test(text)) {
        // 如果文本中不包含{{}}
        return "_v(".concat(JSON.stringify(text), ")");
      }

      var tokens = []; // 存放每一段代码

      var lastIndex = defaultTagRE.lastIndex = 0; // 如果正则是全局模式，需要每次使用前值为0

      var match, index; // 每次匹配到的结果

      while (match = defaultTagRE.exec(text)) {
        index = match.index;

        if (index > lastIndex) {
          tokens.push(JSON.stringify(text.slice(lastIndex, index)));
        }

        tokens.push("_s(".concat(match[1].trim(), ")"));
        lastIndex = index + match[0].length;
      }

      if (lastIndex < text.length) {
        // 后面还有一点没完事
        tokens.push(JSON.stringify(text.slice(lastIndex)));
      }

      return "_v(".concat(tokens.join('+'), ")");
    }
  }

  function genChildren(el) {
    var children = el.children;

    if (children) {
      return children.map(function (child) {
        return gen(child);
      }).join(','); // 将所有转化后的儿子用逗号拼接起来)
    }
  } // 语法层面的转义 将dom结构变成js的语法
  // 看一下元素里面有没有属性 如果有属性就生成属性。


  function generate(el) {
    var children = genChildren(el); // 这里面 el.tag 就是div 这里在写的时候需要特别注意,很容易写错

    var code = "_c('".concat(el.tag, "',").concat(el.attrs.length ? "".concat(genProps(el.attrs)) : 'undefined').concat(children ? ",".concat(genChildren(el)) : '', ")");
    return code;
  }

  // 解析函数 如何解析这种标签
  var ncname = "[a-zA-Z_][\\-\\.0-9_a-zA-Z]*"; // 这个这则匹配的是标签名称 <aa-aa></aa-aa> 类似于这样的东西

  var qnameCapture = "((?:" + ncname + "\\:)?" + ncname + ")"; // 用来获取标签名称

  var startTagOpen = new RegExp("^<" + qnameCapture); // 标签开头的正则表达式

  var endTag = new RegExp("^<\\/" + qnameCapture + "[^>]*>"); // y用来匹配闭合标签的

  var attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
  var startTagClose = /^\s*(\/?)>/; // 这里为什么要使用while循环呢,解析完一段就删除，直到字符串为空说明解析完毕

  function parseHTML(html) {
    // 创建AST语法树
    function createASTElement(tagName, attrs) {
      return {
        tag: tagName,
        // 标签名称
        type: 1,
        // 元素类型
        children: [],
        // 孩子列表
        attrs: attrs,
        // 属性集合
        parent: null // 父元素

      };
    } // 根标签


    var root; // 处理开始标签 接收两个参数 一个是标签名称，一个是属性。

    var currentParent; // 标识当前的父节点

    var stack = [];
    /**
     * 开始标签 标签名称 和属性
     * @param {*} tagName 
     * @param {*} attrs 
     */

    function start(tagName, attrs) {
      // console.log(tagName, attrs, '————————— 开始标签 —————————');
      // 创建一个元素
      var element = createASTElement(tagName, attrs);

      if (!root) {
        // 如果没有根元素，这个创建的元素就是根元素。
        root = element;
      } // 当前解析的标签 保存起来


      currentParent = element; // 开头的标签名称 放进栈中

      stack.push(element);
    } // 处理结束标签


    function end(tagName) {
      // 在标签闭合出创建父子关系
      // 结束的时候将最后一个标签取出来
      var element = stack.pop(); // pop 会改变原数组的长度。
      // 然后取出数组的最后一个当做当前的 父元素

      currentParent = stack[stack.length - 1];

      if (currentParent) {
        // 标签闭合的时候可以知道这个标签的父亲
        element.parent = currentParent;
        currentParent.children.push(element);
      }
    } // 处理文本


    function chars(text) {
      // console.log(text, '————————— 文本标签 —————————');
      text = text.replace(/\s/g, ''); //用正则 将文本标签中的空格去掉

      if (text) {
        // 去掉空格之后 如果文本还存在
        currentParent.children.push({
          type: 3,
          // 文本类型
          text: text
        });
      }
    } // 前进方法, 将匹配到的字符串删除掉，继续匹配后面的内容
    // 这个substring方法：用于提取字符串中介于两个指定下标之间的字符
    // stringObject.substring(start, stop)
    // start 这个参数是必须的 一个非负的整数 规定要提取的的子串的第一个字符在stringObject中的位置
    // stop 比要提取的子串的最后一个字符在stringObject中的位置多1 通俗来说 这是包头不包尾


    function advance(n) {
      // 将截取出来的字符串重新赋值给html
      html = html.substring(n);
    } // 匹配开始标签


    function parseStartTag() {
      // 字符串的match方法可以在字符串内部检索指定的值，或者找到一个或者多个正则表达式的匹配
      // 这个方法类似于 indexOf 但是它返回固定的值，而不是字符串的位置
      // stringObject.match(searchValue)
      // stringObject.match(regexp)
      // 返回值是存放匹配结果的数组 该数组的内容依赖于 regexp 是否具有全局标志 g
      var start = html.match(startTagOpen);

      if (start) {
        // 匹配到的数组不为空
        // 创建一个对象
        var match = {
          tagName: start[1],
          attrs: []
        }; // 传入的这个是 <div 的长度删除开始标签

        advance(start[0].length); // console.log(html);
        // 开始匹配属性，这个属性可能有多个，所以这里使用while循环
        // 循环的条件是 不是闭合标签标签，且属性还没有匹配完毕
        // 这种写法还是第一次看见

        var _end;

        var attr; // startTagClose 匹配的是闭合标签 attr 匹配的是属性

        while (!(_end = html.match(startTagClose)) && (attr = html.match(attribute))) {
          // 根据正则匹配的规则能够将 属性进行分组
          match.attrs.push({
            name: attr[1],
            value: attr[3] || attr[4] || attr[5]
          }); // 匹配完毕属性之后继续前进，前进多少呢，当前匹配字符串的第0个的length;

          advance(attr[0].length); // console.log(html);
        } // 循环完毕属性之后 还会有一个结束标签 我们也要将结束标签去掉


        if (_end) {
          // >
          // 如果哦结束标签存在的话,将结束标签也去掉。
          advance(_end[0].length); // match 是一个对象

          return match; // 将 match的结果返回出去,开头的标签匹配宣告结束。
        }
      }
    }

    while (html) {
      // 只要html不为空字符串就一直解析
      // 首先看看标签是不是以尖角号开头的
      var textend = html.indexOf('<'); // 使用 字符串的indexOf方法 判断如果是0 说明确实是 以 <开头的 肯定是个开头标签

      if (textend === 0) {
        // 肯定是标签之后，就开始匹配开始标签
        var startTagMatch = parseStartTag(); // 这就是开始标签匹配的结果

        if (startTagMatch) {
          // 这里需要严谨一些 返回的是一个对象肯定是true
          start(startTagMatch.tagName, startTagMatch.attrs); // 匹配完开始标签 需要进行下一轮的匹配

          continue;
        }

        var endTagMatch = html.match(endTag);

        if (endTagMatch) {
          // 同样的匹配到的标签删除掉。
          advance(endTagMatch[0].length);
          end(endTagMatch[1]); // 结束标签匹配完成就执行下一轮的匹配。

          continue;
        }
      } // 如果在下一个 < 的索引是大于0 的说明 第一个 开始标签匹配完之后到第二个开始标签
      // 中间的部分是有文本的。


      var text = void 0;

      if (textend > 0) {
        // substring 这个api的特点是不是包含头部而不包含尾部呢 这个需要确认一下。
        text = html.substring(0, textend);
      } // 如果text 存在说明解析到了文本


      if (text) {
        advance(text.length); // 继续截取 html 

        chars(text); // console.log(html); // <div id="my">hello {{name}}<span>world</span></div></div>
      }
    } // 将这个树返回出去


    return root;
  }

  /**
   * 编译函数 接收一个字符串
   * @param {*} template string
   */

  function complileToFunction(template) {
    // => 将 html字符串变成render函数呢？
    // 1、需要将 html 代码转换成 “ast” 语法树。可以用ast来描述语言本身
    // const a = 1; 如何用ast来描述这一句话呢
    // {
    //   indentifier: const 使用const声明
    //   name: a
    //   value: 1
    // }
    // 这里需要有一个区分：虚拟dom 是用来描述节点的 而ast可以用来描述语言本身
    // 前端需要掌握的数据结构 （树）
    var ast = parseHTML(template); // 将template 转化成ast语法树
    // 2、通过这颗树 重新生成代码。
    // console.log(ast);
    // 3、通过这颗树, 重新生成代码

    var code = generate(ast); // _c 类似于react中的 createElement 
    // _v 创建文本节点
    // _s 可以看成是json.stringify();
    // render() {
    //   return _c('div', 
    //              { 
    //                id: 'app', 
    //                style: { color: 'red' } 
    //              }, 
    //          _v( 'hello' + _s(name)), _c('span',null, _v('hello'))
    //          )
    // }
    // console.log(code);
    // 4、将字符串变成函数

    var render = new Function("with(this){return ".concat(code, "}"));
    return render;
  }

  function createEle(vnode) {
    var tag = vnode.tag,
        children = vnode.children;
        vnode.key;
        vnode.data;
        var text = vnode.text;
        vnode.vm;

    if (typeof tag === "string") {
      // 创建元素放在vnode.el 上
      vnode.el = document.createElement(tag); // 创建元素完毕之后, 给元素添加属性 第一次渲染时候添加的属性

      patchProps(vnode);
      children.forEach(function (child) {
        // 遍历儿子，将儿子的渲染结果放进父亲中
        vnode.el.appendChild(createEle(child));
      });
    } else {
      // 创建文本
      vnode.el = document.createTextNode(text);
    }

    return vnode.el;
  }
  function patch(oldVnode, vnode) {
    if (oldVnode.nodeType == 1) {
      // 第一次渲染的时候 oldVode 传递的是$el
      // 说明是真实的元素
      // console.log('真实元素');
      // 用vnode来生成真实的dom，替换虚拟dom
      // 1、首先找到当前dom元素的父元素
      var parentElment = oldVnode.parentNode; // console.log(parentElment)
      // 2、根据虚拟节点创建元素

      var ele = createEle(vnode); // 3、将当前根据虚拟节点创建的元素插入到老元素的后面

      parentElment.insertBefore(ele, oldVnode.nextSibling); // 4、删除老的节点 打完收工

      parentElment.removeChild(oldVnode); // 将新创建的节点返回出去。

      return ele;
    } else {
      // 新旧节点的比较
      // console.log(oldVnode,vnode)
      // 如果标签名称不一样，直接删除掉老的换成新的节点
      if (oldVnode.tag !== vnode.tag) {
        // 我们之前在创建真实节点的时候, vnode.el = document.createElement(tag)
        // 因此能够找到现在真实dom元素
        return oldVnode.el.parentNode.replaceChild(createEle(vnode), oldVnode.el); // console.log(oldVnode.el.parentNode)
      }

      var el = vnode.el = oldVnode.el; // 当前新的节点还没有渲染，先复用老节点
      // 如果两个虚拟节点是文本节点 比较文本内容。。。
      // console.log(oldVnode.data)
      // console.log(vnode)
      // 生成新旧节点 如果标签一样，比较属性
      // 传入新的虚拟节点和老的属性，用新的属性更新老的

      patchProps(vnode, oldVnode.data); // 一方有儿子 一方没有儿子

      var oldChildren = oldVnode.children || [];
      var newChildren = vnode.children || [];
      console.log(oldChildren);
      console.log(newChildren);

      if (oldChildren.length > 0 && newChildren.length > 0) ; else if (newChildren.length > 0) {
        // 老的没有儿子 但是新的有儿子
        // 循环创建子元素并渲染
        for (var i = 0; i < newChildren.length; i++) {
          var child = createEle(newChildren[i]); // child 是虚拟节点

          el.appendChild(child);
        }
      } else if (oldChildren.length > 0) {
        // 老的有儿子 新的没有儿子
        el.innerHTML = ""; // 直接删除所有儿子
      }
    }
  }
  /**
   *
   * @param {*} vnode 新的虚拟节点
   * @param {*} oldProps 老的属性
   */

  function patchProps(vnode) {
    var oldProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var newProps = vnode.data || {};
    var el = vnode.el; // console.log(JSON.stringify(newProps, null, 2))

    /**
      {
        "style": {
          "color": "red"
        },
        "a": "1"
      } 
    */
    // 如果老的属性有，新的没有 ，例如老的节点中有一个 a=1 这个属性
    // 新的节点中有一个 b=2 这个属性，就行该保留2 删除1 应该怎么做呢？
    // 还有一种情况，style中属性数量不一样，一个多 一个少，这个怎么操作呢

    var newStyle = newProps.style || {};
    var oldStyle = oldProps.style || {};

    for (var key in oldStyle) {
      if (!newStyle[key]) {
        el.style[key] = "";
      }
    }

    for (var _key in oldProps) {
      // 循环老的属性
      if (!newProps[_key]) {
        // 如果新的属性中不存在
        el.removeAttribute(_key); // 删除这个属性 这个时候 操作的其实是真实的dom
      }
    } // 这里属性有两种情况 一种是样式属性 style 一种是普通的属性


    for (var _key2 in newProps) {
      // 需要针对style单独做样式处理
      if (_key2 === "style") {
        // 对style 这个对象做循环
        for (var styleName in newProps.style) {
          // console.log(newProps.style[styleName])
          el.style[styleName] = newProps.style[styleName];
        }
      } else {
        el.setAttribute(_key2, newProps[_key2]);
      }
    }
  }

  /**
   * 每个属性我都给它分配一个dep dep可以存放watcher
   * 一个属性如果对应100个watcher (vuex中一个state可能在很多个页面中使用)
   * 同样的 watcher中可能存在多个属性, 因为每个属性都给他分配了一个dep 所以watcher中可能存在多个dep
   */
  // 为了保证dep的唯一性 也需要用一个id
  var id$1 = 0;

  var Dep = /*#__PURE__*/function () {
    function Dep() {
      _classCallCheck(this, Dep);

      this.id = id$1++;
      this.subs = []; // 用来存放watcher的
    }

    _createClass(Dep, [{
      key: "depend",
      value: function depend() {
        // 走到这个函数的时候 dep.target 已经存在
        if (Dep.target) {
          // Dep.target 就是 watcher 这相当于
          // watcher 上面有一个方法 addDep 把当前的 dep存进 watcher
          // 这里还有一个场景 一个页面中多次使用一个变量，不需要重复的渲染，只渲染一次就好
          Dep.target.addDep(this);
        }
      }
    }, {
      key: "addSub",
      value: function addSub(watcher) {
        this.subs.push(watcher);
      }
    }, {
      key: "notify",
      value: function notify() {
        this.subs.forEach(function (watcher) {
          return watcher.update();
        });
      }
    }]);

    return Dep;
  }(); // 静态属性 全局的就这一份


  Dep.target = null;
  var stack = []; // 提供出去的方法 将watcher 挂载到   Dep.target 属性上面

  function pushTarget(watcher) {
    Dep.target = watcher; // 这种处理是为了解决，同一个dep（属性）记录多个watcher的过程。

    stack.push(watcher);
  }
  function popTarget() {
    // 渲染一次将当前的watcher 从栈中弹出
    // 继续赋值另一个watcher
    stack.pop();
    Dep.target = stack[stack.length - 1];
  }

  var queue = [];
  var has = {}; // 列表维护存放了哪些watcher

  function flushSchedulerQueue() {
    for (var i = 0; i < queue.length; i++) {
      queue[i].run();
    }

    queue = [];
    has = {};
    pending = true;
  }

  var pending = false; // 当前执行栈中，代码执行完毕后，会先清空微任务，再清空宏任务
  // 希望尽早的执行一次更新操作

  function queueWatcher(watcher) {
    var id = watcher.id;

    if (has[id] == null) {
      queue.push(watcher);
      has[id] = true; // 开启一次更新操作

      if (!pending) {
        nextTick(flushSchedulerQueue);
        pending = true;
      }
    }
  }

  var id = 0;

  var Watcher = /*#__PURE__*/function () {
    /**
     * @param {*} vm
     * @param {*} exprOrFn 表达式或者是个函数
     * @param {*} cb
     * @param {*} options
     */
    function Watcher(vm, exprOrFn, cb, options) {
      _classCallCheck(this, Watcher);

      this.vm = vm; // 这里做过备注，在渲染watcher中, exprOrFn 就是那个updateComponent
      // 对于用户自己写的watcher 这里可能是个 字符串 或者表达式 需要手动处理

      this.exprOrFn = exprOrFn;
      this.user = !!options.user; // 标识是否是用户自己写的watcher

      this.lazy = !!options.lazy; // 是否立即执行get的标志位
      // 这个dirty默认是脏的, 很巧妙的使用了 lazy的初始值

      this.dirty = options.lazy;
      this.cb = cb;
      this.options = options; // 每 new 一次 watcher 这个id 就会累加

      this.id = id++; // 这里需要对 exprOrFn 做一个判断

      if (typeof exprOrFn == "string") {
        // 将这个表达式转成一个函数 只要new Watcher的时候
        this.getter = function () {
          var path = exprOrFn.split("."); // [age,n] 分割成数组这种形式

          var obj = vm; // 这里有点绕

          for (var i = 0; i < path.length; i++) {
            obj = obj[path[i]];
          }

          return obj;
        };
      } else {
        this.getter = exprOrFn;
      }

      this.deps = []; // 每一个属性对应的是一个dep 这个我其实有点理解不了

      this.depsId = new Set(); // new Watcher 的时候就会执行这个get方法
      // 而这个get方法执行实际上就是我们传递进来 updateComponent 函数 执行
      // 在用户自定义的watcher中 第一次调用get 方法就能拿到返回值

      this.value = this.lazy ? undefined : this.get();
    } // 默认应该让exprOrFn执行 就是updateComponent这个方法 render 去vm上取值 每次取的都是新的值


    _createClass(Watcher, [{
      key: "get",
      value: function get() {
        // 在执行取值之前，先把这个watcher放进dep的target属性上
        pushTarget(this); // 每个属性都能收集自己的watcher
        // 当我们执行 这个get方法的时候 会从defineProperty 执行get方法
        // 每个属性都可以收集自己的watcher
        // 每个组件都拥有一个渲染watcher 组件有100个属性，那这100个属性都是属于这一个渲染watcher的
        // 对于vuex的使用场景来说，一个state 会在多个页面中用到，那这一个属性 对应的是多个 watcher
        // 当这个state变化了，是需要通知多个watcher一起更新的
        // 走到这个函数的时候 会从vm上取值，因为data上的属性已经被响应式了 会触发get方法

        var value = this.getter.call(this.vm); // 如果用户在模板外面取值，我们是不需要依赖收集的，此时清空

        popTarget();
        return value;
      }
    }, {
      key: "update",
      value: function update() {
        // this.get()
        // 对于多次修改属性的情况，我们只希望执行一次更新的操作，这种情况下
        // 最好的就是对watcher做一个防抖的控制 限制它的更新频率
        // 多次调用watcher 我希望缓存起来，等一下一起更新
        // 所以说 vue中的更新操作是异步的
        // 这里还需要加条件、关于计算属性的相关
        if (this.lazy) {
          // 说明是计算属性的watcher
          this.dirty = true; // 重新标识为脏值
        } else {
          queueWatcher(this);
        }
      }
    }, {
      key: "run",
      value: function run() {
        var newValue = this.get();
        var oldValue = this.value;
        this.value = newValue; // 为了保证下一次的更新时，上一次的最新值是下一次的老值

        if (this.user) {
          this.cb.call(this.vm, newValue, oldValue);
        }
      }
    }, {
      key: "addDep",
      value: function addDep(dep) {
        // 同一个属性在响应式的时候 有一个id属性
        // 将这个id取出来
        var id = dep.id; // 这里使用的set去重

        if (!this.depsId.has(id)) {
          // id 不存在 就将这个dep id 放进去
          this.depsId.add(id); // 然后将dep放进去  在页面中 可能使用多个属性 age name xxx
          // 一个watcher 存放多个dep

          this.deps.push(dep); // 同样的 需要在dep中存放watcher （其实这里并不是很明白 为什么要让dep记住watcher ）
          // 想想 vuex中的例子就知道了 dep 记录所有的 watcher

          dep.addSub(this);
        }
      }
    }, {
      key: "evaluate",
      value: function evaluate() {
        this.dirty = false; // 表示已经取过值了

        this.value = this.get(); // 这个就是用户的getter执行，把这个值返回
      }
    }, {
      key: "depend",
      value: function depend() {
        var i = this.deps.length;

        while (i--) {
          // 让lastname 和 firstname 收集渲染watcher
          this.deps[i].depend();
        }
      }
    }]);

    return Watcher;
  }();

  function lifecycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
      // 这个方法既在初始化的时候调用，也会在更新的情况下调用
      var vm = this;
      vm.$el = patch(vm.$el, vnode);
    }; // 用户自己调用的nextTick 也是这个方法


    Vue.prototype.$nextTick = nextTick;
  }
  function mountComponent(vm, el) {
    // 更新函数 数据变化后，会再次调用这个函数
    var updateComponent = function updateComponent() {
      // 在这个函数的内部核心只做了两件事情:
      //    1、调用render方法生成虚拟dom
      //    2、使用render方法渲染真实的dom
      // 后续更新可以调用 updateComponent 这个方法
      // 这里有一个细节需要注意, 在调用render的时候，会从vm上取值，必然触发 vm 上属性的get操作
      vm._update(vm._render());
    }; // 第一次渲染的时候先调用一次
    // vue中视图更新是通过观察者模式实现的
    // 属性:  被观察者  观察者:刷新页面
    // 第一个参数是vm: 当前的实例
    // 第二个参数是更新方法，也就是 updateComponent 这个方法
    // 第三个参数是回调函数,就是更新完毕之后，需要执行的函数
    // 第四个参数 是一个标识，代表的是渲染watcher

    /**
     * true 渲染watcher 说明还有其他 watcher
     * 进行渲染的时候会创建一个watcher
     * 有了watcher 之后 我们希望属性能和watcher有一个关联
     */


    new Watcher(vm, updateComponent, function () {
      console.log("我更新了");
    }, true);
  }
  /**
   * 当生命周期的钩子已经收集完毕之后
   * 需要进行调用操作
   */

  function callHook(vm, hook) {
    var handlers = vm.$options[hook];

    if (handlers) {
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(vm);
      }
    }
  }

  var oldArrayPrototype = Array.prototype;
  /**
   * 每一个构造函数都拥有一个prototype属性
   * 每一个对象被创建的时候都拥有原型对象
   * 每一个对象通过__proto__属性访问到自己的原型对象
   */

  var arrayMethods = Object.create(oldArrayPrototype); // arrayMethods.__proto__ = Array.prototype
  // 下面的这7个方法要记住呀，非常的重要呀

  var methods = ["push", "shift", "unshift", "pop", "reverse", "sort", "splice"]; // 下面这个写法非常重要，要注意了

  methods.forEach(function (method) {
    // arrayMethods 是一个对象 对象的每一个方法都是一个函数
    // 用户只要使用这7个方法，就会走到自己写的方法中。从而做到了数组劫持
    // 你看：虽然看似是数组劫持，其实是考察原型链的继承
    arrayMethods[method] = function () {
      var _oldArrayPrototype$me;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      // 用户传递进来的参数列表 arr.push(1,2,3) ...args = [1,2,3]
      // 这里我之前一直不是很理解 其实这里 ...args 就是一个整体
      // 这里的this指向的是谁？ 谁调用就是谁 我们最终会使用 vm.arr.push() pop() 那this就是 数组
      // 这里数组没有监控索引的变化
      (_oldArrayPrototype$me = oldArrayPrototype[method]).call.apply(_oldArrayPrototype$me, [this].concat(args));

      var inserted; // 这部分有些绕，绕的地方主要是两个this指的是啥
      // 这里的this 对应的是当前的数组 __ob__ 属性对应的是Observe实例

      var ob = this.__ob__; // 这是一个自定义的属性 
      // 对于数组的新增方法 需要做处理

      switch (method) {
        case 'push': // arr.push({a:1},{b:2})

        case 'unshift':
          // 这两个方法 都是追加，追加的内容可能是对象类型 应该被再次进行劫持
          inserted = args; // 将args 赋值给这个需要插入的变量

          break;

        case 'splice':
          // vue.$set的原理
          inserted = args.slice(2);
      }

      if (inserted) {
        // 为了拿到observe 实例上面的 observeArray 方法 
        // 先提前将 这个实例绑定到了数组上面
        inserted = ob.observeArray(inserted); // 给数组新增的值也要进行观测
      } // 数组本身的watcher 更新


      ob.dep.notify();
    };
  });

  function dependArray(value) {
    for (var i = 0; i < value.length; i++) {
      // 这个 current 是数组中的数组 
      var current = value[i];
      current.__ob__ && current.__ob__.dep.depend();

      if (Array.isArray(current)) {
        dependArray(current);
      }
    }
  }
  /**
   * vue2会对对象进行遍历，将每个属性 用defineProperty 重新定义 性能差
   * defineReactive 是一个包装 内部就是使用
   * @param {*} data
   * @param {*} key
   * @param {*} value
   */


  function defineReactive(data, key, value) {
    /**
     * 你看这很显然就是一个递归的操作，发现对象里面嵌套对象
     * 还是可以进一步的做响应式的处理
     */
    var childOb = observe(value); // 这个value值也可能是一个数组，defineProperty 本身是不涉及value的
    // 这个value 是通过 defineReactive 这个函数传递进来的
    // 这个 defineReactive 每个属性都会执行, 在这里 创建一个dep

    var dep = new Dep();
    Object.defineProperty(data, key, {
      // 取值的时候创建一个dep
      get: function get() {
        // 渲染之前的时候先将watcher放在了dep.target上
        // 然后将dep.target 置空 这样 在模板下面取值时候就不会依赖收集
        if (Dep.target) {
          dep.depend(); // 让dep记住watcher 这个是比较核心的逻辑

          if (childOb) {
            childOb.dep.depend(); // 对于数组中子元素还是数组的情况，还需要做依赖收集

            if (Array.isArray(value)) {
              dependArray(value);
            }
          }
        } // console.log(key)


        return value;
      },
      set: function set(newV) {
        /**
         * 如果用户赋值一个新的对象 需要将这个对象进行劫持
         */
        if (newV !== value) {
          observe(newV);
          value = newV; // 告诉当前的属性存放的watcher执行

          dep.notify();
        }
      }
    });
  } // 如果我们给对象新增一个属性并不会触发视图更新，为了解决这个问题，我们可以给（对象本身也增加一个dep  dep存watcher） 如果
  // 增加一个属性后，我们就手动触发watcher的更新 这就是$set的实现原理。 


  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      this.dep = new Dep(); // 这里使用defineProperty 定义一个 __ob__ 属性
      // object.defineProperty 方法会直接在一个对象上定义一个新属性。
      // 或者修改一个对象的现有属性，并返回此对象。判断一个对象是否被观测过，看它有没有 __ob__ 属性
      // 注意 使用这个方法定义的属性是不会被枚举的到，不可枚举的好处是不会造成死循环，这里写的真的很好

      Object.defineProperty(data, "__ob__", {
        enumerable: false,
        configurable: false,
        value: this
      });

      if (Array.isArray(data)) {
        // 对于对象来说，我们可以给他的属性添加dep，那对于数组该如何处理呢
        // 数组的处理 对数组原来的方法进行改写，这种思路就是面向切面编程
        // 虽然在最后还是会调用数组原来的方法，但是会在外面包一层函数,
        // 可以在包装的这层函数中加入自己的一些逻辑——高阶函数
        // 在学习这部分的内容时候对于原型的理解终究是有些模糊，推荐一篇文章
        // https://github.com/mqyqingfeng/Blog/issues/2
        // 文章中有一句话说的特别清晰：每一个JavaScript对象 (null) 除外都拥有__proto__属性 指向它的原型对象
        data.__proto__ = arrayMethods; // 这里还需要处理一种情况，如果数组中的元素还是数组，或者数组中的元素是对象，
        // 我们原则上是需要支持观测内部对象变化的，虽然vue中对于数组没有监控索引的变化
        // 但是针对数组中元素是对象的情况还是做了处理。

        this.observeArray(data);
      } else {
        // 对象的处理
        this.work(data);
      }
    }
    /**
     * 观测对象
     * @param {*} data
     */


    _createClass(Observer, [{
      key: "observeArray",
      value: function observeArray(data) {
        // 对数组的每一项进行观测。
        data.forEach(function (item) {
          observe(item);
        });
      }
      /**
       * data 是一个对象 遍历对象使用object.keys
       * 这个方法已经很常见了。返回的是一个数组 数组的所有元素
       * 由这个对象的key组成
       * 划重点是所有的属性做响应式，哈哈哈，这部分一直迷糊
       * @param {*} data
       */

    }, {
      key: "work",
      value: function work(data) {
        // console.log(Object.keys(data))  ["name", "showFlag"]
        // 这里使用object.keys不会遍历原型上的属性
        Object.keys(data).forEach(function (key) {
          // 将对象中的每一个「属性」！！！都进行响应式处理
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }();
  /**
   * 这个函数接收的是 处理后的data了，还记得在initState中
   * 对data的处理吗，如果判断是函数，就拿到函数的执行结果
   * 并且使用call来绑定this指向防止迷路。
   * @param {*} data
   * @returns
   */


  function observe(data) {
    // 响应式部分是针对对象来说的，如果不是对象直接略过
    if (!isObject(data)) {
      return;
    } // 这里做一个判断，如果当前的这个数据已经被响应式了
    // 直接返回就好，不需要重复响应式，最初添加这个属性是在Observer 这个类中做的
    // 所以被观测的属性，都具有 __ob__ 属性  这个属性的值 还记得是什么吗 是那个 observer 实例


    if (data.__ob__) {
      return data.__ob__;
    } // 这里使用了一个类，之所以没有使用构造函数的原因是
    // 功能比较耦合,返回的是一个实例


    return new Observer(data);
  }

  function stateMixin(Vue) {
    /**
     *
     * @param {*} key
     * @param {*} handler
     * @param {*} options 可以接收用户传参立即调用
     */
    Vue.prototype.$watch = function (key, handler) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      options.user = true; // 标识是用户自己写的watcher

      /**
       * 原型上的方法  this指向当前实例
       */

      new Watcher(this, key, handler, options);
    };
  }
  /**
   * 初始化数据处理函数 接收的参数是vm实例了
   * 因为很多组件的实例都是需要进行初始数据的
   * @param {*} vm
   */

  function initState(vm) {
    // 还记得在 init.js 中将用户传递的 options 赋值给 vm.$options
    // 这里可以直接取出来使用了
    var opts = vm.$options;

    if (opts.props) ;

    if (opts.methods) ;

    if (opts.data) {
      // 初始化data
      initData(vm);
    }

    if (opts.computed) {
      initComputed(vm, opts.computed);
    }

    if (opts.watch) {
      initWatch(vm, opts.watch);
    }
  }
  /**
   * 这个函数专门用来处理用户传递进来的data
   * 我们写过vue的都知道，这个data中一般存放的都是页面
   * 中用于显示的响应式数据 比方说一些 tableList 还是一些展示标志位
   * @param {*} vm
   */

  function initData(vm) {
    var data = vm.$options.data; // 这里使用 isFunction 工具函数判断传入的data是不是一个函数
    // 如果是一个函数就执行这个函数，但是执行时候需要绑定vm,因为我们希望在整个执行的过程中
    // this始终指向vm，也就是当前new出来的实例。
    // 使用_data 和 data 做一个关联 两者使用同一份引用地址

    vm._data = data = typeof data === "function" ? data.call(vm) : data;

    for (var key in data) {
      proxy(vm, "_data", key);
    } // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty


    observe(data);
  }
  /**
   *
   * @param {*} vm
   * @param {*} computed
   */


  function initComputed(vm, computed) {
    // 我希望做一个关联，将key 和watcher做一个关联
    // 在vm 上面放置一个属性_computedWatchers 和 watchers 用的是同一个对象
    var watchers = vm._computedWatchers = {}; // 为什么这里需要循环，因为计算属性很多，我需要创建多个watcher
    // computed 有两种写法 我平时习惯使用第一中 那种get 个 set的 不经常使用

    for (var key in computed) {
      // 首先传递参数的时候 也是以对象的形式传递进来的
      // 用户定义的
      var userDef = computed[key]; // 依赖的属性变化就是重新取值
      // 这里做个简单的判断，如果是函数，那当前这个函数就是getter
      // 如果是对象 对象的get 方法就是要的那个值

      var getter = typeof userDef === "function" ? userDef : userDef.get;
      /**
       * 感觉watcher 这个概念真的好难呀 有点理解不了
       * computed 默认是不直接执行的 所以在options
       * 选项中 lazy 设置为true 不要默认执行
       * 将watcher 和属性做一个映射 相当于一个map
       */

      watchers[key] = new Watcher(vm, getter, function () {}, {
        lazy: true
      }); // 将key 定义在vm上

      defineComputed(vm, key, userDef);
    }
  }
  /**
   * 首先这个函数存在的意义是什么呢
   * 就是做一个缓存的功能，不要轻易触发getter方法
   * 这就是一个高阶函数
   */


  function createComputedGetter(key) {
    // 取计算属性值的时候 走的是这个函数
    // 只要createComputedGetter 函数执行
    return function computedGetter() {
      // 这里的this 指的就是vm  this._computedWatchers 包含
      // 所有的计算属性 通过key 可以拿到对应的watcher wather 中包含对应的watcher
      var watcher = this._computedWatchers[key]; // 看这个watcher是不是脏的 根据这个属性判断是否可以重新执行
      // 脏就是调用用户的getter 不脏就是不用调用用户的getter

      if (watcher.dirty) {
        watcher.evaluate();
      } // 如果当前在取完值之后 Dep.target还有值 需要继续向上收集


      if (Dep.target) {
        // 当前的Dep.target
        // 让当前的计算属性也记录watcher 
        // 计算属性watcher 内部记录了两个dep firstname lastname 反向查找
        watcher.depend();
      }

      return watcher.value;
    };
  }
  /**
   *
   * @param {*} vm
   * @param {*} key
   * @param {*} userDef
   */


  function defineComputed(vm, key, userDef) {
    var sharedProperty = {};

    if (typeof userDef === "function") {
      sharedProperty.get = userDef;
    } else {
      sharedProperty.get = createComputedGetter(key);
      sharedProperty.set = userDef.set;
    } // 本质上还是一个 Object.defineProperty
    // 定义在vm 上的 属性key 传入的 get 和 set 做了处理


    Object.defineProperty(vm, key, sharedProperty);
  }
  /**
   *
   * @param {*} vm
   * @param {*} watch
   */


  function initWatch(vm, watch) {
    // watch 传入的是一个对象 这里需要循环一下，拿到每一个key
    for (var key in watch) {
      var handler = watch[key]; // 一个 属性可以接收多个回调函数，所以这里 handler 可能是个数组

      if (Array.isArray(handler)) {
        for (var i = 0; i < handler.length; i++) {
          createWatcher(vm, key, handler[i]);
        }
      } else {
        // 如果不是一个数组，那就是一个简单的函数
        createWatcher(vm, key, handler);
      }
    }
  }
  /**
   * 创建watcher
   */


  function createWatcher(vm, key, handler) {
    // 用户可能直接使用 vm.$watch 这种形式调用。
    // 我们需要在原型上定义 $watch 方法
    return vm.$watch(key, handler);
  }

  /**
   * 将构造函数作为参数传递进去，对构造函数进行扩展，
   * 这里使用了在构造函数的原型上进行扩展的方式，所有的组件实例均可以共享
   * 表示在vue的基础上做一次混合操作
   * 这种设计思想也是非常值得借鉴的。
   * @param {*} Vue
   */

  function initMixin(Vue) {
    // 扩展原型上的方法
    Vue.prototype._init = function (options) {
      // 原型方法中的this指向实例 所有的实例都具有这些方法，
      // 这里用vm表示this的引用比较方便识别。假设在这个函数中
      // 直接有一个函数声明，函数声明中的this就不好说是谁了。
      // 但是可以在函数中使用vm,这个就特别类似于 var that = this 那种写法
      var vm = this; // 用户传递进来的options属性挂载到vm上面, 这时我们能够操作vm.$options
      // 如果用户写了全局的mixin，这个时候需要将全局的mixin 和当前用户传递进来的options合并

      vm.$options = mergeOptions(vm.constructor.options, options); // console.log(vm.$options)
      // 数据还没有创建的时候 调用

      callHook(vm, 'beforeCreate'); // 初始化状态 模板渲染的数据需要这个函数  不仅仅是有watch 还有computed props data 我们需要有一个统一的函数
      // 来处理这些参数。用户也是将不同的状态放在不同的对象下面进行维护

      initState(vm); // 数据已经初始化完毕

      callHook(vm, 'created'); // 数据初始化就这样结束了吗？ 当然没有 我们还需要将数据挂载到模板上面

      if (vm.$options.el) {
        // 将数据挂载到模板上
        vm.$mount(vm.$options.el);
      }
    };
    /**
     * 这个就是那个渲染的方法
     * 我们说，如果每次数据变化，就全部将模板替换，这种方式是很低效的
     * 因为vue2 中将模板转换成渲染函数，函数的执行效率要高很多。
     * 并且引入了虚拟dom的概念，每次数据变化，生成虚拟节点。而不是真正的操作dom
     * @param {*} el
     */


    Vue.prototype.$mount = function (el) {
      var vm = this;
      var options = vm.$options;
      el = document.querySelector(el);
      vm.$el = el; // 这里解释下为什么要做这个判断，因为会有情况是用户手动写render方法
      // 这种情况下用户手写的render优先级要更高一些。这个函数的终极目标是帮助我们创建出虚拟节点
      // 这部分信息量比较大，我们可以在options的选项中添加 template 字段
      // 如果没写，才使用 html中写的dom节点，这点应该尤其注意

      if (!options.render) {
        var template = options.template;

        if (!template) {
          template = el.outerHTML; // 下面这一行打印的是字符串
          // console.log(template) <div id="app">{{name}}</div>
          // 这个函数是一个核心的函数，将我们传递进去的模板编译成 render函数

          var render = complileToFunction(template);
          options.render = render;
        }
      } // 调用render方法 渲染成真实的dom替换掉页面的内容
      // 这个方法是定义在生命周期这个包中的


      mountComponent(vm);
    };
  }

  function createElement(vm, tag) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    // 这里我们应该对于原生标签和 组件做一个区分，最简单的就是区分出原生标签
    // 剩下的就是组件标签
    if (isReservedTag(tag)) {
      for (var _len = arguments.length, children = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
        children[_key - 3] = arguments[_key];
      }

      return vnode(vm, tag, data, data.key, children, undefined);
    } else {
      console.log('组件的渲染');
    }
  }
  function createTextElement(vm, text) {
    return vnode(vm, undefined, undefined, undefined, undefined, text);
  }

  function vnode(vm, tag, data, key, children, text) {
    return {
      vm: vm,
      tag: tag,
      data: data,
      key: key,
      children: children,
      text: text
    };
  }

  function renderMixin(Vue) {
    Vue.prototype._c = function () {
      // createElement
      return createElement.apply(void 0, [this].concat(Array.prototype.slice.call(arguments)));
    };

    Vue.prototype._v = function (text) {
      // createTextElement
      return createTextElement(this, text);
    };

    Vue.prototype._s = function (val) {
      if (_typeof(val) === "object") {
        return JSON.stringify(val);
      }

      return val;
    };

    Vue.prototype._render = function () {
      var vm = this;
      var render = vm.$options.render; // 这个render 就是我们解析出来的render方法 同时也有可能是用户自己写的render

      var vnode = render.call(vm);
      return vnode;
    };
  }

  /**
   * 这里是一个函数声明，只有在new的时候才会调用
   * 接收一个 options 作为参数，options 是一个对象
   * 这个options就是用户传递进来的配置选项
   * 这个配置选项中包含 data el watch computed methods。。。
   * 一些列的参数，在使用vue-cli脚手架进行开发的时候
   * 都是单组件文件 每个组件本质上都是一个实例
   * @param {*} options
   */

  function Vue(options) {
    // options 为用户传入的选项
    this._init(options); // 初始化操作

  } // 只要加载了index.js 这个文件下面的函数都会执行
  // 并且是首先执行的，那么所有在mixin上挂载的所有原型
  // 方法都会预先定义执行，init 是在new 的时候执行的


  initMixin(Vue);
  stateMixin(Vue);
  renderMixin(Vue); // 存放的是 _render

  lifecycleMixin(Vue); // 存放的是 _update

  initGlobalApi(Vue); // 初始化全局api
  var oldTemplate = "<div style=\"color:red;background:yellow\" a=\"1\"></div>";
  var vm1 = new Vue({
    data: {
      message: "hello world"
    }
  });
  var render1 = complileToFunction(oldTemplate);
  var oldVnode = render1.call(vm1); // console.log(createEle(oldVnode))

  document.body.appendChild(createEle(oldVnode));
  var newTemplate = "<div style=\"color:blue\" b=\"2\">{{message}}</div>";
  var vm2 = new Vue({
    data: {
      message: "vue"
    }
  });
  var render2 = complileToFunction(newTemplate);
  var newVnode = render2.call(vm2); // 根据新的虚拟节点更新老的节点，老的能够复用尽量复用

  setTimeout(function () {
    patch(oldVnode, newVnode);
  }, 2000); // 将vue导出

  return Vue;

})));
//# sourceMappingURL=vue.js.map
