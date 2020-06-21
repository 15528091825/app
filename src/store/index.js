import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goods:[],
  },
  mutations: {
    // 保存商品的数据
    ADD_GOODS(state,goods){
      state.goods=goods
    },
    // 该变购物车的数据
    CHANGE_NUM(state,data){
      for(let item of state.goods){
        for(let food of item.foods){
          if(food.name===data.name){
            food.count+=data.num
          }
        }
      }
    },
    // 清空购物车
    CLEAR_COUNT(state){
      for(let item of state.goods){
        for(let food of item.foods){
         food.count=0
        }
      }
    }

  },
    //  仓库中的计算属性
  getters: {
    getOrderList(state){
      let arr=[];
      for(let item of state.goods){
        for(let food of item.foods){
          if(food.count>0){
            arr.push(food)
          }
        }
      }

      // 把满足条件的项目去冲处理
      let newArr=[];
      let obj={};
      for(let item of arr){
        if(!obj[item.name]){
          obj[item.name]="x";
          newArr.push(item)
        }
      }
      console.log('被选中的数据',newArr)
      return newArr

    }
  },
  actions: {
  },
  modules: {
  }
})
