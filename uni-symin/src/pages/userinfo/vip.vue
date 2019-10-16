<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<view class="vip-head">
			<image :src='userInfo.header_url ? userInfo.header_url : viph' class='viph' mode="aspectFill"></image>
		</view>
		<view class='vip-box'>
			<image :src='vipimg' class='vip-box-img'></image>
			<view class='vip-range'>{{userInfo.vip_id ? vipText[userInfo.vip_id] : '普通会员'}}</view>
			<view class='vip-count'>每天{{!userInfo.vip_id ? 5 : vipText[-userInfo.vip_id]}}把钥匙</view>
			<view class='vip-title'>
				购买vip
			</view>
			<view class='vip-itembox'>
				<view class='vip-item' v-for='(item, index) in vipItem' :key='index' :data-id='item.id' @click='checkOrder'>
					<image class='vip-dot' mode='aspectFill' :src='vipIcon[index]'></image>
					<view class='vip-item-content'>
						<view class='vip-rang'>
							<text>{{item.title}}</text>
							<view class='vip-datas'>
								<image :src='vipt' class='vipt' mode='widthFix'></image>
								<text>{{item.times}}</text>
							</view>
							<image :src='vipmore' class='vipmore' mode='widthFix' v-if='item.isTj'></image>
						</view>
						<view class='vip-tips'>{{item.text}}</view>
						<view class='vip-tips' v-if='item.lititle'>{{item.lititle}}</view>
					</view>
					<button class='c-btn vipbtn'>
						<text>￥</text>
						<text class='vip-text-big'>{{item.price}}.</text>
						<text>00</text>
					</button>
				</view>
			</view>
			<view class='vip-title vip-title2'>
				会员权限
			</view>
			<view class='vip-server'>
				<view class='vip-s-item' v-for='(item, index) in vips' :key='index'>
					<image class='vip-s-img' :src='item.img'></image>
					<view class='vip-s-text'>{{item.text}}</view>
				</view>
			</view>
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
					title: '会员中心',
					bgset: 'bg-gradual-transparent',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2
				},
				viph: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconH.jpg',
				vipimg: 'https://sns-cdn.myxianxiaobao.com/sfximao/viphead.png',
				vipt: 'https://sns-cdn.myxianxiaobao.com/sfximao/vip-time.png',
				vipmore: 'https://sns-cdn.myxianxiaobao.com/sfximao/vip-more.png',
				vipIcon: [],
				vipItem: [
					{title: '白银VIP', times: '30天', isTj: false, price: 98, text: '每天送10钥匙', lititle: '', id: 1},
					{title: '黄金VIP', times: '90天', isTj: true, price: 268, text: '每天送15钥匙', lititle: '', id: 2},
					{title: '铂金VIP', times: '180天', isTj: false, price: 518, text: '每天送20钥匙', lititle: '', id: 3},
					{title: '钻石VIP', times: '365天', isTj: false, price: 998, text: '每天送30钥匙', lititle: 'Ta们会主动认识你', id: 4}
				],
				vips: [
					{img: 'https://sns-cdn.myxianxiaobao.com/sfximao/vip-x.png', text: '查看视频认证'},
					{img: 'https://sns-cdn.myxianxiaobao.com/sfximao/vip-p.png', text: '查看手机号'},
					{img: 'https://sns-cdn.myxianxiaobao.com/sfximao/vip-h.png', text: '高级筛选'},
					{img: 'https://sns-cdn.myxianxiaobao.com/sfximao/vip-y.png', text: '优先展示'},
					{img: 'https://sns-cdn.myxianxiaobao.com/sfximao/vip-w.png', text: '查看微信'},
					{img: 'https://sns-cdn.myxianxiaobao.com/sfximao/vip-q.png', text: '尊贵标识'}
				],
				vipText: {},
				userInfo: {}
			}
		},
		onLoad() {
			this.vipIcon = app.globalData.vipIcon || []
			this.vipItem = app.globalData.vipItem
			this.init()
		},
		onShow() {
			this.userInfo = app.globalData.userInfo
		},
		methods: {
			init() {
				if (!this.vipItem || this.vipItem && !this.vipItem.length) this.getPlayList()
				else this.setVipitem()
			},
			setVipitem() {
				this.vipItem.map(v => {
					this.vipText[v.id] = v.title
					this.vipText[-v.id] = v.key_num
				})
			},
			getPlayList() {
				app.$vm.getPlayList().then(res => {
					this.vipItem = res
					this.setVipitem()
				}).catch(err => {
					this.messageFunc('获取订单列表失败，请重试')
				})
			},
			checkOrder(e) {
				let { id } = e.currentTarget.dataset
				let param = {
					pay_from: wx.IS_IOS ? 1 : 2,
					platform: 1,
					app_name: '51y',
					vip_id: id
				}
				infoService.payCheckVip(param).then(res => {
					if (res.code === 99997) {
						let order_id = res.data && res.data.order_id * 1
						this.createOrder(order_id)
					} else {
						let msg = res.msg || '生成订单失败，请重试'
						this.messageFunc(msg)
					}
				}).catch(err => {
					this.messageFunc('生成订单失败，请重试')
				})
			},
			createOrder (orderId) {
				infoService.getGatePay({order_id: orderId}).then(res => {
					if (res.code === 10000) {
						let data = res.data
						util.pay(data).then(payres => {
							if (payres) this.messageFunc('支付成功！', () => {
								uni.$emit('getUserInfo', {msg: '更新用户信息'})
								uni.reLaunch({url: '/pages/index/index'})
							})
							if (!payres) this.messageFunc('支付取消！', () => {
								infoService.cancle({order_id: orderId})
							})
						}).catch(err => {
						})
					} else {
						this.messageFunc('生成订单失败，请重试')
					}
				})
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
		background-image: url('https://sns-cdn.myxianxiaobao.com/sfximao/vipbg.png');
		background-position: top center;
		background-repeat: no-repeat;
		background-color: #ffb400;
		background-size: 598rpx 398rpx;
		background-attachment: fixed;
	}
	.vip-head {
		width:210rpx;
		height: 210rpx;
		margin: 74rpx 274rpx 0;
		border-radius: 50%;
		box-shadow: 0 0 0 15rpx #ffde90, 0 0 0 36rpx #ffc847, 0 0 0 64rpx #ffbb1a;
	}
	.vip-range {
		position: absolute;
		width:100%;
		height: 48rpx;
		line-height: 48rpx;
		top: 0rpx;
		left: 0;
		font-size: 34rpx;
		text-align: center;
		color: white;
		z-index: 99;
	}
	.viph {
		width: 100%;
		border-radius: 50%;
	}
	.vip-box {
		position: relative;
		width: 690rpx;
		height: 1380rpx;
		margin: 0 auto;
		border-radius: 30rpx;
		background: white;
		margin-bottom: 20rpx;
		padding-top: 80rpx;
	}
	.vip-box-img {
		position: absolute;
		z-index: 22;
		width: 466rpx;
		height: 112rpx;
		left: 112rpx;
		top: -40rpx;
	}
	.vip-count {
		width: 252rpx;
		height: 28rpx;
		margin: 20rpx auto 0;
		background: url('https://sns-cdn.myxianxiaobao.com/sfximao/vip-zy.png');
		background-size: 100% 100%;
		background-repeat: no-repeat;
		font-size: 30rpx;
		color: #000000;
		line-height: 28rpx;
		text-align: center;
	}
	.vip-title {
		display: flex;
		width: 284rpx;
		height: 42rpx;
		margin: 82rpx auto 0;
		font-size: 32rpx;
		line-height:32rpx;
		text-align: center;
		justify-content: space-between;
	}
	.vip-title::before {
		content: '——•';
		line-height: 1;
		height: 42rpx;
		font-weight: 600;
	}
	.vip-title::after {
		content: '•——';
		line-height: 1;
		height: 42rpx;
		font-weight: 600;
	}
	.vipbtn {
		width: 150rpx;
		height: 60rpx;
		border-radius: 30rpx;
		color: white;
		background: #F81F5E !important;
		line-height: 2;
	}
	.vip-itembox {
		margin-top: 10rpx;
	}
	.vip-item {
		display: flex;
		min-height: 150rpx;
		justify-content: space-between;
		align-items: flex-start;
		border-borrom: 1rpx solid #eeeeee;
		padding: 30rpx;
	}
	.vip-dot {
		width: 60rpx;
		height: 60rpx;
		/* background: #6267F9; */
/* 		border-radius: 50%; */
	}
	.vip-item-content {
		flex:1;
		margin-left: 10rpx;
	}
	.vip-rang {
		width:100%;
		display: flex;
		justify-content: flex-start;
		line-height: 1;
		font-size: 36rpx;
		color: #252837;
	}
	.vip-datas {
		margin-left: 8rpx;
		width: 120rpx;
		height: 28rpx;
		border-radius: 14rpx;
		background: #09D6A1;
		color: white;
		font-size: 24rpx;
		text-align: center;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.vipt {
		height:32rpx;
		width: 32rpx;
		margin-right: .2em;
	}
	.vipmore {
		width: 44rpx;
		height: 28rpx;
		margin-left: 10rpx;
	}
	.vip-tips {
		line-height: 1;
		font-size: 28rpx;
		margin-top: 18rpx;
		color: #000000;
		text-align: left;
	}
	.vip-text-big {
		font-size: 36rpx;
		vertical-align: bottom;
	}
	.vip-title2 {
		width: 298rpx;
		height: 42rpx;
	}
	.vip-server {
		padding: 40rpx;
		display: flex;
		flex-wrap: wrap;
	}
	.vip-s-item {
		width: 50%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		margin-bottom: 20rpx;
	}
	.vip-s-img {
		height: 80rpx;
		width: 80rpx;
		margin-right: 20rpx;
	}
	.vip-s-text {
		font-size: 28rpx;
		color: #4A4A4A;
	}
</style>
