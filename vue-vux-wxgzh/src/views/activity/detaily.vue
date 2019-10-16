<template lang='pug'>
  .contain
    .header
      img(src='~assets/image/xy.png' @click="dealxy()")
      img.dg(src='~assets/image/gou.png' v-show='agree')
    .content
      .detail(style="height:100%;width:100%;border:1px solid gray;padding:0 0.3rem;")
        .title.clearfix
          .float-l
            span.fcolor 第xx期 （01-01 晚 9:00 ~ 01-07 晚 9:00）
          .float-r
            span.fcolor 开奖倒计时 7天23:12:12
        .detailbox.clearfix
          .item
          .item
          .item
          .item
        .bottom.clearfix
          div.float-l.btnbox.sectionbtn
            img(src='~assets/image/tybtn.png')
          div.float-l.center
            .detailcenter
              div.ditem
                div.ditemtitle
                  span 玩家：
                  span 名字六个字
                div.ditemtitle
                  span 奖券：
                  span 123456
                div.smtitle
                  span 一等奖
              div.ditem
                div.ditemtitle
                  span 玩家：
                  span 名字六个字
                div.ditemtitle
                  span 奖券：
                  span 123456
                div.smtitle
                  span 一等奖
              div.ditem
                div.ditemtitle
                  span 玩家：
                  span 名字六个字
                div.ditemtitle
                  span 奖券：
                  span 123456
                div.smtitle
                  span 一等奖
          div.float-l.btnbox
            img(src='~assets/image/tybtn.png')
</template>
<script>
  export default {
    name: 'detaily',
    components: {
    },
    data () {
      return {
        agree: true
      }
    },
    computed: {
      accessToken () {
        return this.$store.state.wxToken.accesswxToken
      }
    },
    created () {
    },
    methods: {
      dealxy () {
        this.agree = !this.agree
      }
    }
  }
</script>
<style lang='less'>
  * {
    box-sizing: border-box;
  }
  .contain {
    position:relative;
    height: 7.6rem;
    border: 1px solid gray;
    border-radius: 5px;
    background: url('~assets/image/penl2.png');
    background-size: 100% 100%;
    & .float-l {
      float: left;
    }
    & .float-r {
      float: right;
    }
    & .fcolor {
      color: #faf3b8;
      font-size: .3rem;
      line-height: 0;
    }
    & .header {
      position:relative;
      height: 1rem;
      /* overflow: hidden; */
      padding-left: .4rem;
      vertical-align: middle;
      display: flex;
      align-items: center;
      & img {
        height: .34rem
      }
      & .dg {
        height: .34rem;
        top: 35%;
        position: absolute;
        z-index:2;
      }
    }
    & .content {
      height: 3.4rem;
      position: absolute;
      bottom: 0.2rem;
      width: 100%;
      padding: 0px 0.4rem;
      box-sizing: border-box;
      & .detail {
        height:100%;
        width:100%;
        border:1px solid gray;
        padding:0 0.3rem;
        & .title {
          line-height: .6rem;
          height: .6rem;
          text-shadow: 0.5px 0px 0px, -0.5px 0px 0px;
          font-size: .1rem;
          zoom: .8;
        }
        & .detailbox {
          height:2rem;
          & .item {
            position:relative;
            float:left;
            width:25%;
            height:2rem;
            background:url('~assets/image/hbao.png');
            background-size:100% 100%;
          }
        }
        & .bottom {
          height:.8rem;
          display: flex;
          font-size: 0;
          & .btnbox {
            width:25%;
            & img {
              height: .8rem;
            }
          }
          & .sectionbtn {
            text-align: right;
          }
          & .center {
            width:50%;
            padding:0 .1rem;
            & .detailcenter {
              height:100%;
              width:100%;
              background:url('~assets/image/gdlun.png');
              background-size:100% 180%;
              background-position: 0px -10px;
              font-size: .1rem;
              padding: 0 .3rem;
              & .ditem {
                display: flex;
                height: .25rem;
                color: white;
                padding: 0 0.3rem;
                & .ditemtitle {
                  color: white;
                  width: 40%;
                  transform: scale(.8);
                }
                & .smtitle {
                  transform: scale(.8);                  
                }
              }
            }
          }
        }
      }
    }
  }
</style>
