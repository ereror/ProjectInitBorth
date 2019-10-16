<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<toast v-if='showtoast' :toastconfig='toastconfig'></toast>
		<video :src="playSrc" class='videobox' id='videoPlay' enable-play-gesture='true' show-center-play-btn='false' nitial-time='1'></video>
		<form class='flex-b' :report-submit=true @submit='createFormId'>
		<dialogbox @surefunc='surefunc' @cancelfunc='cancelfunc' :boxconfig='boxconfig' v-if='showChoosebox'>
			<view class='I-dialog'>
				<image :src='ibg' class='I-dialog-bg' mode="widthFix"></image>
				<view class='I-dialog-text'>立即注册51约账号</view>
				<view class='I-dialog-text'>体验不同以往的高效约玩</view>
			</view>
			<view class="I-d-btn flex-b">
				<button form-type='submit' class='d-btn-cancel d-color-b' @click='cancelfunc'>再逛一逛</button>
				<button form-type='submit' class='d-btn-sure d-color-r' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">登录</button>
			</view>
		</dialogbox>
		</form>
		<view class='I-box'>
			<view class='I-bar' :style="{ 'top': barconfig.CustomBar + 'px'}" @click='showBox' v-if='false'>
				30个精选 向上滑动查看为你推荐的优质会员
			</view>
			<view class='I-content'>
				<view class='I-item' v-for='(item, index) in userList' :key='index'>
					<view class='I-detail-box'>
						<image :src='item.head' class='I-item-img' mode="aspectFill"></image>
						<!-- <image :src='vplay' class='I-item-big' :data-src='item.video' @click='playVideo'></image> -->
						<view class='I-detail'>
							<view class='I-d-msg flex-x-l'>
								<view class='I-d-name I-textshadow'>{{item.nikename ? item.nikename : item.gender === 1 ? '小哥哥XDGF9878' : '小姐姐XDGF9878'}}</view>
								<view class='I-d-mark I-textshadow'>/</view>
								<view class='I-d-text I-textshadow'>{{item.age || '28'}}</view>
								<view class='I-d-mark I-textshadow'>/</view>
								<view class='I-d-text I-textshadow'>{{item.star || '双子座'}}</view>
							</view>
							<view class='I-d-icons flex-x-l'>
								<view class='I-d-text I-textshadow'>{{item.province || '四川省'}} {{item.city || '成都市'}}</view>
							</view>
						</view>
					</view>
					<view class='I-text-box flex-b'>
						<view class='I-text flex-x-l'>
							<view class='I-text-mark'>●</view>
							<view class='I-text-detail'>{{item.want || '希望一起吃饭'}}</view>
						</view>
						<view class='I-btn flex-x-r' v-if='false'>
							<form :report-submit=true @submit='createFormId'>
								<button form-type='submit' class='c-btn c-bgred I-btn-d'  @click='showBox'>报名约会</button>
							</form>
						</view>
					</view>
					<view class='I-text-box flex-b'>
						<view class='I-text I-text-02'>
							<view class='I-text-detail-2'>时间: {{item.go_time}}</view>
							<view class='I-text-detail-2 I-text-detail-3'>地点: {{item.go_city}}</view>
						</view>
						<view class='I-btn flex-x-r'>
							<form :report-submit=true @submit='createFormId'>
								<button form-type='submit' class='c-btn c-bgred I-btn-d'  @click='showBox'>报名约会</button>
							</form>
						</view>						
					</view>
				</view>
			</view>
		</view>
		<view class='I-login-box'>
			<view class='I-login-btn' @click='showBox'>
				<form :report-submit=true @submit='createFormId' class='I-btn-d3'>
					<button form-type='submit' class='c-btn c-bgred I-btn-d2' data-url='/pages/index/index' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" v-if='isNotRegist'>登录/注册</button>
					<button form-type='submit' class='c-btn c-bgred I-btn-d2' data-url='/pages/index/index' @click='goUrl' v-if='!isNotRegist'>登录/注册</button>
				</form>
			</view>
			<view class='I-login-text flex-c'>
				<text>登录即同意51约</text>
				<view class='I-login-text-r' data-url="/pages/webview/index" data-keys='1' @click.stop='goDetail'>用户协议</view>
				<text>和</text>
				<view class='I-login-text-r' data-url="/pages/webview/index" data-keys='2' @click.stop='goDetail'>隐私协议</view>
			</view>
		</view>
		<view @click='showBox'>
			<tbar :isActiveIndex='-1' :tbarconfig='tbarconfig'></tbar>
		</view>
	</block>
</template>

