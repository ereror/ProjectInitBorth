<template lang='pug'>
  .userlist(style='height:100%;')
    loading(v-model="isLoading")
    ul(style='margin-top:.5rem;padding-left:.1rem;overflow:auto;max-height:85%;')
      li.fl(v-for='(item, i) in userData', :class='i % 3 === 2 ? "endLine": ""')
        span.btn(@click='resetUserData(i)') {{item.id}}
    div(style='border-top:2px solid gray;margin-top:.4rem;padding:.4rem;')
      span.btn(@click='createUser(3)') 增加三个玩家账号
</template>
<script>
  import LocalStorageService from '@/service/storage'
  import activeService from '@/service/activity'
  import { Loading } from 'vux'
  export default {
    components: { Loading },
    name: 'userlist',
    data () {
      return {
        name: 'areyouok',
        userData: [],
        count: 27,
        userlistData: {
          count: 0
        },
        isLoading: false
      }
    },
    created () {
      var userlistData = LocalStorageService.get('userlistData')
      if (userlistData) {
        this.userlistData = userlistData
        this.count = userlistData.count || 27
      }
      this.createUser(this.count)
    },
    methods: {
      createUser (count) {
        count = count || 1
        var id = this.userData && this.userData.length && this.userData[this.userData.length - 1] && this.userData[this.userData.length - 1].id || 10000
        for (var i = 1, len = count; i <= len; i++) {
          var temp = {
            id: id + i,
            val: id
          }
          this.userData.push(temp)
        }
        this.userlistData.count = this.userData.length
        LocalStorageService.set('userlistData', this.userlistData)
      },
      resetUserData (index) {
        var temp = {
          userid: this.userData[index].id,
          gold: 250000,
          duobao_tickets: 0,
          doa_tickets: 0
        }
        if (index < 9) temp.doa_tickets = 999
        this.isLoading = true
        activeService.ResetUserData(temp).then(res => {
          this.isLoading = false
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.$vux.toast.show({
              text: '重置成功',
              time: 1000,
              type: 'success'
            })
          } else {
            this.$vux.toast.show({
              text: '重置失败',
              time: 1000,
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>
<style scoped lang='less'>
  .userlist ul {
    margin-top: .9rem;
    & li{
      width:32%;margin-right:1.5%;
    }
    & li.endLine {
      width:32%;margin-right:0;
    }
  }
  .userlist {
  	& span.btn {display:block;padding:.2rem 1rem;border-radius:2px;border:2px solid gray;margin-bottom:.2rem;}
  }
</style>
