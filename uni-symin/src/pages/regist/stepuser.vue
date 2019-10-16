<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<view class='s-u-h-box'>
			<view class='s-u-h-text'>上传头像</view>
			<view class='s-u-h-img flex-c' @click='photomsg = true'>
				<image :src='vCamer' :class="['s-u-h-icon', isHead ? 's-u-h-big' : '']" mode="aspectFill" v-if='!header_url.length'></image>
				<image :src='header_url' class='headImg' mode="aspectFill" v-if='header_url.length'></image>
			</view>
		</view>
		<view class='s-u-item-box'>
			<view class='s-u-item-detail'>
				<iptitem :inputconfig="editDetail[0]" :inputStyle='uinfoinputStyle' @change='valChange'></iptitem>
				<iptitem :inputconfig="editDetail[1]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[2]" @choose='chooseItem'></iptitem>
			</view>
		</view>
		<view class='fixmsgBox flex-c' v-if='photomsg'>
			<view class='fixmsg'>
				<view class='fixmsg-title'>上传真实本人照片，会更受欢迎哦</view>
				<view class='fixmsg-msg-01'>请上传本人照片，五官清晰。例如：</view>
				<view class='fixmsg-img-01 flex-x-l'>
					<image :src="uploadImgExample + 1 +'.png'" class='fixmsg-img-01-img'></image>
					<image :src="uploadImgExample + 2 +'.png'" class='fixmsg-img-01-img'></image>
					<image :src="uploadImgExample + 3 +'.png'" class='fixmsg-img-01-img'></image>
					<image :src="uploadImgExample + 4 +'.png'" class='fixmsg-img-01-img'></image>
				</view>
				<view class='fixmsg-msg-02'>请勿上传以下照片，例如：</view>
				<view class='fixmsg-img-02 flex-x-l'>
					<view class='fixmsg-img-02-box'>
						<image :src="uploadImgExample + 5 +'.png'" class='fixmsg-img-01-img'></image>
						<view class='fixmsg-img-02-box-msg flex-c'>非本人照</view>
					</view>
					<view class='fixmsg-img-02-box'>
						<image :src="uploadImgExample + 6 +'.png'" class='fixmsg-img-01-img'></image>
						<view class='fixmsg-img-02-box-msg flex-c'>模糊不清</view>
					</view>
					<view class='fixmsg-img-02-box'>
						<image :src="uploadImgExample + 7 +'.png'" class='fixmsg-img-01-img'></image>
						<view class='fixmsg-img-02-box-msg flex-c'>宠物风景</view>
					</view>
					<view class='fixmsg-img-02-box'>
						<image :src="uploadImgExample + 8 +'.png'" class='fixmsg-img-01-img'></image>
						<view class='fixmsg-img-02-box-msg flex-c'>明星艺人</view>
					</view>
				</view>
				<view class='fixmsg-btn flex-b'>
					<view class='fixmsg-btn-take flex-c' @click='choseImgFunc(1)'>拍照</view>
					<view class='fixmsg-btn-choose flex-c' @click='choseImgFunc(2)'>选择照片</view>
				</view>
			</view>
		</view>
		<view class='fixbtn'>
			<form :report-submit=true @submit='createFormId'>
				<!-- <button form-type='submit' :class="['c-btn lg job_btn', header_url.length && userInfo.nickname.length && userInfo.height && userInfo.timeChoose.length ? 'job_btnA': '']" data-url='/pages/regist/stepinfo' @click='goDown'>下一步</button> -->
				<button v-if='header_url.length && editDetail[0].content.length && userInfo.height && userInfo.timeChoose && userInfo.timeChoose.length' form-type='submit' class="c-btn lg job_btn job_btnA" data-url='/pages/regist/stepinfo' @click='goDown'>下一步</button>
				<button v-else form-type='submit' class="c-btn lg job_btn" data-url='/pages/regist/stepinfo' @click='goDown'>下一步</button>
			</form>
		</view>
		<dialogbox @surefunc='surefunc' @cancelfunc='cancelfunc' :items='items' :boxconfig='boxconfig' v-if='showChoosebox' :timeArr='timeChoose' :choseKey='choseKey'></dialogbox>
	</block>
</template>

