'use strict';

var _objectToStyle = require('./objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

module.exports = Behavior({
  properties: {
    showValue: {
      type: Boolean,
      value: false
    },
    value: {
      type: [Number, Array],
      value: 0,
      observer: function observer(val) {
        var _setData;

        console.log(val);
        if (this.data.showDoubleBarWrap) {
          this.data.offsetX = Number(this.data.value[0] - this.data.min) / (this.data.max - this.data.min) * (this.data.width - this.data.valueAlignWidth);
          this.data.offset2X = Number(this.data.value[1] - this.data.min) / (this.data.max - this.data.min) * (this.data.width - this.data.valueAlignWidth);
        } else {
          this.data.offset2X = Number(this.data.value - this.data.min) / (this.data.max - this.data.min) * (this.data.width - this.data.valueAlignWidth);
        }

        this.setData((_setData = {
          offset2X: this.data.offset2X,
          offsetX: this.data.offsetX,
          value: val,
          sliderBarAnimateStyle: (0, _objectToStyle2.default)(this.sliderBarAnimateStyleObj()),
          sliderBarWrapStyle: (0, _objectToStyle2.default)(this.sliderBarWrapStyleObj()),
          sliderBarWrapDynamicStyle: (0, _objectToStyle2.default)(this.sliderBarWrapDynamicStyleObj()),
          sliderLineDynamicStyle: (0, _objectToStyle2.default)(this.sliderLineDynamicStyleObj())
        }, _defineProperty(_setData, 'sliderBarAnimateStyle', (0, _objectToStyle2.default)(this.sliderBarAnimateStyleObj())), _defineProperty(_setData, 'sliderBarWrap2DynamicStyle', (0, _objectToStyle2.default)(this.sliderBarWrap2DynamicStyleObj())), _defineProperty(_setData, 'sliderLineDynamicStyle', (0, _objectToStyle2.default)(this.sliderLineDynamicStyleObj())), _defineProperty(_setData, 'thumbDownCustomStyle', ''), _setData));
      }
    },
    showMaxValue: {
      type: Boolean,
      value: false
    },
    valuePos: {
      type: String,
      value: 'right'
    },
    sliderWeight: {
      type: Number,
      value: 2
    },
    backgroundColor: {
      type: String,
      value: '#CCC'
    },
    barBorderRadius: {
      type: Number,
      value: 1
    },
    thumbSize: {
      type: Number,
      value: 40
    },
    showTooltip: {
      type: Boolean,
      value: false
    },
    activeColor: {
      type: String
    },
    height: {
      type: Number,
      value: 70
    },
    width: {
      type: Number,
      value: 260
    },
    min: {
      type: Number,
      value: 0
    },
    max: {
      type: Number,
      value: 100
    },
    step: {
      type: Number,
      value: 1
    },
    keyScaleLine: {
      type: Number,
      value: 0
    },
    scaleLine: {
      type: Number,
      value: 0
    },
    thumbStyle: {
      type: Object,
      value: {}
    },
    thumbDownStyle: {
      type: Object,
      value: {}
    },
    tooltipStyle: {
      type: Object,
      value: {}
    },
    scalePosition: {
      type: String,
      value: 'under'
    },
    scaleMargin: {
      type: Number,
      value: 0
    },
    unlimited: {
      type: Boolean,
      value: false
    },
    bufferValue: {
      type: Number,
      value: 0,
      observer: function observer(val) {
        if (val > this.data.max) {
          val = this.data.max;
        }
        this.data.bufferValue = val;
        this.setData({
          sliderBufferLineStyle: (0, _objectToStyle2.default)(this.sliderBufferLineStyleObj())
        });
      }
    },
    bufferColor: {
      type: String,
      value: 'green'
    }
  }
});