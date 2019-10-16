<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<view class='job-box'>
			<button :class="['c-btn', 'normal', 'job_item', item.checked ? 
			'job_btn_checked': '']" v-for='(item, index) in jobList' :key='index' :choseIndex="index" @click='choseNow(index)'>{{item.title}}</button>
		</view>
		<view class='fixbtn'>
			<form :report-submit=true @submit='createFormId'>
				<button form-type='submit' class='c-btn lg job_btn' @click='sureFunc'>确定</button>
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
					title: '选择行业/职业',
					bgset: 'bg-gradual-dred',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2
				},
				jobList: [
				],
				jobObj: {}
			}
		},
		onLoad(param) {
			this.id = param.id || ''
		},
		onShow () {
			this.getJob()
		},
		onUnload() {
			// 保存职业
			var pages = getCurrentPages();
			var page = pages[pages.length - 2];
			let job = this.jobList.filter(v => v.checked)[0]
			page.data.jobObj = job || {id: '0', title: ''}
			page.setData({
				jobObj: page.data.jobObj
			})
		},
		methods: {
			getJob(){
				infoService.getJobList().then(res => {
					if (res.code === 10000) {
						this.jobList = res.data
						this.jobList.map(v => {
							v.checked = false
							if (this.id == v.id) {
								v.checked = true
							}
						})
					} else {
						util.showFail('获取数据失败')
					}
				})
			},
			choseNow(index) {
				// 查询新的消息
				this.jobList.map((v,i) => {
					if (index !== i) v.checked = false
				})
				this.jobList[index].checked = !this.jobList[index].checked
				this.$set(this.jobList, index, this.jobList[index])
			},
			sureFunc() {
				// 确定
				wx.navigateBack()
			},
			createFormId(e) {
				if (e.detail.formId) app.$vm.sendFormId(e.detail.formId)
			}
		}
	});
</script>

<style>
	.job-box {
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		padding:0 78rpx 200rpx 78rpx;
		margin-left: -42rpx;
	}
	.job_item {
		margin: 40rpx 0 0 42rpx;
		padding: 24rpx 30rpx;
		min-width: 116rpx;
		height: 88rpx;
		border-radius: 30rpx !important;
	}
	.job-box::after {
		content: '';
		flex: auto;
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
	.job_btn_checked {
		background: #F81F5E !important;
		color: white;
	}
</style>
