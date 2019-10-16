'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _system = require('./static/utils/system.js');

var _system2 = _interopRequireDefault(_system);

var _index = require('./static/utils/index.js');

var _index2 = _interopRequireDefault(_index);

var _user = require('./api/user.js');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_user2.default); // <view wx:if="{{item.type !== 'split'}}">{{item.value < 10 && item.value ? '0' + item.value : item.value}}</view>
exports.default = App({
  globalData: {
    imgbaseUrl: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize',
    home_imgsrc: '/images/bg_home_01.png',
    home_hbsrc: '/images/btn_hb_01.png',
    prize_img_icon: '/images/btn_join_01.png',
    prize_img_01: 'https://jdgamess.oss-cn-shanghai.aliyuncs.com/sxs.jpg',
    ad_img_01: '/images/line_01.png',
    ad_img_02: '/images/line_02.png',
    pagePath: '/pages/info/detail/detail',
    prizeData: [],
    winlist: {
      haslist: [],
      uselist: []
    }
  },
  //获取全局用户信息
  getUserInfo: function getUserInfo() {
    var refrensh = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var getMoney = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var that = this;
    var userInfo = that.globalData.userInfo;
    return new Promise(function (resove, reject) {
      //如果已经获取了,并且不刷新
      if (userInfo && !refrensh) {
        resove(userInfo);
      } else {
        // 判断时间记录 是否获取最新用户消息 1分钟
        var nowtime = new Date().getTime();
        if (userInfo && userInfo.reqTime && nowtime - userInfo.reqTime < 60 * 1000 && !getMoney) {
          return;
        }

        _user2.default.getUserinfo().then(function (d) {
          var userInfo = d.data;
          userInfo.reqTime = new Date().getTime();
          that.globalData.userInfo = userInfo;
          if (!userInfo.nickname || !userInfo.nickname.length) {
            wx.getUserInfo({
              lang: 'zh_CN',
              success: function success(res) {
                var userInfos = res.userInfo;
                _user2.default.save(userInfos).then(function (resd) {
                  console.log(resd);
                  var userinfo2 = resd.data;
                });
                userInfos.reqTime = new Date().getTime();
                that.globalData.userInfo = userInfos;
                resove(userInfos);
              },
              fail: function fail(res) {
                wx.navigateTo({
                  url: '/pages/info/auth/auth'
                });
              }
            });
          } else {
            resove(userInfo);
          }
        }).catch(function (e) {
          resove(userInfo);
        });
      }
    });
  },
  saveListPool: function saveListPool() {
    var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var id = arguments[1];
    var prize = arguments[2];

    // prize 是否中奖控制，存在按中奖来，没有则不中奖来。控制是否显示没中奖动画 prize = poolprize 无限制中奖
    var that = this;
    id = id || '';
    if (id) {
      // id表示已打开过
      var idindex = this.globalData.winlist.uselist.indexOf(id);
      if (idindex > -1) {
        this.globalData.winlist.uselist.splice(idindex, 1);
      }
      return;
    }
    if (!list.length) return;
    var haslist = this.globalData.winlist.haslist;
    if (!prize) {
      list.map(function (v) {
        if (v.pool_id && !~haslist.indexOf(v.pool_id * 1)) {
          // 添加进入
          haslist.push(v.pool_id * 1);
          if (!v.status) that.globalData.winlist.uselist.push(v.pool_id * 1);
        }
      });
    } else {
      list.map(function (v) {
        if (v.id && !~haslist.indexOf(v.id * 1)) {
          // 添加进入
          haslist.push(v.id * 1);
          if (v.prize && !v.prize.status && prize != 'poolprize') that.globalData.winlist.uselist.push(v.id * 1);else if (prize === 'poolprize') that.globalData.winlist.uselist.push(v.id * 1);
        }
      });
    }
    wx.setStorage({
      key: "winlist",
      data: this.globalData.winlist
    });
  },
  onLaunch: function onLaunch() {
    _system2.default.attachInfo();
    // 缓存里面保存有中奖记录，主要用于首次打开的情况
    this.globalData.winlist = wx.getStorageSync('winlist');
    if (!this.globalData.winlist) {
      this.globalData.winlist = {
        haslist: [],
        uselist: []
      };
    }
  },
  onShow: function onShow() {
    console.log(_user2.default);
  },
  onHide: function onHide() {}
});