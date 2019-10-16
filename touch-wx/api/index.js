import { req, uploadFile } from '../static/utils/req.js'
export default {
  // 获取奖品列表
  getList(param) {
    return req.post("/mobile/Pool/getAllList", param)
  },
  // 获取活动详情
  getDetail(param) {
    return req.post("/mobile/Pool/getPoolDetail", param)
  },
  // 参加活动
  joinPool(param) {
    return req.post("/mobile/Pool/joinPool", param)
  },
  // 组队参加活动 pool_id,adviser, group_id
  // 获取已获得奖品列表
  getGiftList(param) {
    return req.post("/mobile/PrizeGet/GetList", param)
  },
  getMyJoinList(param) {
    return req.post("/mobile/Pool/getMyJoinList", param)
  },
  // 领取红包
  getHb(param) {
    return req.post("/mobile/PrizeGet/getMoney", param)
  },
  // 后台发货
  getPrizeApply(param) {
    return req.post("/mobile/Prizeget/getPrizeApply", param)
  },
  // 获取参与抽奖者头像
  getHeaderList(param) {
    return req.post("/mobile/Pool/getHeaderList", param)
  },
  // 添加收货地址
  editAddr(param) {
    return req.post("/mobile/Member/editAddr", param)
  },
  // 删除收货地址
  delAddr(param) {
    return req.post("/mobile/Member/delAddr", param)
  },
  // 收货地址列表
  getAddrList(param) {
    return req.post("/mobile/Member/getAddrList", param)
  },
  // 联系我们
  addContact(param) {
    return req.post("/mobile/Contact/addContact", param)
  },
  // 意见收集
  addAdvise(param) {
    return req.post("/mobile/Advise/addAdvise", param)
  },
  // 上传文件
  upload(param) {
    return uploadFile("/common/File/upload", param)
  },
  // 红包明细
  getMoneyChgList(param) {
    return req.post("/mobile/Prizeget/getMoneyChgList", param)
  },
  // 提现
  applyTixian(param) {
    return req.post("/mobile/Payment/ApplyTixian", param)
  },
  // 获取专属二维码
  getXcxCode(param) {
    return req.post("/mobile/Share/getXcxCode", param)
  },
  // 收集formId
  sendFormId(param) {
    return req.post("/mobile/Form/AddFormId", param)
  }
}