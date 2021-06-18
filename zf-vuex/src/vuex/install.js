export let Vue
/**
 * use 方法会传递参数Vue 在全局声明一个vue
 * 变量用来接收传递进来的这个vue 保证了 和项目中使用的
 * vue的版本一致性
 * @param {*} _Vue
 */
function install(_Vue) {
  Vue = _Vue
  // 还记得在main.js中 注册的store吗，为了让所有的组件（包括子组件、孙子组件）
  // 这里使用了mixin 混入了一个beforeCreate 最先执行
  Vue.mixin({
    beforeCreate() {
      // 这里打印的名字肯定是root App 是有顺序的
      // 这里的this.指的是每个组件的实例
      // console.log(this.$options.name)
      // 我们需要做的就是获取在根组件注册的store对象，将它共享给
      // 所有的组件，那如何判断这个根组件呢，还是使用options 中的参数
      let options = this.$options
      if (options.store) {
        // 在项目配置中只有根组件传递了这个属性 我们认为是走的父组件
        console.log(options.name) // root
        // 将传递进来的store赋值给 当前实例的 $store 属性
        this.$store = options.store
      } else {
        // 没有这个store 属性的我们认为是子组件 为了保证是子组件
        // 并且父亲上有 $store
        if (this.$parent && this.$parent.$store) {
          this.$store = this.$parent.$store
        }
      }
    },
  })
}

export default install
