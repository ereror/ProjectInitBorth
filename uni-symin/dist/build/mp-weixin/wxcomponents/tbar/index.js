let iconimg = {
	thome_d: '../../static/images/t-home-d.png',
	thome_a: '../../static/images/t-home-a.png',
	tmess_d: '../../static/images/t-mess-d.png',
	tmess_a: '../../static/images/t-mess-a.png',
	tuser_d: '../../static/images/t-user-d.png',
	tuser_a: '../../static/images/t-user-a.png'
}

Component({
	data:{

	},
	properties: {
		tbarconfig: {
			type: Array,
			value: [{
				url: '/pages/tool/index',
				icon_a: iconimg.thome_a,
				icon_d: iconimg.thome_d,
				isActiveIndex: 0,
				text: '首页'
			}, {
				url: '/pages/message/index',
				icon_a: iconimg.tmess_a,
				icon_d: iconimg.tmess_d,
				isActiveIndex: 1,
				text: '消息'
			}, {
				url: '/pages/userinfo/index',
				icon_a: iconimg.tuser_a,
				icon_d: iconimg.tuser_d,
				isActiveIndex: 2,
				text: '我的'
			}]
		},
		isActiveIndex: {
			type: Number,
			value: 0
		}
	},
	option: {
	},
	methods: {
		goToDistancs (e) {
			console.log('%o', e)
			let { url } = e.currentTarget.dataset
		    wx.reLaunch({
				url: url,
		    })
			// this.triggerEvent("surefunc", true);
		},
	},
	attached: function() {
	},
	ready: function(){
	}
})