<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
	<dialogbox @surefunc='surefunc' :boxconfig='boxconfig' v-if='showChoosebox'></dialogbox>
	<video :src="userInfo.gender === 1 ? mVideo: wVideo" class='videobox' id='videoExample' enable-play-gesture='true' show-center-play-btn='false' nitial-time='1'></video>
		<view class='suv-box'>
			<view class="suv-skip flex-x-r" data-type='skip' @click='dealDataFunc' v-if='type'>暂时跳过</view>
			<view class="suv-title">用视频大方介绍自己</view>
			<view class="suv-video">
				<image :src='userInfo.gender === 1 ? mVideoImg : wVideoImg' mode="aspectFill" class='suv-img'></image>
				<image :src='playImg' class='suv-play' @click='playVideo'></image>
			</view>
			<view class="suv-tips-title">TIPS</view>
			<view class="suv-tips">
				<view>大方地自我介绍，更有吸引力</view>
				<view>请勿赤裸上身拍摄，否则不予通过</view>
				<view>（健身，游泳除外）</view>
				<view class='text-red'>视频认证不能小于10秒，大于30秒</view>
			</view>
			<form :report-submit=true @submit='createFormId'>
				<button form-type='submit' class='c-btn lg suv-btn' data-type='recode' @click='dealDataFunc'>开始录制视频</button>
			</form>
		</view>
	</block>
</template>

<script>
    import Vue from 'vue';
	import infoService from '../../api/info/info'
	import util from '../../static/utils/index.js'
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
					title: '完善基本资料',
					bgset: 'bg-gradual-dred',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2
				},
				suvImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/test2.jpg',
				playImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-play.png',
				wVideo: 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/sfximao/yutest.mp4',
				wVideoImg: 'https://sns-cdn.myxianxiaobao.com/vip_profile/user_10013.jpg',
				mVideo: 'https://sns-cdn.myxianxiaobao.com/vip_profile/user_20037.mp4',
				mVideoImg: 'https://sns-cdn.myxianxiaobao.com/vip_profile/user_20037.jpg',
				userInfo: {
					gender: 2
				},
                boxconfig: {
                    key: 0,
                    model: 1,
                    title: '',
                    content: '视频认证不能低于10秒，大于30秒',
                    btn: {
                        ok: '知道啦',
                        okcolor: 'd-color-r'
                    }
                },
				type: '',
				showChoosebox: false
			}
		},
		onLoad(param) {
			// let { type } = param
			// this.type = type
			// if (type === 'save') {
			// 	this.userInfo = app.globalData.userInfo
			// 	app.$vm.saveData(this.userInfo)
			// 	this.createOrder()
			// }
		},
		onShow() {
			this.userInfo = app.globalData.userInfo
		},
		methods: {
			playVideo(e) {
				let { src } = e.currentTarget.dataset
				let video = wx.createVideoContext('videoExample')
				this.playSrc = src
				setTimeout(function(){
					video.requestFullScreen({direction: 0})
					video.play()
				}, 500)
			},
			dealDataFunc(e) {
				this.choseVideo(res => {
					res = JSON.stringify(res)
					uni.navigateTo({
						url: `/pages/tool/videorz?upFileObj=${res}`
					})
				})
			},
			choseVideo(callback) {
				// 选择video
				let that = this
				wx.chooseVideo({
				    sourceType: ['camera'],
				    maxDuration: 30,
				    camera: 'front',
					success: function (res) {
						let isOkVideo = res.duration > 10
						if (isOkVideo) {
							callback && callback(res)
						} else {
							that.showChoosebox = true
						}
					}
				})
			},
			surefunc() {
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
		overflow: hidden;
	}
	.videobox {
		height: 0rpx;
		width: 0rpx;		
	}
	.suv-box {
		padding: 0rpx 30rpx 20rpx 30rpx; 
		
	}
	.suv-skip {
		font-size: 24rpx;
		color: #999999;
		line-height: 34rpx;
	}
	.suv-title {
		margin-top: 6rpx;
		text-align: center;
		font-size: 32rpx;
		color: #000000;
		font-weight: 600;
	}
	.suv-video {
		margin: 40rpx auto;
		position: relative;
		width: 382rpx;
		height: 678rpx;
		overflow: hidden;
	}
	.suv-img {
		width: 100%;
		height: 100%;
	}
	.suv-play {
		position: absolute;
		width: 104rpx;
		height: 104rpx;
		top: 288rpx;
		left: 140rpx;
	}
	.suv-tips-title {
		margin-top: 40rpx;
		text-align: center;
		font-size: 32rpx;
		line-height: 44rpx;
		font-weight: 600;
		color: #666666;
	}
	.suv-tips {
		margin-top: 20rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		color: #999999;
	}
	.suv-tips > view {
		text-align: center;
	}
	.suv-btn {
		position:fixed;
		bottom: 40rpx;
		/* margin-top: 50rpx; */
		width: 690rpx;
		height: 88rpx;
		border-radius: 30rpx;
		background: #F81F5E !important;
		font-size: 32rpx;
		color: white;
		letter-spacing: .1em;
	}
	.text-red {
		font-weight: 600;
	}
</style>
