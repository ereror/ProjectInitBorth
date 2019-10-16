<template lang='pug'>
    .shareapp
        .header
            img(src="~@/assets/image/snatch/prizelogo.png" style="height:2rem;width:auto;")
            img(src="~@/assets/image/snatch/prizelogosmtitle.png" style="height:.6rem;width:auto;")
        .messdetail
            .checkdetail
              img.fl(src="~@/assets/image/snatch/checkhd.png" @click="gotoActivity()")
            .prize
                div.contail
                  span(v-show="prizeInfo.rank")
                      span(style="color:#9e1d34") {{prizestr[prizeInfo.rank]}}
                        span(style='color:#ea3751') {{prizeInfo.baseprize || 0}}
                        | 元
                  span(v-show="!prizeInfo.rank")
                      span {{prizestr[prizeInfo.rank]}}
            .prizemess
                //- span
                //-   | 天啊！
                //-   span(v-show='prizeInfo.nick') {{prizeInfo.nick | nameform}}
                //-   | 玩了一把就中奖啦！
                span 我中奖，你点赞，有钱大家一起赚！
        .headimgcontent
            .title
                .div.fl
                    img.fl(src="~@/assets/image/snatch/dzs.png")
                    span.fl 已获得{{prizeInfo.sharetime || 0}}个赞
                .div.fr.dzbtndiv
                    img.fr(src='~@/assets/image/snatch/dzbtn.png' @click='getSharePoint()')
            .headimage
              .content
                ul
                    li.fl(v-for="item in personList")
                        img(:src='item.point_icon')
        .message
            .div 打麻将，得奖券、赚积分、兑现金！
            .div 快来九点麻将一起愉快的玩耍吧！
        .imgbtn
            .weixin.fl
                img(src="~@/assets/image/snatch/qrcode.jpg")
            .download.fr
                .btn.btnandroid(@click="goDownload('andriod')")
                .btn.btnapple(@click="goDownload('apple')")
        .urlbox
            span www.twiceway.com
        .hbboxconten(v-show='hbbox')
        .hbbox(:class="gethbbox ? 'hbbox2': ''" v-show='hbbox')
          .hbdetail
            .hbclosebtn
              img(src='~@/assets/image/snatch/hbclose.png' @click='hbbox = false;gethbbox = false')
            .detail
              .headhb(:class="gethbbox ? 'headhbT': ''")
                img(:src='icon')
              .nickname(:class="gethbbox ? 'orange': ''")
                span {{nick | nameform}}
              .hbcount(v-show='gethbbox')
                span(v-show="isnewdown") 12.00
                span(v-show="!isnewdown") 2.00
              .messagehb(v-show="!gethbbox")
                span 大吉大利，送你九点红包！
              .openbtn.rotate(@click='gethbbox = true' v-show="!gethbbox")
                img(src="~@/assets/image/snatch/hbbtn.png")
              .checkOther(v-show="false")
                span 查看领取详情>>
              .checkdetailbtn(@click='goDownload()' v-show='gethbbox')
                img(src='~@/assets/image/snatch/hbgogame.png' style="height:1.2rem;")
