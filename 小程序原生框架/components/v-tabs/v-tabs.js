'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _StyleHelper = require('../../libs/StyleHelper.js');

var _StyleHelper2 = _interopRequireDefault(_StyleHelper);

var _WxHelper = require('../../libs/WxHelper.js');

var _WxHelper2 = _interopRequireDefault(_WxHelper);

var _MultiHelper = require('../../libs/MultiHelper.js');

var _MultiHelper2 = _interopRequireDefault(_MultiHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChildPath = '../v-tab/v-tab';
Component({
  relations: {
    [ChildPath]: {
      type: 'child', // 关联的目标节点应为子节点
      linked: function (target) {
        // 每次有custom-li被插入时执行，target是该节点实例对象，触发在该节点attached生命周期之后
      },
      linkChanged: function (target) {
        // 每次有custom-li被移动后执行，target是该节点实例对象，触发在该节点moved生命周期之后
      },
      unlinked: function (target) {
        // 每次有custom-li被移除时执行，target是该节点实例对象，触发在该节点detached生命周期之后
      }
    }
  },
  behaviors: [],
  properties: {
    index: {
      type: Number | String,
      value: 0,
      observer: function observer(index) {
        this.handleIndexChange(index, true);
      }
    },
    probe: {
      type: [Number, String],
      default: 0
    },
    width: {
      type: Number | String
    },
    height: {
      type: Number | String
    },
    tabStyle: {
      type: Object | String
    },
    activeTabStyle: {
      type: Object | String
    }
  },
  data: {
    isInit: false,
    scrollTop: 0,
    scrollLeft: 0,
    children: [],
    rect: {},
    selfProbe: 0,
    selfIndex: 0,
    walkDistance: 0,
    walkCount: 0
  },
  ready: function ready() {
    this.setData({
      selfIndex: Number(this.data.index),
      selfProbe: Number(this.data.probe),
      height: Number(this.data.height)
    });
    this._init();
  },

  methods: {
    _init: function _init() {
      this._initRect();
      this._initChildren();
      this._initChildActive();
      this._initSelfStyle();
      this._setTabStyle();
    },
    _initChildren: function _initChildren() {
      var children = this.getRelationNodes(ChildPath);
      this.setData({
        children: children
      });
    },
    _initChildActive: function _initChildActive() {
      // 将index项设置为active
      this.data.children[this.data.selfIndex].setData({
        active: true
      });
    },
    _initRect: function _initRect() {
      var _this = this;

      _WxHelper2.default.getComponentRect(this, '.ui-v-tabs').then(function (rect) {
        _this.setData({
          rect: rect
        });
      });
    },
    _initSelfStyle: function () {
      this.setData({
        selfStyle: _StyleHelper2.default.getPlainStyle({
          width: this.data.width,
          height: this.data.height
        })
      });
    },
    handleIndexChange: function (index, outerChange) {
      _MultiHelper2.default.updateChildActive(this, index);

      var selfProbe = this.data.selfProbe;

      if (selfProbe === 0 || selfProbe === 1 && !outerChange) {
        this.triggerEvent('change', { index: index });
      }

      this.setData({
        selfIndex: index
      });

      this._setTabStyle();

      if (this.data.isInit) {
        this._autoMiddleTab();
      }
    },
    _setTabStyle: function() {
      var _data = this.data,
        children = _data.children,
        selfIndex = _data.selfIndex,
        tabStyle = _data.tabStyle,
        activeTabStyle = _data.activeTabStyle;


      var style = _StyleHelper2.default.getPlainStyle(tabStyle);
      var activeStyle = _StyleHelper2.default.getMergedPlainStyles([tabStyle, activeTabStyle]);

      children.forEach(function (node, index) {
        node.setData({
          selfStyle: index === selfIndex ? activeStyle : style
        });
      });
    },
    _autoMiddleTab: function() {
      var _this2 = this;

      var child = this.data.children[this.data.selfIndex];
      _WxHelper2.default.getScrollViewRect(this, '.ui-v-tabs').then(function (scrollRect)           {
        _WxHelper2.default.getComponentRect(child, '.ui-v-tab').then(function (rect) {
          var relativeTop = rect.top - _this2.data.rect.top;
          var diff = relativeTop - (_this2.data.height - child.data.height) / 2;

          _this2.setData({
            scrollTop: diff + scrollRect.scrollTop
          });
        });
      });
    },
    _increaseWalkDistance: function(rect) {
      this.data.walkDistance += rect.height;
      this.data.walkCount++;

      if (this.data.walkCount === this.data.children.length) {
        this.setData({
          isInit: true
        });
        this._autoMiddleTab();
      }
    }
  }
})
