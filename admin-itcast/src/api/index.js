import axios from 'axios'
// 设置基准路径
const baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.defaults.baseURL = baseURL
// 设置拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  var token = localStorage.getItem('mytoken')
  if (token) {
    config.headers['Authorization'] = token
  }

  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 登录
export const login = (params) => {
  return axios.post('login', params).then((res) => {
    return res.data
  })
}
// 获取所有数据
export const getalluserlist = (params) => {
  return axios.get('users', {params: params}).then((res) => {
    return res.data
  })
}
