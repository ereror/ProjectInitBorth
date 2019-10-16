import util from '../../../utils/index.js';
import { companyModel } from '../../../apis/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    let categoryList = util.getPage(-1).data.categoryList;
    that.setData({
      categoryList,
      height: wx.getSystemInfoSync().windowHeight
    })
    
  },
  onShow:function(){
    let that=this;
    getApp().getUserInfo().then((d) => {
      let userInfo = d;
      let isVip = userInfo.company && userInfo.company.is_vip;
      that.setData({
        isVip
      })
    })
  },
  tabChange:function(e){
    let index=e.detail.index;
    this.setData({
      activeIndex:index
    })
  },
  categoryChange: function (e) {
    let { index} = util.getData(e);
    let { categoryList, activeIndex,isVip } = this.data;
    let categoryInfo = categoryList[activeIndex]._child[index];
    categoryInfo.pid = categoryList[activeIndex].id;
    let {must_vip} = categoryInfo;
    if (must_vip && !isVip){
      wx.showModal({
        title: '提示',
        content: '你还不是vip',
        showCancel: true,
        cancelText: '不了',
        confirmText: '去开通',
        success: function(res) {
          if(res.confirm){
            wx.navigateTo({
              url: '/pages/usercenter/vip/vip',
            })
          }
        },
        fail: function(res) {},
        complete: function(res) {},
      })
      return; 
    }
    util.getPage(-1).categoryChange(categoryInfo)
    wx.navigateBack({
      delta: 1
    })

  },
})