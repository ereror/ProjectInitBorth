<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<template is='jdt'></template>
		<template name='jdt'>
			<view class='prossbar'>
				<view class='prossbarText'>
					完成度
				</view>
				<view class='prossbox'>
					<view class='pross' :style="{width: prossWidth + '%'}">
						<view class='prosstext' v-if='prossWidth > 10'>{{prossWidth}}%</view>
					</view>
				</view>
			</view>
		</template>
		<view class='edit-photo'>
			<view :class="[index === 0 ? 'edit-big' : 'edit-small', 'shdefault']" v-for="(item, index) in imgArrs" :key='index'>
				<view class='edit-big-tag' v-if='!index'>头像</view>
				<image :src='item.src' :mode="!index ? 'aspectFill': 'aspectFill'" class='edit-img' @click='showImgBtn(index, item.pass)' v-if='item.src'></image>
				<view :class="['edit-msg-box flex-c', item.pass === 0 ? 'shing' : item.pass === 2 ? 'shnopass' : '']" v-if='item.pass != 1 && item.src && !item.isbtn' @click='showImgBtn(index, item.pass)'>
					<view>
						<image :src='item.pass === 0 ? editsh : editnopass' class='edit-msg-img' mode="widthFix"></image>
						<view class='edit-msg-text'>{{item.pass === 0 ? '审核中' : item.pass === 2 ? '未通过' : ''}}</view>
					</view>
				</view>
				<view class='edit-tool flex-c' v-if='item.isbtn'  @click='showImgBtn(index, item.pass)'>
					<view :class="['iconfont icon-chaxun edit-icon', item.pass !== 0 ? 'edit-iconl' : '']" @click='checkBtn(index)'></view>
					<view class='iconfont icon-shanchu edit-icon' @click.stop='deleteBtn(index)' v-if='item.pass !== 0'></view>
				</view>
				<view class='edit-msg-default flex-c' @click='chooseFile(index)' v-if='!item.src'>
					<image :src='editadd' class='edit-msg-add' mode="widthFix"></image>
				</view>
			</view>
		</view>
		<view class='eidt-choose-box'>
			<view class="edit-choose-title">基本资料</view>
			<view class='edit-choose'>
				<iptitem :inputconfig="editDetail[0]" :inputStyle='uinfoinputStyle' @change='valChange'></iptitem>
				<iptitem :inputconfig="editDetail[1]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[2]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[3]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[4]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[5]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[6]" @choose='chooseItem'></iptitem>
				<iptitem :inputconfig="editDetail[7]" :inputStyle='uinfoinputStyle' @change='valChange'></iptitem>
			</view>
		</view>
		<view class='uinfo-d-btnbox'>
			<form :report-submit=true @submit='createFormId'>
				<button form-type='submit' type="submit" class='c-btn lg uinfo-d-btn' @click='saveMession'>保 存</button>
			</form>
		</view>
		<dialogbox @surefunc='surefunc' @cancelfunc='cancelfunc' :items='items' :boxconfig='boxconfig' v-if='showChoosebox' :timeArr='timeChoose' :choseKey='choseKey'></dialogbox>
		<ui-popup :show="showchose" @hidefunc='showchose = false' position="bottom" :height="160" :mask-style="popmaskStyle" :hide-on-tap="true" class='ui-pop'>
			<view>
				<button class='buttonreset sharepopbtn' @click='checkPic'>查看</button>
				<button class='buttonreset sharepopbtn' @click='optPic' v-if='showchoseStatus'>{{showkey === 0 ? '更换头像' : '删除'}}</button>
				<button class='buttonreset sharepopbtn' @click="showchose = false">取消</button>
			</view>
		</ui-popup>
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
					title: '编辑资料',
					bgset: 'bg-gradual-dred',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2
				},
				prossWidth: 0,
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
						placeholder: '点击输入',
						isInput: true,
						selfconf: false
					},
					{
						key: '1',
						title: '性别',
						icon: '',
						content: '',
						arrow: false,
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
						title: '出生年月',
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
						title: '身高',
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
						key: '4',
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
						key: '5',
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
						key: '6',
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
						key: '7',
						title: '微信',
						icon: '',
						content: '',
						arrow: false,
						size: 40,
						type: 'text',
						url: '',
						isBorderR: false,
						placeholder: '点击输入',
						isInput: true,
						selfconf: false,
						last: true
					}
				],
				popmaskStyle:{
				  "background-color": "rgba(0,0,0,.5)"
				},
				uinfoinputStyle: {
					'border-bottom': 0
				},
				items: [],
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
				choseKey: 0, // 选中当前项
				showkey: -1, // 显示第几个
				showchose: false, // 是否显示
				showchoseStatus: 0, // 选择状态 0， 审核中， 1 审核通过， 2审核未通过
				showChoosebox: false,
				isShing: true,
				editHead: 'https://sns-cdn.myxianxiaobao.com/sfximao/test1.jpg',
				editsh: '../../static/images/edit-sh.png',
				editnopass: '../../static/images/edit-nopass.png',
				editadd: '../../static/images/edit-add.png',
				jobObj: {
					id: '',
					title: ''
				},
				userInfo: {
					wx: '', // 微信
					nickname: '', // nickname
					gender: 1, // 性别
					birthday: '', // 生日
					height: 160
				},
				// status 0 审核中，1，审核通过， 2 审核失败
				imgArrs: [
					{src: 'https://sns-cdn.myxianxiaobao.com/sfximao/test1.jpg', pass: 1, key: 0, isbtn: false},
					{src: '', pass: 0, key: 1, isbtn: false},
					{src: '', pass: 0, key: 2, isbtn: false},
					{src: '', pass: 0, key: 3, isbtn: false},
					{src: '', pass: 0, key: 4, isbtn: false},
					{src: '', pass: 0, key: 5, isbtn: false}
				],
				selfTypes: [], // 邀约项目
				selfPays: [], // 年收入
				selfPaysIndex: 0, //当前选中年收入
				selfTypesIndex: 0, // 当前选中邀约项目
				sexConfig: [], // 性别设置
				sex: 1, // 性别
				selfHeight: 150,
				timeChoose: [1991, 1, 15],
				initname: '',
				headChange: false,
				originSrc: '',
				originEditSrc: ''// 上传头像
			}
		},
		onLoad() {
			this.sexConfig = Object.assign(config.sexConfig)
			this.getUserInfo()
		},
		onShow () {
			// 显示更多消息
			this.setJob()
			this.caclWidth()
			let pages = getCurrentPages()
			let currPage = pages[pages.length - 1]
			if (currPage.data.originEditSrc) {
				this.originEditSrc = currPage.data.originEditSrc
				this.uploadFile(this.originEditSrc, 0)
			}
		},
		methods: {
			initData() {
				// this.userInfo = this.userInfo 
				this.selfTypes = app.globalData.selfTypes
				this.selfPays = app.globalData.selfPays
				this.jobObj = {
					id: this.userInfo.occupation,
					title: this.userInfo.occupation_str || '全部职业'
				}
				let nickObj = this.userInfo.verfiy_list && this.userInfo.verfiy_list.filter(v => v.type === 'nickname')
				let wxObj = this.userInfo.verfiy_list && this.userInfo.verfiy_list.filter(v => v.type === 'wechat')
				this.initname = this.userInfo.nickname
				this.editDetail[0].content = nickObj.length && nickObj[0].value || this.userInfo.nickname
				this.editDetail[1].content = this.userInfo.gender === 1 ? '男' : '女'
				this.editDetail[2].content = this.userInfo.birthday
				this.editDetail[3].content = this.userInfo.height + 'cm' || '170cm'
				this.editDetail[4].content = this.userInfo.occupation_str || '全部职业'
				this.editDetail[5].content = this.selfPays.filter((v, i) => {if(v.value === this.userInfo.revenue * 1) {this.selfPaysIndex = i}; return v.value === this.userInfo.revenue * 1})[0].text
				this.editDetail[6].content = this.selfTypes.filter((v, i) => {if(v.value === this.userInfo.objective * 1) {this.selfTypesIndex = i;}; return v.value === this.userInfo.objective * 1})[0].text
				this.editDetail[7].content = wxObj.length && wxObj[0].value != 'undefined' && wxObj[0].value
				 // 判断审核项目
				if (nickObj.length && nickObj[0].pass === 0 && nickObj[0].value && nickObj[0].value != 'undefined') this.editDetail[0].titleicon = '审核中'
				else this.editDetail[0].titleicon = ''
				if (nickObj.length && nickObj[0].pass === 2) {
					this.editDetail[0].content = this.userInfo.nickname
				}
				if (wxObj.length && wxObj[0].value && wxObj[0].value != 'undefined') {
					this.editDetail[7].titleicon = ''
					if (wxObj[0].pass === 0) this.editDetail[7].titleicon = '审核中'
					if (wxObj[0].pass === 2) {
						this.editDetail[7].content = ''
					}
				}
				this.editDetail[7].isInput = wxObj.length ? wxObj[0].pass !== 1 : true
				if (this.userInfo.birthday.length) {
					this.timeChoose = this.userInfo.birthday.split('-')
				}
				this.userInfo.timeChoose = this.timeChoose
				this.setImgArr()
				this.caclWidth()
			},
			getUserInfo() {
				app.$vm.getUserInfo(true).then(res => {
					this.userInfo = res
					this.initData('%o', this.userInfo)
				}).catch(err => {
					console.log('用户信息获取失败！')
				})
			},
			setImgArr () {
				// 设置图片类型
				// 头像
				let headImg_set = this.userInfo && this.userInfo.verfiy_list && this.userInfo.verfiy_list.filter(v => v.type === 'header' && v.pass !== 2)[0]
				if (headImg_set) {
					this.imgArrs[0] = {
						src: headImg_set.value || '',
						pass: headImg_set.pass || 0,
						key: 0,
						isbtn: false
					}
				} else {
					this.imgArrs[0] = {
						src: this.userInfo.header_url,
						pass: 1,
						key: 0,
						isbtn: false
					}
				}
				let imgArr = this.userInfo && this.userInfo.verfiy_list && this.userInfo.verfiy_list.filter(v => v.type === 'picture')
				imgArr.map(v => {
					v.src = v.value || '',
					v.key = v.location
					v.isbtn = false
					this.imgArrs[v.key] = Object.assign(v)
				})
			},
			setJob() {
				let pages = getCurrentPages()
				let currPage = pages[pages.length - 1]
				let jobObj = currPage.data.jobObj.id && currPage.data.jobObj || this.jobObj
				this.editDetail[4].content = jobObj.title || ''
				this.editDetail[4].url = '/pages/tool/job?id=' + jobObj.id
				this.jobObj = jobObj
				this.userInfo.occupation = jobObj.id || 0
				this.userInfo.occupation_str = jobObj.title
			},
			caclWidth () {
				let count = 0
				let imgCount = this.imgArrs.filter(v => v.src.length).length
				let formCount = this.editDetail.filter(v => v.content && v.content.length).length
				this.prossWidth = count + formCount * 5 + imgCount * 10
			},
			showImgBtn (key, pass) {
				// this.showchose = true
				this.showkey = key
				this.showchoseStatus = pass
				if (key && pass === 2) {
					this.chooseFile(key)
				} else {
					this.showchose = true
				}
			},
			checkPic() {
				this.checkBtn(this.showkey)
				this.showchose = false
			},
			checkBtn (key) {
				let src = this.imgArrs[key * 1].src
				// this.imgArrs[key * 1].isbtn = false
				wx.previewImage({
					current: src,
					urls: [src]
				})
			},
			deleteBtn (key) {
				// 删除图片
				// 删除图片请求
				let param = {
					location: key * 1
				}
				common.deletePhoto(param).then(res => {
					if (res.code === 10000) {
						if (this.imgArrs[key * 1].src) this.caclWidth()
						this.imgArrs[key * 1].src = ''
						this.imgArrs[key * 1].isbtn = false
						this.$set(this.imgArrs, key * 1, this.imgArrs[key * 1])
						uni.$emit('getUserInfo')
					} else {
						util.showFail('删除图片失败!')
					}
				})
			},
			chooseFile (key) {
				// 选择上传图片
				// let { key } = e.currentTarget.dataset
				let that = this
				wx.chooseImage({
					count: 1,
					sourceType: ['album', 'camera'],
					success: function (res) {
						const tempFilePaths = res.tempFilePaths[0]
						that.uploadFile(tempFilePaths, key)
					}
				})
			},
			uploadFile (temsrc, key) {
				// 上传文件
				let that = this
				util.showLoading('图片上传中....')
				common.upload({
					filePath: temsrc
				}).then(res => {
					util.hideAll()
					that.imgArrs[key].src = temsrc
					if (!key) {
						that.originSrc = ''
						that.originEditSrc = ''
						that.userInfo.header_url = res.src
						that.saveUser(that.userInfo.header_url)
						that.headChange = true
						that.imgArrs[key].pass = 0
					} else that.uploadPhoto(res.src, key)
					that.caclWidth()
				})
			},
			uploadPhoto(temsrc, key) {
				let param = {
					value: temsrc,
					location: key
				}
				common.uploadPhoto(param).then(res => {
					if (res.code === 10000) {
						util.showSuccess('上传图片成功!')
						this.imgArrs[key].pass = 0
					} else {
						util.showFail('上传图片失败!')
						this.imgArrs[key].src = ''
						this.caclWidth()
					}
				})
			},
			saveMession() {
				if (this.userInfo.wechat_number && this.userInfo.wechat_number !== 'undefined') {
					this.boxconfig.key = 7
					this.boxconfig.model = 1
					this.boxconfig.content = '一旦确定好了微信，后面将无法更改 确定吗？'
					this.showChoosebox = true
				} else {
					this.saveInfo()
				}
			},
			saveUser(headUrl) {
				let param = {
					id: this.userInfo.memberID,
					header_url: headUrl
				}
				infoService.saveData(param).then(res => {
					if (res.code === 10000) {
						uni.$emit('getUserInfo', {msg: '更新用户信息'})
					}
				})
			},
			saveInfo() {
				if (this.showChoosebox) {
					this.showChoosebox = false
					this.boxconfig.content = ''
					this.boxconfig.model = 2
					this.boxconfig.key = 0
				}
				let that = this
				let headImg_set = this.userInfo && this.userInfo.verfiy_list && this.userInfo.verfiy_list.filter(v => v.type === 'header')[0]
				let param = {
					birthday: that.userInfo.timeChoose && that.userInfo.timeChoose.join('-'),
					gender: that.userInfo.gender,
					height: that.userInfo.height,
					revenue: that.userInfo.revenue,
					objective: that.userInfo.objective,
					occupation: that.userInfo.occupation,
					wechat_number: that.userInfo.wechat_number,
					nickname: that.userInfo.nickname
					// header_url: that.userInfo.header_url
				}
				if (that.editDetail[0].titleicon && that.editDetail[0].titleicon.length || this.initname === this.userInfo.nickname) delete param.nickname
				if (that.editDetail[7].titleicon && that.editDetail[7].titleicon.length || !that.editDetail[7].isInput || !param.wechat_number) delete param.wechat_number
				// if (headImg_set.value && headImg_set.pass === 0 || this.headChange) delete param.header_url
				util.showLoading('数据保存中，请稍等..')
				infoService.saveData(param).then(res => {
					util.hideLoading()
					if (res.code === 10000) {
						util.showSuccess('保存成功!', 1000)
						app.$vm.getUserInfo().then(res => {
							// 初始化数据
							that.initData()
						})
					} else {
						util.showFail('保存失败, 请重试!')
					}
				})
			},
			chooseItem(e){
				// 处理选择数据
				let key = e.detail.val
				switch (key){ //1 性别， 2，
					case '1':
						return
						// this.items = this.sexConfig
						// this.boxconfig.key = 1
						// this.boxconfig.model = 2
						// this.choseKey = this.userInfo.gender - 1
						// this.showChoosebox = true
						break;
					case '2': // 生日
						this.boxconfig.key = 2
						this.boxconfig.model = 3
						this.showChoosebox = true
						break;
					case '3': // 身高
						this.items = Object.assign(config.selfHeight)
						this.boxconfig.key = 3
						this.boxconfig.model = 2
						this.choseKey = this.userInfo.height - 150
						this.showChoosebox = true
						break;
					case '4': // 行业
						util.goUrl(e)
						break;
					case '5': // 年收入
						this.items = Object.assign(this.selfPays)
						this.boxconfig.key = 5
						this.boxconfig.model = 2
						this.choseKey = this.selfPaysIndex
						this.showChoosebox = true
						break;
					case '6': // 邀约项目
						this.items = Object.assign(this.selfTypes)
						this.boxconfig.key = 6
						this.boxconfig.model = 2
						this.choseKey = this.selfTypesIndex
						this.showChoosebox = true
						break;
					default:
						break;
				}
			},
			surefunc(obj){
				let {key, choseIndex, time, val } = obj.detail
				if (!key && obj.detail) {
					return 	this.saveInfo()
				}
				switch (key * 1){
					case 1:
						this.userInfo.gender = val
						this.editDetail[1].content = this.userInfo.gender === 1 ? '男' : '女'
						this.showChoosebox = false
						break;
					case 2:
						this.timeChoose = Object.assign(time)
						this.userInfo.timeChoose = this.timeChoose
						this.editDetail[2].content = this.timeChoose.join('-')
						this.showChoosebox = false
						break;
					case 3:
						this.userInfo.height = val
						this.editDetail[3].content = this.userInfo.height + 'cm'
						this.showChoosebox = false
						break;
					case 5:
						this.selfPaysIndex = choseIndex * 1
						this.userInfo.revenue = val
						this.editDetail[5].content = this.items[this.selfPaysIndex].text
						this.showChoosebox = false
						break;
					case 6:
						this.selfTypesIndex = choseIndex * 1
						this.userInfo.objective = val
						this.editDetail[6].content = this.items[this.selfTypesIndex].text
						this.showChoosebox = false
						break;
					default:
						break;
				}
				this.caclWidth()
			},
			optPic() {
				// 处理
				let that = this
				if (!this.showkey) {
					this.showchose = false
					this.originSrc = ''
					this.originEditSrc = ''
					wx.chooseImage({
						count: 1,
						sourceType: ['album', 'camera'],
						success: function (res) {
							const tempFilePaths = res.tempFilePaths[0]
							that.originSrc = tempFilePaths
							uni.navigateTo({
								url: '/pages/tool/cropper?type=header_url&src=' + that.originSrc
							})
						}
					})
				} else {
					// 删除照片
					wx.showModal({
						// title: '确定删除？',
						content: '确定删除？',
						showCancel: true,
						success(res) {
							if (res.confirm) {
								if (that.showkey !== -1) that.deleteBtn(that.showkey)
								// console.log('用户点击确定')
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
				this.showchose = false
			},
			createFormId(e) {
				if (e.detail.formId) app.$vm.sendFormId(e.detail.formId)
			},
			cancelfunc(){
				this.showChoosebox = false
			},
			valChange(e) {
				let { key, val } = e.detail
				if (key === '0') this.userInfo.nickname = val
				if (key === '7') this.userInfo.wechat_number = val
				this.caclWidth()
			}
		}
	});
</script>

<style>
	page {
		background: linear-gradient(180deg, #f81f5e 0% 28%, #f81f5e 28% 30%, #f7f7f7 28% 30%, #f7f7f7 30% 100%);
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	.edit-img {
		width: 100%;
		height: 100%;
	}
	.uedit-head {
		position: relative;
		width: 100%;
	}
	.prossbar {
		width: 690rpx;
		height: 54rpx;
		border-radius: 54rpx;
		background: white;
		margin: 20rpx auto;
		display: flex;
		justify-content: flex-start;
		padding: 2rpx;
	}
	.prossbarText {
		width: 124rpx;
		padding: 12rpx 0;
		height: 50rpx;
		line-height: 1.2;
		font-size: 24rpx;
		text-align: center;
		color: #000000;
	}
	.prossbox {
		flex: 1;
	}
	.pross {
		height: 50rpx;
		border-radius: 50rpx;
		background: linear-gradient(left, #ec256a, #6963f1);
		display: flex;
		justify-content: flex-end;
	}
	.prosstext {
		width: 80rpx;
		height: 50rpx;
		border-radius: 50rpx;
		background:  #6963f1;
		font-size: 24rpx;
		line-height: 50rpx;
		color: white;
		text-align: center;
	}
	.edit-photo {
		width: 690rpx;
		height: 696rpx;
		margin: 36rpx auto;
		border-radius: 30rpx;
		background: white;
		padding: 30rpx;
	}
	.edit-big {
		float: left;
		position: relative;
		width: 408rpx;
		height: 408rpx;
		border-radius: 30rpx;
		margin: 6rpx;
		overflow: hidden;
	}
	.edit-big-tag {
		position: absolute;
		z-index: 9;
		top:0;
		left:0;
		width: 80rpx;
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 30rpx 0 30rpx 0;
		background: #f81f5e;
		color: white;
		font-size: 24rpx;
		text-align: center;
	}
	.edit-small {
		float: left;
		position: relative;
		width: 198rpx;
		height: 200rpx;
		border-radius: 30rpx;
		margin: 6rpx;
		overflow: hidden;
	}
	.edit-small-2 {
		margin-top: 10rpx;
	}
	.edit-msg-box, .edit-msg-default, .edit-tool {
		position:absolute;
		top:0;
		left:0;
		bottom:0;
		right:0;
		z-index: 70;
		flex-wrap: wrap;
		border-radius: 30rpx;
	}
	.edit-msg-add {
		width: 46rpx;
		height: 46rpx;
	}
	.edit-msg-box {
		z-index: 9;
	}
	.edit-tool {
		z-index: 4;
		background: rgba(0, 0, 0, .5);
	}
	.edit-msg-img {
		width: 30rpx;
		height: 30rpx;
		margin: 0 auto;
	}
	.edit-msg-text {
		width: 100%;
		margin-top: 22rpx;
		font-size: 24rpx;
		line-height: 34rpx;
		color: white;
		text-align: center;
	}
	.eidt-choose-box {
		width: 690rpx;
		background: white;
		margin: 40rpx auto;
		border-radius: 30rpx;
		overflow: hidden;
		padding-bottom: 100rpx;
	}
	.edit-choose-title {
		height: 100rpx;
		text-align: center;
		font-size: 36rpx;
		line-height:100rpx;
	}
	.uinfo-d-btnbox {
		position: fixed;
		z-index: 488;
		bottom:0;
		padding: 10rpx 30rpx;
		background: #F9F9F8;
	}
	.uinfo-d-btn {
		width: 690rpx;
		border-radius: 30rpx;
		background: #f81f5e !important;
		color: white;
	}
	.lg {
	   padding:0 40rpx;
	   font-size:32rpx;
	   height:88rpx;
	}
	.shing {
		background: rgba(128, 132, 249, .8);
	}
	.shnopass {
		background: rgba(253, 192, 49, .8);
	}
	.shdefault {
		/* background: #F9F9FB; */
		background: rgb(249, 249, 251);
	}
	.edit-icon {
		font-size: 40rpx;
		color: white;
	}
	.edit-iconl {
		margin-right: 10%;
	}
</style>
