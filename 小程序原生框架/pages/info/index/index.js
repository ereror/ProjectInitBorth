import util from '../../../utils/index.js';
import toast from '../../../utils/toast.js';
import { infoModel, userModel, chatModel} from '../../../apis/index.js';
import config from '../../../config.js'
const ExprTime = 1000 * 60 * 60
let issubmit = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabbar: config.tabbar,
    swiperAd: config.swiperAd,
    swiperCategory: config.swiperCategory,
    roller: config.roller,
    nowPageIndex:0,
    showSelectSex:false,
    showReleasetip:false,
    showTop:false,
    param:{
      page:1,
      keyword:'',
      longitude:'',
      latitude:"",
      categoryid:'',
      order_type:''
    },
    loading:true,
    refresh:false,
    list:{
      data:[],
    },
    imghead: [],
    gender: 1,
    total: 0,
    location: '',
    isExpr: true,
    showLittle: false,
    detailid: '',
    isAuthBack: '',
    originMenu: [],
    showidentify: false,
    identify: {
      placeholder: '设置周数',
      val: '',
      type: 0
    },
    topList: [],
    showfbboxt: '当前领取人数较多，请重新领取!',
    showshareresult: false,
    showErerorMess: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    util.showLoading();
    // this.getPosition()
    if (options.orderDetail) {
      wx.navigateTo({
        url: '/pages/info/orderDetail/orderDetail?id=' + options.orderDetail,
      })
      return
    }
    if (options.uid) {
      wx.navigateTo({
        url: '/pages/ucenter/message/message?uid=' + options.uid + '&&nickname=' + options.nickname,
      })
      return
    }
    let scene = decodeURIComponent(options.scene)
    let sceneresult = ''
    if(scene * 1) {
      sceneresult = scene * 1
    }
    if(scene.id) {
      sceneresult = scene.id * 1
    }
    if(scene && scene != 'undefined' && (typeof scene === 'string')) {
      scene = decodeURI(scene)
      sceneresult = scene.match(/(?:id).*/ig)[0].split('=')[1]
    }
    if (options.detailid || sceneresult) {
      let isAuth = wx.getStorageSync('isAuth')
      if (!isAuth) {
        this.setData({
          detailid: options.detailid || sceneresult
        })
      } else {
        var id = options.detailid || sceneresult
        wx.navigateTo({
          url: '/pages/info/details/details?detailid=' + id
        })
        return
      }
    }
    wx.getSystemInfo({
      success: function (res) {
        if (res.model.indexOf('iPhone X')>-1){
          that.setData({
            isIpx:true
          })
        }else{
          that.setData({
            isIpx: false
          })
        }
        that.firstLoad();
        var locations = wx.getStorageSync('location')
        if (!locations.ExprTime || locations.ExprTime && ((new Date().getTime() - locations.ExprTime) > ExprTime)) {
          // 已过期或者没有设置获取当前位置
          wx.removeStorage({key: 'location'})
          that.getPostionDetail()
        } else {
          let {longitude, latitude, location} = locations
          getApp().globalData.locationInfo = locations
          if(location.length > 14) location = location.slice(0, 14) + '...'
          that.setData({
              'param.latitude': latitude,
              'param.longitude': longitude,
               location: location
          })
          that.getList();
          that.getTopInfoList();
        }
      }
    })
  },
  getPostionDetail: util.throttle(function() {
    var that = this
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
            if (locs) {
              if(locs.length > 14) locs = locs.slice(0, 14) + '...'
              that.setData({
                  'param.latitude': latitude,
                  'param.longitude': longitude,
                   location: locs
              })
              that.getList();
              that.getTopInfoList();
            }
          }
        })
      }
    })
  }, 5000),
  chooseLocation () {
    let that = this;
    wx.chooseLocation({
      type: 'gcj02',
      success: function (res) {
        let { longitude, latitude, name } = res;
        if(name.length > 14) name = name.slice(0, 14) + '...'
        that.setData({
          'param.latitude': latitude,
          'param.longitude': longitude,
          location: name,
          'list.data': []
        })
        let locationInfo = {
          latitude,
          longitude,
          location: name,
          ExprTime: new Date().getTime()
        }
        getApp().globalData.locationInfo = locationInfo;
        wx.setStorage({
          key: "location",
          data: locationInfo
        })
        that.getList();
        that.getTopInfoList();
      }
    })
  },
  setLocationVal: function(){
    var locations = getApp().globalData.chooseCityNow
    if (locations.qycity && locations.qycity.id) {
      var qycity = locations.qycity.name || locations.qycity.fullname
      var city = locations.city.name || locations.city.fullname || locations.city.text
      var location = city + '·' + qycity
      this.data.param.latitude = locations.qycity.location && locations.qycity.location.lat
      this.data.param.longitude = locations.qycity.location && locations.qycity.location.lng
    } else {
      this.getPostionDetail()
      return
    }
    this.setData({
      location: location,
      param: this.data.param
    })
    this.getList();
    this.getTopInfoList();
  }, 
  onShow: function () {
    var detailid = this.data.detailid
    if (detailid && this.data.isAuthBack) {
        this.setData({
          detailid: ''
        })
        wx.navigateTo({
          url: '/pages/info/details/details?detailid=' + detailid
        })
        return
    }
    let that = this;
    let isAuth = wx.getStorageSync('isAuth')
    if (!isAuth) {
      wx.navigateTo({
        url: "/pages/common/auth/auth",
      })
    }else{
      getApp().getUserInfo(true).then(d => {
        let userInfo = d;
        let { gender } = userInfo;
        if (!gender) {
          that.setData({
            showSelectSex: true
          })
        }
        let showidentify = false
        if(!userInfo.baby_creat_time && !userInfo.baby_out_time) {
          showidentify = true
        }
        that.setData({
          userInfo,
          showidentify: showidentify,
          showErerorMess: false
        })
      })
    }
    if (!this.data.param.latitude && !this.data.param.longitude) {
      this.getPostionDetail()
    }
  },
  goMoreMessage: util.throttle(function() {
    wx.navigateTo({
      url: '/pages/common/webview/webview?url=https://mp.weixin.qq.com/s/Q4cybgi5RM_F5QdtgsCzFw'
    })
  }, 1000),
  getAllInfoType(){
    infoModel.getAllInfoType().then(d => {
      if (d.code === 200) {
        this.data.originMenu = d.data
        this.setData({
          originMenu: d.data
        })
      }
    })
  },
  setzan: util.throttle(function(e){
    // 点赞方法
    let {zan, index, id, topindex} = util.getData(e)
    let result = {}
    let zanObj = this.data.list.data
    let param = 'list.data'
    let temp = {
      id,
      type: 1,
      zan: Number(!zan)
    }
    infoModel.setZan(temp).then(d => {
      if(topindex) {
        zanObj = this.data.topList
        param = 'topList'
      }
      if(d.code === 200) {
        zanObj[index].zan = Number(!zan)
        if (!zan) {
          zanObj[index].zan_count++
          if (!zanObj[index].zanOrigin &&  zanObj[index].zanOrigin != 2 && this.data.userInfo.id != zanObj[index].uid) {
            result =  { info_id: zanObj[index].id , content: '有人评论了你发布的' + zanObj[index].title, other_uid: zanObj[index].uid, kind: 'text', page: 'pages/info/index/index?info=1'}
            this.sendMessageToUser(result)
          }
        } else {
          zanObj[index].zanOrigin = 2
          zanObj[index].zan_count--
        }
        var zans = param +'[' + index + '].zan'
        var zan_counts = param +'[' + index + '].zan_count'
        this.setData({
          [zans]: zanObj[index].zan,
          [zan_counts]: zanObj[index].zan_count,
        })
        if (!zanObj[index].zanOrigin && !zan) {
          // 控制反复点赞的情况，取第一次没有点赞的情况
          zanObj[index].zanOrigin = 1
        }
      }
    })
  }, 500),
  sendMessageToUser(param){
    // { content: content, other_uid: param.other_uid, kind: 'img', page: 'pages/info/index/index'}
    chatModel.sendChatNotify(param)
  },
  sexChange:function(e){
    let {gender}=util.getData(e)
    this.setData({
      gender
    })
  },
  selectSex:function(){
    let that=this;
    that.setData({
      showSelectSex:false
    })
    let gender = this.data.gender;
    //选择性别保存数据
    userModel.save({ gender}).then((d)=>{
      getApp().getUserInfo(true).then((d)=>{
        let userInfo = d;
        that.setData({
          userInfo
        })
      })
    })
  },
  firstLoad:function(){
    let that=this;
    Promise.all([infoModel.dashboard(), getApp().getConfigInfo(), that.getAllInfoType()]).then((d)=>{
      util.hideAll();
      let otherData=d[0].data;
      getApp().globalData.categoryInfo = otherData.category;
      let configInfo=d[1]
      that.setData({
        otherData,
        configInfo
      })
    })
    // that.getList();//1541473026 1541473459
    // 当前定位信息
  },
  //获取列表
  getList: function (str) {
    let that = this;
    let { refresh, param, list, tabActiveIndex } = this.data;
    let query = Object.assign({}, param)
    if (str) query.page = 1
    if (!param.latitude && !param.longitude) {
      this.getPostionDetail()
      return
    }
    infoModel.getList(query).then((d) => {
      let oldlist = list;
      let newlist = d.data;
      let total = d.data.total + 1477;
      let current_page = newlist.current_page; // server 传递的是第几页

      //如果刷新,则不加载老数据
      if (str) newlist.current_page = param.page;

      if (!refresh) {

        let lenold = oldlist.data.length;
        let addlist = [];

        for(let i=0;i<newlist.data.length;i++){
          let find = false;
          for(let j=0;j<oldlist.data.length;j++){
            if(newlist.data[i].id == oldlist.data[i].id){
              oldlist.data[i] = newlist.data[i];
              find = true;
              break;
            }
          }
          if(!find){
              addlist.push(newlist.data[i]);
          }
        }

        if(current_page == 1){
            newlist.data = [...addlist, ...oldlist.data];
        }else{
            newlist.data = [...oldlist.data, ...addlist];
        }
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
        if(v.type === 1) {
          if (v.type_detail && v.type_detail.now_money && v.type_detail && v.type_detail.origin_money && v.type_detail.now_money * 1 < v.type_detail.origin_money * 1) {
            v.discount = Math.round((v.type_detail.now_money / v.type_detail.origin_money) * 1000) / 100
            if(v.discount < 0.1) v.discount = 0.1
            v.discount = String(v.discount).slice(0, 3)
          }
        }
      })
      that.setData({
        list: newlist,
        loading: false,
        refresh: false,
        imghead: imghead,
        total: total
      })
      if (str) {
        setTimeout(() => {
          if (that.data.nowPageIndex == 0) {
            wx.pageScrollTo({
              scrollTop: 360
            })
          }
        }, 1500)
      }
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
      getApp().getUserInfo(true).then((d) => {
        let userInfo = d;
        that.setData({
          userInfo
        })
        let { gender } = userInfo;
        if (!gender) {
          that.setData({
            showSelectSex: true
          })
        }
        that.getList();
        that.getTopInfoList();
      })
    })
  },
  // 获取置顶列表
  getTopInfoList(){
     let { longitude, latitude} = this.data.param;
     infoModel.getTopInfoList({longitude, latitude}).then(res => {
       let topList = res.data
       topList.map(v => {
          if (v.type_detail && v.type_detail.now_money && v.type_detail && v.type_detail.origin_money && v.type_detail.now_money * 1 < v.type_detail.origin_money * 1) {
            v.discount = Math.round((v.type_detail.now_money / v.type_detail.origin_money) * 1000) / 100
            if(v.discount < 0.1) v.discount = 0.1
            v.discount = String(v.discount).slice(0, 3)
          }
       })
       this.setData({
        topList
       })
     })
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
    let { loading, list } = this.data;
    let {current_page, last_page, per_page, total} = list;
    let len = list.data.length;

    per_page = per_page||20;

    current_page   = Math.floor(len/per_page);

    if (!loading && (current_page != last_page || len < total )) {
      that.setData({
        'param.page': current_page + 1,
        loading: true
      }, function () {
        that.getList();
      })
    }
  },
  delListById(id){
    let list = this.data.list.data
    console.log(list.length)
    for(let i = 0, len = list.length; i < len; i++){
      if (id && list[i].id === id) {
        list.splice(i, 1)
        break
      }
    }
    console.log(list.length)
    this.setData({
      'list.data': list
    })
  },
  previewImage: function (e) {
    let { index, url } = util.getData(e);
    let { list } = this.data;
    let imageList = list.data[index].imgs;
    let id = list.data[index].id;
    let imgArr = [];
    for (let i in imageList) {
      var fileType = imageList[i].path.slice(-4)
      if (fileType !== '.mp4') imgArr.push(imageList[i].path)
    }
    wx.previewImage({
      current: url,
      urls: imgArr,
      success:function(){
        infoModel.addStar({id})
      }
    })
  },
  createFormid: util.throttle(function(e){
    infoModel.createFormId({ form_id: e.detail.formId })
    util.goUrl(e)
  }, 1500),
  createFormidagin: function(e){
    infoModel.createFormId({ form_id: e.detail.formId })    
  },
  checkdetail: util.throttle(function(e){
    // console.log(e)
    if (e.detail.formId) infoModel.createFormId({ form_id: e.detail.formId })
    let { index, url, level } = util.getData(e);
    let id
    // console.log(index, url)
    if (!level) {
      getApp().globalData.detailObj = this.data.list.data[index]
      id = this.data.list.data[index].id
    } else {
      getApp().globalData.detailObj = this.data.topList[index]
      id = this.data.topList[index].id      
    }
    infoModel.addStar({id})
    util.goUrl(e)
  }, 1500),
  goUrl: util.throttle(function(e){
    if (this.data.showLittle) {
      this.data.showLittle = false
      this.setData({
        showLittle: this.data.showLittle
      })
    }
    util.goUrl(e)
  }, 1500),
  goBuyWant: function(){
    wx.navigateTo({url: '/pages/info/addnew/addnew?pagemodel=2&title=我想要'})
  },
  goFree:function(){
    let that=this;
    let is_publish_free = this.data.otherData.is_publish_free;
    if (is_publish_free){
      wx.navigateTo({
        url: '/pages/info/free/free',
      })
    }else{
      that.setData({
        showReleasetip:true
      })
    }
  },
  onPageScroll: util.throttle(function(e) {
    let scrollTop = e.scrollTop
    let showTop;
    if (scrollTop>900){
      showTop = true
    }else{
      showTop = false
    }
    this.setData({
      showTop
    })
  }, 300),
  backtop:function(){
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },
  onShareAppMessage: function(e){
    //只有定义了此事件处理函数，右上角菜单才会显示“转发”按钮
    let title = '附近宝妈都在用的互助社区'
    let path = '/pages/info/index/index'
    let imageUrl = 'http://exchange-001.oss-cn-beijing.aliyuncs.com/images/web/20181123155832.png'
    let index = e.target && e.target.dataset && e.target.dataset.index
    let level = e.target && e.target.dataset && e.target.dataset.level
    let optobj = {}
    if(index === 0 || index) {  
      if (!level) optobj = this.data.list.data[index]
      else optobj = this.data.topList[index]
      title = optobj.title
      let imgnow = optobj.imgs[0]
      // 判断当前第一个是不是视频，视频单独处理
      if (imgnow.type == '.mp4' || imgnow.Ext == 'mp4') {
        imageUrl = imgnow.path + '?x-oss-process=video/snapshot,t_1000,f_jpg,w_0,h_0,m_fast'
      } else {
        imageUrl = imgnow.path
      }
      path = '/pages/info/index/index?detailid=' + optobj.id
    }
    let that = this
    return {
      title: title,
      path: path,
      imageUrl: imageUrl,
      success(d){
        console.log(d)
        console.log('123')
        if (!optobj.id) return
        userModel.share({info_id: optobj.id}).then(tuty => {
          if(tuty.code === 200) {
            let param = 'list.data[' + index +'].share'
            if(level) param = 'topList[' + index +'].share'
            that.setData({
              [param]: 2
            })
          } else {
            that.setData({
              showshareresult: true
            })
          }
        })
      }
    }
  },
  tabChange: function(e){
    let { index}=util.getData(e);
    wx.setNavigationBarTitle({
      title: index== 0 ? "首页" : "我的"
    })
    wx.setNavigationBarColor({
      frontColor: index == 0 ?  '#000000' : "#ffffff",
      backgroundColor: index == 0 ?  '#ffffff' : "#ff6454"
    })
    this.setData({
      nowPageIndex:index
    })
    // wx.setBackgroundColor({
    //   backgroundColor: index == 0 ?  '#ffffff' : "#ff6454",
    //   backgroundColorTop: index == 0 ?  '#ffffff' : "#ff6454"
    // })
  },
  getPosition: function getPosition() {
    var _this = this;
    var app = getApp()
    wx.request({
      url: 'https://apis.map.qq.com/ws/location/v1/ip',
      data: {
        key: 'RHGBZ-S2LAU-5MRV7-4QPTZ-JI25K-HVBDV'
      },
      success: function success(res) {
        console.log('location:', res)
        if (res.data.status !== 0) {
          return
        }
        var cityinfo = res.data.result.ad_info || {}
        var loc = res.data.result.location || {}
        var city = {
          id: String(cityinfo.adcode).slice(0, 4) + '00',
          name: cityinfo.city
        }
        var qytitle = {
          id: cityinfo.adcode,
          name: cityinfo.district,
          fullname: cityinfo.district,
          location:  loc
        }
        app.globalData.chooseCityNow.city = city
        app.globalData.chooseCityNow.qycity = qytitle
        var hasNowCity = {
          country: cityinfo.city,
          qycity: cityinfo.district
        }
        app.globalData.hasNowCity = hasNowCity
        _this.setLocationVal()
      }
    });
  },
  preViewImageNext:function(){
    let that=this;
    let imagePath = this.data.configInfo.extraConfig.qrcode;
    wx.downloadFile({
      url: imagePath,
      header: {},
      success: function(res) {
        console.log(0, res)
        let tempFilePath = res.tempFilePath
        that.setData({
          showErerorMess: false
        })
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success: function (res) {
            that.setData({
              imagePath: tempFilePath,
              show: true
            })
          },
          complete: function (res) {
            if(res.errMsg.indexOf('fail auth deny') > -1) {
              toast.show('warn', "当前没有用户权限，需要授权访问用户相册", 1000);
              that.setData({
                showErerorMess: true
              })
            }
          },
        })
      },
      fail: function(res) {
        console.log(1, res)
      },
      complete: function(res) {
      },
    })
  },
  share: function () {
    util.showLoading("保存中...",false);
    let qrcode = this.data.configInfo.extraConfig.qrcode[0].path;
    let template = {
      background: "/images/test/share.png",
      width: '600rpx',
      height: '900rpx',
      views: [
        {
          type: 'image',
          url: qrcode,
          css: {
            top: '464rpx',
            left: '150rpx',
            width: '300rpx',
            height: '300rpx',
          }
        }
      ]
    }
    this.setData({
      template
    })
  },
  onImgOK(e) {
    util.hideAll();
    let that=this;
    let imagePath = e.detail.path;
    wx.saveImageToPhotosAlbum({
      filePath: imagePath,
      success: function(res) {
        that.setData({
          imagePath,
          show: true
        })
      },
      complete: function(res) {},
    })
  },
  changeMask:function(){
    this.setData({
      show: false
    })
  },
  setidentify(e){
    let age = e.detail.value
    if (age) {
      this.setData({
        'identify.val': age
      })
    } else {
      this.setData({
        'identify.val': ''
      })
    }
  },
  choseidenty(e){
    let { index } = util.getData(e)
    if (!index || index == '0') {
      this.setData({
        'identify.val': '',
        'identify.placeholder': '设置周数',
        'identify.type': 0
      })
    } else {
      this.setData({
        'identify.val': '',
        'identify.placeholder': '设置生日',
        'identify.type': 1
      })      
    }
  },
  setidentifyParam(e){
      this.setData({
        'identify.val': e.detail.value,
        'identify.placeholder': '设置周数',
        'identify.type': 0
      })
  },
  hideReleasetip:function(){
    this.setData({
      showReleasetip:false
    })
  },
  sureidentify: util.throttle(function(){
    let temp = {
      baby_creat_time: '',
      baby_out_time: ''
    }
    if(!this.data.identify.type) {
      if(!this.data.identify.val) util.showModal({ content: "请输入怀孕周数" })
      else {
        temp.baby_creat_time = Math.floor((new Date().getTime() - this.data.identify.val * 7 * 24 * 3600 * 1000) / 1000)
      }
    } else {
      if(!this.data.identify.val) util.showModal({ content: "请输入宝宝生日" })
      else temp.baby_out_time = Math.floor(new Date(this.data.identify.val).getTime() / 1000)
    }
    userModel.updateUserInfo(temp).then(res => {
      util.showSuccess("身份信息录入成功！");
      this.setData({
        showidentify: false
      })
    })
  }, 1500),
  clearlittle: function(){
    this.setData({
      showLittle: false
    })
  },
  clearshowsharebtn(){
    this.setData({
      showshareresult: false
    })
  },
  checkOfficial(e) {
    console.log(e.detail.status)
  }
})