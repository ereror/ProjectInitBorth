<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<tips :tipContent='tipContent' :tipStyle='tipStyle' v-if='isvideoRz !== 1 && tipShow'>
			<text class='iconfont icon-close-circle' @click='tipShow = false'></text>
		</tips>
		<view class='uinfo-d-head'>
			<uswiper :items='items' :swiperConfig='swiperConf' v-if='items.length'></uswiper>
			<view class='I-d-rz' v-if='isvideoRz === 1'>视频已认证</view>
		</view>
		<view class="uinfo-d-user">
			<view class='uinfo-d-user-msg'>
				<view class='uinfo-d-user-name-box'>
					<view class='uinfo-d-user-name'>{{userInfo.nickname}}</view>
					<view class='uinfo-d-user-constellation'>{{userInfo.constellation}}</view>
				</view>
<!-- 				<view class='uinfo-d-user-status-box'>
					<view class='uinfo-d-user-status-time'></view>
					<view class='uinfo-d-user-status-dest'></view>
				</view> -->
			</view>
			<view :class="['uinfo-d-user-rz flex-c', isvideoRz === 1 ? 'isrz' : isvideoRz === 0 ? '' : 'isrzf']" @click='goDetail'>
				<text v-if='isvideoRz === 1'>视频已认证点击查看</text>
				<text v-if='isvideoRz === -1 || isvideoRz === 2'>视频未认证 点击认证</text>
				<text v-if='isvideoRz === 0'>视频正在审核中</text>
				<image :src="isvideoRz === 0 ? d_icon_sh : isvideoRz === 1 ? d_icon_ck : ''" :class="['uinfo-d-user-rz-img', isvideoRz ? 'uinfo-d-user-rz-img-02' : 'uinfo-d-user-rz-img-03' ]" v-if='isvideoRz <= 1 && isvideoRz != -1'></image>
			</view>
		</view>
		<view class='uinfo-d-box'>
			<iptitem :inputconfig="uinfoDetail[0]"></iptitem>
			<iptitem :inputconfig="uinfoDetail[1]"></iptitem>
			<iptitem :inputconfig="uinfoDetail[2]"></iptitem>
			<iptitem :inputconfig="uinfoDetail[3]"></iptitem>
			<iptitem :inputconfig="uinfoDetail[4]">
				<button class='c-btn c-btn-normal uinfo-check-btn' v-if='isWxrz !== 1' data-url='/pages/userinfo/edit' @click='goUrl'>
					<text data-key='phone'>点击认证</text>
				</button>
			</iptitem>
			<!-- <iptitem :inputconfig="uinfoDetail[5]" :inputStyle='uinfoinputStyle'></iptitem> -->
		</view>
		<view class='uinfo-d-btnbox'>
			<form :report-submit=true @submit='createFormId'>
				<button form-type='submit' type="submit" class='c-btn lg uinfo-d-btn' data-url='/pages/userinfo/edit' @click='goUrl'>编 辑</button>
			</form>
		</view>
	</block>
</template>

