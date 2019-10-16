<template>
  <div style="height:100%;width:100%;">
      <group id="openapp" v-show="false">点击下面链接打开应用</group>
      <div style="position:relative;height:100%;width:100%" v-show="isweixin && !download">
          <img src="~@/assets/image/jiudian.jpg" style="height:100%">
          <div style="position:absolute;z-index:2;top:50%;margin:0 auto;padding:0 3em;width:100%;height:200px;transform: translateY(-50%);">
            <table style="width:100%;height:100%;font-size:1.4em;color:#9d2b2b;font-weight:600;max-width:400px;margin:0 auto">
              <tr>
                <td colspan='2' style="text-align:center;">房间号&nbsp;
                 <span v-show='opt.roomid'> {{opt.roomid}}</span>
                </td>
<!--                 <td>圈子<span v-show='opt.roomid'> {{opt.teamname}}</span></td> -->
              </tr>
              <tr>
                <td><span v-show='opt.gametype'> {{opt.gametype}}</span></td>
                <td><span v-show='opt.fangka'> {{opt.fangka}}</span></td>
              </tr>
              <tr>
                <td><span v-show='opt.fan'> {{opt.fan + '番'}}</span></td>
                <td><span v-show='opt.paytype'> {{opt.paytype}}</span></td>
              </tr>
            </table>
          </div>
      </div>
      <div v-show="false">
        <a class='btn' style="display:block;font-size:30px;" download="九点麻将.apk" :href="downloadapkurl"> 下载游戏 </a>
        <span class='btn' style="display:block;font-size:30px;" @click="openGame()"> 打开游戏 </span>
      </div>
      <div style="position:relative;height:100%;width:100%" v-show="!isweixin && download">
          <img src="~@/assets/image/jiudianDownLoad.png" style="height:100%;width:100%">
          <div style="position:absolute;z-index:2;top:62%;margin:0 auto;padding:3em;width:100%;transform: translateY(-50%);">
            <img src="~@/assets/image/openroom.png" alt="" @click='openGame()' style="height:60px;width:auto" v-show="!isopen && !iosStatus">
            <img src="~@/assets/image/download.png" style="height:60px;margin-top:10px;width:auto" v-show="!isopen && !iosStatus" @click="downloadFile()" id='downloadAndriod'>
            <a :href='iosurl' id="openiosbtn" v-show="!isopen && iosStatus"> 
              <img src="~@/assets/image/openroom.png" alt="" style="height:60px">
            </a>
            <a id="openiosbtn2" v-show="!isopen && iosStatus" @click="downloadfunc()"> 
              <img src="~@/assets/image/download.png" alt="" style="height:60px">
            </a>
            <img src="~@/assets/image/download.png" style="height:60px" v-show="isopen && !iosStatus" @click="downloadFile()">
            <a download="九点麻将.apk" v-show="isopen && iosStatus" @click="downloadfunc()">
              <img src="~@/assets/image/download.png" style="height:60px">
            </a>
          </div>
      </div>
  </div>
</template>
<script type="text/javascript">
  var _hmt = _hmt || []
  var _bdhmProtocol = ((document.location.protocol === 'https:') ? ' https://' : ' http://')
  document.write(unescape('%3Cscript src=' + _bdhmProtocol + '"hm.baidu.com/h.js%3F01234567890ABCDEF01234567890ABCDEF" type="text/javascript"%3E%3C/script%3E'))
</script>
<script>
  import { isfrom } from '@/utils/common'
  import { Group } from 'vux'
  import { wxconfig } from '../../../config/app'
  import circleService from '@/service/userScircle'
  export default {
    name: 'openapp',
    components: {
      Group
    },
    data () {
      return {
        isweixin: false,
        optarr: [],
        opt: {},
        download: false,
        isopen: false,
        iosStatus: false,
        iosurl: '',
        downloadapkurl: 'http://game.twiceway.com/majiang9d.apk'
      }
    },
    created () {
      var str = location.href
      var fromcode = /(?:coming=)(\w*)/ig
      var formtc = str.match(fromcode)
      var formtcs = formtc && formtc.length && formtc[0].substring(7) || 0
      if (formtcs) _hmt.push(['_trackEvent', formtcs, '浏览器访问下载页'])
      _hmt.push(['_trackEvent', '页面统计', '浏览器访问下载页'])
      document.title = '九点麻将'
      var that = this
      setTimeout(() => {
        that.getwxshare()
      }, 500)
      this.downloadapkurl = 'http://game.' + wxconfig.domain + '.com/majiang9d.apk'
      var arg = location.href.indexOf('?frommenu=download') === -1 && location.href.indexOf('openapp?data=') !== -1 && decodeURI(location.href.substring(location.href.indexOf('openapp?data=') + 13))
      this.arg = location.href.indexOf('?frommenu=download') === -1 && location.href.indexOf('openapp?data=') !== -1 && location.href.substring(location.href.indexOf('openapp?data=') + 13)
      if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        this.iosStatus = true
        this.iosurl = 'https://www.twiceway.com/openwith' + this.arg
      }
      if (!arg) {
        this.download = true
      } else {
        try {
          arg = arg.replace(/%3A/g, ':')
          arg = arg.replace(/"/g, '')
          arg = arg.substring(1, arg.length - 1)
          this.opt = {}
          var opeanappArr = arg.split(',')
          opeanappArr.map(v => {
            var temparr = v.split(':')
            this.opt[temparr[0]] = temparr[1]
          })
          console.log(this.opt)
        } catch (e) {
          throw new Error(e)
        }
      }
      var isfromw = isfrom()
      if (isfromw.ifWeixin) {
        this.isweixin = true
      } else {
        this.download = true
        if (location.href.indexOf('?frommenu=download') !== -1) {
          this.isopen = true
        }
        if (location.href.indexOf('?frommenu=open') !== -1) {
          this.isopen = false
        }
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
        // url = url.replace('mahjong9d', 'www')
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
            })
          }
        })
      },
      downloadfunc () {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          // 跳转苹果下载地址
          _hmt.push(['_trackEvent', '下载统计', '苹果下载'])
          location.href = 'itms-services://?action=download-manifest&url=https://www.twiceway.com/9dmj.plist'
          this.$router.push({name: 'downloadios'})
        }
        if (navigator.userAgent.match(/android/i)) {
          _hmt.push(['_trackEvent', '下载统计', '安卓下载'])
          this.downloadFile()
        }
      },
      downloadFile (src) {
        src = src || this.downloadapkurl
        var $a = document.createElement('a')
        $a.setAttribute('href', src)
        $a.setAttribute('download', '九点麻将.apk')
        var evObj = document.createEvent('MouseEvents')
        evObj.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null)
        $a.dispatchEvent(evObj)
      },
      openios () {
        document.getElementById('openiosbtn').click()
      },
      openGame () {
        var args = this.arg || ''
        var url = {
          iosApp: 'https://www.twiceway.com/openwith' + args,
          androidApp: 'mahjong9d://twiceway.com/openwith' + args,
          iosDownload: '',
          androidDownload: ''
        }
        this.iosurl = url.iosApp
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
          this.openios()
        }
        if (navigator.userAgent.match(/android/i)) {
          location.href = url.androidApp
        }
      },
      checkIsOpen (url) {
        var ifr = document.createElement('iframe')
        ifr.src = url
        ifr.style.display = 'none'
        document.body.appendChild(ifr)
        window.setTimeout(function () {
          document.body.removeChild(ifr)
        }, 1000)
      }
    }
  }
</script>
<style scoped>
  table tr td {
    text-align: left;
  }
</style>
