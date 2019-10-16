Component({
	properties: {
		boxconfig: {
			type: Object,
			value: {
				model: 1, // 1.messagebox 2：selectbox， 3：timebox
				key: 1,
				title: '弹窗的标题',
				content: '说明当前状态、提示用户解决方案 ，最好不要超过两行',
				btn: {
					ok: '主操作',
					okcolor: 'd-color-r',
					cancel: '',
					cancolor: ''
				}
			},
			observer: function observer(val) {
				this.setData({
					local_boxconfig: val
				})
			}
		},
		items: {
			type: Array,
			value: [],
			observer: function observer(val){
				this.setData({
					choices: val
				})
			}
		},
		choseKey: {
			type: Number,
			value: 0,
			observer: function observer(val) {
				this.setData({
					chooseVal: [val]
				})
			}
		},
		timeArr: {
			type: Array,
			value: [],
			observer: function observer(val) {
				this.setData({
					timeChoose: val
				})
			}
		}
	},
	option: {
	},
	data:{
		msg: '这是弹框组件',
		choices: [],
		chooseVal: [],
		local_boxconfig: {},
		timeChoose: [],
		years: [],
		months: [1,2,3,4,5,6,7,8,9,10,11,12],
		mindays: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28],
		days: []
	},
	methods: {
		init() {
			let {max, min, year} = this.dataYf()
			let arr = this.data.timeChoose[0]
			let timeChoose
			if (this.data.timeChoose.length) {
				timeChoose = [30 - (year - arr - min) - 1, this.data.timeChoose[1] - 1, this.data.timeChoose[2] - 1]
			} else {
				timeChoose = [0, 0, 0]
			}
			this.setData({
				timeChoose
			})
		},
		surebtn (e) {
			let { key } = e.currentTarget.dataset
			let time = []
			if (this.data.boxconfig.model === 3) {
				let {max, min, year} = this.dataYf()
				time = [this.data.timeChoose[0] + (year - min - max + 1), this.data.timeChoose[1] + 1, this.data.timeChoose[2] + 1]
			}
			let choseIndex = this.data.chooseVal[0] >= 0 ? this.data.chooseVal[0] : 0
			if (this.data.boxconfig.model === 1) this.triggerEvent("surefunc", true)
			else this.triggerEvent("surefunc", {key: key, choseIndex: choseIndex, time: time, val: this.data.choices[this.data.chooseVal[0]] && this.data.choices[this.data.chooseVal[0]].value || this.data.choices[0] && this.data.choices[0].value || ''});
		},
		cancelbtn () {
			this.triggerEvent("cancelfunc", true);
		},
		chooseChange(e) {
			console.log(e.detail.value)
			this.data.chooseVal = e.detail.value
		},
		timeChange(e) {
			let val = e.detail.value
			let year = this.data.years[val[0]]
			let monthval = this.data.months[val[1]] + ''
			let bigm = '1,3,5,7,8,10, 12'
			let sm = '4,6,9,11'
			this.data.timeChoose = val
			if (bigm.indexOf(monthval) > -1 && monthval !== '2') {
				this.data.days = this.data.mindays.concat([29, 30, 31])
			} else if (sm.indexOf(monthval) > -1) {
				this.data.days = this.data.mindays.concat([29, 30])
			} else {
				if (year % 4 === 0) this.data.days = this.data.mindays.concat([29])
				else this.data.days = this.data.mindays.concat([])
			}
			this.setData({
				days: this.data.days
			})
		},
		dataYf() {
			let that = this
			return {
				max : that.data.local_boxconfig.max || 30,
				min :that.data.local_boxconfig.min || 18,
				year :new Date().getFullYear()
			}
		}
	},
	created: function() {
	},
	attached: function() {
		let {max, min, year} = this.dataYf()
		this.data.years = []
		for(var i = 0; i < max; i++ ) {
			this.data.years.unshift(year - min - i)
		}
		this.data.days = this.data.mindays.concat([29, 30, 31])
		// console.log(this.data.timeChoose)
		this.setData({
			years: this.data.years,
			days: this.data.days
		})
	},
	ready: function(){
		// 日期设定
		this.init()
	}
})