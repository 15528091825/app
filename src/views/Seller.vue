<template>
    <div class="seller"
         ref="seller">
        <div class="seller-content">
            <!-- {{goods}}} -->
            <div class="top">
                <div class="topone">
                    <div class="sellerinto">
                        <p>{{seller.name}}</p>
                        <div>
                            <van-rate v-model="seller.score"
                                      allow-half/>
                            <span>(661)</span>
                            <span>月售690单</span>
                        </div>

                    </div>
                    <div class="love">
                        <img src="../assets/imgs/good1.png" alt="" v-if="flaglove"  @click="islove">
                        
                        <img src="../assets/imgs/love.png" alt="" v-else @click="islove">
                        收藏
                    </div>
                </div>
                <div class="toptwo">
                    <div>起送价
                        <div class="money">
                            <span>{{seller.minPrice}}</span>元

                        </div>
                    </div>
                    <div>商家配送
                        <div class="money">
                            <span>{{seller.deliveryPrice}}</span>元

                        </div>
                    </div>
                    <div>
                        平均配送时间
                        <div class="money">
                            <span>{{seller.deliveryTime}}</span>分钟

                        </div>
                    </div>
                </div>

            </div>
            <div class="line"></div>
            <div class="main">
                <p class="titletip">公告与活动</p>
                <div class="bulletin">{{seller.bulletin}}</div>
                <ul class="supports">
                    <li v-if="seller.supports"
                        v-for="(item,i) in seller.supports"
                        :key="i">
                        <img :src="imgs[i]"
                             alt=""
                             width="20"
                             height="15"> {{item}}
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="imgshow">
                <p class="titletip">商家实景</p>
                <div ref="imgs"  class="imgs-list">
                    <div class="imgs"  :style="{width:imglength*150+'px'}">
                        <img :src="item"
                             alt=""
                             v-if="seller.pics"
                             v-for="(item,i) in seller.pics"
                             :key="i">
                    </div>
                </div>

            </div>
            <div class="line"></div>
            <div class="sellerinfo">
                <p class="titletip">商家信息</p>
                <ul>
                    <li>介绍：西贝餐饮创始人贾国龙先生</li>
                    <li>品类：西北菜, 其他快餐</li>
                    <li>商家电话</li>
                    <li>地址：成都高新区天府大道北段</li>
                    <li v-if="seller.date">营业时间 {{seller.date | fliterday}}</li>
                    <li>营业资质</li>
                </ul>
            </div>
        </div>

    </div>
</template>

<script>
import moment from "moment"
import Vue from 'vue';
import { Rate } from 'vant';
import Bscoll from "better-scroll"

Vue.use(Rate);
    export default {
        props:['seller','goods'],
        data(){
            return{
                // 是否收藏
                    flaglove:false,
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
            islove(){
                // alert(1)
                this.flaglove=!this.flaglove
            }
        },
        filters:{
            fliterday(data){
            //    data=JSON.parse(data)
             let date0 = data[0]
             let date1 = data[1]
             let Ndate1 = moment(date0).format('YYYY-MM-DD HH:mm:ss')
             let Ndate2 = moment(date1).format('YYYY-MM-DD HH:mm:ss')
                return Ndate1+"-"+Ndate2
            }
        },
        mounted(){
          new Bscoll(this.$refs.seller,{
              click:true,
          })
          this.imgs=  new Bscoll(this.$refs.imgs,{
                   scrollX: true,   // 开启横向滚动
                 
            })
        },
        computed:{
            imglength(){
                return this.seller.pics && this.seller.pics.length;
            }
        }
        
    }
</script>

<style lang="less" scoped>
.seller {
  height: 100%;
  overflow: hidden;
  .seller-content {
    box-sizing: border-box;
    line-height: 25px;
    display: flex;
    flex-direction: column;
    .top {
      .topone {
        padding: 20px;
        display: flex;
        justify-content: space-between;
        line-height: 25px;
        padding-bottom: 20px;
        border-bottom: 1px solid #cccccc;
        .sellerinto {
          p {
            font-size: 20px;
            font-weight: bold;
          }
        }
        .love{
            img{
                width: 30px;
                height: 30px;
                vertical-align: middle;
            }
        }
      }
      .toptwo {
        display: flex;
        justify-content: space-between;
        div {
          flex: 1;
          display: flex;
          flex-direction: column;
          border-right: 1px solid #cccccc;
          color: #cccccc;
          text-align: center;
          padding: 10px 0px;
          line-height: 25px;
          font-size: 14px;

          &:last-child {
            border-right: none;
          }
          .money {
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            justify-content: center;

            span {
              text-align: center;
              font-size: 18px;
              color: #000000;
            }
          }
        }
      }
    }
    .line {
      width: 100%;
      height: 15px;
      border: 1px solid #cccccc;
      background: #f4f5f7;
    }
    .titletip {
      font-size: 18px;
      font-weight: bold;
      margin: 10px;
    }
    .main {
      padding: 10px;
      box-sizing: border-box;

      .bulletin {
        color: red;
      }
      .supports {
        li {
          border-top: 1px solid #cccccc;
          height: 60px;
          line-height: 60px;
          img {
            vertical-align: middle;
          }
        }
      }
    }
    .imgshow {
      .imgs-list {
          width:100%;
          margin: 0 auto;
          overflow: hidden;
        .imgs {
         
          padding: 0 10px;
          display: flex;
          flex-wrap: nowrap;
          flex-direction: row;
        //   height: 100px;
        //   width: 100%;
          justify-content: space-around;
          background-color: #f3f4f5;
          margin-left: 10px;
       
          img {
            width: 130px;;
            height: 120px;
          }
        }
      }
    }
    .sellerinfo {
      ul {
        li {
          padding: 10px;
          box-sizing: border-box;
          border-top: 1px solid #cccccc;
          height: 60px;
          line-height: 60px;
        }
      }
    }
  }
}
</style>