</template>
<script>
  import userServerice from '@/service/userScircle'
  import LocalStorageService from '@/service/storage'
  import { getAccessCode } from '@/utils/tools'
  import { wxconfig } from '../../../../config/app'
  var queryString = require('querystring')
  export default {
    name: 'shareapp',
    data () {
      return {
        prizeInfo: {},
        personList: [],
        prizestr: ['未开奖', '一等奖', '二等奖', '三等奖', '四等奖', '五等奖', '六等奖', '幸运奖'],
        results: false,
        isDianz: false,
        isUserLost: false,
        isUserOwn: false,
        str: '',
        hbbox: false,
        imgUrl: '',
        gethbbox: false,
        isnewdown: false,
        nick: '九点客服',
        icon: 'http://www.twiceway.com/static/xueliu.png'
      }
    },
    created () {
      document.title = '九点娱乐--我的后台'
      var code = ''
      var str = location.href
      this.calcParam(str)
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var that = this
        getAccessCode(code).then(res => {
          setTimeout(function () {
            that.getPrizeInfo()
          }, 200)
        })
      }
    },
    methods: {
      getUserInfo (userid) {
        if (!userid) return
        userServerice.getUserIcon({userids: [userid]}).then(res => {
          if (res.status === 200 && res.data && res.data.errcode === 0) {
            var icon = res.data.users && res.data.users.length && res.data.users[0] && res.data.users[0].icon || ''
            if (icon) this.icon = icon
          }
        })
      },
      gotoActivity () {
        this.$router.push({ name: 'snatchstart' })
      },
      getwxshare () {
        var url = location.href.split('#')[0]
        var that = this
        userServerice.getJsconfig({urlstr: url}).then(res => {
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
      shareqrcode () {
        var wx = window.wx || {}
        this.param.from = 'shareappwx'
        // var title = '中了！！' + this.param.sectionuser + ' 中了 ' + this.param.baseprize + ' 元！！'
        var title = '我在九点麻将中了' + this.prizenow.baseprize + '元，请为我点赞！'
        // var desc = this.prizenow.nick + '在九点麻将中了' + this.prizenow.baseprize + '元，帮他点个赞吧！'
        var desc = '帮我点赞，抢现金红包！'
        var title2 = '我在九点麻将中了' + this.prizenow.baseprize + '元牌局红包，打开链接和我一起拆红包'
        var url = 'http://www.' + wxconfig.domain + '.com/#/snatch/wxshare?' + queryString.stringify(this.param)
        url = encodeURI(url)
        wx.onMenuShareAppMessage({
          title: title,
          text: '九点娱乐每周幸运大奖',
          desc: desc,
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
          title: title2,
          desc: desc,
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
      },
      calcParam (str) {
        var exec = 'shareapp?'
        str = str.substring(str.indexOf(exec) + 9)
        this.param = queryString.parse(str)
        this.nick = this.param.sectionuser || '九点客服'
        this.getwxshare()
        if (this.param.userid) this.getUserInfo(this.param.userid)
        console.log(this.param)
      },
      messageAlert (str, bolen) {
        this.$vux.alert.show({
          title: '提示',
          content: str
        })
      },
      getPrizeInfo () {
        var param = {
          sectionid: this.param.sectionid,
          prizeno: this.param.prizeno
        }
        userServerice.getPrizeInfo(param).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            console.log(this.prizeInfo)
            this.prizeInfo = res.data.prizeinfo
            this.personList = res.data.list
          }
        })
      },
      getSharePoint () {
        var param = {
          nowuserid: this.$store.state.wxToken.userid,
          userid: this.param.userid,
          sectionid: this.param.sectionid,
          prizeno: this.param.prizeno,
          nickname: this.$store.state.wxToken.unickname,
          headimgurl: this.$store.state.wxToken.uheadeimgurl
        }
        if (param.nowuserid && param.nowuserid === param.userid || this.isUserOwn) {
          this.messageAlert('对不起，你不能给自己点赞！')
          return false
        }
        if (this.isDianz) {
          this.messageAlert('你已经点过赞了！')
        }
        if (this.results) {
          this.messageAlert('正在响应..')
        }
        if (this.isUserLost) {
          this.messageAlert('当前用户消息已失效，请重新打开分享的链接进行点赞！')
        }
        this.results = true
        userServerice.getSharePoint(param).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.results = false
            this.isDianz = true
            this.getPrizeInfo()
            this.messageAlert('点赞成功！')
            this.hbbox = true
            if (res.data.isnewdown) this.isnewdown = true
            else this.isnewdown = false
          }
          if (res.status === 200 && res.data && res.data.errcode === 14) {
            this.messageAlert('你已经点过赞了！')
            this.isDianz = true
          }
          if (res.status === 200 && res.data && res.data.errcode === 99) {
            this.messageAlert('当前用户消息已失效，请重新打开分享的链接进行点赞！')
            this.isUserLost = true
          }
          if (res.status === 200 && res.data && res.data.errcode === 10) {
            this.isUserOwn = true
            this.messageAlert('对不起！你不能给自己点赞！')
          }
        })
      },
      goDownload (val) {
        if (!val) {
          if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            location.href = 'itms-services://?action=download-manifest&url=https://www.twiceway.com/zghmj.plist'
            this.$router.push({name: 'downloadios'})
          }
          if (navigator.userAgent.match(/android/i)) {
            this.$router.push({name: 'download'})
          }
          return
        }
        if (val === 'andriod') {
          this.$router.push({name: 'download'})
        } else {
          location.href = 'itms-services://?action=download-manifest&url=https://www.twiceway.com/zghmj.plist'
          this.$router.push({name: 'downloadios'})
        }
      }
    },
    filters: {
      nameform (val) {
        if (!val) return
        if (val.length > 6) {
          return val.substring(0, 6) + '...'
        } else return val
      }
    }
  }
