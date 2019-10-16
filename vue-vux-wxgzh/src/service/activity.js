import xhr from '@/service/xhr'
class Activity {

  getCurSection (body, fn, error) {
    return xhr('gzh/GetCurSection', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} }, fn)
  }

  getAllPrizeList (body, fn, error) {
    return xhr('gzh/GetAllPrizeList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} }, fn)
  }

  getSharePoint (body, fn, error) {
    return xhr('gzh/GetSharePoint', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} }, fn)
  }

  getMyPrizeList (body, fn, error) {
    return xhr('gzh/getMyPrizeList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} }, fn)
  }

  getHistory (body, fn) {
    return xhr('gzh/getHistory', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  setCircle (body, fn) {
    return xhr('gzh/JoinByShare', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  getPersonPool (body, fn) {
    return xhr('gzh/GetPersonPool', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  accessPersonPool (body, fn) {
    return xhr('gzh/AccessPersonPool', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  getTiXianLogs (body, fn) {
    return xhr('gzh/GetTiXianLogs', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  getAgentStatData (body, fn) {
    return xhr('gzh/getAgentStatData', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  getMyUserList (body, fn) {
    return xhr('gzh/GetMyUserList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  getJoinList (body, fn) {
    return xhr('gzh/GetJoinList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  JoinPersonPool (body, fn) {
    return xhr('gzh/JoinPersonPool', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  ResetUserData (body, fn, error) {
    return xhr('doa/ReSetUserData', { method: 'GET', body }, fn, error, 'get')
  }

}

export default new Activity()
