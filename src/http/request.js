import axios from "axios";  //引入axios

// 创建axios实例
const service = axios.create({
	//这里拿线上接口测试
	  baseUrl: '/api',
    headers:{ //请求头
        'Content-Type': 'application/json;charset=UTF-8'
        // 'Authorization':'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ3dWRpZ3VhbmciLCJpYXQiOjE2ODIyMzU3MjksImV4cCI6MTY4MjIzOTMyOX0.sExSdAvfawhdfMiHzj31ZvOonWuCWC03mHUO92Vr7gc',
        // "Access-Control-Allow-Origin":'*'
    },
    settimeout:50000,//超时时间
});
// 请求拦截器
service.interceptors.request.use(
config => {
    // 在发送请求之前做些什么 验证token之类的
    // console.log("请求的数据:", config);
    // console.log("token:", localStorage.getItem('token'))
    if (localStorage.getItem('token')) {
      config.headers.Authorization = "Bearer " + localStorage.getItem('token')
    }
    return config; //记得一定要 返回config
},
error => {
    // 对请求错误做些什么
    // console.log("请求的数据:", error);
    return Promise.reject(error);
}
);

// // 响应拦截器
// service.interceptors.response.use(
// response => {
//     // console.log("返回的数据", response);
//     // 这里拦截401错误，并重新跳入登页重新获取token
//     if (response.status && response.status === 200) {
//       // 通讯成功
//       if (response.data.code === 0) {
//         return response.data
//       } else if (response.data.code === 401) {
//         // 如果是token过期，跳转至登录
//         this.$message.error("登录已过期，请重新登录！");
//         localStorage.removeItem('token') // 移除token，跳转至登录
//         router.push({
//           path: '/Login'
//         })
//       }
//       return Promise.resolve(response.data)
//     }
// },
// error => {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// }
// );
export default service;
