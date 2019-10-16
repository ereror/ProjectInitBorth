<template lang="pug">
  .continer(style='height:100%;')
    div.isagrnts(style='padding:.4rem;' v-if='isagent')
      div.header
        h3(style='text-align:left') 总体数据
        div.clearfix
          div(style='float:left;width:50%;padding:.6rem;text-align:left;line-height:1rem;')
            icon.icon(name='persons' style='height:1.2rem;width:auto;vertical-align:middle;margin-right:.2rem;') 
            span(style='font-size:.5rem;') {{agentinfo.players || 0}}
          div(style='float:left;width:50%;padding:.6rem;text-align:left;line-height:1rem;')
            icon.icon(name='quan' style='height:1rem;width:auto;vertical-align:middle;margin-right:.2rem;')
            span(style='font-size:.5rem;') {{agentinfo.tickets || 0}}
        tab
          tab-item(selected @on-item-click="showmodel = 1") 月度详情
          tab-item(@on-item-click="showmodel = 2;getuserList()") 玩家详情
        h3(style='text-align:left' v-show='showmodel === 1') 月度详情
            ul
               li.header.clearfix(style='border-top:2px solid gray;border-bottom:2px solid gray;font-size:.4rem;line-height:2em;')
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span 月度
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span 新增注册
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span 总注册
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span 本月夺宝券
            ul(style='max-height:10rem;overflow:auto;')
               li.detail.clearfix(style='border-bottom:1px solid 2018-06;font-size:.4rem;line-height:2em;' v-for='item in statdata')
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span {{item.time}}
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span {{item.players || 0}}
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span {{item.resultsPlays || 0}}
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span {{item.tickets || 0}}
        h3(style='text-align:left' v-show='showmodel === 2') 玩家详情
            ul
               li.header.clearfix(style='border-top:2px solid gray;border-bottom:2px solid gray;font-size:.4rem;line-height:2em;')
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span 昵称
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span 最后登录
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span 金币场次
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span 夺宝券数
            ul(style='max-height:8rem;overflow:auto;')
               li.detail.clearfix(style='border-bottom:1px solid 2018-06;font-size:.4rem;line-height:2em;' v-for='item in userdata')
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span {{item.nick}}
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span {{item.lastlogontime || 0}}
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span {{item.goldgames || 0}}
                 div(style='float:left;width:25%;text-align:center;line-height:2;')
                   span {{item.duobao_tickets_getbygame || 0}}
            .page(style='display:flex;justify-content:center;font-size:.8em;margin-top:.2rem;')
                a(v-show='pageCurrent[0] > 1' @click="getuserList('up')" style="font-size: .8em;line-height: 2;margin-right: .2rem;") 上一页
                span 第
                  span.pagecountcss(@click='pagedetailfunc') {{pageCurrent[0]}}
                  | 页
                a(v-show='total > pageCurrent[0] * pagecount' @click="getuserList('down')" style="font-size: .8em;line-height: 2;margin-left: .2rem;") 下一页
    div.isnoagent(style='padding:.4rem;padding-top:1rem;text-align: center;' v-if='!isagent')
        span(style='font-size:.4rem;') 你当前不是推广员，请联系客服(微信号jdmj_kefu1)！
    popup-picker(:show.sync="pagedetail", :show-cell="false" title="TEST", :data="pagedata" v-model="pageCurrent" @on-change="getuserList")
</template>
<script>
  import activeService from '@/service/activity'
  import { getAccessCode } from '@/utils/tools'
  import LocalStorageService from '@/service/storage'
  import { Tab, TabItem, PopupPicker } from 'vux'
  import date from '@/filter/date'
  export default {
    name: 'agentData',
    components: {
      Tab,
      TabItem,
      PopupPicker
    },
    data () {
      return {
        showmodel: 1, // 1,展示月度详情 2，展示玩家详情
        agentinfo: {
          players: 0,
          tickets: 0,
          statdata: []
        },
        statdata: [],
        userdata: [],
        pagedata: [[1]],
        pageCurrent: [1],
        showpage: false,
        pagedetail: false,
        total: 0,
        pagecount: 8
      }
    },
    computed: {
      isagent () {
        return this.$store.state.wxToken.isagent
      },
      userid () {
        return this.$store.state.wxToken.userid
      }
    },
    created () {
      document.title = '数据中心'
      var code = ''
      // var state = ''
      var str = location.href
      var mcode = /(?:code=)(\w*)/ig
      // var mstate = /(?:state=)(\w*)/ig
      var resultc = str.match(mcode)
      // var results = str.match(mstate)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var that = this
        var store = LocalStorageService.get('storeState')
        if (store) that.$store.commit('setstore', store)
        getAccessCode(code).then(res => {
          that.getagentList(that)
        })
      }
    },
    methods: {
      pagedetailfunc () {
        if (this.pagedata.length) this.pagedetail = true
      },
      getuserList (model) {
        if (model === 'up') {
          this.pageCurrent[0]--
        } else if (model === 'down') {
          this.pageCurrent[0]++
        }
        this.$set(this.pageCurrent, 0, this.pageCurrent[0])
        // console.log(this.pageCurrent[0])
        var temp = {
          userid: this.userid,
          pagecount: this.pagecount,
          curpage: this.pageCurrent[0] || 1
        }
        activeService.getMyUserList(temp).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.pagedata = []
            this.total = res.data.count && res.data.count.count
            var totalcount = Math.ceil(this.total / this.pagecount)
            var dataarr = []
            for (let a = 1; a <= totalcount; a++) {
              dataarr.push(a)
            }
            if (dataarr.length) this.pagedata.push(dataarr)
            else this.pagedata = [[1]]
            this.userdata = res.data.count && res.data.count.users || []
            this.userdata.map(v => {
              if (v.lastlogontime) v.lastlogontime = date(v.lastlogontime, 'yyyy-MM-dd')
              if (v.nick.length > 6) v.nick = v.nick.substring(0, 6) + '...'
            })
          }
        })
      },
      getagentList () {
        var temp = {
          userid: this.userid
        }
        activeService.getAgentStatData(temp).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.agentinfo = res.data && res.data.agentinfo
            this.statdata = res.data && res.data.statdata
            if (this.statdata) {
              this.statdata.map((v, i) => {
                v.time = v.time.replace('_', '-')
                if (i === 0) v.resultsPlays = this.agentinfo.players || 0
                if (i > 0) v.resultsPlays = this.statdata[ i - 1 ].resultsPlays - this.statdata[ i - 1 ].players
              })
            }
          }
        })
      }
    }
  }
</script>
<style>
  .pagecountcss {
    display: inline-block;
    padding: 0rem .2rem;
    line-height: 1.5;
    background: #b7b6b6;
    border-radius: .1rem;
    font-size: .8em;
    margin: 0 .1rem;
  }
</style>
