<template lang="pug">
  .container
</template>
<script>
  var querystring = require('querystring')
  import { wxconfig } from '../../../../config/app'
  export default {
    name: 'wxshare',
    data () {
      return {
        url: ''
      }
    },
    created () {
      this.url = location.href
      var exec = 'wxshare?'
      var str = decodeURI(location.href)
      str = str.substring(str.indexOf(exec) + 8)
      var model = 'fromsharecircle'
      var appmodel = 'shareappwx'
      var param = {
        appid: wxconfig.appid,
        response_type: 'code',
        scope: 'snsapi_userinfo',
        state: '1'
      }
      if (str && str.length && (location.href.indexOf(model) !== -1)) {
        param.redirect_uri = 'http://www.' + wxconfig.domain + '.com/#/snatch/sharecircle?' + str
      }
      if (str && str.length && (location.href.indexOf(appmodel) !== -1)) {
        param.redirect_uri = 'http://www.' + wxconfig.domain + '.com/#/snatch/shareapp?' + str
      }
      var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + querystring.stringify(param) + '#wechat_redirect'
      location.href = url
    }
  }
</script>
