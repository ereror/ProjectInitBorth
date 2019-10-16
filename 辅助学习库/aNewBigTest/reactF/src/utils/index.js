import commonService from 'services/common'

export function codeResult (url) {
	let code = ''
	var rec = /(?:code=)(\w*)/ig
	var resultc = url.match(rec)
	if (resultc && resultc.length) code = resultc[0].substring(5)
	return code
}

export function getwxshare (hide) {
  var url = location.href.split('#')[0]
  if (url.indexOf('?') !== -1) url = url.substring(0, url.indexOf('?'))
  commonService.getJsconfig({url: location.href}).then(res => {
    if (res.code * 1 === 200) {
      let result = res.result
      var wx = window.wx || {}
      wx.config({
        debug: false,
        appId: 'wx6357f5dafdb1c45d',
        timestamp: result.timestamp,
        nonceStr: result.noncestr,
        signature: result.signature,
        jsapi_ticket: result.jsapi_ticket,
        jsApiList: ['chooseImage', 'onMenuShareAppMessage', 'hideOptionMenu', 'showOptionMenu', 'onMenuShareTimeline']
      })
      wx.ready(function () {
        if (!hide) wx.showOptionMenu()
        else wx.hideOptionMenu()
      })
    }
  })
}