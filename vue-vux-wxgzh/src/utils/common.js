// 页面中元素的拖动
export function moveInDoc (callBack) {
  document.addEventListener('mousemove', callBack)
  document.addEventListener('mouseup', stopMove)

  function stopMove () {
    document.removeEventListener('mousemove', callBack)
    document.removeEventListener('mouseup', stopMove)
  }
}

// 预加载图片资源
export function preLoadImg (src) {
  src = (src || '').trim()
  if (!src) return
  return ((new window.Image()).src = src)
}

export function isFunction (o) {
  return Object.prototype.toString.call(o) === '[object Function]'
}

export function isPlainObject (o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}

export function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

export function merge () {
  let src, copyIsArray, copy, name, options, clone
  let target = arguments[0] || {}
  let i = 1
  let length = arguments.length
  let deep = false

  // Handle a deep copy situation
  if (typeof target === 'boolean') {
    deep = target

    // skip the boolean and the target
    target = arguments[i] || {}
    i++
  }

  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== 'object' && !isFunction(target)) target = {}

  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        src = target[name]
        copy = options[name]

        // Prevent never-ending loop
        if (target === copy) continue

        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
          if (copyIsArray) {
            copyIsArray = false
            clone = src && isArray(src) ? src : []
          } else {
            clone = src && isPlainObject(src) ? src : {}
          }

          // Never move original objects, clone them
          target[name] = merge(deep, clone, copy)

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy
        }
      }
    }
  }

  // Return the modified object
  return target
}
// 判断是否相关节点
export function isRelated (parent, child) {
  var current = child
  var result = false
  var count = 0
  while (current && count < 30) {
    count++
    if (current === parent) {
      result = true
      break
    } else {
      current = current.parentNode
    }
  }
  return result
}

// 浏览器判断

export function isfrom () {
  var Navigator = navigator.userAgent
  var from = {
    ifChrome: Navigator.match(/Chrome/i) != null && (Navigator.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null) && true || false,
    ifAndroid: (Navigator.match(/(Android);?[\s]+([\d.]+)?/)) && true || false,
    ifiPad: (Navigator.match(/(iPad).*OS\s([\d_]+)/)) && true || false,
    ifiPhone: Navigator.match(/(iPhone\sOS)\s([\d_]+)/) && true || false,
    ifSafari: Navigator.match(/Safari/),
    ifWeixin: navigator.userAgent.indexOf('MicroMessenger') >= 0
  }
  return from
}

// 打开应用

export function openApp (L) {
  var args = L || ''
  var url = {
    iosApp: 'mahjong9d://twiceway.com/openwith' + args,
    androidApp: 'mahjong9d://twiceway.com/openwith' + args,
    iosDownload: '',
    androidDownload: 'https://www.baidu.com'
  }
  if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    location.href = url.iosApp
    window.setTimeout(function () {
      location.href = 'https://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8&ign-mpt=uo%3D4'
    }, 500)
  }
  if (navigator.userAgent.match(/android/i)) {
    location.href = url.androidApp
    window.setTimeout(function () {
      location.href = url.androidDownload
    }, 500)
  }
}

export function openAppNew (L) {
  var args = L || ''
  var url = {
    iosApp: '',
    androidApp: 'game9d://twiceway.com/openwith' + args,
    iosDownload: '',
    androidDownload: 'https://www.baidu.com'
  }

  // for (var m in L) {
  //   if (m && L[m]) {
  //     url[m] = L[m]
  //   }
  // }

  if (navigator.userAgent.match(/android/i) || navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
    var aEle = document.createElement('a')
    aEle.style.display = 'none'
    var ifr = document.createElement('iframe')
    ifr.appendChild(aEle)
    aEle.href = navigator.userAgent.match(/android/i) ? url.androidDownload : url.iosDownload
    ifr.src = navigator.userAgent.match(/android/i) ? url.androidApp : url.iosDownload
    ifr.style.display = 'none'
    ifr.onload = function () {
      aEle.click()
    }
    document.body.appendChild(ifr)
    setTimeout(function () {
      // window.location.href = aEle.href
      document.body.removeChild(ifr)
    }, 500)
  }
}

export function openWinx () {
  var aEle = document.createElement('a')
  aEle.href = 'game9d://twiceway.com/openwith?name=zhangsan&age=26'
  aEle.class = 'btn-download'
  // aEle.style.display = 'none'
  aEle.innerText = '打开应用'
   // 为btn-download 绑定事件，如果在500ms内，没有解析到协议，那么就会跳转到下载链接
  var appstore
  var ua = navigator.userAgent

  if (ua.match(/Android/i)) {
    appstore = 'http://www.baidu.com'
  }

  if (ua.match(/iphone|ipod|ipad/)) {
    appstore = 'https://itunes.apple.com/cn/app/wei-xin/id414478124?mt=8&ign-mpt=uo%3D4'
  }

  function applink (fail) {
    return function () {
      var clickedAt = new Date().getTime()
      setTimeout(function () {
        if (new Date().getTime() - clickedAt < 2000) {
          window.location = fail
        }
      }, 500)
    }
  }
  aEle.onclick = applink(appstore)
  document.body.appendChild(aEle)
  setTimeout(function () {
    aEle.onclick()
  }, 1000)
}

