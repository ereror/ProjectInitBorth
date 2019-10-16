import xhr from '@/services/xhr'
class GiftService {
  //  // 玩家列表
  // getUserList(body) {
  //   return xhr('gm/GetUserList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  // }
  getList(body) {
    return xhr('admin/Prize/getList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  delGift(body) {
    return xhr('admin/Prize/del', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  saveGift(body) {
    return xhr('admin/Prize/create', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  getGiftid(body) {
    return xhr('admin/Prize/getPrize', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  getTixianList(body) {
    return xhr('admin/Payment/getTixianList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  getTixiancodeList(body) {
    return xhr('admin/Payment/getTixianList', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  handleTixianOrder(body) {
    return xhr('admin/Payment/handleTixianOrder', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

  updateApplyCode(body) {
    return xhr('admin/Payment/setTixianComment', { method: 'POST', body, headers: {'Accept': 'application/json, text/plain, */*', 'Content-Type': 'application/json;charset=utf-8'} })
  }

}

export default new GiftService()
