<template lang="pug">
  div.contain
    mdb-row
      mdb-col(md="12")
      mdb-card(class='col-md-12')
        blockquote(class="blockquote bq-primary")
          el-breadcrumb(separator-class="el-icon-arrow-right")
            el-breadcrumb-item 首页
            el-breadcrumb-item 消息管理
            el-breadcrumb-item 我要上首页
    mdb-row.seartable
      mdb-col(md="12")
        mdb-card(class='col-md-12' style='padding-bottom:30px;')
          mdb-col(md="12")
            .flex-r.float-r.searchBox(md="4")
                mdb-input(class="mr-sm-2" type="text" placeholder="用户账号" aria-label="用户账号")
                mdb-input(class="mr-sm-2" type="text" placeholder="昵称" aria-label="昵称")
                mdb-btn(class="blue-gradient" rounded size="sm" type="submit" class="mr-auto") 查询
          mdb-col(md="12")
            el-table.el-table(:data="goupData" border stripe size='small', max-height="'580'" style='width:100% !important;')
              el-table-column(type="selection" width="40")
              el-table-column(label='账号/OpenID' align='center' prop='uid' width="180")
              el-table-column(label='用户昵称' align='center' prop='nickname' width="180")
              el-table-column(label='称呼' align='center' prop='name' width="120")
              el-table-column(label='时间' align='center' width="180")
                template(slot-scope='scope')
                  span {{scope.row.create_time * 1000 | date}}
              el-table-column(label='联系方式' align='center' prop='phone' width="180")
              el-table-column(label='公司名称' align='center' prop='company' width="180")
              el-table-column(label='备注' align='center' prop='comment' sortable)
              el-table-column(label='操作' align='center' width="180")
                template(slot-scope='scope')
                  mdb-btn(type='primary' class='btn btn-sm' color='blue' @click.native='editTip(scope.row)') 备注
            mdb-col(md="12" style='margin-top:20px;')
              .float-r
                el-pagination(:page-size="query.pagesize" layout="total, prev, pager, next, jumper", :total="query.total" @size-change="handleSizeChange" @current-change="handleCurrentChange")
    mdb-modal(v-if="tipStatus" @close="tipStatus = false")
        mdb-modal-header(center :close="false" color="blue-grey")
          mdb-modal-title 
            p(class="heading") 修改备注信息
        mdb-modal-body.flex-s
            textarea(class="form-control" id="exampleFormControlTextarea4" rows="4" v-model='tipContent')
        mdb-modal-footer(center)
          mdb-btn(class="btn-fb" @click.native='saveBz' color="blue-grey") 确定
          mdb-btn(class="btn-fb" @click.native='tipStatus = false' outline="blue-grey") 取消
</template>
<script>
  import msgServices from '@/services/msgServices'
  import { message } from '@/utils/common'
  export default {
    name: 'goupmanager',
    loading: false,
    data() {
      return {
        goupData: [],
        query: {
          page: 1,
          pagesize: 10,
          total: 0
        },
        tipStatus: false,
        tipContent: ''
      }
    },
    created () {
      this.getConcatList()
    },
    methods: {
      handleSizeChange (page) {
        this.query.page = page
        this.getConcatList()
      },
      handleCurrentChange (page) {
        this.query.page = page
        this.getConcatList()
      },
      getConcatList () {
        let { page, pagesize } = this.query
        msgServices.getContactList({page, pagesize}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            this.query.total = res.data && res.data.data && res.data.data.total
            this.goupData = res.data && res.data.data && res.data.data.data
          }
        })
      },
      editTip (obj) {
        this.id = obj.id
        this.tipContent = obj.comment
        this.tipStatus = true
      },
      saveBz (obj) {
        // 修改备注
        let temp = {
          id: this.id,
          comment: this.tipContent
        }
        msgServices.setContact(temp).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            message(this, '备注修改成功！', true)
            this.tipStatus = false
            this.getConcatList()
          } else {
            message(this, '备注修改失败，请稍后重试！', false)
          }
        })
      }
    },
    filters: {
    }
  }
</script>
<style scoped>
.seartable {
  margin: 30px -30px 0 -30px;
}
.danger-color {
  background-color: #ff4444 !important;
}
.hbicon {margin:0 .5em;font-size:20px;}
</style>
