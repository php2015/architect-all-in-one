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

  function mountComponent(vm, el) {
    // console.log(vm);
    // console.log(el);
    // 更新函数 数据变化后，会再次调用这个函数
    var updateComponent = function updateComponent() {
      // 在这个函数的内部核心只做了两件事情 1、调用render方法生成虚拟dom 2、使用render方法 渲染真实的dom
      // 后续更新可以调用 updateComponent 这个方法
      vm._update(vm._render());
    }; // 第一次渲染的时候先调用一次


    updateComponent();
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
      }
    };
  });

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
    observe(value);
    Object.defineProperty(data, key, {
      get: function get() {
        return value;
      },
      set: function set(newV) {
        /**
         * 如果用户赋值一个新的对象 需要将这个对象进行劫持
         */
        observe(newV);
        value = newV;
      }
    });
  }
  /**
   * 对象没有类型 类有类型 使用类的话入参会在构造函数中被作为参数，接收到
   *
   */


  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      // 这里使用defineProperty 定义一个 __ob__ 属性
      // object.defineProperty 方法会直接在一个对象上定义一个新属性。
      // 或者修改一个对象的现有属性，并返回此对象。判断一个对象是否被观测过，看它有没有 __ob__ 属性
      // 注意 使用这个方法定义的属性是不会被枚举的到，不可枚举的好处是不会造成死循环，这里写的真的很好
      Object.defineProperty(data, "__ob__", {
        enumerable: false,
        configurable: false,
        value: this
      });

      if (Array.isArray(data)) {
        // 数组的处理 对数组原来的方法进行改写，这种思路就是面向切面编程
        // 虽然在最后还是会调用数组原来的方法，但是会在外面包一层函数,
        // 可以在包装的这层函数中加入自己的一些逻辑——高阶函数
        // 在学习这部分的内容时候对于原型的理解终究是有些模糊，推荐一篇文章
        // https://github.com/mqyqingfeng/Blog/issues/2
        // 文章中有一句话说的特别清晰：每一个JavaScript对象 (null) 除外都拥有__proto__属性 指向它的原型对象
        data.__proto__ = arrayMethods; // 这里还需要处理一种情况，如果数组中的元素还是数组，或者数组中的元素是对象，
        // 我们原则上是需要支持观测内部对象变化的，虽然vue中对于数组没有监控索引的变化
        // 但是针对数组中元素是对象的情况还是做了处理

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
    // 所以被观测的属性，都具有 __ob__ 属性


    if (data.__ob__) {
      return data;
    } // 这里使用了一个类，之所以没有使用构造函数的原因是
    // 功能比较耦合,返回的是一个实例


    return new Observer(data);
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

    if (opts.computed) ;

    if (opts.watch) ;
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
   * 将构造函数作为参数传递进去，对构造函数进行扩展，
   * 这里使用了在构造函数的原型上进行扩展的方式，所有的组件实例均可以共享
   * 表示在vue的基础上做一次混合操作
   * 这种设计思想也是非常值得借鉴的。
   * @param {*} Vue
   */

  function initMixin(Vue) {
    // 扩展原型上的方法
    Vue.prototype._init = function (options) {
      // 原型方法中的this指向实例 所有的实例 都具有这些方法
      // 这里用vm表示this的引用比较方便识别。假设在这个函数中
      // 直接有一个函数声明，函数声明中的this就不好说是谁了。
      // 但是可以在函数中使用vm,这个就特别类似于 var that = this 那种写法
      var vm = this; // 用户传递进来的选项挂载到上面,我们能够操作 vm.$options

      vm.$options = options; // 初始化状态 为什么要有这个 函数 不仅仅是 有watch
      // 还有computed props data 我们需要有一个统一的函数
      // 来处理这些参数。

      initState(vm); // 数据初始化就这样结束了吗？ 当然没有 我们还需要将数据挂载到模板上面

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
      el = document.querySelector(el); // 这里解释下为什么要做这个判断，因为会有情况是用户手动写render方法
      // 这种情况下用户手写的render优先级要更高一些。这个函数的终极目标是帮助我们
      // 创建出虚拟节点
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

  /**
   * 接收一个option作为参数 是一个对象
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


  initMixin(Vue); // 将vue导出

  return Vue;

})));
//# sourceMappingURL=vue.js.map
