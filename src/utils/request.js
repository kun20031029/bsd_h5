import axios from 'axios'
import { Toast } from 'vant'
import { getToken, removeToken } from '@/utils/auth'
import router from '@/router'
import qs from 'qs'
// import baseUrl from '@/config'
const env = process.env

const service = axios.create({
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest'
  },
  baseURL: env.VUE_APP_BASE_API,
  timeout: 10000
})
// const ajaxUrl =process.env.NODE_ENV === 'development' ? 'api' : 'http://i.hqkid.kishow.cn'
service.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      let tokenKey = sessionStorage.getItem("CURRENTKEY");
      tokenKey = tokenKey=="1" ? "student_token" : "teacher_token";
      // tokenKey = "student_token";
      config.headers[tokenKey] = token;
    }
    // if (config.method === 'post') {
    //   config.data = qs.stringify(config.data)
    // }
    return config
  },
  error => {
    console.log(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (
      response &&
      response.data.code === "701"
    ) {
      // store.commit('REMOVE_TOKEN')
      removeToken()

      return Promise.reject('error')
    } else {
      // if(response.data.message == "SUCCESS"){
      if(response.data.code == 200){
        return response.data
      }else{
        Toast.fail(response.data.msg);
      }


    }
  },
  error => {
    console.log('err' + error)
    if (error && error.response) {

      Toast.fail(error.msg);
    } else {
      Toast.fail({
        message: '网络超时，请检查您的网络',
        duration: 5000
      })
    }
    return Promise.reject(error)
  }
)

export default {
  post (url, data, type) {
    return service({
      method: 'post',
      url: 'api' + url,
      data: data,
      responseType: type ? 'arraybuffer' : ''
    })
  },
  get (url, data) {
    return service({
      method: 'get',
      url: 'api' + url,
      params: data
    })
  }
}
