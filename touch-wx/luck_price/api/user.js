'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _req = require('../static/utils/req.js');

exports.default = {
  usermessage: {
    name: 'zhangsan'
  },
  getUserinfo: function getUserinfo(param) {
    return _req.req.post("/mobile/Member/UserInfo", param);
  },
  save: function save(param) {
    return _req.req.post("/mobile/Member/save", param);
  }
};