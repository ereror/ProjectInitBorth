<template lang="pug">
  div.contain
    mdb-row
      mdb-col(md="12")
      mdb-card(class='col-md-12')
        blockquote(class="blockquote bq-primary")
          el-breadcrumb(separator-class="el-icon-arrow-right")
            el-breadcrumb-item(:to="{ path: '/' }") 首页
            el-breadcrumb-item(:to="{ path: '/setmanager' }") 抽奖活动管理
            el-breadcrumb-item 奖品列表
    mdb-row.seartable
      mdb-col(md="12")
        mdb-card(class='col-md-12' style='padding-bottom:30px;')
          mdb-col(md="12")
            .flex-r.float-1(md="4" style='float:left;height:94px;')
                mdb-btn(class="purple-gradient" rounded size="sm" type="submit" class="mr-auto" style='margin:0;' @click.native='giftadd') 
                 i(class="fa fa-plus" aria-hidden="true" style='margin-right:.2em;')
                 span 新增
            .flex-r.float-r.searchBox(md="4")
                mdb-input(class="mr-sm-2" type="text" placeholder="奖品组名称" aria-label="奖品组名称")
                mdb-btn(class="blue-gradient" rounded size="sm" type="submit" class="mr-auto") 查询
          mdb-col(md="12")
            el-table.el-table(:data="giftData" border stripe size='small', max-height="580")
              el-table-column(type="selection" width="40")
              el-table-column(label='奖品组名称' align='center' prop='title' width='200')
              el-table-column(label='奖品' align='center' sortable)
                template(slot-scope='scope')
                  span.prizespan(v-for='(item, index) in scope.row.prizelist', :key="index") {{item.name}}
              el-table-column(label='赞助商' align='center' prop='sponsor' width="180")
              el-table-column(label='是否组队' align='center' width="180")
                template(slot-scope='scope')
                  span(v-if='scope.row.g_max === 0') 否
                  span(v-else) {{scope.row.g_max + '人组队'}}
              el-table-column(label='随机红包区间' align='center' width="180")
                template(slot-scope='scope')
                  div.flex-c
                    span {{scope.row.hb_min}}分
                    span.hbicon ~
                    span {{scope.row.hb_max}}分
              el-table-column(label='操作' width="240" align='center')
                template(slot-scope='scope')
                  .flex-r
                    mdb-btn(type='primary' class='btn btn-sm' color='blue' @click.native='giftEdit(scope.row.id)') 编辑
                    mdb-btn(type='error' class='btn btn-sm btn-danger' color='purple' @click='delfuncmes(scope.row.id, scope.row.title)') 隐藏
            mdb-col(md="12" style='margin-top:20px;')
              .float-r
                el-pagination(:page-size="query.pagesize", layout="total, prev, pager, next, jumper", :total="query.total" @size-change="handleSizeChange" @current-change="handleCurrentChange")
    delet-data(:coupon='couponStatus', :content='contentstr', :callBackFunc='delefunc') 
</template>
<script>
  import giftService from '@/services/giftService'
  export default {
    name: 'giftlist',
    loading: false,
    data() {
      return {
        couponStatus: false,
        contentstr: '',
        optid: '',
        giftData: [{
          id: 1,
          title: '',
          icon: '',
          prizelist: '',
          sponsor: '',
          introduce: '',
          content: '',
          pass: '',
          g_max: 0,
          hb_min: 0,
          hb_max: 0,
          v_max: 0
        }],
        query: {
          page: 1,
          pagesize: 10,
          total: 0
        }
      }
    },
    created () {
      this.getList()
    },
    methods: {
      getList () {
        let { page, pagesize } = this.query
        giftService.getList({page, pagesize}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            this.query.total = res.data && res.data.data && res.data.data.total
            this.giftData = res.data && res.data.data && res.data.data.data
            this.giftData.map(v => {
              v.prizelist = JSON.parse(v.prizelist)
            })
          }
        })
      },
      delfuncmes (id, title) {
        this.optid = id
        this.contentstr = `确定要隐藏当前奖品组名称为 <span style='color:red;'>"${title}"</span> 的数据？`
        this.couponStatus = true
      },
      delefunc(obj) {
        if (obj && obj.isCancel || !this.optid) {
          this.couponStatus = false
          return
        }
        giftService.delGift({id: this.optid}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            this.message('删除成功！', true)
            this.couponStatus = false
            this.optid = ''
            this.getList()
          } else {
            this.message('删除失败！', false)
          }
        })
      },
      giftEdit (id) {
        this.$router.push({name: 'giftadd', params: { id: id }})
      },
      giftadd () {
        this.$router.push({name: 'giftadd'})
      },
      handleSizeChange (page) {
        this.query.page = page
        this.getList()
      },
      handleCurrentChange (page) {
        this.query.page = page
        this.getList()
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

