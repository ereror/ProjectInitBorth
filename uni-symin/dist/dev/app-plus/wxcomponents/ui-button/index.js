import objToObject from '../../static/libs/objectToStyle'
Component({
	properties: {
		isloading: {
			type: Boolean,
			value: false
		},
		loadingIcon: {
			type: String,
			value: ''
		},
		icon: {
			type: String,
			value: ''
		},
		btnStyle: {
			type: Object,
			value: {},
			observer: function observer(val){
				this.setData({
					localStyle: objToObject(val)
				})
			},
		},
		disabled: {
			type: Boolean,
			value: false
		}
	},
	option: {
	},
	data: {
		localStyle: {}
	},
	methods: {
		sendBack() {
			this.triggerEvent("surefunc", true);
		}
	},
	attached: function() {
		// console.log('组件载入')
	},
	ready: function(){
		// 组件加载完毕
	},
})