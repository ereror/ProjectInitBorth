import util from '../../../utils/index.js';
import { infoModel, fileModel,userModel } from '../../../apis/index.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that=this;
    getApp().getUserInfo().then((d)=>{
      that.setData({
        userInfo:d
      })
    })
  },
  setParam: function (e) {
    let { key } = util.getData(e);
    let value = util.getValue(e);
    key = `userInfo.${key}`;

    this.setData({
      [key]: value
    })
  },
  chooseImage: function (e) {
    let that=this;
    wx.chooseImage({
      count: 1,
      success: function (res) {

        let tempFiles = res.tempFiles;
        //定义图片id数组
        util.showLoading('上传中')
        fileModel.uploadCan({ filePath: tempFiles[0].path }).then((d) => {
          console.log(d)
          let data=d.data;
          that.setData({
            'userInfo.avatarurl': data.url
          })
          util.hideAll()

        })

      },
    })
  },
  delImage: function (e) {
    this.setData({
      'userInfo.avatarurl':""
    })
  },
  submit:function(){
    let userInfo = this.data.userInfo;
    let { avatarurl, nickname } = userInfo;
    let validate = new util.Validate();
    validate.add(avatarurl, "isNoEmpty", "请上传头像")
    validate.add(nickname, "isNoEmpty", "请填写名称")
    let msg = validate.start();
    if (msg) {
      util.showModal({
        content: msg
      })
      return;
    }
    userModel.save({
      avatarUrl: avatarurl,
      nickName: nickname
    }).then((d)=>{
      util.showSuccess("编辑成功");
      getApp().getUserInfo(true).then(()=>{
        wx.navigateBack({
          delta: 1
        })
      })
    })
  }
})