'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../static/utils/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();
exports.default = Page({
  data: {
    ademptyImg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/adempty2.jpg',
    home_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/bg_home_03.png',
    ad_img_01: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_01.png',
    ad_img_02: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_02.png',
    icon_addr: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon_addr.png',
    icon_edit: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon_edit.png',
    icon_help: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon_help.png',
    himg_01: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/himg_01.jpg',
    advicepage: '/pages/info/adviceback/adviceback',
    addressY: '/pages/info/address/address?type=ucenter',
    problem: '/pages/info/problem/problem',
    userInfo: {}
  },
  onShow: function onShow() {
    var _this = this;

    app.getUserInfo().then(function (res) {
      console.log(res);
      _this.data.userInfo = app.globalData.userInfo;
      _this.setData({
        userInfo: _this.data.userInfo
      });
    });
  },

  goUrl: _index2.default.throttle(function goUrl(e) {
    var _util$getData = _index2.default.getData(e),
        type = _util$getData.type,
        index = _util$getData.index,
        url = _util$getData.url;

    if (index * 1 === 2) {
      return;
    }
    if (type == 'indexPage') {
      wx.redirectTo({ url: url });
    } else {
      _index2.default.goUrl(e);
    }
  }, 1500),
  goIndexUrl: function goIndexUrl() {
    wx.redirectTo({ url: '/pages/info/index/index?fromtype=center' });
  }
});