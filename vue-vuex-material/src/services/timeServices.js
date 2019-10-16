import xhr from '@/services/xhr'
class TimeService {
  getList(body) {
    return xhr('admin/Poolrule/getList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  delTime(body) {
    return xhr('admin/Poolrule/del', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  saveTime(body) {
    return xhr('admin/Poolrule/create', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

   // 发布时间规则
  publishTime(body) {
    return xhr('admin/Poolrule/publish', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

   // 发布所有时间规则
  publishTimeAll(body) {
    return xhr('admin/Poolrule/publishAll', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

   // 发布所有时间规则
  stopTime(body) {
    return xhr('admin/Poolrule/stop', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }
}

export default new TimeService()
