'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../api/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../static/utils/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();
exports.default = Page({
  data: {
    ademptyImg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/adempty2.jpg',
    ad_img_01: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_01.png',
    ad_img_02: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_02.png',
    query: {
      pool_id: '',
      page: 1,
      pageSize: 84,
      current_page: 1,
      last_page: 1
    },
    total: 0,
    imgData: []
  },
  onLoad: function onLoad(param) {
    this.data.query.pool_id = param.id || '';
  },
  onShow: function onShow() {
    if (this.data.query.pool_id) {
      this.getUsers();
    }
  },
  checkMore: function checkMore() {
    var that = this;
    var _data$query = this.data.query,
        current_page = _data$query.current_page,
        last_page = _data$query.last_page;

    if (current_page !== last_page) {
      this.data.query.page = current_page + 1;
      this.getUsers();
    }
  },
  getUsers: function getUsers() {
    var _this = this;

    var query = this.data.query;
    if (!query.pool_id) return;
    _index4.default.showLoading();
    _index2.default.getHeaderList(query).then(function (res) {
      if (res.code === 200) {
        _index4.default.hideAll();
        _this.data.imgData = _this.data.imgData.concat(res.data.data);
        _this.data.query.last_page = res.data.last_page;
        _this.data.query.current_page = _this.data.query.page;
        _this.data.total = res.data.total;
        if (_this.data.imgData.length) {
          _this.setData({
            imgData: _this.data.imgData,
            total: _this.data.total,
            query: _this.data.query
          });
        }
      }
    });
  }
});