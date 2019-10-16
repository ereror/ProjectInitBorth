<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<cover-view class="actionimage1"  @click='goBack'>
			<cover-image :src="iconbw" class="actionimage1-img"/></cover-image>
		</cover-view>
		<view class='vi-box' :style="{ 'margin-top': -barconfig.CustomBar + 'px'}">
			<video :src="videosrc" object-fit='contain' class='vi-source' :enable-play-gesture='true' :control='false' :show-center-play-btn='false' nitial-time='1' id='video' @ended='showBtnfunc'></video>
			<cover-view class='vi-btnbox' :style="{opacity: isShowBtn ? 1 : 0}">
				<!-- <cover-view class='vi-bar' :style="{bckground: isShowBtn ? 'url(' + bgImg +')' : 'rgba(0,0,0,1)'}"> -->
				<cover-view class='vi-bar'>
					<button open-type='share' class='vi-bar-img'><cover-image class='vi-play-imgd' :src='shareImg'></cover-image></button>
					<cover-view class='vi-bar-img2' v-if="from === 'self'" >
						<button class='vi-bar-more' @click='showOpt = !showOpt'><cover-image class='vi-play-imgd' :src='videoMore'></cover-image></button>
					</cover-view>
					<cover-image  class='vi-play' @click='playFunc' :src="playImg"></cover-image>
					<cover-view class='vi-mark-text vi-nrz'>{{type === 'rz' ? isRzText : isNrzText}}</cover-view>
					<cover-view class='vi-mark-btn vi-nrz2'>{{type === 'rz' ? '视频认证' : '视频未认证'}}</cover-view>
				</cover-view>
			</cover-view>
			<cover-view class='vi-opt' v-if='showOpt' >
				<cover-view class='vi-opt-content flex-c'>是否确定修改当前视频?</cover-view>
				<cover-view class='vi-opt-bar flex-c'>
					<cover-view @click='chooseVideo' class='vi-opt-btn vi-opt-btn-01'>修改</cover-view>
					<cover-view @click='goBack' class='vi-opt-btn'>取消</cover-view>
				</cover-view>
			</cover-view>
<!-- 			<button @click='playFunc'>播放</button> -->
		</view>
	</block>
</template>

<script>
    import Vue from 'vue';
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
					title: '视频查看',
					bgset: 'bg-gradual-transparent',
					tset: 'bg-gradual-tred'
				},
				iconbw: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconbw.png',
				bgImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/test1.jpg',
				shareImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/share.png',
				playImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-play.png',
				videoMore: '../../static/images/videoMore.png',
				isRzText: '自拍视频已通过官方审核',
				isNrzText: '自拍视频还没有认证',
				isShowBtn: true,
				type: 'nrz',
				from: 'self',
				videosrc: '',
				photoUrl: '',
				memberID: '',
				nickname: '',
				showOpt: false
			}
		},
		onLoad(param) {
			this.type = param.type || 'nrz'
			this.from = param.from || 'self'
			this.memberID = param.memberID
			this.videosrc = param.url
			this.photoUrl = param.header_url
			this.nickname = param.nickname
		},
		onShow() {
			this.userInfo = app.globalData.userInfo
			if (this.from === 'self') {
				this.photoUrl = this.userInfo.header_url
				this.memberID = this.userInfo.memberID
				this.nickname = this.userInfo.nickname
				let vertify_video = this.userInfo && this.userInfo.verfiy_list && this.userInfo.verfiy_list.filter(v => v.type === 'video')
				if (vertify_video.length && vertify_video[0].pass === 1) {
					this.type = 'rz'
				} else this.type = 'nrz'
				if (vertify_video.length && vertify_video[0].value && vertify_video[0].pass === 0) this.videosrc = vertify_video[0].value
				else if (this.userInfo.video_url) this.videosrc = this.userInfo.video_url
				// this.$nextTick(() => {
				// 	if (this.videosrc.length) this.playFunc()
				// })
			} else {
				let str = 'Ta的'
				this.isRzText = str + this.isRzText
				this.isNrzText = str + this.isNrzText
				this.$nextTick(() => {
					if (this.videosrc.length) this.playFunc()
				})
			}
		},
		onShareAppMessage() {
			return {
			  title: `${this.nickname}拍了一个自拍视频快来看看颜值有多少`,
			  path: '/pages/index/index?otherId=' + this.memberID + '&shareType=user&id=' + this.memberID,
			  imageUrl: this.photoUrl,
			  success(d){
			  }
			}
		},
		methods: {
			chooseVideo() {
				this.showOpt = false
				uni.navigateTo({
					url: '/pages/regist/stepvideo?type=edit'
				})
				// wx.chooseVideo({
				//     sourceType: ['camera'],
				//     maxDuration: 60,
				//     camera: 'front',
				// 	success: function (res) {
				// 		uni.navigateTo({
				// 			url: `/pages/tool/videorz?upFileObj=${res}`
				// 		})
				// 	}
				// })
			},
			showBtnfunc(){
				this.isShowBtn = true
			},
			playFunc(){
				// 播放视频
				this.isShowBtn = false
				let video = wx.createVideoContext('video')
				// video.requestFullScreen()
				video.play()
			},
			goBack() {
				uni.navigateBack()
			}
		}
	});
</script>

<style>
	page {
		height: 100%;
		overflow: hidden;
	}
	.vi-box {
		position: relative;
		height: 100%;
		width:100%;
		overflow: hidden;
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
	.vi-play {
		width:104rpx;
		height: 104rpx;
		margin: 372rpx 324rpx;
	}
	.vi-bar {
		position: relative;
		height: 100%;
		width:100%;
	}
	.vi-bar-img {
		margin:168rpx 644rpx;
		height: 76rpx;
		width: 76rpx;
		background: none;
		border: 0;
		outline: 0;
	}
	.vi-bar-more {
		background: none;
		border: 0;
		outline: 0;		
	}
	.vi-bar-img2 {
		position:absolute;
		z-index: 44;
		right: 30rpx;
		top: 268rpx;
		font-size: 32rpx;
	}
	.vi-play-imgd {
		height: 76rpx;
		width: 76rpx;	
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
		padding-left: 30rpx;
	}
	.vi-mark-btn {
		position: absolute;
		bottom: 30rpx;
		right: 30rpx;
		z-index: 19;
		width: 152rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-top-right-radius: 30rpx;
		border-bottom-left-radius: 30rpx;
		font-size: 28rpx;
		color: white;
	}
	.vi-rz {
		background: rgba(89, 174, 153, 1);
	}
	.vi-rz2 {
		background: #09d6a1;
		box-shadow: -10rpx 0 0 rgba(9, 214, 161, .5);		
	}
	
	.vi-nrz {
		background: rgba(248, 31, 94, .8);
	}
	.vi-nrz2 {
		background: rgba(248, 31, 94, .8);
		box-shadow: -10rpx 0 0 rgba(248, 31, 94, .5);
	}
	.vi-opt {
		position: absolute;
		top: 50%;
		left:50%;
		height: 300rpx;
		width: 400rpx;
		margin-top: -150rpx;
		margin-left: -200rpx;
		z-index: 2226;
		border: 1px solid #cccccc;
		background: white;
		font-size: 32rpx;
		border-radius:30rpx;
	}
	.vi-opt-content {
		padding: 30rpx;
		height:150rpx;
		line-height: 150rpx;
	}
	.vi-opt-bar {
		height: 100rpx;
		width: 100%;
	} 
	.vi-opt-btn-01 {
		border-right: 2px solid #cccccc;
	}
	.vi-opt-btn {
		width: 49%;
		text-align: center;
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
</style>
