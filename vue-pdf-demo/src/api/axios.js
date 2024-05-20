/* 1.引入文件 */
import axios from 'axios' //引入 axios库
import baseurl from './baseurl.js'
import useRouter from '../router'
import {
  Message
} from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false }); //去除加载中圆圈
axios.defaults.withCredentials = true
const baseURL = baseurl.baseUrl
const token = localStorage.getItem('token')
const service = axios.create({
  baseURL,
  timeout: 3000000,
  Authorization: token
})
service.interceptors.request.use(
  (config) => {
    NProgress.start()
    if (config.method == 'get') { //判断get请求
      config.params = config.params || {};
      config.params.t = Date.parse(new Date()) / 1000; //添加时间戳  防止接口缓存
    }
    if (!config.type) { //有type  不传token
      if (localStorage.getItem('token')) {
        config.headers.common['Authorization'] = localStorage.getItem('token')
      }
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      NProgress.done()
      const data = response.data
      if (data.code == 401) {
           // Message({
        //   message: '请先登录',
        //   type: 'error',
        // })
        location.href = `${baseURL}api/v1/sso/toAuthenticate?redirect=${useRouter.history.current.fullPath}`;

      } else if (data.code !== 200) {
        Message({
          message: data.msg,
          type: 'error',
        })
      }
      return data
    }
  },
  (error) => {
    Message({
      message: error.msg,
      type: 'error',
    })
    return Promise.reject(error)
  }
)

export default service