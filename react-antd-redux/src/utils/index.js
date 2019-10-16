import commonService from 'services/common'
export function codeResult (url) {
	let code = ''
	var rec = /(?:code=)(\w*)/ig
	var resultc = url.match(rec)
	if (resultc && resultc.length) code = resultc[0].substring(5)
	return code
}

export function getwxshare (hide) {
  // console.log('location.href:', location.href)
  var url = location.href.split('#')[0]
  // console.log("url1:", url)
  // if (url.indexOf('?') !== -1) url = url.substring(0, url.indexOf('?'))
  // console.log("url2:", url)
  commonService.getJsconfig({url: url}).then(res => {
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
        jsApiList: ['chooseImage', 'onMenuShareAppMessage', 'hideOptionMenu', 'showOptionMenu', 'onMenuShareTimeline', 'updateAppMessageShareData', 'updateTimelineShareData']
      })
      wx.ready(function () {
        if (!hide) wx.showOptionMenu()
        else wx.hideOptionMenu()
      })
    }
  })
}

export function getImgData(img,dir,next){
 var image = new Image()
 image.onload = function() {
  var degree = 0, drawWidth, drawHeight, width, height
  drawWidth = this.naturalWidth
  drawHeight = this.naturalHeight
  //以下改变一下图片大小
  var maxSide = Math.max(drawWidth, drawHeight)
  if (maxSide > 1024) {
    var minSide = Math.min(drawWidth, drawHeight)
    minSide = minSide / maxSide * 1024
    maxSide = 1024
    if (drawWidth > drawHeight) {
      drawWidth = maxSide
      drawHeight = minSide
    } else {
      drawWidth = minSide
      drawHeight = maxSide
    }
  }
  var canvas=document.createElement('canvas')
  canvas.width = width = drawWidth
  canvas.height = height = drawHeight
  var context=canvas.getContext('2d')
  //判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
  switch(dir){
    //iphone横屏拍摄，此时home键在左侧
    case 3:
      degree = 180
      drawWidth = -width
      drawHeight = -height
      break
    //iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
    case 6:
      canvas.width = height
      canvas.height = width
      degree = 90
      drawWidth = width
      drawHeight = -height
      break
    //iphone竖屏拍摄，此时home键在上方
    case 8:
      canvas.width = height
      canvas.height = width
      degree = 270
      drawWidth = -width
      drawHeight = height
      break
  }
  //使用canvas旋转校正
  context.rotate(degree*Math.PI/180)
  context.drawImage(this, 0, 0, drawWidth, drawHeight)
  //返回校正图片
  next(canvas.toDataURL("image/jpeg", .8))
 }
 image.src = img
}

export function repfunc(str, rec) {
  let queryrec = new RegExp(rec, 'gi')
  return str.replace(queryrec, function($1, $2, $3){
    console.log($1, $2, $3)
    return "<span style='color: darkred;font-weight:600'>" + $1 + '</span>'
  })
}