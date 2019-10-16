import util from '../../../utils/index.js';
import { infoModel, fileModel } from '../../../apis/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    param: {
      id:0,
      categoryid: '',
      content: '',
      imgs:[],
      address: '',
      latitude: 0,
      longitude: 0,
      tag: "",
      'type': '',
      type_detail: ''
    },
    categoryIndex:-1,
    tagList:[],
    tagIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let { index } = options;
    if(index){
      let detail=util.getPage(-1).data.list.data[index];
      let type_detail = detail.type_detail
      let param = Object.assign({}, this.data.param, detail, type_detail)
      this.setData({
        param
      })
    }
    this.firstLoad()
  },
  firstLoad:function(){
    let that=this;
    let { tagIndex}= that.data;
    Promise.all([getApp().getCategoryInfo(),getApp().getConfigInfo()]).then((d)=>{
      let categoryList = d[0];
      let configInfo=d[1];
      let tagList = configInfo.extraConfig.tag_arr
      that.setData({
        categoryList,
        tagList,
        'param.tag': tagList[tagIndex]
      })
    })
    getApp().getCategoryInfo().then((d)=>{
      
    })
  },
  goUrl:function(e){
    util.goUrl(e)
  },
  setParam: function (e) {
    let { key } = util.getData(e);
    let value = util.getValue(e);
    key = `param.${key}`;

    this.setData({
      [key]: value
    })
  },
  categoryChange: function (e) {
    
    let index=e.detail.value;
    let categoryInfo=this.data.categoryList[index]
    let that = this;
    that.setData({
      'param.categoryid': categoryInfo.id,
      'param.categorytitle': categoryInfo.title,
      categoryIndex:index
    })
  },
  chooseLocation: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        let { longitude, latitude, name } = res;
        that.setData({
          'param.latitude': latitude,
          'param.longitude': longitude,
          'param.address': name
        })
      },
    })
  },
  choosevideo: function (e) {
    console.log('摄像头')
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 20,
      camera: 'back',
      success: function(res) {
        console.log(res)
        wx.showLoading({
          title: '发送中...',
        })
      }
    })
  },  
  tagChange:function(e){
    let {index}=util.getData(e);
    this.setData({
      tagIndex:index
    })
  },
  chooseImage: function (e) {
    let that = this;
    let { param } = that.data;
    let { key, size } = util.getData(e);
    let imageList = param[key] || [];
    key = `param.${key}`;

    wx.chooseImage({
      count: size - imageList.length,
      success: function (res) {

        let tempFiles = res.tempFiles;
        //定义图片id数组
        let imageIdList = [];
        // 格式化图片参数

        for (let i = 0; i < tempFiles.length; i++) {
          util.showLoading('上传中')
          fileModel.uploadCan({ filePath: tempFiles[i].path }).then((d) => {
            let data=d.data;
            tempFiles[i].id = data.id;
            tempFiles[i].path=data.url
            imageIdList.push(d);
            //检验传的照片是否重复
            // let repeat = imageList.findIndex((item) => {
            //   return item.id == tempFiles[i].id
            // }) < 0 ? false : true;
            // if (!repeat) {
              
            // }
            imageList = [...imageList, tempFiles[i]];

            that.setData({
              [key]: imageList
            })
            util.hideAll()
          })
        }

      },
    })
  },
  delImage: function (e) {
    let { index, key } = util.getData(e);
    let { param } = this.data;
    let imageList = param[key];
    imageList.splice(index, 1);
    key = `param.${key}`;
    this.setData({
      [key]: imageList
    })
  },
  next:function(){
    let { imgs, address, content,categoryid } = this.data.param;
    if(imgs.length<3){
      util.showModal({content:"请上传3张或3张以上图片"})
      return;
    }
    if (!categoryid) {
      util.showModal({ content: "请选择分类" })
      return;
    }
    if (!address){
      util.showModal({content:"请选择地址"})
      return;
    }
    if (!content) {
      util.showModal({ content: "请填写发布内容" })
      return;
    }
    wx.navigateTo({
      url: '/pages/info/addnext/addnext',
    })
  }
})