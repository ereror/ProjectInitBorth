<template>
  <div style="">
    <loading v-model="isLoading" style="position:absolute;z-index:99999"></loading>
    <loading v-model="loading" style="position:absolute;z-index:99999"></loading>
    <div style="height:44px;">
      <sticky>
         <tab>
            <tab-item @on-item-click="onItemClick('circlepolif')" active-class="active-6-1" style="color:#7f7f7f">我的分利树</tab-item>
            <tab-item @on-item-click="onItemClick" selected active-class="active-6-2" >我的圈子</tab-item>
            <tab-item @on-item-click="onItemClick('earnings')" active-class="active-6-3" style="color:#7f7f7f">我的收益</tab-item>
         </tab>
      </sticky>
    </div>
    <group label-width="5em" style="margin-top:-10px;color:#767676" v-for="item in itemList" :key='item.key' v-if="itemList.length">
        <div class="clearfix itemflex itemtitle" style="border:0;padding-buttom:0">
          <div class="imgH">
              <div class="img">
                  <img :src="item.icon">
              </div>
              <div class="contentH">
                <div class="title">{{item.name}}</div>
                <div class="smtitle"> 
                  <span><icon class="icon" name="ico_edit"></icon></span>
                  <span>{{ item.id || 0}}</span> 
                  <span style="margin-left:1em"><icon class="icon" name="ico_persons"></icon></span>
                  <span>{{ item.members || 0}}</span>
                </div>
              </div>
          </div>
          <div class="titleH">
            <span v-if="!item.games && item.lasttime">
              <span style="color:">最近活跃:</span>
              <span style="font-weight:600;font-family:simhei;font-size:1.2em;color:#3ca4ff">{{item.lasttime | date}}</span>
            </span>
            <span v-if="item.games">
              <span style="color:">今日游戏(局)</span>
              <span style="font-weight:600;font-family:simhei;font-size:1.2em;color:#3ca4ff"> {{item.games}} </span>
            </span>
          </div>
        </div>
        <div class="clearfix itemflex" style="padding:0 0.75em;boder:0">
          <div class="imgH" style="display:block;width:100%;">
            <div class="msgH">
              <icon class="icon" name="ico_voice"></icon>
              <span>{{item.introduce || '空'}}</span>
            </div>
          </div>
          <div class="imgH" style="display:block;width:100%;">
            <div class="msgH">
              <icon class="icon" name="ico_coins"></icon>
              <span class="rcolor">{{item.price | ratio}}基准房费</span>
              <span v-show='item.addprice'>（{{item.addprice | calcf}}）</span>
            </div>
          </div>
        </div>
        <div class="clearfix itemflex" style="padding:0">
          <div class="titleH" style="text-align:right">
            <span class="btn" @click="gotoCircleMerber(item)">成员</span>
            <span class="btn" @click="gotoCircle(item)">设置</span>
            <router-link :to="{ name: 'circledata', params: { circleId: item.id }}" class="btn">活跃度</router-link>
            <span class="btn" @click='goHistory(item)'>牌局详情</span>
          </div>
        </div>
    </group>
    <div v-if="!itemList.length && isready">
       <div style='position:absolute;z-index:2;top:50%;margin:0 auto;padding:0 3em;width:100%;height:200px;transform: translateY(-50%);'>
         <div style="width:15em;text-align:center;margin:0 auto;font-size:1.4em;">你还没有圈子，快去创建一个共享平台的分利吧！</div>
         <div style="font-weight:600">创建圈子步骤</div>
         <ul>
           <li>1.在微信上添加客服小妹为好友，领取微信机器人，微信号:WX88888</li>
           <li>2.创建一个微信群，将微信机器人拉入群中</li>
           <li>3.在微信群中，输入命令“建群”，机器人就已为您建好了对应的圈子</li>
           <li>4.微信群成员在群中输入“id888888”，即被机器人拉入了圈子</li>
           <li>5.只需在微信群中输入“开房”，机器人即会为您在圈子中开好房间并将链接发在微信群中</li>
         </ul>
       </div>
    </div>
  </div>
