import util from '../../../utils/index.js';
import { config, good } from '../../../apis/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    let src = options.src
    this.setData({
      src: src
    })
  },
  onshow: function(){
    this.videoContext = wx.createVideoContext('myvideo')
    this.videoContext.requestFullScreen()
    this.videoContext.play()
  }
})