'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadFile = exports.req = exports.fly = undefined;

var _index = require('./index.js');

var _index2 = _interopRequireDefault(_index);

var _config = require('../../config.js');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Fly = require("../libs/wx.js"); //wx.js为您下载的源码文件
var fly = new Fly(); //创建fly实例
var tokenFly = new Fly();

//添加finally方法
Promise.prototype.finally = function (callback) {
  var P = this.constructor;
  return this.then(function (value) {
    return P.resolve(callback()).then(function () {
      return value;
    });
  }, function (reason) {
    return P.resolve(callback()).then(function () {
      throw reason;
    });
  });
};

//设置超时

fly.config.timeout = 10000;
//设置请求基地址

tokenFly.config.baseURL = _config2.default.baseURL;
fly.config.baseURL = _config2.default.baseURL + _config2.default.miniAppName;
//给所有请求添加自定义header

fly.config.headers = tokenFly.config.headers = {
  "content-type": "application/x-www-form-urlencoded"

  //添加请求拦截器
};fly.interceptors.request.use(function (request) {
  var token = wx.getStorageSync('token');
  request.headers["token"] = token;
});

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(function (response) {
  _index2.default.hideAll();
  //只将请求结果的data字段返回
  if (response.data.code == 200) {
    return response.data;
  } else {
    _index2.default.showFail(response.data.msg);
    return response.data;
  }
}, function (err) {
  //发生网络错误后会走到这里
  _index2.default.hideAll();
  var status = err.status;
  switch (status) {
    case 401:
      console.log("token过期，授权失败");
      fly.lock();
      return new Promise(function (resove, reject) {
        //登陆
        wx.login({
          success: function success(res) {
            var code = res.code;
            if (code) {
              //发起网络请求
              resove(code);
            } else {
              reject(0);
            }
          },
          fail: function fail() {
            reject(0);
          }
        });
      }).then(function (code) {
        return tokenFly.post(_config2.default.TokenURL, {
          code: code
        });
      }).then(function (d) {
        var _d$data$data = d.data.data,
            uid = _d$data$data.uid,
            token = _d$data$data.token;

        err.request.headers["token"] = token;
        wx.setStorageSync("token", token); //保存token
        wx.setStorageSync("uid", uid); //保存uid
      }).finally(function () {
        fly.unlock(); //解锁后，会继续发起请求队列中的任务，详情见后面文档
      }).then(function () {
        return fly.request(err.request); //只有最终返回request对象时，原来的请求才会继续
      });
      break;
    default:
      {
        _index2.default.showModal({
          content: '请求网络出了问题,请稍后再试~~'
        });
        return new Promise(function (resove, reject) {
          reject({
            errormsg: true
          });
        });
      }
  }
});
var uploadFile = function uploadFile(url) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$name = _ref.name,
      name = _ref$name === undefined ? "file" : _ref$name,
      filePath = _ref.filePath,
      _ref$formData = _ref.formData,
      formData = _ref$formData === undefined ? {} : _ref$formData;

  url = _config2.default.baseURL + url;
  var token = wx.getStorageSync('token');
  return new Promise(function (resove, reject) {
    wx.uploadFile({
      url: url,
      filePath: filePath,
      name: name,
      header: {
        token: token
      },
      formData: formData,
      success: function success(res) {
        if (res.statusCode == 200) {
          var data = JSON.parse(res.data);
          if (data.code == 200) {
            resove(data.data);
          } else {
            resove({
              code: 0
            });
            _index2.default.showModal({
              content: "上传失败"
            });
          }
        } else {
          reject({
            code: 1
          });
          _index2.default.showModal({
            content: "上传失败"
          });
        }
      },
      fail: function fail(res) {
        reject({
          code: 1
        });
        _index2.default.showModal({
          content: "上传失败"
        });
        wx.hideLoading();
      },
      complete: function complete(res) {}
    });
  });
};
//统一处理报错时，不再往下执行
var req = {
  post: function post(url, param) {
    return new Promise(function (resove, reject) {
      fly.post(url, param).then(function (d) {
        if (d) resove(d);
      });
    });
  },
  get: function get(url, param) {
    return new Promise(function (resove, reject) {
      fly.get(url, param).then(function (d) {
        if (d) resove(d);
      });
    });
  }
};
exports.fly = fly;
exports.req = req;
exports.uploadFile = uploadFile;