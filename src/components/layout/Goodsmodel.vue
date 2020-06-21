<template>
    <div class="model"
         ref="model">
        <div>
            <p @click="closemdel"
               class="closemodel">X</p>
            <img :src="data.imgUrl"
                 alt="">
            <div class="top">
                <p class="toptitle">{{data.name}}</p>
                <p>月销1232 好评率100%</p>
                <div class="topcon">
                    <p>
                        <span class="price">￥{{data.price}}</span>
                        <del>32</del>
                    </p>
                    <div class="addcar">加入购物车</div>
                </div>
            </div>
            <div class="line"></div>
            <div class="intro">
                <div class="title">商品介绍</div>
                <div>{{data.goodsDesc}}</div>
            </div>
            <div class="line"></div>
            <div class="ratings">
                <!-- 全部评价 -->
                <div class="isgood">
                    <div class="all"
                         @click="type='all'"  :class="{active:type==='all'}">全部</div>
                    <div class="good"
                         @click="type='ok'"  :class="{active:type==='ok'}">推荐</div>
                    <div class="nogood"
                         @click="type='nook'"  :class="{active:type==='nook'}">吐槽</div>
                </div>
                <!-- 是否看有内容的评价 -->
                <div class="hascontent">
                    <van-icon name="checked"  :class="{active:type==='istest'}"
                              @click="type='istest'"
                            />只看有内容的评价
                </div>
                <div class="contentlist">
                    <ul>
                        <li v-for="(item,i) in newratings"
                            :key="i">
                            <div class="top-item">
                                <p>{{item.rateTime | filtertime}}</p>
                                <p>{{item.username}}
                                    <img :src="item.avatar">
                                </p>
                            </div>
                            <div class="text">
                                <img src="../../assets/imgs/no.png"
                                     alt=""
                                     v-if="item.rateType">
                                <img src="../../assets/imgs/good.png"
                                     alt=""
                                     v-else>

                                <div>{{item.text}}</div>
                            </div>
                        </li>
                    </ul>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
import Vue from 'vue';
import { Rate } from 'vant';
import { Icon } from 'vant';
 import moment from "moment"
 import {formatdate} from "@/utils/formatedate.js"
import Bscoll from "better-scroll"
import { types } from 'util';
 
Vue.use(Icon);
Vue.use(Rate);
    export default {
        props:['data'],
        data(){
            return{
                ischeck:false,
                isred:false,
                ratings:{},
                type:'all',
              
            }
        },
           methods:{
            //    关闭模态框
            closemdel(){
                this.$emit('close')
            },
          
        },
        filters:{
            filtertime(date){
                // return moment(date).format('YYYY-MM-DD HH:mm:ss')
                return formatdate(date)
            }
        },
        watch: {
            data (val, oldVal) {
                if (val !== oldVal) {
                    // this.newratings=val.ratings;
                    this.ratings=val.ratings;
                    this.data=val;
                    // console.log( this.ratings)
                    // console.log( "旧",oldVal)
                    // console.log( "新",val)
                }
             },
        },
       mounted(){
           this.model=new Bscoll(this.$refs.model,{
                click: true // 允许点击
           })
       },
       computed:{
           newratings(){
               if(this.type==="all"){
                   return this.ratings
               }else if(this.type==="ok"){
                    return this.ratings.filter(v=>{ return v.rateType==0})
               }else if(this.type==="nook"){
                     return this.ratings.filter(v=>{ return v.rateType==1})
               }else if(this.type==="istest"){
                     return this.ratings.filter(v=>{ return v.text })
               }
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
  height:620px;;
  background: #ffffff;
  line-height: 25px;
  overflow: hidden;
//   margin-bottom: 60px!important;
//   padding-bottom: 60px;
  color: #666;
  .closemodel {
    position: absolute;
    top: 5px;
    right: 5px;
    color: #ffffff;
  
    width: 28px;
    height: 28px;;
    border-radius: 50%;
    font-size: 20px;
    text-align: center;
    background-color: orange;
  }
  img {
    width: 100%;
    height: 375px;
  }
  .top {
    padding: 10px;
    box-sizing: border-box;
    line-height: 25px;
    .toptitle {
      font-size: 18px;
      font-weight: bold;
    }
    .topcon {
      display: flex;
      justify-content: space-between;
      .price {
        color: red;
        margin-right: 10px;
      }
      .addcar {
        width: 100px;
        height: 35px;
        color: #ffffff;
        background-color: #00a0db;
        border-radius: 10px;
        line-height: 35px;
        text-align: center;
        font-size: 14px;
      }
    }
  }
  .line {
    width: 100%;
    height: 15px;
    border: 1px solid #cccccc;
    background: #f4f5f7;
  }
  .title {
    font-size: 16px;
    font-weight: bold;
  }
  .intro {
    padding: 10px;
  }
  .ratings {
    box-sizing: border-box;
     .active{
         background: orange!important;
         color: #ffffff!important;
     }
    .isgood {
      display: flex;
      padding: 20px;
      width: 90%;
      margin: 0 auto;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;
      div {
        width: 80px;
        height: 50px;

        margin-right: 10px;
        text-align: center;
        line-height: 50px;
        &.all {
          background-color: #00a0dc;
        }
        &.good {
          background-color: #ccecf7;
        }
        &.nogood {
          background-color: #eaebed;
        }
      }
    }
    .hascontent {
      padding: 20px;
      box-sizing: border-box;
      line-height: 25px;
      border-bottom: 1px solid #cccccc;
      .van-icon {
        font-size: 25px;
        vertical-align: middle;
        margin-right: 20px;
        &.active {
          color: #00a0db;
        }
      }
    }
    .contentlist {
       
      ul {
        li {
          padding: 10px;
          box-sizing: border-box;
          border-bottom: 1px solid #cccccc;
          .top-item {
            display: flex;
            justify-content: space-between;
            img {
              width: 20px;
              height: 20px;
              border-radius: 50%;
            }
          }
          .text {
            display: flex;
            img {
              width: 20px;
              height: 20px;
              vertical-align: middle;
            }
          }
        }
      }
    }
  }
}
</style>