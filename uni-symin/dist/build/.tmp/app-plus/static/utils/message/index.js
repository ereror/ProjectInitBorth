wx.instantmessaging = {
    thishe: 'testclothes',
    testclothes: { // 测试服
        service: { // 客服
            token: "0063951a9f7198f2f56f0953cf2fed29",
            accid: "service"
        },
        notice: { // 系统通知
            token: "d6a3732df8b10f92a2acdbc64fbf121e",
            accid: "notice"
        },
  //       appkey: '94f19e934b338488e5d914dba6bbf96e', // 测试
		// appsecret: 'a3fd9873179', // 测试
		appkey: 'f1f40794fc391d650373015a6d8f5683', // 正式
        appsecret: '503c2403f0f9', // 正式
    },
    formaldress: { // 正式服
        service: { // 客服
            token: "0063951a9f7198f2f56f0953cf2fed29",
            accid: "service"
        },
        notice: { // 系统通知
            token: "d6a3732df8b10f92a2acdbc64fbf121e",
            accid: "notice"
        },
        // appkey: '94f19e934b338488e5d914dba6bbf96e',
        // appsecret: 'a3fd9873179',
		appkey: 'f1f40794fc391d650373015a6d8f5683', // 正式
        appsecret: '503c2403f0f9' // 正式
    }
}
// 引入表情js
import EmojiObj from './emojimap.js'
let emoji = EmojiObj.emojiList.emoji
// 引入云信sdk
import NIM from './../../libs/NIM_Web_NIM_v6.6.6.js'
wx.NIM = NIM
console.log(wx.instantmessaging)
let instantmessaging = wx.instantmessaging
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}
const attachInfo = () => {
    let res = wx.getSystemInfoSync()

    wx.WIN_WIDTH = res.screenWidth
    wx.WIN_HEIGHT = res.screenHeight
    wx.IS_IOS = /ios/i.test(res.system)
    wx.IS_ANDROID = /android/i.test(res.system)
    wx.DEFAULT_HEADER_HEIGHT = 46 // res.screenHeight - res.windowHeight - res.statusBarHeight
    wx.DEFAULT_CONTENT_HEIGHT = res.screenHeight - res.statusBarHeight - wx.DEFAULT_HEADER_HEIGHT
    wx.IS_APP = true
    let custom = wx.getMenuButtonBoundingClientRect();
    wx.STATUS_BAR_HEIGHT = res.statusBarHeight
    wx.CUSTOM = custom;
    wx.CUSTOM_Bar = custom.bottom + custom.top - res.statusBarHeight;
    wx.showAlert = (options) => {
        options.showCancel = false
        wx.showModal(options)
    }
    wx.showConfirm = (options) => {
        wx.showModal(options)
    }
}
/**
 * 生成富文本节点
 */
function generateRichTextNode(text) {
    let tempStr = text
    let richTextNode = []
    let leftBracketIndex = tempStr.indexOf('[')
    let rightBracketIndex = tempStr.indexOf(']')
    let countOfWord = 0
    Array.from(tempStr).map(item => {
        if (item != '[' && item != ']') {
            countOfWord++
        }
    })
    if (leftBracketIndex == -1 || rightBracketIndex == -1 || countOfWord == 0) { //没有emoji
        richTextNode.push({
            type: 'text',
            text: tempStr
        })
        return richTextNode
    }
    while (tempStr.length != 0) {
        leftBracketIndex = tempStr.indexOf('[')
        rightBracketIndex = tempStr.indexOf(']')
        if (leftBracketIndex == 0) { // 开头是[
            rightBracketIndex = tempStr.indexOf(']')
            if (rightBracketIndex == -1) {
                richTextNode.push({
                    type: 'text',
                    text: tempStr
                })
                tempStr = ''
            } else {
                let emojiName = tempStr.slice(0, rightBracketIndex + 1)
                if (emoji[emojiName]) { // 有效emoji
                    richTextNode.push({
                        name: 'img',
                        attrs: {
                            width: '20rpx',
                            height: '20rpx',
                            src: emoji[emojiName].img
                        }
                    })
                } else { //无效emoji
                    richTextNode.push({
                        type: 'text',
                        text: emojiName
                    })
                }
                tempStr = tempStr.substring(rightBracketIndex + 1, tempStr.length)
            }
        } else { // 开头不是[
            if (leftBracketIndex == -1) { // 最后全是文字
                richTextNode.push({
                    type: 'text',
                    text: tempStr.slice(0, tempStr.length)
                })
                tempStr = ''
            } else {
                richTextNode.push({
                    type: 'text',
                    text: tempStr.slice(0, leftBracketIndex)
                })
                tempStr = tempStr.substring(leftBracketIndex, tempStr.length + 1)
            }
        }
    }
    return richTextNode
}

