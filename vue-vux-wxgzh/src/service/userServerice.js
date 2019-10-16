import xhr from '@/service/xhr'

class UserService {

  wxTokenSelf (body, fn, error) {
    return xhr('duduyl/token', { method: 'GET', body }, fn, error, 'get')
  }

  userDetail (body, fn, error) {
    return xhr('xxx/:xxxId/:xxxId', { method: 'GET', body }, fn, error, 'get')
  }

  getUserDeatil (body, fn, error) {
    return xhr('duduyl/sns/userinfo', { method: 'GET', body, headers: {'Accept': 'application/json, text/plain, */*'} }, fn, error, 'get')
  }

  postUserInfo (body, fn, error) {
    return xhr('gzh/GetUserInfo', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, error, 'post')
  }

  isUserGz (body, fn, error) {
    return xhr('cgi-bin/user/info', { method: 'get', body, headers: {'Accept': 'application/json, text/plain, */*'} }, fn, error, 'get')
  }

  getUserIcon (body, fn) {
    return xhr('gzh/GetUserIcons', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  saveUserbyscan (body, fn) {
    return xhr('gzh/saveUserbyscan', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  getUserTest (body, fn, error) {
    return xhr('duduyl/GetUserDetailTwiceway', { method: 'GET', body }, fn, error, 'get')
  }

  getUserDetailYY (body, fn, error) {
    return xhr('duduyl/GetUserDetailYY', { method: 'GET', body }, fn, error, 'get')
  }

}

export default new UserService()
