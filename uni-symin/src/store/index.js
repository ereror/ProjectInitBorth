import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
let thischatList = wx.getStorageSync('thischatList') || {};
let chatList = wx.getStorageSync('chatList') || [];
let chatListuserdata = wx.getStorageSync('chatListuserdata') || {}
let iconimg = {
    thome_d: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-home-d.png',
    thome_a: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-home-a.png',
    tmess_d: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-mess-d.png',
    tmess_a: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-mess-a.png',
    tuser_d: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-user-d.png',
    tuser_a: 'https://sns-cdn.myxianxiaobao.com/sfximao/t-user-a.png'
}
const store = new Vuex.Store({
    state: {
        // 即时通讯
        maxthischatListlength: 20, // 最大消息存储数量  每个用户
        nim: '', // 方法配置
        userInfo: {}, // 当前登陆用户信息
        chatListaccount: '', // 当前和谁对话 账号
        chatListaccountsession: '', // 当前和谁对话 会话id
        chatList: chatList,
        friendCard: {}, // 好友列表包含是否在线信息
        groupList: {}, // 群列表
        unreadInfo: {}, // 未读消息
        unreadInfonum: 0,
        thischatList: thischatList, // 消息列表
        chatListuserdata: chatListuserdata, // 会话列表用户信息
        tbarconfig: [{
            url: '/pages/index/index',
            icon_a: iconimg.thome_a,
            icon_d: iconimg.thome_d,
            isActiveIndex: 0,
            text: '首页',
            newunread: 0
        }, {
            url: '/pages/message/index',
            icon_a: iconimg.tmess_a,
            icon_d: iconimg.tmess_d,
            isActiveIndex: 1,
            text: '消息',
            newunread: 0
        }, {
            url: '/pages/userinfo/index',
            icon_a: iconimg.tuser_a,
            icon_d: iconimg.tuser_d,
            isActiveIndex: 2,
            text: '我的',
            newunread: 0
        }] // 底部tab 全局便利设置未读数和重置
    },
    getters: {
        // 底部tab
        tbarconfig(state) {
            return state.tbarconfig
        },
        // 即时通讯
        nim(state) {
            return state.nim
        },
        userInfo(state) {
            return state.userInfo
        },
        chatListaccount(state) {
            return state.chatListaccount
        },
        chatListaccountsession(state) {
            return state.chatListaccountsession
        },
        chatList(state) {
            return state.chatList
        },
        friendCard(state) {
            return state.friendCard
        },
        groupList(state) {
            return state.groupList
        },
        unreadInfo(state) {
            return state.unreadInfo
        },
        unreadInfonum(state) {
            return state.unreadInfonum
        },
        thischatList(state) {
            return state.thischatList
        },
        chatListuserdata(state) {
            return state.chatListuserdata
        }
    },
    mutations: {
        // 底部tab
        tbarconfig(state, tbarconfig) {
            state.tbarconfig = tbarconfig
        },
        // 即时通讯
        nim(state, nim) {
            state.nim = nim
        },
        userInfo(state, userInfo) {
            state.userInfo = userInfo
        },
        chatListaccount(state, chatListaccount) {
            state.chatListaccount = chatListaccount
        },
        chatListaccountsession(state, chatListaccountsession) {
            state.chatListaccountsession = chatListaccountsession
        },
        chatList(state, chatList) {
            // console.log('设置最新会话列表', chatList)
            wx.setStorageSync('chatList', chatList)
            state.chatList = chatList
        },
        friendCard(state, friendCard) {
            state.friendCard = friendCard
        },
        groupList(state, groupList) {
            state.groupList = groupList
        },
        unreadInfo(state, unreadInfo) {
            let unreadInfonum = 0
            for (let key in unreadInfo) {
                unreadInfonum += parseInt(unreadInfo[key])
            }
            state.unreadInfo = unreadInfo
            state.unreadInfonum = unreadInfonum
            // 更新底部tab未读数
            state.tbarconfig[1].newunread = unreadInfonum
            // console.log('底部tab数据', state.tbarconfig)
        },
        thischatList(state, thischatList) {
            // 设置最新消息的是时候
            // 重置当前会话的未读数  条件是在当前会话详情
            if (state.chatListaccountsession != '') {
                wx.NIMFUN.resetSessionUnread(state.chatListaccountsession)
            }
            /**
             * 每个用户对话本地缓存最多不超过50条 查看更多可调用云端历史纪录
             */
            for (let key in thischatList) {
                if (thischatList[key].length > state.maxthischatListlength) {
                    thischatList[key].splice(0, thischatList[key].length - state.maxthischatListlength)
                }
                thischatList[key]
            }
            // 存储本地
            // console.log('本地历史纪录更新', thischatList)
            wx.setStorageSync('thischatList', thischatList)
            state.thischatList = thischatList
        },
        chatListuserdata(state, chatListuserdata) {
            wx.setStorageSync('chatListuserdata', chatListuserdata)
            state.chatListuserdata = chatListuserdata
        }
    },
    actions: {
        tbarconfig(context, tbarconfig) {
            context.commit("tbarconfig", tbarconfig);
        },
        nim(context, nim) {
            context.commit("nim", nim);
        },
        userInfo(context, userInfo) {
            context.commit("userInfo", userInfo);
        },
        chatListaccount(context, chatListaccount) {
            context.commit("chatListaccount", chatListaccount);
        },
        chatListaccountsession(context, chatListaccountsession) {
            context.commit("chatListaccountsession", chatListaccountsession);
        },
        chatList(context, chatList) {
            context.commit("chatList", chatList);
        },
        friendCard(context, friendCard) {
            context.commit("friendCard", friendCard);
        },
        groupList(context, groupList) {
            context.commit("groupList", groupList);
        },
        unreadInfo(context, unreadInfo) {
            context.commit("unreadInfo", unreadInfo);
        },
        thischatList(context, thischatList) {
            context.commit("thischatList", thischatList);
        },
        chatListuserdata(context, chatListuserdata) {
            context.commit("chatListuserdata", chatListuserdata);
        }
    }
})
export default store;