import util from '../../../utils/index.js';
import { userModel } from '../../../apis/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openType = options.openType || "getUserInfo";
    this.setData({
      openType
    })
  },

  getuserinfo: function (e) {
    let userInfo = e.detail.userInfo;
    if (userInfo) {
      //授权后保存数据
      wx.getUserInfo({
        lang: 'zh_CN',
        success: function (res) {
          let userInfo = res.userInfo;
          //授权后保存数据
          userModel.save(userInfo).then(() => {
            wx.setStorageSync('isAuth', true)
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1]; //当前页面
            var prevPage = pages[pages.length - 2];
            prevPage.setData({
              isAuthBack: 'isAuthBack'
            });
            wx.navigateBack({
              delta: 1
            })
          })
        },
      })
    } else {
      util.showModal({ content: "获取用户信息失败" })
    }
  },
  opensetting: function (e) {
    console.log(e)
  },
  getphonenumber: function (e) {
    console.log(e)
  }
})