import ObjToStyle from '../../static/libs/objectToStyle'
import util from '../../static/utils/index.js'
Component({
	properties: {
		inputconfig: {
			type: Object,
			value: {
				key: '',
				title: '邀约项目', // toast类型 1:成功，2:失败，3:waring
				titleicon: '',
				icon: '', // 是否头显示icon
				content: '一起吃个饭吧~', // 内容
				arrow: true,
				size: 40,
				type: 'text',
				url: '', // 跳转链接， 当type=== url 生效
				isBorderR: false,
				placeholder: '输入内容提示', // 输入文字提示
				isInput: true,
				selfconf: true // 是否自定义按钮
				// isInput: false 是否输入框
			}
		},
		inputStyle: {
			type: Object,
			value: {},
			observer: function observer(val) {
				this.setData({
					iptStyle: ObjToStyle(val)
				})
			}
		}
	},
	option: {
		iptStyle: ''
	},
	data:{
		titleicon: 'https://sns-cdn.myxianxiaobao.com/sfximao/logo.png',
		arrow: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconbb.png',
		arrow2: '../../static/images/arrow2.png'
	},
	methods: {
		goUrl(e) {
			// 列表方法
			let { type, key } = e.currentTarget.dataset
			if (type === 'url') util.goUrl(e)
			else if (type === 'button') this.triggerEvent("choose", {val: key});
		},
		setParam(e) {
			let { key } = e.currentTarget.dataset
			let detailval = e.detail.value
 			this.triggerEvent("change", {val: detailval, key: key});
		}
	},
	attached: function() {
		// console.log('%o', this.data.toastconfig)
	},
	ready: function(){
		// console.log('%o', this.data.toastconfig)
	}
})