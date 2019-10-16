import Validate from './validate.js'
export default {
  //格式化数字
  formatNumber(n) {
    n = n.toString();
    return n[1] ? n : '0' + n
  },
  //格式化时间
  formatTime(date, format) {
    var that = this
    let newFormat = format || 'YY-M-D h:m:s';
    let newDate = date || new Date();
    if (Object.prototype.toString.call(newDate).slice(8, -1) !== "Date") {
      newDate = new Date(date);
    }
    let week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', '日', '一', '二', '三', '四', '五', '六'];
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
    })
  },

  /**
   * 人性话格式时间
   */
  ctDate(date) {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;


    if (!date) return "";
    const now = Date.now();
    let diffValue;
    let result;
    date = typeof date === "number" ? date : +(new Date(date));
    diffValue = now - date;

    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;

    if (monthC >= 1) {
      result = parseInt(monthC) + "个月前";
    }
    else if (weekC >= 1) {
      result = parseInt(weekC) + "个星期前";
    }
    else if (dayC >= 1) {
      result = parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
      result = parseInt(hourC) + "个小时前";
    }
    else if (minC >= 1) {
      result = parseInt(minC) + "分钟前";
    } else {
      result = "刚刚发表";
    }

    return result;
  },

  //返回类型
  typeOf(param) {
    return Object.prototype.toString.call(param).slice(8, -1)
  },
  //判断是否为空
  isEmpty(param) {

    //基本类型为空
    let condition1 = param === '' || param === null || param === undefined || param === "NaN";
    let condition2;
    let condition3
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
  checkAuth(name) {
    let that = this;
    return new Promise((resove, reject) => {

      wx.getSetting({
        success(res) {
          if (res.authSetting[`scope.${name}`]) {
            resove(true)
          } else {
            resove(false)
          }
        },
        fail() {
          that.networkError()
        }
      })
    })
  },
  //name授权名称，must是否必须
  authorize(name, ismust) {
    let that = this;
    let scope = this.scope;
    let authorizeSuccess = this.authorizeSuccess;
    let authorizeFail = this.authorizeFail;
    return new Promise((resolve, reject) => {
      //检查是否授权
      wx.getSetting({
        success(res) {
          if (!res.authSetting[scope[name].title]) {
            wx.authorize({
              scope: scope[name].title,
              success() {
                authorizeSuccess(scope[name], resolve, reject)
              },
              fail() {
                resolve(false)
              }
            })
          } else {
            authorizeSuccess(scope[name], resolve, reject)
          }
        },
        fail() {
          resolve(false)
        }
      })
    });
  },
  //授权成功，调相应方法
  authorizeSuccess(param, resolve, reject) {
    param.method({
      success(res) {
        resolve(res)
      },
      fail(res) {
        resolve(false)
      }
    });
  },
  //授权失败，引导授权
  authorizeFail(param, resolve, reject, must) {
    wx.showModal({
      title: "授权提示",
      content: `小程序需要${param.message}权限`,
      cancelText: '再想想',
      confirmText: '去授权',
      success(res) {
        if (res.confirm) {
          console.log("去授权");
          wx.openSetting({
            success: (res) => {
              let authSetting = res.authSetting;
              if (authSetting[param.title]) {
                authorizeSuccess(param, resolve, reject)
              } else {
                authorizeFail(param, resolve, reject, must)
              }
            }
          })
        } else if (res.cancel) {
          console.log("再想想");
          if (must) {
            authorizeFail(param, resolve, reject, must)
          } else {
            resolve({ data: null, code: 404, msg: '授权失败' })
          }
        }

      }
    })
  },
  //网络错误提示
  networkError({ msg = "网络错误" } = {}) {
    console.log()
    this.hideAll();
    if (this.getPage().onPullDownRefresh) {
      wx.showModal({
        title: "网络提示",
        content: `${msg},请检查网络后刷新`,
        confirmText: '立即刷新',
        cancelText: '等会刷新',
        success(res) {
          if (res.confirm) {
            wx.startPullDownRefresh()
          }
        }
      })
    } else {
      this.showFail(msg)
    }

  },
  /* 打开提示信息 */
  showModal({ title = '提示', content = "出现不明错误" } = {}) {
    wx.showModal({
      title,
      content,
      showCancel: false
    })
  },
  showLoading(title = "加载中",mask=true) {
    wx.showLoading({
      title,
      mask
    })
  },
  hideLoading() {
    wx.hideLoading()
  },
  /* 隐藏所有提示信息 */
  hideAll() {
    wx.hideLoading();
    wx.stopPullDownRefresh();
    wx.hideNavigationBarLoading();
  },
  showSuccess(title) {
    wx.showToast({
      title,
    })
  },
  showFail(title="操作失败") {
    wx.showToast({
      title
    })
  },
  //获取标签上data
  getData(e) {
    return e.currentTarget.dataset
  },
  //跳转
  goUrl(e) {
    let { url, method } = this.getData(e);
    method = method || "navigateTo";
    if (!url) {
      return;
    }

    if (url.indexOf('tel:') > -1) {
      wx.makePhoneCall({
        phoneNumber: url.split(':')[1],
      })
      return;
    }
    if (url.indexOf('http') > -1){
      wx.navigateTo({
        url: `/pages/common/webview/webview?url=${url}`,
      })
      return;
    }
    wx[method]({
      url
    })
  },
  //获表单控件值
  getValue(e) {
    return e.detail.value
  },
  //格式化参数对象
  setOptions(o) {
    return encodeURIComponent(JSON.stringify(o))
  },
  //格式化参数对象
  getOptions(o) {
    return JSON.parse(decodeURIComponent(o))
  },
  //打电话
  call(phoneNumber) {
    wx.makePhoneCall({
      phoneNumber: phoneNumber
    })
  },
  //获取页面对象，0时为当前页面
  getPage(index = 0) {
    let pages = getCurrentPages();
    let page = pages[pages.length - 1 + index]
    return page
  },
  setTabbar(tabbar) {
    if (this.isEmpty(tabbar)) {
      return;
    }
    let { color, selectedColor, backgroundColor, borderStyle, list } = tabbar;
    wx.setTabBarStyle({
      color,
      selectedColor,
      backgroundColor,
      borderStyle
    })
    for (let i in list) {
      let { index, text, iconPath, selectedIconPath } = list[i]
      wx.setTabBarItem({
        index,
        text,
        iconPath,
        selectedIconPath
      })
    }
  },
  //发起支付
  pay(orderInfo) {
    return new Promise((resove, reject) => {
      wx.requestPayment({
        timeStamp: orderInfo.timeStamp,
        nonceStr: orderInfo.nonceStr,
        'package': orderInfo.package,
        signType: orderInfo.signType,
        paySign: orderInfo.paySign,
        success: function (res) {
          resove(true)
        },
        fail: function (res) {
          resove(false)
        },
        complete: function (res) {
          console.log(res)
        },
      })
    })
  },
  //动态设置导航信息
  setNavbar(navbar) {
    console.log(navbar)
    if (this.isEmpty(navbar)) {
      return;
    }
    let { frontColor, backgroundColor, title } = navbar
    if (!this.isEmpty(title)) {
      wx.setNavigationBarTitle({
        title
      })
    }
    if (!this.isEmpty(backgroundColor) && !this.isEmpty(frontColor)) {
      wx.setNavigationBarColor({
        frontColor,
        backgroundColor,
      })
    }
  },
  //获取当前页面配置
  getPageConfig(pages) {
    if (this.isEmpty(pages)) {
      return false;
    }
    let route = this.getPage().route
    let currentPageConfig = pages[route] || false;
    return currentPageConfig

  },
  //深拷贝
  deepCopy(o) {
    let that=this;
    if (o instanceof Array) {
      var n = [];
      for (var i = 0; i < o.length; ++i) {
        n[i] = that.deepCopy(o[i]);
      }
      return n;
    } else if (o instanceof Function) {
      var n = new Function("return " + o.toString())();
      return n
    } else if (o instanceof Object) {
      var n = {}
      for (var i in o) {
        n[i] = that.deepCopy(o[i]);
      }
      return n;
    } else {
      return o;
    }
  },
  Validate,
  //根据数据获取id字符串
  getIds: function (o) {
    let ids = [];
    o = o || [];
    o.forEach((item) => {
      ids.push(item.id)
    })
    return ids.join(',');
  },
  //没有名片提示
  noCompanyModal:function(must=true){
    wx.showModal({
      title: '提示',
      content: '请先创建名片',
      showCancel: true,
      cancelText: '不了',
      confirmText: '去创建',
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/card/edit/edit'
          })
        }else{
          if(must){
            wx.navigateBack({
              delta: 1
            })
          }
        }
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  getLocation:function(){
    //定位
    let that=this;
    let amapFile = require('./amap-wx.js');
    let myAmapFun = new amapFile.AMapWX({ key: '68e88186e3482650208d172a5450ffcd' });
    return new Promise((resolve,reject)=>{
      myAmapFun.getRegeo({
        success: function (data) {
          let addressInfo = data[0];
          //成功回调
          resolve(addressInfo)
        },
        fail: function (info) {
          console.log(info)
          //失败回调
          that.networkError({msg:"定位失败"})
        }
      })
    })
  },
  //将一个数组根据规则分为两个
  partition:(arr, isValid) =>
    arr.reduce(
      ([pass, fail], elem) =>
        isValid(elem) ? [[...pass, elem], fail] : [pass, [...fail, elem]],
      [[], []],
    )
}