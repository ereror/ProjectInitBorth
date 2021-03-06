Component({
	properties: {
		toastconfig: {
			type: Object,
			value: {
				model: 1, // toast类型 1:成功，2:失败，3:waring
				icon: false, // 是否显示icon
				content: '', // toast内容
				type: '' // toast类型 1:small, 2:big, 默认normal
			}
		},
	},
	option: {
	},
	data:{
		msg: ['操作成功', '失败提示', '警告警示', '你的操作有问题'],
		icons: 'https://sns-cdn.myxianxiaobao.com/sfximao/icony.png',
		iconf: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconf.png',
		iconw: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconw.png',
	},
	methods: {
	},
	attached: function() {
		// console.log('%o', this.data.toastconfig)
	},
	ready: function(){
		// console.log('%o', this.data.toastconfig)
	}
})