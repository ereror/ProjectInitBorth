<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<view class='set-box'>
			<iptitem :inputconfig="setItem[0]">
				<switch data-key='1' @change="switchChange" color='#F81F5E' :checked='isPhone'/>
			</iptitem>
			<iptitem :inputconfig="setItem[1]">
				<switch data-key='2' @change="switchChange" color='#F81F5E' :checked='isWx'/>
			</iptitem>
		</view>
	</block>
</template>

<script>
    import Vue from 'vue';
	import util from '../../static/utils/index.js'
	import infoService from '../../api/info/info'
	let app = getApp()
	export default Vue.extend({
		data() {
			return {
				title: 'Hello',
				STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
				DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
				barconfig: {
					CustomBar: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT, 
					StatusBar: wx.STATUS_BAR_HEIGHT,
					title: '隐私设置',
					bgset: 'bg-gradual-default',
					tset: 'bg-gradual-rblack',
					hiddenTitle: 2,
					isArrow: 1
				},
				setItem: [
					{
						key: '0',
						title: '允许被查看手机',
						icon: '',
						content: '',
						arrow: false,
						size: 40,
						type: 'text',
						url: '',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: true
					},
					{
						key: '1',
						title: '允许被查看微信',
						icon: '',
						content: '',
						arrow: false,
						size: 40,
						type: 'text',
						url: '',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: true,
						last: true
					}
				],
				isWx: false,
				isPhone: false,
				changeVal: false,
				userInfo: {}
			}
		},
		onLoad() {
		},
		onShow() {
			this.userInfo = app.globalData.userInfo
			this.changeVal = false
			if (!this.userInfo.phone_permit) this.isPhone = true
			if (!this.userInfo.wechat_permit) this.isWx = true
		},
		onUnload () {
			if (this.changeVal) {
				this.vertify(1, this.isWx)
				this.vertify(2, this.isPhone)	
			}
		},
		methods: {
			switchChange(e, index) {
				this.changeVal = true
				let { key } = e.currentTarget.dataset
				let val = e.detail.value
				if (key * 1 === 1) this.isPhone = val
				if (key * 1 === 2) this.isWx = val
			},
			vertify (key, res) {
				let methodname = key === 1 ? 'accessWechat' : 'accessPhone'
				let access = res ? 'yes' : 'no'
				infoService[methodname]({access: access}).then(res => {
					if (res.code === 10000) {
						uni.$emit('getUserInfo', {msg: '更新用户信息'})
						util.showSuccess('设置成功')
					} else {
						util.showFail('设置失败')
					}
				}).catch(err => {
					util.showFail('设置失败！')
				})
			}
		}
	});
</script>

<style>
	page {
		background: #F9F9F8;
	}
	.set-box {
		margin: 40rpx 30rpx;
		border-radius: 30rpx;
		overflow: hidden;
	}
</style>
