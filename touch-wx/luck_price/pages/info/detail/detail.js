'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _data;

var _index = require('../../../static/utils/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../api/index.js');

var _index4 = _interopRequireDefault(_index3);

var _toast = require('../../../static/utils/toast.js');

var _toast2 = _interopRequireDefault(_toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var WxParse = require('../../../static/libs/wxParse/wxParse.js');
var app = getApp();
exports.default = Page({
  data: (_data = {
    id: '',
    ademptyImg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/adempty2.jpg',
    home_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/bg_home_01.png',
    home_hbsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/btn_hb_01.png',
    prize_img_icon: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/btn_join_01.png',
    prize_joined: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/prize_joined.png',
    ad_img_01: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_01.png',
    ad_img_02: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/line_02.png',
    zzs_bg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/zzs_bg.png',
    lostsad: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/lostsad.png',
    hb_bg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbg.png',
    winprize_bg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/winprize_bg.png',
    winprizeimg_01: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon-ypx.png',
    winprizeimg_02: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon-yfh.png',
    winprizeimg_03: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon-ysd.png',
    lostprizeimg_04: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/icon-dsh.png',
    zd0: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/zd_0.png',
    sharefriend: '/images/lh-icon.png',
    usersPath: '/pages/info/users/users',
    shareimgfriend: 'https://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/sharefriends02.png',
    isCurrent: 0,
    isCurrentTop: 0,
    showshare: false, // 是否显示更多分享操作
    prizeResult: false, // 是否已经开奖
    showIsjoin: false, // 正在开奖，首次进入时候打开
    prizesend: false, // 奖品已送达
    isJson: false, //是否参与抽奖
    isgoodsend: false, // 是否发货
    popmaskStyle: {
      'background-color': 'rgba(0,0,0,.5)'
    },
    timeStyle: { // 倒计时样式
      'background-color': 'white',
      'color': '#FF6697',
      'padding-left': '4rpx',
      'padding-right': '4rpx',
      'margin-left': '8rpx',
      'margin-right': '8rpx',
      'border-radius': '4rpx',
      'font-size': '24rpx',
      'font-weight': '600',
      'height': '40rpx',
      'line-height': '40rpx',
      'width': '40rpx',
      'text-align': 'center'
    },
    splitStyle: {
      'font-size': '24rpx'
    },
    money: 0.00,
    mask: {
      height: "100%",
      width: "100%",
      position: "fixed",
      "z-index": "477",
      background: "rgba(0,0,0,.5)"
    },
    mession: {
      isfirst: false, // 是否第一次进来
      show: false,
      mask: {
        height: "100%",
        width: "100%",
        position: "fixed",
        "z-index": "477",
        background: "rgba(0,0,0,.5)"
      },
      ismodel: 'origin',
      isoverimg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/isover.png',
      winimg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/win.png',
      winbg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/winbg.png',
      lostbg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/prize_lost.png',
      nomsg: '活动结束了~',
      hasmsg: '恭喜中奖啦~'
    },
    detailDataDetail: {}, // 详细数据
    touchDot: 0,
    touchpdtDot: 0,
    isShowDes: '',
    touchAction: false,
    pdtdirection: 0,
    interval: {},
    time: 0, // 滑动技术
    direction: 0 }, _defineProperty(_data, 'home_imgsrc', 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/bg_home_02.png'), _defineProperty(_data, 'hb_imgsrc', 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbg_01.png'), _defineProperty(_data, 'openhb_img', 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/open_btn.png'), _defineProperty(_data, 'hb_imgsrc2', 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbg_03.png'), _defineProperty(_data, 'hb_imgsrc3', 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbbg_04.png'), _defineProperty(_data, 'hb_icon', 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/himg_01.jpg'), _defineProperty(_data, 'jointotal', 0), _defineProperty(_data, 'joinData', []), _defineProperty(_data, 'prizeType', 0), _defineProperty(_data, 'ishowHb_btn', false), _defineProperty(_data, 'isopenhb', false), _defineProperty(_data, 'iscount', false), _defineProperty(_data, 'endTime', 0), _defineProperty(_data, 'address', {}), _defineProperty(_data, 'isagin', false), _defineProperty(_data, 'prizeId', ''), _defineProperty(_data, 'idsarr', []), _defineProperty(_data, 'ids', ''), _defineProperty(_data, 'moreData', []), _defineProperty(_data, 'addr_list', []), _defineProperty(_data, 'isFirst', false), _defineProperty(_data, 'winlist', []), _defineProperty(_data, 'showBtnBox', false), _defineProperty(_data, 'isShowNext', false), _defineProperty(_data, 'pdtStatus', false), _defineProperty(_data, 'isokDetail', false), _defineProperty(_data, 'wxHeight', 0), _data),
  onLoad: function onLoad(param) {
    // 分享链接
    if (!app.globalData.userInfo) {
      app.getUserInfo();
    }
    this.data.id = param.id;
    this.data.ids = param.ids || '';
    this.data.idsarr = this.data.ids && this.data.ids.split(',') || [];
    this.data.adviser = param.adviser || '';
    this.data.prizeId = param.prizeId;
    this.data.wxHeight = wx.WIN_HEIGHT;
    if (!this.data.ids || !this.data.idsarr.length) {
      this.getListForIds();
    }
    if (this.data.id) {
      this.getDetail();
    }
    this.setData({
      id: this.data.id,
      wxHeight: this.data.wxHeight
    });
  },
  onShow: function onShow() {
    var _this = this;

    this.data.addr_list = app.globalData.userInfo && app.globalData.userInfo.addr_list || [];
    this.data.winlist = app.globalData.winlist;
    if (!this.data.address.id) {
      this.data.addr_list.map(function (v) {
        if (v.used) _this.data.address = v;
      });
    }
  },
  catchmove: function catchmove(e) {
    console.log('阻止滚动穿透！');
  },
  nextDelFunc: function nextDelFunc(e) {
    var that = this;
    var obj = this.data.moreData[1];
    if (obj && obj.id) {
      if (obj.id) this.data.id = obj.id;
      this.data.detailDataDetail = Object.assign({}, obj);
      this.setFormData(this.data.detailDataDetail);
      this.data.moreData.shift();
      this.setData({
        moreData: this.data.moreData,
        isCurrent: 0,
        isCurrentTop: 0,
        id: this.data.id
      });
    }
  },
  textForBtn: function textForBtn() {
    if (this.data.moreData.length === 1) {
      console.log('滚动加载下一条数据');
      var id = this.data.idsarr.shift();
      if (id === this.data.id) {
        id = this.data.idsarr.shift();
      }
      if (id) this.getDetail(true, id);else return _toast2.default.show('warn', '当前已没有开奖的奖品了，请明天再来！', 1000);
      this.setData({
        moreData: this.data.moreData
      });
    }
  },
  getListForIds: function getListForIds() {
    var _this2 = this;

    _index4.default.getList().then(function (res) {
      if (res.code === 200) {
        var idsarr = [];
        _this2.data.prizeData = res.data;
        _this2.data.prizeData.map(function (v) {
          if (v.id != _this2.data.id) idsarr.push(v.id);
        });
        _this2.data.ids = idsarr.join(',');
        _this2.data.idsarr = idsarr;
      }
    });
  },

  onShareAppMessage: function onShareAppMessage(e) {
    var that = this;
    var title = app.globalData.userInfo.nickname + '正在抽奖！快来试试手气！';
    return {
      title: title,
      path: '/pages/info/index/index?poolid=' + that.data.id + '&adviser=' + app.globalData.userInfo.id,
      success: function success(d) {
        // 成功回调
        console.log('success');
      }
    };
  },
  getDetail: function getDetail(isnext, id) {
    var _this3 = this;

    var pool_id = id || this.data.id;
    _index4.default.getDetail({ pool_id: pool_id }).then(function (res) {
      if (res.code === 200) {
        // let detailData = this.data.detailData
        var detailData = res.data;
        detailData.prizelist = JSON.parse(detailData.prizelist);
        detailData.endTime = _index2.default.formatTime(detailData.end_time * 1000, 'YY-M-D h:m:s');
        detailData.openTime = detailData.end_time * 1000;
        // 为content处理图片自适应
        if (detailData.sponsor.length > 20) detailData.sponsor = detailData.sponsor.substring(0, 20);
        // 当前元素赋值
        if (isnext) {
          _this3.data.moreData.push(detailData);
        } else {
          _this3.data.detailDataDetail = Object.assign({}, detailData);
          _this3.setFormData(detailData);
          _this3.data.moreData.unshift(detailData);
        }
        _this3.setData({
          moreData: _this3.data.moreData
        });
      }
    });
  },
  setFormData: function setFormData(detailData) {
    var _this4 = this;

    var that = this;
    if (detailData.prize && detailData.prize.status >= 1) {
      var addrid = detailData.prize && detailData.prize.addr_id;
      this.data.addr_list.map(function (v) {
        if (v.id == addrid) {
          _this4.data.address = v;
        }
      });
    }
    this.data.isJson = detailData.joined === 1;
    this.setStatus();
    this.getJoinList();
    var optreg = /(?:\<img)/gi;
    var content = detailData.content.replace(optreg, function (word) {
      return word + ' mode="widthFix"';
    });
    WxParse.wxParse('content', 'html', content, that, 5);
    this.setData({
      isJson: this.data.isJson,
      address: this.data.address,
      touchAction: false
    });
  },
  goshareimg: function goshareimg() {
    app.globalData.detailNow = this.data.detailDataDetail;
    wx.navigateTo({
      url: '/pages/info/shareimg/shareimg'
    });
  },
  updateList: function updateList() {
    var model = -1;
    _index2.default.getPage(model).getList();
  },
  setStatus: function setStatus() {
    var that = this;
    var data = this.data;
    var id = this.data.id * 1;
    var isover = this.isDetailOver(data.detailDataDetail.end_time * 1000);
    // 处理订单详情状态 是否已开奖
    data.prizeResult = data.detailDataDetail.status === 1;
    if (data.prizeResult) {
      // 开奖判断是否第一次打开,红包不在此列
      if (!!~this.data.winlist.haslist.indexOf(id) && !!~this.data.winlist.uselist.indexOf(id)) {
        this.data.isFirst = true;
        app.saveListPool([], id);
      } else {
        this.data.isFirst = false;
      }
      // 是否还没领奖
      data.mession.isfirst = this.data.isFirst;
      data.mession.show = data.mession.isfirst;
    }
    // 参与本次活动
    if (data.detailDataDetail.joined) {
      // 中奖
      if (!!data.detailDataDetail.prize) {
        // 1,实物 2, 虚拟 3，红包
        data.prizeType = data.detailDataDetail.prize.prize_type * 1;
        if (data.prizeType != 3 && data.prizeType != 0) {
          data.mession.ismodel = 'win';
        }
        if (data.prizeType == 3) {
          data.mession.show = false;
        }
        if (isover && !detailDataDetail.status) {
          data.mession.ismodel = 'isover';
          data.mession.show = true;
        }
      } else {
        data.mession.ismodel = 'lost';
      }
      if (!data.prizeResult) data.isJson = true;
    } else {
      if (isover) {
        data.mession.ismodel = 'isover';
        data.mession.show = true;
      }
    }
    this.setData({
      'mession': data.mession,
      prizeType: data.prizeType,
      prizeResult: data.prizeResult
    });
    setTimeout(function () {
      that.setData({
        isokDetail: true
      });
    }, 500);
    // 1s 后自动关闭中奖消息
    setTimeout(function () {
      that.data.mession.show = false;
      that.data.isFirst = false;
      that.setData({
        'mession.isfirst': that.data.mession.isfirst,
        'mession.show': that.data.mession.show
      });
      that.getScrollHeight();
    }, 1000);
    setTimeout(function () {
      that.setData({
        isokDetail: false
      });
    }, 1500);
  },
  isDetailOver: function isDetailOver(time) {
    // 判断当前是否已过期
    var isover = new Date().getTime() - new Date(time).getTime() > 3 * 24 * 60 * 60 * 1000;
    return isover;
  },

  checkDetailFh: _index2.default.throttle(function checkDetailFh(e) {
    var _util$getData = _index2.default.getData(e),
        url = _util$getData.url;

    if (!this.data.address.id) {
      _toast2.default.show('warn', '申请发货前请填写地址！', 1000);
      return;
    }
    wx.navigateTo({
      url: url + '?addr=' + JSON.stringify(this.data.address) + '&prizeId=' + this.data.prizeId + "&prizeName=" + this.data.detailDataDetail.prize.prize_name
    });
  }, 1500),
  checkDetail: _index2.default.throttle(function checkDetail(e) {
    var _util$getData2 = _index2.default.getData(e),
        url = _util$getData2.url,
        id = _util$getData2.id;

    wx.navigateTo({
      url: url + '?id=' + id
    });
  }, 1500),
  checkDetailAddr: _index2.default.throttle(function checkDetailAddr(e) {
    var _util$getData3 = _index2.default.getData(e),
        url = _util$getData3.url,
        id = _util$getData3.id;

    if (this.data.detailDataDetail.prize && this.data.detailDataDetail.prize.status) {
      return;
    }
    wx.navigateTo({
      url: url + '?id=' + id
    });
  }, 1500),
  goUrl: _index2.default.throttle(function goUrl(e) {
    var _util$getData4 = _index2.default.getData(e),
        type = _util$getData4.type;

    if (type === 'addrdetail' && !this.data.addr_list.length) {
      wx.navigateTo({
        url: '/pages/info/addressadd/addressadd?type=detail'
      });
    } else {
      _index2.default.goUrl(e);
    }
  }, 1500),
  goDirect: _index2.default.throttle(function goDirect(e) {
    wx.navigateBack();
  }, 1500),
  handleShowMask: function handleShowMask() {
    this.data.mession.show = false;
  },
  handleShowMask1: function handleShowMask1(e) {
    this.data.showIsjoin = false;
    this.setData({
      'showIsjoin': this.data.showIsjoin
    });
  },
  joinActivity: function joinActivity() {
    var _this5 = this;

    // 加入活动
    var id = this.data.id;
    var that = this;
    if (!id || this.data.isJson) return;
    var temp = {
      pool_id: id,
      adviser: that.data.adviser
    };
    _index4.default.joinPool(temp).then(function (res) {
      if (res.code === 200) {
        _this5.data.isJson = true;
        _this5.data.detailDataDetail.endTime = (_this5.data.detailDataDetail.end_time * 1000 - new Date().getTime()) / 1000;
        if (_this5.data.detailDataDetail.endTime < 0) {
          _toast2.default.show('warn', '活动已经结束了，下次早点来！', 1000);
          _this5.data.prizeResult = true;
          _this5.data.showIslost = true; // 活动结束按照没有中奖对待
          _this5.setData({
            prizeResult: _this5.data.prizeResult,
            showIslost: true
          });
          return;
        } else {
          _toast2.default.show('success', '参与抽奖成功！', 1000);
          _this5.getJoinList();
          // 已参加活动，等待开奖
          _this5.updateList();
          _this5.setData({
            isJson: _this5.data.isJson,
            endTime: _this5.data.endTime
          });
          setTimeout(function () {
            that.setData({
              touchAction: true
            });
          }, 1000);
        }
      } else {
        _toast2.default.show('warn', '参与抽奖失败，请稍后重试！', 1000);
      }
    }).catch(function (e) {
      _toast2.default.show('warn', '参与抽奖失败，请稍后重试！', 1000);
    });
  },
  detailTouchStart: function detailTouchStart(e) {
    this.data.touchDot = e.touches[0].pageX; // 获取触摸时的原点 
    // 使用js计时器记录时间
    var that = this;
    this.data.interval = setInterval(function () {
      that.data.time++;
    }, 100);
  },
  copyContent: function copyContent(e) {
    var _util$getData5 = _index2.default.getData(e),
        namestr = _util$getData5.namestr;

    if (namestr.length) {
      wx.setClipboardData({
        data: namestr,
        success: function success(res) {
          _toast2.default.show('warn', '复制成功，快去添加或者关注Ta吧!', 1000);
          wx.getClipboardData({
            success: function success(res) {
              // toast.show('warn', '复制成功，快去添加或者关注Ta吧!', 1000)
            }
          });
        },
        complete: function complete(res) {}
      });
    }
  },
  detailTouchMove: function detailTouchMove(e) {
    var touchMove = e.touches[0].pageX;
    if (touchMove - this.data.touchDot <= -40 && this.data.time < 10) {
      this.data.direction = 0;
    }
    if (touchMove - this.data.touchDot >= 40 && this.data.time < 10) {
      this.data.direction = 1;
    }
  },
  detailTouchEnd: function detailTouchEnd(e) {
    clearInterval(this.data.interval);
    this.data.time = 0;
    if (this.data.direction) {
      this.setData({
        touchAction: false
      });
    } else {
      this.setData({
        touchAction: true
      });
    }
  },
  getJoinList: function getJoinList() {
    var _this6 = this;

    _index4.default.getHeaderList({ pool_id: this.data.id, page: 1, pageSize: 10 }).then(function (res) {
      console.log(res);
      if (res.code === 200) {
        _this6.data.joinData = res.data && res.data.data || [];
        _this6.data.jointotal = res.data && res.data.total || 0;
        _this6.setData({
          joinData: _this6.data.joinData,
          jointotal: _this6.data.jointotal
        });
      }
    });
  },

  onReachBottom: function onReachBottom() {
    console.log('继续上滑，参与下一个抽奖！');
    this.data.showBtnBox = true;
    this.setData({
      showBtnBox: this.data.showBtnBox
    });
  },
  clickad: function clickad() {
    // 打开红包
    this.data.ishowHb_btn = true;
    this.setData({
      ishowHb_btn: this.data.ishowHb_btn
    });
  },
  sharefunc: function sharefunc(e) {
    var _util$getData6 = _index2.default.getData(e),
        type = _util$getData6.type;

    this.data.showshare = !this.data.showshare;
    if (type === 'share') {
      this.data.showshare = true;
    }
    this.setData({
      showshare: this.data.showshare
    });
  },
  goComent: function goComent() {
    setTimeout(function () {
      wx.createSelectorQuery().select('#winAll').boundingClientRect(function (rect) {
        console.log(rect.top);
        var top = rect.top;
        wx.pageScrollTo({
          scrollTop: top
        });
      }).exec();
    }, 1000);
  },
  createFormId: function createFormId(e) {
    if (e.detail.formId) _index4.default.sendFormId({ form_id: e.detail.formId });
  },
  openGift: function openGift() {
    var _this7 = this;

    var id = this.data.detailDataDetail.prize && this.data.detailDataDetail.prize.id || '';
    if (!id) return;
    if (this.data.iscount) return;
    this.data.iscount = true;
    this.setData({
      iscount: this.data.iscount
    });
    _index4.default.getHb({ id: id }).then(function (res) {
      _this7.data.iscount = false;
      if (res.code === 200) {
        _this7.data.isopenhb = true;
        _this7.data.iscount = false;
        _this7.data.money = res.data.money / 100;
        _this7.setData({
          isopenhb: _this7.data.isopenhb,
          iscount: _this7.data.iscount,
          money: _this7.data.money
        }, function () {
          app.getUserInfo(true);
        });
      } else {
        _toast2.default.show('warn', '红包打开失败，请稍后重试！', 1000);
        _this7.setData({
          iscount: _this7.data.iscount
        });
      }
    });
  },

  getScrollHeight: function getScrollHeight() {
    var _this8 = this;

    wx.createSelectorQuery().select('#pdt').boundingClientRect(function (rect) {
      _this8.data.scrollHeight = rect.height;
      console.log('滚动高度', _this8.data.scrollHeight);
    }).exec();
  },
  onPageScroll: function onPageScroll(e) {
    // e.scrollTop = 0;
    // if (e.scrollTop <= 0) {
    //  // 滚动到最顶部
    //   e.scrollTop = 0;
    // } else if (e.scrollTop > this.data.scrollHeight) {
    //   // 滚动到最底部
    //   if (!this.data.isShowNext) e.scrollTop = this.data.scrollHeight;
    // }
    // if ((e.scrollTop > this.data.scrollTop) && (e.scrollTop >= this.data.scrollHeight - 760)) {
    //   //向下滚动 
    // } else if ((e.scrollTop < this.data.scrollTop) && (e.scrollTop <= this.data.scrollHeight - 760)) {
    //   //向上滚动 
    // }
    // this.setData({
    //   scrollTop: e.scrollTop
    // })
  }
});