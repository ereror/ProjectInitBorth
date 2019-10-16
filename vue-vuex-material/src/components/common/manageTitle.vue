<template lang="pug">
  //- 管理页头标题
  div.manage-title
    h3 {{ `${type}管理` }}
    el-button.add-btn(type="primary", @click="clickHandle") {{ `添加${type}` }}
</template>
<script>
  export default {
    name: 'manageTitle',
    props: {
      // 管理类型
      type: {
        type: String,
        required: true
      },
      // 添加按钮点击事件
      clickHandle: {
        type: Function
      }
    },
    data() {
      return {
      }
    }
  }
</script>
<style scoped>
  .manage-title {
    display: flex;
    margin-bottom: 14px;

    &>h3 {
      font-size: 20px;
      margin-right: 20px;
    }
    &>.add-btn {
      margin-top: 3px;
      padding: 0 15px;
      width: 100px;
      height: 30px;
      border-radius: 4px;
    }
  }
</style>
