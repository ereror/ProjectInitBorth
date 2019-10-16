<template>
  <div style="">
    <blur :blur-amount=40 :url="url">
      <p class="center"><img :src="url"></p>
      <p class="center" @click="check">admin</p>
    </blur>
    <div>
      <a :href="ahref">ios测试</a>
      <span>{{ahref}}</span>
      <span>=================</span>
      <a :href='downloadurl'>下载游戏测试</a>
    </div>
   <div>
    <group>
      <cell title="用户信息"  value=""></cell>
      <cell-form-preview :list="listNew"></cell-form-preview>
    </group>
    <group class="checkbtn">
      <span @click="getMenu">获取菜单</span>
      <span @click="setMenu">创建菜单</span>
      <span @click="deleteMenu">删除菜单</span>
      <span @click="getAccessCode()">获取code对应的access_token</span>
      <span @click="getUserInfo">获取用户信息</span>
      <span @click="saveUserInfo">保存用户信息</span>
      <span @click="shareUserInfo">分享当前消息</span>
      <span @click="postCode">发送二维码事件</span>
      <span @click="getCodewe">获取二维码时间</span>
      <span @click="getToken">获取token</span>
      <span @click="getTokenNew">刷新token值</span>
      <span @click="getTuwen">获取图文素材</span>
      <span @click="saveimg">将网络图片保存报道本地</span>
    </group>
    <group v-show="!isweixin">
      <textarea v-model="menu"></textarea>
    </group>
    <vue-qr :logoSrc='src2' :text='urltext' height="200" width="200" dotScale="0.8" logoMargin="5" margin="20" class="qrcode"></vue-qr>
    <img :src="imgUrl" v-show="!isweixin">

  </div>
<!--     <flexbox :gutter="0">
      <flexbox-item v-for="(img, index) in images" :key="index"><img :src="img" style="width:100%" @click="url = img"/></flexbox-item>
    </flexbox> -->
  </div>
