export default {
	setItem (key, val, func) {
		let tool = Object.prototype.toString.call(val).slice(8, -1)
		let isJson = tool === 'Object' || tool === 'Array' || false
		val = typeof val === 'string' ? val : isJson ? JSON.stringify(val) : ''
		if (!val) return  new Error('保存storag出错，请注意检查当前类型')
		uni.setStorage({
			key: key,
			data: val,
			success: function () {
				func && func()
			}
		})
	},
	getItem (key) {
		return uni.getStorageSync(key)
	},
	removeItem (key, func) {
		uni.removeStorage({
			key: key,
			success: function (res) {
				func && func()
			}
		})
	}
}