<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<view class='I-box-bar flex-v-b' :style="{ 'top': barconfig.CustomBar + 'px'}">
			<view class='I-barTool flex-x-l' data-url='/pages/tool/brush' @click='goUrl'>
				<view class='I-barTool-text'>筛选</view>
				<image :src='vsxIcons' class='I-barTool-img'></image>
			</view>
			<button class='buttonreset I-barTool flex-x-l' open-type='share'>
				<image :src='vshareIcons' class='I-barTool-img-02'></image>
				<view class='I-barTool-text'>分享给朋友</view>
			</button>
		</view>
		<view class='I-box'>
			<view :class="['I-upload', uploadResult === 'complete' ? 'I-upload-complete': '']" :style="{ 'top': barconfig.CustomBar + 10 + 29 + 'px'}" v-if="type === 'upload'">
				<view class='I-upbar'>
					<view :class="['I-now', upload === 'fail' ? 'upload-fail': '']" :style="{ 'width': width + '%'}"></view>
				</view>
				<view class='I-uploadText' @click='checkResult'>{{!upload ? '视频上传中' : upload === 'fail' ? '视频上传失败，点击重试': '视频上传成功,审核后显示！'}}</view>
			</view>
			<view :class="['I-adBox', type === 'upload' ? 'I-adBox-m-20': '']" v-if='bannerList.length'>
				<uswiper :items='bannerList' :swiperConfig='swiperConf' @swiperchange='swiperchange' v-if='bannerList.length'></uswiper>
			</view>
<!-- 			<view class='I-dot flex-c' v-if='bannerList.length > 1'>
				<view v-for="(item, index) in bannerList" wx:key="unique" :class="['I-dot-item', keyNow === index ? 'I-dot-itema' : '']"></view>
			</view> -->
			<view class='I-content' v-for='(item, index) in userList' :key='index' :data-id='item.memberID' @click='goDetail'>
				<view class='I-item'>
					<view class='I-detail-box'>
						<image :src='item.header_url ? item.header_url : item.gender === 1 ? Iitemimg : Iitemimgw' class='I-item-img' mode="aspectFill"></image>
						<view class='I-detail'>
							<view class='I-d-msg flex-x-l'>
								<view class='I-d-name I-textshadow'>{{item.nickname ? item.nickname : item.gender === 1 ? '小哥哥XDGF9878' : '小姐姐XDGF9878'}}</view>
								<view class='I-d-mark I-textshadow'>/</view>
								<view class='I-d-text I-textshadow'>{{item.age || '28'}}</view>
								<view class='I-d-mark I-textshadow'>/</view>
								<view class='I-d-text I-textshadow'>{{item.constellation || '双子座'}}</view>
							</view>
							<view class='I-d-icons flex-x-l'>
								<view class='I-d-time I-textshadow'>{{item.login_time || '1天前'}}</view>
								<view class='I-d-addr I-textshadow' v-if='item.location.length'>{{item.location || '四川成都 天府广场'}}</view>
								<view class='I-d-distance I-textshadow' v-if='item.distance > 0.5'>{{item.distance}}km</view>
								<view class='I-d-distance I-textshadow' v-if='item.distance < 0.5 && item.distance * 1 > 0.001'>{{item.distance * 1000}}m</view>
								<view class='I-d-distance I-textshadow' v-if='item.distance * 1 < 0.001'>10m内</view>
								<view class='I-d-msgIcon' v-if='item.heart'>
									<image :src='vHot' class='I-d-msgIcon-img'></image>
								</view>
								<view class='I-d-msgIcon2 flex-c' v-if='item.vip_id'>
									<image :src='vipIcon[item.vip_id - 1]' class='I-d-msgIcon-img' mode='aspectFill'></image>
									<view class='I-d-msgIcon2-text'>{{vipItem[item.vip_id] || '普通'}}</view>
								</view>
							</view>
						</view>
						<view class='I-d-rz' v-if='item.video_url'>视频已认证</view>
					</view>
					<view class='I-text-box flex-b'>
						<view class='I-text flex-x-l'>
							<view class='I-text-mark'>●</view>
							<view class='I-text-detail'>希望一起{{selfTypesObj[item.objective] || '吃饭'}}</view>
						</view>
						<view class='I-btn'></view>
					</view>
				</view>
			</view>
			<loading :loadConf='loadConf' v-if='loading'></loading>
		</view>
		<tbar isActiveIndex='0' :tbarconfig='tbarconfig'></tbar>
	</block>
