import util from '../../../utils/index.js';
import { infoModel, chatModel } from '../../../apis/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {
      
    },
    loading: true,
    refresh: false,
    show:false,
    list: [],
    areaList: [],
    value: 330302,
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部',
    city: {
      country: '',
      qycity: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    util.showLoading();
    let that=this;
    this.firstLoad();
    getApp().getUserInfo(true).then((d)=>{
      let is_attention = d.is_attention;
      if (!is_attention){
        that.setData({
          show:true
        })
      }
    })
  },
  onshow: function() {
    wx.request({
      url: 'https://cashier.youzan.com/pay/wsctrade/order/buy/getAllRegion.json',
      success: response => {
        this.setData({
          loading: false,
          areaList: response.data.data
        });
      }
    });
  },
  bindRegionChange: function(){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  firstLoad: function () {
    let that = this;
    that.getList();
  },
  createFormid:function(e){
    getApp().globalData.formId = e.detail.formId
    infoModel.createFormId({ form_id: e.detail.formId })
    util.goUrl(e)
  },
  goUrl:function(e){
    util.goUrl(e)
  },
  //获取列表
  getList: function () {

    let that = this;
    let { refresh, param, tabActiveIndex } = this.data;

    chatModel.getAllList(param).then((d) => {
      util.hideAll();
      let newlist = d.data;
      that.setData({
        list: newlist,
        loading: false,
        refresh: false,
      })
    })

  },
  onShow:function(){
    this.onPullDownRefresh();
  },
  //刷新
  onPullDownRefresh: function () {
    let that = this;
    that.setData({
      refresh: true,
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
  save:function(){
    let that=this;
    wx.saveImageToPhotosAlbum({
      filePath: '/images/icon/code.jpg',
      success: function(res) {
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
        that.setData({
          show:false
        })
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  back:function(){
    this.setData({
      show:false
    })
  }
})