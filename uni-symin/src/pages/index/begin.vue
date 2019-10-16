<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
	<dialogbox @surefunc='surefunc' @cancelfunc='cancelfunc' :boxconfig='boxconfig' v-if='showChoosebox'></dialogbox>
	<view class='be-box'>
		<image class="be-adimg" :src='adimg'></image>
		<image class="be-icon" mode='widthFix' :src='beginImg'></image>
		<view class="be-icon-text" v-if='false'>51约</view>
		<view class="be-desc">● 高效率约玩平台 ●</view>
		<view class='be-sex' v-if='showSexBox'>
			<view class="be-sex-title">请选择性别</view>
			<view class="be-sex-box flex-b">
				<image class="be-sex-img be-woman" :src='sex === 2 ? waImg : wdImg' @click='setSex(2)'></image>
				<image class="be-sex-img beman" :src='sex === 1 ? maImg : mdImg' @click='setSex(1)'></image>
			</view>
			<view class='be-sex-result flex-c'>
				<view :class="['be-sex-result-d', sex === 1 ? 'ismanColor': 'isWomanColor']">
					<text v-if='sex === 0'>选择性别</text>
					<text v-if='sex === 2'>我是女生</text>
					<text v-if='sex === 1'>我是男生</text>
				</view>
			</view>
		</view>
		<form :report-submit=true @submit='createFormId'>
			<button form-type='submit' class='c-btn lg be-btn' @click='checkAgin' v-if='showSexBox'>确定</button>
		</form>
	</view>
	</block>
</template>

<script>
    import Vue from 'vue';
	// import localstorage from '../../static/utils/localstorage.js'
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
					title: '51约',
					bgset: 'bg-gradual-default',
					tset: 'bg-gradual-rblack'
				},
				boxconfig: {
					key: 0,
					model: 1,
					btn: {
						ok: '选好了',
						okcolor: 'd-color-r',
						cancel: '重新选',
						cancolor: 'd-color-b'
					},
					content: '一旦选择好性别，无法更改 确定吗？'
				},
				adimg: 'https://sns-cdn.myxianxiaobao.com/sfximao/begin-bg.png',
				waImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/sex-wa.png',
				wdImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/sex-wd.png',
				maImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/sex-ma.png',
				mdImg: 'https://sns-cdn.myxianxiaobao.com/sfximao/sex-md.png',
				beginImg: '../../static/images/logo51.png',
				sex: 2, // 1男 2 女
				showChoosebox: false,
				showSexBox: false,
				type: '',
				report: true
			}
		},
		onLoad(param) {
			let that = this
			this.type = param.type
			let { id, shareType } = param
			let scene = decodeURIComponent(param.scene)
			if(scene.id && scene.shareType) {
			  id = scene.id
			  shareType = scene.shareType
			}
			if(scene && scene != 'undefined' && (typeof scene === 'string')) {
			  scene = decodeURI(scene)
			  id = scene.match(/(?:id).*/ig)[0].split('=')[1]
			  shareType = scene.match(/(?:shareType).*/ig)[0].split('=')[1]
			}
			if (id && shareType) {
				app.globalData.shareFrom = {
					id: id,
					type: shareType
				}
				if (!app.globalData.isNotRegist) app.$vm.sendShareMessAge()
			}
			if (this.type && this.type === 'desct' && !app.globalData.isNotRegist && id && shareType) {
				app.$vm.goDesnation()
			}
			if (app.globalData.isNotRegist && id && shareType) {
				this.showSexBox = true
			}
		},
		onShow() {
			let that = this
			uni.$on('update',function(data){
				// console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				if (that.type && that.type === 'regist' || app.globalData.isNotRegist) {
					that.showSexBox = true
				}
			})
			if(!app.globalData.pagesition) {
				let isNull = utils.isEmpty(this.userInfo)
				if (!isNull) {
					app.$vm.goDesnation()
					app.globalData.pagesition = true
					return
				} else {
					that.showSexBox = true
				}
			}
		},
		methods: {
			checkAgin () {
				// 查看更多
				this.showChoosebox = true
			},
			setSex(type) {
				this.sex = type * 1
			},
			surefunc(){
				// 确定
				this.showChoosebox = false
				let sex = this.sex
				// localstorage.setItem('sex', sex)
				app.globalData.sex = sex
				uni.reLaunch({
					url: `/pages/index/indexd?sex=${sex}`
				})
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
	.be-box {
		padding: 76rpx 30rpx 40rpx 30rpx;
	}
	.be-adimg {
		margin: 0 auto;
		width: 630rpx;
		height: 620rpx;
	}
	.be-icon {
		margin: 40rpx auto;
		height: 226rpx;
		width: 226rpx;
/* 		background: gray; */
	}
	.be-icon-text {
		margin: 20rpx auto;
		text-align: center;
		font-size: 56rpx;
		line-height: 56rpx;
		color: #000000;
	}
	.be-desc {
		margin-top: 20rpx;
		text-align: center;
		height: 52rpx;
		line-height: 52rpx;
		font-size: 24rpx;
	}
	.be-sex {
		position: relative;
		margin: 100rpx auto 0;
		width: 522rpx;
		height: 522rpx;
	} 
	.be-sex::before {
		display: block;
		content: ' ';
		position: absolute;
		z-index: -1;
		bottom: 0;
		top: 0rpx;
		left: 0rpx;
		width: 100%;
		height: 100%;
		border-radius: 50% 50% 60% 40%;
		background: #e8f1f8;
	}
	.be-sex-title {
		height: 50rpx;
		line-height: 50rpx;
		font-weight: 600;
		font-size: 36rpx;
		color: #000000;
		text-align: center;
		margin-top: -25rpx;
	}
	.be-sex-img {
		width: 246rpx;
		height: 252rpx;
	}
	.be-sex-box {
		width: 550rpx;
		margin-top: 70rpx;
		margin-left: -14rpx;
	}
	.be-sex-result {
		margin-top: 40rpx;
	}
	.be-btn {
		margin-top: 104rpx;
		width: 690rpx;
		height: 88rpx;
		border-radius: 30rpx;
		background: #F81F5E !important;
		font-size: 32rpx;
		color: white;
		letter-spacing: .1em;
	}
	.be-sex-result-d {
		width: 138rpx;
		height: 60rpx;
		padding: 14rpx 20rpx;
		border-radius: 30rpx;
		color: white;
		font-size: 24rpx;
	}
	.ismanColor {background: #6267f9 !important;}
	.isWomanColor {background: #F81F5E !important;}
</style>
