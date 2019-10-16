'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../api/index.js');

var _index2 = _interopRequireDefault(_index);

var _toast = require('../../../static/utils/toast.js');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    prizesend: false,
    home_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/bg.png',
    winprizeimg_01: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon-ypx-apply.png',
    winprizeimg_02: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon-yfh-apply.png',
    winprizeimg_03: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon-ysd.png',
    lostprizeimg_04: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon-dsh-apply.png',
    applytest: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/apply-test.jpg',
    id: '',
    addr: {},
    name: ''
  },
  onLoad: function onLoad(param) {

    this.data.id = param.prizeId || '';
    this.data.name = param.prizeName || '';
    this.data.addr = param.addr && JSON.parse(param.addr) || '';
    this.setData({
      addr: this.data.addr,
      name: this.data.name
    });
  },
  onShow: function onShow() {},
  sendGoods: function sendGoods() {
    if (!this.data.id || !this.data.addr.id) {
      _toast2.default.show('warn', '申请发货前奖品已过期，或者地址没有填写！', 1000);
      return;
    }
    var param = {
      id: this.data.id,
      addr: this.data.addr.id
    };
    _index2.default.getPrizeApply(param).then(function (res) {
      if (res.code === 200) {
        _toast2.default.show('success', '申请发货成功,我们将尽快处理你的发货申请！', 1000);
        setTimeout(function () {
          wx.navigateBack();
        }, 1000);
      }
    });
  }
});