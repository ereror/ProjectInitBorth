'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../api/index.js');

var _index2 = _interopRequireDefault(_index);

var _toast = require('../../../static/utils/toast.js');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var posterConfig = {
  pwimgConfig: {
    width: 750,
    height: 1254,
    backgroundColor: '#ff6897',
    debug: false,
    images: [{
      width: 750,
      height: 1254,
      x: 0,
      y: 0,
      borderRadius: 0,
      url: 'https://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/shareimgbg.png'
    }, {
      width: 708,
      height: 993,
      x: 21,
      y: 40,
      borderRadius: 0,
      url: 'https://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/shareimgbg0.png',
      zIndex: 2
    }, {
      width: 682,
      height: 420,
      x: 34,
      y: 60,
      borderRadius: 20,
      url: '../../../images/test.jpg',
      zIndex: 2
    }, {
      width: 220,
      height: 220,
      x: 254,
      y: 680,
      // url: '../../../images/test2.jpeg',
      url: 'https://prizedraw.myxianxiaobao.com//static//xcxcode//sharepool-123-5.jpeg',
      zIndex: 2
    }, {
      width: 750,
      height: 28,
      x: 0,
      y: 1060,
      url: 'https://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/cjsm.png',
      zIndex: 2
    }],
    blocks: [{
      width: 150,
      height: 34,
      x: 520,
      y: 70,
      backgroundColor: '#909090',
      borderRadius: 10,
      zIndex: 40,
      paddingLeft: 10,
      paddingRight: 10,
      opacity: 0.8,
      text: {
        x: 10,
        y: 61,
        baseLine: 'middle',
        text: '陪我抽奖 赞助',
        fontSize: 22,
        color: 'white',
        textAlign: 'center'
      }
    }, {
      width: 750,
      height: 100,
      x: 0,
      y: 480,
      zIndex: 40,
      text: {
        x: 10,
        y: 61,
        baseLine: 'middle',
        text: '奖品：tf经典斩男色黑管口红',
        fontSize: 34,
        color: '#292727',
        textAlign: 'center'
      }
    }, {
      width: 750,
      height: 100,
      x: 0,
      y: 530,
      zIndex: 40,
      text: {
        x: 10,
        y: 61,
        baseLine: 'middle',
        text: '自动开奖 | 12月25日 18:00',
        fontSize: 24,
        color: '#adaaaa',
        textAlign: 'center'
      }
    }, {
      width: 750,
      height: 100,
      x: 0,
      y: 910,
      zIndex: 40,
      text: {
        x: 10,
        y: 61,
        baseLine: 'middle',
        text: '长按识别小程序，参与抽奖',
        fontSize: 24,
        color: '#292727',
        textAlign: 'center'
      }
    }, {
      width: 750,
      height: 100,
      x: 0,
      y: 910,
      zIndex: 40,
      text: {
        x: 10,
        y: 61,
        baseLine: 'middle',
        text: '长按识别小程序，参与抽奖',
        fontSize: 24,
        color: '#292727',
        textAlign: 'center'
      }
    }, {
      width: 700,
      height: 100,
      x: 25,
      y: 1070,
      zIndex: 40,
      text: {
        x: 10,
        y: 61,
        baseLine: 'middle',
        text: '*将邀请图分享给好友，对方参与抽奖后若中奖，您也将',
        fontSize: 24,
        color: 'white',
        textAlign: 'center'
      }
    }, {
      width: 700,
      height: 100,
      x: 85,
      y: 1105,
      zIndex: 40,
      text: {
        x: 10,
        y: 61,
        baseLine: 'middle',
        text: '获得相同的奖品。',
        fontSize: 24,
        color: 'white',
        textAlign: 'left'
      }
    }],
    lines: [{
      startX: 60,
      startY: 635,
      endX: 80,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 90,
      startY: 635,
      endX: 110,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 120,
      startY: 635,
      endX: 140,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 150,
      startY: 635,
      endX: 170,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 180,
      startY: 635,
      endX: 200,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 210,
      startY: 635,
      endX: 230,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 240,
      startY: 635,
      endX: 260,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 270,
      startY: 635,
      endX: 290,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 300,
      startY: 635,
      endX: 320,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 330,
      startY: 635,
      endX: 350,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 360,
      startY: 635,
      endX: 380,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 390,
      startY: 635,
      endX: 410,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 420,
      startY: 635,
      endX: 440,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 450,
      startY: 635,
      endX: 470,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 480,
      startY: 635,
      endX: 500,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 510,
      startY: 635,
      endX: 530,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 540,
      startY: 635,
      endX: 560,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 570,
      startY: 635,
      endX: 590,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 600,
      startY: 635,
      endX: 620,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 630,
      startY: 635,
      endX: 650,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }, {
      startX: 660,
      startY: 635,
      endX: 680,
      endY: 635,
      width: 2,
      zIndex: 40,
      color: '#F74C98'
    }],
    isFirst: false
  }
};
/**
   * [posterConfig description]
   * @type {这里打包后注意，生成分享图第三方组件引起框架冲突，因此需要在打包后面更改些配置}
   *  打开打包后的项目，找到本文件对应的文件夹 
   * 1. json里面加入 组件 
   *  "usingComponents": {
          "poster": "/packages/shareimg/poster/index"
      },
      2， js 里面 引入 poster： import Poster from '../../../packages/shareimg/poster/poster';
   *
   */
