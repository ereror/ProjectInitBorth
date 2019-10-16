import util from '../../../utils/index.js';
import { config, good } from '../../../apis/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {
      data: []
    },
    param: {
      page: 1,
      is_recommend: 1
    },
    refresh: false,
    loading: true,
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.firstLoad();
  },
  //首次渲染
  firstLoad: function () {
    this.getAd();
    this.getList();
  },
  //获取广告
  getAd: function () {
    let that = this;
    config.getAd({ name: "index" }).then((d) => {
      that.setData({
        adList: d.data.value || []
      })
    })
  },
  //获取列表
  getList: function () {

    let that = this;
    let { refresh, param } = this.data;
    if (refresh) {
      param = {
        page: 1,
        is_recommend: 1
      }
      that.setData({
        param
      })
      wx.showNavigationBarLoading()
    }
    that.setData({
      loading: true
    })
    good.getList(param).then((d) => {
      let list = that.data.list;
      if (!refresh) {
        d.data.data = [...list.data, ...d.data.data];
      }
      that.setData({
        list: d.data,
        loading: false,
        refresh: false
      })
      util.hideAll()
    })

  },
  //刷新
  onPullDownRefresh: function () {
    this.setData({
      refresh: true
    })
    this.firstLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let { loading } = this.data;
    let { current_page, last_page } = that.data.list;
    if (current_page != last_page && !loading) {
      that.setData({
        'param.page': current_page + 1
      })
      that.getList();
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goUrl(e) {
    console.log(e)
    util.goUrl(e)
  }
})