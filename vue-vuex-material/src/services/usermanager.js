import xhr from '@/services/xhr'
class UserManagerService {
  //  // 玩家列表
  // getUserList(body) {
  //   return xhr('gm/GetUserList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  // }
  getUserList(body) {
    return xhr('Admin/Users', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  setUser(body) {
    return xhr('Admin/ModifyUserInfo', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  getRoomList(body) {
    return xhr('Admin/QueryRoomInfo', { method: 'Get' })
  }
}

export default new UserManagerService()
