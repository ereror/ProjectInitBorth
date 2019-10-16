<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<view class='j-box'>
			<image class="j-ad" :src='jadImg' mode="widthFix"></image>
			<view class="j-lititle">立即加入51约</view>
			<view class='j-text-box'>
				<view class='j-text'>
					<text class='j-text-big'>23000+</text>
					<text>位经过身份认证</text>
				</view>
				<view class='j-text'>
					<text>高素质女性等你加入</text>
				</view>
				<view class='j-text'>
					<text>加入51约仅</text>
					<text class='j-text-big'>￥29</text>
				</view>
			</view>
			<view class="j-icon-box flex-b">
				<view class='j-icon-item'>
					<image class='j-icon' :src='jicon01'></image>
					<view class='j-text'>无酒托</view>
				</view>
				<view class='j-icon-item'>
					<image class='j-icon' :src='jicon02'></image>
					<view class='j-text'>无诈骗</view>					
				</view>
				<view class='j-icon-item'>
					<image class='j-icon' :src='jicon03'></image>
					<view class='j-text'>高质量</view>
				</view>
			</view>
			<view class="j-smtitle" data-url='/pages/message/sfdesc' @click='goUrl'>为什么收会员费</view>
			<form :report-submit=true @submit='createFormId'>
				<button form-type='submit' class='c-btn lg j-btn' @click='joinFunc'>立即加入</button>
			</form>
		</view>
	</block>
</template>

<script>
    import Vue from 'vue';
	import util from '../../static/utils/index.js'
	import infoService from '../../api/info/info.js'
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
					title: '立即加入',
					bgset: 'bg-gradual-sfdesc',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2
				},
				jadImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/join-ad.png',
				jicon01: 'https://sns-cdn.myxianxiaobao.com/sfximao/join-icon-01.png',
				jicon02: 'https://sns-cdn.myxianxiaobao.com/sfximao/join-icon-02.png',
				jicon03: 'https://sns-cdn.myxianxiaobao.com/sfximao/join-icon-03.png',
				type: ''
			}
		},
		onLoad(param) {
			this.type = param.type
			if (this.type) this.saveUserInfo()
		},
		methods: {
			goUrl(e) {
				util.goUrl(e)
			},
			saveUserInfo() {
				let userInfo = app.globalData.userInfo
				app.$vm.saveData(userInfo).then(res => {
					uni.$emit('getUserInfo', {msg: '更新用户信息'})
				})
			},
			joinFunc() {
				// 加入
				let param = {
					pay_from: wx.IS_IOS ? 1 : 2,
					platform: 1,
					app_name: '51y'
				}
				infoService.getGateCheck(param).then(res => {
					if (res.code === 10000) {
						// uni.reLaunch({
						// 	url: '/pages/index/index'
						// })
						uni.$emit('getUserInfo', {msg: '更新用户信息'})
						uni.reLaunch({url: '/pages/index/index?fromType=vip'})
					} else if (res.code === 99997){
						let order_id = res.data && res.data.order_id * 1
						this.createOrder(order_id)
					} else {
						this.messageFunc('加入失败，请重试')
					}
				})
			},
			createOrder (orderId) {
				infoService.getGatePay({order_id: orderId}).then(res => {
					if (res.code === 10000) {
						let data = res.data
						util.pay(data).then(res => {
							console.log(res)
							if (res) {
								this.messageFunc('加入成功！', () => {
									uni.$emit('getUserInfo', {msg: '更新用户信息'})
									uni.reLaunch({url: '/pages/index/index?fromType=vip'})
								})
							} else {
								this.messageFunc('支付取消！', () => {
									infoService.cancle({order_id: orderId})
								})								
							}
						}).catch(() => {
							this.messageFunc('支付取消！', () => {
								infoService.cancle({order_id: orderId})
							})
						})
					} else {
						this.messageFunc('生成订单失败，请重试')
					}
				})
			},
			createFormId(e) {
				if (e.detail.formId) app.$vm.sendFormId(e.detail.formId)
			},
			messageFunc(str, callback) {
				wx.showToast({
					title: str,
					duration: 1000,
					icon: 'none',
					success: function(){
						callback && callback()
					}
				})
			}
		}
	});
</script>

<style>
	page {
		background: #6267f9;
		height: 100%;
		overflow: hidden;
	}
	.j-box {
		padding: 20rpx 30rpx 40rpx;
	}
	.j-ad {
		width: 630rpx;
		height: 592rpx;
		margin: 0 auto;
	}
	.j-lititle {
		text-align: center;
		font-size: 32rpx;
		line-height: 44rpx;
		color: white;
	}
	.j-text-box {
		width: 340rpx;
		margin: 0 auto;
		padding: 16rpx 0;
	}
	.j-text {
		text-align: center;
		font-size: 24rpx;
		line-height: 32rpx;
		color: white;
	}
	.j-text-big {
		font-size: 32rpx;
		border-radius: 17rpx;
		height: 34rpx;
		line-height: 34rpx;
		background: #ffb400;
		color: white;
		font-weight: 600;
		padding: 0 .5em;
	}
	.j-icon-box {
		padding: 40rpx 130rpx 30rpx;
	}
	.j-icon-item {
		width: 94rpx;
	}
	.j-icon {
		width: 94rpx;
		height: 94rpx;
	}
	.j-text {
		margin-top: 16rpx;
		text-align: center;
		font-size: 26rpx;
		color: white;
	}
	.j-smtitle {
		font-size: 24rpx;
		text-decoration: underline;
		color: white;
		text-align: center;
	}
	.j-btn {
		margin-top: 20rpx;
		width: 690rpx;
		height: 88rpx;
		border-radius: 30rpx;
		background: #ffb400 !important;
		font-size: 32rpx;
		color: white;
		letter-spacing: .1em;
	}
</style>
