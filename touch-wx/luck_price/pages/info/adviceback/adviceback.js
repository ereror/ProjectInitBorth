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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = Page({
  data: {
    img: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/prize_lost.png',
    imgbtn: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/upload_img.png',
    advice: {
      title: '',
      placeholder: '请填写您的建议与反馈...',
      size: 100,
      inputval: '',
      iptclass: 'textHt'
    },
    imgList: []
  },
  setParam: function setParam(e) {
    var val = e.detail.value;
    this.data.advice.inputval = val;
    this.setData({
      'advice.inputval': this.data.advice.inputval
    });
  },
  delimg: function delimg(e) {
    var _util$getData = _index2.default.getData(e),
        index = _util$getData.index;

    this.data.imgList.splice(index, 1);
    this.setData({
      imgList: this.data.imgList
    });
  },

  chooseImage: function chooseImage(e) {
    var that = this;

    var _util$getData2 = _index2.default.getData(e),
        size = _util$getData2.size;

    var imageList = this.data.imgList || [];
    wx.chooseImage({
      count: size - imageList.length,
      sourceType: ['album', 'camera'],
      success: function success(res) {
        var tempFiles = res.tempFiles;
        //定义图片id数组
        var imageIdList = [];
        // 格式化图片参数
        var send = [];

        var _loop = function _loop(i) {
          temp = new Promise(function (resolve, reject) {
            _index4.default.upload({
              filePath: tempFiles[i].path
            }).then(function (d) {
              if (d.code === 1) resolve(d);else {
                reject(i + 1);
              }
            });
          });

          send.push(temp);
        };

        for (var i = 0; i < tempFiles.length; i++) {
          var temp;

          _loop(i);
        }
        _index2.default.showLoading('上传中');
        Promise.all(send).then(function (res) {
          _toast2.default.show('success', "上传成功", 1000);
          for (var j = 0, len = res.length; j < len; j++) {
            var data = res[j].data;
            tempFiles[j].id = data.id;
            tempFiles[j].path = data.url;
          }
          imageList = [].concat(_toConsumableArray(imageList), _toConsumableArray(tempFiles));
          that.setData({
            imgList: imageList
          });
          console.log(imageList);
          _index2.default.hideAll();
        }).catch(function (res) {
          if (tempFiles.length == 1) {
            _toast2.default.show('warn', "图片上传失败", 1000);
          } else {
            var result = res.join(',');
            _toast2.default.show('warn', '第' + result + '张图片上传失败', 1000);
          }
          _index2.default.hideAll();
        });
      }
    });
  },
  saveAdvice: _index2.default.throttle(function saveAdvice() {
    if (!this.data.advice.inputval.length) return _toast2.default.show('warn', '请填写输入反馈意见内容！', 1000);
    var param = {
      message: this.data.advice.inputval,
      images: JSON.stringify(this.data.imgList)
    };
    _index2.default.showLoading('正在提交');
    _index4.default.addAdvise(param).then(function (res) {
      _index2.default.hideAll();
      if (res.code === 200) {
        _toast2.default.show('warn', '感谢你的建议！\n谢谢！\n我们会尽快处理！', 1000);
        setTimeout(function () {
          wx.navigateBack();
        }, 1000);
      }
    });
  }, 1500)
});