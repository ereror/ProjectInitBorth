<template lang="pug">
  router-view.body-container
</template>
<script>
  export default {
    name: 'setpmanager'
  }
</script>
<style>
  .contain {
    padding-top:80px;
    &  .blockquote {
      margin: .5rem -1rem;
    }
  }
  .el-table__body, .el-table__footer, .el-table__header {
    table-layout: auto;
  }
  table label {
    margin-bottom:0;
  }
</style>
