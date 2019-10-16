<template lang="pug">
  div.contain
    mu-row(gutter style='height:700px;margin: 50px auto;')
      mu-col(span="12")
        el-card.contentheader
          .search
            mu-text-field.fl-l(v-model="search" label="玩家昵称" label-float style="margin-top:-20px;margin-left:15px;width:200px;" color='black')
            mu-button.fl-l(small fab color="black" @click='getUserList(1)')
              mu-icon(value='search')
            h2(style='text-align:center;') 
              span(style='margin-left:-180px;') 玩家信息
            el-table.el-table(:data="userData" border style="width:100%" stripe size='small', :height="userData.length >= 10 ? '615' : ''")
              el-table-column(label='账号' align='center' prop='account' width='200' show-overflow-tooltip)
              el-table-column(label='昵称' align='center' prop='nick' width='200' show-overflow-tooltip)
              el-table-column(label='房间id' align='center' prop='roomId')
              el-table-column(label='钻石数量' align='center' prop='diamond')
              el-table-column(label='挑战券数量' align='center' prop='quan')
              el-table-column(label='积分' align='center' prop='score')
              el-table-column(label='Vip等级' align='center' prop='vip')
              el-table-column(label='充值积分' align='center' prop='czscore')
              el-table-column(label='游戏局数' align='center' prop='games')
              el-table-column(label='收礼金额' align='center' prop='wincoins')
              el-table-column(label='操作' width="180" align='center')
                template(slot-scope='scope')
                  mu-button(small fab color='black' @click='editfunc(scope.row, scope.$index)')
                    mu-icon(value='edit')
            mu-flex(justify-content="center" style='margin-top:20px;')
              mu-pagination(raised circle, :total='total', :current.sync='current', :page-size='10' color='black' @change='getUserList')
            el-dialog(:title='editTitle', :visible.sync="userDetail" center width="40%")
              mu-row(gutter)
                mu-col(span="6" style='border-right:2px solid gray;')
                  mu-text-field(v-model="diamond" label="钻石数量" label-float icon="favorite" style="margin-top:-30px;" color='black')
                mu-col(span="6")
                  mu-text-field(v-model="quan" label="挑战券数量" label-float icon="receipt" style="margin-top:-30px;" color='black')
              mu-row(gutter)
                mu-col(span="6" style='border-right:2px solid gray;')
                  mu-text-field(v-model="score" label="积分数量" label-float icon="all_inclusive" style="margin-top:-30px;" color='black' disabled)
                mu-col(span="6")
                  mu-text-field(v-model="czscore" label="充值积分" label-float icon="local_atm" style="margin-top:-30px;" color='black' disabled)
              mu-row(gutter)
                mu-col(span="6" style='border-right:2px solid gray;height:30px;')
                  mu-text-field(v-model="roomId" label="房间id" label-float icon="view_comfy" style="margin-top:-30px;" color='black')
                mu-col(span="6")
                  mu-text-field(v-model="wincoins" label="收礼金额" label-float icon="attach_money" style="margin-top:-30px;" color='black' disabled)
              mu-row(gutter)
                mu-col(span="12" @click='saveItem')
                  mu-button.fl-r(color='black') 确定
</template>
<script>
  import UserManagerService from '@/services/usermanager'
  // import date from '@/filters/date'
  export default {
    name: 'userset',
    loading: false,
    data() {
      return {
        search: '',
        editindex: 0,
        userData: [],
        editTitle: '玩家信息编辑',
        userDetail: false,
        total: 10,
        current: 1,
        diamond: '',
        quan: '',
        score: '',
        czscore: '',
        games: '',
        wincoins: '',
        userid: '',
        roomId: ''
      }
    },
    created () {
      this.getUserList()
    },
    methods: {
      saveItem () {
        var obj = {}
        obj.userId = this.userid
        obj.diamond = this.diamond * 1
        obj.quan = this.quan * 1
        obj.roomId = this.roomId
        UserManagerService.setUser(obj).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            this.message('保存信息成功！', true)
            this.getUserList(this.current)
            this.userDetail = false
          } else {
            this.message('保存信息失败，请稍后重试！', true)
            this.userDetail = false
          }
        })
      },
      editfunc(obj, index) {
        // 编辑玩家信息详情
        this.userDetail = true
        this.editindex = index
        this.userid = obj.userId
        this.diamond = obj.diamond
        this.quan = obj.quan
        this.score = obj.score
        this.czscore = obj.czscore
        this.games = obj.games
        this.wincoins = obj.wincoins
        this.roomId = obj.roomId
      },
      getUserList (num) {
        // 查询玩家信息
        var temp = {
          pageCount: 10,
          pageIndex: num || this.current || 1,
          nick: this.search
        }
        UserManagerService.getUserList(temp).then(res => {
          if (res.status === 200 && res.data && !res.data.errcode) {
            var obj = res.data.data && res.data.data.users || []
            this.$set(this, 'userData', obj)
            this.total = res.data.data && res.data.data.total
          }
        })
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
  .contain {
    margin: 50px auto;
    & .contentheader {padding:0;}
    & .iconimg {height:30px;width:30px;border-radius:50%;vertical-align: bottom;margin-right:10px;}
  }
</style>
<style>
  .mu-pagination-item.mu-button.is-current{background-color: black;}
</style>
