import { req } from '../utils/req.js';

export default {
  dashboard(param) {
    //保存用户信息
    return req.post("/api.member/dashboard", param)
  },
  //编辑添加信息
  add(param){
    return req.post("/api.info/createInfo", param)
  },
  //获取所有信息分类
  getCategoryList(param) {
    return req.post("/api.info/getAllCategory", param)
  },
  //获取信息列表
  getList(param) {
    return req.post("/api.info/getInfoList", param)
  },
  //改变信息状态
  changeStatus(param) {
    return req.post("/api.info/changeStatus", param)
  },
  //删除信息
  del(param) {
    return req.post("/api.info/deleteInfo", param)
  },
  //添加浏览记录
  addStar(param) {
    return req.post("/api.info/addInfoStar", param)
  },
  //浏览记录列表
  viewList(param) {
    return req.post("/api.info/viewInfoList", param)
  },
  //删除浏览记录
  deleteViewByDay(param) {
    return req.post("/api.info/deleteViewByDay", param)
  },
  //保存formID
  createFormId(param) {
    return req.post("/api.Form/AddFormId", param)
  },

  // 获取详情
  getInfoDetail(param) {
    return req.post("/api.Info/getInfoDetail", param)
  },

  // 获取标签分类
  getAllInfoType(param) {
    return req.post("/api.Info/getAllInfoType", param)
  },

  // 点赞
  setZan(param) {
    return req.post("/api.Info/zan", param)
  },
  // 添加评论
  addcomment(param) {
    return req.post("/api.Info/addcomment", param)
  },

  getCommentList(param) {
    return req.post("/api.Info/getCommentList", param)
  }
}