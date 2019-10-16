<template>
  <div>
    <span>404 没有找到相关页面</span>
    <span @click="goBack">返回上一页</span>
  </div>
</template>
<script>
  export default {
    name: 'notFound',
    methods: {
      goBack () {
        this.$router.back()
      }
    }
  }
</script>
