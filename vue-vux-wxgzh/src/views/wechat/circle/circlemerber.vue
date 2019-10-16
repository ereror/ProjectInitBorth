<template lang='pug'>
  div
    loading(v-model='isLoading' style='position:absolute;z-index:99999')
    div(style="height:108px;")
      sticky(style="background:white")
       tab(style="background:white")
          tab-item(@on-item-click="onItemClick()" active-class='active-6-2' selected) 成员列表
          tab-item(@on-item-click="onItemClick('circlemerberlist')" active-class='active-6-1' style='color:#7f7f7f;') 成员动态
       group(style='margin:-10px 0;')
         .titlebar.clearfix(style='width:100%;overflow:hidden;padding:10px 10px;display: flex;align-items: center;')
          .titlel(style='width:30%;text-align:left;float:left;font-size:.8em;color:#636363;line-height:2.5')
            span(v-show="false")
              | 共计 
              span(style='color:#47a4ed;vertical-align:middle;fon-size:1.2em;font-weight:600;margin:0 5px;') {{members.length || 0}}
              | 人
          .optbar(style='width:70%;text-align:right;float:right;')
            span(style='font-size:0.8em') 昵称或Id
            input(style='width:2rem;line-height:1.5;border:1px solid gray;border-radius:5px;margin:0 .5em;padding: 5px 10px;outline: none;' v-model ='keysword')
            span.btn(style='font-size:0.8em') 搜索
    group(style='margin:-10px 0;')
      ul.contentul
        li.header.clearfix
          div(style='text-align:left') 昵称
          div 邀请人
          div 邀请数
          div.align-r 入群时间
        li.contentli.clearfix(v-for='(meber, index) in memberlist', :key='meber.key')
          div.bottom_border
            div.align-l {{meber.nick || '玩家' + (index + i) }}
            div.align-l ({{meber.wxid | lenform }})
          div.bottom_border
            div(v-show="meber.invitorwx") {{meber.invitorwx | formart('nick')}}
            div(v-show="meber.invitorwx") {{meber.invitorwx | formart('wxid')}}
            div(v-show="!meber.invitorwx") --
          div.bottom_border(@click='meberShowmore(index)')
             div(style='height:100%;padding-top:.4em;padding-bottom:.4em;')
               span(style='font-size:1.6em;font-weight:600;vertical-align:middle') {{meber.submember.length || 0}}
               icon.icon(name='ico_rightp' height='1.8em' width='1.8em' style='color:#00b6ff;vertical-align: middle;transition:.5s all;' v-show="meber.submember.length", :class="{'icond':meber.showmore}")
             div(v-show='meber.showmore && meber.submember.length')
               ul(style='margin:5px;')
                 li(style='margin-top:.5em;' v-for="(submember, i) in meber.submember", :key='submember.key')
                   div(v-show="submember.nick") {{submember.nick}}
                   div(v-show="submember.wxid") {{submember.wxid | lenform}}
          div.bottom_border
             div.align-r {{meber.time | date('year')}}
             div.align-r {{meber.time | date('time')}}
</template>
<script>
  import { Tab, TabItem, Panel, Group, Cell, Flexbox, FlexboxItem, Sticky, Loading } from 'vux'
  import LocalStorageService from '@/service/storage'
  import circleService from '@/service/userScircle'
  // import { merge } from '@/utils/common'
  export default {
    name: 'circlemerber',
    components: {
      Tab,
      TabItem,
      Panel,
      Group,
      Cell,
      Flexbox,
      FlexboxItem,
      Sticky,
      Loading
    },
    data () {
      return {
        name: '张小迪',
        showmore: false,
        keysword: '',
        members: []
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.loading.isLoading
      },
      memberlist () {
        var members = this.members
        var keysword = this.keysword
        if (!keysword) return members
        return members.filter(v => {
          return (v.nick.indexOf(keysword) !== -1 || v.wxid.indexOf(keysword) !== -1)
        })
      }
    },
    created () {
      document.title = '圈子成员'
      var circledata = LocalStorageService.get('circlestr')
      if (circledata && circledata.id) {
        this.getMerber(circledata.id)
      }
    },
    methods: {
      onItemClick (val) {
        if (val) this.$router.push({ name: 'circlemerberlist' })
      },
      getMerber (id) {
        circleService.getTeamMembers({teamid: id}).then(res => {
          if (res.status === 200 && res.data) {
            if (!res.data.errcode) {
              this.members = res.data.members
              this.objMerberFormat()
            }
          }
        })
      },
      meberShowmore (index) {
        this.members[index].showmore = !this.members[index].showmore
        this.$set(this.members, index, this.members[index])
      },
      objMerberFormat () {
        if (!this.members || !this.members.length) return
        // var newmember = JSON.parse(JSON.stringify(this.members))
        var wxidlist = []
        var index
        this.members.map((v, i) => {
          v.submember = []
          if (v.wxid) wxidlist.push(v.wxid)
          else wxidlist.push(new Date().getTime() + i)
        })
        this.members.map(j => {
          if (j.invitorwx && j.invitorwx.wxid) {
            index = wxidlist.indexOf(j.invitorwx.wxid)
            var param = {
              wxid: j.wxid,
              nick: j.nick
            }
            this.members[index].submember.push(param)
          }
        })
      }
    },
    filters: {
      lenform: function (val) {
        if (!val || val.length <= 6) return val
        else return val.substring(val.length - 6)
      },
      date: function (val, type) {
        var time = new Date(val - new Date().getTimezoneOffset() * 60 * 1000)
        var newval = ''
        if (type === 'year') {
          newval += time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
        }
        if (type === 'time') {
          var minutes = time.getMinutes() < 10 ? ('0' + time.getMinutes()) : time.getMinutes()
          newval += time.getHours() + ':' + minutes + ':' + time.getMinutes()
        }
        if (type === 'dateTime') {
          newval += time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate() + ' ' + time.getHours() + ':' + time.getMinutes()
        }
        return newval
      },
      formart: function (val, type) {
        if (!val) return
        if (type === 'nick' && val.nick) {
          return val.nick.substring(val.nick.length - 6)
        } else if (type === 'wxid' && val.wxid) {
          return val.wxid.substring(val.wxid.length - 6)
        } else {
          return val
        }
      }
    }
  }
</script>
<style lang='less'>
  body {
    background: #f5f5f5;
  }
  .align-l {
    text-align: left;    
  }
  .align-r {
    text-align: right;
  }
  .active-6-2 {
    color: black !important;
    border-color: #04be02 !important;
  }
  .icond {
    transform: rotate(90deg);
  }
  ul.contentul {
    padding:10px;
  }
  ul.contentul li.header > div, ul.contentul li.contentli > div{
    color:gray;
    float:left;
    width:25%;
  }
  ul.contentul li.header {
    color:gray;
    padding-bottom:10px;
  }
  ul.contentul li.contentli > div{
    padding-top:.2rem;
    color:gray;
    font-size:.8em;
  }
  .bottom_border{
  border-top:1px solid #eaeaea;
  }
</style>
