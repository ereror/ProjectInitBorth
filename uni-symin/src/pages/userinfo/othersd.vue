<template>
	<block v-if='userInfoDetail.relationship && !userInfoDetail.relationship.bh'>
		<custombar name="uni-app" :barconfig="barconfig"></custombar>
		<tips :tipContent='tipContent' :tipStyle='tipStyle' v-if='!isvideoRz && tipShow'>
			<text class='iconfont icon-close-circle' @click='tipShow = false'></text>
		</tips>
		<view class='uinfo-d-head'>
			<uswiper :items='items' :swiperConfig='swiperConf'></uswiper>
			<view class='I-d-rz' v-if='isvideoRz === 1'>视频已认证</view>
		</view>
		<!-- <view :class="['uinfo-d-user', isvideoRz ? 'isrz' : 'isrzf']"> -->
		<view class="uinfo-d-user">
			<view class='uinfo-d-user-msg'>
				<view class='uinfo-d-user-name-box'>
					<view class='uinfo-d-user-name'>{{userInfoDetail.nickname ? userInfoDetail.nickname : userInfoDetail.gender === 1 ? '小哥哥XDGF9878' : '小姐姐XDGF9878'}}</view>
					<view class='I-d-mark'>/</view>
					<view class='I-d-text'>{{userInfoDetail.age || '28'}}</view>
					<view class='I-d-mark'>/</view>
					<view class='I-d-text'>{{userInfoDetail.constellation || '双子座'}}</view>
					<view class='I-d-box flex-x-r' @click='showchose = true'>
						<image :src="d_icon_lh" class = 'uinfo-d-user-rz-img-04'></image>
					</view>
				</view>
				<view class='uinfo-d-user-status-box'>
					<view class='uinfo-d-user-status-time'>{{userInfoDetail.location && userInfoDetail.location.login_time || ''}}</view>
					<view class='uinfo-d-user-status-dest flex-x-l'>
						<text>{{userInfoDetail.addr || '四川成都 天府广场'}}</text>
						<text class='uinfo-d-user-status-destaddr' v-if='userInfoDetail.distance > 0.5'>{{userInfoDetail.distance}}km</text>
						<text class='uinfo-d-user-status-destaddr' v-if='userInfoDetail.distance < 0.5 && userInfoDetail.distance * 1 >= 0.001'>{{userInfoDetail.distance * 1000}}m</text>
						<text class='uinfo-d-user-status-destaddr' v-if='userInfoDetail.distance * 1 < 0.001'>10m内</text>
						<view class='I-d-msgIcon' v-if='userInfoDetail.heart_user'>
							<image :src='vHot' class='I-d-msgIcon-img'></image>
						</view>
					</view>
				</view>
			</view>
			<view :class="['uinfo-d-user-rz flex-c', isvideoRz ? 'isrz' : 'isrzf']">
				<text data-url='/pages/tool/video?type=rz'  @click='checkVideo' v-if='isvideoRz'>视频已认证点击查看</text>
				<text data-url='/pages/tool/video?type=nrz' data-key='video' @click='sendMsg' v-else>视频未认证 提醒Ta</text>
				<image :src="d_icon_ck" class="uinfo-d-user-rz-img uinfo-d-user-rz-img-02" v-if='isvideoRz' @click='checkVideo'></image>
				<image :src="d_icon_tx" class="uinfo-d-user-rz-img uinfo-d-user-rz-img-03" v-if='!isvideoRz' @click='sendMsg'></image>
			</view>
		</view>
		<view class='uinfo-d-box'>
			<iptitem :inputconfig="uinfoDetail[0]"></iptitem>
			<iptitem :inputconfig="uinfoDetail[1]"></iptitem>
			<iptitem :inputconfig="uinfoDetail[2]"></iptitem>
			<iptitem :inputconfig="uinfoDetail[3]"></iptitem>
			<iptitem :inputconfig="uinfoDetail[4]">
				<button class='c-btn c-btn-normal uinfo-check-btn' v-if='userInfoDetail.is_wechat_number' data-key='wx' @click='checkDetail'>
					<text>点击查看</text>
				</button>
				<button class='c-btn c-btn-normal uinfo-check-btn' v-if='!userInfoDetail.is_wechat_number' data-key='wx' @click='sendMsg'>
					<text>提醒Ta认证</text>
				</button>
			</iptitem>
			<iptitem :inputconfig="uinfoDetail[5]" :inputStyle='uinfoinputStyle'>
				<button class='c-btn c-btn-normal uinfo-check-btn'  data-key='phone' @click='checkDetail'>
					<text>点击查看</text>
				</button>
			</iptitem>
		</view>
		<view class='uinfo-d-btnbox'>
			<form :report-submit=true @submit='createFormId' class='flex-c'>
				<button form-type='submit' type="submit" class='c-btn lg uinfo-d-btn' @click='goYue'>邀 约</button>
				<button form-type='submit' type="submit" class='c-btn lg uinfo-d-btn2' open-type="share">分 享</button>
			</form>
		</view>
		<dialogbox @surefunc='surefunc' @cancelfunc='cancelfunc' :boxconfig='boxconfig' v-if='showChoosebox'></dialogbox>
