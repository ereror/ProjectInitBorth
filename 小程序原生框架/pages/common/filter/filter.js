import util from '../../../utils/index.js'
import Validate from '../../../utils/validate'

Page({

  /**
   * 页面的初始数据
   */
  data: {

    filter: {
      tab1: [{
        id: 1,
        title: '今天'
      }, {
        id: 2,
        title: '明后天'
      }, {
        id: 3,
        title: '后天'
      }, {
        id: 4,
        title: '外天'
      }, {
        id: 5,
        title: '风天'
      }, {
        id: 6,
        title: '雨天'
      }, {
        id: 7,
        title: '冰雹天'
      }],
      tab2: [{
        id: 1,
        title: '最新'
      }, {
        id: 2,
        title: '最近'
      }, {
        id: 3,
        title: '最热'
      }],
      tab3: [{
        id: 0,
        title: '全部地区'
      }, {
        id: 1,
        title: '高新区'
      }, {
        id: 2,
        title: '武侯区'
      }, {
        id: 3,
        title: '锦江区'
      }, {
        id: 4,
        title: '金牛区'
      }, {
        id: 5,
        title: '成华区'
      }, {
        id: 5,
        title: '温江区'
      }, {
        id: 5,
        title: '双流区'
      }],
      tab4: [{
        id: 1,
        title: '不限'
      }, {
        id: 2,
        title: '付费'
      }, {
        id: 3,
        title: '免费'
      }]
    },
    tabList: [{
      id: 1,
      title: "全部"
    }, {
      id: 2,
      title: "待付款"
    }, {
      id: 3,
      title: "待发货"
    }, {
      id: 3,
      title: "已发货"
    }, {
      id: 3,
      title: "已完成"
    }],
    inkBarStyle: {
      'border-bottom': '1px solid red',
      'width': '60%',
      'color': 'red'
    },
    width: wx.getSystemInfoSync().windowWidth
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    this.getTabWidth();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onPullDownRefresh() {
    this.onLoad();
  },
  goUrl: function (e) {
    let { url } = util.getDataSet(e);
    console.log(url);
    util.goUrl(e)
  },
  tabChange(e) {
    let { key } = util.getData(e);
    let index = e.detail.index;
    let filter = this.data.filter;
    let detail = filter[key][index]
    console.log(detail)
    let newkey = `param.${key}`
    this.setData({
      [newkey]: detail.id
    })
  },
  getTabWidth: function () {
    let windowWidth = wx.getSystemInfoSync().windowWidth
    let width = windowWidth - windowWidth / 750 * 60;
    this.setData({
      width
    })
  },

});