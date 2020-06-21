<template>
    <div class="cars">
        <div class="shopcar"
             @click="showmodel">
            <div class="car"  :class="{active:totalCount>0}">
                <div class="imgs" >
                    <img src="@/assets/imgs/car.jpg"
                         width="40"
                         height="40"
                         alt="">
                    <span v-if="totalCount>0" class="imgstotal">{{totalCount}}</span>
                </div>
            </div>
            <div class="carlist">
                <div class="money">
                    <span v-if="totalCount>0">￥{{totalPrice}}</span>
                    <span v-else style="font-size:14px">未选中商品</span>
                    <span style="font-size:14px" >配送费6元</span>
                </div>
              
                <div class="moneysend" v-if="totalPrice>20">
                    <a href=""> 去结算</a>
                </div>
                <div class="moneysend" v-else-if="totalPrice>0">
                   还差{{ (20 - totalPrice).toFixed(2) }}元
                </div>
                <div class="moneysend" v-else>￥20起送</div>
            </div>
        </div>

        <!--背景的 模态框 -->
        <transition name="detail">
            <div class="modelbox"
                 v-show="isvisible   && totalCount>0">
            </div>
        </transition>
        <!--购物车列表的模态框  -->
        <div class="bottom-list"  v-show="isvisible && totalCount>0">
            <div class="top">
                <div>已选商品</div>
                <div @click="clearcar">清空</div>
            </div>
            <!-- 商品列表 -->
            <ul class="list">
                <li v-for="(item,i) in shopListData" :key="i">
                    <div class="list-left">
                        <p>{{item.name}}</p>
                        <p>单价{{item.price}}</p>
                        <span class="money">合计{{(item.count*item.price).toFixed(2)}}</span>
                    </div>
                    <div class="addamount">
                        <div class="icondata">
                            <i class="iconfont icon-jianshao" @click.stop="changcount(item.name,-1)"></i>
                            <span>{{item.count}}</span>
                            <i class="iconfont icon-tianjia" @click.stop="changcount(item.name,1)"></i>
                        </div>
                    </div>
                </li>

            </ul>
            <div class="eatingbox">
                <div>餐盒</div>
                <div class="money">32</div>
            </div>
        </div>
    </div>

</template>

<script>

import Model from "./Model"
import { timingSafeEqual } from 'crypto';
    export default {
        components:{
            Model
        },
        data(){
            return{
                isvisible:false
            }
        },
        methods:{
            showmodel(){
                this.isvisible=!this.isvisible
            },
            getvalue(data){
                console.log("jiage",data)

            },
            // 点击商品数量
            changcount(name,num){
                // 调取仓库的方法
                this.$store.commit('CHANGE_NUM',{name,num})
            },
            // 清空购物车
            clearcar(){
               this.$store.commit('CLEAR_COUNT');
              //  关闭
               this.isvisible=false
            }
           
           
           
        },
        computed:{
          // 获取到仓库里面的购物车数量大于0的列表
          shopListData(){
           
            return this.$store.getters.getOrderList;
          },
           // 获取商品的总数量
            totalCount(){
              let total=0;
              this.shopListData.forEach(v=>{
               total+=v.count

                })
                // console.log(total)
                if(total===0){
                  this.isvisible=false;
                }
                return total
            },
            // 获取商品的总价格
            totalPrice(){
               let totalprice=0;
              this.shopListData.forEach(v=>{
               totalprice+=(v.count*v.price.toFixed(2))

                })
                // console.log(totalprice)
                return totalprice
            }
        }
    }
</script>

<style lang="less" scoped>
.cars {
  flex: 0 0 50px;

  .shopcar {
    box-sizing: border-box;
    background-color: #141c27;
    // padding: 20px;
    display: flex;
    color: #808589;
    justify-content: space-around;
    padding-left: 100px;
    align-items: center;
    position: relative;
    z-index: 500;
    .car {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      position: absolute;
      // border: 1px solid red;
      background-color: #131b26;
      top: -20px;
      left: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
        &.active{
          background: orange;
        }
      //   overflow: hidden;
      .imgs {
        width: 56px;
        height: 56px;
        background-color: #2b343d;
        //   border: 1px solid red;
        border-radius: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        img {
          border-radius: 5px;
          vertical-align: middle;
        }
        .imgstotal{
          position: absolute;
          top: 0px;
          right: 9px;
          display: inline-block;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          line-height: 30px;
          text-align: center;
           background: orange;
           color: #ffffff;
        }
      }
    }
    .carlist {
      width: 100%;
      height: 50px;;
      display: flex;
      justify-content: center;
      align-items: center;
      .money {
        font-size: 24px;
        font-weight: bold;
        flex: 1;
        height: 50px;
        line-height: 25px;
        text-align: center;
        display: flex;
        flex-direction: column;
      }
      .moneysend {
        font-size: 18px;
        font-weight: bold;
      
        background-color: #2b343b;
        flex: 0 0 100px;;
        line-height: 50px;
        text-align: center;
        a{
          color: orange;
        }
      }
      .delivery {
        flex: 1;
        text-align: left;
        font-size: 12px;
      }
    }
  }
  .detail-enter-active,
  .detail-leave-active {
    transition: opacity 0.5s;
  }
  .detail-enter,
  .detail-leave-to {
    opacity: 0;
  }

  //   模态框
  .modelbox {
    // border: 1px solid red;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
  }

  //   列表的模态框
  .bottom-list {
    font-size: 12px;
    position: absolute;
    bottom: 50px;
    left: 0;
    width: 100%;
    height: 300px;
    overflow: scroll;
    background-color: #ffffff;
     z-index: 20;
    animation: myfirst 0.5s;
    -webkit-animation: myfirst 0.5s;
    animation-fill-mode: forwards; /*当动画完成时，动画会停留在最后一帧。*/

    box-sizing: border-box;
    line-height: 25px;
    .money {
      color: red;
      font-weight: bold;
    }
    .top {
      height: 40px;
      line-height: 20px;
      display: flex;
      background-color: #eceff1;
      justify-content: space-between;
      padding: 10px;
      box-sizing: border-box;
    }
    .list {
      width: 100%;
      li {
        display: flex;
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
        .list-left {
          width: 100%;
          display: flex;
          flex: 1;
          justify-content: space-between;
        }
        .addamount {
          flex: 0 0 80px;
          .icondata {
            .iconfont {
              color: #2395ff;
              background-color: #fff;
              margin-left: 10px;
              font-size: 22px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .eatingbox {
      display: flex;
      div {
        flex: 1;
      }
    }
  }
  @-webkit-keyframes myfirst {
    0% {
      bottom: -10%;
    }
    50% {
      bottom: 5%;
    }
    100% {
      bottom: 0%;
    }
  }
}
</style>