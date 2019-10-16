const fly = require("flyio")
var  Fly=require("flyio/dist/npm/fly")
import { serverHost, xhrConfig, defaulthost, fileServer, tokenUrl } from '../../build/app'
import LocalStorageService from 'services/storage'
var nFly= new Fly();
Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => {
      throw reason
    })
  )
}

const codes = []
// 设置超时
fly.config.timeout = 10000

// 设置请求基地址

fly.config.baseURL = defaulthost

//给所有请求添加自定义header

fly.config.headers = {
  "content-type": "application/x-www-form-urlencoded"
}

//添加请求拦截器
fly.interceptors.request.use((request)=>{
    // request.headers["X-Tag"]="flyio";
    //   console.log(request.body)
    let token = LocalStorageService.get('token')
    request.headers["token"] = token
    return request;
})

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
    (response) => {
        //只将请求结果的data字段返回
        if (response.data.code * 1 == 200) {
	        return response.data
        } else {
        	console.log('存在错误信息')
        	return response.data
        }
    },
    (err) => {
        //发生网络错误后会走到这里
        let status = err.status
        console.log(err)
        switch(status) {
        	case 401:
        		console.log('token过期')
        		// fly.lock()
        		return new Promise((resove, reject) => {
		          return nFly.post(tokenUrl)
        		}).then((d) => {
        			let { token } = d.data.data
        			err.request.headers["token"] = token
        			LocalStorageService.set("token", token); //保存token
        		}).finally(() => {
        			fly.unlock();
        		}).then(() => {
        			return fly.request(err.request)
        		})
        		break;
        	default:
        		console.log('网络请求错误，请稍后再重试！')
		          return new Promise((resove, reject) => {
		            reject({
		              errormsg: true
		            })
	            })
        }
    }
)

export default function xhr(path, body, options, otherOption = {}) {
  let config = Object.assign({}, xhrConfig, options)
  const queryParam = getQueryParams(path) || {}
  if (config.type === 'file') {
    delete config.headers.token
  } else {
    body = Object.assign({}, body, queryParam)
  }
  return fly.request(path, body, config)
    .then(resp => {
      if (resp.code * 1 != 200) return Promise.reject(resp)
      return Promise.resolve(resp)
    })
    .catch(tipsHandle)
    .then(json => {
      if (json) {
        if (json.data && json.data.errcode === 9999 || json.code === '404') {
          LocalStorageService.remove('userinfo')
          location.href = 'https://www.' + defaulthost + ':9090/'
        }
        if (json.code && ~codes.indexOf(json.code)) return Promise.reject(err)
        if (json.hasOwnProperty('success') && !json.success || json.hasOwnProperty('code') && json.code * 1 !== 200) return tipsHandle(json)
      }
      if (config.other && json) json.other = config.other
      return json
    })

  function tipsHandle(err, message, type = 'error') {
    if (!message) {
      if (otherOption.errMsg) message = otherOption.errMsg
      else if (typeof err.data === 'string') message = err.data
      else if (err) message = err.inform || err.message
    }
    message = (message + '').trim()
    if (message === 'undefined' || message === 'Request api not found' || message === 'System error') message = '系统异常,请稍后重试'
      // 这儿trick的处理报错信息
    message = message && message.length <= 35 ? message : '系统异常,请稍后重试'
    return Promise.reject(err)
  }
}

// 获取查询参数解析器，例如：传 "?page=12&list=20" 返回对象 {page:'12',list:'20'}
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
