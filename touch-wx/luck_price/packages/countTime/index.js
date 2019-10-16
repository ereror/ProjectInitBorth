'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectToStyle = require('../../static/libs/objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Component({
  properties: {
    target: Number,
    showDay: Boolean,
    callback: String,
    format: Array,
    clearTimer: Boolean,
    endDesc: String,
    splitStyle: {
      type: [String, Object],
      value: '',
      observer: function observer(val) {
        this.setData({
          selfSplitStyle: (0, _objectToStyle2.default)(val)
        });
      }
    },
    numberStyle: {
      type: [String, Object],
      value: '',
      observer: function observer(val) {
        this.setData({
          selfNumberStyle: (0, _objectToStyle2.default)(val)
        });
        console.log((0, _objectToStyle2.default)(val));
      }
    }
  },
  data: {
    time: '',
    timeArr: [],
    resultFormat: [],
    changeFormat: false,
    selfSplitStyle: '',
    selfNumberStyle: ''
  },
  attached: function attached() {
    this.setData({
      selfSplitStyle: (0, _objectToStyle2.default)(this.data.splitStyle),
      selfNumberStyle: (0, _objectToStyle2.default)(this.data.numberStyle)
    });
  },
  ready: function ready() {
    this.getFormat();
  },

  methods: {
    getFormat: function getFormat() {
      var data = this.data;
      var len = data.format.length;
      if (!data.showDay) data.resultFormat.push('');
      if (len >= 3) {
        for (var i = 0; i < len; i++) {
          if (data.resultFormat.length >= 4) break;
          if (data.format[i]) {
            data.resultFormat.push(data.format[i].toString());
          }
        }
        if (data.resultFormat.length >= 4) data.changeFormat = true;
      }
      this.setData({
        resultFormat: data.resultFormat
      });
      this.getLastTime();
    },
    init: function init() {
      var self = this;
      setTimeout(function () {
        self.getLastTime.call(self);
      }, 1000);
    },
    getLastTime: function getLastTime() {
      var data = this.data;
      var gapTime = Math.ceil((data.target - new Date().getTime()) / 1000);
      var result = '';
      var time = '00:00:00';
      var timeArr = [];
      var day = '00';
      var format = data.resultFormat;
      if (gapTime > 0) {
        day = this.formatNum(parseInt(gapTime / 86400));
        var lastTime = gapTime % 86400;
        var hour = this.formatNum(parseInt(lastTime / 3600));
        lastTime = lastTime % 3600;
        var minute = this.formatNum(parseInt(lastTime / 60));
        var second = this.formatNum(lastTime % 60);

        if (data.changeFormat) time = '' + hour + format[1] + minute + format[2] + second + format[3];else time = hour + ':' + minute + ':' + second;
        timeArr = [hour, ':', minute, ':', second];
        if (!data.clearTimer) this.init.call(this);
      } else {
        this.endfn();
      }
      if (data.showDay) {
        if (data.changeFormat) {
          result = '' + day + format[0] + ' ' + time;
        } else {
          result = day + 'd ' + time;
        }
      } else {
        result = time;
      }
      this.setData({
        time: result,
        timeArr: timeArr
      });
    },
    formatNum: function formatNum(num) {
      return num > 9 ? num : '0' + num;
    },
    endfn: function endfn() {
      this.setData({
        time: this.data.endDesc || '已结束'
      });
      this.triggerEvent('callback', {});
    }
  }
});