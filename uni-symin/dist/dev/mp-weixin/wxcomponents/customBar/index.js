Component({
	properties: {
		barconfig: {
			type: Object,
			value: {
				CustomBar: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT, 
				StatusBar: wx.STATUS_BAR_HEIGHT,
				title: '甜不辣',
				isArrow: 1,
				bgset: 'bg-gradual-transparent',
				tset: 'bg-gradual-rblack'
			}
		}
	},
	option: {
	},
	data:{
		msg: '这是自定义头部组件',
		iconb: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconbb.png',
		iconbw: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconbw.png'
	},
	methods: {
	},
	attached: function() {
		// console.log('组件载入')
		// console.log('%o', this.data.barconfig)
	},
	ready: function(){
		// console.log('%o', this.data.barconfig)
	}
})