</template>

<script>
    import Vue from 'vue';
	import utils from '../../static/utils/index.js';
	import common from '../../api/common/common.js'
	import infoService from '../../api/info/info'
	import localstorage from '../../static/utils/localstorage.js'
    import { mapGetters } from 'vuex'
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
					bgset: 'bg-gradual-dred',
					tset: 'bg-gradual-tred'
				},
				swiperConf: {
					interval: 5000,
					duration: 500,
					autoplay: true,
					circular: true,
					mode: 'aspectFill',
					model: 1
				},
				vsxIcons: '../../static/images/index-icon-sx.png',
				vshareIcons: '../../static/images/index-icon-share.png',
				vsxIcon: '../../static/images/sx.png',
				Iitemimg: 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_boy.png',
				Iitemimgw: 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_girl.png',
				vHot: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-hot.png',
				type: '',
				width: 0,
				upload: '',
				param: {
					gender: 0,
					sort: 1,
					video: 0,
					page: 1,
					pagesize: 10,
					last_page: 1,
					total: 0,
					current_page: 0
				},
				initparam: {},
				loading: false,
				loadConf: {
					loading: false,
					current_page: 1,
					last_page: 1,
					len: -1
				},
				vipIcon: [], // vip图标
				userList: [],
				bannerList: [],
				selfTypesObj: {},
				isTopBar: false,
				keyNow: 0,
				vipItem: {},
				uploadResult: '',
				fromType: '',
				locationInfo : {
					latitude: '',
					longitude: ''
				},
				shareFrom: {
					id: '',
					type: ''
				}
			}
		},
        computed: {
            ...mapGetters({
                tbarconfig: 'tbarconfig'
            })
        },
		onLoad(param) {
			let { height, width, tempFilePath, type, otherId, fromType, id, shareType, gotoDesn } = param
			if (gotoDesn) {
				// 来自注册的跳转
				uni.navigateTo({
					url: '/pages/regist/stepvideo'
				})
				return
			}
			this.initparam = Object.assign({}, this.param)
			this.otherId = otherId || app.globalData.otherId
			this.fromType = fromType
			let that = this
			// 注册跳转事件
			if (id && shareType) {
				this.shareFrom = app.globalData.shareFrom = {
					id: id,
					type: shareType
				}
			}
			if (type === 'upload' && tempFilePath) {
				this.type = 'upload'
				this.uploadUrl = tempFilePath
				this.uploadFile(tempFilePath)
			}
			if (otherId && !app.globalData.isNotRegist && !fromType) {
				this.goSmfunc(otherId)
			}
		},
		onShow() {
			this.userInfo = app.globalData.userInfo
			this.vipIcon = app.globalData.vipIcon || []
			this.locationInfo = app.globalData.locationInfo
			let otherId = this.otherId || app.globalData.otherId
			let isNull = utils.isEmpty(this.userInfo)
			if (app.globalData.isNotRegist) {
				uni.reLaunch({
					url: '/pages/index/begin?type=regist'
				})
				return
			} else if (this.shareFrom.id && this.shareFrom.type) {
				app.$vm.sendShareMessAge()
			}
			if (otherId && !app.globalData.isNotRegist && !this.fromType) {
				this.goSmfunc(otherId)
				return 
			}
			if (isNull) app.$vm.getUserInfo(true).then(res => {
				this.userInfo = res
				this.init()
			})
			else this.init()
		},
		onPullDownRefresh() {
			this.param.current_page = 0
			this.param.page = 1
			this.userList = []
			this.loading = false
			this.getMermbers()
			this.getBannerList()
		},
		onReachBottom () {
			let loading = this.loading
			let param = this.param
			let {current_page, last_page, page} = param
			if (!loading && current_page != last_page) {
			  this.param.page = current_page + 1
			  this.loadConf.loading = true
			  this.getMermbers()
			} else {
				// utils.showFail('没有更多数据了')
			}
		},
		onShareAppMessage() {
			let useId = app.globalData.userInfo && app.globalData.userInfo.memberID
			return {
			  title: `我在51约约到了小哥哥，小姐姐一起看电影，唱歌，吃饭...`,
			  path: '/pages/index/begin?type=desct&shareType=user&id=' + useId,
			  imageUrl: 'https://sns-cdn.myxianxiaobao.com/sfximao/51sharebg.png',
			  success(d){
			  }
			}
		},
		methods: {
			init() {
				this.selfTypes = app.globalData.selfTypes || localstorage.getItem('selfTypes')
				let isBrush = app.globalData.isBrush // 刷选页过来的条件数据
				let query = localstorage.getItem('queryParam')
				if (query.length) {
					query = JSON.parse(query)
					query.age_min = query.ageVal[0] || 18
					query.age_max = query.ageVal[1] || 70
					query.height_min = query.heightVal[0] || 150
					query.height_max = query.heightVal[1] || 220
					query.recent = Number(query.recentR)
					query.objective = query.objective + ''
					if (app.globalData.searchIndexResult || isBrush) Object.assign(this.param, query)
				} else {
					// 初始化性别查询
					this.param.gender = this.userInfo.gender === 1 ? 2 : 1
				}
				let vipItem = app.globalData.vipItem
				if (vipItem && vipItem.length) {
					this.initVip(vipItem)
				} else {
					app.$vm.getPlayList().then(res => {
						this.initVip(res)
					})
				}
				this.selfTypes.map(v => {
					this.selfTypesObj[v.id] = v.text
				})
				this.getBannerList()
				this.getMermbers()
			},
			goSmfunc(otherId) {
				let pathUrl = ''
				let isagin = 0
				let {height, birthday, objective, occupation, revenue, gender, status, memberID} = this.userInfo
				if (!height || !birthday) pathUrl = '/pages/regist/stepuser'
				else if (!objective || !revenue) pathUrl = '/pages/regist/stepinfo'
				else if (gender === 1 && status === 0) pathUrl = '/pages/message/join?from=index'
				else isagin = 1
				if (!isagin) {
					uni.reLaunch({
						url: pathUrl
					})
				} else {
					app.globalData.otherId = ''
					this.otherId = ''
					let url = `/pages/userinfo/othersd?id=${otherId}`
					if(memberID && otherId && memberID === otherId * 1) {
						url = `/pages/userinfo/detail`
					}
					uni.navigateTo({
						url: url
					})
				}
			},
			initVip(vipArr = []) {
				vipArr.map(v => {
					this.vipItem[v.id] = v.title.substr(0, 2)
				})
			},
			getBannerList () {
				// utils.showLoading('加载中...')
				infoService.getBannerList().then(res => {
					// utils.hideAll()
					if(res.code === 10000) {
						this.bannerList = res.data || []
						this.bannerList.map(v => {
							v.src = v.picture_url
						})
						app.globalData.bannerList = this.bannerList
					}
				})
			},
			goDetail(e) {
				// 查看详情
				let { id } = e.currentTarget.dataset
				uni.navigateTo({
					url: `/pages/userinfo/othersd?id=${id}`
				})
			},
			getMermbers() {
				let param;
				let isBrush = app.globalData.isBrush // 刷选页过来的条件数据
				if (app.globalData.searchIndexResult || isBrush) {
				 let {gender, sort, video, page, current_page, pagesize, age_min, age_max, height_min, height_max, revenue, occupation, recent, objective } = this.param
				 param = {gender, sort, video, page, current_page, pagesize, age_min, age_max, height_min, height_max, revenue, occupation, recent, objective }	
				 param.objective = param.objective || 0
				} else param = this.param
				// let param = this.param
				if (this.loading) return
				if (isBrush) {
					param.page = 1
					param.current_page = 0
					this.userList = []
				}
				if (param.page === param.current_page) {
					return
				}
				this.loading = true
				infoService.getUserList(param).then(res => {
					this.loading = false
					this.loadConf.loading = false
					if (res.code === 10000) {
						let resdata = res.data
						let { last_page, current_page, total, data } = resdata
						if (!data.length && isBrush) {
							app.globalData.searchIndexResult = false
							app.globalData.isBrush = false
							utils.showFail('没有符合条件的用户，以后是系统为你推荐的用户', 1000)
							this.param = Object.assign({}, this.initparam)
							this.getMermbers()
							return
						}
						if (isBrush && data.length) {
							app.globalData.isBrush = false
							app.globalData.searchIndexResult = true
						}
						data.map(v => {
							// v.login_time = utils.ctDate(v.login_time * 1000)
							// v.addr = v.location && v.location.substr(0, v.location.indexOf('市') + 1) || ''
							v.distance = utils.distance(this.locationInfo.latitude, this.locationInfo.longitude, v.latitude, v.longitude)
						})
						this.loadConf.last_page = this.param.last_page = last_page
						this.loadConf.current_page = this.param.current_page = current_page
						this.loadConf.len = data.length || -1
						this.param.total = total
						this.userList = [...this.userList, ...data]
					} else {
						utils.showFail('数据获取失败')
					}
				}).catch(res => {
					this.loading = false
					this.loadConf.loading = false
				})
			},
			swiperchange(e) {
				let { key } = e.detail
				this.keyNow = key
			},
			goUrl: utils.throttle(function(e) {
				utils.goUrl(e)
			}),
			checkResult() {
				if (this.upload === 'fail') {
					this.type = 'upload'
					this.upload = ''
					this.uploadFile(this.uploadUrl)
				}
			},
			uploadFile(temsrc) {
				let that = this
				this.upload = ''
				let uploadObj =  common.uploadFileProgress({
					filePath: temsrc,
					formData: {
						uploadtype: 'file'
					},
					success(res){
						const data = res.data
						that.upload = 'success'
						that.saveUser(data.url)
						setTimeout(() => {
							that.uploadResult = 'complete'
						}, 1000)
					},
					fail(res) {
						that.width = 100
						that.upload = 'fail'
					},
					complete() {
					}
				})
				uploadObj.onProgressUpdate((res) => {
				  this.width = res.progress
				})
			},
			saveUser(videoUrl) {
				let param = {
					id: this.userInfo.memberID,
					video_url: videoUrl
				}
				infoService.saveData(param).then(res => {
					if (res.code === 10000) {
						uni.$emit('getUserInfo', {msg: '更新用户信息'})
					}
				})
			}
		}
	});