<!-- 底部弹框组件		
		<ui-popup :show="showchose" @hidefunc='showchose = false' position="bottom" :height="160" :mask-style="popmaskStyle" :hide-on-tap="true" class='ui-pop'>
			<view>
				<button class='buttonreset sharepopbtn' data-url='/pages/tool/adviceback' :data-uid='userInfoDetail.memberID' @click='goDetail'>匿名举报</button>
				<button class='buttonreset sharepopbtn' @click='relationShip' v-if='false'>{{userInfoDetail.relationship && !userInfoDetail.relationship.h ? '拉黑': '取消拉黑'}}</button>
				<button class='buttonreset sharepopbtn' @click="showchose = false">取消</button>
			</view>
		</ui-popup> -->
		<view class='uinfo-d-box2 flex-c' v-if='showchose'>
			<view class='uinfo-d-box2-detail'>
				<view class='uinfo-d-content' data-url='/pages/tool/adviceback' :data-uid='userInfoDetail.memberID' @click='goDetail'>匿名举报</view>
				<view class='uinfo-d-btn-02' @click="showchose = false">取消</view>
			</view>
		</view>
	</block>
</template>

<script>
    import Vue from 'vue'
    import utils from '../../static/utils/index.js'
    import infoService from '../../api/info/info'
    import {
        mapGetters
    } from 'vuex'
    let app = getApp()
    export default Vue.extend({
        data() {
            return {
                model: 1, // 0 个人中心页，1，他人看到的中心页
                title: 'Hello',
                STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
                DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
                barconfig: {
                    CustomBar: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT,
                    StatusBar: wx.STATUS_BAR_HEIGHT,
                    title: '51约',
                    bgset: 'bg-gradual-dred',
                    tset: 'bg-gradual-tred',
                    hiddenTitle: 2,
                    isArrow: 2
                },
                isvideoRz: 0, // 是否视频认证
                id: '',
                tipShow: true,
                tipContent: '视频没有认证',
                tipStyle: {
                    'background': '#ffb400',
                    'color': 'white'
                },
                items: [],
                swiperConf: {
                    interval: 5000,
                    duration: 500,
                    autoplay: true,
                    circular: true,
                    mode: 'aspectFill'
                },
                uinfoDetail: [{
                        key: '0',
                        title: '邀约项目',
                        icon: '',
                        content: '希望一起吃饭',
                        arrow: false,
                        size: 40,
                        type: 'text',
                        url: '',
                        isBorderR: false,
                        placeholder: '',
                        isInput: false,
                        selfconf: false
                    },
                    {
                        key: '1',
                        title: '身高',
                        icon: '',
                        content: '170cm',
                        arrow: false,
                        size: 40,
                        type: 'text',
                        url: '',
                        isBorderR: false,
                        placeholder: '',
                        isInput: false,
                        selfconf: false
                    },
                    {
                        key: '2',
                        title: '职业',
                        icon: '',
                        content: 'IT/互联网',
                        arrow: false,
                        size: 40,
                        type: 'text',
                        url: '',
                        isBorderR: false,
                        placeholder: '',
                        isInput: false,
                        selfconf: false
                    },
                    {
                        key: '3',
                        title: '年收入',
                        icon: '',
                        content: '20~30w',
                        arrow: false,
                        size: 40,
                        type: 'text',
                        url: '',
                        isBorderR: false,
                        placeholder: '',
                        isInput: false,
                        selfconf: false
                    },
                    {
                        key: '4',
                        title: '微信已认证',
                        icon: '',
                        content: '',
                        arrow: false,
                        size: 40,
                        type: 'text',
                        url: '',
                        isBorderR: false,
                        placeholder: '',
                        isInput: false,
                        selfconf: true
                    },
                    {
                        key: '5',
                        title: '手机已认证',
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
				popmaskStyle:{
				  "background-color": "rgba(0,0,0,.5)"
				},
                uinfoinputStyle: {
                    'border-bottom': 0
                },
                userInfo: {}, // 他人详情
                userInfoDetail: {},
                selfTypes: [],
                selfPays: [],
                isWxrz: 0, // 微信认证
                isSjrz: 0, // 手机认证
                showChoosebox: false, // 显示弹框
                boxconfig: {
                    key: 0,
                    model: 1,
                    title: '',
                    content: '',
                    btn: {
                        ok: '确定',
                        okcolor: 'd-color-r',
                        cancel: '取消',
                        cancolor: 'd-color-b'
                    }
                },
                useKeys: 5,
                checkType: 'wx',
                copyStr: '', // 是否打开复制
                goVip: false,
                isUseKey: 0, // 0 不使用， 1 wx 2 手机 3 邀约
                goRz: false,
				showchose: false,
				d_icon_sh: '../../static/images/d-icon-sh.png',
				d_icon_ck: '../../static/images/d-icon-ck.png',
				d_icon_tx: '../../static/images/d-icon-tx.png',
				d_icon_lh: '../../static/images/d-icon-lh.png',
				// d_icon_ybtn: '../../static/images/d-icon-ybtn.png'
				vHot: 'https://sns-cdn.myxianxiaobao.com/sfximao/v-hot.png'
            }
        },
        computed: {
            ...mapGetters({
                chatListaccount: 'chatListaccount', // 当前对话用户账号
                chatListaccountsession: 'chatListaccountsession', //当前对话会话id
                thischatList: 'thischatList', //聊天记录
            })
        },
		onLoad(param) {
			this.id = param.id || ''
			this.selfTypes = app.globalData.selfTypes
			this.selfPays = app.globalData.selfPays
			if (this.id) this.getOtherInfo(this.id)
		},
		onShow() {
			this.userInfo = app.globalData.userInfo
			this.locationInfo = app.globalData.locationInfo
		},
		onShareAppMessage() {
			let gender = this.userInfoDetail.gender === 1 ? '小哥哥' : '小姐姐'
			return {
			  title: `我发现一个有趣的${gender}推荐给你`,
			  path: '/pages/index/index?otherId=' + this.userInfoDetail.memberID + '&from=user&id=' + this.userInfo.memberID,
			  imageUrl: this.userInfoDetail.header_url,
			  success(d){
			  }
			}
		},
		methods: {
			init() {
				 // 初始化数据
				this.isWxrz = 0
				this.isSjrz = 0
				this.isvideoRz = 0
				if (this.userInfoDetail.nickname) {
					// wx.setNavigationBarTitle({
					// 	title: this.userInfoDetail.nickname
					// })
					this.barconfig.title = this.userInfoDetail.nickname
				}
				if (this.userInfoDetail.video_permit || this.userInfoDetail.video_verfiy) this.isvideoRz = 1
				if (this.isvideoRz === 0 || !this.userInfo.video_url) {
					this.tipContent = '对方未通过视频认证，谨防酒托，骗子'
				}
				this.userInfoDetail.picture =  this.userInfoDetail.picture || []
				this.userInfoDetail.height = this.userInfoDetail.height || 170
				let imgArr = this.userInfoDetail.picture.filter(v=> {
					v.src = v.value
					return v.src
				})
				let header_url = this.userInfoDetail.header_url ?  this.userInfoDetail.header_url : this.userInfoDetail.gender === 1 ? app.globalData.Iitemimg : app.globalData.Iitemimgw
				let Headimg = {src: header_url }
				imgArr.unshift(Headimg)
				this.items = imgArr
				// 设置数据
				let selfTypesChoose = this.selfTypes.filter(v => v.value === this.userInfoDetail.objective * 1)
				let selfPaysChoose = this.selfPays.filter(v => v.value === this.userInfoDetail.revenue * 1)
				this.uinfoDetail[0].content = selfTypesChoose && selfTypesChoose.length && ('希望一起' + selfTypesChoose[0].text) || '希望一起吃饭'
				this.uinfoDetail[1].content = this.userInfoDetail.height + 'cm'
				this.uinfoDetail[2].content = this.userInfoDetail.occupation_str || 'IT/互联网'
				this.uinfoDetail[3].content = selfPaysChoose && selfPaysChoose.length && selfPaysChoose[0].text || '20-30w'
				if (!this.userInfoDetail.is_wechat_number) {
					this.uinfoDetail[4].title = '微信未认证'
				}
				if (!utils.isEmpty(this.userInfoDetail.location)) {
					this.userInfoDetail.addr = this.userInfoDetail.location && this.userInfoDetail.location.location
					this.userInfoDetail.loginTime = utils.ctDate(this.userInfoDetail.location && this.userInfoDetail.location.heartbeat * 1000)
					// this.userInfoDetail.addr = locationstr.substr(0, locationstr.indexOf('市') + 1) || ''
					this.userInfoDetail.distance = utils.distance(this.locationInfo.latitude, this.locationInfo.longitude, this.userInfoDetail.location.latitude, this.userInfoDetail.location.longitude)
				}
			},
			getOtherInfo(id) {
				utils.showLoading('加载中...')
				infoService.getOtherUser({member_id: id}).then(res => {
					utils.hideAll()
					if (res.code === 10000) {
                        this.userInfoDetail = res.data
						if (this.userInfoDetail.relationship && !this.userInfoDetail.relationship.bh) this.init()
						else this.messageFunc('你已被对方拉黑无法再访问Ta', () => {uni.navigateBack()}, 1000)
					}
				})
			},
			checkVideo (e) {
				this.goRz = false
				this.goVip = false
				this.isUseKey = 0
				// let verfiy = this.userInfo && this.userInfo.verfiy_list && this.userInfo.verfiy_list.filter(v => v.type === 'video')
				// if (verfiy.length && verfiy[0].pass === 0) {
				// 	this.boxconfigfunc('你的视频正在审核中，请耐心等待', '好的', '', true)
				// 	return
				// }
				// if (verfiy.length && verfiy[0].pass === 2 || !this.userInfo.video_url) {
				// 	this.boxconfigfunc('本着公平原则，查看对方视频认证, 自己需要进行认证', '去认证', '取消', true)
				// 	this.goRz = true
				// 	return
				// } else {
				// 	if (!this.id) return this.messageFunc('当前视频源出错了~')
				// 	infoService.getOtherVideo({check_id: this.id}).then(res => {
				// 		switch (res.code){
				// 			case 10000:
				// 				uni.navigateTo({
				// 					url: `/pages/tool/video?url=${res.data}&from=other&type=rz&header_url=${this.userInfoDetail.header_url}&memberID=${this.userInfoDetail.memberID}&nickname=${this.userInfoDetail.nickname}`
				// 				});
				// 				break;
				// 			case 99995:
				// 			    this.boxconfigfunc(res.msg, '去认证', '取消', true)
				// 				this.goRz = true
				// 				break;
				// 			case 99994:
				// 			    this.boxconfigfunc(res.msg, '好的', '', true)
				// 				break;
				// 			default:
				// 				this.boxconfigfunc(res.msg, '好的', '', true)
				// 				break;
				// 		}
				// 	})
				// }
				if (!this.id) return this.messageFunc('当前视频源出错了~')
				infoService.getOtherVideo({check_id: this.id}).then(res => {
					switch (res.code){
						case 10000:
							uni.navigateTo({
								url: `/pages/tool/video?url=${res.data}&from=other&type=rz&header_url=${this.userInfoDetail.header_url}&memberID=${this.userInfoDetail.memberID}&nickname=${this.userInfoDetail.nickname}`
							});
							break;
						case 99995:
							this.boxconfigfunc(res.msg, '去认证', '取消', true)
							this.goRz = true
							break;
						case 99994:
							this.boxconfigfunc(res.msg, '好的', '', true)
							break;
						default:
							this.boxconfigfunc(res.msg, '好的', '', true)
							break;
					}
				})
			},
			checkDetail (e) {
				this.goRz = false
				this.goVip = false
				this.isUseKey = 0
				let { key } = utils.getData(e)
				let type = key === 'phone' ? '手机' : '微信'
				let sendType = key === 'phone' ? 1 : 2
				let keys = this.userInfo && this.userInfo.rest_key_num || this.userInfoDetail && this.userInfoDetail.my && this.userInfoDetail.my.rest_key_num || 0
				this.checkType = key
				 // 查看是否允许查看
				if (sendType === 1 && this.userInfoDetail.phone_permit) {
					return this.messageFunc('诶~该用户设置手机不可查看哦~')
				}
				if (sendType === 2 && this.userInfoDetail.phone_permit) {
					return this.messageFunc('诶~该用户设置微信不可查看哦~')
				}
				if (sendType === 1 && this.userInfoDetail && this.userInfoDetail.relationship && this.userInfoDetail.relationship.phone_status === 1) {
					this.isUseKey = 1
					this.checkPhoneOrWechat()
					return
				}
				if (sendType === 2 && this.userInfoDetail && this.userInfoDetail.relationship && this.userInfoDetail.relationship.wechat_status === 1) {
					this.isUseKey = 2
					this.checkPhoneOrWechat()
					return					
				}
				if (this.userInfo.vip_id === 0) {
					this.boxconfigfunc(`查看${type}需要升级会员`, `升级vip`, '取消', true)
					this.goVip = true
				} else if (keys < 5 && this.userInfo.vip_id < 4) {
					this.boxconfigfunc(`查看${type}需要消耗钥匙${this.useKeys} 您当前剩余钥匙${keys} 钥匙不足，需要升级VIP`, `升级vip`, '取消', true)
					this.goVip = true
				} else if (this.userInfo.keys < 5 && this.userInfo.vip_id === 4) {
					this.boxconfigfunc(`钥匙已用完，你已经是最高等级VIP, 无法再升级, 明天再来查看Ta的${type}吧`, `好的`, '', true)
				} else {
					this.boxconfigfunc(`查看${type}需要消耗钥匙${this.useKeys} 您当前剩余钥匙${keys}`, `使用`, '取消', true)
					this.isUseKey = key === 'phone' ? 1 : 2
				}
			},
			goUrl(e) {
				utils.goUrl(e)
			},
			goYue() {
				this.goRz = false
				this.goVip = false
				this.isUseKey = 0
				// 邀约项目
				if (this.userInfoDetail && this.userInfoDetail.relationship && this.userInfoDetail.relationship.relation) return this.createRelation()
				let keys = this.userInfo && this.userInfo.rest_key_num || this.userInfoDetail && this.userInfoDetail.my && this.userInfoDetail.my.rest_key_num || 0
				// if (this.userInfo.isVip === 0 && this.userInfoDetail.) {
				// 	this.boxconfigfunc(`此人当前人气过高，升级VIP才可以邀约TA`, `升级vip`, '取消', true)
				// 	this.goVip = true
				// 	return
				// }
				if (keys >= 1) {
					this.boxconfigfunc(`您当前剩余钥匙${keys}`, `使用`, '取消', true)
					this.isUseKey = 3
				} else if (keys < 1 && this.userInfo.vip_id < 4) {
					this.goVip = true
					this.boxconfigfunc(`钥匙已用完，升级会员`, `升级vip`, '取消', true)
				} else if (keys < 1 && this.userInfo.vip_id === 4) {
					this.boxconfigfunc(`钥匙已用完，你已经是最高 等级VIP,无法再升级 请明天再联系Ta吧~`, `好的`, '取消', true)
				}
			},
			surefunc (e) {
				// 弹框消耗
				// let type = this.checkType === 'phone' ? '手机' : '微信'
				if (this.copyStr.length) {
					this.copyFunc(this.copyStr)
					this.copyStr = ''
					return
				}
				if (this.isUseKey) {
					return this.useKey()
				}
				if (this.goRz) {
					this.goRz = false
					let url = '/pages/tool/videorz'
					if (!this.userInfo.video_url.length) url = '/pages/regist/stepvideo'
					uni.navigateTo({
						url: url
					})
					this.showChoosebox = false
					return
				}
				if (this.goVip) {
					this.goVip = false
					uni.navigateTo({
						url: '/pages/userinfo/vip'
					})
					this.showChoosebox = false
					return
				}
				if (this.userInfo.status === 0) uni.navigateTo({
					url: '/pages/userinfo/index',
					success() {
						this.showChoosebox = false
					}
				})
				this.showChoosebox = false
			},
			cancelfunc() {
				this.boxconfigfunc()
			},
			useKey() {
				// 消耗钥匙
				if (this.isUseKey === 1 || this.isUseKey === 2) {
					this.checkPhoneOrWechat()
				}
				if (this.isUseKey === 3) {
					this.createRelation()
				}
			},
			createRelation() {
				 // 建立关系
				this.goRz = false
				this.goVip = false
				this.isUseKey = 0
				this.showChoosebox = false
				let param = {
					accept_id: this.userInfoDetail.memberID
				}
				infoService.createRelation(param).then(res => {
					if (res.code === 10000) {
                        // 建立聊天消息
                        this.messageFunc(res.msg)
                        this.$store.dispatch('chatListaccount', this.userInfoDetail.yxID)
                        this.$store.dispatch('chatListaccountsession', 'p2p' + this.userInfoDetail.yxID)
                        this.RefreshtheDialogue()
                        let msg = `我报名了你的${this.uinfoDetail[0].content}（项目）`
                        if(res.data.key != 1){
                            msg = ''
                        }
                        let url = `/pages/message/sessiondetails?chattype=${'p2p'}&account=${this.userInfoDetail.yxID}&avatar=${this.userInfoDetail.header_url}&nick=${this.userInfoDetail.nickname}&session=${'p2p' + this.userInfoDetail.yxID}&uid=${this.userInfoDetail.memberID}&msg=${msg}`
                        uni.navigateTo({
                            url: url,
                            success: res => {
                                // uni.$emit('getUserInfo')
								app.$vm.getUserInfo(true).then(res => {
									this.userInfo = res
									// this.init()
								})
                            },
                            fail: () => {},
                            complete: () => {}
                        });
                    } else {
						if (res.code === 99992) {
							this.goVip = true
							this.boxconfigfunc(`此人当前人气过高，升级VIP才可以邀约TA`, `升级vip`, '取消', true)
							// 	return
						} else {
							this.messageFunc(res.msg)
						}
                    }
                })
            },
            /**
             * 刷新当前会话最后20条记录
             */
            RefreshtheDialogue() {
                wx.NIMFUN.getHistoryMsgs({
                    scene: 'p2p',
                    to: this.chatListaccount, // 账号
                    limit: 20, //每页条数
                    asc: true, // 时间到序排序
                    endTime: 0, // 当前页  时间
                    done: (err, obj) => {
                        if (err) {
                            uni.showToast({
                                title: '请检查网络后重试',
                                icon: 'none',
                                duration: 3000
                            })
                            return
                        }
                        // let list = this.thischatList[this.chatListaccountsession]
                        // if (!list || !Array.isArray(list) || list.length <= 0) {
                        //     list = []
                        // }
                        // obj.msgs.map(item => {
                        //     list.push(item)
                        // })
                        console.log('当前用户：', this.chatListaccount, obj.msgs)
                        this.thischatList[this.chatListaccountsession] = obj.msgs
                        this.$store.dispatch('thischatList', this.thischatList)
                    }
                })
            },
			 // 查看手机号或者微信号
			checkPhoneOrWechat() {
				let sendType = this.isUseKey
				this.isCopy = 0
				if (sendType !== 1 && sendType !==2 || !this.id) return this.messageFunc('当前用户信息错误~')
				infoService.checkPhoneOrWechat({check_type: sendType, check_id: this.id}).then(res => {
					if (res.code === 10000) {
						let title = (this.userInfoDetail.nickname || '千年老怪') + '的' + (this.isUseKey === 1 ? '手机号': '微信')
						this.boxconfigfunc(`${res.data}`, `点击一键复制`, '', true, title)
						this.copyStr = res.data || ''
						// 查看成功触发更新
						app.$vm.getUserInfo(true).then(res => {
							this.userInfo = res
							// this.init()
						})
						this.setUserInfoDetail(this.isUseKey === 1 ? 'phone_status': 'wechat_status', 1)
					} else {
						this.boxconfigfunc(res.msg, `好的`, '', true)
						this.isUseKey = 0
					}
				}).catch(err => {
					this.showChoosebox = false
					this.messageFunc('当前用户信息错误~')
				})
			},
			setUserInfoDetail(type, val) {
				this.userInfoDetail.relationship[type] = val
			},
			copyFunc(msg) {
				let that = this
				let title = this.isUseKey === 1 ? '手机号': '微信'
				wx.setClipboardData({
				  data: msg,
				  success (res) {
					  that.messageFunc(`复制${title}成功，赶紧去添加Ta吧`)
				  },
				  complete() {
					  that.showChoosebox = false
				  }
				})
			},
			boxconfigfunc(content = '', oktext = '', cancelText = '', show = false, title='') {
				this.boxconfig.title = title
				this.boxconfig.content = content
				this.boxconfig.btn.ok = oktext
				this.boxconfig.btn.cancel = cancelText
				this.showChoosebox = show
			},
			messageFunc(str, callback, time = 0) {
				wx.showToast({
					title: str || '当前信息处理错误',
					duration: 1000,
					icon: 'none',
					success: function(){
						setTimeout(() => {
							callback && callback()
						}, time)
					}
				})
			},
			sendMsg(e) {
				let { key } = utils.getData(e)
				let notice_type = 1
				if (key === 'wx') notice_type = 2
				// 发送提醒消息
				let param = {
					notice_id: this.userInfoDetail.memberID,
					notice_type: notice_type
				}
				utils.showLoading()
				infoService.sendNotice(param).then(res => {
					utils.hideAll()
					if (res.code === 10000) {
						this.messageFunc(`提醒成功`)
					} else {
						this.messageFunc(res.msg)
					}
				})
			},
			relationShip() {
				// 处理拉黑消息
				let relationship = this.userInfoDetail.relationship && !this.userInfoDetail.relationship.h
				let param = {
					target_id: this.userInfoDetail.memberID,
					relation_type: 1,
					value: Number(relationship)
				}
				infoService.pullgRelatioasdasn(param).then(res => {
					if (res.code === 10000) {
						this.userInfoDetail.relationship.h = !this.userInfoDetail.relationship.h
						let str = '取消拉黑成功'
						if (relationship) str = '拉黑成功'
						this.messageFunc(str)
					} else {
						this.messageFunc(res.msg)
					}
				})
			},
			goDetail(e) {
				let {url, uid} = utils.getData(e)
				if (url) {
					uni.navigateTo({
						url: url + '?uid=' + uid
					})
					this.showchose = false
				}
			},
			goBack() {
				uni.navigateBack({})
			},
			createFormId(e) {
				if (e.detail.formId) app.$vm.sendFormId(e.detail.formId)
			}
		}
	});
</script>

<style>
    page {
        background: #F9F9Fb;
    }

    .uinfo-d-head {
        position: relative;
        width: 690rpx;
        border-radius: 30rpx;
        margin: 30rpx auto 0;
        overflow: hidden;
    }

    .uinfo-d-user {
        margin: 0 auto;
        width: 690rpx;
        height: 284rpx;
        background: white;
        border-radius: 0 0 30rpx 30rpx;
		padding-bottom: 10rpx;
    }

    .uinfo-d-user-msg {
        background: white;
        height: 184rpx;
        border-radius: 0 0 30rpx 30rpx;
        padding-top: 40rpx;
    }

    .uinfo-d-user-rz {
		width: 630rpx;
        height: 80rpx;
		line-height: 48rpx;
		border-radius: 30rpx;
		margin: 0 auto;
        font-size: 34rpx;
		padding: 16rpx 0;
        color: white;
        text-align: center;
    }
	
	.uinfo-d-user-rz-img {
		height: 36rpx;
		width: 38rpx;
		margin-left:20rpx;
	}
	
	.uinfo-d-user-rz-img-02 {
		width: 48rpx;
		height: 36rpx;
	}

	.uinfo-d-user-rz-img-03 {
		width: 30rpx;
		height: 36rpx;
	}
	.uinfo-d-user-rz-img-04 {
		width: 48rpx;
		height: 48rpx;
	}
    .isrz {
        background: #09d6a1;
    }

    .isrzf {
        background: #ffb400;
    }

    .I-d-rz {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 23;
        width: 152rpx;
        height: 60rpx;
        line-height: 60rpx;
        background: #09d6a1;
        border-radius: 0 30rpx 0 30rpx;
        box-shadow: -2rpx -2rpx 0 2rpx rgb(147, 229, 208);
        font-size: 28rpx;
        text-align: center;
        color: white;
    }
	
    .uinfo-d-user-name-box,
    .uinfo-d-user-status-box {
        padding: 0 30rpx;
        font-size: 34rpx;
        font-weight: 500;
        color: #000000;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .uinfo-d-user-constellation {
        margin-left: 30rpx;
    }

    .uinfo-d-user-status-box {
        margin-top: 20rpx;
        font-size: 26rpx;
    }

    .uinfo-d-user-status-dest {
        margin-left: 20rpx;
    }
    .uinfo-d-user-status-destaddr {
		margin-left: 10rpx;
	}
    .uinfo-d-box {
        width: 690rpx;
        border-radius: 30rpx;
        overflow: hidden;
        background: white;
        margin: 40rpx auto 0;
		padding-bottom: 120rpx;
    }

    .uinfo-d-btnbox {
		position:fixed;
        padding: 10rpx 0;
		z-index: 478;
		bottom: 0;
		width: 100%;
		background:  #F9F9Fb;
    }

    .I-d-mark {
        margin: 0 10rpx;
        font-size: 26rpx;
        font-weight: 600;
    }

    .I-d-text {
        font-size: 24rpx;
    }

    .I-d-box {
        flex: 1;
        text-align: right;
        color: #333333;
    }

    .I-d-sm {
        font-size: 16rpx;
        line-height: 16rpx;
    }

    .I-d-bg {
        font-size: 24rpx;
        /* line-height: 40rpx; */
    }

    .uinfo-d-btn {
        width: 540rpx;
		height: 88rpx;
        border-radius: 30rpx;
        background: #f81f5e !important;
        color: white;
    }

    .uinfo-d-btn2 {
        width: 130rpx;
		height: 88rpx;
        border-radius: 44rpx;
        background-color: #f7f7f7 !important;
        color: #f81f5e;
		margin-left:20rpx;
		padding: 0 20rpx !important;
    }
	.ui-pop {
		position: relative;
		z-index: 9999;
	}
    .lg {
        padding: 0 40rpx;
        font-size: 32rpx;
        height: 88rpx;
    }
	.I-d-msgIcon-img {
		width: 30rpx;
		height: 30rpx;
		border-radius: 30rpx;
		margin-left: 20rpx;
	}
	.uinfo-d-box2  {
		position:fixed;
		top:0;
		right:0;
		left:0;
		bottom:0;
		background: rgba(0,0,0,.2);
		z-index: 998;
	}
	.uinfo-d-box2-detail {
		width: 540rpx;
		height:265rpx;
		border-radius: 30rpx;
		background: white;
	}
	.uinfo-d-content {
		padding:22rpx;
		text-align: center;
		font-size:32rpx;
		line-height:44rpx;
		border-bottom: 1rpx solid rgba(238,238,238,1);
	}
	.uinfo-d-btn-02 {
		width:200rpx;
		height:88rpx;
		line-height:88rpx;
		margin:40rpx auto;
		background: #6267F9;
		border-radius:30rpx;
		font-size: 32rpx;
		color:white;
		text-align:center;
	}
	.uinfo-check-btn {
		font-size: 24rpx;
		line-height: 34rpx;
		border-radius:32rpx;
		height: 60rpx;
		min-width: 138rpx;
		border-radius: 30rpx;
		padding: 13rpx 20rpx;
		background: #f7f7f7 !important;
		color: #f81f5e;
	}
</style>