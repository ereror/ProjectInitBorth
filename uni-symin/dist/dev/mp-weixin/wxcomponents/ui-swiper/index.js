Component({
	properties: {
		items: {
			type: Array,
			value: []
		},
		swiperConfig: {
			type: Object,
			value: {
				interval: 5000,
				duration: 500,
				autoplay: false,
				circular: true,
				model: 2,
			},
			observer: function observer(val) {
				this.setData({
					swiperConf: val
				})
			}
		}
	},
	option: {
		swiperConf: {
		}
	},
	data: {
		swiperCurrent: 0
	},
	methods: {
		swiperChange(e) {
			let itemIndex = e.detail.current
			this.setData({
				swiperCurrent: itemIndex
			})
			this.triggerEvent('swiperchange', {key: itemIndex})
		},
		setIndex(e) {
			let { index } = e.currentTarget.dataset
			this.setData({
				swiperCurrent: index
			})
		},
		checkImg(e) {
			let { src, url, remark } = e.currentTarget.dataset
			let items = this.data.items.map(v => v.src)
			if (url && url.length) {
				wx.navigateTo({
					url: `/pages/webview/index?url=${url}&title=${remark}`
				})
			} else {
				wx.previewImage({
					current: src,
					urls: items,
					success: function(res) {
						console.log(res)
					}
				})
			}
		}
	},
	attached: function() {
		// console.log('组件载入')
	},
	ready: function(){
		// 组件加载完毕
	},
})