</template>
<script>

  import { Flexbox, FlexboxItem, Blur, CellFormPreview, Group, Cell } from 'vux'
  import userService from '@/service/userServerice'
  import tool from '@/service/tool'
  import dudutool from '@/service/dudutool'
  import { getAccessCode } from '@/utils/tools'
  import LocalStorageService from '@/service/storage'
  import { isfrom } from '@/utils/common'
  var querystring = require('querystring')
  import { wxconfig } from '../../../config/app'
  export default {
    name: 'wechat',
    components: {
      Blur,
      Flexbox,
      FlexboxItem,
      CellFormPreview,
      Group,
      Cell
    },
    data () {
      return {
        userData: {},
        menu: '',
        isweixin: false,
        downloadurl: 'itms-services://?action=download-manifest&url=https://www.twiceway.com/zghmj.plist',
        ahref: 'http://www.9diangame.com/huamajiang.mobileprovision',
        images: [
          'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
          'https://o3e85j0cv.qnssl.com/waterway-107810__340.jpg',
          'https://o3e85j0cv.qnssl.com/hot-chocolate-1068703__340.jpg'
        ],
        nickName: '',
        upUserId: '',
        shareUserId: '',
        src2: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        src: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg',
        urltext: 'hello world',
        ticket: '',
        imgUrl: 'https://o3e85j0cv.qnssl.com/tulips-1083572__340.jpg'
      }
    },
    computed: {
      url () {
        return this.$store.state.wxToken.uheadeimgurl
      },
      accessToken () {
        return this.$store.state.wxToken.accesswxToken
      },
      listNew () {
        var list = [{
          label: '姓名',
          value: this.$store.state.wxToken.unickname
        }, {
          label: 'openId',
          value: this.$store.state.wxToken.uopenId
        }, {
          label: 'uId',
          value: this.$store.state.wxToken.unionId
        }, {
          label: 'access_token',
          value: this.$store.state.wxToken.accesswxToken
        }]
        return list
      }
    },
    created () {
      var isfromw = isfrom()
      if (isfromw.ifWeixin) {
        this.isweixin = true
      } else {
        this.isweixin = false
      }
      document.title = '我的微信账号信息'
      var code = ''
      var str = location.href
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var that = this
        var store = LocalStorageService.get('storeState')
        if (store) that.$store.commit('setstore', store)
        var temp = {
          code: code,
          grant_type: 'authorization_code'
        }
        userService.getUserDetailYY(temp).then(res => {
          console.log('用户信息获取测试')
          console.log(res.data)
          console.log('==============')
        })
        if (!store || !store.unionId) {
          getAccessCode(code).then(res => {
            console.log(res)
          })
        }
      }
    },
    methods: {
      saveimg () {
        tool.getimgcode().then(res => {
          console.log('保存成功')
        })
      },
      getTuwen () {
        var param = {
          type: 'news',
          offset: 0,
          count: 20
        }
        dudutool.getmaterial(param).then(res => {
          console.log(res)
        })
      },
      getToken () {
        userService.wxTokenSelf().then(res => {
          if (res.status === 200) {
            console.log(res.data)
          }
        })
      },
      getCodewe () {
        this.imgUrl = 'https://mp.weixin.qq.com/cgi-bin/showqrcode?ticket=' + encodeURIComponent(this.ticket)
      },
      postCode () {
        console.log(this.$store.state.wxToken.accesswxToken.length)
        var param = {'expire_seconds': 604800, 'action_name': 'QR_STR_SCENE', 'action_info': {'scene': {'scene_str': this.$store.state.wxToken.accesswxToken}}}
        dudutool.postCode(param).then(res => {
          console.log(res)
          this.ticket = res.data.ticket
          this.urltext = res.data.url
        })
      },
      shareUserInfo () {
        var src = location.href
        var rec = /(?:userid=)\w*/ig
        var useridstr = src.match(rec).length ? src.match(rec)[0] : ''
        if (useridstr) {
          var param = {
            appid: wxconfig.appid,
            redirect_uri: 'http://www.' + wxconfig.domain + '.com/#/wechat',
            response_type: 'code',
            scope: 'snsapi_userinfo',
            state: '1'
          }
          var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?' + querystring.stringify(param) + '#wechat_redirect'
          // this.urltext = url
          console.log(url)
          this.shareUserId = useridstr.split('=')[1]
        }
      },
      isuseAttention () {
        var param = {
          access_token: this.$store.state.wxToken.accesswxToken,
          openid: 'opsHvwItch5xSy8p1d2biXc95GCA'
        }
        userService.isUserGz(param).then(res => {
          if (res.data && res.status === 200) {
            if (res.data.subscribe) this.upUserId = ''
            else this.upUserId = this.shareUserId
          }
        })
      },
      isWeiXin () {
        var ua = window.navigator.userAgent.toLowerCase()
        if (ua.match(/MicroMessenger/i) === 'micromessenger') {
          return true
        } else {
          return false
        }
      },
      getUserInfo () {
        userService.getUserTest().then(res => {
           // 返回用户详情信
          console.log(res)
        })
      },
      saveUserInfo () {
        var param = {
          unionid: this.$store.state.wxToken.unionId,
          nickname: this.userData.nickname,
          headimgurl: this.userData.headimgurl,
          up: this.upUserId || 0
        }
        userService.postUserInfo(param).then(res => {
          console.log('保存信息成功！')
        })
      },

      getAccessCode (code) {
        var param = {
          appid: wxconfig.appid,
          grant_type: 'authorization_code'
        }
        dudutool.getUserToken(param).then(res => {
           // 第一次调用保存当前用户的 openId 到 state里面 ？ 此处考虑是否保存在本地存储里面
          if (res.status === 200) this.$store.commit('setUAccessToken', res.data)
        })
      },
      getTokenNew () {
        var param = {
          refresh_token: this.$store.state.wxToken.urefreshToken
        }
        dudutool.getAccessToken(param).then(res => {
          console.log(res)
          // state.uaccessToken = res.uaccessToken
          // state.uexpire = new Date().getTime()
        })
      },
      getCode () {
         // 获取微信网页授权码
        tool.getcode()
      },
      check () {
        console.log(this.$store.state)
      },
      deleteMenu () {
        var param = {
          access_token: this.accessToken
        }
        dudutool.deleteMenu(param).then(res => console.log(res))
      },
      getMenu () {
        var param = {
          access_token: this.accessToken
        }
        dudutool.getMenu(param).then(res => console.log(res))
      },
      setMenu () {
        var param = {}
        if (!this.menu) return
        try {
          param.menu = JSON.parse(this.menu)
          param.token = this.accessToken
        } catch (e) {
          return
        }
        dudutool.setMenu(param).then(res => console.log(res))
      }
    }
  }
</script>
<style scoped lang='less'>
.center {
  text-align: center;
  padding-top: 20px;
  color: #fff;
  font-size: 18px;
}
.center img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 4px solid #ececec;
}
.checkbtn span {
  display: inline-block;
  height: 40px;
  width: auto;
  margin: 10px;
  padding: 0 10px;
  text-align: center;
  line-height:40px;
  border:1px solid gray;
}
.qrcode {
  & img {
    border:1px solid #cacaca;
  }
}
</style>
<style>
  
</style>
