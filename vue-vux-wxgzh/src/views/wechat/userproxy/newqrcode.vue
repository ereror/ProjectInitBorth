<template lang='pug'>
  div.content#showimgbox
    div#showimg(style="height:100%;" v-if='isagent')
      loading(v-model="loading" style="position:absolute;z-index:99999")
      img(style="height:100%;width:100%" src="~@/assets/image/zsqrcode.jpg" id='bjsrc')
      div.qrcodebox
        div.qrcodeimg
          qrcode(:value="urltext" class="qrcode" type="img")
          //- img(:src="imgUrl",  id='qrcodeimg' v-show='false')
          //- img(:src="imgSrc", class="qrcode" id='qrcodeimgsrc')
        div(style='text-align:center;color:white;padding:.2rem;font-family: cursive;font-size:.4rem;')
          span 按住二维码&nbsp;&nbsp;识别下载
        div.qrcodetext
          ul
            li 下载即送抽奖机会
            li 玩游戏送红包
            li 随时可兑换
        div.message(style='text-align:center;padding-top:10px;')
          span {{nickname}}的专属二维码
    div.isnoagent(style='padding:.4rem;padding-top:1rem;text-align: center;' v-if='!isagent')
        span(style='font-size:.4rem;') 你当前不是推广员，请联系客服(微信号jdmj_kefu1)！
</template>
<script>
  import { Group, Loading, Qrcode } from 'vux'
  import { getAccessCode } from '@/utils/tools'
  import dudutool from '@/service/dudutool'
  // var url = require('url')
  import { calcrem } from '@/utils/common'
  import LocalStorageService from '@/service/storage'
  var html2canvas = require('html2canvas')
  calcrem()
  export default {
    name: 'newqrcode',
    components: {
      Group,
      Loading,
      Qrcode
    },
    data () {
      return {
        isweixin: false,
        urltext: '',
        imgUrl: '',
        loading: false,
        imgDataURI: '',
        imgCodeURI: '',
        imgmodel: false,
        showimg2: false,
        imgSrc: ''
      }
    },
    computed: {
      userid () {
        return this.$store.state.wxToken.userid
      },
      isagent () {
        return this.$store.state.wxToken.isagent
      },
      nickname () {
        return this.$store.state.wxToken.unickname
      },
      logsrc () {
        return this.$store.state.wxToken.uheadeimgurl
      }
    },
    created () {
      document.title = '专属二维码'
      var code = ''
      // var state = ''
      var str = location.href
      var mcode = /(?:code=)(\w*)/ig
      // var mstate = /(?:state=)(\w*)/ig
      var resultc = str.match(mcode)
      // var results = str.match(mstate)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      // if(results.length) state =  results[0].substring(6)
      // var arg = url.parse(location.href, true).query
      if (code) {
        var that = this
        var store = LocalStorageService.get('storeState')
        var qrcode = LocalStorageService.get('qrcode')
        if (store) that.$store.commit('setstore', store)
        getAccessCode(code).then(res => {
          that.getBaseUse(that, qrcode)
        })
      }
    },
    methods: {
      checkurl (val) {
        console.log('二维码生成成功！')
        this.imgmodel = true
      },
      img2base64 (img) {
        var canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        var dataURL = canvas.toDataURL()
        return dataURL
      },
      qrcodeyes () {
        alert('二维码生成成功')
      },
      judgeqrcode (qrcode) {
        if (qrcode) {
          var expire = qrcode.expire
          var nowtime = new Date().getTime()
          if (nowtime - expire >= 2592000 * 1000) {
            this.postCode()
          } else {
            this.urltext = qrcode.url
            this.logsrc = qrcode.imgUrl
            this.ticket = qrcode.ticket
            var that = this
            setTimeout(function () {
              that.getCodewe()
            })
          }
        }
      },
      getBaseUse (that, qrcode) {
        this.urltext = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx6a4658a3d166e6c8&redirect_uri=http%3A%2F%2Fwww.9diangame.com%2F%23%2Fdownload%3Fuserid%3D' + this.userid + '&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect'
        this.getCodewe()
      },
      getCodewe () {
        var that = this
        this.imgUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + encodeURIComponent(this.ticket)
        setTimeout(function () {
          that.imgmodel = true
          that.copey()
        }, 2000)
        // img.onload = function () {
        //   that.imgSrc = that.img2base64(img)
        //   var liimg = document.getElementById('qrcodeimgsrc')
        //   liimg.onload = function () {
        //     that.imgmodel = true
        //     that.copy2()
        //   }
        // }
      },
      getSetweixinImg () {
        if (!this.imgmodel) this.showimg2 = true
      },
      postCode () {
        this.loading = true
        // dudutool.getInfo({userid: this.$store.state.wxToken.userinfoid, info: 8})
        var param = {'expire_seconds': 2592000, 'action_name': 'QR_STR_SCENE', 'action_info': {'scene': {'scene_str': this.$store.state.wxToken.accesswxToken + '==' + this.$store.state.wxToken.userid}}}
        dudutool.postCode(param).then(res => {
          this.loading = false
          if (res.status === 200 && res.data) {
            this.ticket = res.data.ticket
            this.urltext = res.data.url
            res.data.expire = new Date().getTime()
            res.data.imgUrl = this.logsrc
            res.data.userid = this.$store.state.wxToken.userid
            LocalStorageService.set('qrcode', JSON.stringify(res.data))
            var that = this
            setTimeout(function () {
              that.getCodewe()
            })
          } else {
            alert('二维码生成失败，请刷新页面重新获取')
            return
          }
        })
      },
      copy2 () {
        var canvas = document.createElement('canvas')
        var w = document.body.scrollWidth
        var h = document.body.scrollHeight
        var that = this
        canvas.width = w * 2
        canvas.height = h * 2
        canvas.style.width = w + 'px'
        canvas.style.height = h + 'px'
        var context = canvas.getContext('2d')
         // 然后将画布缩放，将图像放大两倍画到画布上
        context.scale(2, 2)
        html2canvas(document.getElementById('showimg')).then(canvas => {
          var img = new Image()
          that.imgDataURI = canvas.toDataURL('image/png')
          img.src = that.imgDataURI
          var div = document.createElement(div)
          // img.width = document.body.scrollWidth
          // img.height = document.body.scrollHeight
          div.appendChild(img)
          document.getElementById('showimg').innerHTML = ''
          document.getElementById('showimg').appendChild(div)
          // document.getElementById('showimgbox').removeChild(document.getElementById('showimg'))
        })
      },
      copey () {
        var canvas = document.createElement('canvas')
        var w = document.body.scrollWidth
        var h = document.body.scrollHeight
        var that = this
        canvas.width = w * 2
        canvas.height = h * 2
        canvas.style.width = w + 'px'
        canvas.style.height = h + 'px'
        var context = canvas.getContext('2d')
         // 然后将画布缩放，将图像放大两倍画到画布上
        context.scale(2, 2)
        html2canvas(document.getElementById('showimgbox'), {
          canvas: canvas,
          // useCORS: true,
          onrendered: function (canvas) {
            // document.getElementById('showimg').innerHTML = ''
            var img = new Image()
            that.imgDataURI = canvas.toDataURL('image/png')
            img.src = that.imgDataURI
            img.width = document.body.scrollWidth
            img.height = document.body.scrollHeight
            var div = document.createElement(div)
            div.appendChild(img)
            if (that.imgmodel) {
              document.getElementById('showimgbox').removeChild(document.getElementById('showimg'))
              document.getElementById('showimgbox').appendChild(div)
            } else {
              that.showimg2 = true
            }
          }
        })
      }
    },
    filters: {
      nicknamefunc (val) {
        if (!val) return val
        else return '用户'
      },
      logsrcfunc (val) {
        if (!val) return val
        else return this.imgUrl
      }
    }
  }
