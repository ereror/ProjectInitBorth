'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _validate = require('./validate.js');

var _validate2 = _interopRequireDefault(_validate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

exports.default = {
  //格式化数字
  formatNumber: function formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n;
  },

  //格式化时间
  formatTime: function formatTime(date, format) {
    var that = this;
    var newFormat = format || 'YY-M-D h:m:s';
    var newDate = date || new Date();
    if (Object.prototype.toString.call(newDate).slice(8, -1) !== "Date") {
      newDate = new Date(date);
    }
    var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
    return newFormat.replace(/YY|Y|M|D|h|m|s|week|星期/g, function (a) {
      switch (a) {
        case 'YY':
          return newDate.getFullYear();
        case 'Y':
          return (newDate.getFullYear() + '').slice(2);
        case 'M':
          return that.formatNumber(newDate.getMonth() + 1);
        case 'D':
          return that.formatNumber(newDate.getDate());
        case 'h':
          return that.formatNumber(newDate.getHours());
        case 'm':
          return that.formatNumber(newDate.getMinutes());
        case 's':
          return that.formatNumber(newDate.getSeconds());
        case '星期':
          return "星期" + week[newDate.getDay() + 7];
        case 'week':
          return week[newDate.getDay()];
      }
    });
  },


  /**
   * 人性话格式时间
   */
  ctDate: function ctDate(date) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;

    if (!date) return "";
    var now = Date.now();
    var diffValue = void 0;
    var result = void 0;
    date = typeof date === "number" ? date : +new Date(date);
    diffValue = now - date;

    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;

    if (monthC >= 1) {
      result = parseInt(monthC) + "个月前";
    } else if (weekC >= 1) {
      result = parseInt(weekC) + "个星期前";
    } else if (dayC >= 1) {
      result = parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = parseInt(hourC) + "个小时前";
    } else if (minC >= 1) {
      result = parseInt(minC) + "分钟前";
    } else {
      result = "刚刚发表";
    }

    return result;
  },


  //返回类型
  typeOf: function typeOf(param) {
    return Object.prototype.toString.call(param).slice(8, -1);
  },

  //判断是否为空
  isEmpty: function isEmpty(param) {

    //基本类型为空
    var condition1 = param === '' || param === null || param === undefined || param === "NaN";
    var condition2 = void 0;
    var condition3 = void 0;
    //引用类型为空
    if (!condition1) {
      condition2 = this.typeOf(param) === "Object" && Object.keys(param).length < 1;
      condition3 = this.typeOf(param) === "Array" && param.length < 1;
    }

    return condition1 || condition2 || condition3;
  },

  //定义授权列表
  scope: {
    userLocation: {
      title: "scope.userLocation",
      message: "获取地理位置",
      method: wx.getLocation
    },
    userInfo: {
      title: "scope.userInfo",
      message: "获取用户信息",
      method: wx.getUserInfo
    }
  },
  //检查授权
  checkAuth: function checkAuth(name) {
    var that = this;
    return new Promise(function (resove, reject) {

      wx.getSetting({
        success: function success(res) {
          if (res.authSetting['scope.' + name]) {
            resove(true);
          } else {
            resove(false);
          }
        },
        fail: function fail() {
          that.networkError();
        }
      });
    });
  },

  //name授权名称，must是否必须
  authorize: function authorize(name, ismust) {
    var that = this;
    var scope = this.scope;
    var authorizeSuccess = this.authorizeSuccess;
    var authorizeFail = this.authorizeFail;
    return new Promise(function (resolve, reject) {
      //检查是否授权
      wx.getSetting({
        success: function success(res) {
          if (!res.authSetting[scope[name].title]) {
            wx.authorize({
              scope: scope[name].title,
              success: function success() {
                authorizeSuccess(scope[name], resolve, reject);
              },
              fail: function fail() {
                resolve(false);
              }
            });
          } else {
            authorizeSuccess(scope[name], resolve, reject);
          }
        },
        fail: function fail() {
          resolve(false);
        }
      });
    });
  },

  //授权成功，调相应方法
  authorizeSuccess: function authorizeSuccess(param, resolve, reject) {
    param.method({
      success: function success(res) {
        resolve(res);
      },
      fail: function fail(res) {
        resolve(false);
      }
    });
  },

  //授权失败，引导授权
  authorizeFail: function (_authorizeFail) {
    function authorizeFail(_x, _x2, _x3, _x4) {
      return _authorizeFail.apply(this, arguments);
    }

    authorizeFail.toString = function () {
      return _authorizeFail.toString();
    };

    return authorizeFail;
  }(function (param, resolve, reject, must) {
    wx.showModal({
      title: "授权提示",
      content: '\u5C0F\u7A0B\u5E8F\u9700\u8981' + param.message + '\u6743\u9650',
      cancelText: '再想想',
      confirmText: '去授权',
      success: function success(res) {
        if (res.confirm) {
          console.log("去授权");
          wx.openSetting({
            success: function success(res) {
              var authSetting = res.authSetting;
              if (authSetting[param.title]) {
                authorizeSuccess(param, resolve, reject);
              } else {
                authorizeFail(param, resolve, reject, must);
              }
            }
          });
        } else if (res.cancel) {
          console.log("再想想");
          if (must) {
            authorizeFail(param, resolve, reject, must);
          } else {
            resolve({ data: null, code: 404, msg: '授权失败' });
          }
        }
      }
    });
  }),

  //网络错误提示
  networkError: function networkError() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$msg = _ref.msg,
        msg = _ref$msg === undefined ? "网络错误" : _ref$msg;

    console.log();
    this.hideAll();
    if (this.getPage().onPullDownRefresh) {
      wx.showModal({
        title: "网络提示",
        content: msg + ',\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u5237\u65B0',
        confirmText: '立即刷新',
        cancelText: '等会刷新',
        success: function success(res) {
          if (res.confirm) {
            wx.startPullDownRefresh();
          }
        }
      });
    } else {
      this.showFail(msg);
    }
  },

  /* 打开提示信息 */
  showModal: function showModal() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$title = _ref2.title,
        title = _ref2$title === undefined ? '提示' : _ref2$title,
        _ref2$content = _ref2.content,
        content = _ref2$content === undefined ? "出现不明错误" : _ref2$content;

    wx.showModal({
      title: title,
      content: content,
      showCancel: false
    });
  },
  showLoading: function showLoading() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "加载中";
    var mask = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    wx.showLoading({
      title: title,
      mask: mask
    });
  },
  hideLoading: function hideLoading() {
    wx.hideLoading();
  },

  /* 隐藏所有提示信息 */
  hideAll: function hideAll() {
    wx.hideLoading();
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
  },
  showSuccess: function showSuccess(title) {
    wx.showToast({
      title: title
    });
  },
  showFail: function showFail() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "操作失败";

    wx.showToast({
      title: title,
      icon: 'none'
    });
  },

  //获取标签上data
  getData: function getData(e) {
    return e.currentTarget.dataset;
  },

  //跳转
  goUrl: function goUrl(e) {
    var _getData = this.getData(e),
        url = _getData.url,
        method = _getData.method;

    method = method || "navigateTo";
    if (!url) {
      return;
    }
    if (url.indexOf('tel:') > -1) {
      wx.makePhoneCall({
        phoneNumber: url.split(':')[1]
      });
      return;
    }
    if (url.indexOf('http') > -1) {
      wx.navigateTo({
        url: '/pages/common/webview/webview?url=' + url
      });
      return;
    }
    wx[method]({
      url: url
    });
  },

  //获表单控件值
  getValue: function getValue(e) {
    return e.detail.value;
  },

  //格式化参数对象
  setOptions: function setOptions(o) {
    return encodeURIComponent(JSON.stringify(o));
  },

  //格式化参数对象
  getOptions: function getOptions(o) {
    return JSON.parse(decodeURIComponent(o));
  },

  //打电话
  call: function call(phoneNumber) {
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    });
  },

  //获取页面对象，0时为当前页面
  getPage: function getPage() {
    var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

    var pages = getCurrentPages();
    var page = pages[pages.length - 1 + index];
    return page;
  },
  setTabbar: function setTabbar(tabbar) {
    if (this.isEmpty(tabbar)) {
      return;
    }
    var color = tabbar.color,
        selectedColor = tabbar.selectedColor,
        backgroundColor = tabbar.backgroundColor,
        borderStyle = tabbar.borderStyle,
        list = tabbar.list;

    wx.setTabBarStyle({
      color: color,
      selectedColor: selectedColor,
      backgroundColor: backgroundColor,
      borderStyle: borderStyle
    });
    for (var i in list) {
      var _list$i = list[i],
          index = _list$i.index,
          text = _list$i.text,
          iconPath = _list$i.iconPath,
          selectedIconPath = _list$i.selectedIconPath;

      wx.setTabBarItem({
        index: index,
        text: text,
        iconPath: iconPath,
        selectedIconPath: selectedIconPath
      });
    }
  },

  //发起支付
  pay: function pay(orderInfo) {
    return new Promise(function (resove, reject) {
      wx.requestPayment({
        timeStamp: orderInfo.timeStamp,
        nonceStr: orderInfo.nonceStr,
        'package': orderInfo.package,
        signType: orderInfo.signType,
        paySign: orderInfo.paySign,
        success: function success(res) {
          resove(true);
        },
        fail: function fail(res) {
          resove(false);
        },
        complete: function complete(res) {
          console.log(res);
        }
      });
    });
  },

  //动态设置导航信息
  setNavbar: function setNavbar(navbar) {
    if (this.isEmpty(navbar)) {
      return;
    }
    var frontColor = navbar.frontColor,
        backgroundColor = navbar.backgroundColor,
        title = navbar.title;

    if (!this.isEmpty(title)) {
      wx.setNavigationBarTitle({
        title: title
      });
    }
    if (!this.isEmpty(backgroundColor) && !this.isEmpty(frontColor)) {
      wx.setNavigationBarColor({
        frontColor: frontColor,
        backgroundColor: backgroundColor
      });
    }
  },

  //获取当前页面配置
  getPageConfig: function getPageConfig(pages) {
    if (this.isEmpty(pages)) {
      return false;
    }
    var route = this.getPage().route;
    var currentPageConfig = pages[route] || false;
    return currentPageConfig;
  },

  //深拷贝
  deepCopy: function deepCopy(o) {
    var that = this;
    if (o instanceof Array) {
      var n = [];
      for (var i = 0; i < o.length; ++i) {
        n[i] = that.deepCopy(o[i]);
      }
      return n;
    } else if (o instanceof Function) {
      var n = new Function("return " + o.toString())();
      return n;
    } else if (o instanceof Object) {
      var n = {};
      for (var i in o) {
        n[i] = that.deepCopy(o[i]);
      }
      return n;
    } else {
      return o;
    }
  },

  Validate: _validate2.default,
  //根据数据获取id字符串
  getIds: function getIds(o) {
    var ids = [];
    o = o || [];
    o.forEach(function (item) {
      ids.push(item.id);
    });
    return ids.join(',');
  },
  getLocation: function getLocation() {
    //定位
    var that = this;
    var amapFile = require('../libs/amap-wx.js');
    var myAmapFun = new amapFile.AMapWX({ key: '68e88186e3482650208d172a5450ffcd' });
    return new Promise(function (resolve, reject) {
      myAmapFun.getRegeo({
        success: function success(data) {
          var addressInfo = data[0];
          //成功回调
          resolve(addressInfo);
        },
        fail: function fail(info) {
          console.log(info);
          //失败回调
          that.networkError({ msg: "定位失败" });
        }
      });
    });
  },
  //将一个数组根据规则分为两个
  partition: function partition(arr, isValid) {
    return arr.reduce(function (_ref3, elem) {
      var _ref4 = _slicedToArray(_ref3, 2),
          pass = _ref4[0],
          fail = _ref4[1];

      return isValid(elem) ? [[].concat(_toConsumableArray(pass), [elem]), fail] : [pass, [].concat(_toConsumableArray(fail), [elem])];
    }, [[], []]);
  },
  throttle: function throttle(fn, gapTime) {
    if (gapTime == null || gapTime == undefined) {
      gapTime = 1500;
    }
    var _lastTime = null;
    // 返回新的函数
    return function () {
      var _nowTime = +new Date();
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
        fn.apply(this, arguments); //将this和参数传给原函数
        _lastTime = _nowTime;
      }
    };
  },
  getQueryParams: function getQueryParams(url) {
    url = url;
    var search = url.substring(url.lastIndexOf('?') + 1);
    var res = {};
    search.replace(/([^?&=]+)=([^?&=]*)/g, function (rs, $1, $2) {
      res[decodeURIComponent($1)] = String(decodeURIComponent($2));
      return rs;
    });
    return res;
  }
};