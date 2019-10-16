<template>
  <div class="content" id="showimgbox">
    <div id="showimg" style="height:100%;">
      <loading v-model="loading" style="position:absolute;z-index:99999"></loading>
      <img style="height:100%;width:100%" src="~@/assets/image/qrcode.jpg">
      <div class='qrcodebox'>
        <div class="qrcodeimg" v-show='!showimg2'>
          <transition name="slide-fade" tag="div">
            <vue-qr :logoSrc='logsrc' :text='urltext' :dotScale="0.8" :logoMargin="5" :margin="20" class="qrcode" v-show="urltext" :callback="checkurl"></vue-qr>
          </transition>
        </div>
        <div class="qrcodeimg" v-show='showimg2'>
          <transition name="slide-fade" tag="div">
            <img :src="imgUrl" alt="" style="border-radius:30px;">
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
<!--     <vue-qr :logoSrc='logsrc' :text='urltext' dotScale="0.8" logoMargin="5" margin="20" class="qrcode" v-show="urltext"></vue-qr> -->
  </div>
</template>
<script>
  import { Group, Loading } from 'vux'
  import { getAccessCode } from '@/utils/tools'
  import dudutool from '@/service/dudutool'
  // var url = require('url')
  import { calcrem } from '@/utils/common'
  import LocalStorageService from '@/service/storage'
  var html2canvas = require('html2canvas')
  calcrem()
  export default {
    name: 'myqrcode',
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
        var time = new Date().getTime()
        var store = LocalStorageService.get('storeState')
        var qrcode = LocalStorageService.get('qrcode')
        if (store) that.$store.commit('setstore', store)
        if (!store || !store.userid || !store.expris || (time - store.expris) / (1000 * 60) > 30) {
          getAccessCode(code).then(res => {
            that.getBaseUse(that, qrcode)
          })
        } else {
          that.getBaseUse(that, qrcode)
        }
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
        this.imgUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + encodeURIComponent(this.ticket)
        setTimeout(function () {
          that.getSetweixinImg()
        }, 500)
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
