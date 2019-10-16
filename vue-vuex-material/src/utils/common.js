// 页面中元素的拖动
export function moveInDoc(callBack) {
  document.addEventListener('mousemove', callBack)
  document.addEventListener('mouseup', stopMove)

  function stopMove() {
    document.removeEventListener('mousemove', callBack)
    document.removeEventListener('mouseup', stopMove)
  }
}
// 预加载图片资源
export function preLoadImg(src) {
  src = (src || '').trim()
  if (!src) return
  return ((new window.Image()).src = src)
}
export function isFunction(o) {
  return Object.prototype.toString.call(o) === '[object Function]'
}
export function isPlainObject(o) {
  return Object.prototype.toString.call(o) === '[object Object]'
}
export function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}
export function merge() {
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
export function isRelated(parent, child) {
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

export function message(that, str, boolen) {
  if (boolen) {
    that.$notify.success({
      title: '成功',
      message: str,
      duration: 1000,
      iconClass: 'el-icon-success'
    })
  } else {
    that.$notify.error({
      title: '失败',
      message: str,
      duration: 1000,
      iconClass: 'el-icon-error'
    })
  }
}
