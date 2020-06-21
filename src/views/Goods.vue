<template>
    <div class="goods">
        <!-- 左侧菜单 -->
        <div class="left_menu"
             ref="leftNav">
            <ul class="list">
                <li v-for="(item,i) in goods"
                    @click="changeCur(item.name)"
                    :class="{active: curActive===item.name}"
                    :key="i">

                    {{item.name}}</li>

            </ul>
        </div>
        <!-- 右侧内容 -->
        <div class="right_content"
             ref="rightContent">
            <div>
                <ul class="content"
                    v-for="(item,i) in goods"
                    :key="i">
                    <li>
                        <div :id="item.name"
                             class="divbox">
                            <p class="title">{{item.name}} </p>

                            <div class="list"
                                 v-for="(m,n) in item.foods"
                                 :key="n"
                                 @click="showmodel(m)">
                                <div class="content_img">
                                    <img :src="m.imgUrl">
                                    <div class="intro">
                                        <div class="goodsname">{{m.name}}</div>
                                        <div class="intro">{{m.goodsDesc}}</div>
                                        <div class="count">月售{{m.sellCount}}份，好评率{{m.rating}}%</div>
                                        <div class="goodsprice">
                                            <div class="leftprice">
                                                <div class="price">￥{{m.price}}</div>
                                                <del>123</del>
                                            </div>

                                        </div>
                                        <div class="gocar">
                                            <button @click.stop="changcount(m.name,-1)"
                                                    v-show="m.count>0">-</button>
                                            <span v-show="m.count>0">{{m.count}}</span>
                                            <button @click.stop="changcount(m.name,1)">+</button>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </li>
                </ul>
            </div>

        </div>

        <!-- 模态框内容 -->
        <transition name="detail">
            <Goodsmodel v-show="isvisible"
                        @close="closemo"
                        :data="data" />
        </transition>
    </div>
</template>

<script>
import Vue from 'vue';
import { Stepper } from 'vant';

Vue.use(Stepper);
import {getSeller,getGoods,getRatings} from "@/api/app.js"
 import Goodsmodel from "@/components/layout/Goodsmodel.vue"
// 引入better-scroll插件
import Bscoll from "better-scroll"


    export default {
      
        components:{
            Goodsmodel
        },
        data(){
           return{
            //    左侧菜单的激活
               curActive:"多人套餐",
            
                value:0,
                isvisible:false,
                data:'',  
                hArr: [] // 存放高度的数组
           }

        },
        methods:{
            // 显示模态框
            showmodel(data){
                this.isvisible=true;
                 this.data=data;
                //  console.log("点击了",data)
            
            },
            // 关闭模态框
            closemo(){
                 this.isvisible=false;
            },
         
            changeCur(name){
                // 激活当前的菜单
                this.curActive=name
                // 联动右边的菜单
                 this.rigthContent.scrollToElement("#"+name, 300);
                //  this.rigthContent.scrollToElement(document.getElementById(name), 300);
                //  console.log('#'+name)
            },
            // 点击增加购物车
            changcount(name,num){
                // 调取仓库的方法
                this.$store.commit('CHANGE_NUM',{name,num})
            }

        },
      
        mounted(){
           

            // 初始化左边的菜单
            this.leftNav=new Bscoll(this.$refs.leftNav,{
                 
                    click: true // 允许点击
   
            })
            //初始化右边的内容
            this.rigthContent=new Bscoll(this.$refs.rightContent,{
                    probeType: 3, // 派发滚动事件
                     click: true // 允许点击
            });
            // console.log( this.rigthConter)

            // 监听滑动
             this.rigthContent.on("scroll",req=>{
                let y=Math.abs(req.y);
                // console.log(y)
                for(let i=0;i<this.hArr.length;i++){
                    if(y>=this.hArr[i].min && y<this.hArr[i].max){
                        this.curActive=this.hArr[i].name

                          // 联动左边边的菜单
                         this.leftNav.scrollToElement('.active', 300);
                    }
                }
             })
        },
        updated(){
            // 获取数据
            let total=0;
            for( let item of this.goods){
                let cateHeight=document.getElementById(item.name).offsetHeight;
            //   将每个区间保存到数组中，当滚到这个区间范围的时候，对应的菜单激活
                this.hArr.push({
                min:total,
                max:total+cateHeight,
                name:item.name
                });
                total=total+cateHeight
            }
            // console.log( this.hArr)
        },
        computed:{
            goods(){
                return this.$store.state.goods;
            }
        }
    }
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  height: 100%;
  .left_menu {
    flex: 0 0 80px;
    // height: 100%;
    // overflow-y: scroll;
    overflow: hidden;
    .list {
      li {
        height: 50px;
        line-height: 50px;
        width: 100%;
        background-color: #f4f5f7;
        text-align: center;
        border: 1px solid #cccccc;
        color: #666;
        font-size: 12px;

        &.active {
          color: black;
          color: #ffffff;
          font-weight: bold;
          background-color: gold;
        }
      }
    }
  }
  .right_content {
    flex: 1;
    // overflow-y: scroll;
    overflow: hidden;
    line-height: 25px;
    ul {
      li {
        box-sizing: border-box;
        .divbox {
          // border: 1px solid red;
          .title {
            padding: 0px 10px;
            box-sizing: border-box;
            background-color: #f4f5f7;
            height: 30px;
            line-height: 30px;
            margin-top: 0px;
          }
          .content_img {
            position: relative;
            width: 95%;
            margin: 10px auto;

            box-sizing: border-box;
            display: flex;
            border-bottom: 1px solid #cccccc;
            img {
              flex: 0 0 80px;
              width: 90px;
              height: 90px;
              border-radius: 5px;
            }
            .intro {
              flex: 1;
              // padding-right: 10px;
              //   box-sizing: border-box;
              margin-left: 10px;
              color: #999;
              font-size: 12px;
              overflow: hidden;
              .goodsname {
                font-weight: bold;
                color: #3f3d3d;
                font-size: 14px;
              }
              .intro {
                margin-left: -2px;
                // width: 100%;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
              }
              .goodsprice {
                .leftprice {
                  display: flex;
                  .price {
                    margin-right: 5px;
                    color: red;
                  }
                }
              }
              .gocar {
                position: absolute;
                bottom: 0px;
                right: 20px;
                display: flex;
                button {
                  border: none;
                  outline: none;
                  width: 24px;
                  height: 24px;
                  line-height: 24px;
                  border-radius: 50%;
                  font-size: 18px;
                  color: #ffffff;
                  background-color: #2395ff;
                  margin-left: 5px;
                }
                span {
                  margin-left: 5px;
                }
              }
            }
          }
        }
      }
    }
  }
  .detail-enter-active,
  .detail-leave-active {
    transition: all 0.3s;
  }
  .detail-enter, .detail-leave-to {
   transform: translateY(50%)
  }
}
</style>