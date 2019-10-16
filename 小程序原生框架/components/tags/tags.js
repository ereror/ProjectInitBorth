'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StyleHelper = require('../../libs/StyleHelper.js');

var _StyleHelper2 = _interopRequireDefault(_StyleHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Component({
  behaviors: [],
  properties: {
    data: {
      type: Array
    },
    fixedWidth: {
      type: Boolean
    },
    fixedMaxTextLength: {
      type: Number | String,
      value: 5
    },
    itemSpace: {
      type: Number | String,
      value: 10
    },
    mode: {
      type: String,
      value: 'single'
    },
    iconPosition: {
      type: String,
      value: 'left'
    },
    iconSize: {
      type: Number | String,
      value: 14
    },
    iconClass: {
      type: String,
      value: 'ui-tag-icon'
    },
    selectValue: {
      type: Array | Number | Object
    },
    minWidth: {
      type: Number | String
    },
    colNumber: {
      type: Number | String
    },
    width: {
      type: Number | String
    },
    itemWidth: {
      type: Number | String
    }
  },
  ready: function ready() {
    var _this = this;

    var query = wx.createSelectorQuery().in(this);
    query.select('.ui-tags').boundingClientRect(function (res) {
      var count = _this.getFixedColumnCount();
      _this.setData({
        containerWidth: res.width,
        fixedColumnCount: count
      });

      _this.init();
    }).exec();
  },

  data: {
    fixedColumnCount: 0,
    containerWidth: 0,
    itemStyle: {}
  },
  methods: {
    init: function init() {
      var style = {};

      if (this.data.fixedWidth) {
        var avaWidth = this.data.containerWidth - this.data.itemSpace * (this.data.fixedColumnCount + 1);

        if (this.data.itemWidth) {
          style.width = this.data.itemWidth + 'px';
        } else {
          style.width = avaWidth / this.data.fixedColumnCount + 'px';
        }
        style.marginRight = this.data.itemSpace + 'px';
        style.marginLeft = 0;
      }

      var plainStyle = _StyleHelper2.default.getPlainStyle(style);

      this.setData({
        itemStyle: plainStyle
      });
    },
    getFixedColumnCount: function getFixedColumnCount() {
      if (this.data.colNumber) {
        return Number(this.data.colNumber);
      }
      return this.data.containerWidth > 360 ? 3 : 4;
    },
    handleItemTap: function handleItemTap(e) {
      var index = e.currentTarget.dataset.index;
      var city = e.currentTarget.dataset.city;
      this.triggerEvent('change', { index: index, city: city });
    }
  }
});