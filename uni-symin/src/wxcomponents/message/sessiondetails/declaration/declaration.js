Component({
    properties: {
        declarationsendto: {
            type: Object,
            value: {},
            observer(val) {
                if (val && val.os && val.os == 'demo') {
                    return
                }
                if( val.account == 'haoyou' ){
                    return
                }
                let is = ''
                // 如果没传消息  说明已经建立聊天关系  再判断本地是否有记录点击过  兼容旧版本
                let userdeclaration = wx.getStorageSync('declaration') || {}
                if (userdeclaration[val.account] && userdeclaration[val.account] == 'yes') {
                    is = 'yes'
                } else {
                    // val = val.msg
                    // if (val != '') {
                    is = 'no'
                    // } else {
                    //     is = 'yes'
                    // }
                }
                if (is && is == 'yes') {
                    this.setData({
                        show: false,
                        timetimeout: null
                    })
                    return
                }else{
                    this.setData({
                        show: true
                    })
                }
                this.data.timetimeout = setInterval(() => {
                    console.log('循环运行中')
                    if (this.data.timestatic <= 0) {
                        clearInterval(this.data.timetimeout)
                        this.setData({
                            timestatic: 0,
                            timetimeout: null
                        })
                    } else {
                        this.setData({
                            timestatic: this.data.timestatic - 1
                        })
                    }
                }, 1000);
            }
        },
        msg: {
            type: String,
            value: ''
        },
        account: {
            type: String,
            value: ''
        }
    },
    option: {},
    data: {
        contentlist: [
            '绿色交友，文明用语，请勿使用约炮，啪啪等令人反感或不友好的用语',
            '警惕骗子行为：报销车费，酒托饭托，帮Ta支付，要求转账',
            '请勿发送广告等信息骚扰用户',
            '若经被用户投诉，立即会被封号处理'
        ],
        timestatic: 5,
        timetimeout: null,
        show: false
    },
    methods: {
        back() {
            clearInterval(this.data.timetimeout)
            this.setData({
                timetimeout: null
            })
            let userdeclaration = wx.getStorageSync('declaration') || {}
            userdeclaration[this.data.account] = 'no'
            wx.setStorageSync('declaration', userdeclaration)
            wx.navigateBack()
        },
        yestimestatic() {
            console.log(this.data.timestatic)
            if (this.data.timestatic > 0) {
                return
            }
            let userdeclaration = wx.getStorageSync('declaration') || {}
            userdeclaration[this.data.account] = 'yes'
            wx.setStorageSync('declaration', userdeclaration)
            clearInterval(this.data.timetimeout)
            this.setData({
                timestatic: 5,
                timetimeout: null,
                show: false
            })
            // this.triggerEvent('declarationsendmsg', this.data.msg)
        },
        clearIntervalfun(){
            clearInterval(this.data.timetimeout)
        }
    },
    attached() {
        console.log('加载')
        clearInterval(this.data.timetimeout)
        this.setData({
            timestatic: 5,
            timetimeout: null
        })
        // let is = wx.getStorageSync('declaration')
        // if (is && is == 'yes') {
        //     this.setData({
        //         show: false,
        //         timetimeout: null
        //     })
        //     return
        // }
        // clearInterval(this.data.timetimeout)
        // this.setData({
        //     timestatic: 5,
        //     timetimeout: null,
        //     show: true
        // })
        // this.data.timetimeout = setInterval(() => {
        //     console.log('循环运行中')
        //     if (this.data.timestatic <= 0) {
        //         clearInterval(this.data.timetimeout)
        //         this.setData({
        //             timestatic: 0,
        //             timetimeout: null
        //         })
        //     } else {
        //         this.setData({
        //             timestatic: this.data.timestatic - 1
        //         })
        //     }
        // }, 1000);

    }
})