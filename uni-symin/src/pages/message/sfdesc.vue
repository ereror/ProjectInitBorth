<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<view class='sfdesc-box'>
			<image :src='sfdesc1' class='sfdesc-img1' mode="widthFix"></image>
			<image :src='sfdesc2' class='sfdesc-img2' mode="widthFix"></image>
			<image :src='sfdesc3' class='sfdesc-img3' mode="widthFix"></image>
		</view>
	</block>
</template>

<script>
    import Vue from 'vue';
	export default Vue.extend({
		data() {
			return {
				title: 'Hello',
				STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
				DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
				barconfig: {
					CustomBar: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT, 
					StatusBar: wx.STATUS_BAR_HEIGHT,
					title: '为什么收会员费',
					bgset: 'bg-gradual-sfdesc',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2
				},
				sfdesc1: 'https://sns-cdn.myxianxiaobao.com/sfximao/sfdesc1.png',
				sfdesc2: 'https://sns-cdn.myxianxiaobao.com/sfximao/sfdesc2.png',
				sfdesc3: 'https://sns-cdn.myxianxiaobao.com/sfximao/sfdesc3.png',
			}
		},
		onLoad() {
		},
		methods: {
		}
	});
</script>

<style>
	page {
		background: #6267f9;
	}
	.sfdesc-img1 {
		width: 664rpx;
		height: 648rpx;
		margin: 6rpx 0 0 80rpx;
	}
	.sfdesc-img2 {
		width: 578rpx;
		height: 412rpx;
		margin: -16rpx 0 0 92rpx;
	}
	.sfdesc-img3 {
		width: 644rpx;
		height: 554rpx;
		margin: 76rpx auto;
	}
</style>