</script>

<style>
	page {
		/* background-image: linear-gradient(180deg, #f81f5e 0 28%, #f81f5e 28% 30%, #f9f9fb 28% 30%, #f9f9fb 30% 100%); */
		background-repeat: no-repeat;
		background-attachment: fixed;
	}
	page:before {
	  content: ' ';
	  position: fixed;
	  z-index: -1;
	  height: 320rpx;
	  width: 100%;
	  background: #f81f5e;
/*      background-image: linear-gradient(180deg, #f81f5e 0 28%, #f81f5e 28% 30%, #f9f9fb 28% 30%, #f9f9fb 30% 100%);
	  background-size: 100% 100%; */
	}
	.I-box {
		padding: 95rpx 0 60rpx 0;
		margin-top: 20rpx;
	}
	.I-box-bar {
		position:fixed;
		z-index:999;
		padding:0 24rpx;
		height:98rpx;
		width:100%;
		background: #f81f5e;
	}
	.I-upload {
		position: fixed;
		z-index: 1002;
		transition: all .5s;
		background: #f81f5e;
	}
	.I-upload-complete {
		height: 0;
		opacity: 0;
		overflow: hidden;
	}
	.I-upbar {
		width: 750rpx;
		height: 8rpx;
		padding: 1rpx 0;
		background: #fa5a38;
	}
	.I-now {
		width: 0%;
		background: #ffb400;
		height: 8rpx;
		transition: width .3s;
	}
	.I-uploadText {
		width: 100%;
		text-align: center;
		margin: 10rpx 0;
		font-size: 24rpx;
		color: white;
	}
	.I-adBox {
		/* width: 690rpx; */
/* 		height: 260rpx; */
		margin: 0rpx auto;
		border-radius: 30rpx;
		padding-bottom: 20rpx;
		/* background: #f2f2f2; */
	}
	.I-adBox-m-20 {
		margin-top: 40rpx;
	}
	.I-dot {
		padding: 30rpx 0;
	}
	.I-dot-item {
		height: 12rpx;
		width: 12rpx;
		border-radius: 6rpx;
		background: #ffb400;
		margin-right: 30rpx;
	}
	.I-dot-itema {
		width: 30rpx;
		background: #f81f5e;
	}
	.I-barTool {
		min-width: 160rpx;
		height: 60rpx;
		background: white;
		border-radius: 30rpx;
	}
	.I-barTool-text {
		margin: 0 20rpx;
		font-size: 28rpx;
		color: #F81F5E;
	}
	.I-barTool-img {
		height: 28rpx;
		width: 28rpx;
	}
	.I-barTool-img-02 {
		margin-left:20rpx;
		width: 40rpx;
		height: 34rpx;
	}
	.I-content {
		padding: 0 30rpx;
	}
	.I-item {
		margin-bottom: 40rpx;
		height: 786rpx;
		width: 690rpx;
		border-radius: 30rpx;
		background: white;
		overflow: hidden;
	}
	.I-item-img {
		width: 690rpx;
		height: 690rpx;
		border-radius: 30rpx;
	}
	.I-detail-box {
		position: relative;
	}
	.I-detail {
		position: absolute;
		z-index: 22;
		width: 100%;
		padding: 30rpx;
		bottom: 0;
		color: white;
	}
	.I-textshadow {
		text-shadow: 1rpx 1rpx 2rpx rgba(0,0,0,.2), -1rpx 1rpx 2rpx rgba(0,0,0,.2), 1rpx -1rpx 2rpx rgba(0,0,0,.2), -1rpx -1rpx 2rpx rgba(0,0,0,.2);
	}
	.I-d-name {
		font-size: 34rpx;
		color: white;
	}
	.I-d-mark {
		margin: 0 10rpx;
		font-size: 26rpx;
		font-weight: 600;
	}
	.I-d-text {
		font-size: 24rpx;
	}
	.I-d-icons {
		margin-top: 20rpx;
		font-size: 26rpx;
		line-height: 36rpx;
		color: white;
		text-shadow: 1rpx 1rpx 2rpx black;
	}
	.I-d-addr {
		margin-left: 20rpx;
	}
	.I-d-distance {
		margin-left: 20rpx;
	}
	.I-d-msgIcon {
		margin-left: 10rpx;
		width: 30rpx;
		height: 30rpx;
		border-radius: 30rpx;
		background: white;
	}
	.I-d-msgIcon2 {
		margin-left: 10rpx;
		min-width: 100rpx;
		min-height: 50rpx;
		border-radius: 25rpx;
		background: white;
		padding: 6rpx 14rpx;
		box-shadow: 1rpx 1rpx 1rpx rgba(0,0,0,.2);
	}
	.I-d-msgIcon2-text{
		margin-left: .3em;
		color: #000000;
	}
	.I-d-msgIcon-img {
		width: 30rpx;
		height: 30rpx;
		border-radius: 30rpx;
	}
	.I-d-rz {
		position:absolute;
		top: 0;
		right: 0;
		z-index: 23;
		width: 162rpx;
		height: 60rpx;
		line-height: 60rpx;
		background: #09d6a1;
		border-radius: 0 30rpx 0 30rpx;
		box-shadow: -2rpx -2rpx 0 2rpx rgb(147, 229, 208);
		font-size: 28rpx;
		text-align: center;
		color: white;
	}
	.I-text-box {
		height: 96rpx;
		background: white;
	}
	.I-text {
		font-size: 26rpx;
		line-height: 36rpx;
		color: #000000;
		font-weight: 500;
	}
	.I-text-mark {
		font-size: 24rpx;
		color: rgb(248, 31, 94);
		margin: 0 20rpx 0 30rpx;
	}
	.I-btn {flex:auto;}
	.upload-fail {background: #333333;}
</style>