function post(params) {
    let url = params.url,
        header = params.header || {},
        data = params.data;

    return new Promise((resolve, reject) => {
        wx.request({
            url: url,
            data: data,
            header: header,
            method: 'POST',
            success: function(data, statusCode, header) {
                resolve({
                    data,
                    statusCode,
                    header
                })
            },
            fail: function() {
                reject('请求失败，请重试！')
            }
        })
    })
}

/**
 * 输入Unix时间戳，返回指定时间格式
 */
function calcTimeHeader(time) {
    // 格式化传入时间
    let date = new Date(parseInt(time)),
        year = date.getUTCFullYear(),
        month = date.getUTCMonth(),
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getUTCMinutes()
    // 获取当前时间
    let currentDate = new Date(),
        currentYear = date.getUTCFullYear(),
        currentMonth = date.getUTCMonth(),
        currentDay = currentDate.getDate()
    // 计算是否是同一天
    if (currentYear == year && currentMonth == month && currentDay == day) { //同一天直接返回
        if (hour > 12) {
            return `下午 ${hour}:${minute < 10 ? '0' + minute : minute}`
        } else {
            return `上午 ${hour}:${minute < 10 ? '0' + minute : minute}`
        }
    }
    // 计算是否是昨天
    let yesterday = new Date(currentDate - 24 * 3600 * 1000)
    if (year == yesterday.getUTCFullYear() && month == yesterday.getUTCMonth && day == yesterday.getDate()) { //昨天
        return `昨天 ${hour}:${minute < 10 ? '0' + minute : minute}`
    } else {
        return `${year}-${month + 1}-${day} ${hour}:${minute < 10 ? '0' + minute : minute}`
    }
}

/**
 * 将原生消息转化为最近会话列表渲染数据
 */
function convertRawMessageListToRenderChatList(rawMessageList, friendCard, groupList, unreadInfo) {
    // rawMessageList 所有的聊天列表都在里面
    // friendCard 好友列表，含名片信息，额外添加在线信息
    // groupList 群列表
    // unreadInfo 未读信息，包含已、未订阅的账户数
    // debugger
    // let rawMessageList = data.sessions
    let chatList = []
    let notice = instantmessaging[instantmessaging.thishe].notice.accid // 系统
    let service = instantmessaging[instantmessaging.thishe].service.accid // 客服
    let noticeobj = {},
        serviceobj = {}
    for (let i = 0; i < rawMessageList.length; i++) {
        let unread = unreadInfo[rawMessageList[i].id] || 0
        let youobj = {
            chatType: rawMessageList[i].scene,
            session: rawMessageList[i].id,
            account: rawMessageList[i].to,
            status: '',
            nick: '',
            avatar: '',
            lastestMsg: rawMessageList[i].lastMsg.text,
            type: rawMessageList[i].lastMsg.type,
            timestamp: rawMessageList[i].updateTime,
            unread,
            // rawMessageList[i].unread
            displayTime: calcTimeHeader(rawMessageList[i].updateTime),
        }
        youobj.unread = unread
        if (rawMessageList[i].to == notice) { // 系统通知
            youobj.nick = '系统通知'
            youobj.avatar = '/static/images/systemicon.png'
            noticeobj = youobj
        } else if (rawMessageList[i].to == service) { // 客服
            youobj.nick = '客服'
            youobj.avatar = '/static/images/serveicon.png'
            serviceobj = youobj
        } else {
            chatList.push(youobj)
        }
        // chatList.push(youobj)
    }
    // 排序
    chatList.sort((a, b) => {
        return b.timestamp - a.timestamp
    })
    let spliceindex = 0
    // 系统通知
    if (noticeobj.account && noticeobj.account == notice) {
        chatList.splice(spliceindex, 0, noticeobj)
        spliceindex = 1
    } else {
        chatList.splice(spliceindex, 0, {
            chatType: 'p2p',
            session: 'p2p-' + notice,
            account: notice,
            status: '',
            nick: '系统通知',
            avatar: '/static/images/systemicon.png',
            lastestMsg: '',
            type: 'text',
            timestamp: 0,
            unread: 0,
            displayTime: ''
        })
        spliceindex = 1
    }
    // 客服系统
    if (serviceobj.account && serviceobj.account == service) {
        chatList.splice(spliceindex, 0, serviceobj)
    } else {
        chatList.splice(spliceindex, 0, {
            chatType: 'p2p',
            session: 'p2p-' + service,
            account: service,
            status: '',
            nick: '客服',
            avatar: '/static/images/serveicon.png',
            lastestMsg: '',
            type: 'text',
            timestamp: 0,
            unread: 0,
            displayTime: ''
        })
    }
    console.log('会话列表更新结构体结果', chatList)
    return chatList
}
module.exports = {
    formatTime: formatTime,
    attachInfo: attachInfo,
    generateRichTextNode,
    post,
    calcTimeHeader,
    convertRawMessageListToRenderChatList
}