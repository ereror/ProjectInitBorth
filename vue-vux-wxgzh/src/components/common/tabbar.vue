<template lang="pug">
  .wrapper
    tabbar
      tabbar-item(link="privateCenter", :class="{'isalive': modelactivity === 'my'}")
        div(slot="icon")
         icon.icon(name="ico_people")
        span(slot="label") 我
      tabbar-item(link="txrecode", :class="{'isalive': modelactivity === 'myBenefit'}")
        div(slot="icon")
          icon.icon(name="ico_recharge")
        span(slot="label") 我的收益
      tabbar-item(link="quzon", :class="{'isalive': modelactivity === 'myQuzon'}" v-show="false")
        div(slot="icon")
          icon.icon(name="ico_friend")
        span(slot="label") 我的圈子
      tabbar-item(link="tree", :class="{'isalive': modelactivity === 'myTree'}" v-show="false")
        div(slot="icon")
          icon.icon(name="transation")
        span(slot="label") 我的关系树
</template>
<script>
  import { Tabbar, TabbarItem } from 'vux'
  export default{
    components: {Tabbar, TabbarItem},
    name: 'mytabbar',
    data () {
      return {
      }
    },
    props: {
      modelactivity: {
        type: String,
        default: 'my'
      }
    }
  }
</script>
<style scoped>
.weui-tabbar{
  position:fixed;
}
</style>
<style lang="less">
.weui-tabbar{
  position:fixed;
  &  .isalive {
    color: black;
    &  .svg-icon {
      fill: #000000;
    }
    &  .weui-tabbar__label{
      color:black;
    }
  }
}
.icon {
  width: .6rem;
  height: .6rem;
}
</style>
