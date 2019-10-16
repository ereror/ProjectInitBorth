'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _user = require('../../../api/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {},
  getuserinfo: function getuserinfo(e) {
    var userInfo = e.detail.userInfo;
    if (userInfo) {
      //授权后保存数据
      wx.getUserInfo({
        lang: 'zh_CN',
        success: function success(res) {
          var userInfo = res.userInfo;
          userInfo.avatarurl = userInfo.avatarUrl;
          userInfo.nickname = userInfo.nickName;
          _user2.default.save(userInfo).then(function () {
            wx.setStorageSync('isAuth', true);
            getApp().globalData.userInfo = userInfo;
            // var pages = getCurrentPages();
            // var currPage = pages[pages.length - 1]; //当前页面
            // var prevPage = pages[pages.length - 2];
            // prevPage.setData({
            //   isAuthBack: 'isAuthBack'
            // });
            // 页面返回
            wx.navigateBack();
          });
        }
      });
    } else {
      wx.showToast({
        title: '获取用户信息失败',
        duration: 1000,
        icon: ''
      });
    }
  }
});