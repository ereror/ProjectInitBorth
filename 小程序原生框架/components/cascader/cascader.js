'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectToStyle = require('../../libs/objectToStyle.js');

var _objectToStyle2 = _interopRequireDefault(_objectToStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Component({
  attached: function attached() {
    this.reAttached();
  },
  ready: function ready() {
    this.reReady();
  },

  behaviors: [],
  properties: {
    data: {
      type: Array,
      value: [],
      observer: function observer() {
        this.reAttached();
        this.reReady();
      }
    },
    width: {
      type: [Number, String],
      value: '100%'
    },
    height: {
      type: Number,
      value: 300
    },
    themeColor: {
      type: String,
      value: ''
    },
    showTitle: {
      type: Boolean,
      value: true
    },
    nameKey: {
      type: String,
      value: 'name'
    },
    valueKey: {
      type: String,
      value: 'value'
    },
    border: {
      type: Boolean,
      default: true
    }
  },
  data: {
    newArray: [],
    step: 0,
    dynamicWidth: 0,
    seqData: [{ name: '请选择', selected: true }]
  },
  methods: {
    // cascaderItemStyleObj () {
    //   let style = {}
    //   style.color = this.data.themeColor
    //   return style
    // },

    reAttached: function reAttached() {
      this.data.titleMargin = this.data.showTitle ? 50 : 0;
      var traver = true;
      for (var i = 0; i < this.data.data.length; i++) {
        if (this.data.data[i].children) {
          traver = false;
          break;
        }
      }
      console.log(traver);
      if (traver) {
        var setting = {
          data: {
            simpleData: {
              idKey: "value",
              pIdKey: "parent",
              enable: true
            },
            key: {
              children: "children"
            }
          }
        };
        this.data.data = this.transition(setting, this.data.data);
      }
    },
    reReady: function reReady() {
      var _this = this;

      this.data.newArray = [];
      this.data.newArray.push([]);
      this.data.data.forEach(function (element) {
        element.deep = _this.data.step;
        _this.data.newArray[0].push(element);
      });

      this.setData({
        newArray: this.data.newArray,
        cascaderStyle: (0, _objectToStyle2.default)(this.cascaderStyleObj())
      });

      wx.createSelectorQuery().in(this).select('.ui-cascader').boundingClientRect(function (res) {
        if (res) {
          _this.data.dynamicWidth = res.width / 2;
          _this.data.blockWidth = _this.data.dynamicWidth;
          _this.setData({
            cascaderContentWrapStyle: (0, _objectToStyle2.default)(_this.cascaderContentWrapStyleObj()),
            cascaderBlockStyle: (0, _objectToStyle2.default)(_this.cascaderBlockStyleObj())
          });
        }
      }).exec();
    },
    cascaderBlockStyleObj: function cascaderBlockStyleObj() {
      var style = {};
      style.width = this.data.blockWidth + 'px';
      style.height = this.data.height - this.data.titleMargin + 'px';
      return style;
    },
    cascaderContentWrapStyleObj: function cascaderContentWrapStyleObj() {
      var style = {};
      var trans = void 0;
      if (this.data.showTitle) {
        style.height = this.data.height - this.data.titleMargin + 'px';
      } else {
        style.height = this.data.height + 'px';
      }
      if (this.data.transmode === 'showtrans') {
        trans = -this.data.selectseqIndex * this.data.blockWidth;
      } else {
        if (this.data.step > 1) {
          trans = -(this.data.step - 1) * this.data.blockWidth;
        } else {
          trans = 0;
        }
      }
      style.transform = 'translate3d(' + trans + 'px, 0, 0)';
      style.width = this.data.dynamicWidth + 'px';
      return style;
    },
    cascaderStyleObj: function cascaderStyleObj() {
      var style = {};
      if (('' + this.data.width).indexOf('%') > -1) {
        style.width = this.data.width;
      } else {
        style.width = this.data.width + 'px';
      }
      style.height = this.data.height + 'px';
      return style;
    },
    nextStep: function nextStep(e, tbmode) {
      var _this2 = this;

      var selectIndex = e.currentTarget.dataset.index;
      this.data.step++;
      this.data.newArray.push([]);
      if (!this.data.newArray[this.data.step - 1][selectIndex].children) {
        // 点击最后的一项
        this.data.seqData.forEach(function (element) {
          element.selected = false;
        });
        this.data.newArray[this.data.step - 1].forEach(function (element) {
          element.selected = false;
        });
        this.data.newArray[this.data.step - 1][selectIndex].selected = true;
        this.data.step--;
        this.data.seqData.splice(-1, 1, {
          value: e.currentTarget.dataset.item.value,
          name: e.currentTarget.dataset.item.name,
          selected: true
        });
        this.setData({
          newArray: this.data.newArray,
          seqData: this.data.seqData
        });
        console.log(this.data.seqData);
        var send = [];
        this.data.seqData.forEach(function (element) {
          var obj = {};
          obj[_this2.data.nameKey] = element[_this2.data.nameKey];
          obj[_this2.data.valueKey] = element[_this2.data.valueKey];
          send.push();
        });
        this.triggerEvent('selected', this.data.seqData);
        return;
      }
      //添加轨迹词语
      if (!tbmode) {
        this.data.seqData.splice(-1, 0, {
          name: e.currentTarget.dataset.item.name,
          value: e.currentTarget.dataset.item.value
        });
        this.data.seqData[this.data.seqData.length - 1].name = "请选择";
      } else {
        this.data.seqData.splice(-1, 0, { name: e.currentTarget.dataset.item.name });
        this.data.seqData.forEach(function (element) {

          element.selected = false;
        });
        this.data.seqData[this.data.seqData.length - 1].name = "请选择";
        this.data.seqData[this.data.seqData.length - 1].selected = true;
      }

      // 更新宽及其transfrom

      this.data.dynamicWidth = (e.currentTarget.dataset.item.deep + 2) * this.data.blockWidth;
      this.setData({
        cascaderContentWrapStyle: (0, _objectToStyle2.default)(this.cascaderContentWrapStyleObj())
      });

      // 换颜色

      this.data.newArray[this.data.step - 1].forEach(function (element) {
        element.selected = false;
      });
      this.data.newArray[this.data.step - 1][selectIndex].selected = true;

      this.data.newArray[this.data.step - 1][selectIndex].children.forEach(function (element) {
        element.deep = _this2.data.step;
        element.selected = false;
        _this2.data.newArray[_this2.data.step].push(element);
      });
      this.setData({
        newArray: this.data.newArray,
        seqData: this.data.seqData
      });
    },
    turnBackStep: function turnBackStep(e) {
      var selectIndex = e.currentTarget.dataset.index;
      var selectBlock = e.currentTarget.dataset.item.deep;
      this.data.newArray = this.data.newArray.slice(0, selectBlock + 1);
      this.data.step = selectBlock;

      // 退回到某数组

      this.data.seqData.splice(this.data.step, this.data.seqData.length - this.data.step - 1);

      this.nextStep(e, true);
    },
    transition: function transition(setting, sNodes) {
      if (setting.data.simpleData.enable) {
        var i,
          l,
          key = setting.data.simpleData.idKey,
          parentKey = setting.data.simpleData.pIdKey,
          childKey = setting.data.key.children;
        if (!key || key == "" || !sNodes) return [];
        var r = [];
        var tmpMap = {};
        for (i = 0, l = sNodes.length; i < l; i++) {
          tmpMap[sNodes[i][key]] = sNodes[i];
        };
        for (i = 0, l = sNodes.length; i < l; i++) {
          if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
            if (!tmpMap[sNodes[i][parentKey]][childKey]) tmpMap[sNodes[i][parentKey]][childKey] = [];
            tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
          } else {
            r.push(sNodes[i]);
          }
        };
        return r;
      } else {
        return sNodes;
      }
    },
    itemTapHandler: function itemTapHandler(e) {
      console.log(e.currentTarget.dataset.item.name);

      this.data.transmode = 'addtrans';
      if (e.currentTarget.dataset.item.deep < this.data.step) {
        this.turnBackStep(e);
      } else {
        this.nextStep(e);
      }
    },
    seqItemTapHandler: function seqItemTapHandler(e) {

      this.data.transmode = 'showtrans';
      this.data.selectseqIndex = e.currentTarget.dataset.index;
      this.data.seqData.forEach(function (element) {
        element.selected = false;
      });
      this.data.seqData[e.currentTarget.dataset.index].selected = true;
      if (this.data.step !== e.currentTarget.dataset.index) {
        this.setData({
          cascaderContentWrapStyle: (0, _objectToStyle2.default)(this.cascaderContentWrapStyleObj())
        });
      }
      this.setData({
        seqData: this.data.seqData
      });
    }
  }
});