// components/dialog/dialog.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    visible:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show:function(){
       this.setData({
         visible:true
       })
    },
    hide:function(){
      this.setData({
        visible: false
      })
    }
  }
})
