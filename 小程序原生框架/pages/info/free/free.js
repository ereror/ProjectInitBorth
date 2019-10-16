import util from '../../../utils/index.js';
import { infoModel } from '../../../apis/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {
      page: 1,
      keyword: '',
      longitude: '',
      latitude: "",
      categoryid: '',
      order_type: 1
    },
    loading: true,
    refresh: false,
    list: {
      data: []
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.firstLoad();
  },
  firstLoad: function () {
    let that = this;
    getApp().getLocationInfo().then((d) => {
      let { longitude, latitude, city } = d;
      that.setData({
        'param.longitude': longitude,
        'param.latitude': latitude,
        location: d
      })
      that.getList();
    })

  },
  //获取列表
  getList: function () {

    let that = this;
    let { refresh, param, list, tabActiveIndex } = this.data;

    infoModel.getList(param).then((d) => {
      util.hideAll();
      let oldlist = list;
      let newlist = d.data;

      //如果刷新,则不加载老数据
      if (!refresh) {
        newlist.data = [...oldlist.data, ...newlist.data];
      }
      that.setData({
        list: newlist,
        loading: false,
        refresh: false,
      })
    })

  },
  //刷新
  onPullDownRefresh: function () {
    let that = this;
    that.setData({
      refresh: true,
      'param.page': 1
    }, function () {
      wx.showNavigationBarLoading()
      that.firstLoad();
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let { loading, list } = this.data;
    let { current_page, last_page } = list;
    if (!loading && current_page != last_page) {
      that.setData({
        'param.page': current_page + 1,
        loading: true
      }, function () {
        that.getList();
      })
    }
  },
  previewImage: function (e) {
    let { index, url } = util.getData(e);
    let { list } = this.data;
    let imageList = list.data[index].imgs;
    let id = list.data[index].id;
    let imgArr = [];
    for (let i in imageList) {
      imgArr.push(imageList[i].path)
    }
    wx.previewImage({
      current: url,
      urls: imgArr,
      success: function () {
        infoModel.addStar({ id })
      }
    })
  },
})