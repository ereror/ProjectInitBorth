<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<cover-view class="actionimage1" @click='goBack'>
			<cover-image :src="iconbw" class="actionimage1-img"/></cover-image>
		</cover-view>
		<view class='vi-box' :style="{ 'margin-top': -barconfig.CustomBar + 'px'}">
			<video :src="src" object-fit='contain' class='vi-source' :enable-play-gesture='true' :show-center-play-btn='false' nitial-time='1' loop='true' id='video' :controls='false'></video>
			<cover-view class='vi-btnbox' :style="{opacity: isShowBtn ? 1 : 0}">
				<cover-view class='vi-bar'>
					<cover-view class='vi-bar-img' >
						<cover-image class='vi-play-imgd' @click='changeFunc' :src='changeImg' v-if='!isOwnVideo && isVideoStatus != 3'></cover-image>
						<button open-type='share' class='vi-bar-img-btn' v-if='isOwnVideo'><cover-image class='vi-play-imgd' :src='shareImg'></cover-image></button>
					</cover-view>
					<cover-view :class="['vi-play-box', isVideoStatus === 3 ? 'vi-replay' : '']">
						<cover-image  class='vi-play' @click='goBack' :src="isVideoStatus === 1 ? choseImg : choseAginImg"></cover-image>
						<cover-view class='vi-play-text' v-if='isVideoStatus > 1'>重新拍摄</cover-view>
					</cover-view>
					<cover-view class='vi-finish-box' v-if="isVideoStatus === 3">
						<cover-image class='vi-finish' data-url='/pages/index/index' @click='finishVideo' :src="finishImg"></cover-image>
						<cover-view class='vi-finish-text'>完成</cover-view>
					</cover-view>
					<cover-view class='vi-mark-text vi-rz' @click='playFunc'>{{isRzText}}</cover-view>
				</cover-view>
				<cover-image class='vi-finish-back' @click='goBack' :src="finishBackImg"></cover-image>
			</cover-view>
<!-- 			<button @click='playFunc'>播放</button> -->
		</view>
	</block>
</template>

<script>
    import Vue from 'vue';
	import utils from '../../static/utils/index.js'
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
					title: '视频认证',
					bgset: 'bg-gradual-transparent',
					tset: 'bg-gradual-tred'
				},
				iconbw: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconbw.png',
				bgImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/test1.jpg',
				changeImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-change.png',
				choseImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-create.png',
				choseAginImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-agin.png',
				finishImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-finish.png',
				shareImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/share.png',
				finishBackImg: '../../static/images/video-close.png',
				isRzText: '请勿赤裸上身拍摄，否则不予通过（健身，游泳除外）',
				isShowBtn: true,
				src: '',
				isTakePhoto: true,
				upFileObj: {},
				userInfo: {},
				isOwnVideo: false,
				isVideoStatus: 1 // 1 未选择, 2 选择video不对， 3 选择正确
			}
		},
		onLoad(param) {
			this.upFileObj = param.upFileObj || {}
			if (this.upFileObj.length && !utils.isEmpty(this.upFileObj)) {
				try{
					this.upFileObj = JSON.parse(this.upFileObj)
					this.chooseResult(this.upFileObj)
				}catch(e){
					//TODO handle the exception
				}
			} else {
				this.init()
			}
		},
		onShow() {
		},
		onShareAppMessage() {
			let header_url = this.userInfo.header_url ?  this.userInfo.header_url : this.userInfo.gender === 1 ? app.globalData.Iitemimg : app.globalData.Iitemimgw
			return {
			  title: `${this.userInfo.nickname}拍了一个自拍视频快来看看颜值有多少`,
			  path: '/pages/index/index?otherId=' + this.userInfo.memberID + '&shareType=user&id=' + this.userInfo.memberID,
			  imageUrl: header_url,
			  success(d){
			  }
			}
		},
		onUnload() {
			let video = wx.createVideoContext('video')
			// video.requestFullScreen()
			video.stop()
		},
		methods: {
			init() {
				this.userInfo = app.globalData.userInfo
				if (this.userInfo && this.userInfo.video_url) {
					this.src = this.userInfo.video_url
					this.isOwnVideo = true
					this.$nextTick(() => this.playFunc())
				}
			},
			finishVideo (e) {
				//完成视频拍摄
				let {width, height, tempFilePath, duration} = this.upFileObj
				if (tempFilePath.length) {
					wx.reLaunch({
						url: `/pages/index/index?tempFilePath=${tempFilePath}&width=${width}&height=${height}&duration=${duration}&type=upload`,
					})
				} else {
					wx.showToast({
						icon: 'none',
						title: '当前视频存在错误，请重新上传!',
						duration: 1000
					})					
				}
				// console.log('完成视频拍摄！')
			},
			changeFunc(){
				this.isTakePhoto = !this.isTakePhoto
				this.showToast('切换摄像头')
			},
			chooseVideo(){
				// 播放视频
				let that = this
				let takeDir = this.isTakePhoto ? 'front' : 'back'
				this.src = ''
				wx.chooseVideo({
				    sourceType: ['camera'],
				    maxDuration: 30,
				    camera: takeDir,
				    success(res) {
						that.chooseResult(res)
				    },
					fail() {
						console.log('fail')
					},
					complete() {
						console.log('complete')
					}
				})
			},
			chooseResult(res) {
				let that = this
				that.isOwnVideo = false
				let isOkVideo = res.duration > 10
				if (isOkVideo) {
					that.upFileObj = res
					that.src = res.tempFilePath
					that.isVideoStatus = 3
					setTimeout(function(){
						that.playFunc()
					}, 1000)
				} else {
					that.upFileObj = {}
					that.isVideoStatus = 2
					wx.showToast({
						icon: 'none',
						title: '视频不能低于10s',
						duration: 2000
					})
				}
			},
			shareFunc() {
				// 分享
				console.log('分享')
			},
			playFunc(){
				// 播放视频
				let video = wx.createVideoContext('video')
				// video.requestFullScreen()
				video.play()
			},
			showToast(msg, type) {
				msg = this.isTakePhoto ? '已切换至前置摄像头' : '已切换至后置摄像头'
				if (type) {
					msg = '大方地自我介绍，更有吸引力'
				}
				wx.showToast({
					icon: 'none',
					title: msg,
					duration: 2000
				})
			},
			goBack() {
				uni.navigateBack()
			}
		}
	});
