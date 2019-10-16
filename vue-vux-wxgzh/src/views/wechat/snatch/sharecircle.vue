<template lang='pug'>
    .sharecircle
      div.sharebox
        .sharecontent
          .detail
            .sharetitle
              span.span(v-show='nick') HI {{nick}}
              span.span(v-show='newuser.username && !nick') HI {{newuser.username}}
            .sharedetail
              span.dcspan(v-show="!islose") 你已加入圈子（{{param.teamname}}），不管你是新麻友，还是老麻友，我们打招呼的唯一方式——麻将搓起来！
              span.dcspan(v-show='islose')  加入圈子失败！本邀请函有效期已过，请向圈子管理员索取最新链接
            .circlename
              span.btspan 圈主：{{param.teamowner}}
        .sharebottom
          .opengame(style="display:none")
          img.erweicode(src='~@/assets/image/snatch/qrcode.jpg' style="width: 3rem;height: 3rem;margin: 0 auto;")
          .message
            span 长按二维码，进入公众号
      div
</template>
<script>
  import { getAccessCode } from '@/utils/tools'
  import activity from '@/service/activity'
  var queryString = require('querystring')
  import LocalStorageService from '@/service/storage'
  import circleService from '@/service/userScircle'
  import { wxconfig } from '../../../../config/app'
  export default {
    name: 'sharecircle',
    data () {
      return {
        newuser: {
          code: '',
          username: ''
        },
        param: {},
        islose: false
      }
    },
    computed: {
      score () {
        return this.$store.state.wxToken.score
      },
      nick () {
        return this.$store.state.wxToken.unickname
      }
    },
    created () {
      document.title = '约牌， 就来《九点麻将》'
      var exec = 'sharecircle?'
      var str = decodeURI(location.href)
      var code = ''
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      str = str.substring(str.indexOf(exec) + 12)
      var store = LocalStorageService.get('storeState')
      if (store) {
        this.$store.commit('setstore', store)
      }
      this.param = queryString.parse(str)
      console.log(this.param)
      if (!code) {
        var param = {
          appid: wxconfig.appid,
          redirect_uri: 'http://www.' + wxconfig.domain + '.com/#/snatch/sharecircle?' + str,
          response_type: 'code',
          scope: 'snsapi_userinfo',
          state: '1'
        }
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + queryString.stringify(param) + '#wechat_redirect'
        location.href = url
        return
      }
      if (code) {
        this.newuser = LocalStorageService.get('sharecirclecode') || this.newuser
        if (this.newuser && this.newuser.code === code) {
          this.createCircle()
          this.getwxshare()
          return
        } else {
          this.getwxshare()
          LocalStorageService.remove('sharecirclecode')
        }
        getAccessCode(code).then(res => {
          var param = {
            username: this.nick,
            code: code
          }
          LocalStorageService.set('sharecirclecode', JSON.stringify(param))
          this.createCircle()
        })
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
              that.shareqrcode()
            })
          }
        })
      },
      createCircle () {
        var nowtime = new Date().getTime() - 8 * 60 * 60 * 1000 + 2 * 60 * 1000
        console.log(nowtime - this.param.time)
        if (this.param && nowtime > this.param.time * 1) {
          this.$vux.alert.show({
            title: '圈子信息',
            content: '邀请函已过期，加入圈子失败'
          })
          this.islose = true
          return
        }
        var temp = {
          userid: this.$store.state.wxToken.userid,
          teamid: this.param.teamid,
          endtime: this.param.time || 15,
          headimgurl: this.$store.state.wxToken.uheadeimgurl,
          sex: this.$store.state.wxToken.usex,
          nickname: this.$store.state.wxToken.unickname,
          up: this.param.userid || ''
        }
        activity.setCircle(temp).then(res => {
          console.log('加入圈子成功')
        })
      },
      shareqrcode () {
        var wx = window.wx || {}
        var that = this
        this.param.from = 'fromsharecircle'
        var url = 'http://www.' + wxconfig.domain + '.com/#/snatch/wxshare?' + queryString.stringify(this.param)
        url = encodeURI(url)
        wx.onMenuShareAppMessage({
          title: '圈子邀请函',
          desc: '【' + that.param.nick + '】，邀请你加入圈子！【' + that.param.teamname + '】',
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
          title: '圈子邀请函',
          desc: '【' + that.param.nick + '】，邀请你加入圈子！【' + that.param.teamname + '】',
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
<style lang="less">
  .sharecircle {
    height: 100%;
    width: 100%;
    overflow: auto;
    background: url('~@/assets/image/snatch/sharecirclebg.jpg');
    background-size: 100% 100%;
    &  .sharecontent {
      position: relative;
      height:8rem;
      width:100%;
      background: url('~@/assets/image/snatch/sharecirclebox.png');
      background-size:100% 100%;
      margin-top: 30%;
      &  .detail {
        position: absolute;
        width: 75%;
        height: 50%;
        left: 10%;
        top: 30%;
        &  .sharetitle {
          text-align: left;
          font-size: .4rem;
          color: #9c3902;
          font-weight: 600;
          padding-left: .2rem;
        }
        &  .sharedetail {
          padding: .3rem .4rem;
          font-size: .36rem;
          text-align: left;
          color: #9c3902;
        }
        &  .circlename {
          text-align: right;
          padding-right: .4rem;
          padding-top: .2rem;
          color: #9c3902;
          font-weight: 600;
          font-size: .36rem;
        }
      }
    }
    &  .sharebottom {
       &  .opengame {
          width: 3rem;
          height: 1rem;
          margin: 0 auto;
          // background: url('~@/assets/image/snatch/sharecircleopen.png');
          // background-size: 100% 100%;
       }
       &  .erweicode {
          width: 3.6rem;
          height: 3.6rem;
          margin: .2rem auto;
          background: url('~@/assets/image/snatch/qrcode.jpg');
          background-size: 100% 100%;
       }
       &  .message {
          width: 6rem;
          text-align: center;
          margin: .2rem auto;
       }
    }
  }
</style>
