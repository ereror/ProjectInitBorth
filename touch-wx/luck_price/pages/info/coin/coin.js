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

var _user = require('../../../api/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();
exports.default = Page({
  data: {
    coinbg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/coinbg.png',
    ad_img_01: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_01.png',
    ad_img_02: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_02.png',
    coin_choose: '/images/coin-iconA.png',
    coin_choose_no: '/images/coin-iconD.png',
    money: 0,
    txshow: 10,
    coin_now_show: false, // 添加支付账号
    account: '', // 账号
    name: '', // 姓名
    mask: {
      height: "100%",
      width: "100%",
      position: "fixed",
      "z-index": "477",
      background: "rgba(0,0,0,.5)"
    }
  },
  onLoad: function onLoad(param) {
    var money = param.money;
    this.data.money = money / 100;
    this.data.money = Math.floor(this.data.money * 100) / 100;
    this.setData({
      money: this.data.money
    });
  },
  onShow: function onShow() {
    var userinfo = app.globalData.userInfo;
    this.data.account = userinfo.zfb_account;
    this.data.name = userinfo.zfb_name;
    this.data.money = userinfo.money;
    this.setData({
      account: this.data.account,
      name: this.data.name,
      money: this.data.money / 100
    });
  },
  goUrl: function goUrl(e) {
    _index2.default.goUrl(e);
  },
  setParam: function setParam(e) {
    var _util$getData = _index2.default.getData(e),
        key = _util$getData.key;

    var val = e.detail.value;
    if (key === 1) {
      this.data.account = val;
    } else if (key === 2) {
      this.data.name = val;
    }
  },
  setMoney: function setMoney(e) {
    var _util$getData2 = _index2.default.getData(e),
        money = _util$getData2.money;

    this.data.txshow = money;
    this.setData({
      txshow: this.data.txshow
    });
  },
  showAccountFunc: function showAccountFunc(e) {
    this.data.coin_now_show = !this.data.coin_now_show;
    this.setData({
      coin_now_show: this.data.coin_now_show
    });
  },
  saveUseInfo: function saveUseInfo() {
    var _this = this;

    // 保存用户信息
    if (!this.data.account) _toast2.default.show('warn', '支付宝账号不能为空', 1000);
    if (!this.data.name) _toast2.default.show('warn', '需要核对的姓名不能为空', 1000);
    if (!this.data.account || !this.data.name) return;
    var temp = {
      zfb_name: this.data.name,
      zfb_account: this.data.account
    };
    _user2.default.save(temp).then(function (resd) {
      if (resd.code === 200) {
        _toast2.default.show('warn', '支付宝账号操作成功！', 1000);
        _this.data.coin_now_show = false;
        _this.setData({
          account: _this.data.account,
          coin_now_show: false,
          name: _this.data.name
        });
      } else {
        _toast2.default.show('warn', '支付宝账号操作失败，请稍后重试！', 1000);
      }
    });
  },
  txfunc: function txfunc(e) {
    // 提现
    var that = this;
    if (this.data.money && this.data.money < 10 || this.data.money < this.data.txshow) {
      _toast2.default.show('warn', '提现余额不足!', 1000);
      return;
    } else {
      wx.navigateTo({
        url: '/pages/info/txaction/txaction?money=' + this.data.txshow + '&account=' + this.data.account
      });
    }
  }
});