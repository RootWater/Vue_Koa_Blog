import axios from 'axios'
import qs from 'qs'
import ViewUI from 'view-design'
import { checkTools } from '@/libs/tools'
import { token } from '@/libs/utils'
import Store from '../store'

const api = process.env.VUE_APP_API
// 请求计时器
const requestTimer = {}
// 关闭全屏加载
const closeSpin = (key = '') => {
  if (requestTimer[key] && requestTimer[key].done) {
    ViewUI.Spin.hide()
  } else {
    clearTimeout(requestTimer[key].timer)
  }

  delete requestTimer[key]
}

// 异常类型
const exceptionType = function (params = {}) {
  return [{
    key: 'LoginException',
    title: '登录异常',
    content: `<h2>${params.LoginException}</h2>`,
    onOk: () => {
      Store.commit('loginOut')
    }
  }]
}
// 异常弹窗
const exceptionWindow = function (config = {}, winType = 'warning') {
  ViewUI.Modal[winType](config)
}

const http = axios.create({
  timeout: 10000,
  method: 'post',
  baseURL: api,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
// 请求拦截器
http.interceptors.request.use(config => {
  const { url, data } = config
  const key = url + data

  if (!requestTimer[key]) {
    requestTimer[key] = {
      timer: null,
      start () {
        this.timer = setTimeout(() => {
          this.done = true
          !config.headers.notUseSpin && ViewUI.Spin.show()
        }, 100)
      },
      done: false
    }

    requestTimer[key].start()
  }

  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截器
http.interceptors.response.use(response => {
  const { url, data } = response.config

  closeSpin(url + data)

  if (response.data.token) {
    token.set(response.data.token)
    delete response.data.token
  }

  return response.data
}, error => {
  const { url, data } = error.config

  closeSpin(url + data)

  if (error.response) {
    const getExceptionStr = (exData) => (checkTools.isObject(exData) ? exData.msg : exData)

    let errData = error.response.data
    // jwt认证错误当登录异常处理
    if (errData.error && errData.error.includes('jwt')) {
      errData = {
        type: 'LoginException',
        msg: '当前用户登录失效，请重新登录！'
      }
    }
    // 获取异常类型数组
    const exType = exceptionType({ LoginException: getExceptionStr(errData) })

    for (let i = 0, len = exType.length; i < len; i++) {
      if (errData.msg && errData.type === exType[i].key) {
        exceptionWindow(exType[i])
        break
      }

      if (i + 1 === len) {
        ViewUI.Modal.error({
          title: '异常',
          width: 720,
          render: (h) => {
            return h('div', {
              style: {
                height: '500px',
                overflow: 'auto'
              },
              domProps: {
                innerHTML: errData
              }
            })
          }
        })
      }
    }
  }

  return Promise.reject(error)
})
/**
 * post请求
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<T>}
 */
export const post = (url = '', params = {}, headers) => {
  const option = {
    url,
    params,
    config: {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  }

  if (checkTools.isArray) {
    option.params = JSON.stringify(params)
    option.config.headers = { 'content-type': 'application/json' }
  } else {
    option.params = qs.stringify(params)
  }

  headers && Object.assign(option.config.headers, headers)

  return http.post(...Object.values(option))
}
/**
 * get请求
 * @param url
 * @param params
 * @returns {Promise<AxiosResponse<T>}
 */
export const get = (url = '', params = {}) => http.get(url, qs.stringify(params))
