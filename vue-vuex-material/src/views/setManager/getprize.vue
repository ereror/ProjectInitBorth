<template lang="pug">
  div.contain
    mdb-row
      mdb-col(md="12")
      mdb-card(class='col-md-12')
        blockquote(class="blockquote bq-primary")
          el-breadcrumb(separator-class="el-icon-arrow-right")
            el-breadcrumb-item 首页
            el-breadcrumb-item 提现管理
            el-breadcrumb-item 提现列表
    mdb-row.seartable
      mdb-col(md="12")
        mdb-card(class='col-md-12' style='padding-bottom:30px;')
          mdb-col(md="12")
            .flex-r.float-r.searchBox(md="4")
                mdb-input(class="mr-sm-2" type="text" placeholder="用户账号" aria-label="用户账号")
                mdb-input(class="mr-sm-2" type="text" placeholder="提现账号" aria-label="提现账号")
                mdb-input(class="mr-sm-2" type="text" placeholder="姓名" aria-label="姓名")
                mdb-btn(class="blue-gradient" rounded size="sm" type="submit" class="mr-auto") 查询
          mdb-col(md="12")
            el-table.el-table(:data="prizeData" border stripe size='small', max-height="'580'" style='width:100% !important;')
              el-table-column(type="selection" width="40")
              el-table-column(label='订单号' align='center' prop='id' width='200')
              el-table-column(label='账号/OpenID' align='center' prop='uid' width="180")
              el-table-column(label='用户昵称' align='center' prop='nickname' width="120")
              el-table-column(label='时间' align='center' width="180" sortable)
                template(slot-scope='scope')
                  span {{scope.row.create_time * 1000 | date}}
              el-table-column(label='提现方式' align='center' width="80")
                template(slot-scope='scope')
                  span 支付宝
              el-table-column(label='姓名' align='center' prop='zfb_name')
              el-table-column(label='提现账户' align='center' prop='zfb_account')
              el-table-column(label='当前收益' align='center' prop='curmoney')
              el-table-column(label='申请提现金额' align='center' prop='money')
              el-table-column(label='操作' align='center')
                template(slot-scope='scope')
                  mdb-btn(type='primary' class='btn btn-sm' color='blue' @click.native='txFunc(scope.row.id)' v-show='!scope.row.get_time') 同意提现
                  span(v-if='scope.row.get_time') 已提现
            mdb-col(md="12" style='margin-top:20px;')
              .float-r
                el-pagination(:page-size="query.pagesize", layout="total, prev, pager, next, jumper", :total="query.total" @size-change="handleSizeChange" @current-change="handleCurrentChange")
</template>
<script>
  import giftService from '@/services/giftService'
  export default {
    name: 'txset',
    loading: false,
    data() {
      return {
        prizeData: [],
        query: {
          page: 1,
          pagesize: 10,
          total: 0
        }
      }
    },
    created () {
      this.getPrizeList()
    },
    methods: {
      getPrizeList () {
        let { page, pagesize } = this.query
        giftService.getTixianList({page, pagesize}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            this.query.total = res.data && res.data.data && res.data.data.total
            this.prizeData = res.data && res.data.data && res.data.data.data
          }
        })
      },
      txFunc (id) {
        // 后台处理提现
        let temp = {
          id: id,
          cancel: 0
        }
        giftService.handleTixianOrder(temp).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            this.message('操作成功！', true)
            this.getPrizeList()
          } else {
            this.message('操作失败，请稍后重试！', false)
          }
        })
      },
      handleSizeChange (page) {
        this.query.page = page
        this.getPrizeList()
      },
      handleCurrentChange (page) {
        this.query.page = page
        this.getPrizeList()
      },
      message (str, boolen) {
        if (boolen) {
          this.$notify.success({
            title: '成功',
            message: str,
            duration: 1000,
            iconClass: 'el-icon-success'
          })
        } else {
          this.$notify.error({
            title: '失败',
            message: str,
            duration: 1000,
            iconClass: 'el-icon-error'
          })
        }
      }
    },
    filters: {
    }
  }
</script>
<style scoped>
.prizespan:not(:last-child):after{
  content: '、';
  font-size: 24px;
}
.seartable {
  margin: 30px -30px 0 -30px;
}
.danger-color {
  background-color: #ff4444 !important;
}
.hbicon {margin:0 .5em;font-size:20px;}
</style>
