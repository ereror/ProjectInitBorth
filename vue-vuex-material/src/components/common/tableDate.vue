<template lang="pug">
  //- table数据管理
  div.tableData
    el-table(:data='cesData.data', :style='cesData.tableStyle' border, size='small')
      el-table-column(type='index', label='序号' width='50' align='center')
      el-table-column(v-for='(item, index) in cesData.headerOption', :key="index + 1", :prop='item.prop', :label='item.name', :width='item.width' , :align="'center' || 'left'")
        template(slot-scope='scope')
          el-button.btnopt(type='primary' v-if='item.subname && item.subname.length && !btn.isrelate' size='mini' v-for='btn in item.subname' @click='callbackfun(btn, scope.row)', :key='btn.name') {{btn.name}}
          el-button.btnopt(type='primary' v-if='item.subname && item.subname.length && btn.isrelate && scope.row[btn.isrelate]' size='mini' v-for='btn in item.subname' @click='callbackfun(btn, scope.row)', :key='btn.name') {{btn.name}}
          span(v-if='!item.suname && (item.prop.indexOf("player") > -1)' v-html="scope.row[item.prop]")
          span(v-if='!item.suname && (item.prop.indexOf("player") === -1)' v-html="scope.row[item.prop]")
    .divpage(style="text-align:center;margin-top:20px;line-height:20px;" v-show='cesData.pageable')
      el-pagination(small layout="total, prev, pager, next, jumper", :total="page.total", :page-size='page.pagesize', :current-pag="page.pagenum" @current-change="handleCurrentChange")
</template>
<script>
  export default {
    name: 'tableData',
    props: {
      // 管理类型
      tableData: {
        type: Object,
        default: {},
        required: true
      },
      page: {
        type: Object,
        default: {
          total: 0,
          pagesize: 10,
          pagenum: 1
        }
      }
    },
    data() {
      return {
        cesData: {
          tableStyle: {width: '100%'},
          headerOption: [],
          data: []
        }
      }
    },
    created() {
      this.cesData = this.tableData
    },
    methods: {
      callbackfun(btn, obj) {
        console.log(obj)
        this.$emit('callbackfunc', {
          model: this.cesData && this.cesData.model,
          optobj: obj,
          type: btn.name
        })
      },
      handleCurrentChange() {
        this.$emit('callbackmore', this.page)
      }
    }
  }
</script>
<style scoped>
  .tableData {
    margin-bottom: 0px;
    &  .btnopt {margin:2px;}
  }
  .divpage {
    text-align: center;
    & .el-pagination {
      display:flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>
