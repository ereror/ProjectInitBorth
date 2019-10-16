Component({
	properties: {
	},
	option: {
	},
	data: {
	},
	methods: {
		setValue() {
			this.triggerEvent("setValue", true);
		}
	},
	attached: function() {
		// console.log('组件载入')
	},
	ready: function(){
		// 组件加载完毕
	},
})