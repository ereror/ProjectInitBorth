<template lang="pug">
  div.not-found-container.animated.zoomIn
    h1 404!
    p 你来到一片没人的荒漠
    mdb-btn.go-back-btn(type="primary", @click="goBack") 返回上一页
</template>
<script>
  export default {
    name: 'notFound',
    methods: {
      goBack() {
        this.$router.back()
      }
    }
  }
</script>
<style scoped>
  .not-found-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    &>h1 {
      font-size: 50px;
    }
  }
  .go-back-btn {
    width: 200px;
    margin: 10px auto;
  }
</style>