<script>
    import Vue from 'vue';
	import utils from '../../static/utils/index.js'
	import commonService from '../../api/common/common'
	import localstorage from '../../static/utils/localstorage.js'
	import infoService from '../../api/info/info'
    import {
        mapGetters
    } from 'vuex'
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
					title: '逛一逛',
					bgset: 'bg-gradual-dred',
					tset: 'bg-gradual-tred'
				},
				boxconfig: {
					key: 0,
					model: 1
				},
				toastconfig: {
					model: 1,
					icon: false,
					content: '',
					type: 1
				},
				vsxIcon: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-sx.png',
				Iitemimg: 'https://sns-cdn.myxianxiaobao.com/sfximao/test1.jpg',
				vHot: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-hot.png',
				vplay: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-play.png',
				ibg: 'https://sns-cdn.myxianxiaobao.com/sfximao/idialogbg3.png',
				playSrc: '',
				showChoosebox: false,
				isTaken: false,
				isNotRegist: true,
				userList: [],
				sex: '',
				isRegistDesn: false, 
				showtoast: false // 信息提示
			}
		},
        computed: {
            ...mapGetters({
                tbarconfig: 'tbarconfig'
            })
        },
		onLoad(param) {
			this.sex = param.sex * 1
		},
		onShow() {
			// let token = app.globalData.token || localstorage.getItem('token')
			this.sex = !this.sex ? (app.globalData.sex * 1) : this.sex * 1
			this.isNotRegist = app.globalData.isNotRegist
			this.userInfo = app.globalData.userInfo
			let isNull = utils.isEmpty(this.userInfo)
			if (!isNull) {
				// app.$vm.goDesnation()
				// this.isRegistDesn = true
				// return
			}
			this.getlookList(this.sex)
		},
		onUnload() {
			app.globalData.pagesition = this.isRegistDesn
		},
		methods: {
			getlookList (sex) {
				// 查看更多例子
				let gender = sex === 1 ? 2 : 1
				infoService.getNewList({gender}).then(res => {
					if (res.code === 10000) {
						this.userList = res.data
					}
				})
			},
			playVideo(e) {
				let { src } = e.currentTarget.dataset
				let video = wx.createVideoContext('videoPlay')
				this.playSrc = src
				setTimeout(function(){
					video.requestFullScreen({direction: 0})
					video.play()
				}, 500)
			},
			goDetail(e) {
				let { url, keys } = e.currentTarget.dataset
				let str = ''
				if (keys * 1 === 1) str = 'url=https://h5.myxianxiaobao.com/sns-page/license.html&title=用户协议'
				if (keys * 1 === 2) str = 'url=https://h5.myxianxiaobao.com/sns-page/privacy.html&title=隐私协议'
				uni.navigateTo({
					url: url + '?' + str
				})
			},
			goUrl(e){
				this.isRegistDesn =  true
				utils.goUrl(e)
			},
			getPhoneNumber(e) {
				this.showChoosebox = false
				let { openid } = app.globalData
				let that = this
				let param = {
					openid: openid || localstorage.getItem('openid'),
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv,
					gender: this.sex,
					channel_type: app.globalData.shareFrom.type || 0,
					channel_name: app.globalData.shareFrom.id || 0
				}
				if (!e.detail.iv || !e.detail.encryptedData) return
				commonService.uerRegist(param).then(res => {
					let data = res.data
					if (res.code === 10000) {
						let {token, uid} = data
						app.globalData.token = token
						app.globalData.uid = uid
						app.globalData.isNotRegist = false
						localstorage.setItem('token', token)
						that.message('授权成功！')
						app.$vm.init()
						app.$vm.sendShareMessAge()
						this.isRegistDesn =  true
						uni.reLaunch({
							url: '/pages/regist/stepuser'
						})
					} else {
						that.message(res.msg)
					}
				})
			},
			message (content, type, icon) {
				// debugger
				this.toastconfig.content = content
				this.toastconfig.type = type || 1
				utils.showtoast(this, 'showtoast', 1000)
			},
			showBox(){
				this.showChoosebox = true
			},
			cancelfunc(){
				// 取消
				this.showChoosebox = false
			},
			createFormId(e) {
				if (e.detail.formId) app.$vm.sendFormId(e.detail.formId)
			}
		}
	});
</script>

