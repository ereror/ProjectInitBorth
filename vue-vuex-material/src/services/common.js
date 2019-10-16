import xhr from '@/services/xhr'
class CommonService {
  login(body) {
    return xhr('admin/Index/login', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }
  uploadFile(body) {
    return xhr('common/File/upload?XDEBUG_SESSION_START=13465', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/x-www-form-urlencoded'}, type: 'file' })
  }
}

export default new CommonService()
