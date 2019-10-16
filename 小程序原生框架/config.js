//onst baseURL = "https://qiye-aliyun-02.xiaochengxucms.com";
//const baseURL = "http://admin.lb.work";
//本地穿透
// const baseURL = 'https://exchange.xiaochengxucms.com'
const baseURL = 'https://exchange.myxianxiaobao.com'
//测试服务器
// const baseURL='https://canada.xiaochengxucms.com'
// const baseURL = 'http://yuyu.xiaochengxucms.com'
// const baseURL = 'http://10.23.55.121'
//正式
//const baseURL ="https://qiye-aliyun-02.xiaochengxucms.com"
//const appkey ="kJFkyZHCvBCcTE2Z"
const appkey = "f5D4ohrsUR510MDg"
export default {
  timeout: 1000,
  baseURL,
  appkey,
  miniAppName: '/exchange',
  "navbar": {
    "frontColor": "#000000",
    "backgroundColor": "#ffffff"
  },
  "tabbar": {
    "color": "#888",
    "selectedColor": "#ff6454",
    "backgroundColor": "#ffffff",
    "list": [{
      "index":0,
      "text": "首页",
      "iconPath": "/images/tabbar/index.png",
      "selectedIconPath": "/images/tabbar/index-fill.png",
      "pagePath": "/pages/info/index/index",
    }, {
      "index": 1,
      "text": "发布",
      "iconPath": "/images/tabbar/add.png",
      "selectedIconPath": "/images/tabbar/add.png",
      "pagePath": "/pages/info/addnew/addnew",
    }, {
      "index":2,
      "text": "我的",
      "iconPath": "/images/tabbar/ucenter.png",
      "selectedIconPath": "/images/tabbar/ucenter-fill.png",
      "pagePath": "/pages/ucenter/index/index",
    }]
  },
  "swiperCategory": {
    "height": 194,
    "ndicatorDots": false,
    "indicatorColor": "#dddddd",
    "indicatorActiveColor": "#ff9000",
    "autoplay": false,
    "interval": 3000,
    "duration": 500,
    "circular": true,
    "previousMargin": 0,
    "nextMargin": 0,
    "borderRadius": 0,
    "rowNum": 5,
    "fontSize": 26,
    "imageSize": 108
  },
  "swiperAd": {
    "height": 290,
    "indicatorDots": true,
    "indicatorColor": "rgba(70,70,70,0.4)",
    "indicatorActiveColor": "#ff6454",
    "autoplay": true,
    "interval": 3000,
    "duration": 500,
    "circular": true,
    "previousMargin": 0,
    "nextMargin": 0,
    "space": 0,
    "borderRadius": 15
  },
  "roller": {
    "height": 50,
    "indicatorDots": false,
    "indicatorColor": "rgba(248,248,248,0.4)",
    "indicatorActiveColor": "rgba(248,248,248,1)",
    "autoplay": true,
    "interval": 3000,
    "duration": 500,
    "circular": true,
    "previousMargin": 0,
    "nextMargin": 0,
    "rowSpace": 20,
    "colSpace": 20,
    "borderRadius": 0,
    "displayMultipleItems": 1,
    "fontSize": 28,
    "imageSize": 80
  },
  "notice": {
    "height": 50,
    "indicatorDots": false,
    "indicatorColor": "rgba(248,248,248,0.4)",
    "indicatorActiveColor": "rgba(248,248,248,1)",
    "autoplay": true,
    "interval": 3000,
    "duration": 500,
    "circular": true,
    "previousMargin": 0,
    "nextMargin": 0,
    "rowSpace": 20,
    "colSpace": 20,
    "borderRadius": 0,
    "displayMultipleItems": 1,
    "fontSize": 28,
    "imageSize": 40,
    "color":"#666"
  },
  "searchTitle":{
    "info": "找房子、找工作、二手交易",
    "shop": "找店铺、找房子、找工作",
    "information": "找资讯",
    "company": "找名片、找房子、找工作"
  },
  "protocol":{
    "coupon":"优惠券发布协议",
    "shop": "商家入驻协议"
  }
}