<script>
    import Vue from 'vue';
	import config from '../../config.js'
    import util from '../../static/utils/index.js'
	import common from '../../api/common/common.js'
	import infoService from '../../api/info/info'
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
					// hiddenTitle: 2,
					isArrow: 1,
					// bgset: 'bg-gradual-transparent',
					// tset: 'bg-gradual-tred'
				},
				vCamer: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-camer.png',
				uploadImgExample: 'https://sns-cdn.myxianxiaobao.com/sfximao/up-example-0',
				isHead: false,
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
				uinfoinputStyle: {
					'border-bottom': 0
				},
				editDetail: [
					{
						key: '0',
						title: '昵称',
						icon: '',
						content: '',
						arrow: false,
						size: 40,
						type: 'text',
						url: '',
						isBorderR: false,
						placeholder: '请输入昵称',
						isInput: true,
						selfconf: false
					},
					{
						key: '1',
						title: '年龄',
						icon: '',
						content: '',
						arrow: true,
						size: 40,
						type: 'button',
						url: '',
						isBorderR: false,
						placeholder: '点击选择',
						isInput: false,
						selfconf: false
					},
					{
						key: '2',
						title: '身高',
						icon: '',
						content: 150,
						arrow: true,
						size: 40,
						type: 'button',
						url: '',
						isBorderR: false,
						placeholder: '点击选择',
						isInput: false,
						selfconf: false,
						last: true
					},
				],
				choseKey: 0,
				showChoosebox: false,
				timeChoose: [1990, 1, 1],
				items: [],
				header_url: '',
				userInfo: {
					nickname: '',
					header_url: '',
					height: 160
				},
				originSrc: '',
				photomsg: false
			}
		},
		onLoad() {
			this.userInfo = app.globalData.userInfo
			let isNull = util.isEmpty(this.userInfo)
			if (isNull) this.getUserInfo()
			else this.init()
		},
		onShow() {
			// 获取用户信息
			let pages = getCurrentPages()
			let currPage = pages[pages.length - 1]
			if (currPage.data.header_url) this.header_url = currPage.data.header_url
			if (currPage.data.originSrc) this.originSrc = currPage.data.originSrc
		},
		onUnload () {
		},
		methods: {
			init() {
				// if (!app.globalData.isNotRegist) {
				// 	app.$vm.goDesnation()
				// }
				this.header_url = app.globalData.isUpdateHeadUrl && this.userInfo.header_url || ''
				this.userInfo.height = this.userInfo.height || 0
				this.editDetail[0].content = ''
				if (this.userInfo.birthday) {
					this.editDetail[1].content = this.userInfo.birthday
					this.userInfo.timeChoose = this.timeChoose =  this.userInfo.birthday.split('-')
				} else {
					this.editDetail[1].content = ''
					this.userInfo.timeChoose = []
				}
				this.editDetail[2].content = this.userInfo.height && (this.userInfo.height + 'cm') || ''
			},
			getUserInfo () {
				// 获取用户信息
				infoService.getUserInfo({member_id: 0}).then(res => {
					if (res.code === 10000) {
						this.userInfo = Object.assign(res.data)
						app.globalData.userInfo = this.userInfo
						this.init()
						// 初始化数据
					}
				})
			},
			// takePhoto() {
			// 	
			// },
			choseImgFunc(model) {
				let source = model === 1 ? ['camera'] : ['album']
				let that = this
				wx.chooseImage({
					count: 1,
					sourceType: source,
					success: function (res) {
						const tempFilePaths = res.tempFilePaths[0]
						that.originSrc = tempFilePaths
						that.choseImg()
					}
				})				
			},
			choseImg (e) {
				// 选择图片
				this.photomsg = false
				let that = this
				uni.navigateTo({
					url: '/pages/tool/cropper?type=header_url&src=' + this.originSrc
				})
			},
			goDown(e) {
				if (!this.editDetail[0].content.length || !this.header_url.length || !this.userInfo.height || this.userInfo.timeChoose && !this.userInfo.timeChoose.length) {
					return
				}
				let that = this
				if (this.originSrc && this.header_url.length) {
					// 更改了图片
					util.showLoading('图片上传中...')
					common.upload({
						filePath: that.header_url
					}).then(res => {
						util.showSuccess('图片上传成功！')
						this.originSrc = ''
						that.userInfo.header_url = res.src
						uni.reLaunch({
							url: '/pages/regist/stepinfo'
						})
					})
				} else 	{
					uni.reLaunch({
						url: '/pages/regist/stepinfo'
					})	
				}
			},
			chooseItem(e) {
				let key = e.detail.val
				switch (key){
					case '1':
						this.boxconfig.key = 1
						this.boxconfig.model = 3
						// this.editDetail[1].content = this.timeChoose.length && this.timeChoose.join('.') || ''
						this.showChoosebox = true
						break;
					case '2':
						this.items = Object.assign(config.selfHeight)
						this.boxconfig.key = 2
						this.boxconfig.model = 2
						this.choseKey = this.userInfo.height && (this.userInfo.height - 150) || 0
						if (this.userInfo.height === 0) this.choseKey = 10
						// this.editDetail[2].content = this.userInfo.height && (this.userInfo.height + 'cm') || ''
						this.showChoosebox = true
						break;
					default:
						break;
				}
			},
			surefunc(obj){
				let {key, choseIndex, time, val } = obj.detail
				switch (key * 1){
					case 1:
						this.timeChoose = Object.assign(time)
						this.editDetail[1].content = this.timeChoose.join('.')
						this.showChoosebox = false
						this.userInfo.timeChoose = this.timeChoose
						break;
					case 2:
						this.userInfo.height = val
						this.editDetail[2].content = this.userInfo.height + 'cm'
						this.showChoosebox = false
						break;
					default:
						break;
				}
			},
			cancelfunc(){
				console.log('取消')
				this.showChoosebox = false
			},
			valChange(e) {
				let { key, val } = e.detail
				this.userInfo.nickname = val || ''
				this.editDetail[0].content = val || ''
			},
			createFormId(e) {
				if (e.detail.formId) app.$vm.sendFormId(e.detail.formId)
			}
		}
	});
