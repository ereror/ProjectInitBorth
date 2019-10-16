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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    ademptyImg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/adempty2.jpg',
    myname: { title: '您的称呼', icons: false, placeholder: '请填写姓名', showicons: false, key: 1, val: '', size: 20 },
    phone: { title: '联系方式', icons: false, placeholder: '请填写手机号码', showicons: false, key: 2, val: '', type: 'number' },
    company: { title: '公司名称', icons: false, placeholder: '请填写内容', showicons: false, key: 3, val: '', size: 20 },
    contact: {
      title: '',
      placeholder: '请填写期望推广的产品简介...',
      size: 50,
      inputval: '',
      key: 4
    },
    isTotal: false
  },
  onLoad: function onLoad() {},
  sendForm: function sendForm() {
    // 联系我们
  },
  setParam: function setParam(e) {
    var _util$getData = _index4.default.getData(e),
        key = _util$getData.key;

    var val = e.detail.value;
    if (key === 1) {
      if (this.data.myname.val.length >= 20) {
        _toast2.default.show('warn', '称呼最多20个汉字！', 1000);
      }
      this.data.myname.val = val.substring(0, 20);
      this.data.myname.val = val;
    } else if (key === 2) {
      this.data.phone.val = val;
    } else if (key === 3) {
      if (this.data.company.val.length >= 20) {
        _toast2.default.show('warn', '公司名称最多20个汉字！', 1000);
      }
      this.data.company.val = val.substring(0, 20);
    } else if (key === 4) {
      this.data.contact.inputval = val;
    }
    if (this.data.myname.val && this.data.phone.val && this.data.company.val && this.data.contact.inputval) {
      this.data.isTotal = true;
    }
    this.setData({
      myname: this.data.myname,
      phone: this.data.phone,
      company: this.data.company,
      contact: this.data.contact,
      isTotal: this.data.isTotal
    });
  },
  goDirect: function goDirect(e) {
    wx.navigateBack({
      delta: 2
    });
  },
  saveContact: function saveContact() {
    if (!this.data.isTotal) return;
    var param = {
      name: this.data.myname.val,
      phone: this.data.phone.val,
      company: this.data.company.val,
      message: this.data.contact.inputval
    };
    _index2.default.addContact(param).then(function (res) {
      if (res.code === 200) {
        _toast2.default.show('warn', '提交成功，我们将在2个工作日内与你联络！', 1000);
        setTimeout(function () {
          wx.navigateBack({
            delta: 2
          });
        }, 1000);
      } else {
        _toast2.default.show('warn', '提交失败，请稍后再试！', 1000);
      }
    });
  }
});