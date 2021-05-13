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

      initState(vm);
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
