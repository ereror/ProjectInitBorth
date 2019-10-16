<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<toast v-if='showtoast' :toastconfig='toastconfig'></toast>
		<view class='s-box'>
			<view class='s-box-detail'>
				<iptitem :inputconfig="editDetail[0]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[1]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[2]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[3]" :inputStyle='uinfoinputStyle' @change='valChange'></iptitem>
			</view>
		</view>
		<view class='fixbtn'>
			<form :report-submit=true @submit='createFormId'>
				<button form-type='submit' :class="['c-btn lg job_btn', editDetail[0].content.length && editDetail[1].content.length && editDetail[2].content.length ? 'job_btnA': '']" :data-url='userInfo.gender === 2 ? pathurl : pathurl2' @click='goDown'>下一步</button>
			</form>
		</view>
		<dialogbox @surefunc='surefunc' @cancelfunc='cancelfunc' :items='items' :boxconfig='boxconfig' v-if='showChoosebox' :choseKey='choseKey'></dialogbox>
	</block>
</template>

<script>
    import Vue from 'vue';
	import util from '../../static/utils/index.js'
	import config from '../../config.js'
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
					isArrow: 1
				},
				editDetail: [
					{
						key: '0',
						title: '行业',
						icon: '',
						content: '',
						arrow: true,
						size: 40,
						type: 'url',
						url: '/pages/tool/job',
						isBorderR: false,
						placeholder: '点击选择',
						isInput: false,
						selfconf: false
					},
					{
						key: '1',
						title: '年收入',
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
						title: '邀约项目',
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
						key: '3',
						title: '微信',
						icon: '',
						content: '',
						arrow: false,
						size: 40,
						type: 'text',
						url: '',
						isBorderR: false,
						placeholder: '点击输入(选填)',
						isInput: true,
						selfconf: false,
						last: true
					}
				],
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
				items: [],
				uinfoinputStyle: {
					'border-bottom': 0
				},
				toastconfig: {
					model: 2,
					icon: false,
					content: '请填写完整的资料',
					type: 1
				},
				wx: '',
				userInfo: {},
				jobObj: {
					id: '',
					title: ''
				},
				pathurl: '/pages/regist/stepvideo?type=save',
				pathurl2: '/pages/message/join?type=stepinfo',
				showChoosebox: false,
				showtoast: false, // 显示弹框消息
				selfPaysIndex: -1, // 当前收入
				selfTypesIndex: -1, // 当前选中邀约项目
				choseKey: 0, // 选中当前项
				selfTypes: [],
				selfPays: []
			}
		},
		onLoad() {
		},
		onShow () {
			this.initData()
			this.setJob()
		},
		methods: {
			initData() {
				this.userInfo = app.globalData.userInfo
				this.selfTypes = app.globalData.selfTypes
				this.selfPays = app.globalData.selfPays
				this.editDetail[3].content = this.userInfo.wechat_number
				this.jobObj = {
					id: this.userInfo.occupation,
					title: this.userInfo.occupation_str || ''
				}
				this.selfTypes.map((v, i) => {
					if (v.value === this.userInfo.objective * 1) {
						this.editDetail[2].content = v.text
						this.selfTypesIndex = i
					}
				})
				this.selfPays.map((v, i) => {
					if (v.value === this.userInfo.revenue * 1) {
						this.editDetail[1].content = v.text
						this.selfPaysIndex = i
					}
				})
			},
			setJob() {
				let pages = getCurrentPages()
				let currPage = pages[pages.length - 1]
				let jobObj = currPage.data.jobObj.id && currPage.data.jobObj || this.jobObj
				this.editDetail[0].content = jobObj.title || ''
				this.editDetail[0].url = '/pages/tool/job?id=' + jobObj.id
				this.jobObj = jobObj
				this.userInfo.occupation = jobObj.id || 0
				this.userInfo.occupation_str = jobObj.title
			},
			goDown(e) {
				if (this.editDetail[0].content.length && this.editDetail[1].content.length && this.editDetail[2].content.length) {
					if (this.userInfo.gender === 1) {
						this.pathurl = '/pages/message/join?type=save'
						this.$nextTick(function(){
							uni.reLaunch({
								url: '/pages/message/join?type=save'
							})
						})
					} else {
						// 女生保存数据
						util.showLoading('数据保存中...')
						app.$vm.saveData(this.userInfo).then(res => {
							util.hideAll()
							util.showSuccess('数据保存成功！')
							uni.$emit('getUserInfo', {msg: '更新用户信息'})
							// if (type === 'skip') {
							this.createOrder('/pages/index/index?gotoDesn=videorz')
							// } else {
							// 	this.createOrder('/pages/tool/videorz')
							// }
						}).catch(e => {
						})
					}
				} else {
					util.showtoast(this, 'showtoast', 500)
				}
			},
			createOrder(pathurl) {
				let param = {
					pay_from: wx.IS_IOS ? 1 : 2,
					platform: 1,
					app_name: '51y'
				}
				infoService.getGateCheck(param).then(res => {
					if (res.code === 10000) {
						uni.reLaunch({
							url: pathurl
						})
					} else {
						this.messageFunc('保存信息失败，请重试！')
					}
				})
			},
			chooseItem(e) {
				let key = e.detail.val
				switch (key){
					case '0':
						util.goUrl(e)
						break;
					case '1':
						this.items = Object.assign(this.selfPays)
						this.boxconfig.key = 1
						this.boxconfig.model = 2
						if (this.selfPaysIndex > -1) {
							this.choseKey = this.selfPaysIndex
							this.editDetail[1].content = this.items[this.selfPaysIndex].text || ''
						}
						this.showChoosebox = true
						break;
					case '2':
						this.items = Object.assign(this.selfTypes)
						this.boxconfig.key = 2
						this.boxconfig.model = 2
						if (this.selfTypesIndex > -1) { 
							this.editDetail[2].content = this.items[this.selfTypesIndex].text || ''
							this.choseKey = this.selfTypesIndex
						}
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
						this.selfPaysIndex = choseIndex * 1 || 0
						this.editDetail[1].content = this.items[this.selfPaysIndex].text || ''
						this.showChoosebox = false
						this.userInfo.revenue = val
						break;
					case 2:
						this.selfTypesIndex = choseIndex * 1 || 0
						this.editDetail[2].content = this.items[this.selfTypesIndex].text || ''
						this.showChoosebox = false
						this.userInfo.objective = val
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
				this.userInfo.wechat_number = val || ''
			},
			createFormId(e) {
				if (e.detail.formId) app.$vm.sendFormId(e.detail.formId)
			}
		}
	});
</script>

<style>
	page {
		background:#F9F9F8;
	}
	.s-box {
		padding: 40rpx 30rpx 30rpx 30rpx;
	}
	.s-box-detail {
		border-radius: 30rpx;
		background: white;
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
		color: white;
	}
	.job_btnA {
		background: #f81f5e !important;
	}
</style>
