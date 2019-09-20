import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  el:'#app',
  render: h => h(App),
  router,
  store
})

// 写法二：
// $mount()手动挂载
// 当Vue实例没有el属性时，则该实例尚没有挂载到某个dom中；
// 假如需要延迟挂载，可以在之后手动调用vm.$mount()方法来挂载。new Vue时，el和$mount并没有本质上的不同。

// new Vue({
//   render: h => h(App),
//   router
// }).$mount('#app')
