import { configModel,categoryModel,userModel,infoModel } from './apis/index.js';
import util from './utils/index.js';
import defaultConfigInfo from './config.js';
const ald = require('./utils/ald-stat.js')
const ExprTime = 1000 * 60 * 60 // 一个小时
App({
  onLaunch: function () {
    //获取配置
    let that = this;
    // var location = wx.getStorageSync('location')
    // if (location) {
    //   // 判断时间是否过期
    //   location.ExprTime = location.ExprTime || 0
    //   var isExpr = (new Date().getTime() - location.ExprTime) > ExprTime
    //   if (!isExpr) {
    //     this.globalData.chooseCityNow = location.location
    //     this.globalData.hasUseCity = location.hasUseCity
    //     this.globalData.hasNowCity = location.hasNowCity
    //   } else {
    //     wx.removeStorage({key: 'location'})
    //   }
    // }
    // this.getPosition()
  },
  globalData: {
    configInfo:false,
    userInfo: false,
    categoryInfo:false,
    locationInfo:false,
    showAlertAd:true,
    detailObj: {},
    chooseCityNow: {
      city: {
        id: "510100",
        name: "成都",
        fullname: "成都市",
        location: {
          lat: 30.5702,
          lng: 104.06476
        }
      },
      qycity: {}
    },
    hasUseCity: [],
    hasNowCity: {
      country: '成',
      qycity: ''
    }
  },
  //获取全局配置信息
  getConfigInfo: function (refrensh = false) {
    let that = this;
    let configInfo = that.globalData.configInfo;
    console.log('获取全局配置信息')
    return new Promise((resove, reject) => {
      if (configInfo && !refrensh) {
        let allConfigInfo = Object.assign({}, configInfo, defaultConfigInfo)
        resove(allConfigInfo)
      } else {
        userModel.getConfigInfo().then((d) => {
          let configInfo = d.data
          //赋值全局配置变量
          that.globalData.configInfo = configInfo;
          let allConfigInfo = Object.assign({}, configInfo,defaultConfigInfo)
          console.log(allConfigInfo)
          resove(allConfigInfo)
        })
      }
    }).then((allConfigInfo) => {
      //设置全局tabbar
      //util.setTabbar(configInfo.tabbar)
      return allConfigInfo
    })
  },
  //获取全局用户信息
  getUserInfo: function (refrensh = false) {
    let that = this;
    let userInfo = that.globalData.userInfo;
    return new Promise((resove, reject) => {
      //如果已经获取了,并且不刷新
      if (userInfo && !refrensh) {
        resove(userInfo)
      } else {
        userModel.getUserInfo().then((d) => {
          let userInfo=d.data;
          that.globalData.userInfo = userInfo;
          resove(userInfo)
        })
      }
    })
  },
  getPostionDetail: function() {
    var that = this
    return new Promise((resolve, reject) => {
      getApp().getLocationInfo().then((d) => {
      let { longitude, latitude } = d;
        if (latitude && longitude) {
          let location = latitude + ',' + longitude
          wx.request({
            url: 'https://apis.map.qq.com/ws/geocoder/v1/',
            data: {
              location: location,
              get_poi: 1,
              key: 'RHGBZ-S2LAU-5MRV7-4QPTZ-JI25K-HVBDV',
            },
            success: function success(res) {
              let locs =  res.data && res.data.result && res.data.result.formatted_addresses && res.data.result.formatted_addresses.recommend || {}
              console.log(locs)
              let resultloc = {
                latitude: latitude,
                longitude: longitude,
                address: locs
              }
              resolve(resultloc)
            }
          })
        }
      })
    })
  },
  //获取全局分类信息
  getCategoryInfo: function (refrensh = false) {
    let that = this;
    let categoryInfo = that.globalData.categoryInfo;
    return new Promise((resove, reject) => {
      //如果已经获取了,并且不刷新
      if (categoryInfo && !refrensh) {
        resove(categoryInfo)
      } else {
        infoModel.getCategoryList().then((d) => {
          that.globalData.categoryInfo = d.data;
          resove(d.data)
        })
      }
    })
  },
  //获取全局定位信息
  getLocationInfo: function (refrensh = false) {
    let that = this;
    let locationInfo = that.globalData.locationInfo;
    return new Promise((resove, reject) => {
      //如果已经获取了,并且不刷新
      if (locationInfo && !refrensh) {
        resove(locationInfo)
      } else {
        wx.getLocation({
          type: 'gcj02',
          success: function(res) {
            let { latitude, longitude } = res;
            let locationInfo = {
              latitude,
              longitude,
            }
            that.globalData.locationInfo = locationInfo;
            resove(locationInfo)
          },
          fail: function(res) {
            let title = '定位失败'
            let content = '需要定位信息才能获取周边动态，是否重新定位'
            let isagin = true
            if (!!~res.errMsg.indexOf('fail auth deny')) {
               title = '位置信息未授权'
               content = '需要用户授权:设置界面（「右上角」 - 「关于」 - 「右上角」 - 「设置」）打开位置授权！'
               isagin = false
            } 
            wx.showModal({
              title: title,
              content: content,
              showCancel: true,
              success: function(res) {
                if(res.confirm && isagin){
                  that.getLocationInfo()
                }
              },
              fail: function(res) {},
              complete: function(res) {},
            })
          },
          complete: function(res) {},
        })
        // util.getLocation().then((d)=>{
        //   let AllLocationInfo=d;
        //   console.log(d)
        //   let { latitude, longitude,name } = AllLocationInfo;
        //   let city = AllLocationInfo.regeocodeData.addressComponent.city;
        //   let locationInfo={
        //     latitude,
        //     longitude,
        //     city,
        //     address: name,
        //   }
        //   let location=wx.getStorageSync('location');
        //   if (!location){
        //     wx.setStorageSync('location', locationInfo)
        //   }
        //   that.globalData.locationInfo = locationInfo;
        //   resove(locationInfo)
        // })
      }
    })
  },
  tapToAuthorize: function(callback){
    //再授权
    wx.openSetting({
      success: (res) => {
        if (res.authSetting["scope.userLocation"] === true){
          // 成功回调函数
          callback && callback()
        }
        else{
          wx.showModal({
            title: '用户未授权',
            content: '如需正常使用小程序，请点击授权按钮，勾选用户信息并点击确定。',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                console.log('用户点击确定')
              }
            }
          })
        }
      }
    })
  }
})