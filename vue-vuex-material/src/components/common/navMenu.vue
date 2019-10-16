<template lang="pug">
  //- APP左侧导航菜单
  div.navmenu(class="deep-purple-skin")
    el-menu(:router="true" class='cloudy-knoxville-gradient', :default-active="navselected", :active="navselected")
      //- el-menu-item(index="/userManager/aream" v-if="level === '2'")
      //-   i.el-icon-menu
      //-   span(slot="title") 区域管理
      el-submenu(index="1")
        template(slot="title")
          //- img(src="~assets/imgs/ico_school.png", draggable="false")
          icon.icon(name='winprize')
          span 抽奖活动管理{{navselected}}
        el-menu-item(index="/setmanager/giftset") 
          icon.icon(name='prize02')
          span 奖品组列表
        el-menu-item(index="/setmanager/timeset")
          icon.icon(name='timelist02')
          span 时间表
      el-submenu(index="2")
        template(slot="title")
          //- img(src="~assets/imgs/ico_school.png", draggable="false")
          icon.icon(name='txmoney')
          span 提现管理
        el-menu-item(index="/setmanager/txset") 
          icon.icon(name='applyrecode2')
          span 提现申请列表
        el-menu-item(index="/setmanager/applycode")
          icon.icon(name='applyrecode')
          span 提现记录
      el-submenu(index="3")
        template(slot="title")
          //- img(src="~assets/imgs/ico_school.png", draggable="false")
          icon.icon(name='advice')
          span 信息管理
        el-menu-item(index="/msgmanager/advm") 
          icon.icon(name='yjfk')
          span 意见反馈
        el-menu-item(index="/msgmanager/goup")
          icon.icon(name='goup')
          span 我要上首页
    div(class="sidenav-bg mask-strong")
</template>
<script>
  import storage from '@/services/storage'
  export default {
    name: 'navMenu',
    data () {
      return {
        level: '',
        active: {
          0: false
        },
        toggleA: false,
        navselected: '/setmanager/applycode'
      }
    },
    created () {
      console.log(this.navselected)
    },
    methods: {
      login() {
        storage.set('loginname', '')
        location.href = '/login'
        return false
      },
      handleBtnAClick() {
        this.toggleA = !this.toggleA
      },
      getNavType () {
        console.log('123')
        this.navselected = this.$store.state.navselected;
      }
    },
    watch: {
      '$store.state.navselected': 'getNavType'
    }
  }
</script>
<style scoped>
  .navmenu {
    width: 200px;
    height: 100%;
    /*background-color: #606266;*/
    border-right: 1px solid #606266;
    align-items: flex-start;
    padding: 0;
    & img {
      margin-right: 8px;
      vertical-align: middle;
    }
    &>.el-menu {
      background: rgba(255,255,255, .1);
      width:100%;
      & li {
        border-bottom:1px solid rgba(255,255,255, .1);
        background-color: rgba(255,255,255, .1);
        transition: all .2s;
      }
    }
    &  .icon {
      height: 20px;
      width: 20px;
      margin-right: 10px;
    }
  }
  .el-submenu .el-menu {
    background: rgba(255,255,255, .1) !important;
  }
  .el-submenu .el-menu-item {
    padding-left: 42px !important;
    min-width:0px;
    background: rgba(255,255,255, .1);
  }
  .el-submenu .el-menu-item:hover {
    color: white;
    background-color: rgba(50, 81, 171, .5);
  }
  .el-menu-item i{
    font-size: 1.8em;
    margin-right: .6em;
  }
  .sidenav-bg {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: 200px;
    z-index: -1;
    background-attachment: fixed;
    background-image: url('~assets/imgs/bg01.jpg');
    background-size:cover;
    background-position: center;
    filter:grayscale(20%);
  }
.navbar .dropdown-menu a:hover {
  color: inherit !important;
}
</style>
<style>
  .el-submenu .el-menu {
    background: rgba(255,255,255, .1) !important;
  }
</style>
