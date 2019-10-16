<template lang='pug'>
  div(style="width:100%;")
        div(style="padding: 10px 0;overflow: hidden;background:white;" v-for="item in list")
          masker(style="border-radius: 2px;" color="white" :opacity="0.2")
            //- div(class="m-img" :style="{backgroundImage: 'url(' + item.img + ')'}")
            div(class="m-img" style="background: -webkit-gradient(linear,left top,right bottom, from(#2095ff),to(#6500fe));")
            div(slot="content" class="m-title")
              flexbox
                flexboxItem(style="border-right:2px solid white")
                  div.align-c.titleH 累计收益（分）
                  div.align-c(style="line-height:2.8em;height:2.8em")
                    //- countup(:end-val="polif.total", :duration="3"  class="demo1")
                    div.demo1 {{polif.total}}                    
                flexboxItem
                  div.align-c.titleH 累计游戏（局）
                  div.align-c(style="line-height:2.8em;height:2.8em") 
                    //- countup(:end-val="tables" :duration="3"  class="demo1")
                    div.demo1 {{tables}}
        .titlebar(style="width:100%;overflow:hidden;padding:0px 10px;background:white;margin-top:10px;")
            .optbar(style="width:100%;text-align:right;float:left;padding:5px 0")
                span(style="float:left;color:gray;") 排序方式 {{maxDayCount}}
                span.btn(@click='model = 0', :class="{'active': model === 0}") 天
                span.btn(@click='model = 1', :class="{'active': model === 1}") 月
                span.btn(@click='model = 2', :class="{'active': model === 2}") 年
            .optbar(style="width:100%;text-align:right;float:left")
                span(style="float:left;line-height:2.5em;color:gray") 日期
                span(style="float:right;line-height:2.5em;color:gray") 收益/游戏
        group
            .content(style="padding:0 10px;margin:10px 0;")
                div(v-for="(polifitem, index) in polif.data")
                  ul(v-if='model === 2')
                     li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em")
                          div.polifitem(:style="{width: (0.6 * (polifitem.total - maxYearCount) / maxYearCount + 1)* 100 + '%',background: colors[index] || colors[colors.length - 1]}")
                              div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.8em;color:white")
                                  span {{polifitem.time}}
                              div(style="width:30%;text-align:right;padding-right:.5em;color:white;display:-webkit-box;display:flex;justify-content:flex-end")
                                  span {{polifitem.total}}/{{polifitem.games}}
                                  //- div(style="display:flex;display:-webkit-box;align-items:center")
                                  //-   icon.icon(name="icon_money" style="height:.8em;width:1em;color:black;display:inline-block")
                                  //-   span {{polifitem.total}}
                                  //- div(style="display:flex;display:-webkit-box;align-items:center;margin-left:.5em")
                                  //-   icon.icon(name="icon_computer" style="height:.8em;width:1em;color:black;display:inline-block")
                                  //-   span {{polifitem.games}}
                  div(v-for="(polifmonths, index) in polifitem.months" v-if='model !== 2')
                    ul(v-if='model === 1')
                        li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em"  v-if='model === 1')
                            div.polifitem(:style="{width: (0.6 * (polifmonths.total - maxMonthCount) / maxMonthCount + 1)* 100 + '%',background: colors[index] || colors[colors.length - 1]}")
                                div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.8em;color:white")
                                    span {{polifitem.time + '-' + polifmonths.time}}
                                div(style="width:30%;text-align:right;padding-right:.5em;color:white;display:-webkit-box;display:flex;justify-content:flex-end")
                                  span {{polifmonths.total}}/{{polifmonths.games}}
                                    //- div(style="display:flex;display:-webkit-box;align-items:center")
                                    //-   icon.icon(name="icon_money" style="height:.8em;width:1em;color:black;display:inline-block")
                                    //-   span {{polifmonths.total}}
                                    //- div(style="display:flex;display:-webkit-box;align-items:center;margin-left:.5em")
                                    //-   icon.icon(name="icon_computer" style="height:.8em;width:1em;color:black;display:inline-block")
                                    //-   span {{polifmonths.games}}
                    div(v-for='(polifday, index) in polifmonths.days' v-if='model !== 1')
                      ul(v-if='model === 0')
                        li(style="margin:.5em 0;background:#f2f2f2;height:2em;line-height:2em")
                            div.polifitem(:style="{width: (0.6 * (polifday.total - maxDayCount) / maxDayCount + 1)* 100 + '%',background: colors[index] || colors[colors.length - 1]}")
                                div(style="width:70%;text-align:left;padding-left:.5em;font-size:0.8em;color:white")
                                    span {{polifitem.time + '-' + polifmonths.time + '-' + polifday.time}}
                                div(style="width:30%;text-align:right;padding-right:.5em;color:white;display:-webkit-box;display:flex;justify-content:flex-end")
                                  span {{polifday.total}}/{{polifday.games}}
                                    //- div(style="display:flex;display:-webkit-box;align-items:center")
                                    //-   icon.icon(name="icon_money" style="height:.8em;width:1em;color:black;display:inline-block")
                                    //-   span {{polifday.total}}
                                    //- div(style="display:flex;display:-webkit-box;align-items:center;margin-left:.5em")
                                    //-   icon.icon(name="icon_computer" style="height:.8em;width:1em;color:black;display:inline-block")
                                    //-   span {{polifday.games}}
