<template>
	<block>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<!-- 头像 -->
		<view class='uinfo-head' :style="{ top: top + 'px'}">
			<image :src="userInfo.header_url ? userInfo.header_url : ''" class='uinfo-iconH' data-url='/pages/userinfo/detail?id=userInfo.id' @click='goDetail'></image>
		</view>
		<!-- 用户导航页 -->
		<view class='uinfo-tool-1'>
			<itemh :itemData='itemData' lines='4' :isClickable='isClickable' :imgStyle='itemStyle' :textStyle='itemTextStyle'></itemh>
		</view>
		<view class='uinfo-tool-2'>
			<iptitem :inputconfig="uinfoTool[0]">
				<image :src='iconN' class='uinfo-iconN' v-if='isNew'></image>
			</iptitem>
			<iptitem :inputconfig="uinfoTool[1]"></iptitem>
			<iptitem :inputconfig="uinfoTool[2]" :inputStyle='uinfoinputStyle'></iptitem>
		</view>
		<tbar :isActiveIndex='2' :tbarconfig='tbarconfig'></tbar>
	</block>
</template>

<script>
    import Vue from 'vue';
	import util from '../../static/utils/index.js'
    import localstorage from '../../static/utils/localstorage.js'
	import infoService from '../../api/info/info.js'
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
					isArrow: 1,
					bgset: 'bg-gradual-transparent',
					tset: 'bg-gradual-tred'
				},
				top: -(wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT),
				iconH: 'https://sns-cdn.myxianxiaobao.com/sfximao/iconH.jpg',
				iconN: 'https://sns-cdn.myxianxiaobao.com/sfximao/newTag.png',
				itemStyle: {
					'border-radius': '30rpx;',
					'background': 'white'
				},
				isClickable: false,
				itemTextStyle: {
					'font-size': '24rpx',
					'font-weight': 400,
					'color': '#000000',
					'margin-top': '-10rpx'
				},
				itemData: [{
					url: '/pages/userinfo/vip',
					text: '会员中心',
					icon: 'https://sns-cdn.myxianxiaobao.com/sfximao/uinfo-z.png',
					imgStyle: 'width: 100rpx;height: 100rpx;border-radius: 30rpx;'
				},{
					url: '/pages/webview/index?url=https://sns.myxianxiaobao.com/help-page/home.html&parameter='+JSON.stringify([{
                        key: 'account',
                        data: wx.instantmessaging[wx.instantmessaging.thishe].service.accid
                    }]),
					text: '帮助中心',
					icon: 'https://sns-cdn.myxianxiaobao.com/sfximao/uinfo-d-02.png',
					imgStyle: 'width: 100rpx;height: 100rpx;border-radius: 30rpx;'
				},{
					url: '/pages/userinfo/edit',
					text: '编辑资料',
					icon: 'https://sns-cdn.myxianxiaobao.com/sfximao/uinfo-l.png',
					// smTitle: '审核中',
					imgStyle: 'width: 100rpx;height: 100rpx;border-radius: 30rpx;'
					
				},{
					url: '/pages/tool/videorz',
					text: '视频认证',
					icon: 'https://sns-cdn.myxianxiaobao.com/sfximao/uinfo-s-02.png',
					imgStyle: 'width: 100rpx;height: 100rpx;border-radius: 30rpx;'
				}],
				uinfoTool: [
					{
						key: '0',
						title: '最近来访',
						icon: '',
						content: '',
						arrow: true,
						size: 40,
						type: 'url',
						url: '/pages/message/visitor',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: true
					},	{
						key: '1',
						title: '推荐给朋友',
						icon: '',
						content: '',
						arrow: true,
						size: 40,
						type: 'url',
						url: '/pages/message/desct',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: false
					},
					{
						key: '2',
						title: '设置',
						icon: '',
						content: '',
						arrow: true,
						size: 40,
						type: 'url',
						url: '/pages/seting/setindex',
						isBorderR: false,
						placeholder: '',
						isInput: false,
						selfconf: false,
						last: true
					}
				],
				uinfoinputStyle: {
					'border-bottom': 0
				},
				userInfo: {},
				verfiy_list: [],
				isNew: false
			}
		},
        computed: {
            ...mapGetters({
                tbarconfig: 'tbarconfig'
            })
        },
		onLoad() {
		},
		onShow() {
			this.userInfo = app.globalData.userInfo
			let isNull = util.isEmpty(this.userInfo)
			if (isNull) this.getUserInfo()
			else this.init()
		},
		onPullDownRefresh() {
			this.getUserInfo()
		},
		methods: {
			init() {
				// 初始化数据
				let isHasVideo = Boolean(this.userInfo.video_url.length)
				if (isHasVideo) {
					this.itemData[3].smTitle = '已认证'
					this.itemData[3].url = '/pages/tool/video'
					this.itemData[3].smStyle = 'background:#FFB400'
				}
				this.itemData[2].smTitle = ''
				this.verfiy_list = this.userInfo.verfiy_list && this.userInfo.verfiy_list.filter(v => v.pass === 0) || []
				this.verfiy_list.map(v => {
					if (v.type === 'video' && v.pass === 0) {
						this.itemData[3].smTitle = '审核中'
						this.itemData[3].url = ''
						this.itemData[3].smStyle = ''
						isHasVideo = true
					} else {
						this.itemData[2].smTitle = '审核中'
					}
				})
				// 没有视频正在审核中，将跳转至视频示例页
				if (!isHasVideo) { 
					this.itemData[3].url = '/pages/regist/stepvideo?type=edit'
					this.itemData[3].smTitle = '未认证'
					this.itemData[3].smStyle = 'background:#f8356e'
				}
				this.isNewVisitor()
			},
			isNewVisitor() {
				this.isNew = false
				let visitor = localstorage.getItem('visitors')
				if (visitor.length) {
					visitor = JSON.parse(visitor)
					for(var v in visitor) {
						if (!visitor[v]) return this.isNew = true
					}
				}
				if (!this.isNew) {
					let param = {
						page: 1,
						pagesize: 100
					}
					infoService.getBeVisitList(param).then(res => {
						if (res.code === 10000) {
							let resdata = res.data
							if (!util.isEmpty(resdata)) {
								let { data } = resdata
								for(var i = 0, len = data.length; i < len; i++) {
									let v = data[i]
									if (!visitor[v.id] && (new Date().getTime() - new Date(v.time * 1000) < 3 * 24 * 60 * 60 * 1000)) return this.isNew = true
								}
							}
						}
					})	
				}
			},
			goDetail(e) {
				util.goUrl(e)
			},
			getUserInfo() {
				app.$vm.getUserInfo(true).then(res => {
					this.userInfo = res
					this.init()
				}).catch(err => {
					console.log('用户信息获取失败！')
				})
			}
		}
	});
</script>

<style>
	page {
		background: #F9F9Fb;
	}
	.uinfo-head {
		position: relative;
		top: 0;
		height: 360rpx;
		width: 750rpx;
		background-image: url('https://sns-cdn.myxianxiaobao.com/sfximao/u-head.png');
		background-repeat: no-repeat;
		background-size: cover;
	}
	.uinfo-iconH {
		position: absolute;
		height: 170rpx;
		width: 170rpx;
		border-radius: 50%;
		border: 6rpx solid rgba(255,255,255,1);
		margin: 228rpx 290rpx 0 290rpx;
	}
	.uinfo-iconN {
		width: 48rpx;
		height: 24rpx;
		margin: 0 20rpx;
	}
	.uinfo-tool-1 {
		width: 690rpx;
		height: 234rpx;
		margin: -50rpx auto;
		padding: 20rpx 30rpx;
		background: white;
		border-radius: 30rpx;
	}
	.uinfo-tool-2 {
		width: 690rpx;
		margin: 0rpx auto;
		margin-top: 80rpx;
		border-radius: 30rpx;
		background: white;
		overflow: hidden;
	}
</style>
