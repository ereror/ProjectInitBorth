<template lang="pug">
  div.contain
    mu-row(gutter style='height:700px;margin: 50px auto;')
      mu-col(span="12")
        el-card.contentheader
          h2(style='text-align:center;margin-top:-15px;padding:10px 0 10px 0;') 
            span 房间列表
          el-table.el-table(:data="roomData" border style="width:100%" stripe size='small', :height="roomData.length >= 10 ? '615' : ''")
            el-table-column(label='序号' align='center' type='index' width='80' show-overflow-tooltip)
            el-table-column(label='地址' align='center' prop='address')
            el-table-column(label='创建时间' align='center' prop='createTime')
            el-table-column(label='端口号' align='center' prop='port')
            el-table-column(label='房间ID' align='center' prop='roomId')
          //- mu-flex(justify-content="center" style='margin-top:20px;')
          //-   mu-pagination(raised circle, :total='total', :current.sync='current', :page-size='10' color='black' @change='getUserList')
</template>
<script>
  import UserManagerService from '@/services/usermanager'
  import date from '@/filters/date'
  export default {
    name: 'userset',
    loading: false,
    data() {
      return {
        roomData: [{
          address: '',
          createTime: '',
          port: 10,
          roomId: 12
        }]
      }
    },
    created () {
      this.getRoomList()
    },
    methods: {
      getRoomList (num) {
        // 查询玩家信息
        UserManagerService.getRoomList().then(res => {
          if (res.status === 200 && res.data && res.data.ok) {
            var obj = res.data && res.data.data || []
            this.$set(this, 'roomData', obj)
            this.roomData.map(v => {
              if (v.createTime) v.createTime = date(v.createTime)
            })
          }
        })
      }
    },
    filters: {
    }
  }
</script>
<style scoped>
  .contain {
    margin: 50px auto;
    & .contentheader {padding:0;}
    & .iconimg {height:30px;width:30px;border-radius:50%;vertical-align: bottom;margin-right:10px;}
  }
</style>
<style>
  .mu-pagination-item.mu-button.is-current{background-color: black;}
</style>
