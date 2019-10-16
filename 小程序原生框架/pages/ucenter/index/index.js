import util from '../../../utils/index.js';
import config from '../../../config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: config.tabbar,
    nowPageIndex: 2,
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    getApp().getConfigInfo().then((d)=>{
      let extraConfig = d.extraConfig
      that.setData({
        extraConfig
      })
    })
  },
  onShow:function(){
    let that = this;
    getApp().getUserInfo(true).then((d) => {
      let userInfo = d;
      that.setData({
        userInfo
      })
    })
  },
  goUrl: function (e) {
    util.goUrl(e)
  },
  share:function(){
    this.setData({
      show:true
    })
  },
})