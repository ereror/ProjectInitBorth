import xhr from '@/service/xhr'
import store from '@/store/index'
class ToolService {

  getMenu (body, fn, error) {
    return xhr('cgi-bin/menu/get', { method: 'GET', body }, fn, error, 'get')
  }

  setMenu (body, fn, error) {
    return xhr('cgi-bin/menu/create?access_token=' + store.state.wxToken.accesswxToken, { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'} }, fn)
  }

  deleteMenu (body, fn, error) {
    return xhr('cgi-bin/menu/delete', { method: 'GET', body }, fn, error, 'get')
  }

   // 根据code 获取 access_token
  getUserToken (body, fn, error) {
    return xhr('sns/oauth2/access_token', { method: 'GET', body }, fn, error, 'get')
  }

   // 刷新token值
  getAccessToken (body, fn, error) {
    return xhr('sns/oauth2/refresh_token', { method: 'GET', body }, fn, error, 'get')
  }

  postCode (body, fn, error) {
    return xhr('cgi-bin/qrcode/create', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'} }, fn)
  }

  getCode (body, fn, error) {
    return xhr('cgi-bin/showqrcode', { method: 'GET', body, headers: {'Accept': 'text/xml'} }, fn, error, 'get')
  }

  getAccessCode (code) {
    var param = {
      code: code,
      grant_type: 'authorization_code'
    }
    return this.getUserToken(param).then(res => {
      // 第一次调用保存当前用户的 openId 到 state里面 ？ 此处考虑是否保存在本地存储里面
      if (res.status === 200) store.commit('setUAccessToken', res.data)
    })
  }
  getimgcode (body, fn, error) {
    return xhr('genimgpath', { method: 'GET', body }, fn, error, 'get')
  }
}

export default new ToolService()