</script>

<style>
	page {
		background: #f9f9fb;
		overflow: hidden;
	}
	.s-u-h-box {
		position: relative;
		width: 100%;
		height: 232rpx;
		padding-top: 40rpx;
	}
	.s-u-h-box::before {
		display: block;
		content: ' ';
		position: absolute;
		z-index: -1;
		bottom: 0;
		top: -232rpx;
		left: -100rpx;
		width: 950rpx;
		height: 464rpx;
		border-radius: 50%;
		background: #f81f5e;
	}
	.s-u-h-text {
		margin-bottom: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		font-size: 32rpx;
		color: white;
	}
	.s-u-h-img {
		width: 170rpx;
		height: 170rpx;
		border-radius: 50%;
		background: white;
		margin: 0 auto;
	}
	.s-u-h-icon {
		width: 56rpx;
		height: 40rpx;
	}
	.s-u-h-big {
		width: 100%;
		height:100%;
	}
	.s-u-item-box {
		margin-top: 100rpx;
		padding: 0 30rpx;
	}
	.s-u-item-detail{
		background: white;
		border-radius: 30rpx;
		overflow: hidden;
	}
	.s-u-item-top-20 {
		margin-top: -20rpx;
	}
	.headImg {
		width: 100%;
		height: 100%;
		border-radius: 50%;
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
		color: white;
	}
	.job_btnA {
		background: #f81f5e !important;
	}
	.fixmsgBox {
		position: fixed;
		z-index: 49999;
		top: 0;
		left:0;
		bottom:0;
		right:0;
		background:rgba(255, 255, 255, 0.5)
	}
	.fixmsg {
		width: 540rpx;
		height: 678rpx;
		background: white;
		border-radius: 30rpx;
		box-shadow: 0 0 40rpx 0rpx rgba(0,0,0,.2)
	}
	.fixmsg-title {
		padding: 40rpx 56rpx;
		font-size:28rpx;
		line-height: 48rpx;
		color: #333333;
		text-align: center;
		font-weight: 600;
	}
	.fixmsg-msg-01 {
		padding: 22rpx 40rpx 18rpx 40rpx;
		font-size:28rpx;
		line-height: 40rpx;
		color: #333333;		
	}
	.fixmsg-img-01, .fixmsg-img-02 {
		padding: 0 36rpx;
	}
	.fixmsg-img-01-img, .fixmsg-img-02-box {
		width:112rpx;
		height:112rpx;
		margin-right: 6rpx;
	}
	.fixmsg-msg-02 {
		padding: 20rpx 0;
		text-align: center;
		font-size:28rpx;
		line-height: 48rpx;
		color: #333333;		
	}
	.fixmsg-img-02-box {
		position: relative;
	}
	.fixmsg-img-02-box-msg {
		position: absolute;
		z-index: 2;
		left:0;
		bottom:0;
		right:0;
		height: 40rpx;
		line-height: 28rpx;
		font-size:20rpx;
		color:white;
		background: rgba(0,0,0,.5)
	}
	.fixmsg-btn {
		padding: 40rpx 38rpx;
	}
	.fixmsg-btn-take, .fixmsg-btn-choose {
		width: 200rpx;
		height: 88rpx;
		border-radius: 44rpx;
		background: #6267F9;
		font-size:32rpx;
		line-height: 44rpx;
		color: white;
	}
	.fixmsg-btn-choose {
		background: #F81F5E;
	}
</style>
