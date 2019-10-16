import { req, uploadFile, uploadFileProgress } from '../../static/utils/req.js'
export default {
  // 上传文件
  upload(param) {
    return uploadFile("/common/File/upload", param)
  },
  uploadPhoto(param) {
    return req.post("/mobile/Member/photograph", param)
  },
  // 用户code登录
  uerLogin(param) {
	return req.post("/Mobile/Token/getToken", param)
  },
  // 用户注册
  uerRegist(param) {
	return req.post("/Mobile/Token/register", param)
  },
   // 删除图片
  deletePhoto(param) {
    return req.post("/mobile/Member/delPhotograph", param)
  },
  // 获取支付请求
  GetPay(param) {
    return req.post("/mobile/Zpay/pay", param)
  },
  // 获取用户消息
  getUserinfo(param) {
    return req.post("/mobile/Member/UserInfo", param)
  },
   // 发送通知
  sendFormId(param) {
    return req.post("/mobile/Form/AddFormId", param)
  },
  sendShareFrom(param) {
	console.log('开始调用')
	return req.post("/mobile/member/channel", param)
  },
   // 上传视频进度
  uploadFileProgress(param) {
    return uploadFileProgress("/common/File/upload", param)
  }
}