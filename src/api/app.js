/**
 * app的接口实现
 */
import req from "@/utils/request.js"
// 获取商品
export function getGoods(){
    return req.get("/goods/goods_list")
}
// 获取商家
export function getSeller(){
    return req.get("/shop/seller")
}
// 获取评价
export function getRatings(){
    return req.get("/shop/ratings")
}