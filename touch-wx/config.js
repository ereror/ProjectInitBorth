//本地穿透
// const baseURL = 'https://prizedraw.myxianxiaobao.com'
const baseURL = 'https://drawt.myxianxiaobao.com'
const TokenURL = '/mobile/Token/getToken'

export default {
  timeout: 1000,
  baseURL,
  TokenURL,
  miniAppName: '',
  "navbar": {
    "frontColor": "#000000",
    "backgroundColor": "#ffffff"
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
  }
}