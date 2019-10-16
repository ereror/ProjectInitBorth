import {
    calcTimeHeader
} from '../../../static/utils/message/index.js'
import utils from '../../../static/utils/index.js'
Component({
    properties: {
        chatmesage: {
            type: Array,
            value: [],
            observer(newVal, oldVal, changePath) {
                // console.log('聊天记录更新', newVal)
                this.setData({
                    chatmesagenode: this.convertRawMessageListToRenderMessageArr(newVal)
                })
                // 如果系统软键盘关闭更新聊天最后一次距离
                // if (!this.data.Softkeyboard) {
                this.Initializechatlocation()
                // }
                // this.setData({
                //     messagenode: generateRichTextNode(newVal.text)
                // })
            }
        },
        barconfig: {
            type: Object,
            value: {},
            observer(newVal) {
                // console.log('顶部导航更新', newVal)
                this.Initializechatlocation()
            }
        },
        youchat: {
            type: Object,
            value: {
                msg: 'demo'
            },
            observer(newVal) {
                console.log('聊天对象信息更新', newVal)
                this.setData({
                    youchat: newVal,
                    declaration: (newVal.account == "service" || newVal.account == "notice") ? false : true,
                    declarationsendto: newVal
                })
                this.send(newVal.msg)
            }
        },
        userInfo: {
            type: Object,
            value: {}
        },
        // 当前用户是否把对方拉黑
        blacklist: {
            type: Boolean,
            value: false
        },
        // 当前用户是否被对方加黑
        blacklistbs: {
            type: Boolean,
            value: false,
            observer(newVal) {
                if (newVal) {
                    this.boxconfigfunc('你已被对方拉黑无法再访问Ta', '返回', '', true)
                    this.setData({
                        Chooseboxtypes: 0
                    })
                }
            }
        }
    },
    option: {},
    data: {
        // UI界面相关
        STATUS_BAR_HEIGHT: wx.STATUS_BAR_HEIGHT,
        DEFAULT_HEADER_HEIGHT: wx.DEFAULT_HEADER_HEIGHT,
        // scroll-view相关
        toViewif: true,
        toView: 'msg',
        toviewheight: '0px',
        toHeight: '100vh',
        inputBottom: '0px',
        backgroundsiez: '100% ' + wx.WIN_HEIGHT + 'px',
        // 顶部导航
        itransform: false,
        reportposhow: false,
        // 聊天输入
        sendmsg: '',
        emojishow: false,
        emojitypeindex: 0,
        emojilist: wx.EmojiObj.emojilist, //存储每一类别的key
        emojidelete: {
            imageurl: wx.EmojiObj.iconEmojiDelete,
            text: '[删除]'
        },
        Softkeyboard: false, // 软键盘是否打开
        chatmesagenode: [],
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
        items: [],
        showChoosebox: false,
        Chooseboxtypes: 0,
        focusinput: true,
        lineheightinput: 0,
        focusinputstate: false,
        declaration: false,
        declarationsendto: {
            os: 'demo'
        }
    },
    methods: {
        clearIntervalfun(){
            this.selectComponent('#declarationID').clearIntervalfun()
        },
        declarationsendmsg(e) {
            this.send(e.detail)
        },
        // 按钮弹窗确定点击
        surefunc() {
            // 当前被加黑点击退出
            if (this.data.Chooseboxtypes == 0) {
                wx.navigateBack({
                    delta: 1
                });
                return
            }
            // 当前点击解黑
            if (this.data.Chooseboxtypes == 1) {
                this.pullgoos(res => {
                    this.boxconfigfunc()
                })
                return
            }
        },
        // 关闭按钮弹窗
        cancelfunc() {
            this.boxconfigfunc()
        },
        boxconfigfunc(content = '', oktext = '', cancelText = '', show = false, title = '') {
            this.data.boxconfig.title = title
            this.data.boxconfig.content = content
            this.data.boxconfig.btn.ok = oktext
            this.data.boxconfig.btn.cancel = cancelText
            this.setData({
                boxconfig: this.data.boxconfig,
                showChoosebox: show
            })
        },
        /**
         * 跳转举报页
         */
        goDetail(e) {
            this.setData({
                itransform: false,
                reportposhow: false,
                emojishow: false,
            })
            let {
                url,
                uid
            } = utils.getData(e)
            if (url) {
                wx.navigateTo({
                    url: url + '?uid=' + uid
                })
            }
        },
        /**
         * 用户拉黑取消拉黑 加入静音解除静音
         */
        pullgoos(sendfun) {
            this.setData({
                itransform: false,
                reportposhow: false,
                emojishow: false,
            })
            let relation_type = 1; // 类型 1:拉黑 2:静音
            let value = this.data.blacklist ? 0 : 1; // 0 取消 1加入
            let account = this.data.youchat.account
            this.triggerEvent('pullgRelation', {
                data: {
                    target_id: parseInt(this.data.youchat.uid),
                    relation_type,
                    value,
                },
                dons: res => {
                    if (res == 10000) {
                        if (value == 1) { // 加入
                            wx.NIMFUN[relation_type == 1 ? 'addToBlacklist' : 'addToMutelist']({
                                account,
                                done: (error, obj) => {
                                    // console.log(error, obj)
                                    if (!error) {
                                        this.setData({
                                            blacklist: true
                                        })
                                        wx.USER.blacklist[account] = {}
                                        if (sendfun && typeof sendfun == 'function') {
                                            sendfun()
                                            return
                                        }
                                        wx.showToast({
                                            title: '操作成功',
                                            icon: 'none',
                                            duration: 3000
                                        })
                                    } else {
                                        wx.showToast({
                                            title: '操作失败',
                                            icon: 'none',
                                            duration: 3000
                                        })
                                    }
                                }
                            });
                        } else { // 取消
                            wx.NIMFUN[relation_type == 1 ? 'removeFromBlacklist' : 'removeFromMutelist']({
                                account,
                                done: (error, obj) => {
                                    // console.log(error, obj)
                                    if (!error) {
                                        delete(wx.USER.blacklist[account])
                                        this.setData({
                                            blacklist: false
                                        })
                                        if (sendfun && typeof sendfun == 'function') {
                                            sendfun()
                                            return
                                        }
                                        wx.showToast({
                                            title: '操作成功',
                                            icon: 'none',
                                            duration: 3000
                                        })
                                    } else {
                                        wx.showToast({
                                            title: '操作失败',
                                            icon: 'none',
                                            duration: 3000
                                        })
                                    }
                                }
                            });
                        }
                    } else {
                        wx.showToast({
                            title: '操作失败',
                            icon: 'none',
                            duration: 3000
                        })
                    }
                }
            })
        },
        // 初始化最后一次聊天位置toViewif==true执行   先计算高度出现异常再用toView
        Initializechatlocation() {
            // this.setData({
            //     toviewheight: 9999999999999999999999999999999999999999999999999
            // })
            // setTimeout(() => {
            //     this.setData({
            //         toviewheight: 9999999999999999999999999999999999999999999999999
            //     })
            // }, 100);
            // setTimeout(res => {
            //     // if (this.data.toViewif) {
            this.setData({
                toView: 'msg-' + (this.data.chatmesage.length - 1)
            })
            //     var query = wx.createSelectorQuery();
            //     query.select('#page').boundingClientRect(rect => {
            //         if (rect && rect.height && rect.height > 0) {
            //             this.setData({
            //                 toviewheight: rect.height + 999 + 'px'
            //             })
            //         }
            //     }).exec();
            //     // } else {
            //     //     console.log('当前page已被用户手动滑动未在底部不自动滑动到底部')
            //     // }
            // }, 0)
        },
        // 滚动到顶部,获取历史记录
        scrollbindscrolltoupper(e) {
            // console.log('滚动到顶部,获取历史记录')
            this.setData({
                toViewif: false
            })
        },
        // 滚动触发  不可以自动滚动
        scrollbindscroll(e) {
            this.setData({
                toViewif: false
            })
        },
        // 滚动到底部,可以自动滚动
        scrollbindscrolltolower(e) {
            // console.log('滚动到底部,可以自动滚动')
            this.setData({
                toViewif: true
            })
        },
        // 顶部导航是否举报状态修改
        itransformtap() {
            // 在和客服以及系统通知禁止该操作
            if (this.data.youchat.account == 'service' || this.data.youchat.account == 'notice') {
                return
            }
            this.setData({
                itransform: !this.data.itransform
            })
        },
        // 举报和拉黑弹窗开关
        report() {
            this.setData({
                reportposhow: !this.data.reportposhow,
                itransform: false
            })
        },
        // 点击输入框
        focusinput() {
            this.setData({
                focusinputstate: true
            })
        },
        // 监听系统键盘打开
        focustextarea(e) {
            console.log('监听系统键盘打开')
            this.setData({
                toHeight: wx.WIN_HEIGHT - e.detail.height + 'px',
                inputBottom: e.detail.height + 'px',
                emojishow: false,
                Softkeyboard: true,
                focusinput: true
            })
            // 更新最后一次聊天位置
            this.Initializechatlocation()
        },
        // 监听系统键盘关闭
        blurtextarea() {
            console.log('监听系统键盘关闭')
            this.setData({
                toHeight: '100vh',
                inputBottom: '0px',
                Softkeyboard: false,
                focusinput: false
            })
        },
        // 输入框行数变化
        bindlinechangefun(e) {
            console.log('输入框行数变化')
            this.setData({
                lineheightinput: e.detail.lineCount
            })
        },
        // 键盘高度触发
        bindkeyboardheightchange(e) {
            console.log('键盘高度触发', e)
            // if (this.data.inputBottom == e.detail.height) {
            //     return
            // }
            if (e.detail.height > 0) {
                this.setData({
                    toHeight: wx.WIN_HEIGHT - e.detail.height + 'px',
                    inputBottom: e.detail.height + 'px',
                    emojishow: false,
                    Softkeyboard: true,
                    focusinput: true
                })
            } else {
                this.setData({
                    toHeight: '100vh',
                    inputBottom: '0px',
                    Softkeyboard: false,
                    focusinput: false
                })
            }
        },
        // 输入框失焦
        bindblurinpuye() {
            console.log('输入框失焦')
            this.setData({
                toHeight: '100vh',
                inputBottom: '0px',
                Softkeyboard: false,
                focusinput: false,
                focusinputstate: false
            })
        },
        // 开关表情选择框
        emojishowis() {
            this.setData({
                emojishow: !this.data.emojishow
            })
        },
        // 选择某一个表情
        addinputemoji(e) {
            let emoji = e.currentTarget.dataset.emoji
            if (emoji == '[删除]') {
                // 删除
                let lastIndex = this.data.sendmsg.lastIndexOf('[')
                if (lastIndex != -1) {
                    this.setData({
                        sendmsg: this.data.sendmsg.slice(0, lastIndex)
                    })
                }
            } else {
                // 输入框续加
                this.setData({
                    sendmsg: this.data.sendmsg + emoji
                })
            }
        },
        // 表情类型切换
        emojitypeclick(e) {
            this.setData({
                emojitypeindex: e.currentTarget.dataset.index
            })
        },
        // 消息输入存储
        sendmsgs(e) {
            this.setData({
                sendmsg: e.detail.value
            })
        },
        // 发送消息
        send(text) {
            let msg = ''
            if (text && typeof text == 'string' && text != '') {
                msg = text
            } else {
                msg = this.data.sendmsg
            }
            if (msg != '') {
                let chattype = this.data.youchat.chattype,
                    to = this.data.youchat.account;
                // 判断对方是否把当前用户加黑
                if (this.data.blacklistbs) {
                    this.boxconfigfunc('你已被对方拉黑无法再访问Ta', '返回', '', true)
                    this.setData({
                        Chooseboxtypes: 0
                    })
                    return
                }
                if (this.data.blacklist) {
                    // this.boxconfigfunc('你已将对方拉黑，无法发送消息', '解黑', '取消', true)
                    this.setData({
                        Chooseboxtypes: 1
                    })
                    // 当前把对方加黑，先解除，再发送消息
                    this.pullgoos(res => {
                        this.sendser(msg, chattype, to)
                    })
                    return
                } else {
                    this.sendser(msg, chattype, to)
                    return
                }
            }
        },
        // 发送消息服务器
        sendser(msg, chattype, to) {
            this.setData({
                toHeight: '100vh',
                inputBottom: '0px',
                sendmsg: "",
                emojishow: false,
                itransform: false,
                reportposhow: false,
                Softkeyboard: false,
                showChoosebox: false,
                focusinput: false
            })
            this.triggerEvent('sendmeg', {
                text: msg,
                scene: chattype,
                to: to,
                dons: (err, msg) => {
                    if (this.handleErrorAfterSend(err)) {
                        return
                    }
                    this.setData({
                        sendmsg: "",
                        emojishow: false,
                        itransform: false,
                        reportposhow: false,
                        Softkeyboard: false,
                        showChoosebox: false
                    })
                    this.Initializechatlocation()
                }
            })
        },
        /**
         * 统一发送消息后打回的错误信息
         * 返回true表示有错误，false表示没错误
         */
        handleErrorAfterSend(err) {
            console.log(err)
            if (err && err.status != 'success') {
                if (err.code == 7101) {
                    console('你已被对方拉黑')
                    // wx.showToast({
                    //     title: '你已被对方拉黑',
                    //     icon: 'none',
                    //     duration: 3000
                    // })
                    this.boxconfigfunc('你已被对方拉黑无法再访问Ta', '返回', '', true)
                    this.setData({
                        Chooseboxtypes: 0
                    })
                    return true
                }
                wx.showToast({
                    title: '未知错误',
                    icon: 'none',
                    duration: 3000
                })
                return true
            }
            return false
        },
        /**
         * 保存数据到store
         */
        saveChatMessageListToStore(rawMsg) {
            store.dispatch({
                type: 'RawMessageList_Add_Msg',
                payload: {
                    msg: rawMsg
                }
            })
        },
        /**
         * 原始消息列表转化为适用于渲染的消息列表
         * {unixtime1: {flow,from,fromNick,idServer,scene,sessionId,text,target,to,time...}, unixtime2: {}}
         * =>
         * [{text, time, sendOrReceive: 'send', displayTimeHeader, nodes: []},{type: 'geo',geo: {lat,lng,title}}]
         */
        convertRawMessageListToRenderMessageArr(rawMsgList) {
            // console.log(rawMsgList)
            let messageArr = []
            for (let i = 0; i < rawMsgList.length; i++) {
                if (rawMsgList[i].type == 'text') { // 这里只需要纯文本
                    messageArr.push({
                        scene: rawMsgList[i].scene, // 聊天类型
                        from: rawMsgList[i].from, // 发送方
                        to: rawMsgList[i].to, // 接收方
                        text: rawMsgList[i].text, // 内容
                        time: rawMsgList[i].time, // 时间戳
                        displayTimeHeader: this.judgeOverTwoMinute(rawMsgList[i].time, messageArr)
                    })
                }
            }
            return messageArr
        },
        /**
         * 距离上一条消息是否超过两分钟
         */
        judgeOverTwoMinute(time, messageArr) {
            let displayTimeHeader = ''
            let lastMessage = messageArr[messageArr.length - 1]
            if (lastMessage) { //拥有上一条消息
                let delta = time - lastMessage.time
                if (delta > 2 * 60 * 1000) { //两分钟以上
                    displayTimeHeader = calcTimeHeader(time)
                }
            } else { //没有上一条消息
                displayTimeHeader = calcTimeHeader(time)
            }
            return displayTimeHeader
        },
    },
    attached: function() {
        // console.log('组件载入')
        // 更新聊天记录最后一次记录
        this.Initializechatlocation()
        // console.log('%o', this.data.barconfig)
    },
    ready: function() {
        // console.log('%o', this.data.barconfig)
    }
})