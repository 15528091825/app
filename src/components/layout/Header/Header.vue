<template>
  <div class="header">
    <div class="content">
      <div class="top">
        <img :src="seller.avatar"
             alt=""
             width="80"
             height="80">
        <div>
          <p class="title">
            <img src="@/assets/imgs/brand.png"
                 alt=""
                 width="40"
                 height="20"> {{seller.name}}
          </p>
          <p class="title2">{{seller.description}}/{{seller.deliveryTime}}</p>
          <p class="title3"
             v-if="seller.supports">
            <img src="@/assets/imgs/decrease.png"
                 alt=""
                 width="20"
                 height="20"> {{seller.supports[0]}}
          </p>
        </div>
      </div>
      <div class="bottom"
           @click="showmodel">
        <div>
          <img src="@/assets/imgs/bulletin.png"
               alt=""
               width="30"
               height="20"> {{seller.bulletin}}
        </div>
        <span>></span>
      </div>
      <!-- 5个 -->
      <div class="supports"
           @click="showmodel"
           v-if="seller.supports">
        {{seller.supports.length}}个>
      </div>
      <!-- 模态框 -->
      <transition name="detail">
        <Modelbox v-show="isvisible"
                  @close="closemodel"
                  :seller="seller" />
      </transition>
    </div>
  </div>
</template>

<script>

  import Modelbox from "@/components/layout/Header/Modelbox.vue"
    export default {
        components:{
            Modelbox
        },
          props:['seller'],//接收父组件传过来的数据
          data(){
              return{
                 isvisible:false
              }
          },
          methods:{
            //   显示模态框
              showmodel(){
                  this.isvisible=true
              },
            //   关闭模态框
                closemodel(){
                    this.isvisible=false
                }
          }
           
    }
  
</script>

<style lang="less" scoped>
.header {
  flex: 0 0 120px;

  position: relative;
  color: #fff;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("../../../assets/imgs/1.jpeg") no-repeat;
    filter: blur(8px);
    z-index: -1;
    background-size: cover;
  }
  .content {
    display: flex;
    flex-direction: column;
    position: relative;
    .top {
      flex: 1;
      padding: 20px;
      display: flex;
      line-height: 25px;
      img {
        margin-right: 10px;
      }
      .title {
        font-size: 16px;
        font-weight: bold;
        img {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      .title3 {
        font-size: 12px;
        img {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
    }
    .bottom {
      flex: 0 0 40px;
      line-height: 40px;
      display: flex;
      padding: 0px 10px;
      box-sizing: border-box;
      font-size: 12px;
      background-color: rgba(88, 85, 85, 0.5);
      div {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        img {
          vertical-align: middle;
          margin-right: 5px;
        }
      }
      span {
        flex: 0 0 20px;
        color: #ffffff;
        font-size: 14px;
      }
    }
    .supports {
      width: 50px;
      height: 22px;
      line-height: 22px;
      background-color: rgba(88, 85, 85, 0.5);
      border-radius: 10px;
      text-align: center;
      position: absolute;
      bottom: 50px;
      right: 10px;
      font-size: 12px;
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
}
</style>