<template lang='pug'>
    .container
         .contentbox
             .qrcodebox
                 img(:src="imgUrl" v-show='imgUrl')
             .message
                 .messli
                    ul(v-show='isown')
                      li
                        span 点击右上角菜单按钮
                      li
                        span 将你的二维码分享给朋友
                      li
                        span 永久共享朋友圈的人脉经济
                    ul(v-show='!isown')
                      li
                        span {{username}}邀请你来拿大奖
                      li
                        span 长按识别左侧二维码
                      li
                        span 下载游戏来夺奖
</template>
<script>
  import { calcrem } from '@/utils/common'
  import { getAccessCode } from '@/utils/tools'
  import LocalStorageService from '@/service/storage'
  import dudutool from '@/service/dudutool'
  import circleService from '@/service/userScircle'
  import { wxconfig } from '../../../../config/app'
  calcrem()
  var querystring = require('querystring')
  export default {
    name: 'qrcode',
    data () {
      return {
        message: '',
        urltext: '',
        imgUrl: '',
        loading: false,
        ticket: '',
        username: '',
        isown: true,
        urls: ''
      }
    },
    computed: {
      logsrc () {
        var logsrc2 = this.$store.state.wxToken.uheadeimgurl || this.imgUrl
        return logsrc2
      }
    },
    created () {
      document.title = '专属二维码'
      var code = ''
      var str = location.href
      var store = LocalStorageService.get('storeState')
      if (store) {
        this.$store.commit('setstore', store)
        this.username = this.$store.state.wxToken.unickname
        this.userid = this.$store.state.wxToken.userid
      }
      var status = this.judguser(str, store)
      if (!status) {
        this.getwxshare()
        return
      }
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var that = this
        // var time = new Date().getTime()
        getAccessCode(code).then(res => {
          that.username = that.$store.state.wxToken.unickname
          that.userid = that.$store.state.wxToken.userid
          console.log(that.username)
          console.log(that.userid)
          that.getBaseUse(that)
        })
        // if (!store || !store.userid || !store.expris || (time - store.expris) / (1000 * 60) > 29) {
        //   getAccessCode(code).then(res => {
        //     that.username = that.$store.state.wxToken.unickname
        //     that.userid = that.$store.state.wxToken.userid
        //     that.getBaseUse(that)
        //   })
        // } else {
        //   that.getBaseUse(that)
        // }
      }
    },
    destroyed () {
      var wx = window.wx || {}
      if (wx) {
        wx.ready(function () {
          wx.hideOptionMenu()
        })
      }
    },
    methods: {
      judguser (str, store) {
        var matchstr = /(?:userid=)(.*)/ig
        var resultc = str.match(matchstr)
        if (resultc && resultc.length) {
          var param = querystring.parse(resultc[0]) || param
          if (store && store.userid * 1 === param.userid * 1) {
            this.isown = true
            this.userid = param.userid
            this.username = param.username
            this.ticket = param.imgurl
            this.imgUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + encodeURIComponent(this.ticket)
            return false
          }
          if (param.userid) {
            this.isown = false
            this.username = param.username
            this.ticket = param.imgurl
            this.userid = param.userid
            this.imgUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + encodeURIComponent(this.ticket)
            return false
          }
        }
        return true
      },
      getwxshare () {
        var url = location.href.split('#')[0]
        var that = this
        circleService.getJsconfig({urlstr: url}).then(res => {
          if (res.status === 200 && res.data && res.data.errcode === 0) {
            var wx = window.wx || {}
            wx.config({
              debug: false,
              appId: wxconfig.appid,
              timestamp: res.data.timestamp,
              nonceStr: res.data.noncestr,
              signature: res.data.signature,
              jsApiList: ['chooseImage', 'onMenuShareAppMessage', 'showOptionMenu', 'onMenuShareTimeline']
            })
            wx.ready(function () {
              wx.showOptionMenu()
              wx.hideMenuItems({
                menuList: ['menuItem:openWithQQBrowser', 'menuItem:openWithSafari']
              })
              that.shareqrcode()
            })
          }
        })
      },
      getBaseUse () {
        // var qrcode = LocalStorageService.get('qrcode')
        // if (qrcode) {
        //   this.ticket = qrcode.ticket
        //   this.imgUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + encodeURIComponent(this.ticket)
        //   this.getwxshare()
        // } else {
        //   this.postCode()
        // }
        this.postCode()
      },
      postCode () {
        this.loading = true
        // dudutool.getInfo({userid: this.$store.state.wxToken.userinfoid, info: 8})
        var param = {'expire_seconds': 2592000, 'action_name': 'QR_STR_SCENE', 'action_info': {'scene': {'scene_str': this.$store.state.wxToken.accesswxToken + '==' + this.$store.state.wxToken.userid}}}
        dudutool.postCode(param).then(res => {
          this.loading = false
          if (res.status === 200 && res.data && res.data.ticket) {
            this.ticket = res.data.ticket
            this.urltext = res.data.url
            res.data.expire = new Date().getTime()
            res.data.imgUrl = this.logsrc
            res.data.userid = this.$store.state.wxToken.userid
            this.imgUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + encodeURIComponent(this.ticket)
            LocalStorageService.set('qrcode', JSON.stringify(res.data))
            this.getwxshare()
          }
          //  else {
          //   dudutool.wxaccessToken().then(res => {
          //     if (res.status === 200 && res.data && res.data.errcode) {
          //       this.postCode()
          //     }
          //   })
          //   return
          // }
        })
      },
      shareqrcode () {
        var wx = window.wx || {}
        var that = this
        var url = 'http://www.' + wxconfig.domain + '.com/#/userproxy/qrcode?userid=' + that.userid + '&username=' + that.username + '&imgurl=' + that.ticket
        url = encodeURI(url)
        wx.onMenuShareAppMessage({
          title: that.username + '的专属二维码',
          desc: that.username + '，邀请你来拿大奖，永久共享朋友圈经济！',
          link: url,
          imgUrl: 'http://www.' + wxconfig.domain + '.com/static/xueliu.png',
          type: 'link',
          dataUrl: '',
          success: function (res) {
            console.log('分享成功!', res)
          },
          cancel: function (res) {
            console.log('取消分享！', res)
          }
        })
        wx.onMenuShareTimeline({
          title: that.username + '的专属二维码',
          link: url,
          imgUrl: 'http://www.' + wxconfig.domain + '.com/static/xueliu.png',
          success: function () {
            console.log('分享成功!')
          },
          cancel: function () {
            console.log('取消分享！')
          }
        })
        wx.error(function (res) {
          alert(res.errMsg)
        })
      }
    }
  }
</script>
<style scoped lang='less'>
    .container {
      height: 100%;
      width: 100%;
      overflow: hidden;
      background:url('~assets/image/shareqrodeupdate.jpg');
      background-size: 100% 100%;
      &  .contentbox {
        position: absolute;
        width: 90%;
        height: 3.6rem;
        bottom: 1.4rem;
        left: 5%;
        margin: 0 auto;
        padding-top: .5rem;
        &  .qrcodebox {
            height: 3.4rem;
            width: 3.4rem;
            display: inline-block;
            float: left;
            &   img {
              height: 3rem;
              width: 3rem;
              border-radius: 5px;
            }
        }
        &  .message {
          display: inline-block;
          height: 3.6rem;
          padding-top: .2rem;
          & .messli {
            padding-top: .5em;
          }
          & ul {
            line-height: 2em;
            font-size: 1.1em;
          }
          & ul li {
            text-align: left;
            color: white;
            text-shadow: 1px 1px 2px gray;
          }
          &  .btn {
            height:1rem;
            width:4rem;
            margin-top: .1rem;
            background:url('~assets/image/sharebtn.png');
            background-size:100% 100%;
          }
        }
      }
    }
</style>
