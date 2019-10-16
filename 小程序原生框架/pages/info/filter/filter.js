import util from '../../../utils/index.js';
import { infoModel } from '../../../apis/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabList: [],
    tabActiveIndex:0,
    scrollTop:0,
    param: {
      page: 1,
      keyword: '',
      longitude: '',
      latitude: "",
      categoryid: '',
      order_type: '',
      type: ''
    },
    loading: true,
    refresh: false,
    list: {
      data: []
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let {id} = options; // 查询类型
    getApp().getCategoryInfo().then((d)=>{
      let tabList = d;
      // let index = tabList.findIndex((item)=>{
      //   return item.id==id
      // })
      let categoryid = tabList[0].id;
      that.setData({
        tabActiveIndex: 0,
        'param.categoryid': categoryid,
        tabList,
        'param.type': id
      })
      that.firstLoad();
    })
    
   
  },
  goUrl:function(e){
    util.goUrl(e)
  },
  onPageScroll(e) {
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  firstLoad: function () {
    let that = this;
    var locations = wx.getStorageSync('location')
    if (!locations.ExprTime || locations.ExprTime && ((new Date().getTime() - locations.ExprTime) > ExprTime)) {
      // 已过期或者没有设置获取当前位置
      wx.removeStorage({key: 'location'})
      getApp().getLocationInfo().then((d) => {
        let { longitude, latitude } = d;
        that.setData({
          'param.longitude': longitude,
          'param.latitude': latitude
        })
        that.getList();
      })
    } else {
      let {longitude, latitude, location} = locations
      that.setData({
          'param.latitude': latitude,
          'param.longitude': longitude
      })
    }
  },
  //tab切换
  tabChange(e) {
    let that = this;
    let index = e.detail.index;
    let { tabList } = this.data;

    // 切换tab后改变活动tab索引,以及初始化页面page
    that.setData({
      tabActiveIndex: index,
      loading: true,
      'list.data': [],
      'param.page': 1,
      'param.categoryid': tabList[index].id
    }, function () {
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
      let imghead = []
      let ishasUser = []
      newlist.data.map(v => {
        v.imgs.map(img => {
          img.type = img.path.slice(-4)
        })
        if (!~ishasUser.indexOf(v.uid) && ishasUser.length < 3) {
          imghead.push(v)
          ishasUser.push(v.uid)
        }
        if(v.type === 3) {
          if (v.type_detail && v.type_detail.now_money && v.type_detail && v.type_detail.origin_money && v.type_detail.now_money * 1 < v.type_detail.origin_money * 1) {
            v.discount = Math.floor((v.type_detail.now_money / v.type_detail.origin_money) * 1000) / 100
            v.discount = String(v.discount).slice(0, 3)
          }
        }
      })
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