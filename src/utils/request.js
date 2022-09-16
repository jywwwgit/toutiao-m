/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store'
const request = axios.create({
  // baseURL: 'http://api-toutiao-web.itheima.net' // 基础路径
  // baseURL: 'http://geek.itheima.net' // 基地址1
  // https://toutiao.itheima.net 基地址2
  // baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
  baseURL: '/api'
})

// 请求拦截器
// Add a request interceptor
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config: 本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）会经过这里
  return Promise.reject(error)
})

// 响应拦截器

export default request
