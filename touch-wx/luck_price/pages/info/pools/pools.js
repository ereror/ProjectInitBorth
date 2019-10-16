'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../api/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../static/utils/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = Page({
  data: {
    ademptyImg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/adempty2.jpg',
    hbimgbg: 'https://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbimg.png?x-oss-process=style/luck_prize_two',
    home_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/bg_home_02.png',
    hb_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbg_01.png',
    openhb_img: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/open_btn.png',
    hb_imgsrc2: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbg_03.png',
    hb_imgsrc3: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbbg_04.png',
    hb_icon: '../../../images/pmark.png',
    prizeData: [],
    prizeNowData: [],
    prize_img_icon: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/btn_join_01.png',
    pagePath: '/pages/info/detail/detail',
    numberStyle: {
      'background-color': '#292727',
      'color': '#fff',
      'padding-left': '4rpx',
      'padding-right': '4rpx',
      'margin-left': '12rpx',
      'margin-right': '12rpx',
      'border-radius': '4rpx',
      'font-size': '26rpx',
      'height': '42rpx',
      'width': '42rpx',
      'display': 'inline-block',
      'text-align': 'center',
      'line-height': '42rpx'
    },
    splitStyle: {
      'color': '#292727',
      'font-size': '26rpx'
    },
    showHb: false,
    ishowHb_btn: false,
    isopenhb: false,
    iscount: false,
    query: {
      page: 1,
      pageSize: 20,
      current_page: 1,
      last_page: 1
    },
    money: 0.00,
    type: 0,
    isloaded: true
  },
  onLoad: function onLoad() {
    this.getMyJoinList();
  },
  onShow: function onShow() {},
  handleShowMask: function handleShowMask() {
    this.data.showHb = false;
    this.data.isopenhb = false;
    this.data.ishowHb_btn = false;
    this.setData({
      showHb: this.data.showHb,
      isopenhb: this.data.isopenhb,
      ishowHb_btn: this.data.ishowHb_btn
    });
  },
  createFormId: function createFormId(e) {
    if (e.detail.formId) _index2.default.sendFormId({ form_id: e.detail.formId });
  },
  clickad: function clickad() {
    this.data.ishowHb_btn = true;
    this.setData({
      ishowHb_btn: this.data.ishowHb_btn
    });
  },

  goUrl: _index4.default.throttle(function goUrl(e) {
    var _util$getData = _index4.default.getData(e),
        type = _util$getData.type,
        id = _util$getData.id,
        status = _util$getData.status;

    if (type * 1 === 3 && status !== 0 || type * 1 != 3) _index4.default.goUrl(e);else {
      if (status != 0) return;
      this.data.showHb = true;
      this.data.openid = id;
      this.setData({
        showHb: this.data.showHb
      });
    }
  }, 1500),
  openGift: function openGift() {
    var _this = this;

    var id = this.data.openid;
    if (!id) return;
    if (this.data.iscount) return;
    this.data.iscount = true;
    this.setData({
      iscount: this.data.iscount
    });
    _index2.default.getHb({ id: id }).then(function (res) {
      _this.data.iscount = false;
      if (res.code === 200) {
        _this.data.isopenhb = true;
        _this.data.money = res.data && res.data.money;
        _this.data.money = _this.data.money / 100;
        _this.getMyJoinList();
        getApp().getUserInfo(true, true);
        _this.setData({
          isopenhb: _this.data.isopenhb,
          iscount: _this.data.iscount,
          money: _this.data.money || 0.00
        });
      } else {
        _this.setData({
          iscount: _this.data.iscount
        });
      }
    });
  },
  getMyJoinList: function getMyJoinList() {
    var _this2 = this;

    // 获取参加的抽奖
    var query = this.data.query;
    if (!this.data.isloaded) return;
    this.data.isloaded = false;
    _index4.default.showLoading('加载中...');
    _index2.default.getMyJoinList(query).then(function (res) {
      _index4.default.hideAll();
      _this2.data.isloaded = true;
      if (res.code === 200) {
        var result = res.data && res.data.data;
        var prizeData = result.filter(function (v) {
          v.endTime = _index4.default.formatTime(v.end_time * 1000, 'YY-M-D h:m:s');
          v.timeend = v.end_time * 1000;
          v.prizelist = JSON.parse(v.prizelist);
          if (v.sponsor.length > 20) v.sponsor = v.sponsor.substring(0, 20);
          return v.status === 0;
        });
        var prizeNowData = result.filter(function (v) {
          v.endTime = _index4.default.formatTime(v.end_time * 1000, 'YY-M-D h:m:s');
          return v.status === 1;
        });
        _this2.data.prizeNowData = [].concat(_toConsumableArray(_this2.data.prizeNowData), _toConsumableArray(prizeNowData));
        _this2.data.prizeData = [].concat(_toConsumableArray(_this2.data.prizeData), _toConsumableArray(prizeData));
        _this2.data.query.last_page = res.data.last_page;
        _this2.data.query.current_page = _this2.data.query.page;
        // 从全部中奖消息里面提取中奖到中奖池里面
        getApp().saveListPool(_this2.data.prizeNowData, '', 'poolprize');
        _this2.setData({
          prizeData: _this2.data.prizeData || [],
          prizeNowData: _this2.data.prizeNowData || [],
          isloaded: _this2.data.isloaded,
          query: _this2.data.query
        });
      }
    });
  },

  onPullDownRefresh: function onPullDownRefresh() {
    this.getMyJoinList();
  },
  checkMore: function checkMore() {
    var that = this;
    var _data$query = this.data.query,
        current_page = _data$query.current_page,
        last_page = _data$query.last_page;

    if (current_page !== last_page) {
      this.data.query.page = current_page + 1;
      this.getMyJoinList();
    }
  }
});