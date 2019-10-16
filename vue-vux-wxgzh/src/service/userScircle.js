import xhr from '@/service/xhr'

class UserscircleService {

  // 获取圈子列表
  getCircle (body, fn, error) {
    return xhr('gzh/GetTeamList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, error, 'post')
  }

  // 圈子统计
  getTemCircleData (body, fn, error) {
    return xhr('gzh/GetTeamStatData', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, error, 'post')
  }
  // 历史记录
  getTemCircleHistory (body, fn, error) {
    return xhr('gzh/GetTeamRecord', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, error, 'post')
  }
  // 圈子设置
  setTeamInfo (body, fn, error) {
    return xhr('gzh/SetTeamInfo', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, error, 'post')
  }

  // 获取分利数据
  getUserScorePolif (body, fn, error) {
    return xhr('gzh/GetUserScore_fenli', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, error, 'post')
  }

  // 获取圈子数据
  getUserScoreCircle (body, fn, error) {
    return xhr('gzh/GetUserScore_team', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, error, 'post')
  }

  // 获取我的分利树
  GetUserDown (body, fn, error) {
    return xhr('gzh/GetUserDown', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, error, 'post')
  }

  getTeamMembers (body, fn, error) {
    return xhr('gzh/GetTeamMembers', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  getTeamActions (body, fn, error) {
    return xhr('gzh/GetTeamActions', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  delCircle (body, fn, error) {
    return xhr('gzh/DismissTeam', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  getpayItem (body, fn, error) {
    return xhr('pay/getitem', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  postPayWx (body, fn, error) {
    return xhr('pay/PayWx', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  getPrizeInfo (body, fn, error) {
    return xhr('gzh/GetPrizeInfo', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  getSharePoint (body, fn, error) {
    return xhr('gzh/SharePoint', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} }, fn)
  }

  getUserInfoById (body, fn, error) {
    return xhr('gzh/GetUserInfo', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  getTixian (body, fn, error) {
    return xhr('gzh/tixian', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  getUnBindWxGid (body, fn, error) {
    return xhr('gzh/UnBindWxGid', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  getChgInvitor (body, fn, error) {
    return xhr('gzh/ChgInvitor', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  getKickTeamMember (body, fn, error) {
    return xhr('gzh/KickTeamMember', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} })
  }

  getDuobaoScore (body, fn) {
    return xhr('gzh/getDuobaoScore', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  getJsconfig (body, fn) {
    return xhr('gzh/getJsconfig', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  getshorturl (body, fn) {
    return xhr('gzh/shorturl', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

  saveUserbyscan (body, fn) {
    return xhr('gzh/saveUserbyscan', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json'} }, fn, null, 'post')
  }

}

export default new UserscircleService()
