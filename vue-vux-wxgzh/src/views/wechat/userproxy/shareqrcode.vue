<template>
  <div class="content" id="showimgbox">
    <div id="showimg" style="height:100%;">
      <loading v-model="loading" style="position:absolute;z-index:99999"></loading>
      <img style="height:100%;width:100%" src="~@/assets/image/qrcode.jpg">
      <div class='qrcodebox'>
        <div class="qrcodeimg qrcode">
          <transition name="slide-fade" tag="div">
              <img id="imgbox">
          </transition>
        </div>
        <div class="qrcodetext">
          <ul>
            <li>请长按二维码识别或发送给朋友</li>
            <li>加入九点麻将，与我一起耍吧</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { Group, Loading } from 'vux'
  import { getAccessCode } from '@/utils/tools'
  import dudutool from '@/service/dudutool'
  // var url = require('url')
  import { calcrem } from '@/utils/common'
  import LocalStorageService from '@/service/storage'
  // import AwesomeQRCode from 'awesome-qr'
  var html2canvas = require('html2canvas')
  calcrem()
  export default {
    name: 'shareqrcode',
    components: {
      Group,
      Loading
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
        showimg2: false
      }
    },
    computed: {
      nickname () {
        return this.$store.state.wxToken.unickname || '用户'
      },
      logsrc () {
        var logsrc2 = this.$store.state.wxToken.uheadeimgurl || this.imgUrl
        return logsrc2
      }
    },
    mounted () {
      document.title = '专属二维码'
      this.hidemenu()
      var code = ''
      var str = location.href
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var time = new Date().getTime()
        var store = LocalStorageService.get('storeState')
        if (store) this.$store.commit('setstore', store)
        var qrcode = LocalStorageService.get('qrcode')
        if (!store || !store.userid || !store.expris || (time - store.expris) / (1000 * 60) > 30) {
          getAccessCode(code).then(res => {
            this.getBaseUse(this, qrcode)
          })
        }
      }
    },
    methods: {
      hidemenu () {
        function onBridgeReady () {
          var WeixinJSBridge = WeixinJSBridge || window.WeixinJSBridge
          WeixinJSBridge.call('hideOptionMenu')
        }
        if (typeof WeixinJSBridge === 'undefined') {
          if (document.addEventListener) {
            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false)
          } else if (document.attachEvent) {
            document.attachEvent('WeixinJSBridgeReady', onBridgeReady)
            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady)
          }
        } else {
          onBridgeReady()
        }
      },
      render (text, logimg) {
        // var that = this
        const logoImg = new Image()
        logoImg.onload = function () {
          createQrCode(text, logoImg)
        }
        logoImg.crossOrigin = 'anonymous'
        logoImg.src = this.logsrc
        function createQrCode (text, logoImg) {
          // new AwesomeQRCode().create({
          //   text: text,
          //   size: 200,
          //   margin: 20,
          //   colorDark: '#000000',
          //   colorLight: '#FFFFFF',
          //   backgroundDimming: 'rgba(0,0,0,0)',
          //   logoImage: logoImg,
          //   logoScale: 0.2,
          //   logoMargin: 5,
          //   logoCornerRadius: 8,
          //   whiteMargin: true,
          //   dotScale: 0.8,
          //   autoColor: true,
          //   binarize: false,
          //   binarizeThreshold: 128,
          //   callback: function () {
          //     that.imgmodel = true
          //   },
          //   bindElement: 'imgbox'
          // })
        }
      },
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
        var dataURL = canvas.toDataURL('image/png')
        alert(dataURL)
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
            this.render(this.urltext, this.logsrc)
            var that = this
            setTimeout(function () {
              that.getCodewe()
            })
          }
        }
      },
      getBaseUse (that, qrcode) {
        that.postCode()
      },
      getCodewe () {
        var that = this
        // ---------------------------------------------(1)
        // var img = new Image()
        // img.src = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + encodeURIComponent(this.ticket)
        // img.addEventListener('load', function () {
        //   var base64 = that.img2base64(img)
        //   that.imgCodeURI = base64
        //   that.loading = false
        //   setTimeout(function () {
        //     that.copey()
        //   }, 500)
        // }, false)
        // ---------------------------------------------(1)
        // ---------------------------------------------(2)
        // var img = document.getElementById('qrimg')
        // img.onload = function () {
        //   var canvas = document.createElement('canvas')
        //   var context = canvas.getContext('2d')
        //   canvas.width = img.width * 2
        //   canvas.height = img.height * 2
        //   context.scale(1, 1)
        //    // 坐标(0,0) 表示从此处开始绘制，相当于偏移
        //   canvas.getContext('2d').drawImage(img, 0, 0)
        //   that.imgCodeURI = canvas.toDataURL('image/png')
        //   that.loading = false
        //   setTimeout(function () {
        //     that.copey()
        //   }, 500)
        // }
        this.imgUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + encodeURIComponent(this.ticket)
        // ---------------------------------------------(2)
        // ---------------------------------------------(3)
        // var img = document.getElementById('qrimg')
        // var that = this
        // img.onload = function () {
        //   var canvas = document.createElement('canvas')
        //   canvas.width = img.width
        //   canvas.height = img.height
        //    // 坐标(0,0) 表示从此处开始绘制，相当于偏移
        //   canvas.getContext('2d').drawImage(img, 0, 0)
        //   that.imgUrl = canvas.toDataURL('image/png')
        //   setTimeout(function () {
        //     that.copey()
        //   }, 500)
        // }
        // ---------------------------------------------(3)
        setTimeout(function () {
          that.copey()
        }, 500)
      },
      postCode () {
        this.loading = true
        // dudutool.getInfo({userid: this.$store.state.wxToken.userinfoid, info: 8})
        var param = {'expire_seconds': 2592000, 'action_name': 'QR_STR_SCENE', 'action_info': {'scene': {'scene_str': this.$store.state.wxToken.accesswxToken + '==' + this.$store.state.wxToken.userid}}}
        dudutool.postCode(param).then(res => {
          this.loading = false
          if (res.status === 200 && res.data && !res.data.errcode) {
            // dudutool.getInfo({userid: this.$store.state.wxToken.userinfoid, info: 10})
            this.ticket = res.data.ticket
            this.urltext = res.data.url
            this.render(this.urltext, this.logsrc)
            res.data.expire = new Date().getTime()
            res.data.imgUrl = this.logsrc
            res.data.userid = this.$store.state.wxToken.userid
            LocalStorageService.set('qrcode', JSON.stringify(res.data))
            var that = this
            setTimeout(function () {
              that.getCodewe()
              // dudutool.getInfo({userid: that.$store.state.wxToken.userinfoid, info: 11})
            })
          } else {
            alert('二维码生成失败，请刷新页面重新获取')
          }
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
        this.loading = false
        html2canvas(document.body, {
          canvas: canvas,
          onrendered: function (canvas) {
            // document.getElementById('showimg').innerHTML = ''
            var img = new Image()
            that.imgDataURI = canvas.toDataURL('image/png')
            img.src = that.imgDataURI
            var div = document.createElement(div)
            div.appendChild(img)
            if (that.imgmodel) {
              document.getElementById('showimgbox').insertBefore(div, document.getElementById('showimg'))
              document.getElementById('showimgbox').removeChild(document.getElementById('showimg'))
            } else {
              that.showimg2 = true
            }
          }
        })
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
    height:10rem;
    width:8rem;
    margin-top:2rem;
  }
  .qrcodeimg {
    background:url('~assets/image/qrcodeimg.jpg');
    background-size: cover;
    height:8rem;
    width:8rem;
    padding:1.2rem;
  }
  .qrcodetext {
    height:2rem;
    color:white;
    font-size:.45rem;
    padding:0 1em;
    & ul li {
      text-align: left;
    }
  }
</style>
<style lang='less'>
  .qrcode{
    & img, & canvas {
      width: 5.6rem;
      height: 5.6rem;
      border-radius:30px;
      transition: all .5s;
    }
  }
</style>
