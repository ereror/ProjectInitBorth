<template>
  <div style="height:100%;width:100%;" v-show="isweixin">
    <img src="~@/assets/image/jiudiangamenew.png" alt="" style="height:100%;width:100%">
  </div>
</template>
<script type="text/javascript">
  var _hmt = _hmt || []
  var _bdhmProtocol = ((document.location.protocol === 'https:') ? ' https://' : ' http://')
  document.write(unescape('%3Cscript src=' + _bdhmProtocol + '"hm.baidu.com/h.js%3F01234567890ABCDEF01234567890ABCDEF" type="text/javascript"%3E%3C/script%3E'))
</script>
<script>
  import { isfrom } from '@/utils/common'
  import circleService from '@/service/userScircle'
  import { wxconfig } from '../../../config/app'
  import LocalStorageService from '@/service/storage'
  import { getAccessCode } from '@/utils/tools'
  export default {
    name: 'download',
    data () {
      return {
        isweixin: true,
        code: '',
        fromtc: ''
      }
    },
    created () {
      document.title = '九点麻将'
      var that = this
      setTimeout(function () {
        that.getwxshare()
      }, 500)
      var code = ''
      var str = location.href
      var open = this.$route.params && this.$route.params.open
      if (str.indexOf('openagin') !== -1 || open) {
        this.godownload()
        return
      }
      var mcode = /(?:code=)(\w*)/ig
      var uidmcode = /(?:userid=)(\w*)/ig
      var sharecode = /(?:share=)(\w*)/ig
      var fromcode = /(?:coming=)(\w*)/ig
      var fromcode2 = /(?:from=)(\w*)/ig
      // var mstate = /(?:state=)(\w*)/ig
      var resultc = str.match(mcode)
      var uidresultc = str.match(uidmcode)
      var shareltc = str.match(sharecode)
      var formtc = str.match(fromcode)
      var formtc2 = str.match(fromcode2)
      var agent = uidresultc && uidresultc.length && uidresultc[0].substring(7) || 0
      var share = shareltc && shareltc.length && shareltc[0].substring(6) || 0
      var formtcs = formtc && formtc.length && formtc[0].substring(7) || 0
      var formtcs2 = formtc2 && formtc2.length && formtc2[0].substring(5) || 0
      this.fromtc = formtcs || formtcs2
      if (resultc && resultc.length) code = resultc[0].substring(5)
      // if(results.length) state =  results[0].substring(6)
      // var arg = url.parse(location.href, true).query
      if (code) {
        this.code = code
        var store = LocalStorageService.get('storeState')
        if (store) that.$store.commit('setstore', store)
        getAccessCode(code, agent, share, formtcs).then(res => {
          this.godownload()
        })
      } else {
        this.godownload()
      }
    },
    computed: {
      userid () {
        return this.$store.state.wxToken.userid
      }
    },
    methods: {
      saveUser (userid) {
        var temp = {
          userid: this.userid,
          agent: userid
        }
        circleService.saveUserbyscan(temp).then(res => {
          if (res.status === 200 && res.data && res.data.errcode === 0) {
            alert('建立上下级关系成功!')
            this.godownload()
          }
        })
      },
      godownload () {
        var isfromw = isfrom()
        // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        //   // location.href = 'https://itunes.apple.com/cn/app/%E4%B9%9D%E7%82%B9%E5%9B%9B%E5%B7%9D%E9%BA%BB%E5%B0%86/id1304829018?mt=8'
        //   location.href = 'itms-services://?action=download-manifest&url=https://www.twiceway.com/9dmj.plist'
        //   this.$router.push({name: 'downloadios'})
        //   return
        // }
        var open = this.$route.params && this.$route.params.open
        if (isfromw.ifWeixin && this.code) {
          // location.href = 'http://www.' + wxconfig.domain + '.com/#/download'\
          if (this.fromtc) _hmt.push(['_trackEvent', this.fromtc, '微信访问下载页'])
          _hmt.push(['_trackEvent', '页面统计', '微信访问下载页'])
          location.hash = '#/download?openagin'
        }
        if (!isfromw.ifWeixin) {
          this.isweixin = false
          var str = ''
          if (this.fromtc) str = '&coming=' + this.fromtc
          if (!open) location.hash = '#/openapp?frommenu=download' + str
          else location.hash = '#/openapp?frommenu=open' + str
        }
      },
      getwxshare () {
        var url = location.href.split('#')[0]
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
      }
    }
  }
</script>
