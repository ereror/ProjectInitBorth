<template lang='pug'>
  .container
    .centerboxyqdb(:class="{'huawei': isHuawei}")
        .messagebary(v-show='result')
            .spanbar
                span.uname {{name | nameform}} &nbsp;
                span.ugold {{score || 0}}
        .messagebarn(v-show='!result')
            .spanbar
        .optbtn
            .downloadbtn(@click="downloadfunc()")
            .downloadspan 未下载游戏
        .optbtn
            .downloadbtn.downloadbtn2(@click="openGamefunc()")
            .downloadspan 已下载游戏
                a(href='https://www.twiceway.com/openwith' id="openiosbtn" v-show="false")
</template>
<script>
  import { goDownload, openGame } from '@/utils/tools'
  export default {
    name: 'sharepoolresult',
    data () {
      return {
        name: 'result',
        result: false,
        score: 0,
        isHuawei: false
      }
    },
    created () {
      var nowresult = this.$route.params && this.$route.params.id
      if (nowresult && nowresult !== '0') {
        this.result = true
        this.name = this.$route.params && this.$route.params.name
        this.score = this.$route.params && this.$route.params.score
        console.log(this.$route.params)
      } else this.result = false
      var version = navigator.appVersion
      if (version.indexOf('HUAWEI') !== -1 || version.indexOf('Honor') !== -1) {
        this.isHuawei = true
      }
    },
    methods: {
      downloadfunc (val) {
        goDownload('', this)
      },
      openGamefunc () {
        openGame('', openios, this)
        function openios () {
          document.getElementById('openiosbtn').click()
        }
      }
    },
    filters: {
      nameform (val) {
        if (!val) return ''
        if (val.length > 3) {
          return val.substring(0, 3) + '...'
        } else return val
      }
    }
  }
</script>
<style scoped lang='less'>
   .container{
      position:relative;
      height:100%;
      background:url('~assets/image/snatch/yqdbbg.jpg') no-repeat;
      background-size:100% 100%;
      & .centerboxyqdb {
        width: 8rem;
        height: 11.8rem;
        border-radius: 0.1rem;
        margin-top: 3.5rem;
        position: absolute;
        left: 50%;
        margin-left: -4rem;
        &  .messagebary,  &  .messagebarn{
            position:relative;
            width:6rem;
            height:2rem;
            background:url('~assets/image/snatch/yqdbsuccess.png') no-repeat;
            background-size:100% 100%;
            margin: .5rem auto;
            overflow: hidden;
            color: #f7d99e;
            margin-bottom:1.5rem;
            & .spanbar{
                height:1rem;
                line-height:1.2rem;
                margin-top:1rem;
                font-size: .6rem;
                &  .uname {
                    float: left;
                    display: inline-block;
                    width: 2.6rem;
                    text-align: left;
                    padding-right: .8rem;
                    overflow: hidden;                    
                }
                &  .ugold {
                    float: left;
                    font-size:0.6rem;
                    margin-left:-.1rem;
                }
            }
        }
        &  .messagebarn {
            background:url('~assets/image/snatch/yqdbfail.png') no-repeat;
            background-size:100% 100%;
        }
        &  .optbtn {
            margin-top:.5rem;
            height:2.6rem;
            width:100%;
            &  .downloadbtn {
                background:url('~assets/image/snatch/yqdudownload.png') no-repeat;
                background-size:100% 100%;
                height: 1.3rem;
                width: 50%;
                margin: 0 auto;
            }
            &  .downloadspan {margin-top:.1rem;color:#f5d198;font-size:.5rem;}
            &  .downloadbtn2 {
                background:url('~assets/image/snatch/dkyy.png') no-repeat;
                background-size:100% 100%;
            }
        }
      }
      &  .huawei{
        margin-top: 2.8rem;
      }
   }
</style>
