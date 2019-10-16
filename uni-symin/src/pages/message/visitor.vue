<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<view class='v-bar-box'>
			<view :class="['v-bar-item', choseCheck === 1 ? 'v-bar-item-checked' : '']" @click='choseFunc(1)'>来访者</view>
			<view :class="['v-bar-item', choseCheck === 2 ? 'v-bar-item-checked' : '']" @click='choseFunc(2)'>我看过的人</view>
		</view>
		<view class='v-box'>
			<view class='v-item-box' v-show='choseCheck === 1'>
				<view class='v-item' v-for='(item, index) in visitorsO' :key='item.id' :data-key='index' :data-mid='item.memberID' :data-id='item.id' @click="goDetail">
					<image class='v-icon' :src='item.header_url' mode='aspectFill'></image>
					<view class='v-content'>
						<view class='v-text'>{{item.nickname ? item.nickname : item.gender === 1 ? '小哥哥XDGF9878' : '小姐姐XDGF9878'}}</view>
						<image :src='newbar' class='newtag' v-if='item.isNew'></image>
					</view>
					<view class='v-time'>{{item.time | timeForm}}</view>
				</view>
			</view>
			<view class='v-item-box' v-show='choseCheck === 2'>
				<view class='v-item' v-for='item in visitors' :key="item.id" :data-mid='item.visitID' :data-id='item.id' @click="goDetail">
					<image class='v-icon' :src='item.header_url' mode='aspectFill'></image>
					<view class='v-content'>
						<view class='v-text'>{{item.nickname ? item.nickname : item.gender === 1 ? '小哥哥XDGF9878' : '小姐姐XDGF9878'}}</view>
						<!-- <image :src='newbar' class='newtag'></image> -->
					</view>
					<view class='v-time'>{{item.time | timeForm}}</view>
				</view>
			</view>
		</view>
		<loading :loadConfig='choseCheck === 1 ? loadConfV : loadConf'></loading>
	</block>
</template>

