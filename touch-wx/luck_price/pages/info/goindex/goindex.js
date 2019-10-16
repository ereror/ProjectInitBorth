'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../static/utils/index.js');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    goindex: 'https://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/goindexbg2.jpg'
  },
  goUrl: function goUrl(e) {
    _index2.default.goUrl(e);
  }
});