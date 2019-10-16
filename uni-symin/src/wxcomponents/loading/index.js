Component({
	properties: {
		loadConfig: {
			type: Object,
			observer: function observer(val){
				this.setData({
					loadConf: val
				})
			}
		}
	},
	observers: {
		loadConfig: function(val) {
			this.setData({
				loadConf: val
			})
		}
	},
	option: {
	},
	data: {
		loadConf: {
			current_page: 1,
			last_page: 1,
			len: -1
		}
	},
	methods: {
		// setValue() {
		// 	this.triggerEvent("setValue", true);
		// }
	},
	attached: function() {
		// console.log('组件载入')
	},
	ready: function(){
		// 组件加载完毕
	},
})