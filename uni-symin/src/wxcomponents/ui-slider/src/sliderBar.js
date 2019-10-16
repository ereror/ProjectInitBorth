'use strict';

var _objectToStyle = require('./objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = Behavior({

  data: {},
  methods: {
    sliderBarAnimateStyleObj: function sliderBarAnimateStyleObj() {
      var style = {};
      style['transition'] = this.data.animate;
      return style;
    },
    sliderBarWrapStyleObj: function sliderBarWrapStyleObj() {
      var style = {};
      style.top = this.data.height / 2 - this.data.thumbSize / 2 + 'rpx';
      style.left = this.data.valueAlignLeft - this.data.thumbSize / 2 + 'rpx';
      return style;
    },
    sliderBarStyleObj: function sliderBarStyleObj() {
      var style = {};
      style.height = this.data.thumbSize + 'rpx';
      style.width = this.data.thumbSize + 'rpx';
      return style;
    }
  }
});