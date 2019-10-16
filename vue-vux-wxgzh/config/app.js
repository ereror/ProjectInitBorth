// 全局的 xhr host 配置
exports.serverHost = process.env.NODE_ENV !== 'development' ? 'build' : ''

// // 文件服务器地址
exports.wxcodeurl = encodeURIComponent('http://www.9diangame.com/static#/wechat?userid=123123')

exports.wxconfig = {
  appid: 'wx6a4658a3d166e6c8',
  domain: '9diangame'
}
// 全局的 xhr config
// https://developer.mozilla.org/zh-CN/docs/Web/API/GlobalFetch/fetch
exports.xhrConfig = {
  method: 'GET',
  headers: {
    // 'Mock-Case': 'cases1', // mock 测试平台
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json; charset=UTF-8'
  },
  // mode: 'cors',
  credentials: 'include',
  // cache: 'default'
}
