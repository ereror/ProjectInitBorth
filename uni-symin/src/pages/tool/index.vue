<template>
	<block>
	<custombar name="uni-app" :barconfig="barconfig"></custombar>
	<toast v-if='showtoast'></toast>
	<!-- <dialogbox @surefunc='surefunc'></dialogbox> -->
	<view class="content">
		<!-- <import src="../../wxcomponents/template/goods/goods.wxml" /> -->
        <image class="logo" src="../../static/logo.png" @click='checkmore'></image>
		<text class='iconfont icon-smile'></text>
		<view>
            <text class="title c-tred">{{title}}</text>
			<!-- <template is='goods'></template> -->
			<button class='lg' open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" style='height:100rpx;'></button>
        </view>
		<!-- <mask v-if='showmask'></mask> -->
	</view>
	<choose></choose>
	<view style='margin-top:10rpx;'>
		<choose :choArr='sexArr' :choCount='sex' @setValue='sexfunc' choStyle='margin-bottom: 20rpx;'></choose>
	</view>
	<view style='font-size: 40rpx;margin-bottom: 20rpx;'>{{sval[0]}} ~ {{sval[1]}}</view>
	<slide :width="width" :value="sval" min="18" max="100" @change='getsliderVal' :thumb-style='thumbStyle' active-color='#f81f5e' slider-weight='2'></slide>
	<itemh @setValue='itemHfunc' :itemData='itemData'></itemh>
	<uswiper :items='items' :swiperConfig='swiperConf'></uswiper>
	<ubutton></ubutton>
	<iptitem></iptitem>
    <tbar :isActiveIndex='0' :tbarconfig='tbarconfig'></tbar>
	</block>
</template>

<script>
    import Vue from 'vue';
	import mask from '../../components/mask.vue'
	import utils from '../../static/utils/index.js'
	import commonService from '../../api/common/common'
    import {
        mapGetters
    } from 'vuex'
	let app = getApp()
	export default Vue.extend({
		components: {
			mask
		},
		data() {
			return {
				title: 'Hello',
				STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
				DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
				barconfig: {
					CustomBar: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT, 
					StatusBar: wx.STATUS_BAR_HEIGHT,
					title: '甜不辣',
					isArrow: 1,
					bgset: 'bg-gradual-transparent',
					tset: 'bg-gradual-rblack'
				},
				showmask: true,
				showtoast: false,
				sex: 1,
				width: 750,
				sval: [18, 70],
				thumbStyle: {
					background: '#f81f5e',
					border: '2px solid white',
					'box-shadow': '0 0 4px #f81f5e'
				},
				sexArr: [
					{
						text: '男生',
						isbgcolor: 'cho-dct'
					},
					{
						text: '女生',
						isbgcolor: 'cho-dct'
					},
					{
						text: '不限',
						isbgcolor: 'cho-dct'
					}
				],
				swiperConf: {
					interval: 5000,
					duration: 500,
					autoplay: true,
					circular: true
				},
				choStyle: 'margin-bottom: 40rpx;',
				items: [{
					src: 'https://sns-cdn.myxianxiaobao.com/sfximao/test1.jpg'
				},{
					src: 'https://sns-cdn.myxianxiaobao.com/sfximao/test2.jpg'
				},{
					src: 'https://sns-cdn.myxianxiaobao.com/sfximao/test3.jpg'
				}],
				itemData: [
					{
						id: '1',
						icon: '',
						text: '吃饭',
						isChoose: false
					},
					{
						id: '2',
						icon: '',
						text: '看电影',
						isChoose: false
					},
					{
						id: '3',
						icon: '',
						text: '唱歌',
						isChoose: false
					},
					{
						id: '4',
						icon: '',
						text: '婚恋',
						isChoose: true
					},
					{
						id: '5',
						icon: '',
						text: '吃饭',
						isChoose: false
					},
					{
						id: '6',
						icon: '',
						text: '看电影',
						isChoose: false
					},
					{
						id: '7',
						icon: '',
						text: '婚恋',
						isChoose: false
					}
				]
			}
		},
        computed: {
            ...mapGetters({
                tbarconfig: 'tbarconfig'
            })
        },
		onLoad() {
			// console.log('dongmei')
			// console.log('%o', this.barconfig)
		},
		methods: {
			itemHfunc (obj) {
				this.itemData = obj.detail
				console.log('%o', this.itemData)
			},
			// 获取slider值
			getsliderVal(obj) {
				this.sval = obj.detail.value
			},
			sexfunc (obj) {
				// 改变值
				let index = obj.detail.val
				this.sex = index
				console.log(index)
			},
			surefunc () {
				console.log('123')
			},
			getPhoneNumber (e) {
				console.log(e.detail.errMsg)
				// console.log(e.detail.iv)
				// console.log(e.detail.encryptedData)
				let {code, openid} = app.globalData
				let param = {
					code: code,
					openid: openid,
					encryptedData: e.detail.encryptedData,
					iv: e.detail.iv
				}
				commonService.uerRegist(param).then(res => {
					let data = res.data
					if (data.code === 1000) {
						let {token, uid} = data
						app.globalData.token = token
						app.globalData.uid = uid
						localstorage.setItem('token', token)
					}
				})
			},
			checkmore() {
				utils.showtoast(this, 'showtoast', 500)
			},
			indextest(){
				console.log('这里师父组件')
			},
			onBackPress() {
				if (this.showmask) {
					this.showmask = false;
					return true;
				} else {
					uni.showModal({
						title: '提示',
						content: '是否退出uni-app？',
						success: function(res) {
							if (res.confirm) {
								// 退出当前应用，改方法只在App中生效
								plus.runtime.quit();
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
					return true;
				}
			}
		}
	});
</script>

<style>
	/* @import url("../../wxcomponents/template/goods/goods.wxss"); */
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.c-tgreen {color: red;}
</style>
