<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<dialogbox @surefunc='surefunc' @cancelfunc='cancelfunc' :items='items' :boxconfig='boxconfig' v-if='showChoosebox' :choseKey='queryParam.choseKey'>
			<block v-if='showVip'>
				<view class='b-content'>
					<view class='b-title flex-c'>VIP会员高级筛选</view>
					<view class='b-title b-title-02 flex-c'>高级筛选需要成为VIP</view>
				</view>
			</block>
		</dialogbox>
		<view class='b-bar' @click='resetfunc'>
			<view class='b-text'>重置</view>
			<view class='iconfont icon-sync b-iconcz'></view>
		</view>
		<view class='b-bar-1'>
			<choose :choArr='orderType' :choCount='queryParam.sort' @setValue='sexfunc' choTitle='排序' keys='1'></choose>
			<choose :choArr='sexArr' :choCount='queryParam.gender' @setValue='sexfunc' choTitle='性别' keys='2'></choose>
			<choose :choArr='checkArr' :choCount='queryParam.video' @setValue='sexfunc' choStyle='margin-bottom: 20rpx;' choTitle='视频认证' keys='3'></choose>
		</view>
		<view class='b-bar-2'>
			<view class='b-bar-col' v-if='!isVip' @click='showVipBox'></view>
			<view class='b-bar-box'>
				<view class='b-range'>
					<view class='b-range-text'>
						<view>年龄</view>
						<view>{{queryParam.ageVal[0]}} ~ {{queryParam.ageVal[1]}}</view>
					</view>
					<view class='b-range-bar'>
						<slide :width="ageWidth" :value="queryParam.ageVal" min="18" max="70" @change='getsliderValA' :thumb-style='thumbStyle' active-color='#f81f5e' slider-weight='2'></slide>
					</view>
				</view>
				<view class='b-range'>
					<view class='b-range-text'>
						<view>身高</view>
						<view>{{queryParam.heightVal[0]}} ~ {{queryParam.heightVal[1]}}</view>
					</view>
					<view class='b-range-bar'>
						<slide :width="ageWidth" :value="queryParam.heightVal" min="150" max="220" @change='getsliderValH' :thumb-style='thumbStyle' active-color='#f81f5e' slider-weight='2'></slide>
					</view>
				</view>
				<view class='b-choose'>
					<iptitem :inputconfig="brushTool[0]" @choose='chooseItem'></iptitem>
					<iptitem :inputconfig="brushTool[1]" @choose='chooseItem'></iptitem>
				</view>
				<view class='b-choose2'>
					<view class='b-choose2-tite'>最新</view>
					<view class='b-choose'>
						<iptitem :inputconfig="brushTool[2]">
							<switch data-key='1' @change="switchChange" color='#F81F5E' :checked='queryParam.recentR' />
						</iptitem>
					</view>
				</view>
				<view class='b-choose3'>
					<view class='b-choose3-tite'>邀约项目</view>
					<view class='b-choose3-box'>
						<itemh @setValue='itemHfunc' :itemData='selfTypes'></itemh>
					</view>
				</view>
			</view>
		</view>
		<form :report-submit=true @submit='createFormId' class='uinfo-d-btnbox'>
			<button form-type='submit' class='c-btn bg-red2 brush-btn' @click='goBack'>确定</button>
		</form>
	</block>
</template>

