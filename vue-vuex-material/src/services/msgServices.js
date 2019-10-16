import xhr from '@/services/xhr'
class MsgService {
  getContactList(body) {
    return xhr('admin/Contact/getList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  setContact(body) {
    return xhr('admin/Contact/addComment', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  getAdviseList(body) {
    return xhr('admin/Advise/getList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  setAdvise(body) {
    return xhr('admin/Advise/addComment', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

}

export default new MsgService()
