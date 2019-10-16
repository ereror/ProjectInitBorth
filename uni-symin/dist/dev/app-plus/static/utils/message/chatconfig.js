import {
    convertRawMessageListToRenderChatList,
    calcTimeHeader
} from './index'
let data = {};
let nim;
let self = {};
let instantmessaging = wx.instantmessaging;
let userinfoonloginportschange = []
/**
 * 全局this指向
 * @param {Object} _this 
 */
export default {
    socket: function(_this, token, account) {
        self = _this
        // console.log = function (){}
        nim = wx.NIM.getInstance({
            // debug: true,
            appKey: instantmessaging[instantmessaging.thishe].appkey,
            account: account,
            token: token,
            transports: ['websocket'],
            onloginportschange: res => {
                console.log('其他端登陆', res)
                // userinfoonloginportschange = res
                // if (nim) {
                //     userinfoonloginportschangefun()
                // }
            },
            onconnect: res => {
                console.log('连接成功', res)
            },
            onerror: error => {
                console.log('发生错误的回调, 会传入错误对象', error)
                if (nim.disconnect && nim.connect) {
                    nim.disconnect()
                    nim.connect()
                }
            },
            onofflinesysmsgs: msg => {
                console.log('系统通知', msg)
            },
            ondisconnect: error => {
                console.log('你断开了连接', error)
                // 此时说明 `SDK` 处于断开状态, 开发者此时应该根据错误码提示相应的错误信息, 并且跳转到登录页面
                console.log('连接断开', error);
                if (error) {
                    switch (error.code) {
                        // 账号或者密码错误, 请跳转到登录页面并提示错误
                        case 302:
                            console.log('账号或者密码错误')
                            wx.showModal({
                                title: '提示',
                                content: '账号或者密码错误，请重新登陆',
                                showCancel: false,
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                        wx.reLaunch({
                                            url: '/pages/index/index'
                                        })
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                        wx.reLaunch({
                                            url: '/pages/index/index'
                                        })
                                    }
                                }
                            })
                            break;
                            // 重复登录, 已经在其它端登录了, 请跳转到登录页面并提示错误
                        case 417:
                            console.log('你已在其他端登陆啦,已退出登陆')
                            wx.showModal({
                                title: '提示',
                                content: '你已在其他端登陆，请重新登陆',
                                showCancel: false,
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                        wx.reLaunch({
                                            url: '/pages/index/index'
                                        })
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                        wx.reLaunch({
                                            url: '/pages/index/index'
                                        })
                                    }
                                }
                            })
                            break;
                            // 被踢, 请提示错误后跳转到登录页面
                        case 'kicked':
                            wx.showModal({
                                title: '提示',
                                content: '你被其他端踢出登陆，请重新登陆',
                                showCancel: false,
                                success(res) {
                                    if (res.confirm) {
                                        console.log('用户点击确定')
                                        wx.reLaunch({
                                            url: '/pages/index/index'
                                        })
                                    } else if (res.cancel) {
                                        console.log('用户点击取消')
                                        wx.reLaunch({
                                            url: '/pages/index/index'
                                        })
                                    }
                                }
                            })
                            console.log('被踢, 请提示错误后跳转到登录页面')
                            break;
                        default:
                            wx.showModal({
                                title: '提示',
                                content: '连接出现异常，请刷新页面',
                                showCancel: false,
                                success(res) {
									// getCurrentPages()[getCurrentPages().length - 1].onLoad()
                                    // if (res.confirm) {
                                    //     console.log('用户点击确定')
                                    //     wx.reLaunch({
                                    //         url: '/pages/index/begin'
                                    //     })
                                    // } else if (res.cancel) {
                                    //     console.log('用户点击取消')
                                    //     wx.reLaunch({
                                    //         url: '/pages/index/begin'
                                    //     })
                                    // }
                                }
                            })
                            break;
                    }
                }
            },
            onmyinfo: userInfo => {
                self.$store.dispatch('userInfo', userInfo)
            },
            onfriends: friends => { // 收到好友列表
                console.log('好友列表', friends)
                data.friends = nim.mergeFriends(data.friends, friends);
                data.friends = nim.cutFriends(data.friends, friends.invalid);
                self.$store.dispatch('friendCard', data.friends)
            },
            onusers: res => {
                // console.log('好友名片', res)
            },
            onteams: teams => { // 收到群列表
                // console.log('收到群列表', teams);
                data.teams = nim.mergeTeams(data.teams, teams);
                data.teams = nim.cutTeams(data.teams, teams);
                data.invalidTeams = nim.mergeTeams(data.invalidTeams, teams);
                self.$store.dispatch('groupList', data.teams)
            },
            onsessions: sessions => { // 新的会话列表
                // console.log('收到原始会话列表', sessions)
                // 列表数据计算
                data.sessions = nim.mergeSessions(data.sessions, sessions)
                // 更新总未读数
                data.sessions.map(item => {
                    if (item.unread) {
                        self.$store.state.unreadInfo[item.id] = item.unread
                    }
                })
                data.unreadInfo = self.$store.state.unreadInfo
                self.$store.dispatch('unreadInfo', data.unreadInfo)
                // 更新UI会话列表  1会话列表  2好友列表 3群列表 4未读信息，包含已、未订阅的账户数
                let list = convertRawMessageListToRenderChatList(data.sessions, data.friends, data.teams, data.unreadInfo)
                self.$store.dispatch('chatList', list)
            },
            onupdatesession: sessions => { // 会话列表更新
                // console.log('会话列表更新啦', sessions)
                // 列表数据计算
                data.sessions = nim.mergeSessions(data.sessions, sessions)
                self.$store.state.unreadInfo[sessions.id] = sessions.unread
                data.unreadInfo = self.$store.state.unreadInfo
                self.$store.dispatch('unreadInfo', data.unreadInfo)
                // 更新UI会话列表  1会话列表  2好友列表 3群列表 4未读信息，包含已、未订阅的账户数
                let list = convertRawMessageListToRenderChatList(data.sessions, data.friends, data.teams, data.unreadInfo)
                self.$store.dispatch('chatList', list)
            },
            onmsg: onMsg, // 收到新消息
            onroamingmsgs: onRoamingMsgs, // 漫游消息
            onofflinemsgs: onOfflineMsgs, // 离线消息
            onsysmsgunread: res => {
                // console.log('系统未读数', res)
            },
            onupdatesysmsgunread: res => {
                // console.log('系统未读数更新了', res)
            },
            syncRelations: true, // 同步加黑和静音列表
            onblacklist: res => {
                console.log('黑名单列表', res)
                let blacklist = {}
                for (let key in res) {
                    if (key != 'invalid') {
                        blacklist[res[key].account] = res[key]
                    }
                }
                wx.USER.blacklist = blacklist
            },
            onsyncmarkinblacklist: res => {
                console.log('黑名单发生变化', res)
            },
            onmutelist: res => {
                console.log('静音列表', res)
            },
            onsyncmarkinmutelist: res => {
                console.log('静音列表发生变化', res)
            },
            syncSessionUnread: true,
            syncRoamingMsgs: true,
            db: false,
            promise: true,
            onsyncdone: res => {
                console.log('同步完成', res)
            }
        });
        // 登陆成功之后踢掉其他端，保留当前端
        // userinfoonloginportschangefun()

        function userinfoonloginportschangefun() {
            let kick = []
            for (let i = 0, len = userinfoonloginportschange.length; i < len; i++) {
                kick.push(userinfoonloginportschange[i].deviceId)
            }
            if (kick.length <= 0) {
                return
            }
            nim.kick({
                deviceIds: kick,
                done: (error, obj) => {
                    console.log('踢其它端' + (!error ? '成功' : '失败'));
                }
            });
        }
        return nim
    }
}


