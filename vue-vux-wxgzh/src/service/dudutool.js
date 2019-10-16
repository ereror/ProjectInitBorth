import xhr from '@/service/xhr'
import store from '@/store/index'
import { wxconfig } from '../../config/app'
class ToolService {
  wxaccessToken (body, fn, error) {
    return xhr('duduyl/token', { method: 'GET', body }, fn, error, 'get')
  }

  getMenu (body, fn, error) {
    return xhr('duduyl/menu/get', { method: 'GET', body }, fn, error, 'get')
  }

  setMenu (body, fn, error) {
    return xhr('duduyl/menu/create', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn)
  }

  deleteMenu (body, fn, error) {
    return xhr('duduyl/menu/delete', { method: 'GET', body }, fn, error, 'get')
  }

  // 根据code 获取 access_token
  getUserToken (body, fn, error) {
    return xhr('duduyl/GetUserDetail', { method: 'GET', body }, fn, error, 'get')
  }

   // 刷新token值
  getAccessToken (body, fn, error) {
    return xhr('duduyl/sns/oauth2/refresh_token?appid=' + wxconfig.appid + '&grant_type=refresh_token', { method: 'GET', body }, fn, error, 'get')
  }

  postCode (body, fn, error) {
    return xhr('duduyl/cgi-bin/qrcode/create', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn)
  }

  getCode (body, fn, error) {
    return xhr('cgi-bin/showqrcode', { method: 'GET', body, headers: {'Accept': 'text/xml'} }, fn, error, 'get')
  }

  getAccessCode (code, agent) {
    var param = {
      code: code,
      agent: agent,
      grant_type: 'authorization_code'
    }
    return this.getUserToken(param).then(res => {
      // 第一次调用保存当前用户的 openId 到 state里面 ？ 此处考虑是否保存在本地存储里面
      if (res.status === 200 && res.data && !res.data.errcode) store.commit('setUAccessToken', res.data)
    })
  }
  getmaterial (body, fn, error) {
    return xhr('duduyl/material/batchget_material', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn)
  }

  getInfo (body, fn, error) {
    return xhr('duduyl/info', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn)
  }

  sendInfo (body, fn, error) {
    return xhr('log/sendlog', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn)
  }
}

export default new ToolService()
