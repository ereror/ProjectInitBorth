<template>
    <block>
        <custombar name="uni-app" :barconfig="barconfig"></custombar>
        <view class="messagepage">
            <!-- {{chatList}} -->
            <!-- <view style="width:100%;height:1000px;background-color:green;"></view> -->
            <view v-for="(useritem,index) in chatList" :key="index">
                <view class="sessionlist" @click="godetailsme(useritem)">
                    <view class="sessionlist_header">
                        <view class="sessionlist_icon">
                            <image :src="(chatListuserdata[useritem.account]&&chatListuserdata[useritem.account].header_url)||Iitemimg"></image>
                            <!-- '/static/images/iconH.jpg' -->
                        </view>
                        <view class="sessionlist_number" v-if="unreadInfo[useritem.session]&&unreadInfo[useritem.session]>0">
                            <view>
                                {{unreadInfo[useritem.session]>9?'9+':unreadInfo[useritem.session]}}
                            </view>
                        </view>
                    </view>
                    <view class="sessionlist_text">
                        <view class="sessionlist_text_name">
                            <view class="sessionlist_text_name1">{{(chatListuserdata[useritem.account]&&chatListuserdata[useritem.account].nickname)||''}}</view>
                            <view class="sessionlist_text_name2">{{useritem.displayTime}}</view>
                        </view>
                        <view class="sessionlist_text_content" :class="unreadInfo[useritem.session]>0?'sessionlist_text_content_new':''">
                            {{useritem.lastestMsg}}
                            <!-- <chatlisttextnode :lastestMsg="useritem.lastestMsg"></chatlisttextnode> -->
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <tbar :isActiveIndex='1' :tbarconfig='tbarconfig'></tbar>
    </block>
</template>

<script>
    import infoService from '../../api/info/info'
    import {
        mapGetters
    } from 'vuex'
    import Vue from 'vue';
    export default Vue.extend({
        data() {
            return {
                title: 'Hello',
                STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
                DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
                barconfig: {
                    CustomBar: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT,
                    StatusBar: wx.STATUS_BAR_HEIGHT,
                    title: '消息',
                    bgset: 'bg-gradual-dred',
                    tset: 'bg-gradual-tred'
                },
                nim: null,
                Iitemimg: '',
                // https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_boy.png
                Iitemimgw: 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_girl.png',
            }
        },
        computed: {
            ...mapGetters({
                // nim: 'nim',
                userInfo: 'userInfo', //当前登陆用户信息
                chatList: 'chatList', // 会话列表
                thischatList: 'thischatList', //聊天记录
                chatListaccount: 'chatListaccount', // 当前对话用户账号
                chatListaccountsession: 'chatListaccountsession', //当前对话会话id
                unreadInfo: 'unreadInfo', // 每条消息未读消息数量
                tbarconfig: 'tbarconfig',
                chatListuserdata: 'chatListuserdata'
            })
        },
        watch: {
            chatList(e) {
                this.uodateuser()
            }
        },
        onLoad() {
            this.uodateuser()
            // wx.NIMFUN.getRelations({
            //     done: res => {
            //         console.log('拉黑列表', res)
            //     }
            // })
        },
        onShow() {
            // 切换页面重置当前会话对象基本信息
            this.$store.dispatch('chatListaccount', '')
            this.$store.dispatch('chatListaccountsession', '')
        },
        methods: {
            /**
             * 设置当前会话对象信息
             */
            godetailsme(userobj) {
                this.$store.dispatch('chatListaccount', userobj.account)
                this.$store.dispatch('chatListaccountsession', userobj.session)
                // 重置当前会话未读数  当前会话id    session
                wx.NIMFUN.resetSessionUnread(userobj.session)
                // 跳转会话详情
                // userobj.chattype
                wx.navigateTo({
                    url: `/pages/message/sessiondetails?chattype=${'p2p'}&account=${userobj.account}&avatar=${(this.chatListuserdata[userobj.account]&&this.chatListuserdata[userobj.account].header_url)||''}&nick=${(this.chatListuserdata[userobj.account]&&this.chatListuserdata[userobj.account].nickname)||''}&session=${userobj.session}&uid=${(this.chatListuserdata[userobj.account]&&this.chatListuserdata[userobj.account].id)||'-1'}&msg=${''}`
                })
            },
            /**
             * 更新会话列表用户信息
             */
            uodateuser() {
                // console.log('会话列表更新~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
                let youidlist = []
                let arrold = this.chatList
                for (let i = 0, len = arrold.length; i < len; i++) {
                    youidlist.push(arrold[i].account)
                }
                infoService.yxuserdata({
                    yx_id_list: JSON.stringify(youidlist)
                }).then(res => {
                    if (res.code == 10000) {
                        // this.chatListuserdata
                        let list = res.data.other || []
                        for (let i = 0, len = list.length; i < len; i++) {
                            this.$set(this.chatListuserdata, list[i].yxID, list[i])
                            // this.chatListuserdata[list[i].yxID] = list[i]
                        }
                    }
                    /**
                        更新客服和系统通知的信息
                     */
                    this.$set(this.chatListuserdata, 'notice', {
                        id: '-1',
                        header_url: '/static/images/systemicon.png',
                        nickname: '系统通知',
                        yxID: 'notice'
                    })
                    this.$set(this.chatListuserdata, 'service', {
                        id: '-2',
                        header_url: '/static/images/serveicon.png',
                        nickname: '客服',
                        yxID: 'service'
                    })
                    this.$store.dispatch('chatListuserdata', this.chatListuserdata)
                })
            }
        }
    });
</script>

<style>
    .messagepage {
        width: 100%;
        padding-bottom: 100rpx;
        overflow: hidden;
    }

    /* 会话列表 */
    .sessionlist {
        width: 690rpx;
        height: 188rpx;
        margin: 0 auto;
        padding-top: 40rpx;
        /* background-color: #ccc; */
        display: flex;
        justify-content: space-between;
    }

    .sessionlist_header {
        width: 120rpx;
        height: 120rpx;
        /* background-color: yellow; */
        position: relative;
    }

    .sessionlist_icon {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        overflow: hidden;
        background-color: #f2f2f2;
    }

    .sessionlist_icon>image {
        width: 120rpx;
        height: 120rpx;
    }

    .sessionlist_number {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 38rpx;
        height: 38rpx;
        background-color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sessionlist_number>view {
        width: 36rpx;
        height: 36rpx;
        border-radius: 50%;
        background-color: #6267F9;
        font-size: 24rpx;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sessionlist_text {
        margin-right: 4rpx;
        width: 526rpx;
        height: 146rpx;
        /* background-color: rgb(221, 207, 207); */
        border-bottom: 2rpx solid #EFEFEF;
    }

    .sessionlist_text_name {
        padding-top: 12rpx;
        padding-bottom: 10rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .sessionlist_text_name>view,
    .sessionlist_text_content {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-wrap: normal;
    }

    .sessionlist_text_name1 {
        width: 260rpx;
        font-size: 34rpx;
        color: #000000;
        font-weight: bold;
    }

    .sessionlist_text_name2 {
        width: 266rpx;
        color: #999999;
        font-size: 30rpx;
        text-align: right;
    }

    .sessionlist_text_content {
        font-size: 30rpx;
        font-weight: 400;
        color: #666666;
        line-height: 44rpx;
    }

    .sessionlist_text_content_new {
        color: rgba(248, 31, 94, 1);
    }
</style>