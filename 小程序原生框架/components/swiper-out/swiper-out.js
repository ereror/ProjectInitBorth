'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectToStyle = require('../../libs/objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var onSTATE = Symbol('on');
var offSTATE = Symbol('off');
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  ready: function ready() {
    this.data.selfValue = this.getSymbolFromState(this.properties.value);
    this.updateOffset(this.data.selfValue);
    this.setData({
      operateStyle: (0, _objectToStyle2.default)(this.operateStyleObj())
    });
  },
  properties: {
    operateWidth: {
      type: Number,
      value: 160
    },
    value: {
      type: String,
      value: 'off',
      observer: function observer(val) {
        console.log(val);
        this.data.selfValue = this.getSymbolFromState(val);
        this.updateOffset(this.data.selfValue);
      }
    },
    canSwipe: {
      type: Boolean,
      value: true
    },
    height: {
      type: Number,
      value: 50,
      observer: function observer(val) {
        this.setData({
          height: val
        });
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    state: null,
    startX: 0,
    startY: 0,
    offsetX: 0,
    tScript: 'transform .2s',
    selfValue: offSTATE,
    active: true,
    radio: 0,
    canChange: true
  },

  /**
   * 组件的方法列表
   */

  methods: {
    operateStyleObj: function operateStyleObj() {
      var style = {};
      style.width = this.data.operateWidth + 'rpx';
      return style;
    },
    on: function on() {
      this.data.selfValue = this.getSymbolFromState('on');
      this.updateOffset(this.data.selfValue);
    },
    off: function off() {
      this.data.selfValue = this.getSymbolFromState('off');
      this.updateOffset(this.data.selfValue);
    },
    touchStartHandler: function touchStartHandler(e) {

      // this.data.offsetX = e
      if (!this.data.active) {
        return;
      }
      this.setData({
        startX: e.touches[0].pageX - this.data.offsetX,
        fingerStartX: e.touches[0].pageX,
        fingerStartY: e.touches[0].pageY
      });
      this.setData({
        tScript: ''
      });
    },
    touchMoveHandler: function touchMoveHandler(e) {
      if (!this.data.canChange) {
        return;
      }
      if (Math.abs(this.data.fingerStartY - e.touches[0].pageY) / Math.abs(this.data.fingerStartX - e.touches[0].pageX) > 1) {
        console.log('????');
        this.data.canChange = false;
      }
      if (!this.data.active) {
        return;
      }
      console.log(123123);
      var offsetX = e.touches[0].pageX - this.data.startX;
      if (offsetX < -this.data.operateWidth) {
        this.setData({
          offsetX: -this.data.operateWidth
        });
      } else if (offsetX > -20) {
        this.setData({
          offsetX: 0
        });
      } else {
        this.setData({
          offsetX: e.touches[0].pageX - this.data.startX
        });
      }
    },
    bounceAnimate: function bounceAnimate() {
      var _this = this;

      this.data.active = false;
      this.setData({
        offsetX: 10
      });
      setTimeout(function () {
        _this.setData({
          offsetX: -10
        });
      }, 200);
      setTimeout(function () {
        _this.setData({
          offsetX: 0
        });
        _this.data.active = true;
      }, 400);
    },
    getStateFromSymbol: function getStateFromSymbol(sbl) {
      return sbl.toString().split('(')[1].split(')')[0];
    },
    getSymbolFromState: function getSymbolFromState(str) {
      return str === 'on' ? onSTATE : offSTATE;
    },
    updateOffset: function updateOffset(sbl) {
      this.setData({
        offsetX: this.getStateFromSymbol(sbl) === 'on' ? -this.data.operateWidth : 0
      });
    },
    touchEndHandler: function touchEndHandler(e) {
      if (!this.data.canChange) {
        this.data.canChange = true;
        return;
      }
      if (!this.data.active) {
        return;
      }
      this.setData({
        tScript: 'transform .2s'
      });
      if (e.changedTouches[0].pageX - this.data.startX > 0) {
        if (this.data.selfValue === onSTATE) {
          this.data.selfValue = offSTATE;
        } else {
          this.bounceAnimate();
          return;
        }
      } else if (Math.abs(e.changedTouches[0].pageX - this.data.startX) < 10) {
        this.updateOffset(this.data.selfValue);
      } else {
        if (this.data.selfValue === onSTATE) {
          this.data.selfValue = offSTATE;
        } else {
          this.data.selfValue = onSTATE;
        }
        this.updateOffset(this.data.selfValue);
      }
      this.triggerEvent('change', this.getStateFromSymbol(this.data.selfValue));
    }
  }
})
