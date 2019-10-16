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
				circular: true
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
		},
		setIndex(e) {
			let {index} = e.currentTarget.dataset
			this.setData({
				swiperCurrent: index
			})
		}
	},
	attached: function() {
		// console.log('组件载入')
	},
	ready: function(){
		// 组件加载完毕
	},
})