import Vue from 'vue'
import axios from 'axios'

// Vue.prototype.HOST = '/api'
Vue.prototype.userUrl = 'https://testapi.user.populstay.com'
Vue.prototype.placeUrl = 'https://tesapi.place.populstay.com'
Vue.prototype.cityUrl = 'https://testapi.citycode.populstay.com'
Vue.prototype.bookUrl = 'https://testapi.booking.populstay.com'
Vue.prototype.paymentUrl = 'http://testapi.payment.populstay.com'
Vue.prototype.imageUrl = 'https://testapi.image.populstay.com/image?dir=populstay_placeimage'

Vue.prototype.$axios = axios
// axios.defaults.baseURL = Vue.prototype.HOST
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8'
// 带cookie请求
axios.defaults.withCredentials = true
// request 请求拦截器 - 请求之前headers加token
// axios.interceptors.request.use(
//   config => {
//     // 登录不用加token
//     // 每次发送请求之前检测都vuex存有token,那么都要放在请求头发送给服务器
//     // if (config.url.indexOf('/tokens') < 0 && store.state.token) {
//     //   config.headers.Authorization = `Bearer ${store.state.token}`
//     // }
//     return config
//   },
//   err => {
//     return Promise.reject(err)
//   }
// )
// response 错误统一处理
// axios.interceptors.response.use(
//   res => {
//     if (res.data.status === 9) {
//       return Promise.reject(res)
//     }
//     return res
//   },
//   err => {
//     // console.log(err)
//     return Promise.reject(err)
//   }
// )

export function get (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      data: data
    }).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

Vue.prototype.$post = post
Vue.prototype.$get = get
export default {}

/* 登录 start */
// export const user = params => { return axios.post(`${base}/user`, qs.stringify(params)).then(res => res.data) }
