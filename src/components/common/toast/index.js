// Toast 组件封装
// Toast.vue导入
import Toast from "./Toast"

//创建一个空的obj对象
const obj = {}
obj.install = function (Vue) {
  // document.body.appendChild(Toast.$el)

  // 1.创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // 2.new方式，根据组件构造器，可以创建出来一个组件对象toast
  const toast = new toastContrustor()
  // 3.将组件对象toast，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.toast.$el对应的挂载元素是div
  document.body.appendChild(toast.$el)
  
  Vue.prototype.$toast = toast

}
export default obj