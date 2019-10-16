<template lang="pug">
  div.contain
    mdb-row
      mdb-col(md="12")
      mdb-card(class='col-md-12')
        blockquote(class="blockquote bq-primary")
          el-breadcrumb(separator-class="el-icon-arrow-right")
            //- el-breadcrumb-item(:to="{ path: '/' }") 首页
            el-breadcrumb-item 首页
            el-breadcrumb-item 提现管理
            el-breadcrumb-item 提现记录
    mdb-row.seartable
      mdb-col(md="12")
        mdb-card(class='col-md-12' style='padding-bottom:30px;')
          mdb-col(md="12")
            .flex-r.float-r.searchBox(md="4")
                mdb-input(class="mr-sm-2" type="text" placeholder="用户账号" aria-label="用户账号")
                mdb-input(class="mr-sm-2" type="text" placeholder="用户昵称" aria-label="用户昵称")
                mdb-input(class="mr-sm-2" type="text" placeholder="提现姓名" aria-label="提现姓名")
                mdb-input(class="mr-sm-2" type="text" placeholder="提现账号" aria-label="提现账号")
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
              el-table-column(label='申请提现金额' align='center')
                template(slot-scope='scope')
                  span {{scope.$row.money / 100}}元
              el-table-column(label='备注' align='center')
                template(slot-scope='scope')
                  span {{scope.row.comment}}
              el-table-column(label='操作' align='center')
                template(slot-scope='scope')
                  mdb-btn(type='primary' class='btn btn-sm' color='blue' @click.native='beiedit(scope.row)') 备注
            mdb-col(md="12" style='margin-top:20px;')
              .float-r
                el-pagination(:page-size="query.pagesize", layout="total, prev, pager, next, jumper", :total="query.total" @size-change="handleSizeChange" @current-change="handleCurrentChange")
    mdb-modal(v-if="zgmsg" @close="zgmsg = false")
        mdb-modal-header(center :close="false" color="blue-grey")
          mdb-modal-title 
            p(class="heading") 修改备注信息
        mdb-modal-body.flex-s
            textarea(class="form-control" id="exampleFormControlTextarea4" rows="4" v-model='beizhu')
        mdb-modal-footer(center)
          mdb-btn(class="btn-fb" @click.native='saveBz' color="blue-grey") 确定
          mdb-btn(class="btn-fb" @click.native='zgmsg = false' outline="blue-grey") 取消
</template>
<script>
  import giftService from '@/services/giftService'
  export default {
    name: 'applycode',
    loading: false,
    data() {
      return {
        prizeData: [],
        query: {
          page: 1,
          pagesize: 10,
          total: 0
        },
        id: '',
        beizhu: '',
        zgmsg: false
      }
    },
    created () {
      this.getTixiancodeList()
    },
    methods: {
      beiedit (obj) {
        this.id = obj.id
        this.beizhu = obj.comment
        this.zgmsg = true
      },
      getTixiancodeList () {
        let { page, pagesize } = this.query
        let scope = 2
        giftService.getTixiancodeList({page, pagesize, scope}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            this.query.total = res.data && res.data.data && res.data.data.total
            this.prizeData = res.data && res.data.data && res.data.data.data
          }
        })
      },
      saveBz (obj) {
        // 修改备注
        let temp = {
          id: this.id,
          comment: this.beizhu
        }
        giftService.updateApplyCode(temp).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            this.message('备注修改成功！', true)
            this.zgmsg = false
            this.getTixiancodeList()
          } else {
            this.message('备注修改失败，请稍后重试！', false)
          }
        })
      },
      handleSizeChange (page) {
        this.query.page = page
        this.getTixiancodeList()
      },
      handleCurrentChange (page) {
        this.query.page = page
        this.getTixiancodeList()
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
.form-control {outline:none;}
</style>
