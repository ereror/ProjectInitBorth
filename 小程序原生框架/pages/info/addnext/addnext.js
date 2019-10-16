import util from '../../../utils/index.js';
import { infoModel, fileModel } from '../../../apis/index.js';
var issubmit = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param:{
      msg:'',
      origin_money:'',
      now_money:'',
      category_name:"",
      detail:'',
      "type":""
    },
    categoryIndex: -1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let {param:oldParam,categoryList}=util.getPage(-1).data;
    let param = Object.assign({}, this.data.param, oldParam)
    
    getApp().getConfigInfo().then((d)=>{
      let { info_type_free_words, info_type_wonder_words } = d.extraConfig;
      that.setData({
        param,
        categoryList,
        info_type_free_words,
        info_type_wonder_words
      })
    })
  },
  setParam: function (e) {
    let { key } = util.getData(e);
    let value = util.getValue(e);
    key = `param.${key}`;

    this.setData({
      [key]: value
    })
  },
  categoryChange: function (e) {

    let index = e.detail.value;
    let categoryInfo = this.data.categoryList[index]
    let that = this;
    that.setData({
      'param.category_name': categoryInfo.title
    })
  },
  typeChange:function(e){

    let {index} = util.getData(e);
    let active=this.data.param.type;
    if (index==active){
      index=''
    }
    this.setData({
      'param.type': index
    })
  },
  submit: function(){
    let { id, categoryid, content, address, longitude, latitude, imgs, tag, type, msg, origin_money, now_money, category_name,detail}=this.data.param;
    let validate = new util.Validate();
    validate.add(type, "isNoEmpty", "请选择发布方式")
    if(type==3){
      validate.add(origin_money, "isNoEmpty", "请输入原价");
      validate.add(now_money, "isNoEmpty", "请输入二手价")
    }
    if(type==4){
      validate.add(category_name, "isNoEmpty", "请选择互换分类")
      validate.add(detail, "isNoEmpty", "请描述需要互换的东西")
    }
    
    let message = validate.start();
    if (message) {
      util.showModal({ content: message })
      return;
    }


    imgs = util.getIds(imgs);
    let { info_type_free_words, info_type_wonder_words}=this.data
    if(type == 1){
      msg = info_type_free_words||'都是邻居，免费送给你吧，来拿吧'
    }
    if(type == 2) {
      msg = info_type_wonder_words||'我也不知道，看能换什么吧，哈哈~'
    }
    let type_detail=JSON.stringify({
      msg,
      origin_money,
      now_money,
      detail,
      category_name
    })
    if (issubmit) return
    issubmit = true
    infoModel.add({
      id,
      categoryid,
      content,
      address,
      longitude,
      latitude,
      imgs,
      tag,
      type,
      type_detail
    }).then((d)=>{
      util.showSuccess("发布成功");
      issubmit = false
      util.getPage(-2).onPullDownRefresh();
      setTimeout(function(){
        wx.navigateBack({
          delta:2
        })
      },1000)
    })
  }
})