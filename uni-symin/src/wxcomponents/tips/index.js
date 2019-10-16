import ObjToStyle from '../../static/libs/objectToStyle'
Component({
	properties: {
		tipStyle: {
			type: Object,
			value: {},
			observer: function observer(val) {
				this.setData({
					tipStyleInner: ObjToStyle(val)
				})
			}
		},
		tipContent: {
			type: String,
			value: ''
		}
	},
	option: {
	},
	data: {
		tipStyleInner: ''
	},
	methods: {
	},
	attached: function() {
		console.log(this.data.tipContent)
		// console.log('组件载入')
	},
	ready: function(){
		// 组件加载完毕
	},
})