<script>
    import Vue from 'vue'
	import utils from '../../static/utils/index.js'
	import infoService from '../../api/info/info'
	let app = getApp()
	export default Vue.extend({
		data() {
			return {
				model: 1, // 0 个人中心页，1，他人看到的中心页
				title: 'Hello',
				STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
				DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
				barconfig: {
					CustomBar: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT, 
					StatusBar: wx.STATUS_BAR_HEIGHT,
					title: '51约',
					bgset: 'bg-gradual-dred',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2
				},
				isvideoRz: -1, // 审核中， 1 审核通过， 2 审核不通过
				id: '',
				tipShow: true,
				tipContent: '视频没有认证',
				tipStyle: {
					'background': '#ffb400',
					'color': 'white'
				},
				items: [],
				swiperConf: {
					interval: 5000,
					duration: 500,
					autoplay: true,
					circular: true,
					mode: 'aspectFill',
					model: 2
				},
				uinfoDetail: [
					{
						key: '0',
						title: '邀约项目',
						icon: '',
						content: '',
						arrow: false,
						size: 40,
						type: 'text',
						url: '',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: false
					},
					{
						key: '1',
						title: '身高',
						icon: '',
						content: '',
						arrow: false,
						size: 40,
						type: 'text',
						url: '',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: false
					},
					{
						key: '2',
						title: '职业',
						icon: '',
						content: '',
						arrow: false,
						size: 40,
						type: 'text',
						url: '',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: false
					},
					{
						key: '3',
						title: '年收入',
						icon: '',
						content: '',
						arrow: false,
						size: 40,
						type: 'text',
						url: '',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: false
					},
					{
						key: '4',
						title: '微信认证',
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
					},
					{
						key: '5',
						title: '手机已认证',
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
				uinfoinputStyle: {
					'border-bottom': 0
				},
				d_icon_sh: '../../static/images/d-icon-sh.png',
				d_icon_ck: '../../static/images/d-icon-ck.png',
				d_icon_tx: '../../static/images/d-icon-tx.png',
				d_icon_lh: '../../static/images/d-icon-lh.png',
				userInfo: {},
				selfTypes: [],
				selfPays: [],
				isWxrz: 0 // 微信认证 0 审核中， 1 审核通过， 2 审核未通过
			}
		},
		onLoad(param) {
			this.id = param.id || '' 
		},
		onShow() {
			this.userInfo = app.globalData.userInfo
			this.selfTypes = app.globalData.selfTypes
			this.selfPays = app.globalData.selfPays
			this.getUserInfo()
		},
		methods: {
			init() {
				 // 初始化数据
				this.isWxrz = 0
				this.isvideoRz = -1
				let verfiy = this.userInfo && this.userInfo.verfiy_list || []
				verfiy.map(v => {
					if (v.type === 'video') this.isvideoRz = v.pass * 1
					if (v.type === 'wechat') {
						this.isWxrz = v.pass * 1
						this.userInfo.wechat = v.value || this.userInfo.wechat_number
						if (v.pass * 1 === 1) {
							this.uinfoDetail[4].title = '微信已认证'
							this.uinfoDetail[4].content = this.userInfo.wechat
							this.uinfoDetail[4].selfconf = false
						}
					}
				})
				if (this.isvideoRz === 2 && !this.userInfo.video_url || !this.userInfo.video_url) {
					this.tipContent = '你没有视频认证，点击下方视频认证，以免影响体验哦'
				}
				if (this.isvideoRz === 0) {
					this.tipContent = '视频正在审核中'
				}
				if (this.isvideoRz === 2 && this.userInfo.video_url.length) {
					this.isvideoRz = 1
					this.tipContent = ''
				}
				let imgArr = this.userInfo && this.userInfo.verfiy_list && this.userInfo.verfiy_list.filter(v => (v.src = v.value) && v.type === 'picture') || []
				let header_url = this.userInfo.header_url ?  this.userInfo.header_url : this.userInfo.gender === 1 ? app.globalData.Iitemimg : app.globalData.Iitemimgw
				let Headimg = {src: header_url}
				imgArr.unshift(Headimg)
				this.items = imgArr
				// 设置数据
				this.uinfoDetail[0].content = '希望一起' + this.selfTypes.filter(v => v.value === this.userInfo.objective * 1)[0].text || '希望一起吃饭'
				this.uinfoDetail[1].content = this.userInfo.height + 'cm'
				this.uinfoDetail[2].content = this.userInfo.occupation_str
				this.uinfoDetail[3].content = this.selfPays.filter(v => v.value === this.userInfo.revenue * 1)[0].text
			},
			getUserInfo() {
				app.$vm.getUserInfo(true).then(res => {
					this.userInfo = res
					this.init()
				}).catch(err => {
					console.log('用户信息获取失败！')
				})
			},
			goUrl(e) {
				utils.goUrl(e)
			},
			goDetail() {
				switch (this.isvideoRz){
					case -1:
					    var url = '/pages/tool/videorz?type=nrz'
						if (!this.userInfo.video_url.length) url = '/pages/regist/stepvideo'
						uni.navigateTo({
							url: url
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/pages/tool/video?type=rz'
						})
						break;
					case 2:
					    var url = '/pages/tool/videorz?type=nrz'
						if (!this.userInfo.video_url.length) url = '/pages/regist/stepvideo'
						uni.navigateTo({
							url: url
						})
						break;
					default:
						break;
				}
			},
			Rzfunc (e) {
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
			},
			createFormId(e) {
				if (e.detail.formId) app.$vm.sendFormId(e.detail.formId)
			}
		}
	});
</script>

<style>
	page {
		background: #F9F9Fb;
	}
	.uinfo-d-head {
		position: relative;
		width: 690rpx;
		border-radius: 30rpx;
		margin: 30rpx auto 0;
		overflow: hidden;
	}
	.uinfo-d-user {
		margin: 0 auto;
		width: 690rpx;
		height: 284rpx;
		background: white;
		border-radius: 0 0 30rpx 30rpx;
		padding-bottom: 10rpx;
	}
	.uinfo-d-user-msg {
		background: white;
		height:184rpx;
		border-radius: 0 0 30rpx 30rpx;
		padding-top: 40rpx;
	}
	.uinfo-d-user-rz {
		width: 630rpx;
        height: 80rpx;
		line-height: 48rpx;
		border-radius: 30rpx;
		margin: 0 auto;
        font-size: 34rpx;
		padding: 16rpx 0;
        color: white;
        text-align: center;
		background: #999999;
	}
	.isrz {
		background: #09d6a1;
	}
	.isrzf {
		background: #ffb400;
	}
	.uinfo-d-user-rz-img {
		height: 36rpx;
		width: 38rpx;
		margin-left:20rpx;
	}
	
	.uinfo-d-user-rz-img-02 {
		width: 48rpx;
		height: 36rpx;
	}

	.uinfo-d-user-rz-img-03 {
		width: 36rpx;
		height: 36rpx;
	}
	.uinfo-d-user-name-box, .uinfo-d-user-status-box {
		padding: 0 30rpx;
		font-size: 34rpx;
		font-weight: 500;
		color: #000000;
		display: flex;
		justify-content: flex-start;
	}
	.uinfo-d-user-constellation {
		margin-left: 30rpx;
	}
	.uinfo-d-user-status-box {
		margin-top: 20rpx;
		font-size: 26rpx;
	}
	.uinfo-d-user-status-dest {
		margin-left: 20rpx;
	}
	.uinfo-d-box {
		width: 690rpx;
		border-radius: 30rpx;
		overflow: hidden;
		background: white;
		margin: 40rpx auto 0;
		padding-bottom: 120rpx;
	}
	.I-d-rz {
		position:absolute;
		top: 0;
		right: 0;
		z-index: 23;
		width: 152rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: #09d6a1;
		border-radius: 0 30rpx 0 30rpx;
		box-shadow: -2rpx -2rpx 0 2rpx rgb(147, 229, 208);
		font-size: 28rpx;
		text-align: center;
		color: white;
	}
	.uinfo-d-btnbox {
		position:fixed;
		bottom: 0;
		z-index: 478;
		background: white;
		padding:10rpx 30rpx;
	}
	.uinfo-d-btn, .uinfo-d-btn2 {
		width: 690rpx;
		border-radius: 30rpx;
		background: #f81f5e !important;
		color: white;
	}
	.uinfo-d-btn2 {
		backgruond: white;
		color: #f81f5e;
	}
	.lg {
	   padding:0 40rpx;
	   font-size:32rpx;
	   height:88rpx;
	}
	.uinfo-check-btn {
		font-size: 24rpx;
		line-height: 34rpx;
		border-radius:32rpx;
		height: 60rpx;
		min-width: 138rpx;
		border-radius: 30rpx;
		padding: 13rpx 20rpx;
		background: #f7f7f7 !important;
		color: #f81f5e;
	}
</style>