<script>
    import Vue from 'vue';
	import infoService from '../../api/info/info.js'
    import localstorage from '../../static/utils/localstorage.js'
	import utils from '../../static/utils/index.js'
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
					title: '最近来访',
					bgset: 'bg-gradual-dred',
					tset: 'bg-gradual-tred',
					hiddenTitle: 2,
					isArrow: 2					
				},
				choseCheck: 1,
				vicon: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconH.jpg',
				Iitemimg: 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_boy.png',
				Iitemimgw: 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_girl.png',
				newbar: 'https://sns-cdn.myxianxiaobao.com/sfximao/newTag.png',
				param: {
					page: 1,
					pagesize: 10,
					current_page: 0
				},
				paramV: {
					page: 1,
					pagesize: 10
				},
				loadConf: {
					loading: false,
					current_page: 1,
					last_page: 1,
					len: 0
				},
				loadConfV: {
					loading: false,
					current_page: 1,
					last_page: 1,
					len: 0
				},
				visitorTag: {},
				visitors: [],
				visitorsO: [],
				userInfo: {}
			}
		},
		onLoad() {
			this.getVisit()
			this.getByVisit()
			this.userInfo = app.globalData.userInfo
		},
		onReachBottom() {
			let param = this.choseCheck === 1 ? this.paramV : this.param
			let {current_page, last_page, page} = param
			if (!param.loading && current_page != last_page) {
			  param.page = current_page + 1
			  if (this.choseCheck === 1) {
				  this.getByVisit()
			  } else {
				  this.getVisit()
			  }
			}
		},
		methods: {
			choseFunc(key) {
				this.choseCheck = key
			},
			setNewTag() {
				let visitors = localstorage.getItem('visitors')
				if (visitors.length) visitors = JSON.parse(visitors)
				else visitors = {}
				this.visitorsO.map( v=> {
					if (!visitors[v.id] && (new Date().getTime() - new Date(v.time * 1000) < 3 * 24 * 60 * 60 * 1000)) {
						visitors[v.id] = false
						v.isNew = true
					} else {
						v.isNew = false
						if (!visitors[v.id]) delete visitors[v.id]
					}
				})
				this.visitorTag = visitors
				localstorage.setItem('visitors', visitors)
			},
			getVisit() {
				// 访问他人
				let param = this.param
				if (param.page === param.current_page || this.loadConf.loading) {
					return
				}
				this.loadConf.loading = true
				infoService.getVisitList(param).then(res => {
					this.loadConf.loading = false
					if (res.code === 10000) {
						let resdata = res.data
						if (!utils.isEmpty(resdata)) {
							let { last_page, current_page, total, data } = resdata
							this.loadConf.last_page = this.param.last_page = last_page || 0
							this.loadConf.current_page = this.param.current_page = current_page || 0
							this.loadConf.len = data && data.length || 0
							this.param.total = total || 0
							this.visitors = [...this.visitors, ...data]	
						} else this.visitors = []
						// this.visitors = this.visitors.concat(data)
					} else utils.showFail('数据获取失败')
				})
			},
			getByVisit() {
				let param = this.paramV
				if (param.page === param.current_page || this.loadConfV.loading) {
					return
				}
				this.loadConf.loading = true
				infoService.getBeVisitList(param).then(res => {
					this.loadConfV.loading = false
					if (res.code === 10000) {
						let resdata = res.data
						if (!utils.isEmpty(resdata)) {
							let { last_page, current_page, total, data } = resdata
							this.loadConfV.last_page = this.paramV.last_page = last_page || 0
							this.loadConfV.current_page = this.paramV.current_page = current_page || 0
							this.loadConfV.len = data && data.length || 0
							this.paramV.total = total || 0
							this.visitorsO = [...this.visitorsO, ...data]
							// this.visitorsO = this.visitorsO.concat(data)
							if (this.visitorsO.length) this.setNewTag()	
						} else this.visitorsO = []
					} else {
						utils.showFail('数据获取失败')
					}
				})
			},
			goDetail(e) {
				// 查看详情
				let { key, id, mid } = e.currentTarget.dataset
				if (this.choseCheck === 1) {
					this.visitorTag[id] = true
					this.visitorsO[key].isNew = false
					this.$set(this.visitorsO, key, this.visitorsO[key])
					localstorage.setItem('visitors', this.visitorTag)
				}
				uni.navigateTo({
					url: `/pages/userinfo/othersd?id=${mid}`
				})
			}
		},
		filters: {
			timeForm (val) {
				let dataStr = new Date(val * 1000)
				let dataArr = [dataStr.getMonth() + 1, dataStr.getDate(), dataStr.getHours(), dataStr.getMinutes()]
				let minute =  dataArr[3] > 10 ? dataArr[3] : '0' + dataArr[3]
				let str = dataArr[0] + '-' + dataArr[1] + '  ' + dataArr[2] + ':' + minute
				return str
			}
		}
	});
</script>

<style>
	.v-box {
		padding: 60rpx 30rpx 40rpx 30rpx;
		margin-top: 60rpx;
	}
	.v-bar-box {
		padding: 40rpx 30rpx 20rpx 30rpx;
		width:100%;
		position: fixed;
		display: flex;
		line-height: 1;
		justify-content: flex-start;
		align-items: center;
		background: white;
	}
	.v-bar-item {
		font-size: 28rpx;
		margin-right: 60rpx;
	}
	.v-bar-item-checked {
		font-size: 36rpx;
		text-align: center;
		font-weight: 600;
	}
	.v-bar-item-checked::after{
		display: block;
		content: ' ';
		width: 80%;
		margin: 10rpx auto;
		height: 10rpx;
		border-radius: 10rpx;
		background: #f81f5e;
	}
	.v-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 0;
	}
	.v-icon {
		height: 80rpx;
		width: 80rpx;
		border-radius: 50%;
	}
	.v-content {
		flex: 1;
		padding: 0 30rpx;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.v-text {
		font-size: 26rpx;
		color: #252837;
	}
	.newtag {
		margin-left: 10rpx;
		width: 48rpx;
		height: 24rpx;
	}
	.v-time {
		font-size: 26rpx;
		color: #666666;
		line-height: 40rpx;
	}
</style>
