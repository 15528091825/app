<template>
    <div class="model">
        <div class="content">
            <!-- {{seller}} -->
            <div class="top">
                {{seller.name}}
                <van-rate v-model="value"
                          allow-half/>
            </div>
            <div class="main">
                <div class="text-title">
                    <span class="line"></span>
                    <span class="title">优惠信息</span>
                    <span class="line"></span>
                </div>
                <ul>
                    <li v-if="seller.supports"
                        v-for="(item,i) in seller.supports"
                        :key="i">
                        <img :src="imgs[i]" width="25" height="20"> {{item}}

                    </li>
                </ul>
            </div>
            <div class="bottom">
                <div class="text-title">
                    <span class="line"></span>
                    <span class="title">店铺公告</span>
                    <span class="line"></span>
                </div>
                <div>{{seller.bulletin}}</div>

            </div>
        </div>
        <div class="close">
            <span @click="closemodel">X</span>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Rate } from 'vant';

Vue.use(Rate);
    export default {
        props:['seller'],
        data(){
           return{
                value:4.5,
                imgs:[
                    require('@/assets/imgs/decrease.png'),
                    require('@/assets/imgs/discount.png'),
                    require('@/assets/imgs/discount.png'),
                    require('@/assets/imgs/special.png'),
                    require('@/assets/imgs/special.png'),
                    require('@/assets/imgs/special.png'),
                   
                ],
           }
        },
        methods:{
            closemodel(){
                this.$emit('close')
            }
        }
    }
</script>

<style lang="less" scoped>
.model {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  .content {
    flex: 1;
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    line-height: 30px;

    .top {
      font-size: 20px;
      font-weight: bold;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex: 0 0 150px;
      line-height: 35px;
    }
    .main {
      flex: 0 0 200px;
      img{
          vertical-align: middle;
      }
    }
    .bottom {
      flex: 1;
    }
    .text-title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 15px;
      .line {
        flex: 1;
        border-bottom: 1px solid #aaaaaa;
      }
      .title {
        flex: 0 0 100px;
        text-align: center;
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .close {
    flex: 0 0 30px;
    text-align: center;
    padding-bottom: 10px;
    span {
      font-size: 24px;
      width: 40px;
      height: 30px;
      display: inline-block;
      line-height: 30px;
    }
  }
}
</style>