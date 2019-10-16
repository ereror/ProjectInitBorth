import util from '../../../utils/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
     param:{},
     paramTitle:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { op } = options;
    let filterList = util.getPage(-1).data.fliterList;
    let param = util.getPage(-1).data.filterParam||{}
    let paramTitle = util.getPage(-1).data.filterParamTitle || {}
    this.setData({
      filterList,
      param,
      paramTitle
    })
  },
  setSelect: function (e) {
    let { key, id, title } = util.getData(e);
    let param = this.data.param;
    let keyId = `param.${key}`;
    let keyTitle = `paramTitle.${key}`
    //如果已选中则取消选中
    if (param[key] == id) {
      this.setData({
        [keyId]: '',
        [keyTitle]: ''
      })
    } else {
      this.setData({
        [keyId]: id,
        [keyTitle]: title
      })
    }
  },
  setInput:function(e){
    let { key } = util.getData(e);
    let value=util.getValue(e)
    let keyId = `param.${key}`;
    let keyTitle = `paramTitle.${key}`
    this.setData({
      [keyId]: value,
      [keyTitle]: value
    })
  },
  submit: function () {
    let { param, paramTitle } = this.data;
    util.getPage(-1).getFilterParam(param, paramTitle)
    wx.navigateBack({
      delta: 1
    })
  }
})