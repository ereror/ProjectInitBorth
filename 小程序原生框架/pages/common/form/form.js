import util from '../../../utils/index.js';
import { address } from '../../../apis/index.js';
import Validate from '../../../utils/validate.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {
      name: "",
      tel: "",
      area: "",
      address: ""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let title;
    let that = this;
    that.setData({
      delta: options.delta || 2
    })
    if (options.detail) {
      title = "编辑收货地址";
      let detail = JSON.parse(options.detail);
      let { name, tel, area, address, id } = detail;
      let param = { name, tel, area, address, id }
      that.setData({
        param,
        edit: true
      })
    } else {
      title = "添加收货地址"
    }
    wx.setNavigationBarTitle({
      title,
      edit: false
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  setParam: function (e) {
    let { key } = util.getDataSet(e);
    let value = util.getValue(e)
    key = `param.${key}`;
    this.setData({
      [key]: value
    })
  },
  areaChange: function (e) {
    let { key } = util.getDataSet(e);
    let value = util.getValue(e);
    key = `param.${key}`;
    value = value.join("");
    this.setData({
      [key]: value
    })
  },
  validated: function () {
    let { name, tel, area, address } = this.data.param;
    let validate = new Validate();
    validate.add(name, "isNoEmpty", "姓名不能为空")
    validate.add(tel, "isNoEmpty", "电话号码不能为空")
    validate.add(tel, "isMobile", "输入正确的电话号码")
    validate.add(area, "isNoEmpty", "地区不能为空")
    validate.add(address, "isNoEmpty", "详细地址不能为空")
    let msg = validate.start();
    return msg;
  },
  submit: function () {
    let param = this.data.param;
    let msg = this.validated();
    if (msg) {
      util.showModal({ content: msg });
      return;
    }
    let delta = this.data.delta;
    util.showLoading()
    address.add(param).then((d) => {
      let msg = this.data.edit ? "编辑成功" : "添加成功";
      wx.hideLoading()
      util.showSuccess(msg);

      setTimeout(function () {
        if (delta == 1) {
          util.getPrePage().setAddress(param)
        }
        wx.navigateBack({
          delta: 1
        })
      }, 1500)
    })
  }
})