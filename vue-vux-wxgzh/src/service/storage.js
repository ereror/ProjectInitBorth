class LocalStorageService {
  get (key) {
    // let value = window.localStorage.hasOwnProperty(key) ? localStorage.getItem(key) : null
    let value = window.localStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (e) {}
    return value
  }
  set (key, value) {
    if (Object.prototype.toString.call(value) === '[object String]') window.localStorage.setItem(key, value)
    if (typeof value === 'object') window.localStorage.setItem(key, JSON.stringify(value))
  }
  remove (key) {
    window.localStorage.removeItem(key)
  }
}

export default new LocalStorageService()