</script>
<style scoped lang='less'>
  body {
    padding:0;
    margin:0;
  }
  .content{
    height: 100%;
    width: 100%;
  }
  .itemcontent {
    padding:2em 0;
  }
  .title {
    width:60%;
    margin:0 auto;
    text-align:center;
    padding:1.5em 0;
    font-weight:bolder;
    font-size:1.1em;
  }
  .itemli {
    width:60%;
    margin:0 auto;
    & li {
      text-align: left
    }
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active 在低于 2.1.8 版本中 */ {
    transform: rotate(90deg);
    transform-origin:20 20;
    opacity: 0;
  }
  .qrcodebox {
    position:absolute;
    z-index:2;
    top:50%;
    left:50%;
    transform:translateX(-50%) translateY(-50%);
    height:8rem;
    width:8rem;
    margin-top:2rem;
  }
  .qrcodeimg {
    height: 5rem;
    width: 5rem;
    padding: .4rem;
    background: #fff;
    margin: 0 auto;
  }
  .qrcodetext {
    color:#ffbe00;
    font-size:.45rem;
    padding:0 1em;
    & ul li {
    text-align: center;
    font-size: .5rem;
    font-weight: bolder;
    font-family: cursive;
    }
  }
</style>
<style lang='less'>
  .qrcode{
    & img, & canvas {
      width: 5.6rem;
      height: 5.6rem;
      transition: all .5s;
    }
  }
</style>
