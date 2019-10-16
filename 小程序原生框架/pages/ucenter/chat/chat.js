// chat.js
let toast = require('../../../utils/toast.js');
let chatInput = require('../../../plugin/chat-input/chat-input');
import util from '../../../utils/index.js';
import { chatModel, fileModel } from '../../../apis/index.js';
const appdata = getApp()
var timer;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    textMessage: '',
    chatItems: [],
    list: {
      data: [],
      total:0
    },
    param: {
      other_uid: '',
      page: 1,
      pagesize:100
    },
    refresh:false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    let { uid, nickname } = options;
    that.setData({
      'param.other_uid': uid
    }, function () {
      util.showLoading("加载中")
      that.getList();
    })
    clearInterval(timer)
    timer = setInterval(function () {
      that.setData({
        refresh: true,
        'param.page': 1
      })
      that.getList();
    }, 5000)
    wx.setNavigationBarTitle({
      title: nickname
    })

    that.initData();


  },
  onUnload: function () {
    console.log("卸载")
    clearInterval(timer)
  },
  //获取列表
  getList: function () {
    let that = this;
    let { refresh, param, list } = this.data;
    let { page, other_uid } = param;
    chatModel.getList({ other_uid, page }).then((d) => {
      util.hideAll();
      let oldlist = list;
      let newlist = d.data;
      newlist.data.reverse()
      //新数据为空,则设为默认值
      if (util.isEmpty(newlist)) {
        newlist = {
          data: []
        }
      }

      //如果刷新,则不加载老数据
      if (!refresh) {
        newlist.data = [...newlist.data, ...oldlist.data];
      }
      that.setData({
        list: newlist,
        loading: false,
        refresh: false
      }, function () {
        //旧数据为空，第一次加载
        if (util.isEmpty(oldlist.data)) {
          console.log('第一次加载')
          that.pageScrollToBottom()
        }
        
      })
      util.hideAll()
    })
  },
  getMore: function () {
    let that = this;
    let { loading, list } = this.data;
    let { current_page, last_page } = list;
    if (current_page != last_page && !loading) {
      that.setData({
        'param.page': current_page + 1,
        loading: true
      }, function () {
        that.getList();
      })
    }
  },
  initData: function () {
    let that = this;
    let systemInfo = wx.getSystemInfoSync();
    chatInput.init(this, {
      systemInfo: systemInfo,
      minVoiceTime: 1,
      maxVoiceTime: 60,
      startTimeDown: 56,
      format: 'mp3',//aac/mp3
      sendButtonBgColor: 'mediumseagreen',
      sendButtonTextColor: 'white',
      extraArr: [{
        picName: 'choose_picture',
        description: '照片'
      },
      // {
      //   picName: 'take_photos',
      //   description: '拍摄'
      // },
        // {
        //     picName: 'close_chat',
        //     description: '自定义功能'
        // }
      ],
      // tabbarHeigth: 48
    });

    that.setData({
      pageHeight: systemInfo.windowHeight,
    });
    that.textButton();
    that.extraButton();
    that.voiceButton();
  },
  textButton: function () {
    var that = this;
    chatInput.setTextMessageListener(function (e) {
      let content = e.detail.value;
      let { list, param } = that.data;
      chatModel.chatTo({ content, other_uid: param.other_uid, kind: 'txt' }).then((d) => {
        console.log(d)
        let detail = d.data;
        detail.is_myself = true;
        list.data.push(detail);
        that.setData({
          list
        }, function () {
          that.pageScrollToBottom()
        })
      }).then(() => {
        chatModel.sendChatNotify({ content, other_uid: param.other_uid, kind: 'txt', form_id: '', page: '/pages/info/index/index'})
      })
    });
  },
  voiceButton: function () {
    var this_ = this;
    chatInput.recordVoiceListener(function (res, duration) {
      console.log(111111)
      let tempFilePath = res.tempFilePath;
      let vDuration = res.duration;
      console.log('我的录音：');
      console.log(tempFilePath, vDuration);
      let chatItemsarr = this_.data.chatItems;
      chatItemsarr.push({
        fromid: 1,//0:自己，1：朋友
        type: 'vioce',//txt文字，img图片，vioce语音
        content: {
          path: tempFilePath,
          dration: vDuration,
          isread: 0
        }
      })
      this_.setData({
        chatItems: chatItemsarr
      })
      this_.pageScrollToBottom()
    });
    chatInput.setVoiceRecordStatusListener(function (status) {
      switch (status) {
        case chatInput.VRStatus.START://开始录音

          break;
        case chatInput.VRStatus.SUCCESS://录音成功

          break;
        case chatInput.VRStatus.CANCEL://取消录音

          break;
        case chatInput.VRStatus.SHORT://录音时长太短

          break;
        case chatInput.VRStatus.UNAUTH://未授权录音功能

          break;
        case chatInput.VRStatus.FAIL://录音失败(已经授权了)

          break;
      }
    })
  },
  extraButton: function () {
    let that = this;
    chatInput.clickExtraListener(function (e) {
      console.log(e);
      let itemIndex = parseInt(e.currentTarget.dataset.index);
      if (itemIndex === 1) {
        wx.chooseVideo({
          maxDuration: 10,
          success: function (res) {
            console.log(res)
            let tempFilePath = res.tempFilePath;
            let thumbTempFilePath = res.thumbTempFilePath;
            wx.showLoading({
              title: '发送中...',
            })
            fileModel.upload({ filePath: tempFilePath, formData: { uploadtype: 'file' } }).then((videoId) => {
              console.log(videoId);
              //成功选择图片
              let { list, param } = that.data;

              chatModel.chatTo({ content: videoId, cover: 0, other_uid: param.other_uid, kind: 'video' }).then((d) => {
                console.log(d);
                util.hideAll()
                let detail = d.data;
                detail.is_myself = true;
                list.data.push(detail);
                that.setData({
                  list
                }, function () {
                  that.pageScrollToBottom()
                })
              }).then(() => {
                chatModel.sendChatNotify({ content: videoId, other_uid: param.other_uid, kind: 'video', page: '/pages/info/index/index'})
              })
            })
          },
          fail: function (res) { },
          complete: function (res) { },
        })
        return;
      }
      if (itemIndex === 2) {
        that.myFun();
        return;
      }
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],
        sourceType: itemIndex === 0 ? ['album'] : ['camera'],
        success: function (res) {
          let tempFiles = res.tempFiles;
          wx.showLoading({
            title: '发送中...',
          })
          fileModel.uploadCan({ filePath: tempFiles[0].path }).then((d) => {
            //成功选择图片
            let { list, param } = that.data;

            chatModel.chatTo({ content: d.data.id, other_uid: param.other_uid, kind: 'img' }).then((d) => {
              util.hideAll()
              let detail = d.data;
              detail.is_myself = true;
              list.data.push(detail);
              that.setData({
                list
              }, function () {
                that.pageScrollToBottom()
              })
            }).then(() => {
                chatModel.sendChatNotify({ content: d.data.id, other_uid: param.other_uid, kind: 'img', page: '/pages/info/index/index'})
            })
            that.pageScrollToBottom()
          })

        }
      });
    });
    chatInput.setExtraButtonClickListener(function (dismiss) {
      console.log('Extra弹窗是否消息', dismiss);
    })
  },
  myFun: function () {
    wx.showModal({
      title: '小贴士',
      content: '这是用于拓展的自定义功能！',
      confirmText: '确认',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          toast.show('success', '自定义功能')
        }
      }
    })
  },

  resetInputStatus: function () {
    chatInput.closeExtraView();
  },
  pageScrollToBottom: function () {
    wx.createSelectorQuery().select('.speak_box').boundingClientRect(function (rect) {
      // 使页面滚动到底部
      console.log(rect)
      wx.pageScrollTo({
        scrollTop: rect.height
      })
    }).exec()
  },
  showbigimg: function (e) {
    console.log(e)
    wx.previewImage({
      current: e.currentTarget.dataset.imgurl,
      urls: [e.currentTarget.dataset.imgurl]
    })
  },
  playvoice: function (e) {
    console.log(e)
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = e.currentTarget.dataset.voiceurl
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
  },
  goUrl: function (e) {
    util.goUrl(e)
  },
  hideExtra: function (e) {
    this.setData({
      'inputObj.extraObj.chatInputShowExtra': false
    })
  }
});