<template lang="pug">
  .wrapperBody
    //- x-header(:right-options="{showMore: true}" @on-click-more="showMenus = true" style="background-color:#1c1c1f;") 群收益详情
    .bodyPhoto
      .connent
        .leftContent
          .divp(style="margin-top:-0.5rem") 我的收益（分）
          .divp(style="font-weight:700;font-size:28px;") {{polif.total}}
        .rightContent
          .divp 累计游戏（局）
          .divp(style="font-weight:700;font-size:28px;") {{tables}}
      button-tab
        button-tab-item(selected @on-item-click="clickHandle(0)") 日
        button-tab-item(@on-item-click="clickHandle(1)") 月
        button-tab-item(@on-item-click="clickHandle(2)") 年
    .contentWrapper
      .Overflowcontent
            .contentbox(style="padding:0 10px;margin:10px 0;")
                div(v-for="(polifitem, index) in polif.data")
                  ul(v-if='model === 2')
                     li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em")
                          div.polifitem(:style="{width: (0.6 * (polifitem.total - maxYearCount) / maxYearCount + 1)* 100 + '%'}")
                              div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.8em;color:white")
                                  span {{polifitem.time}}
                              div(style="width:30%;text-align:right;padding-right:.5em;color:white;display:-webkit-box;display:flex;justify-content:flex-end")
                                  span {{polifitem.total}}
                  div(v-for="(polifmonths, index) in polifitem.months" v-if='model !== 2')
                    ul(v-if='model === 1')
                        li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em"  v-if='model === 1')
                            div.polifitem(:style="{width: (0.6 * (polifmonths.total - maxMonthCount) / maxMonthCount + 1)* 100 + '%'}")
                                div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.8em;color:white")
                                    span {{polifitem.time + '-' + polifmonths.time}}
                                div(style="width:30%;text-align:right;padding-right:.5em;color:white;display:-webkit-box;display:flex;justify-content:flex-end")
                                  span {{polifmonths.total}}
                    div(v-for='(polifday, index) in polifmonths.days' v-if='model !== 1')
                      ul(v-if='model === 0')
                        li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em")
                            div.polifitem(:style="{width: (0.6 * (polifday.total - maxDayCount) / maxDayCount + 1)* 100 + '%'}")
                                div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.8em;color:white")
                                    span {{polifitem.time + '-' + polifmonths.time + '-' + polifday.time}}
                                div(style="width:30%;text-align:right;padding-right:.5em;color:white;display:-webkit-box;display:flex;justify-content:flex-end")
                                  span {{polifday.total}}
    mytabbar
</template>
<script>
  import { XHeader, ButtonTab, ButtonTabItem } from 'vux'
  import LocalStorageService from '@/service/storage'
  export default{
    components: {XHeader, ButtonTab, ButtonTabItem},
    name: 'qunBenefit',
    data () {
      return {
        tables: 0, // 游戏局数
        model: 0, // 天，月，年
        maxYearCount: 0,
        maxMonthCount: 0,
        maxDayCount: 0,
        polif: {}
      }
    },
    created () {
      document.title = '圈子累记收益详情'
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      this.plifts = LocalStorageService.get('circledetail')
      if (this.plifts) {
        this.polif = this.plifts
      }
      this.calcData()
    },
    methods: {
      onItemClick (val) {
        this.isb = val
      },
      calcData () {
        this.polif.data.map(v => {
          if (v.total > this.maxYearCount) this.maxYearCount = v.total
          var ygames = v.games
          v.months.map(j => {
            if (j.total > this.maxMonthCount) this.maxMonthCount = j.total
            var games = j.games
            if (!games) j.games = 0
            j.days.map(k => {
              if (k.total > this.maxDayCount) this.maxDayCount = k.total
              if (!games) j.games += k.games
              this.tables += k.games
            })
            if (!ygames) v.games = 0
            if (!ygames) v.games += j.games
          })
        })
      },
      sortObject (obj, param, attr, type) {
        obj[param] = obj[param].sort(function (a, b) {
          if (type === 'aesc') return a[attr] - b[attr]
          if (type === 'desc') return b[attr] - a[attr]
        })
      },
      clickHandle (val) {
        this.model = val
      }
    }
  }
</script>
<style scoped>
  .wrapperBody{
    background-color: #eeeeee;
  }
  .topBar{
    height:30px;
    color:#ffffff;
  }
  .bodyPhoto{
    height:5rem;
    width:100%;
    background-color: #1c1c1f;
    color:#ffffff;
  }
  .div {
      font-size: 16px;
      color: #fff;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.2rem;
      background-color: #ffad00;
      margin-bottom: 0.3rem;
    }
  .leftContent,.rightContent{
    display: inline-block;
    width:50%;
    height:2.7rem;
    overflow: hidden;
   /* padding:0.5rem;*/
  }
  .leftContent {
    padding-top: 1.2rem;    
  }
  .rightContent {
    border-left: 2px solid rgb(255, 255, 255);
    overflow: hidden;
    padding-top: .7rem;
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
  .polifitem {
    background: orange;
    box-sizing: border-box;
    display: flex;
  }
  .connent{
    height: 2.7rem;
    padding:0.5rem 0.1rem;
  }
  .vux-button-group {
    padding: 0.5rem 1rem;
    height: 2rem;
    overflow: hidden;
    margin: .5rem 0;
  }
  .vux-button-group > a.vux-button-group-current {
    color: #f8b300;
    background: #323337;
  }
  .vux-button-group > a {
    border-right: 1px solid #323337;
    border-top: 1px solid #323337;
    border-bottom: 1px solid #323337;
    border-left: none;
    background: #323337;
    color: #fcfefd;
    border: none;
    font-weight: 600;
    height:35px;
    line-height:35px;
  }
  .vux-button-group > a.vux-button-tab-item-first:after{
    border: none;
    border-right: 1px solid #ffffff;
  /*  color:;*/
  }
  .vux-button-group > a.vux-button-tab-item-middle:after{
    border: none;
    border-right: 1px solid #ffffff;
  }
  .vux-button-group > a.vux-button-tab-item-last:after{
    border: none;
  }
  .content{
    padding:0.2rem 0.3rem;
    box-shadow: #dcdcdc;
    background-color: #fefefe;
    border:1px solid #dcdcdc;
    margin-top:0.2rem;
    border-radius: 15px;
  }
  .connentStyle{
    float: right;
    width:3.3rem;
    border-radius: 30px;
    padding:0.25rem 0.4rem;
    background-color: #e9e9e9;
    text-align: center;
    font-size: 20px;
    color: #363432;
  }
  .contentWrapper{
    width:100%;
    float: left;
    text-align: left;
    padding:3px 0px;
    background-color: #eeeeee;
  }
</style>