</template>
<script>
  import { Tab, TabItem, Group, Masker, Flexbox, FlexboxItem, Countup } from 'vux'
  import LocalStorageService from '@/service/storage'
  import { calcrem } from '@/utils/common'
  calcrem()
  export default {
    name: 'circleearnings',
    components: {
      Tab,
      TabItem,
      Group,
      Masker,
      Flexbox,
      FlexboxItem,
      Countup
    },
    data () {
      return {
        isb: 1, // 倍率
        gongao: '',
        model: 0, // 天，月，年
        tables: 0, // 桌数
        maxYearCount: 0,
        maxMonthCount: 0,
        maxDayCount: 0,
        colors: ['#9546c3', '#8d4dc8', '#8651cb', '#7b58ce', '#735ed5', '#6d62d8', '#6568dd', '#6267dc', '#5d6ee2', '#5374e5'],
        list: [{
          title: '5000',
          img: 'http://p1.so.qhimgs1.com/t01f5199144d6b2cc61.jpg'
        }],
        polif: {
          id: 119586,
          name: 'jifen',
          total: 0,
          data: [{
            time: 2017,
            total: 80,
            months: [{
              time: 7,
              total: 80,
              days: [{
                time: 7,
                total: 80,
                games: 40
              }, {
                time: 8,
                total: 60,
                games: 30
              }]
            }]
          }]
        }
      }
    },
    created () {
      document.title = '圈子累记收益详情'
      this.plifts = LocalStorageService.get('circledetail')
      console.log(this.plifts)
      if (this.plifts) {
        this.polif = this.plifts
        // console.log(this.plifts)
      }
      this.calcData()
      // 对圈子进行排序操作
      // this.sortObject(this.polif, 'data', 'total', 'desc') // 年排序
      // this.sortObject(this.polif, 'data', 'total', 'desc') // 月排序
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
      }
    }
  }
</script>
<style lang='less' scoped>
  body {color:#f5f5f5}
  .titlebar {
      & .optbar {
          & span {display: inline-block;margin:0 .2em;min-width:.5rem;text-align: center;padding:.2em .6em;line-height:2em}
          & span.btn {border-radius: 5px;border: 1px solid #199ed8;color: #199ed8;}
          & span.active {border:1px solid rgba(25, 158, 216, 1);background:rgba(25, 158, 216, 1);color:white}
      }
  }
  .polifitem {display:flex;min-width:40%;max-width:100%;background:#ff9999;}
  .align-c{
    text-align:center
  }
  .titleH {font-size:.9em}
  .demo1 {
    font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
    font-size: 2.8em;
    color: white;
  }
  .m-img {
    padding-bottom: 33%;
    display: block;
    position: relative;
    max-width: 100%;
    background-size: cover;
    background-position: center center;
    cursor: pointer;
    border-radius: 2px;
    height:4.5rem;
  }

  .m-title {
    color: #fff;
    text-align: center;
    text-shadow: 0 0 2px rgba(0, 0, 0, .5);
    font-weight: 500;
    font-size: 16px;
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    top: 50%;
    transform: translateY(-50%);
  }

  .m-time {
    font-size: 12px;
    padding-top: 4px;
    border-top: 1px solid #f0f0f0;
    display: inline-block;
    margin-top: 5px;
  }
</style>
