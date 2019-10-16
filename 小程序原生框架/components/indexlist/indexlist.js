'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectToStyle = require('../../libs/objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

var _props = require('./props.js');

var _props2 = _interopRequireDefault(_props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Component({
  behaviors: [_props2.default],
  data: {
    windowHeight: 0,
    scrollTop: 0,
    bigIndex: '',
    blockOpacity: 0,
    indexData: []
  },
  attached: function attached() {

    this.updateAttached();
    // this.data.data.splice(0, 0, {index: 'Top', items: [{name: 'ans'}]})
  },
  ready: function ready() {
    this.updateReady();
    this.setData({
      scrollTop: 0,
      data: this.data.data
    });
  },


  methods: {
    updateAttached: function updateAttached() {
      var _this = this;

      this.data.indexData.splice(0, this.data.indexData.length);
      this.data.data.forEach(function (element) {
        _this.data.indexData.push(element.index);
      });
      if (this.data.showTop) {
        this.data.indexData.splice(0, 0, 'Top');
      }
      this.setData({
        indexData: this.data.indexData
      });
      try {
        var res = wx.getSystemInfoSync();
        this.data.windowHeight = res.windowHeight;
        this.data.windowWidth = res.windowWidth;
      } catch (e) { }
    },
    updateReady: function updateReady() {
      var _this2 = this;

      if (!this.data.flag) {
        this.data.flag = 1;
        return;
      }
      wx.createSelectorQuery().in(this).select('.index-list-top').boundingClientRect(function (res) {
        _this2.data.indexListTopPosition = res.height;
        // console.log(this.data.indexListTopPosition)
        var posY = _this2.data.indexListTopPosition;
        for (var i = 0; i < _this2.data.data.length; i++) {
          _this2.data.data[i].position = posY;
          posY += 24 + 55 * _this2.data.data[i].items.length;
        }
        _this2.setData({
          indexSelectorWrapStyle: (0, _objectToStyle2.default)(_this2.indexSelectorWrapStyleObj()),
          indexListStyle: (0, _objectToStyle2.default)(_this2.indexListStyleObj()),
          indexFloatBlockStyle: (0, _objectToStyle2.default)(_this2.indexFloatBlockStyleObj())
        });
      }).exec();
    },
    indexFloatBlockDynamicStyleObj: function indexFloatBlockDynamicStyleObj() {
      var style = {};
      style.opacity = this.data.blockOpacity;
      return style;
    },
    indexFloatBlockStyleObj: function indexFloatBlockStyleObj() {
      var style = {};
      style.top = (this.data.windowHeight - 100) / 2 + 'px';
      style.left = (this.data.windowWidth - 100) / 2 + 'px';
      return style;
    },
    indexListStyleObj: function indexListStyleObj() {
      var style = {};
      if (this.data.height) {
        style.height = this.data.height + 'px';
        style.display = 'inline-block';
      } else {
        style.height = this.data.windowHeight + 'px';
        style.display = 'inline-block';
      }
      return style;
    },
    indexSelectorWrapStyleObj: function indexSelectorWrapStyleObj() {
      var height = this.data.data.length * 16;
      var style = {};
      if (this.data.color) {
        style.color = this.data.color;
      }
      style.height = height + 'px';
      style.top = (this.data.height - height) / 2 + 'px';
      // console.log(this.data.windowHeight, height, style.top)
      return style;
    },
    selectTouchStartHandler: function selectTouchStartHandler(e) {
      var fingerY = e.touches[0].clientY;
      var offsetTop = e.currentTarget.offsetTop;
      this.data.itemIndex = Math.floor((fingerY - offsetTop) / 16 - (this.data.showTop ? 1 : 0));
      console.log(this.data.itemIndex);
      if (this.data.itemIndex === -1) {
        this.data.scrollTop = 0;
        this.data.blockOpacity = 1;

        this.setData({
          scrollTop: this.data.scrollTop,
          bigIndex: 'Top',
          indexFloatBlockDynamicStyle: (0, _objectToStyle2.default)(this.indexFloatBlockDynamicStyleObj())
        });
      } else {
        this.data.scrollTop = this.data.data[this.data.itemIndex].position;
        this.data.blockOpacity = 1;
        this.setData({
          scrollTop: this.data.scrollTop,
          bigIndex: this.data.data[this.data.itemIndex].index,
          indexFloatBlockDynamicStyle: (0, _objectToStyle2.default)(this.indexFloatBlockDynamicStyleObj())
        });
      }
    },
    selectTouchMoveHandler: function selectTouchMoveHandler(e) {
      var fingerY = e.touches[0].clientY;
      var offsetTop = e.currentTarget.offsetTop;
      var itemIndex = Math.floor((fingerY - offsetTop) / 16 - (this.data.showTop ? 1 : 0));
      var _this = this
      if (itemIndex === -1) {
        this.data.scrollTop = 0;
        this.setData({
          scrollTop: this.data.scrollTop,
          bigIndex: 'Top'
        });
      } else if (this.data.data[itemIndex]) {
        this.data.scrollTop = this.data.data[itemIndex].position;
        this.setData({
          scrollTop: this.data.scrollTop,
          bigIndex: this.data.data[itemIndex].index
        });
      }
      setTimeout(function(){
        _this.setData({
          bigIndex: ''
        })
      }, 1000)
    },
    selectTouchEndHandler: function selectTouchEndHandler() {
      this.data.blockOpacity = 0;
      this.setData({
        indexFloatBlockDynamicStyle: (0, _objectToStyle2.default)(this.indexFloatBlockDynamicStyleObj())
      });
    },
    selectTapHandler: function selectTapHandler(e) {
      if (e.currentTarget.dataset.disabled) {
        return;
      }
      if (this.data.checkbox) {
        // console.log(e.currentTarget.dataset.blockIndex, e.currentTarget.dataset.index);
        var item = this.data.data[e.currentTarget.dataset.blockIndex].items[e.currentTarget.dataset.index];
        item.checked = !item.checked;
      }
      this.setData({
        scrollTop: 0,
        data: this.data.data
      });
      // console.log(this.data.data);
      var city = e.currentTarget.dataset.city
      console.log(e.currentTarget.dataset)
      this.triggerEvent('customtap', {city: city});
    }
  }
});