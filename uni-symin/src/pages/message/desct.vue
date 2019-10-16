<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<image :src='desc_img' class='desc_img_01' mode='aspectFill'></image>
		<image :src='desc_title_img' class='desc_img_02'></image>
		<view class='desc desc-content'>
			好东西要分享
		</view>
		<view class='desc-content'>
			马上推荐给身边的朋友吧
		</view>
		<form :report-submit=true @submit='createFormId'>
			<button form-type='submit' class='c-btn desc-btn' open-type='share'>立即推荐</button>
		</form>
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
					title: '推荐给朋友',
					bgset: 'bg-gradual-sfdesc',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2
				},
				desc_img: '../../static/images/tjqpy-bg.png',
				desc_title_img: '../../static/images/tjgpy-lititle.png'
			}
		},
		onShareAppMessage() {
			let useId = app.globalData.userInfo.memberID
			return {
			  title: `我在51约约到了小哥哥，小姐姐一起看电影，唱歌，吃饭...`,
			  path: '/pages/index/begin?type=desct&shareType=user&id=' + useId,
			  imageUrl: 'https://sns-cdn.myxianxiaobao.com/sfximao/51sharebg.png',
			  success(d){
			  }
			}
		},
		onLoad() {
		},
		methods: {
			createFormId(e) {
				if (e.detail.formId) app.$vm.sendFormId(e.detail.formId)
			}
		}
	});
</script>

<style>
	page {
		background: #6267f9;
		overflow: hidden;
	}
	.desc_img_01 {
		width: 630rpx;
		height: 592rpx;
		margin: 80rpx auto;
	}
	.desc_img_02 {
		width: 350rpx;
		height: 48rpx;
		margin: 60rpx auto;
	}
	.desc {
		margin-top: 60rpx;
	}
	.desc-content {
		font-size:32rpx;
		color: white;
		line-height: 38rpx;
		text-align: center;
	}
	.desc-btn {
		position: fixed;
		bottom: 30rpx;
		left: 30rpx;
		margin: 0 auto;
		width: 690rpx;
		height: 88rpx;
		border-rdius: 30rpx;
		background: #ffb400 !important;
		color: white;
		font-size: 32rpx;
	}
</style>