function onRoamingMsgs(obj) {
    // console.log('漫游消息', obj);
    pushMsg(obj.msgs);
}

function onOfflineMsgs(obj) {
    // console.log('离线消息', obj);
    pushMsg(obj.msgs);
}

function onMsg(msg) {
    // console.log('收到消息', msg.scene, msg.type, msg);
    // let list = self.$store.state.chatList
    // let is = '-1'
    // for (let i = 0; i < list.length; i++) {
    //     if (list[i].account == msg.from) {
    //         is = '1'
    //         list[i].chatType = msg.scene
    //         list[i].unread += 1
    //         list[i].type = msg.type
    //         list[i].lastestMsg = msg.text
    //         list[i].timestamp = msg.time
    //         list[i].displayTime = calcTimeHeader(msg.time)
    //         break;
    //     } else {
    //         is = '-1'
    //     }
    // }
    // list.sort((a, b) => {
    //     return b.timestamp - a.timestamp
    // })
    // data.sessions = list
    let list = convertRawMessageListToRenderChatList(data.sessions, data.friends, data.teams, data.unreadInfo)
    self.$store.dispatch('chatList', list)
    pushMsg(msg);
}

function pushMsg(msgs) {
    // 将状态机聊天记录与缓存的本地记录同步
    data.msgs = self.$store.state.thischatList || {}
    if (!Array.isArray(msgs)) {
        msgs = [msgs];
    }
    var sessionId = msgs[0].sessionId;
    data.msgs = data.msgs || {};
    data.msgs[sessionId] = nim.mergeMsgs(data.msgs[sessionId], msgs);
    self.$store.dispatch('thischatList', data.msgs)
}