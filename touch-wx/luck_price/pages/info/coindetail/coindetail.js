'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../api/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../static/utils/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = Page({
  data: {
    ademptyImg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/adempty2.jpg',
    home_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/bg_home_02.png',
    img_bg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon_nomsg.png',
    hb_list: [],
    dong: [],
    query: {
      pool_id: '',
      page: 1,
      pageSize: 10,
      current_page: 1,
      last_page: 1
    },
    isloaded: false
  },
  onShow: function onShow() {
    this.getMoneyChgList();
  },
  checkMore: function checkMore() {
    var that = this;
    var _data$query = this.data.query,
        current_page = _data$query.current_page,
        last_page = _data$query.last_page;

    if (current_page !== last_page) {
      this.data.query.page = current_page + 1;
      this.getMoneyChgList();
    }
  },
  onReachBottom: function onReachBottom() {
    this.checkMore();
  },
  getMoneyChgList: function getMoneyChgList() {
    var _this = this;

    this.data.isloaded = false;
    _index4.default.showLoading('加载中...');
    _index2.default.getMoneyChgList().then(function (res) {
      _index4.default.hideAll();
      _this.data.isloaded = true;
      if (res.code === 200) {
        console.log(res);
        var newData = res.data.data;
        newData.map(function (v) {
          v.opttime = _index4.default.formatTime(v.addtime * 1000, 'YY-M-D h:m:s');
        });
        _this.data.hb_list = [].concat(_toConsumableArray(_this.data.hb_list), _toConsumableArray(res.data.data));
        _this.data.query.last_page = res.data.last_page;
        _this.data.query.current_page = _this.data.query.page;
        _this.setData({
          hb_list: _this.data.hb_list,
          isloaded: _this.data.isloaded
        });
      }
    });
  }
});