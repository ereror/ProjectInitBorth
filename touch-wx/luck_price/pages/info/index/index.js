'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../static/utils/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../api/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    isShowA: false,
    ademptyImg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/adempty2.jpg',
    home_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/bg_home_01.png',
    home_hbsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/btn_hb_01.png',
    prize_img_icon: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/btn_join_01.png',
    prize_joined: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/prize_joined.png',
    prize_img_01: 'https://jdgamess.oss-cn-shanghai.aliyuncs.com/sxs.jpg',
    ad_img_01: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_01.png',
    ad_img_02: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_02.png',
    pagePath: '/pages/info/detail/detail',
    numberStyle: {
      'background-color': '#292727',
      'color': '#fff',
      'padding-left': '4rpx',
      'padding-right': '4rpx',
      'margin-left': '12rpx',
      'margin-right': '12rpx',
      'border-radius': '4rpx',
      'font-size': '26rpx',
      'height': '42rpx',
      'width': '42rpx',
      'display': 'inline-block',
      'text-align': 'center',
      'line-height': '42rpx'
    },
    splitStyle: {
      'color': '#292727',
      'font-size': '26rpx'
    },
    prizeData: [],
    ids: '',
    idsarr: [],
    isNewOj: false,
    isFirstLoad: false
  },
  checkDetail: function checkDetail(e) {
    var _util$getData = _index2.default.getData(e),
        url = _util$getData.url,
        id = _util$getData.id,
        idsarr = _util$getData.idsarr;

    if (!idsarr) idsarr = this.data.ids;
    wx.navigateTo({
      url: url + '?id=' + id + '&ids=' + idsarr
    });
  },

  goUrl: _index2.default.throttle(function goUrl(e) {
    var _util$getData2 = _index2.default.getData(e),
        type = _util$getData2.type,
        url = _util$getData2.url;

    if (type == 'menu') {
      wx.redirectTo({ url: url });
    } else {
      _index2.default.goUrl(e);
    }
  }, 1500),
  getList: function getList() {
    var _this = this;

    if (this.data.isFirstLoad) _index2.default.showLoading('加载中...');
    _index4.default.getList().then(function (res) {
      if (_this.data.isFirstLoad) _index2.default.hideAll();
      if (res.code === 200) {
        var prizeData = res.data;
        var idsarr = [];
        var isNewOjStatus = true;
        if (_this.data.isNewOj) {
          isNewOjStatus = _this.setDataForm(prizeData);
          if (isNewOjStatus) {
            return;
          } else {
            _this.data.prizeData = prizeData;
          }
          _this.data.isNewOj = false;
        } else {
          _this.data.prizeData = prizeData;
        }
        _this.data.prizeData.map(function (v) {
          v.prizelist = v.prizelist && JSON.parse(v.prizelist) || [];
          // v.timeend = (v.end_time * 1000 - new Date().getTime()) / 1000
          v.timeend = v.end_time * 1000;
          v.endTime = _index2.default.formatTime(v.end_time * 1000, 'YY-M-D h:m:s');
          if (v.sponsor.length > 20) v.sponsor = v.sponsor.substring(0, 20);
          idsarr.push(v.id);
        });
        _this.data.idsarr = idsarr;
        _this.data.ids = idsarr.join(',');
        getApp().globalData.prizeData = Object.assign([], _this.data.prizeData);
        _this.setData({
          prizeData: _this.data.prizeData,
          ids: _this.data.ids,
          isShowA: true
        });
      }
    });
  },
  onLoad: function onLoad(param) {
    // console.log('加载成功')
    var scene = decodeURIComponent(param.scene) || '';
    var type = param.fromtype || '';
    this.data.prizeData = Object.assign([], getApp().globalData.prizeData) || [];
    var anlyObj = {};
    if (this.data.prizeData.length) {
      this.setData({
        prizeData: this.data.prizeData
      });
    } else {
      this.data.isFirstLoad = true;
    }
    if (scene && scene != 'undefined') {
      scene = decodeURI(scene);
      anlyObj = _index2.default.getQueryParams(scene);
    }
    if (anlyObj.type == 1 && anlyObj.id && anlyObj.up) {
      wx.navigateTo({
        url: '/pages/info/detail/detail?id=' + anlyObj.id * 1 + '&&adviser=' + anlyObj.up * 1
      });
      return;
    }
    if (param.id) {
      wx.navigateTo({
        url: '/pages/info/detail/detail?id=' + param.id
      });
      return;
    }
    if (param.poolid && param.adviser) {
      wx.navigateTo({
        url: '/pages/info/detail/detail?id=' + param.poolid + '&&adviser=' + param.adviser
      });
      return;
    }
    if (type && type === 'center') {
      this.data.isNewOj = true;
    }
    this.getList();
    console.log('加载');
  },
  onShow: function onShow() {
    var app = getApp();
    app.getUserInfo(true);
  },

  onPullDownRefresh: function onPullDownRefresh() {
    this.data.isNewOj = true;
    this.getList();
  },
  onShareAppMessage: function onShareAppMessage(e) {
    var name = getApp().globalData.userInfo && getApp().globalData.userInfo.nickname || '小陪';
    var title = name + '正在抽奖！快来试试手气！';
    var imageUrl = 'https://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/sharepwcj.jpg';
    return {
      title: title,
      path: '/pages/info/index/index',
      imageUrl: imageUrl,
      success: function success(d) {
        // 成功回调
        console.log('success');
      }
    };
  },
  setDataForm: function setDataForm(prizeData) {
    var idsarr = this.data.idsarr;
    var isnew = false;
    prizeData.map(function (v, i) {
      if (!~idsarr.indexOf(v.id)) isnew = true;
    });
    return isnew;
  }
});