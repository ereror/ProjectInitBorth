'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../api/index.js');

var _index2 = _interopRequireDefault(_index);

var _toast = require('../../../static/utils/toast.js');

var _toast2 = _interopRequireDefault(_toast);

var _index3 = require('../../../static/utils/index.js');

var _index4 = _interopRequireDefault(_index3);

var _user = require('../../../api/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();
exports.default = Page({
  data: {
    prizesend: false,
    home_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/bg.png',
    tx_iconA: '/images/tx-icona.png',
    tx_iconD: '/images/tx-icond.png',
    id: '',
    money: 0,
    account: ''
  },
  onLoad: function onLoad(param) {
    this.data.account = param.account || '';
    this.data.money = param.money || '';
    this.setData({
      account: this.data.account,
      money: this.data.money
    });
  },
  onShow: function onShow() {},
  txFunc: function txFunc() {
    var param = {
      money: this.data.money * 100,
      account: this.data.account
    };
    _index4.default.showLoading();
    _index2.default.applyTixian(param).then(function (res) {
      if (res.code === 200) {
        _user2.default.getUserinfo().then(function (d) {
          _index4.default.hideAll();
          app.globalData.userInfo = d.data;
          wx.navigateBack();
          _toast2.default.show('success', '提现成功,我们会尽快处理', 1000);
        }).catch(function (e) {
          _index4.default.hideAll();
          _toast2.default.show('warn', '提现失败，请稍后重试！', 1000);
        });
      } else {
        _toast2.default.show('warn', '提现失败，请稍后重试！', 1000);
        _index4.default.hideAll();
      }
    });
  }
});