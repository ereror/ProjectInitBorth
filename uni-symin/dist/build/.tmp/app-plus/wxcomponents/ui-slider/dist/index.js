'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _objectToStyle = require('../src/objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

var _sliderBar = require('../src/sliderBar1.js');

var _sliderBar2 = _interopRequireDefault(_sliderBar);

var _sliderBar3 = require('../src/sliderBar2.js');

var _sliderBar4 = _interopRequireDefault(_sliderBar3);

var _sliderBar5 = require('../src/sliderBar.js');

var _sliderBar6 = _interopRequireDefault(_sliderBar5);

var _sliderLine = require('../src/sliderLine.js');

var _sliderLine2 = _interopRequireDefault(_sliderLine);

var _props = require('../src/props.js');

var _props2 = _interopRequireDefault(_props);


function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = Component({
  behaviors: [_sliderBar6.default, _sliderBar2.default, _sliderBar4.default, _sliderLine2.default, _props2.default],
  /**
   * 组件的属性列表
   */

  created: function created() {
    // this.data.max += this.data.step
  },
  attached: function attached() {
    if (this.data.unlimited) {
      this.setData({
        max: this.data.max + this.data.step
      });
    }
    this.data.value;
    this.data.scaleMargin = this.data.scalePosition === 'under' ? this.data.scaleMargin : -this.data.scaleMargin;

    this.data.fixed = this.data.step.toString().split('.')[1];
    if (!this.data.fixed) {
      this.data.fixed = '';
    }
    if (this.data.showValue && !this.data.showMaxValue) {
      this.data.valuePos = 'right';
    }
    this.data.scale;
    if (this.data.showValue && this.data.showMaxValue) {
      this.data.valuePos = 'left';
    }
    if (_typeof(this.properties.value) === 'object') {
      this.data.value[0] = this.data.value[0] < this.data.min ? this.data.min : this.data.value[0];
      this.data.value[1] = this.data.value[1] < this.data.min ? this.data.min : this.data.value[1];
      this.data.value[0] = this.data.value[0] > this.data.max ? this.data.max : this.data.value[0];
      this.data.value[1] = this.data.value[1] > this.data.max ? this.data.max : this.data.value[1];
      this.data.value[0] = this.data.value[0] > this.data.value[1] ? this.data.value[1] : this.data.value[0];
      this.offsetX = this.value2Offset(this.data.value[0]);
      this.offset2X = this.value2Offset(this.data.value[1]);
      this.data.showDoubleBarWrap = true;
      this.data.presentValue = [].concat(_toConsumableArray(this.properties.value));
      // this.data.presentValue[0] = this.properties.valueFormat.cb(this.properties.value[0])
      // console.log(this.data.presentValue[0])
      // console.log(this.data.value, this.data.offsetX, this.data.offser2X);
    } else {
      this.data.value = this.data.value < this.data.min ? this.data.min : this.data.value;
      this.data.value = this.data.value > this.data.max ? this.data.max : this.data.value;
      this.offset2X = this.value2Offset(this.data.value);
      this.data.showDoubleBarWrap = false;
      this.data.persentValue = this.data.value;
    }
    this.setData({
      showDoubleBarWrap: this.data.showDoubleBarWrap,
      minNum: this.data.min
    });
    // let func = new Function('res', 'return res')
    // console.log(func(100))
    // 计算value的位置
    if (this.data.valuePos === '') {
      if (this.data.showMaxValue && this.data.showValue) {
        this.data.valuePos = 'left';
      } else {
        this.data.valuePos = 'right';
      }
    } else {
      this.data.valuePos = this.data.valuePos;
    }
    // 计算对齐值

    if (this.data.showValue && this.data.showMaxValue) {
      this.data.valueAlignLeft = 40;
      this.data.valueAlignWidth = 80;
    } else if (!this.data.showValue && !this.data.showMaxValue) {
      this.data.valueAlignLeft = 20;
      this.data.valueAlignWidth = 40;
    } else {
      if (this.data.valuePos === 'left') {
        this.data.valueAlignLeft = 40;
        this.data.valueAlignWidth = 60;
      } else {
        this.data.valueAlignLeft = 20;
        this.data.valueAlignWidth = 60;
      }
    }
    // value 转 offsetX

    if (this.data.showDoubleBarWrap) {
      this.data.offsetX = this.value2Offset(this.data.value[0]);
      this.data.offset2X = this.value2Offset(this.data.value[1]);
    } else {
      this.data.offset2X = this.value2Offset(this.data.value);
    }
    // 更新页面
    this.setData({
      value: this.data.value,
      offsetX: this.data.offsetX,
      offset2X: this.data.offset2X,
      scaleMargin: this.data.scaleMargin,
      sliderStyle: (0, _objectToStyle2.default)(this.sliderStyleObj()),
      sliderLineTouchStyle: (0, _objectToStyle2.default)(this.sliderLineTouchStyleObj()),
      sliderLineBackgroundStyle: (0, _objectToStyle2.default)(this.sliderLineBackgroundStyleObj()),
      sliderLineStyle: (0, _objectToStyle2.default)(this.sliderLineStyleObj()),
      sliderLineScaleWrapStyle: (0, _objectToStyle2.default)(this.sliderLineScaleWrapStyleObj()),
      sliderBarWrapStyle: (0, _objectToStyle2.default)(this.sliderBarWrapStyleObj()),
      valueStyle: (0, _objectToStyle2.default)(this.valueStyleObj()),
      maxValueStyle: (0, _objectToStyle2.default)(this.maxValueStyleObj()),
      sliderLineDynamicStyle: (0, _objectToStyle2.default)(this.sliderLineDynamicStyleObj()),
      sliderBarStyle: (0, _objectToStyle2.default)(this.sliderBarStyleObj()),
      tooltipStyle: (0, _objectToStyle2.default)(this.tooltipStyleObj()),
      sliderBarWrapDynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrapDynamicStyleObj()),
      sliderBarWrap2DynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrap2DynamicStyleObj()),
      sliderBufferLineStyle: (0, _objectToStyle2.default)(this.sliderBufferLineStyleObj()),
      tooltipCustomStyle: (0, _objectToStyle2.default)(this.data.tooltipStyle),
      thumbCustomStyle: (0, _objectToStyle2.default)(this.data.thumbStyle)
    });
    this.triggerEvent('change', { 'value': this.data.value });
    this.setData({
      valueAlignWidth: this.data.valueAlignWidth
    });
  },
  ready: function ready() {
    var _this = this;

    wx.createSelectorQuery().in(this).select('.slider-line-touch').boundingClientRect(function (res) {
      _this.data.offsetLeft = res.left;
      _this.reMathWrapLeft();

      // console.log(this.data.offsetLeft)
    }).exec();
  },

  /**
   * 组件的初始数据
   */
  data: {
    valuePos: '',
    valueAlignLeft: 0,
    showDoubleBarWrap: false,
    valueAlignWidth: 0,
    valueStyle: '',
    maxValueStyle: '',
    zIndex: 0,
    zIndex2: 0,
    startX: 0,
    offsetX: 0,
    start2X: 0,
    offset2X: 0,
    presentValue: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    reMathWrapLeft: function reMathWrapLeft() {
      var _this2 = this;

      if (this.data.showDoubleBarWrap) {
        wx.createSelectorQuery().in(this).select('.slider-bar-wrap1').boundingClientRect(function (res) {
          _this2.data.wrap1Left = res.left;
        }).exec();
      }

      wx.createSelectorQuery().in(this).select('.slider-bar-wrap2').boundingClientRect(function (res) {
        _this2.data.wrap2Left = res.left;
      }).exec();
    },
    touchStartLineHandler: function touchStartLineHandler(e) {
      this.data.animate = 'all .3s';
      if (this.data.showDoubleBarWrap) {
        console.log(e.touches[0].clientX, this.data.wrap1Left + this.data.thumbSize / 2, this.data.wrap2Left + this.data.thumbSize / 2);
        if (Math.abs(e.touches[0].clientX - this.data.wrap1Left - this.data.thumbSize / 2) < Math.abs(e.touches[0].clientX - this.data.wrap2Left - this.data.thumbSize / 2)) {
          this.data.offsetX = e.touches[0].clientX - this.data.offsetLeft;
          this.data.value[0] = this.offset2Value(this.data.offsetX);
          this.data.offsetX = this.value2Offset(this.data.value[0]);
        } else {
          this.data.offset2X = e.touches[0].clientX - this.data.offsetLeft;
          this.data.value[1] = this.offset2Value(this.data.offset2X);
          this.data.offset2X = this.value2Offset(this.data.value[1]);
        }
        this.data.value = [parseInt(this.offset2Value(this.data.offsetX)), parseInt(this.offset2Value(this.data.offset2X))];
      } else {
        this.data.offset2X = e.touches[0].clientX - this.data.offsetLeft;
        this.data.value = this.offset2Value(this.data.offset2X);
        this.data.value = this.data.min + Math.round((this.data.value - this.data.min) / this.data.step) * this.data.step;
        this.data.offset2X = Number(this.data.value - this.data.min) / (this.data.max - this.data.min) * (this.data.width - this.data.valueAlignWidth);
        this.data.value = Number(this.offset2Value(this.data.offset2X).toFixed(this.data.fixed.length));
      }
      this.setData({
        offset2X: this.data.offset2X,
        offsetX: this.data.offsetX,
        value: this.data.value,
        sliderBarAnimateStyle: (0, _objectToStyle2.default)(this.sliderBarAnimateStyleObj()),
        sliderBarWrapStyle: (0, _objectToStyle2.default)(this.sliderBarWrapStyleObj()),
        sliderBarWrapDynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrapDynamicStyleObj()),
        sliderBarWrap2DynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrap2DynamicStyleObj()),
        sliderLineDynamicStyle: (0, _objectToStyle2.default)(this.sliderLineDynamicStyleObj()),
        thumbDownCustomStyle: ''
      });
      this.emitValue();
    },
    value2Offset: function value2Offset(value) {
      return Number(value - this.data.min) / (this.data.max - this.data.min) * (this.data.width - this.data.valueAlignWidth);
    },
    offset2Value: function offset2Value(offset) {
      return offset / (this.data.width - this.data.valueAlignWidth) * (this.data.max - this.data.min) + this.data.min;
    },
    touchStartHandler: function touchStartHandler(e) {
      this.data.startX = e.touches[0].clientX - this.data.offsetX;
      this.data.zIndex = 1;
      this.data.zIndex2 = 0;
      this.data.animate = '';
      this.data.firstIn = true;
      this.setData({
        sliderBarWrapDynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrapDynamicStyleObj()),
        sliderBarWrap2DynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrap2DynamicStyleObj()),
        sliderBarAnimateStyle: (0, _objectToStyle2.default)(this.sliderBarAnimateStyleObj())
      });
    },
    touchMoveHandler: function touchMoveHandler(e) {
      if (this.data.firstIn) {
        this.data.firstIn = false;
        this.setData({
          thumbDownCustomStyle: (0, _objectToStyle2.default)(this.data.thumbDownStyle)
        });
      }
      // 判断offsetX的距离
      this.data.offsetX = e.touches[0].clientX - this.data.startX;
      if (this.data.offsetX > this.data.offset2X) {
        this.data.offsetX = this.data.offset2X;
      } else if (this.data.offsetX < 0) {
        this.data.offsetX = 0;
      } else if (this.data.offsetX > this.data.width - this.data.valueAlignWidth) {
        this.data.offsetX = this.data.width - this.data.valueAlignWidth;
      }
      // 赋值data并更新
      if (this.data.showDoubleBarWrap) {
        this.data.value = [Number(this.offset2Value(this.data.offsetX).toFixed(this.data.fixed.length)), Number(this.offset2Value(this.data.offset2X).toFixed(this.data.fixed.length))];
      } else {
        this.data.value = Number(this.offset2Value(this.data.offsetX).toFixed(this.data.fixed.length));
      }
      this.setData({
        value: this.data.value,
        sliderBarWrapDynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrapDynamicStyleObj()),
        sliderBarWrapStyle: (0, _objectToStyle2.default)(this.sliderBarWrapStyleObj()),
        sliderLineDynamicStyle: (0, _objectToStyle2.default)(this.sliderLineDynamicStyleObj())
      });
      // this.triggerEvent('change', { 'value': this.data.value})
      this.emitValue();
    },
    touchEndHandler: function touchEndHandler(e) {
      this.data.animate = 'all 0.3s';
      if (this.data.fixed) {
        this.data.value[0] = Number(this.data.value[0].toFixed(this.data.fixed.length));
      } else {
        this.data.value[0] = this.data.min + Math.round((this.data.value[0] - this.data.min) / this.data.step) * this.data.step;
      }

      this.data.offsetX = this.value2Offset(this.data.value[0]);
      this.data.animate = 'all 0.3s';
      this.setData({
        thumbDownCustomStyle: '',
        offsetX: this.data.offsetX,
        value: this.data.value,
        sliderBarAnimateStyle: (0, _objectToStyle2.default)(this.sliderBarAnimateStyleObj()),
        sliderBarWrapStyle: (0, _objectToStyle2.default)(this.sliderBarWrapStyleObj()),
        sliderBarWrapDynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrapDynamicStyleObj()),
        sliderLineDynamicStyle: (0, _objectToStyle2.default)(this.sliderLineDynamicStyleObj())
      });
      this.reMathWrapLeft();

      // if(this.data.value)
      this.emitValue();

      // this.triggerEvent('change', { 'value': this.data.value })
    },
    touchEnd2Handler: function touchEnd2Handler(e) {
      this.data.animate = 'all 0.3s';
      if (this.data.showDoubleBarWrap) {
        if (this.data.fixed) {
          this.data.value[1] = Number(this.data.value[1].toFixed(this.data.fixed.length));
        } else {
          this.data.value[1] = this.data.min + Math.round((this.data.value[1] - this.data.min) / this.data.step) * this.data.step;
        }
        this.data.offset2X = this.value2Offset(this.data.value[1]);
      } else {
        if (this.data.fixed) {
          this.data.value = Number(this.data.value.toFixed(this.data.fixed.length));
        } else {
          this.data.value = Number(this.data.min) + Math.round((this.data.value - this.data.min) / this.data.step) * this.data.step;
        }
        this.data.offset2X = this.value2Offset(this.data.value);
      }
      this.setData({
        offset2X: this.data.offset2X,
        value: this.data.value,
        sliderBarAnimateStyle: (0, _objectToStyle2.default)(this.sliderBarAnimateStyleObj()),
        sliderBarWrap2DynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrap2DynamicStyleObj()),
        sliderLineDynamicStyle: (0, _objectToStyle2.default)(this.sliderLineDynamicStyleObj()),
        thumbDownCustomStyle: ''
      });
      this.reMathWrapLeft();
      this.emitValue();
      // this.triggerEvent('change', { 'value': this.data.value })
    },
    touchStart2Handler: function touchStart2Handler(e) {
      this.data.start2X = e.touches[0].clientX - this.data.offset2X;
      this.data.zIndex = 0;
      this.data.zIndex2 = 1;
      this.data.animate = '';
      this.data.firstIn = true;
      this.setData({
        sliderBarWrapDynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrapDynamicStyleObj()),
        sliderBarWrap2DynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrap2DynamicStyleObj()),
        sliderBarAnimateStyle: (0, _objectToStyle2.default)(this.sliderBarAnimateStyleObj())
      });
    },
    touchMove2Handler: function touchMove2Handler(e) {
      if (this.data.firstIn) {
        this.data.firstIn = false;
        this.setData({
          thumbDownCustomStyle: (0, _objectToStyle2.default)(this.data.thumbDownStyle)
        });
      }
      // 判断offsetX的距离
      this.data.offset2X = e.touches[0].clientX - this.data.start2X;
      if (this.data.offset2X < this.data.offsetX) {
        this.data.offset2X = this.data.offsetX;
      } else if (this.data.offset2X > this.data.width - this.data.valueAlignWidth) {
        this.data.offset2X = this.data.width - this.data.valueAlignWidth;
      } else if (this.data.offset2X < 0) {
        this.data.offset2X = 0;
      }

      if (this.data.showDoubleBarWrap) {
        this.data.value = [Number(this.offset2Value(this.data.offsetX).toFixed(this.data.fixed.length)), Number(this.offset2Value(this.data.offset2X).toFixed(this.data.fixed.length))];
      } else {
        this.data.value = Number(this.offset2Value(this.data.offset2X).toFixed(this.data.fixed.length));
      }
      this.setData({
        value: this.data.value,
        sliderBarWrapStyle: (0, _objectToStyle2.default)(this.sliderBarWrapStyleObj()),
        sliderBarWrap2DynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrap2DynamicStyleObj()),
        sliderLineDynamicStyle: (0, _objectToStyle2.default)(this.sliderLineDynamicStyleObj())
      });

      this.emitValue();
    },
    emitValue: function emitValue() {
      if (this.data.unlimited) {
        var value = void 0;
        if (this.data.showDoubleBarWrap) {
          value = [].concat(_toConsumableArray(this.data.value));
          value[0] = value[0] > this.data.max - this.data.step ? 'unlimited' : value[0];
          value[1] = value[1] > this.data.max - this.data.step ? 'unlimited' : value[1];
        } else {
          value = this.data.value;
          value = value > this.data.max - this.data.step ? 'unlimited' : value;
        }
        this.triggerEvent('change', { 'value': value });
      } else {
        this.triggerEvent('change', { 'value': this.data.value });
      }
    },
    sliderStyleObj: function sliderStyleObj() {
      var style = {};
      style.left = 0;
      style.width = this.data.width + 'rpx';
      style.height = this.data.height + 'rpx';
      return style;
    },
    valueStyleObj: function valueStyleObj() {
      var style = {};
      if (this.data.valuePos === 'left') {
        style.left = '6px';
      } else {
        style.right = '6px';
      }
      return style;
    },
    tooltipStyleObj: function tooltipStyleObj() {
      var style = {};
      style.color = this.data.activeColor;
      return style;
    },
    maxValueStyleObj: function maxValueStyleObj() {
      var style = {};
      if (this.data.valuePos === 'left') {
        style.right = '6px';
      } else {
        style.left = '6px';
      }
      return style;
    }
  }
});