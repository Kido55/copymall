import Vue from 'vue'
import VueRouter from 'vue-router'

// 1.安装插件
Vue.use(VueRouter)    //括号内不能带引号，带引号会报错
// 2.创建路由对象
const Home = () => import('../views/home/Home.vue')
// import Home from '../views/home/Home.vue'
const Category = () => import('../views/category/Category.vue')
const Cart = () => import('../views/cart/Cart.vue')
const Profile = () => import('../views/profile/Profile.vue')
const Detail = () => import('../views/detail/Detail.vue')

const router = new VueRouter({
  routes:[    //配置路由规则
    { path:'/', redirect: '/home'},
    { path:'/home', component: Home }, 
    { path:'/category', component: Category },
    { path:'/cart', component: Cart }, 
    { path:'/profile', component: Profile },
    { path:'/detail/:iid', component: Detail } 
  ],
  mode:'history'   //网页路径出现""/#/home",是hash模式，此处最好改为history模式
})
// 3.导出 router
export default router