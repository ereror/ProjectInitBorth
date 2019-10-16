<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { Loading } from 'vux'
import circleService from '@/service/userScircle'
import { wxconfig } from '../config/app'
export default {
  name: 'app',
  components: {
    Loading
  },
  mounted () {
    console.log('%O', window.history)
    this.getwxshare()
  },
  computed: {
    isLoading () {
      return this.$store.state.loading.isLoading
    }
  },
  methods: {
    getwxshare () {
      var url = location.href.split('#')[0]
      if (url.indexOf('?') !== -1) url = url.substring(0, url.indexOf('?'))
      circleService.getJsconfig({urlstr: url}).then(res => {
        if (res.status === 200 && res.data && res.data.errcode === 0) {
          var wx = window.wx || {}
          wx.config({
            debug: false,
            appId: wxconfig.appid,
            timestamp: res.data.timestamp,
            nonceStr: res.data.noncestr,
            signature: res.data.signature,
            jsApiList: ['chooseImage', 'onMenuShareAppMessage', 'hideOptionMenu', 'showOptionMenu', 'onMenuShareTimeline']
          })
          wx.ready(function () {
            wx.hideOptionMenu()
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
html, body, #app {
  height:100%;
  width:100%;
  overflow: hidden;
}
#app {overflow: auto;}
body {
  background-color: #fbf9fe;
}
</style>
