<template lang="pug">
  mdb-modal(v-if="isShow" @close="isShow = false", :removeBackdrop='true', :fullHeight='true' position="top" success)
    mdb-modal-body
      mdb-row(center class="align-items-center")
        h2 
          mdb-badge(color="warning-color") 注意！！
        p(class="mx-4" v-html='content')
        mdb-btn(class="purple-gradient" @click="sureBack") 确 定
        mdb-btn(outline="blue-grey" @click="cancelBack") 取 消
</template>
<script>
  export default {
    name: 'deletData',
    props: {
      coupon: {
        type: Boolean,
        default: false
      },
      content: {
        type: String,
        default: '你确定要删除当前数据？'
      },
      callBackFunc: {
        type: Function
      }
    },
    data() {
      return {
      }
    },
    computed: {
      isShow () {
        return this.coupon
      }
    },
    created() {
    },
    methods: {
      cancelBack () {
        console.log('点击取消按钮')
        let isCancel = true
        this.callBackFunc && this.callBackFunc({ isCancel })
      },
      sureBack () {
        this.callBackFunc && this.callBackFunc()
      }
    }
  }
</script>
<style scoped>
</style>
