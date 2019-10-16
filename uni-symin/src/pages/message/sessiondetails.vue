<template>
    <block>
        <view>
            <sessiondetails :chatmesage="thischatList[chatListaccountsession]" :barconfig="barconfig" :blacklist="blacklistos()" :blacklistbs="blacklistbs" :youchat="youchat" :userInfo="userInfo" @sendmeg="sendmeg" @pullgRelation="pullgRelation" ref="sessiondetails"  ></sessiondetails>
            <!-- thischatList[chatListaccountsession] -->
        </view>
    </block>
</template>

<script>
    import {
        mapGetters
    } from 'vuex'
    import Vue from 'vue';
    import infoService from '@/api/info/info'
    export default Vue.extend({
        data() {
            return {
                barconfig: {
                    CustomBar: wx.STATUS_BAR_HEIGHT + wx.DEFAULT_HEADER_HEIGHT,
                    StatusBar: wx.STATUS_BAR_HEIGHT,
                    title: '比伯Jane',
                    bgset: 'bg-gradual-dred',
                    tset: 'bg-gradual-tred',
                    hiddenTitle: 1
                },
                youchat: {
                    chattype: 'p2p',
                    account: 'haoyou',
                    avatar: '/static//images/iconH.jpg',
                    uid: '-1',
                    msg: ''
                },
                blacklistbs: false, // 对方是否把当前用户加黑
                /**
                 * bh: 0 他黑了我
                 * h: 1 我黑了他
                 * relation: 1 是否有关系
                 */
            }
        },
        computed: {
            ...mapGetters({
                nim: 'nim',
                userInfo: 'userInfo', //当前登陆用户信息
                chatList: 'chatList', // 会话列表
                thischatList: 'thischatList', //聊天记录
                chatListaccount: 'chatListaccount', // 当前对话用户账号
                chatListaccountsession: 'chatListaccountsession', //当前对话会话id
            })
        },
        onUnload(){
            this.$refs.sessiondetails.clearIntervalfun()
        },
        onLoad(options) {
            console.log(options)
            /**
             * 初始化 聊天对象资料  账号 头像 聊天类型
             */
            this.barconfig.title = options.nick || '未知昵称'
            this.youchat = {
                chattype: options.chattype || 'p2p',
                account: options.account || 'haoyou',
                avatar: options.avatar || '',
                uid: options.uid || '-1',
                msg: options.msg || ''
            }
            // 获取当前会话的最后20条消息更新至状态机
            let account = this.youchat.account
            this.RefreshtheDialogue(account)
            if (this.youchat.uid && parseInt(this.youchat.uid) >= 0) {
                infoService.getOtherUser({
                    member_id: this.youchat.uid
                }).then(res => {
                    if (res.code === 10000) {
                        this.blacklistbs = res.data.relationship.bh != 0
                    }
                })
            }
            if (this.youchat.account == 'notice' || this.youchat.account == 'service') {
                if (this.youchat.account == 'notice') {
                    this.youchat.avatar = '/static/images/systemicon.png'
                    this.barconfig.title = '系统通知'
                } else {
                    this.youchat.avatar = '/static/images/serveicon.png'
                    this.barconfig.title = '客服'
                }
                return
            }
            // 更新对面用户数据信息
            infoService.yxuserdata({
                yx_id_list: JSON.stringify([this.youchat.account])
            }).then(res => {
                if (res.code == 10000) {
                    console.log('用户详情')
                    let userdata = {}
                    for (let i = 0, len = res.data.other.length; i < len; i++) {
                        userdata[res.data.other[i].yxID] = res.data.other[i]
                    }
                    this.youchat.avatar = userdata[this.youchat.account].header_url
                    this.barconfig.title = userdata[this.youchat.account].nickname
                }
            })
        },
        methods: {
            RefreshtheDialogue(account) {
                wx.NIMFUN.getHistoryMsgs({
                    scene: 'p2p',
                    to: account, // 账号
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
                        console.log('当前用户：', account, obj.msgs)
                        this.thischatList[`p2p-${account}`] = obj.msgs
                        console.log(this.thischatList[`p2p-${account}`])
                        this.$store.dispatch('chatListaccountsession', `p2p-${account}`)
                        this.$store.dispatch('thischatList', this.thischatList)
                    }
                })
            },
            /**
             * 判断对方用户是否被加黑
             */
            blacklistos() {
                if (wx.USER.blacklist[this.youchat.account]) {
                    return true
                }
                return false
            },
            pullgRelation(e) {
                infoService.pullgRelatioasdasn(e.detail.data).then(res => {
                    e.detail.dons(res.code)
                })
            },
            sendmeg(data) {
                // 发送消息
                const _this = this
                wx.NIMFUN.sendText({
                    scene: data.detail.scene, // 对单个用户发起聊天
                    to: data.detail.to,
                    text: data.detail.text,
                    done: (err, msg) => {
                        let list = this.thischatList[this.chatListaccountsession]
                        if (!list || !Array.isArray(list) || list.length <= 0) {
                            list = []
                        }
                        list.push(msg)
                        this.thischatList[this.chatListaccountsession] = list
                        this.$store.dispatch('thischatList', this.thischatList)
                        data.detail.dons((err, msg))
                    }
                })
            }
        }
    });
</script>

<style>
</style>