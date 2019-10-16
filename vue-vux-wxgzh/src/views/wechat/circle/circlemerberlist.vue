<template lang='pug'>
  div
    loading(v-model='isLoading' style='position:absolute;z-index:99999')
    div(style="height:108px;")
      sticky(style="background:white")
       tab
          tab-item(@on-item-click="onItemClick('circlemerber')" active-class='active-6-1' style='color:#7f7f7f') 成员列表
          tab-item(@on-item-click='onItemClick' selected active-class='active-6-2' ) 成员动态
       group(style='margin:-10px 0;')
        .titlebar.clearfix(style='width:100%;overflow:hidden;padding:10px 10px;display: flex;align-items: center;')
          .titlel(style='width:30%;text-align:left;float:left;font-size:.8em;color:#636363;line-height:2.5')
            span(v-show="false")
              | 共计 
              span(style='color:#47a4ed;vertical-align:middle') {{memberlist.length || 0}}
              | 人
          .optbar(style='width:70%;text-align:right;float:right;')
            span(style='font-size:0.8em') 昵称或Id
            input(style='width:2rem;line-height:1.5;border:1px solid gray;border-radius:5px;margin:0 .5em;padding: 5px 10px;outline: none;' v-model ='keysword')
            span.btn(style='font-size:0.8em') 搜索
    group(style='margin:-10px 0;')
      ul.contentul
        li.header.clearfix
          div(style='text-align:left') 昵称
          div 时间
          div 动作
          div.align-r 备注
        li.contentli.clearfix(v-for="(action, index) in memberlist", :key="action.key")
          div.bottom_border
            div.align-l {{action.nick || '玩家' + (index + 1)}}
            div.align-l ({{action.wxid | lenform}})
          div.bottom_border(style='padding-left:10px;')
            div.align-l {{action.time | date('year')}}
            div.align-l {{action.time | date('time')}}
          div.bottom_border
            div {{action.type | formatType}}
          div.bottom_border
            div(v-show="action.nick_other") {{action.nick_other}}
            div(v-show="action.wxid_other") ({{action.wxid_other | formatLen}})
</template>
<script>
  import { Tab, TabItem, Panel, Group, Cell, Flexbox, FlexboxItem, Sticky, Loading } from 'vux'
  import LocalStorageService from '@/service/storage'
  import circleService from '@/service/userScircle'
  export default {
    name: 'circlemerberlist',
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
        keysword: '',
        actions: []
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.loading.isLoading
      },
      memberlist () {
        var actions = this.actions
        var keysword = this.keysword
        if (!keysword) return actions
        return actions.filter(v => {
          return (v.nick.indexOf(keysword) !== -1 || v.wxid.indexOf(keysword) !== -1)
        })
      }
    },
    created () {
      document.title = '成员动态'
      var circledata = LocalStorageService.get('circlestr')
      if (circledata && circledata.gid) {
        this.getMerber(circledata.gid)
      }
    },
    methods: {
      onItemClick (val) {
        if (val) this.$router.push({ name: 'circlemerber' })
      },
      getMerber (id) {
        circleService.getTeamActions({gid: id}).then(res => {
          if (res.status === 200 && res.data) {
            if (!res.data.errcode) {
              this.actions = res.data.actions
            }
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
        var time = new Date(val)
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
      formatType: function (val) {
        // 1:建群, 2:入群, 3：退群， 4：改名
        var str = ''
        switch (val) {
          case 1:
            str = '建群'
            break
          case 2:
            str = '入群'
            break
          case 3:
            str = '退群'
            break
          case 4:
            str = '改名'
            break
        }
        return str
      },
      formatLen: function (val) {
        if (!val) return
        return val.substr(-6)
      }
    }
  }
</script>
<style lang='less'>
  body {
    background: #f5f5f5;
  }
  .align-l {
  	text-align:left;
  }
  .align-r {
    text-align: right;
  }
  .active-6-2 {
    color: black !important;
    border-color: #04be02 !important;
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
