import { req } from '../utils/req.js';

export default {
  //和某人聊天列表
  getList(param) {
    return req.post("/api.chat/chatList", param)
  },
  //给某人发消息
  chatTo(param) {
    return req.post("/api.chat/chatTo", param)
  },
  //聊天记录 按照时间分组 无分页 全部数据
  getAllList(param) {
    return req.post("/api.chat/getAllList", param)
  },
  sendChatNotify(param) {
    return req.post("/api.chat/chatNotify", param)
  }
}