<script>
    import Vue from 'vue';
    import util from '../../static/utils/index.js'
	import localstorage from '../../static/utils/localstorage.js'
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
					title: '筛选',
					bgset: 'bg-gradual-dred',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2
				},
				boxconfig: {
					key: 0,
					model: 1,
					btn: {
						ok: '确定',
						okcolor: 'd-color-r',
						cancel: '取消',
						cancolor: 'd-color-b'
					}
				},
				orderType: [
					{
						text: '最近上线',
						isbgcolor: 'cho-dct'                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
					},
					{
						text: '离我最近',
						isbgcolor: 'cho-dct'
					}
				],
				sexArr: [
					{
						text: '不限',
						isbgcolor: 'cho-dct'
					},
					{
						text: '男生',
						isbgcolor: 'cho-dct'
					},
					{
						text: '女生',
						isbgcolor: 'cho-dct'
					}
				],
				checkArr: [
					{
						text: '查看全部',
						isbgcolor: 'cho-dct'
					},
					{
						text: '只看认证用户',
						isbgcolor: 'cho-dct'
					}
				],
				ageWidth: 690,
				thumbStyle: {
					background: '#f81f5e',
					border: '2px solid white',
					'box-shadow': '0 0 4px #f81f5e'
				},
				brushTool: [
					{
						key: '0',
						title: '年收入',
						icon: '',
						content: '',
						arrow: true,
						size: 40,
						type: 'button',
						url: '',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: false
					},
					{
						key: '1',
						title: '职业',
						icon: '',
						content: '',
						arrow: true,
						size: 40,
						type: 'url',
						url: '/pages/tool/job',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: false,
						last: true
					},
					{
						key: '2',
						title: '最新加入的会员',
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
				items: [],
				showChoosebox: false,
				selfTypes: [], // 类型
				selfPays: [], // 年收入
				queryParamInit: {
				},
				jobObj: {
					title: '',
					id: '',
				}, // 职业选择
				queryParam: {
					recentR: false, // 选中
					choseKey: -1, //默认选中第一个
					recent: 0, // 是否是最新成员的
					sort: 1, // 排序 1: 最近上线 2： 离我最近
					gender: 0, // 性别
					video: 0, // 0 不限制， 1 认证
					occupation: 0, // 职业
					occupation_str: '', // 职业名称
					revenue: 0, // 年收入
					objective: [], // 邀约项目
					ageVal: [18, 70], // 年龄
					heightVal: [150, 220]
				},  // 查询设置
				isVip: false,
				showVip: false
			}
		},
		onLoad() {
			this.selfTypes = Object.assign(app.globalData.selfTypes)
			this.selfPays = app.globalData.selfPays
			this.items = this.selfPays
			let userInfo = app.globalData.userInfo
			this.queryParam.gender = userInfo && userInfo.gender === 1 ? 2 : 1
			this.queryParamInit = Object.assign({}, this.queryParam)
			this.init()
		},
		onShow() {
			app.globalData.isBrush = false
			this.setJob()
		},
		onUnload() {
			if(!app.globalData.isBrush) {
				this.queryParam.ageVal = [18, 70]
				this.queryParam.heightVal = [150, 220]
			}
		},
		methods: {
			init() {
				// 初始化查询
				let queryloc = localstorage.getItem('queryParam')
				if (queryloc.length) {
					try {
						queryloc = queryloc && JSON.parse(queryloc)
					} catch(e) {
						queryloc = {}
					}
				} else queryloc = {}
				this.queryParam = Object.assign(this.queryParam, queryloc)
				this.selfTypes.map(v => {
					v.isChoose = false
					v.icon = app.globalData.yYtype[v.title]
					v.imgStyle = 'width:40%;border-radius:0'
					v.imgStyleR = 'background: #6267F9'
					if (~this.queryParam.objective.indexOf(v.id)) v.isChoose = true
				})
				this.brushTool[0].content = this.queryParam.choseKey !== -1 && this.items[this.queryParam.choseKey].text || ''
				this.jobObj= {
					title: this.queryParam.occupation_str || '',
					id: this.queryParam.occupation
				}
				this.brushTool[1].content = this.queryParam.occupation_str
				this.brushTool[1].url = '/pages/tool/job?id=' + this.queryParam.occupation
				this.isVip = app.globalData.userInfo.vip_id > 0
			},
			showVipBox() {
				// 弹出VIP提示购买框
				this.boxconfig.model = 1
				this.boxconfig.btn.ok = '成为会员'
				this.boxconfig.btn.cancel = '再看看'
				this.showVip = true
				this.showChoosebox = true
			},
			resetfunc() {
				this.queryParam = Object.assign(this.queryParam, this.queryParamInit)
				this.queryParam.ageVal = [18, 70]
				this.queryParam.heightVal = [150, 220]
				this.brushTool[0].content = ''
				this.brushTool[1].content = ''
				this.selfTypes.map(v => {
					v.isChoose = false
				})
			},
			setJob() {
				let pages = getCurrentPages()
				let currPage = pages[pages.length - 1]
				let jobObj = !util.isEmpty(currPage.data.jobObj) && currPage.data.jobObj
				if (jobObj && !jobObj.id) jobObj = this.jobObj
				this.brushTool[1].content = jobObj.title || ''
				this.brushTool[1].url = '/pages/tool/job?id=' + jobObj.id
				this.jobObj = jobObj
				this.queryParam.occupation = jobObj.id || 0
				this.queryParam.occupation_str = jobObj.title
			},
			sexfunc(e) {
				let { key, val } = e.detail
				switch (key * 1) {
					case 1:
						this.queryParam.sort = val
						break;
					case 2:
						this.queryParam.gender = val
						break;
					case 3:
						this.queryParam.video = val
						break;
					default:
						break;
				}
			},
			getsliderValA (obj) {
				this.queryParam.ageVal = obj.detail.value
			},
			getsliderValH(obj) {
				this.queryParam.heightVal = obj.detail.value
			},
			chooseItem(e) {
				let key = e.detail.val
				if (key * 1 === 0) {
					this.items = this.selfPays
					this.boxconfig.model = 2
					this.boxconfig.btn.ok = '确定'
					this.boxconfig.btn.cancel = '取消'
					this.showChoosebox = true
				} else if (key * 1 === 1) {
					util.goUrl(e)
				}
			},
			surefunc(obj) {
				let { key, choseIndex, val } = obj.detail
				if (this.showVip) {
					uni.navigateTo({
						url: '/pages/userinfo/vip'
					})
					this.showChoosebox = false
					this.showVip = false
					return
				}
				this.queryParam.choseKey = choseIndex * 1
				this.queryParam.revenue = choseIndex * 1 + 1
				this.brushTool[0].content = this.items[choseIndex * 1].text	
				this.showChoosebox = false
			},
			cancelfunc() {
				this.showChoosebox = false
				this.showVip = false
			},
			switchChange(e) {
				let val = e.detail.value
				this.queryParam.recentR = Boolean(val * 1)
			},
			itemHfunc(obj) {
				// this.itemData = obj.detail
				this.queryParam.objective = []
				let {key, val, res} = obj.detail
				this.selfTypes = res || []
				this.selfTypes.map(v => {
					if (v.isChoose) this.queryParam.objective.push(v.id)
				})
			},
			goBack() {
				app.globalData.isBrush = true
				localstorage.setItem('queryParam', this.queryParam, () => {
					uni.navigateBack()
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
		background: #f9f9fb;
	}
	.b-bar {
		display: flex;
		justify-content: flex-end;
		padding: 30rpx 32rpx;
	}
	.b-bar-1 {
		margin-top: -40rpx;
	}
	.b-text {
		font-size: 28rpx;
		color: #666666;
	}
	.b-iconcz {
		width: 22rpx;
		height: 22rpx;
		margin-left: 22rpx;
	}
	.b-bar-2 {
		position: relative;
		overflow: hidden;
		margin-top: 60rpx;
		width: 750rpx;
		border-radius: 30rpx 30rpx 0 0;
		padding-bottom: 110rpx;
	}
	.b-bar-col {
		position:absolute;
		z-index: 99;
		top:0;
		right:0;
		bottom:0rpx;
		left:0;
	}
	.b-bar-2::before {
		display: block;
		content: '高级搜索';
		width: 100%;
		line-height: 60rpx;
		text-align: center;
		font-size: 28rpx;
		color: white;
		height: 182rpx;
		background: #6267f9;
		border-radius: 30rpx 30rpx 0 0;
	}
	.b-bar-box {
		z-index: 22;
		border-radius: 30rpx 30rpx 0 0;
		margin-top: -122rpx;
		background: #F9F9F8;
		min-height: 400rpx;
		padding: 40rpx 30rpx;
	}
	.b-range {
		margin-bottom: 40rpx;
/* 		background: white;
		border-radius:30rpx; */
	}
	.b-range-text {
		display: flex;
		justify-content: space-between;
		line-height:40rpx;
		font-size: 28rpx;
		color: #000000;
	}
	.b-choose {
		border-radius:30rpx;
		overflow: hidden;
	}
	.b-choose2, .b-choose3 {
		margin-top: 40rpx;
	}
	.b-choose2-tite {
		margin-bottom:10rpx;
		height:40rpx;
		line-height: 40rpx;
		font-size: 28rpx;
	}
	.b-choose3-tite {
		margin-top:20rpx;
		text-align:center;
		font-size: 32rpx;
		color: #4A4A4A;
		line-height: 1;
	}
	.b-choose3-box {
		padding: 40rpx 0;
	}
	.brush-btn {
		width: 690rpx;
		height: 88rpx;
		border-radius: 30rpx;
	}
	.b-content {
		padding: 56rpx 132rpx;
	}
	.b-title {
		font-size:28rpx;
		line-height: 48rpx;
		font-weight: 600;
		color: #f92a66;
	}
	.b-title-02 {
		color: #333333;
	}
	.uinfo-d-btnbox {
		position: fixed;
		z-index: 488;
		bottom:0;
		padding: 10rpx 30rpx;
		background: #F9F9F8;
	}
</style>
