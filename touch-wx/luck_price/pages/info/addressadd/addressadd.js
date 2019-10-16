'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../api/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../static/utils/index.js');

var _index4 = _interopRequireDefault(_index3);

var _toast = require('../../../static/utils/toast.js');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    region: ['四川省', '成都市', '高新区'],
    goodsman: { title: '收货人', icons: false, placeholder: '请填写收货人姓名', showicons: false, key: 1, val: '', iptclass: 'iptclass' },
    phonenum: { title: '手机号码', icons: false, placeholder: '请填写手机号码', showicons: false, key: 2, val: '', iptclass: 'iptclass', type: 'number' },
    area: { title: '所在地区', icons: true, placeholder: '点击选择', showicons: true, key: 3, val: '', iconend: 'icon-nextstep areaipt', iptclass: 'iptclass' },
    areadetail: { title: '详细地址', icons: false, placeholder: '详细地址，例：睿东中心wework41b', showicons: false, key: 4, val: '', iptclass: 'iptclass' },
    isnow: false,
    isloading: false,
    id: '',
    type: '',
    choseobj: {}
  },
  onLoad: function onLoad(param) {
    this.data.type = param.type || '';
    this.data.id = param.id || '';
    this.data.goodsman.val = param.name || '';
    this.data.phonenum.val = param.phone || '';
    this.data.area.val = param.city || '';
    this.data.areadetail.val = param.addr || '';
    this.data.isnow = param.used * 1 || false;
    var title = '新增收货地址';
    if (this.data.id) {
      title = '编辑收货地址';
    }
    wx.setNavigationBarTitle({
      title: title
    });
    this.setData({
      'goodsman.val': this.data.goodsman.val,
      'phonenum.val': this.data.phonenum.val,
      'area.val': this.data.area.val,
      'areadetail.val': this.data.areadetail.val,
      isnow: this.data.isnow,
      id: this.data.id
    });
  },

  bindRegionChange: function bindRegionChange(e) {
    this.setData({
      region: e.detail.value,
      'area.val': e.detail.value
    });
  },
  isnoFunc: function isnoFunc(e) {
    console.log('123');
  },
  onUnload: function onUnload() {
    // 当来自详情页直接添加地址需要返回页面，并且将地址赋值上去
    var model = -1;
    if (this.data.choseobj.id && this.data.type === 'detail') {
      _index4.default.getPage(model).setData({
        address: this.data.choseobj
      });
    } else {
      // 列表选择返回
      _index4.default.getPage(model).getAddrList();
    }
  },
  setParam: function setParam(e) {
    var _util$getData = _index4.default.getData(e),
        key = _util$getData.key;

    var val = e.detail.value;
    if (key === 1) {
      this.data.goodsman.val = val;
      this.setData({
        'goodsman.val': this.data.goodsman.val
      });
    } else if (key === 2) {
      this.data.phonenum.val = val;
      this.setData({
        'phonenum.val': this.data.phonenum.val
      });
    } else if (key === 4) {
      this.data.areadetail.val = val;
      this.setData({
        'areadetail.val': this.data.areadetail.val
      });
    }
  },
  setNow: function setNow() {
    this.data.isnow = !this.data.isnow;
    this.setData({
      isnow: this.data.isnow
    });
  },
  saveAddr: function saveAddr() {
    var _this = this;

    var param = {};
    param.id = this.data.id;
    param.name = this.data.goodsman.val || '';
    param.phone = this.data.phonenum.val || '';
    param.city = this.data.region.join(',') || '';
    param.addr = this.data.areadetail.val || '';
    param.used = this.data.isnow ? 1 : 0;
    if (!param.name.length || !param.phone.length || !param.city.length || !param.addr.length) {
      return _toast2.default.show('warn', '请完整填写表单数据', 1000);
    }
    if (this.data.isloading) return;
    this.data.isloading = true;
    _index2.default.editAddr(param).then(function (res) {
      _this.data.isloading = false;
      if (res.code === 200) {
        _this.clearAddr();
        _toast2.default.show('success', '添加地址成功！！', 1000);
        if (_this.data.type === 'detail') {
          _this.data.choseobj = res.data || {};
          // 如果选择默认将保存根性全局对象里面userinfo
          if (param.used) {
            getApp().getUserInfo(true);
          }
        }
        setTimeout(function () {
          wx.navigateBack();
        }, 1000);
      } else {
        _toast2.default.show('warn', '添加地址失败！！', 1000);
      }
    });
  },
  clearAddr: function clearAddr() {
    this.data.id = '';
    this.data.goodsman.val = '';
    this.data.phonenum.val = '';
    this.data.region = '';
    this.data.areadetail.val = '';
    this.data.isnow = false;
    this.setData({
      id: this.data.id,
      'goodsman.val': this.data.goodsman.val,
      'phonenum.val': this.data.phonenum.val,
      'area.val': this.data.area.val,
      'areadetail.val': this.data.areadetail.val,
      isnow: this.data.isnow
    });
  },
  delAddr: function delAddr(e) {
    var _this2 = this;

    if (this.data.isloading) return;
    this.data.isloading = true;

    var _util$getData2 = _index4.default.getData(e),
        index = _util$getData2.index;

    var id = this.data.id;
    _index2.default.delAddr({ id: id }).then(function (res) {
      _this2.data.isloading = false;
      if (res.code === 200) {
        _this2.clearAddr();
        _toast2.default.show('success', '地址删除成功！！', 1000);
        setTimeout(function () {
          wx.navigateBack();
        }, 1000);
      } else {
        _toast2.default.show('warn', '地址删除失败！！', 1000);
      }
    });
  }
});