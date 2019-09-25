import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

// 添加事件总线对象
Vue.prototype.$bus = new Vue()
// 安装toast插件
Vue.use(toast)
// 解决移动端300ms点击延迟
FastClick.attach(document.body)
// 安装使用懒加载插件
Vue.use(VueLazyload, {
  loading: require('./assets/images/common/placeholder.png')
})

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
