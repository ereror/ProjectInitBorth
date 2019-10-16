Component({
	properties: {
		boxconfig: {
			type: Object,
			value: {
				model: 1, // 1.messagebox 2：selectbox
				title: '弹窗的标题',
				content: '说明当前状态、提示用户解决方案 ，最好不要超过两行',
				btn: {
					ok: '主操作',
					okcolor: 'd-color-r',
					cancel: '',
					cancolor: ''
				}
			}
		}
	},
	option: {
	},
	data:{
		msg: '这是弹框组件',
		choices: ['头像、资料作假', '广告、营销', '诈骗、托儿', '色情低俗', '恶意骚扰、不文明语言'],
	},
	methods: {
		surebtn () {
			this.triggerEvent("surefunc", true);
		},
		cancelbtn () {
			this.triggerEvent("cancelfunc", true);
		}
	},
	attached: function() {
			// 调用<!-- <dialogbox @surefunc='surefunc'></dialogbox> -->
	},
	ready: function(){
	}
})