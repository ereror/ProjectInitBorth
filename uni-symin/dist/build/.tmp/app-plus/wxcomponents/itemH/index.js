import ObjToStyle from '../../static/libs/objectToStyle'
import util from '../../static/utils/index.js'
// 列表展示组件
Component({
	properties: {
		lines: {
			type: Number,
			value: 5
		},
		isClickable: {
			type: Boolean,
			value: true
		},
		itemData: {
			type: Array,
			value: [
			],
			observer: function observer(val){
				this.setData({
					itemlist: val
				})
			}
		},
		textStyle: {
			type: Object,
			value: '',
			observer: function observer(val){
				console.log(ObjToStyle(val))
				this.setData({
					itemTextStyle: ObjToStyle(val)
				})
			}
		},
		imgStyle: {
			type: Object,
			value: {},
			observer: function observer(val) {
				this.setData({
					imgStyleR: ObjToStyle(val)
				})
			}
		}
	},
	option: {
		imgStyleR: '',
		itemTextStyle: ''
	},
	data: {
		hicon: 'https://sns-cdn.myxianxiaobao.com/sfximao/logo.png',
		itemlist: []
	},
	methods: {
		setValue(e) {
			// 循环传递数据
			let { index, url } = e.currentTarget.dataset
			if (!this.data.isClickable) {
				if (url) util.goUrl(e)
			} else {
				this.data.itemData[index].isChoose = !this.data.itemData[index].isChoose
				this.triggerEvent("setValue", {key: index, val: this.data.itemData[index], res: this.data.itemData});
			}
		}
	},
	attached: function() {
		// console.log('组件载入')
	},
	ready: function(){
		// 组件加载完毕
	},
})