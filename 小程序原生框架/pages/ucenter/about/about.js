import util from '../../../utils/index.js';
import { informationModel, companyModel } from '../../../apis/index.js';
var WxParse = require('../../../plugin/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {
      content: ''
    },
    show: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    getApp().getConfigInfo().then((d)=>{
      let configInfo=d;
      let about_us = configInfo.extraConfig.about_us;
      let space = wx.getSystemInfoSync().windowWidth / 750 * 20
      WxParse.wxParse('content', 'html', about_us, that, space);
    })
    
  },
  goUrl: function (e) {
    util.goUrl(e)
  }
})