import Vue from 'vue'
import VueRouter from 'vue-router'

/*路由的懒加载*/
const Home = () => import('../views/home/Home')
const Category = () => import('../views/category/Category')
const Cart = () => import('../views/cart/Cart')
const Profile = () => import('../views/profile/Profile')
const Detail = () => import('../views/detail/Detail')

//1.安装插件
Vue.use(VueRouter)

const routes=[
  {
    path:'',//配置默认显示界面
    redirect:'/home'
  },
  {
    path: '/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  }
]

//2.创建路由对象
const router = new VueRouter({
  routes,
  mode:'history'
})

//3.导出
export default router