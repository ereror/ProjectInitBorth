import { serverHost, xhrConfig, defaulthost, fileServer } from 'build/config'
import LocalStorageService from '@/services/storage'
import axios from 'axios'
// 授权出错的状态码，需要重新登陆
const codes = [9999]
const resetMsg = ['Failed to fetch']
let timer = null

export default function xhr(path, options, otherOption = {}) {
  let config = Object.assign({}, xhrConfig, options)
  // accessToken 凭据，授权
  // 优先从storage读取，否则从请求参数上面拿
  const queryParam = getQueryParams()
  const accessToken = LocalStorageService.get('token') || queryParam.access_token
  if (accessToken) config.headers.access_token = accessToken
  // format url
  var key = ''
  config.body = config.body || {}
  var userinfo = LocalStorageService.get('userinfo')
  if (userinfo) {
    key = userinfo.key
    config.body.key = key
    config.headers.token = userinfo.token
  }
  let requestUrl = (serverHost || '') + formatUri(path, config)
  if (config.type && !serverHost) {
    delete config.headers.token
    requestUrl = fileServer + requestUrl
  }
  return axios(requestUrl, config)
    .then(resp => {
      if (!resp.ok && resp.status !== 200) return Promise.reject(resp)
      return resp
    })
    .catch(tipsHandle)
    .then(json => {
      if (json) {
        if (json.data && json.data.errcode === 9999 || json.code === '404') {
          LocalStorageService.remove('userinfo') // 本地信息
          // 
        }
        if (json.code && ~codes.indexOf(json.code)) return logoutHandle(json)
        if (json.hasOwnProperty('success') && !json.success || json.hasOwnProperty('code') && json.code !== 10000) return tipsHandle(json)
      }
      if (config.other && json) json.other = config.other
      return json
    })

  function tipsHandle(err, message, type = 'error') {
    if (timer) clearTimeout(timer)
    if (otherOption.noAlert) return Promise.reject(err)

    if (!message) {
      if (otherOption.errMsg) message = otherOption.errMsg
      else if (typeof err.data === 'string') message = err.data
      else if (err) message = err.inform || err.message
    }

    if (~resetMsg.indexOf(message)) message = '网络异常,请稍后重试'
    message = (message + '').trim()
    if (message === 'undefined' || message === 'Request api not found' || message === 'System error') message = '系统异常,请稍后重试'
    message = message && message.length <= 35 ? message : '系统异常,请稍后重试'
    return Promise.reject(err)
  }
}

function logoutHandle(err) {
  return Promise.reject(err)
}

function formatUri(uri, config) {
  let str = (uri + ' ').replace(/:(.*?)(\/|\?| )/g, function(a, b, c) {
    let tmp = config.body[b]
    // It's a trick
    delete config.body[b]
    return tmp + c
  }).trim()

  if (!config.body) return str
  if (config.method.toUpperCase() === 'GET') {
    let paramBody = param(config.body)
    delete config.body
    if (paramBody) return str + (str.indexOf('?') >= 0 ? '&' : '?') + paramBody
  } else if (config.body) {
    config.body = config.headers['Content-Type'].toUpperCase().indexOf('JSON') >= 0 ? JSON.stringify(config.body) : config.body
    config.data = config.body
  }
  return str
}

function param(obj) {
  let name, value, fullSubName, subName, innerObj, i
  let query = ''

  if (!obj) return query

  for (name in obj) {
    value = obj[name]
    if (value instanceof Array) {
      for (i = 0; i < value.length; ++i) run(i, value[i])
    } else if (value instanceof Object) {
      for (subName in value) run(subName, value[subName])
    } else if (value !== undefined && value !== null) {
      query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&'
    }
  }

  return query.length ? query.substr(0, query.length - 1) : query

  function run(key, val) {
    fullSubName = name + '[' + key + ']'
    innerObj = {}
    innerObj[fullSubName] = val
    query += param(innerObj) + '&'
  }
}

function getQueryParams(url) {
  url = url || window.location.href
  let search = url.substring(url.lastIndexOf('?') + 1)
  let res = {}
  search.replace(/([^?&=]+)=([^?&=]*)/g, function(rs, $1, $2) {
    res[decodeURIComponent($1)] = String(decodeURIComponent($2))
    return rs
  })
  return res
}
