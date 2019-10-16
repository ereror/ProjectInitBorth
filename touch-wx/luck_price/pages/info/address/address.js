'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../static/utils/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../api/index.js');

var _index4 = _interopRequireDefault(_index3);

var _toast = require('../../../static/utils/toast.js');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();
exports.default = Page({
  data: {
    address_bg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon_nomsg.png',
    isdata: true,
    optbtn: false,
    addrlist: [],
    isloading: false,
    interval: {},
    time: 0,
    touchDot: 0,
    id: 0,
    iscount: 0,
    chosseObj: {},
    isdel: false,
    ischecked: false,
    type: 'detail'
  },
  onLoad: function onLoad(param) {
    this.data.id = param.id || 0;
    this.data.type = param.type || 0;
  },
  onShow: function onShow() {
    this.getAddrList();
  },
  goUrl: function goUrl(e) {
    if (this.data.addrlist.length >= 5) {
      _toast2.default.show('warn', '最多添加5个地址，请删除不常用的地址！！', 1000);
      return;
    }
    _index2.default.goUrl(e);
  },
  onUnload: function onUnload() {
    // 设置前面的地址
    var model = -1;
    if (this.data.type != 'ucenter') {
      _index2.default.getPage(model).setData({
        address: this.data.chosseObj
      });
    }
  },
  chosebtn: function chosebtn(e) {
    // 点击处理详情
    var _util$getData = _index2.default.getData(e),
        index = _util$getData.index;

    var that = this;
    if (this.data.type === 'ucenter') {
      return;
    }
    this.data.addrlist.map(function (v, i) {
      v.usednow = false;
      if (i === index) {
        v.usednow = true;
        v.iscount = i;
        that.data.chosseObj = v;
      }
    });
    this.setData({
      addrlist: this.data.addrlist
    });
    if (this.data.type != 'ucenter') {
      app.getUserInfo().then(function (res) {
        wx.navigateBack();
      });
    }
  },
  getAddrList: function getAddrList() {
    var _this = this;

    // 获取地址列表
    _index4.default.getAddrList().then(function (res) {
      if (res.code === 200) {
        _this.data.ischecked = false;
        _this.data.addrlist = res.data || [];
        _this.data.addrlist.map(function (v, i) {
          v.usednow = false;
          if (v.used) v.usednow = true;
          if (v.id === _this.data.id * 1) {
            v.usednow = true;
            v.iscount = i;
            _this.data.ischecked = true;
            _this.data.chosseObj = v;
          }
        });
        if (!_this.data.ischecked) {
          _this.data.chosseObj = _this.data.addrlist.filter(function (v, i) {
            return v.used != 0;
          });
        }
        if (!_this.data.addrlist.length && _this.data.isdel) {
          _this.data.chosseObj = {};
          app.globalData.userInfo.addr_list = [];
        }
        _this.setData({
          addrlist: _this.data.addrlist,
          ischecked: _this.data.ischecked
        });
      }
    });
  },

  checkDetail: _index2.default.throttle(function checkDetail(e) {
    var _util$getData2 = _index2.default.getData(e),
        index = _util$getData2.index;

    var param = this.data.addrlist[index];
    wx.navigateTo({
      url: '/pages/info/addressadd/addressadd?id=' + param.id + '&name=' + param.name + '&phone=' + param.phone + '&city=' + param.city + '&addr=' + param.addr + '&used=' + param.used
    });
  }, 1500),
  setAddress: function setAddress(e) {
    var _this2 = this;

    if (this.data.isloading) return;
    this.data.isloading = true;

    var _util$getData3 = _index2.default.getData(e),
        index = _util$getData3.index;

    var param = this.data.addrlist[index];
    param.used = 1;
    _index4.default.editAddr(param).then(function (res) {
      _this2.data.isloading = false;
      if (res.code === 200) {
        _this2.getAddrList();
        _toast2.default.show('success', '地址设置成功！！', 1000);
      } else {
        _toast2.default.show('warn', '地址设置失败！！', 1000);
      }
    });
  },
  delAddress: function delAddress(e) {
    var _this3 = this;

    if (this.data.isloading) return;
    this.data.isloading = true;

    var _util$getData4 = _index2.default.getData(e),
        index = _util$getData4.index;

    var id = this.data.addrlist[index].id;
    _index4.default.delAddr({ id: id }).then(function (res) {
      _this3.data.isloading = false;
      if (res.code === 200) {
        _this3.getAddrList();
        _this3.data.isdel = true;
        _toast2.default.show('success', '地址删除成功！！', 1000);
      } else {
        _toast2.default.show('warn', '地址删除失败！！', 1000);
      }
    });
  },
  addrTouchStart: function addrTouchStart(e) {
    // 滑动了
    console.log('滑动了');
    this.data.touchDot = e.touches[0].pageX; // 获取触摸时的原点 
    // 使用js计时器记录时间
    var that = this;
    this.data.interval = setInterval(function () {
      that.data.time++;
    }, 100);
  },
  addrTouchMove: function addrTouchMove(e) {
    // 滑动了
    var touchMove = e.touches[0].pageX;

    var _util$getData5 = _index2.default.getData(e),
        index = _util$getData5.index;

    if (touchMove - this.data.touchDot <= -40 && this.data.time < 10) {
      this.data.addrlist[index].optbtn = true;
    }
    if (touchMove - this.data.touchDot >= 40 && this.data.time < 10) {
      this.data.addrlist[index].optbtn = false;
    }
  },
  addrTouchEnd: function addrTouchEnd(e) {
    // 滑动了
    var _util$getData6 = _index2.default.getData(e),
        index = _util$getData6.index;

    var optbtn = 'addrlist[' + index + '].optbtn';
    console.log(optbtn);
    clearInterval(this.data.interval);
    this.data.time = 0;
    this.setData({
      addrlist: this.data.addrlist
    });
  }
});