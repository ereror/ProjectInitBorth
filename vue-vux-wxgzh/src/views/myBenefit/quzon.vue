<template lang="pug">
  .wrapperBody
    //- x-header(:right-options="{showMore: true}" @on-click-more="showMenus = true" style="background-color:#1c1c1f;") 我的圈子
    .contentWrapper
      .Overflowcontent
        .content(v-for="(item, index) in itemList", :key="index" v-if="itemList.length")
          .divp(style="display:inline-block;")
            span(style="font-weight:700;font-size:18px;") {{item.name}}
          .divp(style="display:inline-block;float:right;right:0.5rem")
            span 今日游戏（局）
            span(style="color:#f9676b;font-weight:700;font-size:18px") {{item.games}}
          .divp(style="color:#a2a2a2;margin-top:0.1rem")
            span(style="width:1rem;")
              icon.icon(name="ico_editor")
            span(style="vertical-align:super") {{item.id}}
            span(style="width:1rem; margin-left:0.3rem;color:#291818;")
              icon.icon(name="ico_friend")
            span(style="vertical-align:super") {{item.members}}
          .divp(style="color:#a2a2a2; margin-top:-0.1rem;font-size:.3rem;display:none")
            span(style="width:1rem;vertical-align: sub;")
              icon.icon(name="ico_financial_fill")
            span 基准房费（
            span(v-for="(ite,index) in item.addprice", :key="index")
              span(style="color:#02b0e0;font-weight:700;") {{ite.condition}}
              span 局
              span(v-if="ite.condition === 4" style="color:#02b0e0;font-weight:700;") {{ite.addprice + 2}}
              span(v-else-if="ite.condition === 8" style="color:#02b0e0;font-weight:700;") {{ite.addprice + 3}}
              span(v-else-if="ite.condition === 12" style="color:#02b0e0;font-weight:700;") {{ite.addprice + 4}}
              span(v-if='index !== item.addprice.length - 1') 房卡、
              span(v-else) 房卡
            span ）
          div(style="width:100%;margin:.1rem 0;text-align:right")
            span(@click="gotoCircleMerber(item)")
              button.btn 成 员
            span(@click="gotoCircle(item)")
              button.btn 圈子设置
            span(@click="goInactive(item)")
              button.btn 活跃度
            span(@click="goHistory(item)")
              button.btn 战 绩
        .div(v-show="!itemList.length && isready")
          .div(style='position:absolute;z-index:2;top:40%;margin:0 auto;padding:0 3em;width:100%;height:200px;transform: translateY(-50%);left:0;')
            .div(style="width:15em;text-align:center;margin:0 auto;font-size:1.4em;")
              | 你还没有管理圈子
    mytabbar(:modelactivity="menus")
</template>
<script>
  import circleService from '@/service/userScircle'
  import LocalStorageService from '@/service/storage'
  import { getAccessCode } from '@/utils/tools'
  import { XHeader } from 'vux'
  export default{
    components: { XHeader },
    name: 'quzon',
    data () {
      return {
        showMore: true,
        menus: 'myQuzon',
        isready: false,
        itemList: [],
        tableData3: [
          {
            title: '幸运大多宝',
            detail: '总共获得5000积分',
            subdetail: '(5000奖项积分)',
            times: '1',
            juLists: [{ju: '2', card: '5'}, {ju: '2', card: '5'}, {ju: '2', card: '5'}]
          }, {
            title: '幸运大多宝',
            detail: '总共获得5000积分',
            subdetail: '(5000奖项积分)',
            times: '1',
            juLists: [{ju: '2', card: '5'}, {ju: '2', card: '5'}, {ju: '2', card: '5'}]
          }
        ]
      }
    },
    created () {
      document.title = '我的圈子'
      var code = ''
      var str = location.href
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var that = this
        var time = new Date().getTime()
        if (!store || !store.userid || !store.expris || (time - store.expris) / (1000 * 60) > 30) {
          getAccessCode(code).then(res => {
            setTimeout(function () {
              that.getUserInfo()
            }, 200)
          })
        } else {
          this.getUserInfo()
        }
      }
    },
    methods: {
      getUserInfo () {
        this.loading = true
        var temp = {userid: this.$store.state.wxToken.userid}
        circleService.getCircle(temp).then(res => {
          this.isready = true
          if (res.status === 200 && !res.data.errcode) {
            this.loading = false
            if (res.data.teams && res.data.teams.length) this.itemList = res.data.teams
            else this.itemList = []
          }
        })
      },
      onItemClick (val) {
        if (val === 'earnings') this.$router.push({ name: 'earnings' })
        if (val === 'circlepolif') this.$router.push({ name: 'circlepolif' })
      },
      gotoCircleMerber (val) {
        LocalStorageService.set('circlestr', JSON.stringify(val))
        this.$router.push({ name: 'memberDetail' })
      },
      gotoCircle (param) {
        LocalStorageService.set('circlestr', JSON.stringify(param))
        this.$router.push({ name: 'setting' })
      },
      goHistory (param) {
        LocalStorageService.set('circlehistoryData', JSON.stringify(param))
        this.$router.push({ name: 'record' })
      },
      goInactive (param) {
        LocalStorageService.set('circlestr', JSON.stringify(param))
        this.$router.push({ name: 'inActive' })
      }
    },
    filters: {
      ratio: function (value) {
        if (typeof value !== 'number' || value === 1) return ''
        var ratios = ['', '二', '三', '四', '五', '六', '七', '八', '九', '十']
        return ratios[value - 1] + '倍'
      },
      date: function (value) {
        var time
        if (typeof value !== 'string' || !value || !(new Date(value)).getTime()) {
          return value
        } else {
          time = new Date(value).getMonth() + 1 + '-' + new Date(value).getDate()
          return time
        }
      }
    }
  }
</script>
<style scoped lang='less'>
	.wrapperBody{
    height: 100%;
    overflow: auto;
    padding-bottom:1.5rem;
		background-color: #eeeeee;
    &  .Overflowcontent {
      padding:.2rem;
      height: 100%;
      max-height: 100%;
    }
	}
  .svg-icon{
    width:0.4rem;
    height:0.5rem;
  }
	.topBar{
		height:30px;
		color:#ffffff;
	}
	.bodyPhoto{
		height:25%;
		width:100%;
		background-color: #1c1c1f;
		color:#ffffff;
	}
  a{
    display: inline-block;
  }
	.btn{
	  margin-right: 0.25rem;
    color: #ffffff;
    background-color: #ffae00;
    padding: 0.15rem 0.33rem;
    border-radius: 0.5rem;
    border:none;
	}
	.contentLine{
	 margin-top:0.5rem;
	}
	.leftWrapper,.rightWapper{
		display: inline-block;
	}
	.rightContent{
		text-align: left;
		padding-left: 0.5rem;
	}
	.connent{
		height: 3.1rem;
		padding:0.2rem 0.1rem;
	}
	.contentWrapper{
    width:100%;
    float: left;
    text-align: left;
    padding:0.2rem 0.3rem;
    background-color: #eeeeee;
    height: 100%;
    max-width: 100%;
    overflow: auto;
    padding-bottom: 1rem;
  }
	.content{
		padding:0.2rem 0.3rem;
		box-shadow: 2px 2px 10px #dcdcdc, 2px -2px 10px #dcdcdc, -2px 2px 10px #dcdcdc, -2px -2px 10px #dcdcdc;
		background-color: #fefefe;
		border:1px solid #dcdcdc;
		margin-top:0.2rem;
		border-radius: 10px;
	}
</style>