</script>

<style>
	page {
		overflow: hidden;
	}
	.vi-box {
		position: relative;
		height: 100%;
		width:100%;
	}
	.vi-btnbox {
		position: absolute;
		z-index: 2;
		top:0;
		left:0;
		right: 0;
		bottom: 0;
		font-size: 40px;
		color: white;
	}
	.vi-source {
		height:100%;
		width: 100%;
	}
	.vi-play-box {
		position: absolute;
		width: 150rpx;
		height:160rpx;
		left: 300rpx;
		bottom: 190rpx;
	}
	.vi-play, .vi-finish {
		margin: 0 auto;
		width:104rpx;
		height: 104rpx;
	}
	.vi-replay{
		 /* margin:800rpx 104rpx; */
		 left: 100rpx;
	}
	.vi-play-text, .vi-finish-text {
		font-size: 30rpx;
		width: 150rpx;
		text-align: center;
		margin-top: 16rpx;
	}
	.vi-finish-box {
		position:absolute;
		width: 150rpx;
		bottom: 190rpx;
		left: 490rpx;
		/* margin:-960rpx 480rpx; */
	}
	.vi-bar {
		position: relative;
		height: 100%;
		width:100%;
	}
	.vi-bar-img {
		margin:168rpx 0rpx 0rpx 644rpx ;
		width: 76rpx;
	}
	.vi-bar-img-btn {
		background: none;
		outline: none;
	}
	.vi-mark-text {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		z-inex: 12;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		color: white;
		text-align: center;
	}
	.vi-rz {
		background: rgba(193, 66, 103, .8);
	}
	.vi-play-imgd {
		height: 76rpx;
		width: 76rpx;	
	}
	.actionimage1 {
		position: absolute;
		z-index: 11111;
		padding: 30rpx 100rpx 30rpx 30rpx;
		top: 40rpx;
		left: 0rpx;
	}
	.actionimage1-img {
		width: 22rpx;
		height: 36rpx;		
	}
	.vi-finish-back {
		position:absolute;
		z-index:449;
		bottom: 106rpx;
		height: 54rpx;
		width: 54rpx;
		left: 348rpx;
	}
</style>
