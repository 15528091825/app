import Vue from 'vue'
import VueRouter from 'vue-router'
import Goods from '@/views/Goods.vue'


Vue.use(VueRouter)

  const routes = [
    // 默认
    {
      path:'/',
      redirect:'/goods'
    },
    // 商品
    {
      path:'/goods',
     component:Goods,
    },
    // 评价
    {
      path:'/ratings',
     component:()=>import('@/views/Ratings.vue'),
    },
    // 商家
    {
      path:'/seller',
     component:()=>import('@/views/Seller.vue'),
    },
  
]

const router = new VueRouter({
  routes
})

export default router