export function calcrem () {
  // var n = window
  // var e = n.document
  // var t = e.documentElement
  // var i = 720
  // var d = i / 100
  // var o = 'orientationchange' in n ? 'orientationchange' : 'resize'
  // var a = function () {
  //   var nth = t.clientWidth || 320
  //   if (nth > 720) nth = 720
  //   t.style.fontSize = nth / d + 'px'
  // }
  // e.addEventListener && (n.addEventListener(o, a, !1), e.addEventListener('DOMContentLoaded', a, !1))
  // window.onorientationchange = function () {
  //   var orientation = window.orientation
  //   if (orientation === 90 || orientation === -90) {
  //     return false
  //   }
  // }
  (function (win, lib) {
    var doc = win.document
    var docEl = doc.documentElement
    var metaEl = doc.querySelector('meta[name="viewport"]')
    var flexibleEl = doc.querySelector('meta[name="flexible"]')
    var dpr = 0
    var scale = 0
    var tid
    var flexible = lib.flexible || (lib.flexible = {})
    if (metaEl) {
      console.warn('将根据已有的meta标签来设置缩放比例')
      var match = metaEl.getAttribute('content').match(/initial-scale=([\d.]+)/)
      if (match) {
        scale = parseFloat(match[1])
        dpr = parseInt(1 / scale)
      }
    } else if (flexibleEl) {
      var content = flexibleEl.getAttribute('content')
      if (content) {
        var initialDpr = content.match(/initial-dpr=([\d.]+)/)
        var maximumDpr = content.match(/maximum-dpr=([\d.]+)/)
        if (initialDpr) {
          dpr = parseFloat(initialDpr[1])
          scale = parseFloat((1 / dpr).toFixed(2))
        }
        if (maximumDpr) {
          dpr = parseFloat(maximumDpr[1])
          scale = parseFloat((1 / dpr).toFixed(2))
        }
      }
    }

    if (!dpr && !scale) {
      var isIPhone = win.navigator.appVersion.match(/iphone/gi)
      var devicePixelRatio = win.devicePixelRatio
      if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
          dpr = 3
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
          dpr = 2
        } else {
          dpr = 1
        }
      } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1
      }
      scale = 1 / dpr
    }
    docEl.setAttribute('data-dpr', dpr)
    if (!metaEl) {
      metaEl = doc.createElement('meta')
      metaEl.setAttribute('name', 'viewport')
      metaEl.setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no')
      if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(metaEl)
      } else {
        var wrap = doc.createElement('div')
        wrap.appendChild(metaEl)
        doc.write(wrap.innerHTML)
      }
    }

    function refreshRem () {
      var width = docEl.getBoundingClientRect().width
      if (width / dpr > 540) {
        width = 540 * dpr
      }
      var rem = width / 10
      docEl.style.fontSize = rem + 'px'
      flexible.rem = win.rem = rem
    }

    win.addEventListener('resize', function () {
      clearTimeout(tid)
      tid = setTimeout(refreshRem, 300)
    }, false)
    win.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        clearTimeout(tid)
        tid = setTimeout(refreshRem, 300)
      }
    }, false)

    if (doc.readyState === 'complete') {
      doc.body.style.fontSize = 12 * dpr + 'px'
    } else {
      doc.addEventListener('DOMContentLoaded', function (e) {
        doc.body.style.fontSize = 12 * dpr + 'px'
      }, false)
    }
    refreshRem()

    flexible.dpr = win.dpr = dpr
    flexible.refreshRem = refreshRem
    flexible.rem2px = function (d) {
      var val = parseFloat(d) * this.rem
      if (typeof d === 'string' && d.match(/rem$/)) {
        val += 'px'
      }
      return val
    }
    flexible.px2rem = function (d) {
      var val = parseFloat(d) / this.rem
      if (typeof d === 'string' && d.match(/px$/)) {
        val += 'rem'
      }
      return val
    }
  })(window, window['lib'] || (window['lib'] = {}))
}

export function getDate (item) {
  if (typeof item !== 'object') return 0
  var year = new Date().getFullYear()
  var month = new Date().getMonth()
  var day = new Date().getDate()
  if (item.data && item.data.time === year) {
     // 这里后端返回的数据是按照时间排序的，所以此处直接取起一个日期进行判断
    if (item.data.months && item.data.months[0].time === month && item.data.months[0].days && item.data.months[0].days[0].time === day) {
      return item.data.months[0].days[0].total
    } else {
      return 0
    }
  } else {
    return 0
  }
}

export function sortObject (obj, param, attr, type) {
  obj[param] = obj[param].sort(function (a, b) {
    if (type === 'aesc') return a[attr] - b[attr]
    if (type === 'desc') return b[attr] - a[attr]
  })
}

export function observeDocument (callback) {
  var hiddenProperty = 'hidden' in document ? 'hidden' : ('webkitHidden' in document ? 'webkitHidden' : ('mozHidden' in document ? 'mozHidden' : null))
  var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange')
  var onVisibilityChange = function () {
    if (!document[hiddenProperty]) {
      console.log('页面非激活')
    } else {
      console.log('页面激活')
      callback()
    }
  }
  document.addEventListener(visibilityChangeEvent, onVisibilityChange)
}