<style>
	page {
		background: #f9f9f8;
	}
	.videobox {
		height: 0rpx;
		width: 0rpx;
	}
	.I-box {
		/* padding: 65rpx 0 0 0; */
	}
	.I-bar {
		position: fixed;
		z-index: 999;
		left: 0;
		width: 100%;
		height: 60rpx;
		line-height: 60rpx;
		background: rgb(248, 31, 94);
		color: white;
		font-size: 28rpx;
		text-align: center;
	}
	.I-content {
		padding: 0 30rpx;
	}
	.I-item {
		margin-bottom: 40rpx;
		height: 886rpx;
		/* height: 786rpx; */
		width: 690rpx;
		border-radius: 30rpx;
		background: white;
		overflow: hidden;
	}
	.I-item-img {
		width: 690rpx;
		height: 690rpx;
		border-radius: 30rpx;
	}
	.I-item-big {
		position: absolute;
		z-index: 222;
		width: 104rpx;
		height: 104rpx;
		top: 294rpx;
		left: 294rpx;
	}
	.I-detail-box {
		position: relative;
		overflow: hidden;
	}
	.I-detail {
		position: absolute;
		z-index: 22;
		width: 100%;
		padding: 30rpx;
		bottom: 0;
		color: white;
	}
	.I-textshadow {
		text-shadow: 1rpx 1rpx 2rpx rgba(0,0,0,.2), -1rpx 1rpx 2rpx rgba(0,0,0,.2), 1rpx -1rpx 2rpx rgba(0,0,0,.2), -1rpx -1rpx 2rpx rgba(0,0,0,.2);
	}
	.I-d-name {
		font-size: 34rpx;
		color: white;
	}
	.I-d-mark {
		margin: 0 10rpx;
		font-size: 26rpx;
		font-weight: 600;
	}
	.I-d-text {
		font-size: 24rpx;
	}
	.I-d-icons {
		margin-top: 20rpx;
		font-size: 26rpx;
		line-height: 36rpx;
		color: white;
		text-shadow: 1rpx 1rpx 2rpx black;
	}
	.I-d-addr {
		margin-left: 20rpx;
	}
	.I-text-box {
		height: 96rpx;
		overflow: hidden;
		background: white;
	}
	.I-text {
		font-size: 32rpx;
		line-height: 44rpx;
		color: #000000;
	}
	.I-text-02 {
		padding: 0 30rpx;
	}
	.I-text-mark {
		font-size: 36rpx;
		color: rgb(248, 31, 94);
		margin: 0 20rpx 0 30rpx;
	}
	.I-btn {flex:auto;padding-right: 30rpx;}
    .I-btn-d, .I-btn-d2 {
		width: 188rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx;
		color: white;
		background: #F81F5E !important;
	}
	.I-btn-d2 {
		width: 220rpx;
		height: 88rpx;
		border-radius: 44rpx;
		line-height: 88rpx;
		font-size: 32rpx;
		/* margin: 134rpx auto; */
	}
	.I-btn-d3 {
		margin: 130rpx auto;
	}
	.I-login-box {
		position: fixed;
		z-index: 477;
		bottom: 98rpx;
		width:100%;
		padding: 0 10rpx;
		background: linear-gradient(180deg, rgba(255,255,255, 0) 0% 43%, rgba(255,255,255, 0) 43% 45%, #ffffff 43% 45%, #ffffff 45% 100%);
		overflow: hidden;
	}
	.I-login-btn {
		width: 100%;
		height: 210rpx;
		display: flex;
		background-image: url('https://sns-cdn.myxianxiaobao.com/sfximao/loginbg.png');
		background-repeat: no-repeat;
		background-size: cover;
	}
	.I-login-text {
		margin: 10rpx 0;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
		color: #999999;
		text-align: center;
	}
	.I-login-text-r {
		color: rgb(248, 31, 94);
		line-height: 30rpx;
	}
	.I-dialog {
		width: 100%;
	}
	.I-dialog-bg {
		width: 100%;
		margin-bottom: 30rpx;
	}
	.I-dialog-text {
		font-size: 28rpx;
		line-height: 48rpx;
		text-align: center;
		color: #333333;
	}
	/* 辅助btn */
	.I-d-btn {
		color: white;
		padding:30rpx 40rpx;
	}

	.d-btn-cancel, .d-btn-sure {
		width:200rpx;
		height:88rpx;
		border-radius:44rpx;
		font-size: 32rpx;
		color: white;
		line-height: 88rpx;
	}
	.I-text-detail-2 {
		font-size:26rpx;
		line-height: 36rpx;
		color: #666666;
		word-spacing: 20rpx
	}
	.I-text-detail-3 {
		margin-top: 20rpx;
	}
	.d-color-b {
		background: #6267F9;
	}

	.d-color-r {
		background:rgba(248,31,94,1);
	}

</style>
