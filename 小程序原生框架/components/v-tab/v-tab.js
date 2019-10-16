'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WxHelper = require('../../libs/WxHelper.js');

var _WxHelper2 = _interopRequireDefault(_WxHelper);

var _MultiHelper = require('../../libs/MultiHelper.js');

var _MultiHelper2 = _interopRequireDefault(_MultiHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ParentPath = '../v-tabs/v-tabs';
Component({
  relations: {
    [ParentPath]: {
      type: 'parent', // 关联的目标节点应为子节点
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
  data: {
    selfStyle: '',
    index: -1,
    active: false,
    width: 0,
    height: 0
  },
  ready: function ready() {
    this._init();
  },

  methods: {
    _init: function _init() {
      var _this = this;

      var parent = this.getRelationNodes(ParentPath)[0];
      _WxHelper2.default.getComponentRect(this, '.ui-v-tab').then(function (rect) {
        parent._increaseWalkDistance(rect);

        _this.setData({
          width: rect.width,
          height: rect.height,
          index: _MultiHelper2.default.getChildIndex(parent, _this)
        });
      });
    },
    handleTap: function handleTap() {
      var parent = this.getRelationNodes(ParentPath)[0];
      parent.handleIndexChange(this.data.index, false);
    }
  }
})
