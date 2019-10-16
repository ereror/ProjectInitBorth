<script lang="text/javascript">
    // 提交正式版改一下
    wx.instantmessaging = {
        thishe: 'formaldress',
        // thishe: 'testclothes',
        development: { // 开发版
            service: { // 客服
                id: 5,
                token: "ff256c222cd6a694451b54ead0b8b786",
                accid: "service",
                title: '客服'
            },
            notice: { // 系统通知
                id: 4,
                token: "d3d2ad74886589bcc0a13f7c98395c73",
                accid: "notice",
                title: '系统通知'
            },
            appkey: '17e9bc15eeb6172f08f4e25e98194410',
            appsecret: 'db7bf038fc1f'
        },
        testclothes: { // 测试服
            service: { // 客服
                id: 5,
                token: "0063951a9f7198f2f56f0953cf2fed29",
                accid: "service",
                title: '客服'
            },
            notice: { // 系统通知
                id: 4,
                token: "d6a3732df8b10f92a2acdbc64fbf121e",
                accid: "notice",
                title: '系统通知'
            },
            appkey: '94f19e934b338488e5d914dba6bbf96e',
            appsecret: 'a3fd98731796'
        },
        formaldress: { // 正式服
            service: { // 客服
                id: 5,
                token: "88ed201f39f433d810d66e70cdaa6be3",
                accid: "service",
                title: '客服'
            },
            notice: { // 系统通知
                id: 4,
                token: "de13d3df35a14da302df3f6c47513158",
                accid: "notice",
                title: '系统通知'
            },
            appkey: 'f1f40794fc391d650373015a6d8f5683',
            appsecret: '503c2403f0f9'
        }
    }
    // 兼容旧版本的历史点击
    let declaration = wx.getStorageSync('declaration')
    if (!declaration || typeof declaration != 'object') {
        wx.setStorageSync('declaration', {})
    }
    //	全局声明周期
    import Vue from 'vue';
    import commonService from './api/common/common'
    import infoService from './api/info/info'
    import util from './static/utils/index.js'
    import localstorage from './static/utils/localstorage.js'
    import NIM from '@/static/utils/message/chatconfig.js'
    let tempid = ''
    export default Vue.extend({
        mpType: 'app',
        globalData: {
            vipIcon: ['../../static/images/vip-icon-by.png', '../../static/images/vip-icon-bj.png', '../../static/images/vip-icon-hj.png', '../../static/images/vip-icon-zs.png'],
            code: '',
            openid: '',
            token: '',
            sex: '',
            pagesition: true, // 逛一逛页面andriod
            searchIndexResult: false, // 根据刷选条件，查询首页是否存在数据
            Iitemimg: 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_boy.png',
            Iitemimgw: 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/images/default/def_avatar_girl.png',
            vipItem: [],
            isUpdateHeadUrl: '',
            isBrush: false,
            bannerList: [],
            shareFrom: {
                type: '',
                id: ''
            },
            locationInfo: {
                latitude: '',
                longitude: '',
            },
            isNotRegist: true,
            otherId: '',
            yYtype: {
                '吃饭': 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/sfximao/yt-dinner.png',
                '运动': 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/sfximao/yt-activity.png',
                '喝一杯': 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/sfximao/yt-drank.png',
                '恋爱': 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/sfximao/yt-friend.png',
                '玩游戏': 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/sfximao/yt-game.png',
                '看电影': 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/sfximao/yt-movie.png',
                '唱歌': 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/sfximao/yt-song.png',
                '旅游': 'https://mzw-sns.oss-cn-beijing.aliyuncs.com/sfximao/yt-trave.png'
            }
        },
        data: {
            isloading: false,
            isNotRegist: true
        },
        onLaunch(param) {
            let app = this.$options
            let path = param.path
            let otherId = param.query.otherId
            app.globalData.otherId = otherId || ''
            util.attachInfo(true)
            let token = localstorage.getItem('token')
            if (token) {
                app.globalData.token = token
                app.globalData.isNotRegist = false
                this.init()
            }
            util.getCode().then(code => {
                if (code) {
                    app.globalData.code = code
                    return new Promise((resove, reject) => {
                        resove(code)
                        console.log(code)
                    })
                } else {
                    uni.showToast({
                        title: '用户登录失败，请重新获取登录！',
                        icon: 'none'
                    })
                    return new Promise((resove, reject) => {
                        reject(0)
                    })
                }
            }).then(code => {
                // 登录操作
                commonService.uerLogin({
                    code
                }).then(res => {
                    // 用户已注册
                    let data = res.data
                    if (res.code === 10000) {
                        app.globalData.token = data.token
                        app.globalData.uid = data.uid
                        let status = data.status
                        let pathUrl = ''
                        localstorage.setItem('token', app.globalData.token)
                        this.isNotRegist = false
                        app.globalData.isNotRegist = false
                        if (!token) this.init()
                        this.goDesnation(status)
                        // 判断资料填写进行判断
                    } else if (res.code === 99999) {
                        app.globalData.openid = data.openid
                        localstorage.setItem('openid', app.globalData.openid)
                        localstorage.removeItem('token')
                        app.globalData.isNotRegist = true
                        this.isNotRegist = true
                        // if (path === 'pages/index/index' && otherId) {
                        // 	uni.navigateTo({
                        // 		url: '/pages/index/begin?type=regist'
                        // 	})
                        // }
                        uni.$emit('update', {
                            msg: '页面注册'
                        })
                    }
                }).catch(err => {
                    // 登录失败
                    uni.showToast({
                        title: '消息存在错误',
                        icon: 'none'
                    })
                })
            })
        },
        onShow(query) {
            // commonService.getUserinfo().then(res => {
            // 	console.log(res)
            // })
            this.updateApp()
            let app = this.$options
            if (query.path === 'pages/index/begin') {
                if (app.globalData.isNotRegist) {
                    console.log('触发页面更新')
                    uni.$emit('update', {
                        msg: '页面注册'
                    })
                } else {
                    this.goDesnation()
                }
            }
        },
        onHide() {
            // console.log('App Hide')
        },
        methods: {
            init() {
                // this.updateApp()
                // 获取年收入
                this.getModel('selfPays', 'getRevenueList')
                // 获取邀约项目
                this.getModel('selfTypes', 'getTypeList')
                uni.$on('getUserInfo', (data) => {
                    this.getUserInfo()
                })
                // 获取经纬度
                this.sendLocation()
            },
            updateApp() {
                const updateManager = wx.getUpdateManager()
                updateManager.onCheckForUpdate(function(res) {
                    // 请求完新版本信息的回调
                    console.log('Res:', res)
                    // console.log(res.hasUpdate)
                })
                updateManager.onUpdateReady(function() {
                    wx.showModal({
                        title: '更新提示',
                        content: '新版本已经准备好，是否重启应用？',
                        success(res) {
                            if (res.confirm) {
                                updateManager.applyUpdate()
                            }
                        }
                    })
                })
            },
            getPlayList() {
                let app = this.$options
                return new Promise((resolve, reject) => {
                    infoService.vipList().then(res => {
                        if (res.code === 10000) {
                            let vipItem = res.data && res.data.length && res.data
                            vipItem.map((v, i) => {
                                v.text = `每天送${v.key_num}钥匙`
                                if (v.id === 2) v.isTj = true
                                if (v.id === 4 || v.title.toLowerCase() === '砖石vip' || v.price === 998) v.lititle = 'Ta们会主动认识你'
                                if (v.price === 0) this.vipItem.splice(i, 1)
                            })
                            app.globalData.vipItem = vipItem
                            resolve(res.data)
                        } else reject(0)
                    })
                })
            },
            goDesnation(statusInit) {
                // 跳转目的地
                let pathUrl = '/pages/index/index'
                let joinUrl = '/pages/message/join?from=index'
                this.getUserInfo(true).then(res => {
                    let {
                        height,
                        birthday,
                        objective,
                        occupation,
                        revenue,
                        gender,
                        status
                    } = res
                    if (!height || !birthday) pathUrl = '/pages/regist/stepuser'
                    else if (!objective || !revenue) pathUrl = '/pages/regist/stepinfo'
                    else if (gender === 1 && (statusInit === 0 || status === 0)) pathUrl = joinUrl
                    else pathUrl = '/pages/index/index'
                    uni.reLaunch({
                        url: pathUrl
                    })
                }).catch(err => {
                    uni.reLaunch({
                        url: pathUrl
                    })
                })
            },
            getUserInfo(refrensh) {
                let app = this.$options
                if (this.isloading && !refrensh) return new Promise()
                this.isloading = true
                return new Promise((resolve, reject) => {
                    infoService.getUserInfo({
                        member_id: 0
                    }).then(res => {
                        this.isloading = false
                        if (res.code === 10000) {
                            let userInfo = Object.assign(res.data)
                            if (userInfo && userInfo.yxTk && userInfo.yxID) {
                                console.log('当前用户已经登陆可以尝试登陆云信')
                                wx.NIMFUN = NIM.socket(this, userInfo.yxTk, userInfo.yxID)
                            } else {
                                console.log('当前用户未登陆云信')
                                wx.NIMFUN = null
                            }
                            app.globalData.userInfo = userInfo
                            resolve(userInfo)
                        } else reject(0)
                    }).catch(err => {
                        this.isloading = false
                        reject(0)
                    })
                })
            },
            saveData(userInfo) {
                let app = this.$options
                let headImg_set = userInfo && userInfo.verfiy_list && userInfo.verfiy_list.filter(v => v.type === 'header')
                let wechat = userInfo.verfiy_list && userInfo.verfiy_list.filter(v => v.type === 'wechat')
                let nickname = userInfo.verfiy_list && userInfo.verfiy_list.filter(v => v.type === 'nickname')
                return new Promise((resolve, reject) => {
                    let param = {
                        birthday: userInfo.timeChoose && userInfo.timeChoose.join('-') || userInfo.birthday || '',
                        height: userInfo.height,
                        revenue: userInfo.revenue,
                        objective: userInfo.objective,
                        occupation: userInfo.occupation,
                        header_url: userInfo.header_url,
                        wechat_number: userInfo.wechat_number,
                        nickname: userInfo.nickname
                    }
                    if (headImg_set.length && headImg_set[0].pass === 0) delete param.header_url
                    if (wechat.length && wechat[0].pass === 0 || !userInfo.wechat_number) delete param.wechat_number
                    if (nickname.length && nickname[0].pass === 0) delete param.nickname
                    if (param.header_url.length) app.globalData.isUpdateHeadUrl = true
                    util.showLoading('数据保存中，请稍等..')
                    infoService.saveData(param).then(res => {
                        util.hideLoading()
                        if (res.code === 10000) {
                            util.showSuccess('保存成功!')
                            resolve(1)
                        } else {
                            util.showFail('保存失败, ' + res.msg + '请重试!')
                            reject(0)
                        }
                    })
                })
            },
            sendShareMessAge() {
                let app = this.$options
                console.log('调用发送方法', app.globalData.shareFrom.type, app.globalData.shareFrom.id)
                let param = {
                    channel_type: app.globalData.shareFrom.type,
                    channel_name: app.globalData.shareFrom.id
                }
                if (param.channel_type && param.channel_name && app.globalData.token) commonService.sendShareFrom(param)
            },
            sendFormId(formid) {
                let app = this.$options
                if (formid && app.globalData.token) commonService.sendFormId({
                    form_id: formid
                })
            },
            sendLocation() {
                let t
                let that = this
                let app = this.$options
                let sendlocFunc = function(func, time) {
                    func && func()
                    clearInterval(t)
                    t = setInterval(() => {
                        func && func()
                    }, time)
                }

                let setLocation = function() {
                    if (!app.globalData.token) return
                    that.getLocationInfo(true).then(res => {
                        // 发送地理位置信息
                        let param = {
                            latitude: res.latitude,
                            longitude: res.longitude,
                            opt_system: wx.IS_IOS ? 1 : 2,
                            platform: 1,
                            app_name: '51yue'
                        }
                        infoService.heartbeat(param)
                    })
                }
                sendlocFunc(setLocation, 60 * 60 * 1000)
            },
            getLocationInfo(refrensh = false) {
                let app = this.$options
                let locationInfo = app.globalData.locationInfo
                let that = this
                return new Promise((resove, reject) => {
                    //如果已经获取了,并且不刷新
                    if (locationInfo && !refrensh) {
                        resove(locationInfo)
                    } else {
                        wx.getLocation({
                            type: 'gcj02',
                            success: function(res) {
                                let {
                                    latitude,
                                    longitude
                                } = res;
                                let locationInfo = {
                                    latitude,
                                    longitude,
                                }
                                app.globalData.locationInfo = locationInfo;
                                resove(locationInfo)
                            },
                            fail: function(res) {
                                let title = '定位失败'
                                let content = '需要定位信息才能获取周边动态，是否重新定位'
                                let isagin = true
                                if (!!~res.errMsg.indexOf('fail auth deny')) {
                                    title = '位置信息未授权'
                                    content = '需要用户授权:设置界面（「右上角」 - 「关于」 - 「右上角」 - 「设置」）打开位置授权！'
                                    isagin = false
                                }
                                wx.showModal({
                                    title: title,
                                    content: content,
                                    showCancel: true,
                                    success: function(res) {
                                        if (res.confirm && isagin) {
                                            that.getLocationInfo()
                                        }
                                    },
                                    fail: function(res) {},
                                    complete: function(res) {},
                                })
                            },
                            complete: function(res) {},
                        })
                    }
                })
            },
            getModel(type, getUrl) {
                let dataInit = localstorage.getItem(type)
                let app = this.$options
                if (dataInit.length) {
                    try {
                        app.globalData[type] = dataInit && JSON.parse(dataInit)
                    } catch (e) {
                        app.globalData[type] = []
                    }
                } else {
                    infoService[getUrl]().then(res => {
                        if (res.code === 10000) {
                            let data = res.data
                            data.map(v => {
                                v.value = v.id * 1
                                if (v.title) v.text = v.title
                                if (v.content) v.text = v.content
                            })
                            app.globalData[type] = data
                            localstorage.setItem(type, data)
                        }
                    })
                }
            }
        }
    });
</script>

<style>
    /*每个页面公共css */
    @import '../common/common.css';
    @import '../common/icon.css';

    view {
        box-sizing: border-box;
    }
</style>