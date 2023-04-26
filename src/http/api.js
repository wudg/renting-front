//把request.js文件引入到main.js中
import request from "./request";

// 轮播
export function getHouse(data) {
  return request({
      url: "/api/house/list", // 这个地址是去掉公共地址剩下的地址
      method: "GET", // 请求方式 支持多种方式  get post put delete 等等
      data //发送请求要配置的参数 无参数的情况下也可以不写
  });
}

