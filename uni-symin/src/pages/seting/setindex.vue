<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<view class='set-box'>
			<view class='set-boxR'><iptitem :inputconfig="setConfig"></iptitem></view>
		</view>
		<view class='fixbtn'>
			<button class='c-btn lg job_btn' @click='goBack'>退出</button>
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
					title: '设置',
					bgset: 'bg-gradual-default',
					tset: 'bg-gradual-rblack',
					hiddenTitle: 2,
					isArrow: 1
				},
				setConfig: {
					key: '0',
					title: '隐私设置',
					icon: '',
					content: '',
					arrow: true,
					size: 40,
					type: 'url',
					url: '/pages/seting/setdetail',
					isBorderR: false,
					placeholder: '',
					isInput: false,
					last: true
				}
			}
		},
		onLoad() {
		},
		methods: {
			goBack() {
				wx.navigateBack()
			}
		}
	});
</script>

<style>
	page {
		background: #F9F9F8;
	}
	.set-box {
		padding: 40rpx 30rpx;
	}
	.set-boxR {
		border-radius:30rpx;
		overflow: hidden;
	}
	.fixbtn {
		position: fixed;
		display: flex;
		justify-content: center;
		bottom: 40rpx;
		z-index: 99;
		width: 100%;
	}
	.job_btn {
		width: 690rpx;
		height: 88rpx;
		margin: 0 auto;
		border-radius: 30rpx;
		background: #f81f5e !important;
		color: white;
	}
</style>
