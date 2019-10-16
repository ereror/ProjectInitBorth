import ObjToStyle from '../../static/libs/objectToStyle'
Component({
  behaviors: [],
  properties: {
    show: {
      type: Boolean,
      observer: function observer(val) {
	    console.log(val)
        var _this = this;
        var eventName = val ? 'showfunc' : 'hidefunc'
        this.triggerEvent(eventName);
        if (!this.data.isInit) {
          setTimeout(function () {
            _this.triggerEvent('init')
          }, 300);
          this.setData({
            isInit: true
          });
        }
      }
    },
    width: {
      type: Number | String
    },
    height: {
      type: Number | String
    },
    top: {
      type: Number | String,
      value: 0
    },
    showMask: {
      type: Boolean,
      value: true
    },
    maskStyle: {
      type: Object | String
    },
    hideOnBlur: {
      type: Boolean,
      value: true
    },
    position: {
      type: String,
      value: 'bottom'
    },
    maxHeight: String,
    background: {
      type: String
    },
    cropout: {
      type: Boolean
    }
  },
  data: {
    isInit: false
  },
  ready: function ready() {
    var style = ObjToStyle({
      top: this.data.top || '',
      height: this.data.height,
      width: this.data.width || '100%',
      background: this.data.background
    });
    var selfStyle = ''
    var selfContentStyle = ''

    if (this.data.cropout) {
      selfStyle = style;
    } else {
      selfContentStyle = style
    }

    this.setData({
      selfStyle: selfStyle,
      selfContentStyle: selfContentStyle,
      selfMaskStyle: ObjToStyle(this.data.maskStyle)
    })
  },

  methods: {
    handleTouchMove: function handleTouchMove(e) {},
    handleMaskTap: function handleMaskTap(e) {
      if (this.data.hideOnBlur) {
        this.setData({
          show: false
        });
      }
    }
  }
});