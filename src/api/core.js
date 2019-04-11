// 对axios进行再一次封装，统一拦截错误信息，并提供直接获取响应数据的函数，而不是获取整个响应体
import axios from 'axios'
import qs from 'qs'
import {
  Message
} from 'element-ui'

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const res = error.response
  if (res.status === 500) {
    Message(res.status + '： ' + '服务器内部错误！')
  } else if (res.status === 404) {
    Message(res.status + '： ' + '找不到请求的资源！')
  }
  return Promise.reject(error)
})

export default function (url, data = {}, type = 'get') {
  return new Promise(function (resolve, reject) {
    let promise
    if (type !== 'post') {
      let dataStr = ''
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        url += '?' + dataStr
      }
      promise = axios.get(url)
    } else {
      console.log(qs.stringify(data))
      promise = axios.post(url, qs.stringify(data))
    }

    // 回调
    promise.then(function (data) {
      resolve(data.data)
    }).catch(function (error) {
      reject(error)
    })
  })
}
