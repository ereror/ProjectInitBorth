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
      order_type: ''
    },
    loading: true,
    refresh: false,
    list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showLoading();
    this.firstLoad();
  },
  firstLoad: function () {
    let that = this;
    getApp().getLocationInfo().then((d) => {
      let { longitude, latitude } = d;
      that.setData({
        'param.longitude': longitude,
        'param.latitude': latitude
      })
      that.getList();
    })

  },
  //获取列表
  getList: function () {

    let that = this;
    let { refresh, param } = this.data;

    infoModel.viewList(param).then((d) => {
      util.hideAll();
      let newlist = d.data;
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
    return;
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
  deleteViewByDay:function(e){
    let that=this;
    let { time, pindex}=util.getData(e);
    let list=this.data.list;
    util.showLoading();
    infoModel.deleteViewByDay({time}).then((d)=>{
      util.hideAll();
      util.showSuccess("清除成功")
      list.splice(pindex,1)
      that.setData({
        list
      })
    })
  },
  previewImage: function (e) {
    console.log(e)
    let { index, url, pindex } = util.getData(e);
    let { list } = this.data;
    let imageList = list[pindex].data[index].imgs;
    let id = list[pindex].data[index].id;
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