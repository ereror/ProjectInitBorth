'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../../../static/utils/index.js');

var _index2 = _interopRequireDefault(_index);

var _index3 = require('../../../api/index.js');

var _index4 = _interopRequireDefault(_index3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Page({
  data: {
    ademptyImg: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/adempty2.jpg',
    home_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/bg_home_02.png',
    hb_imgsrc: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbg_01.png',
    openhb_img: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/open_btn.png',
    hb_imgsrc2: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbg_03.png',
    hb_imgsrc3: 'http://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbbg_04.png',
    hbimgbg: 'https://exchange-001.oss-cn-beijing.aliyuncs.com/luck_prize/images/hbimg.png?x-oss-process=style/luck_prize_two',
    hb_icon: '../../../images/pmark.png',
    mask: {
      height: "100%",
      width: "100%",
      position: "fixed",
      "z-index": "477",
      background: "rgba(0,0,0,.5)"
    },
    showHb: false,
    ishowHb_btn: false,
    isopenhb: false,
    iscount: false,
    query: {
      page: 1,
      pageSize: 10,
      current_page: 1,
      last_page: 1
    },
    giftData: [],
    money: 0.00,
    type: 0,
    isloaded: false
  },
  onLoad: function onLoad(param) {
    this.data.type = param.type || 0;
  },
  onShow: function onShow() {
    this.getGiftList();
  },
  createFormId: function createFormId(e) {
    if (e.detail.formId) _index4.default.sendFormId({ form_id: e.detail.formId });
  },
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
  clickad: function clickad() {
    this.data.ishowHb_btn = true;
    this.setData({
      ishowHb_btn: this.data.ishowHb_btn
    });
  },
  getGiftList: function getGiftList() {
    var _this = this;

    // 获取中奖详情
    var query = this.data.query;
    _index2.default.showLoading('加载中...');
    _index4.default.getGiftList(query).then(function (res) {
      _index2.default.hideAll();
      _this.data.isloaded = true;
      if (res.code === 200) {
        _this.data.giftData = res.data && res.data.data || [];
        _this.data.giftData = _this.data.giftData.filter(function (v) {
          v.isover = new Date().getTime() - new Date(v.create_time).getTime() > 3 * 24 * 60 * 60 * 1000 > 0 ? 'isover' : '';
          if (v.prize_type === 3) v.isover = '';
          return _this.data.type ? v.prize_type == _this.data.type : !_this.data.type;
        });
        // 保存中奖信息到中奖池里面
        getApp().saveListPool(_this.data.giftData);
        _this.setData({
          giftData: _this.data.giftData,
          isloaded: _this.data.isloaded
        });
      }
    });
  },

  goUrl: _index2.default.throttle(function goUrl(e) {
    var _util$getData = _index2.default.getData(e),
        type = _util$getData.type,
        id = _util$getData.id,
        status = _util$getData.status,
        isover = _util$getData.isover;

    if (!type && status != 0 || type || isover) _index2.default.goUrl(e);else {
      if (status != 0) return;
      this.data.showHb = true;
      this.data.openid = id;
      this.setData({
        showHb: this.data.showHb,
        openid: this.data.openid
      });
    }
  }, 1500),
  openGift: function openGift() {
    var _this2 = this;

    var id = this.data.openid;
    if (!id) return;
    if (this.data.iscount) return;
    this.data.iscount = true;
    this.setData({
      iscount: this.data.iscount
    });
    _index4.default.getHb({ id: id }).then(function (res) {
      _this2.data.iscount = false;
      if (res.code === 200) {
        _this2.data.isopenhb = true;
        _this2.data.money = res.data && res.data.money;
        _this2.data.money = _this2.data.money / 100;
        _this2.getGiftList();
        getApp().getUserInfo(true, true);
        _this2.setData({
          isopenhb: _this2.data.isopenhb,
          iscount: _this2.data.iscount,
          money: _this2.data.money || 0.00
        });
      } else {
        _this2.setData({
          iscount: _this2.data.iscount
        });
      }
    });
  }
});