import Vue from 'vue'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

new Vue({
  name: "root",
  store, // 这个store的目的是让所有的组件都可以访问到这个对象
  render: h => h(App)
}).$mount('#app')
