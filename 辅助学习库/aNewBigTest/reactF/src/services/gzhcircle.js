import xhr from 'services/xhr'
class gzhService {

  saveData (body) {
    return xhr('admin/Index/login', body, { method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }

  listTip (body) {
    return xhr('dataSyn/api/listTip', body, { method: 'GET', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }
  
  getIdBycode (body) {
    return xhr('dataSyn/api/getbycode', body, { method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }

  saveTip (body) {
    return xhr('dataSyn/api/saveTip', body, { method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }

  detailTip (body) {
    return xhr('dataSyn/api/detailTip', body, { method: 'GET', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }

  dzOrCai (body) {
    return xhr('dataSyn/api/dzOrCai', body, { method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }

  getOpenId (body) {
    return xhr('dataSyn/api/getOpenId', body, { method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }

  topTip (body) {
    return xhr('dataSyn/api/topTip', body, { method: 'GET', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }

}

export default new gzhService()
