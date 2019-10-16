import util from '../../../utils/index.js';
import { companyModel } from '../../../apis/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let categoryList = util.getPage(-1).data.categoryList;
    that.setData({
      categoryList
    })
  },
  categoryChange: function (e) {
    console.log(e)
    let { index, key } = util.getData(e);
    let { categoryList } = this.data;
    key = `param.${key}`;
    let categoryInfo = categoryList[index];
    util.getPage(-1).categoryChange(categoryInfo)
    wx.navigateBack({
      delta: 1
    })

  },
})