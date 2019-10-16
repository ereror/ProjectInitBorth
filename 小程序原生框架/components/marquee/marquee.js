// components/marquee.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    height:{
      type:Number,
      value:50
    },
    interval:{
      type:Number,
      value:2000
    },
    animate:{
      type:Boolean,
      value:true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollTop:0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //触底事件
    scrolltolower: function () {
      let that=this;
      let interval = this.data.interval;
      setTimeout(function(){
        that.setData({
          scrollTop: 0
        })  
      }, interval)
    }
  },
  ready:function(){
    let that=this;
    // let windowWidth = wx.getSystemInfoSync().windowWidth;
    let height = this.properties.height;
    let scrollTop;
    let interval = this.data.interval;
    setInterval(function(){
      scrollTop = height + that.data.scrollTop;
      that.setData({
        scrollTop
      })
    }, interval)
  
  },
 
})
