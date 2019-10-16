<template lang='pug'>
  .userlist(style='height:100%;')
    loading(v-model="isLoading")
    ul(style='margin-top:.5rem;padding-left:.1rem;overflow:auto;max-height:85%;')
      li
        group
          x-input(title="ID" v-model="userid" text-align='right'  type='number')
      li
        group
          x-input(title="金币" v-model="gold" text-align='right'  type='number')
      li
        group
          x-input(title="夺宝券" v-model="duobao_tickets" text-align='right' type='number')
      li
        group
          x-input(title="闯关券" v-model="doa_tickets" text-align='right' type='number')
      li
        group
          x-input(title="闯关关卡" v-model="doa_level" text-align='right' type='number')
    .row(style='padding-top:10px;')
      span(style='margin-right:10px;') 0:未报名
      span(style='margin-right:10px;') 1:已报名
      span(v-show='doa_level - 1 > 0' style='margin-right:10px;') 已闯{{doa_level - 1}}关 
    div(style='border-top:2px solid gray;margin-top:.4rem;padding:.4rem;')
      span.btn(@click='resetUserData()') 确定
</template>
<script>
  import activeService from '@/service/activity'
  import { Loading, XInput, Group } from 'vux'
  export default {
    components: { Loading, XInput, Group },
    name: 'userlist',
    data () {
      return {
        name: 'areyouok',
        isLoading: false,
        userid: 0,
        gold: 250000,
        duobao_tickets: 0,
        doa_tickets: 0,
        doa_level: 0
      }
    },
    created () {
    },
    methods: {
      resetUserData () { 


           
        var temp = {
          userid: this.userid || 10001,
          gold: this.gold || 250000,
          duobao_tickets: this.duobao_tickets || 0,
          doa_tickets: this.doa_tickets || 0,
          doa_level: this.doa_level || 0
        }
        this.isLoading = true
        activeService.ResetUserData(temp).then(res => {
          this.isLoading = false
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.$vux.toast.show({
              text: '设置成功',
              time: 1000,
              type: 'success'
            })
          } else {
            this.$vux.toast.show({
              text: '设置失败',
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
    & .fl-l {
      float:left;
    }
    margin-top: .9rem;
  }
  .userlist {
  	& span.btn {display:block;padding:.2rem 1rem;border-radius:2px;border:2px solid gray;margin-bottom:.2rem;}
  }
</style>