</template>
<script>
  import { Tab, TabItem, Panel, Group, Cell, Flexbox, FlexboxItem, Sticky, Loading } from 'vux'
  import circleService from '@/service/userScircle'
  import LocalStorageService from '@/service/storage'
  import { calcrem } from '@/utils/common'
  import { getAccessCode } from '@/utils/tools'
  calcrem()
  export default {
    name: 'wecle',
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
        loading: false,
        isready: false,
        itemList: []
      }
    },
    computed: {
      isLoading () {
        return this.$store.state.loading.isLoading
      }
    },
    created () {
      document.title = '九点娱乐--我的后台'
      var code = ''
      var str = location.href
      var mcode = /(?:code=)(\w*)/ig
      var resultc = str.match(mcode)
      if (resultc && resultc.length) code = resultc[0].substring(5)
      if (code) {
        var that = this
        var time = new Date().getTime()
        var store = LocalStorageService.get('storeState')
        if (store) that.$store.commit('setstore', store)
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
        this.$router.push({ name: 'circlemerber' })
      },
      gotoCircle (param) {
        LocalStorageService.set('circlestr', JSON.stringify(param))
        this.$router.push({ name: 'circleset' })
      },
      goHistory (param) {
        LocalStorageService.set('circlehistoryData', JSON.stringify(param))
        this.$router.push({ name: 'circlehistory' })
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
      },
      calcf: function (val) {
        if (!val || Object.prototype.toString.call(val) !== '[object Array]') return
        var str = ''
        val.map(v => {
          var addprice = 0
          if (v.condition === 4) addprice = v.addprice + 2
          if (v.condition === 8) addprice = v.addprice + 3
          if (v.condition === 12) addprice = v.addprice + 4
          str += v.condition + '局' + addprice + '房卡、'
        })
        if (str) str = str.substring(0, str.length - 1)
        return str
      }
    }
  }
</script>
<style scoped lang="less">
  @import '~vux/src/styles/1px.less';
  @import '~vux/src/styles/center.less';
  html, body {
    height: 100%;
    width: 100%;
    overflow-x: hidden;
  }

  * {
    text-align: left;
  }
   
  body {
    height:1400px;
  }
  .icon {
    height:1.2em;
    width:1.2em;
    vertical-align: top;
  }

  .active-6-1 {
    color: rgb(252, 55, 140) !important;
    border-color: rgb(252, 55, 140) !important;
  }
  .active-6-2 {
    color: black !important;
    border-color: #04be02 !important;
  }
  .active-6-3 {
    color: rgb(55, 174, 252) !important;
    border-color: rgb(55, 174, 252) !important;
  }
  .tab-swiper {
    background-color: #fff;
    height: 100px;
  }
  .itemflex {
    width:100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    overflow:hidden;
    flex-wrap: wrap;
    padding:.5em;
    border-bottom:1px solid #f1f1f1;
  }
  .itemtitle{
    align-items:flex-start;
  }
  .btn {
    display: inline-block !important;
    padding: .4em;
    border-radius: 5px;
    color: #44a7ff;
    min-width: 5em;
    border: 2px solid;
    text-align: center;
  }
  .imgH {
    flex-grow: 5;
    &>div {
      display: inline-block;
    }
    & .msgH {
      font-size:.8em;
      & .rcolor{
        color:red;
      }
    }
    & .contentH {
      vertical-align: top;
      & .title{height:40px;line-height:40px;font-weight:600;}
      & .smtitle{font-size:0.8em;height:20px;}
    }


  }
  .titleH {
    flex-grow: 2;
    font-size: 0.8em;
    padding:.5em;
    text-align: right;
    & a {
      display:inline;
    }
  }
</style>
<style>
  .vux-tab-ink-bar {
    background-color: #44a8ff !important;
  }
</style>
