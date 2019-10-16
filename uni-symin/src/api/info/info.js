import { req, uploadFile, uploadFileProgress } from '../../static/utils/req.js'
export default {
   // 获取职业列表
  getJobList(param) {
    return req.post("/Mobile/Member/occupationList", param)
  },
   // 邀约项目
  getTypeList(param) {
    return req.post("/Mobile/Member/objectiveList", param)
  },
   // 获取年收入
  getRevenueList(param) {
    return req.post("/mobile/Member/revenueList", param)
  },
   // 逛一逛
  getNewList(param) {
	return req.post("/mobile/Member/casual", param)
  },
   // 用户详情
  getUserInfo(param) {
	return req.post("/mobile/Member/userInfo", param)
  },
   // 保存用户信息
  saveData(param) {
	return req.post("/mobile/Member/saveBasic", param)
  },
   // 获取用户上传图片s
  getPhotos(param) {
	return req.post("/mobile/Member/photograph", param)
  },
   // 获取他人详情数据
  getUserInfoOther(param) {
	return req.post("/mobile/Member/otherInfo", param)
  },
   // 普通,屏蔽，封禁
  changeStatus(param) {
    return req.post("/Admin/Member/changeStatus", param)
  },
   // 改变分数
  changeScore(param) {
    return req.post("/Admin/Member/changeScore", param)
  },
   // 支付29
  getGateCheck(param) {
    return req.post("/mobile/Pay/gate_check", param)
  },
   // 获取订单
  getGatePay(param) {
    return req.post("/mobile/Pay/gate_pay", param)
  },
   // 取消订单
  cancle(param) {
    return req.post("/mobile/Pay/cancle", param)
  },
  // 设置手机查看权限
  accessPhone(param) {
    return req.post("/mobile/Member/accessPhone", param)
  },
  // 设置微信查看权限
  accessWechat(param) {
    return req.post("/mobile/Member/accessWechat", param)
  },
   //vip 列表
  vipList(param) {
    return req.post("/mobile/Member/vipList", param)
  },
   // 支付检查
  payCheckVip(param) {
	return req.post("/mobile/Pay/vip_check ", param)
  },
   // 获取用户列表
  getUserList(param) {
	return req.post("/mobile/Member/userList", param)
  },
   // 获取他人的详情记录
  getOtherUser(param) {
	return req.post("/mobile/Member/otherInfo", param)
  },
   // 来访记录
  getVisitList(param) {
	return req.post("/mobile/Action/visitList", param)
  },
   // 访问记录
  getBeVisitList(param) {
	return req.post("/mobile/Action/beVisitList", param)
  },
   // 用户查看视频
  getOtherVideo(param) {
	return req.post("mobile/Action/checkVideo", param)
  },
   // 用户查看手机号或者微信
  checkPhoneOrWechat(param) {
	return req.post("mobile/Action/checkPhoneOrWechat", param)
  },
   // 建立用户关系
  createRelation(param) {
	return req.post("/mobile/relation/createRelation", param)
  },
  // 用户加黑
  pullgRelatioasdasn(param) {
    return req.post("/mobile/relation/changeRelationship", param)
  },
   // 意见反馈，举报
  addAccusation(param) {
	return req.post("/mobile/Accusation/addAccusation ", param)
  },
    // 云信会话列表用户信息
  yxuserdata(param) {
	return req.post("/mobile/Member/headerAndNickname", param)
  },
   // 获取banner广告
  getBannerList(param) {
	return req.post("/mobile/Member/bannerList", param)
  },
   // 发送地理位置
  heartbeat(param) {
	return req.post("/mobile/Action/heartbeat", param)
  },
  sendNotice(param) {
	return req.post("/mobile/Action/sendNotice", param)
  }
}