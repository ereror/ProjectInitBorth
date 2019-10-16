import { req } from '../utils/req.js';

export default {
  save(param) {
    //保存用户信息
    return req.post("/Api.Member/save", param)
  },
  //获取详情
  getUserInfo(param){
    //?XDEBUG_SESSION_START=14996
    return req.post("/Api.member/userInfo", param)
  },
  //获取用户所有信息
  getConfigInfo(param) {
    return req.post("/api.member/getConfig", param)
  }
}