</script>
<style lang="less">
    body {
        background:white;
    }
    * {
        box-sizing: border-box;
    }
    .shareapp {
        height: 100%;
        width: 100%;
        max-width: 720px;
        margin: 0 auto;
        background: url('~assets/image/snatch/prizelogobg.jpg');
        background-size: 100% 100%;
        position: relative;
        &  .hbboxconten {
          position:absolute;height:100%;width:100%;z-index:200;background:rgba(0,0,0,.3);top:0;left:0;
        }
        &  .hbbox{
          position: absolute;
          z-index: 477;
          height: 11rem;
          width: 8rem;
          top: 50%;
          left: 50%;
          background: url('~assets/image/snatch/hbbj.png');
          -webkit-transform: translate(-5rem, -5.5rem);
          transform: translate(-4rem, -5rem);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          &  .hbdetail {position:relative;height:100%;width:100%;
            &  .hbclosebtn {position:absolute;z-index:2;top:.4rem;right:.4rem;
              & img{height:.4rem}
            }
            &  .detail {
              & .headhb {height:2.5rem;padding-top:1rem;
                & img {height:1.5rem;width:1.5rem;border-radius:.2rem;}
              }
              & .hbcount{font-size: .8rem;margin-top: .2rem;margin-left: .4rem;font-weight: 600;color: #c3612f;}
              & .headhbT {height:3.5rem;padding-top:1.5rem;}
              & .nickname {font-size: .4rem;color: #fcf4a3;}
              & .orange {color: orange;}
              & .messagehb {line-height: .8rem;color: #f2b61c;}
              & .openbtn img {height: 2rem;margin-top: 2.3rem;}
              & .checkOther {padding-top: .5rem;color: #fdf483;}
              & .checkdetailbtn {padding-top:2rem;}
            }
          }
        }
        &  .hbbox2 {
          background: url('~assets/image/snatch/hbopen.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }
        &  .header {
            padding-top: .2rem;
            height: 3rem;
        }
        &  .messdetail {
            position: relative;
            width: 100%;
            height: 4.2rem;
            background:url('~assets/image/snatch/prizehead.png');
            background-size:100% 100%;
            &  .checkdetail {
              position: absolute;
              z-index: 2;
              top: .5rem;
              right: .5rem;
              & img {
                height:.4rem;
              }
            }
            &  .prize {
                font-size: .5rem;
                font-weight: 600;
                padding-top: .4rem;
                &  .contail {
                    height: 2.4rem;
                    width: 4.8rem;
                    margin: 0 auto;
                    background:url('~assets/image/snatch/mprize.png');
                    background-size: 100% 100%;
                    display: flex;
                    justify-content: center;
                    align-items: flex-end;
                }
            }
            &  .prizemess {
                height: 1rem;
                line-height: 1rem;
                font-weight: 600;
                font-size: .45rem;
                color: #ea3751;
            }
        }
        &  .headimgcontent {
            height: 4.6rem;
            width: 96%;
            margin: .1rem auto;
            background:url('~assets/image/snatch/prizepersonb.png');
            background-size:100% 100%;
            &  .title {
                height:1.6rem;
                padding-top: .3rem;
                &  .div {
                    height:1rem;line-height:1.2rem;text-align:left;color:#ffffda;padding-left:.2rem;
                    &  img {height:1rem;vertical-align: text-bottom;margin-right: .1rem;}
                    & span {font-size: .5rem;letter-spacing: .05rem;}
                }
                &  .dzbtndiv {
                   padding-right:.2rem;
                }
            }
            &  .headimage {
                width:100%;
                height:3rem;
                background:url('~assets/image/snatch/headerpenl.png');
                background-size:100% 100%;
                overflow:hidden;
                & .content {
                    height:100%;
                    overflow:auto;
                    padding-bottom: .2rem;
                }
                & ul {
                    height:100%;
                    overflow:auto;
                }
                & ul li {
                    height:1.4rem;
                    width:1.4rem;
                    margin: .2rem;
                    & img {
                        height:1.4rem;
                        width:1.4rem;
                        border-radius: 5px;
                    }
                }
            }
        }

        & .message, &  .urlbox {color: #f8e6cb;font-size: .4rem;background:#ae3441}

        &  .imgbtn {
           height: 2.2rem;
           padding: .1rem 1rem;
           background:#ae3441;
           display: flex;
           justify-content: space-around;
          &  .weixin {
            height: 2rem;
            width: 2rem;
            margin-right:.5rem;
          }
          & .download {
            padding-top: .1rem;
            & .btn {
                height:.8rem;
                width:2.4rem;
            }
            & .btnandroid {
                background: url('~assets/image/snatch/AndroidDownload.png');
                background-size: 100% 100%;
            }
            & .btnapple {
                margin-top:.2rem;
                background: url('~assets/image/snatch/appledownload.png');
                background-size: 100% 100%;
            }
          }
        }
    }
    .rotate{
        -webkit-animation: anim .6s infinite alternate;
            -ms-animation: anim .6s infinite alternate;
                animation: anim .6s infinite alternate;
    }
    @-webkit-keyframes anim {
        from { -webkit-transform: rotateY(180deg); }
        to { -webkit-transform: rotateY(360deg); }
    }
    @-ms-keyframes anim {
        from { -ms-transform: rotateY(180deg); }
        to { -ms-transform: rotateY(360deg); }
    }
    @keyframes anim {
        from { transform: rotateY(180deg); }
        to { transform: rotateY(360deg); }
    }
</style>
