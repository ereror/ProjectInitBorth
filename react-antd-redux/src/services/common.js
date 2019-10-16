import xhr from 'services/xhr'
class CommonService {

  getOpenId(body) {
    return xhr('dataSyn/api/getOpenId', body, { method: 'GET', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }

  login(body) {
    return xhr('admin/Index/login', body, { method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
    // responseType: 'arraybuffer' 二进制 配置到header里面
    /**
     *  const params = new URLSearchParams();
		params.append('a', 1);

		var formData = new FormData();
 		formData.append('username', 'Chris');

    application/x-www-form-urlencoded
    
     */
  }

  getJsconfig(body) {
    return xhr('dataSyn/api/getConfig', body, { method: 'GET', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'}})
  }

  uploadImgFile(body) {
    return xhr('dataSyn/api/uploadFile', body, { method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'multipart/form-data'}, type: 'file' })
  }

  uploadFile(body) {
    return xhr('common/File/upload?XDEBUG_SESSION_START=13465', body, { method: 'POST', headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'multipart/form-data'}, type: 'file' })
  }

}

export default new CommonService()
