<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<dialogbox @surefunc='surefunc' @cancelfunc='cancelfunc' :items='items' :boxconfig='boxconfig' v-if='showChoosebox' :choseKey='choseKey'></dialogbox>
		<view class='ad-box'>
			<view class='ad-box-bar flex-b'>
				<view>举报类型</view>
				<view class='ad-box-bar-btn flex-c' @click='showChooseboxFunc'>
					<view>{{items[choseKey].text}}</view>
					<text class='iconfont icon-right ad-box-bar-btn'></text>
				</view>
			</view>
			<view class='ad-ipt-box'>
				<textarea class='ad-ipt' placeholder-class='ad-plcolor' :value="adValue" placeholder="请写下你的意见或遇到的问题" maxlength='50' auto-height cursor-spacing='300' @input='setAdvalue'></textarea>
				<view class='ad-ipt-count'>{{adValue.length}}/50</view>
			</view>
			<view class='ad-upimg'>
				<view class='ad-upimg-title'>添加图片({{imageList.length}}/3)</view>
				<view class='ad-upimgbox'>
					<view class='ad-upimg-btn flex-c' @click='chooseImg' v-if='imageList.length <3'>
						<image class='ad-upimg-btn-icon' :src='addImg' mode="widthFix"></image>
					</view>
					<view class='ad-upimg-item flex-c' v-for='(item, index) in imageList' :key='index'>
						<image class='ad-upimg-img' mode="aspectFill" :src='item.path'></image>
						<view class='ad-upimg-close flex-c' :data-index="index" @click='delImg'>
							<text class='iconfont icon-baseline-close-px closebtn'></text>
						</view>
					</view>
				</view>
			</view>
			<view class='ad-upmess'>反馈问题意见时，请留下您的手机号等联系方式， </view>
			<view class='ad-upmess'>非常感谢！如有需要，您可以添加截图照片给我们。</view>
			<form :report-submit=true @submit='createFormId'>
				<button form-type='submit' class='c-btn bg-red2 ad-btn' @click='saveAdvice'>提交</button>
			</form>
		</view>
	</block>
</template>

<script>
    import Vue from 'vue';
	import config from '../../config.js'
	import common from '../../api/common/common.js'
	import infoService from '../../api/info/info.js'
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
					title: '匿名举报',
					bgset: 'bg-gradual-default',
					tset: 'bg-gradual-rblack',
					hiddenTitle: 2,
					isArrow: 1
				},
				addImg: '../../static/images/d-tool-photo.png',
				showChoosebox: false,
				boxconfig: {
					key: 0,
					model: 2,
					btn: {
						ok: '确定',
						okcolor: 'd-color-r',
						cancel: '取消',
						cancolor: 'd-color-b'
					}
				},
				imageList: [],
				items: [],
				choseKey: 5,
				adValue: '',
				id: '' // 举报者id
			}
		},
		onLoad(param) {
			this.id = param.uid
		},
		onShow() {
			this.items = Object.assign(config.selfadvice)
		},
		methods: {
			delImg(e) {
				let { index } = util.getData(e)
				this.imageList.splice(index, 1)
			},
			chooseImg () {
				let that = this
				wx.chooseImage({
					count: 3,
					sourceType: ['album', 'camera'],
					success: function(res) {
					let tempFiles = res.tempFiles
					//定义图片id数组
					let imageIdList = []
					// 格式化图片参数
					var send = []
					for (let i = 0; i < tempFiles.length; i++) {
					  var temp = new Promise((resolve, reject) => {
						common.upload({
						  filePath: tempFiles[i].path
						}).then(d => {
						  console.log(d.id)
						  if (d.id) resolve(d)
						  else {
							reject(i + 1)
						  }
						})
					  })
					  send.push(temp)
					}
					util.showLoading('上传中')
					Promise.all(send).then(res => {
					  util.showSuccess("上传成功")
					  for (let j = 0, len = res.length; j < len; j++) {
						let data = res[j]
						tempFiles[j].id = data.id
						tempFiles[j].path = data.url
					  }
					  that.imageList = [...that.imageList, ...tempFiles]
					  util.hideAll()
					}).catch(res => {
					  console.log(res)
					  if (tempFiles.length == 1) {
						util.showFail("图片上传失败")
					  } else {
						let result = res.join(',')
						util.showFail('warn 第' + result + '张图片上传失败', 1000)
					  }
					  util.hideAll()
					})
					}
				})
			},
			showChooseboxFunc () {
				this.showChoosebox = true
			},
			surefunc(obj){
				let { choseIndex, val } = obj.detail
				this.choseKey = choseIndex * 1
				this.showChoosebox = false
			},
			cancelfunc(){
				this.showChoosebox = false
			},
			setAdvalue(e) {
				this.adValue = e.detail.value
			},
			saveAdvice(e) {
				 // 保存消息
				 //  complaint_id  content  type  picture(json)
				let pamar = {
					complaint_id: this.id,
					content: this.adValue,
					type: this.items[this.choseKey].text,
					picture: JSON.stringify(this.imageList)
				}
				if (!this.id) return util.showFail("当前用户id不能为空")
				if (!this.adValue) return util.showFail("当前举报内容不能为空")
				util.showLoading('数据保存中...')
				infoService.addAccusation(pamar).then(res => {
					util.hideAll()
					if (res.code === 10000) {
						util.showSuccess('数据保存成功！')
						uni.navigateBack()
					} else {
						util.showSuccess('数据保存失败！')
					}
				}).catch(err => {
					util.hideAll()
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
		background: #F9F9FB;
	}
	.ad-box {
		padding: 40rpx 30rpx;
	}
	.ad-box-bar {
		width: 100%;
		height: 52rpx;
		font-size: 30rpx;
		color: #333333;
	}
	.ad-box-bar-btn {
		color: #f82764;
	}
	.ad-btn {
		margin-top: 60rpx;
		width: 690rpx;
		height: 88rpx;
		border-radius: 30rpx;
	}
	.ad-ipt-box {
		margin-top: 40rpx;
		width: 690rpx;
		min-height: 300rpx;
		border-radius: 30rpx;
		background: rgba(242, 242, 242, 1);
		padding: 30rpx;
	}
	.ad-ipt {
		width: 100%;
		font-size:26rpx;
		min-height:280rpx;
	}
	.ad-plcolor {
		color: #999999;
	}
	.ad-ipt-count {
		text-align: right;
		font-size: 26rpx;
		color: #999999;
	}
	.ad-upimg {
		margin: 80rpx 0 30rpx 0;
		padding: 40rpx 0;
	}
	.ad-upimg-title {
		height: 42rpx;
		line-height: 42rpx;
		font-size: 30rpx;
		color: #333333;
	}
	.ad-upimgbox {
		margin-top: 40rpx;
		display: flex;
		align-items: center;
		margin-left: -40rpx;
	}
	.ad-upimg-btn, .ad-upimg-item {
		position: relative;
		width: 170rpx;
		height: 170rpx;
		margin-left: 40rpx;
		border-radius: 30rpx;
		background: rgba(242,242,242,1);
	}
	.ad-upimg-img {
		border-radius: 30rpx;
	}
	.ad-upimg-btn-icon {
		width: 49rpx;
		height: 35rpx;
	}
	.ad-upimg-close {
		position: absolute;
		z-index: 477;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		top: -15rpx;
		right: -15rpx;
		background: #f82764;
		font-size: 22rpx;
	}
	.ad-upmess {
		font-size: 22rpx;
		line-height: 1.5;
		color: #333333;
	}
	.closebtn {color: white;}
</style>
