<template>
    <div class="ratings"
         ref="ratings">
        <div>
            <div class="top">
                <div class="left">
                    <p class="socore">{{score}}</p>
                    <p class="titlebold">综合评分</p>
                    <p>高于周边商家69.2%</p>

                </div>
                <div class="right">
                    <div>
                        <span class="titlebold">服务态度</span>
                        <van-rate v-model="score"
                                  allow-half/>
                    </div>
                    <div>
                        <span class="titlebold">服务态度</span>
                        <van-rate v-model="score"
                                  allow-half/>
                    </div>
                    <div>
                        <span class="titlebold">送达时间</span>
                        {{deliverys}}分钟
                    </div>
                </div>
            </div>
            <div class="line"></div>
            <div class="ratings-all">
                <!-- 全部评价 -->
                <div class="isgood">
                    <div class="all"
                         @click="type='all'"   :class="{active:type==='all'}">全部{{allLen}}</div>
                    <div class="good"
                         @click="type='ok'"  :class="{active:type==='ok'}">推荐{{okLen}}</div>
                    <div class="nogood"
                         @click="type='nook'"  :class="{active:type==='nook'}">吐槽{{noOkLen}}</div>
                </div>
                <!-- 是否看有内容的评价 -->
                <div class="hascontent">
                    <van-icon name="checked"
                              @click="type='ischeck'"
                              :class="{active:type==='ischeck'}" />只看有内容的评价
                </div>

                <!--    v-if="newdata?newdata:data" -->

                <!-- 评价列表 -->
                <div class="ratingslist">
                    <ul>
                        <li v-for="(item,i) in ratingsData"
                            :key="i">
                            <img :src="item.avatar"
                                 alt="">
                            <div class="con">
                                <div class="con-title">
                                    <div class="name">{{item.username}}</div>
                                    <div class="time">
                                        {{ item.rateTime | filtertime}}

                                    </div>
                                </div>
                                <div class="con-main">
                                    <div class="start">
                                        <van-rate v-model="score"
                                                  allow-half/>
                                        <span v-if="item.deliveryTime">
                                            {{item.deliveryTime}}分钟送达
                                        </span>
                                    </div>
                                    <div class="content">{{item.text}}</div>
                                    <div class="recommded">
                                        <img src="../assets/imgs/no.png"
                                             v-if="item.rateType">
                                        <img src="../assets/imgs/good.png"
                                             v-else>

                                        <div class="recommded-list">
                                            <span v-if="item.recommend"
                                                  v-for="m in item.recommend"
                                                  :key="m">{{m}}</span>
                                        </div>
                                    </div>

                                </div>

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

Vue.use(Icon);
Vue.use(Rate);
 import {getSeller,getGoods,getRatings} from "@/api/app.js"
 import {formatdate} from "@/utils/formatedate.js"
import Bscoll from "better-scroll"

    export default {
        data(){
            return{
                score:0,//评分
                deliverys:0,//平均送达时间
                ischeck:false,
            
                data:{},
               
                // newdata:{},
                // retaings:[],
                type:'all',
                ratings:[],
                
            }
        },
        methods:{
            // // 只看有内容的评价
            changcolor(){
                this.ischeck=!this.ischeck;
                this.type='ischeck';
            },
          
        
        },
        filters:{
            filtertime(date){
                
                return formatdate(date)
            }
        },
       
      async  created(){
             let {data}=await getRatings();
            //  console.log('评价',data)
             let num=0;
             let n=0;
             let delivery=0;
             let delivery_num=0;
            data.forEach((v,i)=>{
                num+=v.score;
                delivery+= parseInt(v.deliveryTime?v.deliveryTime:0);
                if(!v.deliveryTime){
                    delivery_num++
                }
                n++
               
            })
            this.score=Number((num/(n)).toFixed(1));
            this.deliverys=(delivery/(n-delivery_num)).toFixed(1);
            // this.newdata=data;
            // this.data=data;  
             this.ratings = data;
        },
        mounted(){
            new Bscoll(this.$refs.ratings,{
                click:true,
            })
        },
        // 计算属性
        computed:{
            // 推荐
            allLen(){
                return this.ratings.length
            },
            // 满意
            okLen(){
                return this.ratings.filter(v=>v.rateType===0).length
            },
            // 吐槽
            noOkLen(){
                return  this.ratings.filter(v=>v.rateType===1).length
            },
            // 循环评价的内容
            ratingsData(){
                if(this.type==="all"){
                    return this.ratings;
                }else if(this.type==="ok"){
                      return this.ratings.filter(v=>v.rateType===0)
                }else if(this.type==="nook"){
                      return this.ratings.filter(v=>v.rateType===1)
                }else if(this.type==="ischeck"){
                           this.ischeck=!this.ischeck;
                      return this.ratings.filter(v=> v.text )
                }
            }

        }
    }
</script>

<style lang="less" scoped>
.ratings {
  height: 100%;
  overflow: hidden;
  color: #666;
  .top {
    padding: 10px;
    box-sizing: border-box;
    line-height: 30px;
    display: flex;
    .titlebold {
      font-size: 16px;
      font-weight: bold;
    }
    .left {
      flex: 0 0 150px;
      border-right: 1px solid #cccccc;
      padding: 10px 0px;
      box-sizing: border-box;
      text-align: center;
      .socore {
        font-size: 24px;
        color: gold;
      }
    }
    .right {
      padding: 10px;
      box-sizing: border-box;
    }
  }
  .line {
    width: 100%;
    height: 15px;
    border: 1px solid #cccccc;
    background: #f4f5f7;
  }
  .ratings-all {
    box-sizing: border-box;
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
      }
    }
    .active {
      color: #ffffff!important;
      background-color: orange!important;
    }
    .ratingslist {
      ul {
        li {
          padding: 10px;
          display: flex;
          border-bottom: 1px solid #cccccc;
          line-height: 25px;

          img {
            flex: 0 0 50px;
            border-radius: 50%;
            margin-right: 10px;
            width: 40px;
            height: 40px;
          }
          .con {
            flex: 1;
            display: flex;
            flex-direction: column;
            .con-title {
              display: flex;
              flex-direction: row;
              width: 100%;
              justify-content: space-between;
              div {
                flex: 1;
                &.time {
                  text-align: right;
                  font-size: 12px;
                }
              }
            }
          }
          .con-main {
            .start {
              .van-rate {
                vertical-align: top;
              }
            }
            .content {
              margin-top: 10px;
              line-height: 25px;
              font-weight: bold;
            }
            .recommded {
              display: flex;
              flex-wrap: nowrap;
              img {
                flex: 0 0 20px;
                width: 20px;
                height: 20px;
                vertical-align: middle;
                line-height: 25px;
              }
              .recommded-list {
                flex: 1;

                span {
                  display: inline-block;
                  width: 80px;
                  line-height: 25px;
                  white-space: nowrap;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  border: 1px solid #cccccc;
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>