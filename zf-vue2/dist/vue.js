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

  function isFunction(val) {
    return typeof val === "function";
  }
  function isObject(val) {
    return _typeof(val) === "object" && val !== null;
  }

  var Observer = /*#__PURE__*/function () {
    function Observer(data) {
      _classCallCheck(this, Observer);

      this.work(data);
    }

    _createClass(Observer, [{
      key: "work",
      value: function work(data) {
        // 这里使用object.keys 不会遍历原型上的属性
        Object.keys(data).forEach(function (key) {
          // 将对象中的每一个属性都进行响应式处理
          defineReactive(data, key, data[key]);
        });
      }
    }]);

    return Observer;
  }(); // vue2会对对象进行遍历，将每个属性 用defineProperty 重新定义 性能差


  function defineReactive(data, key, value) {}

  function observer(data) {
    console.log(data); // 响应式部分是针对对象来说的，如果不是对象直接略过

    if (!isObject(data)) {
      return;
    } // 这里使用了一个类，之所以没有使用构造函数的原因是
    // 功能比较耦合


    return new Observer(data);
  }

  function initState(vm) {
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

  function initData(vm) {
    var data = vm.$options.data; // 这里使用 isFunction 工具函数判断传入的data是不是一个函数
    // 如果是一个函数就执行这个函数，但是执行时候需要绑定vm,我们希望在整个执行的过程中
    // this使用执行vm 也就是当前new出来的实例。

    data = isFunction(data) ? data.call(vm) : data; // vue2中会将data中的所有数据 进行数据劫持 Object.defineProperty

    observer(data);
  }

  function initMixin(Vue) {
    // 扩展原型上的方法
    Vue.prototype._init = function (options) {
      // 原型方法中的this指向实例 所有的实例 都具有这些方法
      var vm = this; // 用户传递进来的选项挂载到上面

      vm.$options = options; // 初始化状态

      initState(vm);
    };
  }

  function Vue(options) {
    // options 为用户传入的选项
    this._init(options); // 初始化操作

  } // 只要加载了index.js 这个文件下面的函数都会执行


  initMixin(Vue); // 将vue导出

  return Vue;

})));
//# sourceMappingURL=vue.js.map
