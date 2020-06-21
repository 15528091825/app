<template>
  <div class="app">
    <!-- 头部组件 -->

    <Header :seller="seller" />

    <!-- 导航组件 -->
    <van-sticky>
      <Nav/>
    </van-sticky>
    <!-- 内容部分 -->
    <div class="content">
      <router-view :seller="seller"
                  />
    </div>

    <!-- 购物车组件 -->

    <Shopcar/>

  </div>
</template>

<script>
import Vue from 'vue';
import { Sticky } from 'vant';

Vue.use(Sticky);
import Header from "@/components/layout/Header/Header.vue"
import Nav from "@/components/layout/Nav.vue"
import Shopcar from "@/components/layout/Footer/Shopcar.vue"
import {getSeller,getGoods,getRatings} from "@/api/app.js"

  export default {
    components:{
      Header,
      Nav,
      Shopcar
    },
    data(){
      return {
        seller:{},
        goodslist:{}
      }
    },
   async created(){
     let {data}=await getSeller();
      this.seller=data;
     let {goodsList}=await getGoods();
     
      for(let item of goodsList){
        for(let food of item.foods){
          food.count=0
        }
      }
    
    //  console.log(data)
    // 将数据保存到仓库中
    this.$store.commit('ADD_GOODS',goodsList)
    //  console.log(res3.data)
    }
    
  }

</script>

<style lang="less" scoped>
.app {
  height: 100%;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow-y: scroll;
  }
}
</style>