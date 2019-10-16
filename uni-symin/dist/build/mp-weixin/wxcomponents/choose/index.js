Component({
	properties: {
		choTitle: {
			type: String,
			value: '类别'
		},
		choArr: {
			type: Array,
			value: [
				{
					text: '最近上线',
					isbgcolor: 'cho-dct', //现在支持灰, 红
				},
				{
					text: '离我最近',
					isbgcolor: 'cho-dct', //现在支持灰, 红					
				}
			]
		},
		choCount: {
			type: Number,
			value: 1,
		    observer: function observer(val) {
				this.setData({
				  isAcount: val
				});
			}
		},
		choStyle: {
			type: String,
			value: 'margin-bottom: 40rpx;'
		}
	},
	option: {
	},
	data: {
		isAcount: 1
	},
	methods: {
		setValue(e) {
			let { index } = e.currentTarget.dataset
			this.triggerEvent("setValue", {val: index});
			this.setData({
				isAcount: index
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