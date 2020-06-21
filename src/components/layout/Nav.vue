<template>
    <div class="nav">
        <ul class="nav-list">
            <li v-for="item in navs" 
                :key="item.path">
                <router-link :to="item.path" :class="{ active:$route.path===item.path}"> {{item.title}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                navs:[
                    {title:"商品",path:"/goods"},
                    {title:"评价",path:"/ratings"},
                    {title:"店铺",path:"/seller"},
                ]
            }
        }
        
    }
</script>

<style lang="less" scoped>
.nav {
  flex: 0 0 40px;
  border-bottom: #50555a 1px solid;
  .nav-list {
    display: flex;

    li {
      flex: 1;
      height: 40px;
      line-height: 40px;
      text-align: center;
      a{
          color: #aaaaaa;
          display: inline-block;
          text-decoration: none;
          width: 100%;
          height: 100%;
          &.active{
              color: red;
             
          }
      }
    }
  }
}
</style>