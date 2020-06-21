/**
 * 封装axios的请求
 */
// 引入axios和qs
import axios from "axios"
import qs from "qs"


import router from "@/router/index"


//设置请求的服务器地址,""里面不能有空格
axios.defaults.baseURL="http://127.0.0.1:5000";
// axios.defaults.baseURL="http://192.168.1.3:5000";

// 设置请求的时间
axios.defaults.timeout=5000;


// 对post和get进行封装
export default {
    // get的封装
    get(url,data={}){
        return new Promise((resolve,reject)=>{
            axios.get(url,{params:data})
                .then(response=>{
                    resolve (response.data);
                })
                .catch(err=>{
                    reject(err);
                })
        })
    },
   
    // post的封装
    post(url,data = {} ){
        return new Promise((resolve,reject)=>{
            axios.post(url,qs.stringify(data))
                .then(response=>{
                    resolve(response.data)
                })
                .catch(err=>{
                    reject(err);
                })
        })
    }
}