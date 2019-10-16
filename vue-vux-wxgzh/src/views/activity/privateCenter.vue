<template lang="pug">
  .wrapper
    //- x-header(:right-options="{showMore: true}" @on-click-more="showMenus = true" style="background-color:#1c1c1f;") 个人中心
    .bodyPhoto
      img.privatePhoto(:src="icon")
      p(style="font-size:24px;font-weight:700") {{nick}}
      p(style="padding:0.1rem 0.5rem") ID:{{userid}}
    .contentWrapper
      .connent
        .connent1
          .p(style="font-size:.4rem") 我的收益（分）
          .p(style="font-weight:600;font-size:.8rem; color:#109bff") {{score.total | calcone}}
      .connent
        div.connent2
          .p(style="font-size:.4rem;") 可提现收益（分）
          .p(style="font-weight:700;font-size:.8rem; color:#e8a219") {{score.cur | calcone}}
        div.connent2.connentStyle
          router-link(:to="'tixian'")
            span 提  现
      .connent
        div.connent3
          .p(style="font-size:.4rem;") 我的钻石（颗）
          .p(style="font-weight:700;font-size:.8rem; color:#ff6063") {{diamond}}
        div.connent3.connentStyle
          router-link(:to="'drawCrash'")
            span 购买钻石
    mytabbar(:modelactivity="menus")
</template>
<script>
  import { XHeader } from 'vux'
  import { getAccessCode, isuserIdNull } from '@/utils/tools'
  import LocalStorageService from '@/service/storage'
  import circleService from '@/service/userScircle'
  export default{
    components: {XHeader},
    name: 'privateCenter',
    data () {
      return {
        menus: 'my',
        getcrash: false
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.loading.isLoading
      },
      icon () {
        return this.$store.state.wxToken.uheadeimgurl
      },
      nick () {
        return this.$store.state.wxToken.unickname
      },
      userid () {
        return this.$store.state.wxToken.userid
      },
      score () {
        return this.$store.state.wxToken.score
      },
      diamond () {
        return this.$store.state.wxToken.diamond
      }
    },
    mounted () {
      document.title = '个人中心'
      var code = ''
      var str = location.href
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      var that = this
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var time = new Date().getTime()
        if (!store || !store.userid || !store.expris || (time - store.expris) / (1000 * 60) > 30) {
          getAccessCode(code)
        }
      }
      if (this.userid) that.getUserInfo()
    },
    methods: {
      getUserInfo () {
        circleService.getUserInfoById({userid: this.userid}).then(res => {
          if (res.status === 200 && res.data && res.data.errcode === 0) {
            this.$store.commit('setstore', res.data)
          }
          if (res.status === 200 && res.data && res.data.errcode === 99) {
            isuserIdNull('activity%2FprivateCenter')
            return false
          }
        })
      }
    },
    filters: {
      calcone (val) {
        val = (val + '').indexOf('.') !== -1 ? (val * 1).toFixed(1) : val
        if (!val) val = 0
        return val
      }
    }
  }
</script>
<style scoped>
  .topBar{
    height:30px;
    color:#ffffff;
  }
  .bodyPhoto{
    height:30%;
    width:100%;
    background-color: #1c1c1f;
    color:#ffffff;
  }
  .privatePhoto{
   width:3rem;
   height:3rem;
   border-radius: 50%;
   margin-top: 0.2rem;
  }
  .connent{
    display: flex;
    height: 2.5rem;
    border-bottom: 1px solid #d6d6d6;
    padding:0.5rem 0.2rem;
    align-items: center;
    justify-content: space-between;
  }
  .connent2{
    display: inline-block;
  }
  .connent3{
    display: inline-block;
  }
  .connentStyle{
    float: right;
    width:3.3rem;
    border-radius: 30px;
    padding:0.25rem 0.4rem;
    background-color: #e9e9e9;
    text-align: center;
    font-size: .4rem;
    color: #363432 !important;
  }
  .contentWrapper{
    width:100%;
    float: left;
    text-align: left;
    padding:3px 20px;
  }
  a{
    color:#363432;
  }
  a:hover, a:active, a:focus{
    color:#363432;
  }
</style>

