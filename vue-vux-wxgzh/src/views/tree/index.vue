<template lang="pug">
  div.tree.wrapperBody
    //- x-header(:right-options="{showMore: true}" @on-click-more="showMenus = true" style="background-color:#1c1c1f;") 我的关系树
    
    div.loading-box
      div.container
        mult-tree(:data="[data]", :level="1")
    mytabbar(:modelactivity="menus")
</template>
<script>
  import { XHeader } from 'vux'
  import circleService from '@/service/userScircle'
  import LocalStorageService from '@/service/storage'
  export default {
    name: 'tree',
    components: { XHeader },
    data () {
      return {
        menus: 'myTree',
        data: {}
      }
    },
    created () {
      document.title = '三级分利树'
      var store = LocalStorageService.get('storeState')
      if (store) this.$store.commit('setstore', store)
      this.data = {
        userid: this.$store.state.wxToken.userid,
        nick: this.$store.state.wxToken.unickname,
        icon: this.$store.state.wxToken.uheadeimgurl,
        down: [],
        showmore: false
      }
      // this.calcCount(this.data) // 对数据进行排序
      this.getUserDownData()
    },
    methods: {
      getUserDownData () {
        circleService.GetUserDown({userid: this.$store.state.wxToken.userid}).then(res => {
          if (!res.errcode) {
            this.$set(this.data, 'down', res.data)
            this.calcCount(this.data)
            console.log(this.data)
          }
        })
      },
      checkItem (val) {
        console.log(val)
        this.isb = val
      },
      calcCount (data) {
        data.total_one = data.down.length || 0
        data.total_two = 0
        data.total_three = 0
        data.showmore = false
        data.down.map(v => {
          if (v.down && v.down.length) {
            data.total_two += v.down.length
            v.total_one = v.down.length
            v.total_two = 0
            v.showmore = false
            v.down.map(j => {
              if (j.down && j.down.length) {
                data.total_three += j.down.length
                v.total_two += j.down.length
                j.total_one = j.down.length
                j.showmore = false
              }
            })
          }
        })
      }
    }
  }
</script>
<style scoped>
  .wrapperBody {
    background-color: black;
    height: 100VH;
  }
  
  .loading-box {
    height: calc(100% - 102px);
    overflow: auto;
  }
  
  .container {
    padding-right: 12px;
  }
</style>