import Poster from '../../../packages/shareimg/poster/poster';
exports.default = Page({
  data: {
    posterConfig: posterConfig.pwimgConfig,
    imgsrc: "",
    imgData: {}
  },
  onUnload: function onUnload() {
    // 当前销毁，清空去哪聚的detailNow
    getApp().globalData.detailNow = {};
  },
  onShow: function onShow() {
    // 获取 全局当前详细信息
    this.data.imgData = getApp().globalData.detailNow;
    if (this.data.imgData.id) {
      this.getMyImg();
    } else {
      _toast2.default.show('warn', '当前生成图片信息错误，请联系客服反馈问题', 1000);
    }
  },
  getMyImg: function getMyImg() {
    var _this = this;

    var pool_id = this.data.imgData.id;
    _index2.default.getXcxCode({ pool_id: pool_id }).then(function(res) {
      if (res.code === 200) {
        posterConfig.pwimgConfig.images[3].url = res.data && res.data.url;
        _this.initData();
      }
    });
  },
  initData: function initData() {
    var obj = this.data.imgData;
    posterConfig.pwimgConfig.images[2].url = obj.icon;
    if (obj.sponsor && obj.sponsor.length > 6) {
      obj.sponsor = obj.sponsor.substring(0, 6);
    }
    if (!obj.sponsor) obj.sponsor = '陪我抽奖';
    posterConfig.pwimgConfig.blocks[0].text.text = obj.sponsor + ' 赞助';
    var prizename = obj.prizelist[0].name;
    if (prizename.length > 20) prizename = prizename.substring(0, 20);
    posterConfig.pwimgConfig.blocks[1].text.text = prizename;
    posterConfig.pwimgConfig.blocks[2].text.text = '自动开奖 | ' + obj.endTime;
    this.onCreateOtherPoster();
    console.log(posterConfig.pwimgConfig);
  },
  onPosterSuccess: function onPosterSuccess(e) {
    var _this2 = this;

    var detail = e.detail;
    this.data.imgsrc = detail;
    this.setData({
      imgsrc: this.data.imgsrc
    }, function() {
      if (!_this2.data.isFirst) {
        _this2.data.isFirst = true;
        _this2.previewImage();
      }
    });
  },
  onPosterFail: function onPosterFail(err) {
    console.error(err);
  },
  onShareAppMessage: function onShareAppMessage() {
    var name = getApp().globalData.userInfo && getApp().globalData.userInfo.nickname || '小陪';
    var title = name + '邀请你一起抽奖，来试试手气';
    var imageUrl = this.data.imgsrc;
    return {
      title: title,
      path: '/pages/info/index/index',
      imageUrl: imageUrl,
      success: function success(d) {
        // 成功回调
        console.log('success');
      }
    };
  },
  onCreateOtherPoster: function onCreateOtherPoster() {
    this.setData({ posterConfig: posterConfig.pwimgConfig }, function() {
      Poster.create(true);
    });
  },
  previewImage: function previewImage() {
    wx.previewImage({
      current: this.data.imgsrc,
      urls: [this.data.imgsrc]
    });
  }
});