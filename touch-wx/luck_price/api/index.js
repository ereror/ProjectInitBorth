"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _req = require("../static/utils/req.js");

exports.default = {
  // 获取奖品列表
  getList: function getList(param) {
    return _req.req.post("/mobile/Pool/getAllList", param);
  },

  // 获取活动详情
  getDetail: function getDetail(param) {
    return _req.req.post("/mobile/Pool/getPoolDetail", param);
  },

  // 参加活动
  joinPool: function joinPool(param) {
    return _req.req.post("/mobile/Pool/joinPool", param);
  },

  // 组队参加活动 pool_id,adviser, group_id
  // 获取已获得奖品列表
  getGiftList: function getGiftList(param) {
    return _req.req.post("/mobile/PrizeGet/GetList", param);
  },
  getMyJoinList: function getMyJoinList(param) {
    return _req.req.post("/mobile/Pool/getMyJoinList", param);
  },

  // 领取红包
  getHb: function getHb(param) {
    return _req.req.post("/mobile/PrizeGet/getMoney", param);
  },

  // 后台发货
  getPrizeApply: function getPrizeApply(param) {
    return _req.req.post("/mobile/Prizeget/getPrizeApply", param);
  },

  // 获取参与抽奖者头像
  getHeaderList: function getHeaderList(param) {
    return _req.req.post("/mobile/Pool/getHeaderList", param);
  },

  // 添加收货地址
  editAddr: function editAddr(param) {
    return _req.req.post("/mobile/Member/editAddr", param);
  },

  // 删除收货地址
  delAddr: function delAddr(param) {
    return _req.req.post("/mobile/Member/delAddr", param);
  },

  // 收货地址列表
  getAddrList: function getAddrList(param) {
    return _req.req.post("/mobile/Member/getAddrList", param);
  },

  // 联系我们
  addContact: function addContact(param) {
    return _req.req.post("/mobile/Contact/addContact", param);
  },

  // 意见收集
  addAdvise: function addAdvise(param) {
    return _req.req.post("/mobile/Advise/addAdvise", param);
  },

  // 上传文件
  upload: function upload(param) {
    return (0, _req.uploadFile)("/common/File/upload", param);
  },

  // 红包明细
  getMoneyChgList: function getMoneyChgList(param) {
    return _req.req.post("/mobile/Prizeget/getMoneyChgList", param);
  },

  // 提现
  applyTixian: function applyTixian(param) {
    return _req.req.post("/mobile/Payment/ApplyTixian", param);
  },

  // 获取专属二维码
  getXcxCode: function getXcxCode(param) {
    return _req.req.post("/mobile/Share/getXcxCode", param);
  },

  // 收集formId
  sendFormId: function sendFormId(param) {
    return _req.req.post("/mobile/Form/AddFormId", param);
  }
};