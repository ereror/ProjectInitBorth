<template lang="pug">
  div.contain
    mdb-row
      mdb-col(md="12")
      mdb-card(class='col-md-12')
        blockquote(class="blockquote bq-primary")
          el-breadcrumb(separator-class="el-icon-arrow-right")
            el-breadcrumb-item(:to="{ path: '/' }") 首页
            el-breadcrumb-item(:to="{ path: '/setmanager' }") 抽奖活动管理
            el-breadcrumb-item 时间表
    mdb-row.seartable
      mdb-col(md="12")
        mdb-card(class='col-md-12' style='padding-bottom:30px;')
          mdb-col(md="12")
            .flex-r.float-1(md="4" style='float:left;height:94px;')
                mdb-btn(class="purple-gradient" rounded size="sm" type="submit" class="mr-auto" style='margin:0;' @click.native='showTimeFunc') 
                 i(class="fa fa-plus" aria-hidden="true" style='margin-right:.2em;')
                 span 新增时间表
            .flex-r.float-r.searchBox(md="4")
                mdb-input(class="mr-sm-2" type="text" placeholder="时间表名称" aria-label="时间表名称")
                mdb-input(class="mr-sm-2" type="text" placeholder="班次时间" aria-label="班次时间")
                mdb-btn(class="blue-gradient" rounded size="sm" type="submit" class="mr-auto") 查 询
          mdb-col(md="12")
            el-table.el-table(:data="timeData" border stripe size='small', max-height="615" style='width:100% !important;')
              el-table-column(type="selection" width="40")
              el-table-column(label='时间表名称' align='center' prop='name' width='200')
              el-table-column(label='奖品组' align='center' show-overflow-tooltip=true)
                template(slot-scope='scope')
                  div.flex-c(v-for='(item, index) in scope.row.prize_names', :key="index" style='flex-wrap:wrap;')
                    mdb-badge.flex-c(type='primary' color="blue-grey" style='margin:1px;') {{item | prizeNames}}
              el-table-column(label='开始时间' align='center' width="180")
                template(slot-scope='scope')
                  div(v-show='scope.row.openonce == 0')
                    span {{scope.row.start_hour}}
                    span(v-if='scope.row.start_min') {{':' + scope.row.start_min}}
                    span(v-else) :00
                  div(v-show='scope.row.openonce == 1')
                    span {{scope.row.start_time * 1000 | date}}
              el-table-column(label='结束时间' align='center' prop='etime' width="180")
                template(slot-scope='scope')
                  div(v-show='scope.row.openonce == 0')
                    span {{scope.row.end_hour}}
                    span(v-if='scope.row.end_min') {{':' + scope.row.end_min}}
                    span(v-else) :00
                  div(v-show='scope.row.openonce == 1')
                    span {{scope.row.end_time * 1000 | date}}
              el-table-column(label='时间类型' align='center' width="180")
                template(slot-scope='scope')
                  span(v-if='scope.row.openonce == 0') 每日时间表
                  span(v-else) 单次时间表
              el-table-column(label='状态' align='center' width="180")
                template(slot-scope='scope')
                  span(v-if='!scope.row.status') 未发布
                  span(v-if='scope.row.status && (scope.row.openonce == 0 || scope.row.openonce == 1 && !isover)') 已发布
                  span(v-if='scope.row.status && scope.row.openonce == 1 && isover') 已结束
              el-table-column(label='操作' width="320" align='center')
                template(slot-scope='scope')
                  .flex-r
                    mdb-btn(type='primary' class='btn btn-sm' color='dark-green' @click='publishTime(scope.row)' v-show='scope.row.status == 0') 发 布
                    mdb-btn(type='primary' class='btn btn-sm' color='pink' @click='stopTime(scope.row)' v-show='scope.row.status == 1') 暂 停
                    mdb-btn(type='primary' class='btn btn-sm' outline="mdb-color" @click='editTimeBox(scope.row)') 编 辑
                    mdb-btn(type='error' class='btn btn-sm btn-danger mdb-color' @click='delefuncmgs(scope.row.id, scope.row.name)' outline='mdb-color') 删 除
            mdb-col(md="12" style='margin-top:20px;')
              .float-r
                el-pagination(:page-size="query.pagesize", layout="total, prev, pager, next, jumper", :total="query.total" @size-change="handleSizeChange" @current-change="handleCurrentChange")
    mdb-modal(side, :fullHeight='true' position="left" v-if="showTimeModal" @close="showTimeModal = false" size="lg")
      mdb-modal-header
        mdb-modal-title 
          span {{!edits ? '新增': '编辑'}}
          | 时间表
      mdb-modal-body
        mdb-row
          mdb-col(md='6')
            label.flex-c(for='timename' md='12')
              mdb-col.flex-c(md='4')
                span 时间表名称
              mdb-col.flex-l(md='6')
                mdb-input(name='timename' md='10' v-model='editObj.name' width="300")
              mdb-col.flex-l(md='2')
          mdb-col.flex-l(md='6')
            label.flex-c(for='timename' md='12')
              mdb-col.flex-c(md='4')
                span 时间表类型
              mdb-col.flex-c(md='8')
                el-radio(v-model="editObj.openonce" label="0") 每日排班
                el-radio(v-model="editObj.openonce" label="1") 单次排班
        mdb-row
          mdb-col(md='6')
            label.flex-c(for='timename' md='12')
              mdb-col(md='4' style='text-align:center;')
                span(style='margin-left:1em;') 开始时间
              mdb-col(md='8')
                el-time-select.timesetTime(id='startT' v-model="editObj.startTime", :picker-options="{ start: '00:00', step: '00:05', end: '23:59' }" placeholder="开始时间" v-show='editObj.openonce == 0')
                el-date-picker(v-model="editObj.start_time" type="datetime" placeholder="选择开始日期时间" v-show='editObj.openonce == 1' id='startT2', :picker-options="pickerStart")
          mdb-col.flex-l(md='6')
            label.flex-c(for='timename' md='12')
              mdb-col(md='4' style='text-align:center;')
                span(style='margin-left:1em;') 结束时间
              mdb-col(md='8')
                el-time-select.timesetTime(id='endT' v-model="editObj.endTime", :picker-options="{ start: '00:00', step: '00:05', end: '23:59' }" placeholder="结束时间" v-show='editObj.openonce == 0')
                el-date-picker(v-model="editObj.end_time" type="datetime" placeholder="选择结束日期时间" v-show='editObj.openonce == 1' id='endT2', :picker-options="pickerStart")
        mdb-row(style='margin-top:30px;')
          mdb-col(md='12')
            label.flex-c(for='timename' md='12')
              mdb-col(md='5' style='text-align:left;')
                span(style='margin-left:0em;') 当前选中产品组
              mdb-col(md='7')
          mdb-col(md='12')
            .flex-l(style='flex-wrap:wrap;padding-left:10px;max-height:500px;overflow:auto;')
              div(v-for='(item, index) in options', :key="index", @click='choseNowItem(index)')
                mdb-btn.btn.waves-effect.waves-light.flex-c(type='primary', :class='{"purple-gradient": item.ischeck}' color="blue-grey" )
                  img(src='~assets/imgs/pmark.png' style='height:20px;width:20px;margin-right:.5em;' v-if='item.upper_get == 1')
                  div {{item.id}}: {{item.title}}
                div(style='height:30px;padding-left: .375em;' v-show="editObj.openonce == 0")
                  mdb-badge(v-for='(items, pindex) in timeprize.prizetime[item.id]', :key="pindex" style='margin-right: 1em;color:#aa66cc !important;border:1px solid #aa66cc') {{items.startTime}} ~ {{items.endTime}}          
      mdb-modal-footer
        mdb-row(style='width:100%;')
          mdb-col.flex-b(md='4')
            .giftl-head.flex-l(v-if='editObj.openonce * 1')
              span(:class='{"isrealprize": editObj.isreal * 1}') 当前是否开奖？
              el-switch(v-model="editObj.isreal" active-color="#41b2ec" inactive-color="gray" @click.native='checkData')
          mdb-col.flex-b(md='8' style='justify-content:flex-end;')
            mdb-btn(outline="blue-grey" @click.native="showTimeModal = false") 取 消
            mdb-btn(class="purple-gradient" @click.native="saveTime") 保 存
    delet-data(:coupon='couponStatus', :content='contentstr', :callBackFunc='delefunc')
</template>
<script>
  import timeService from '@/services/timeServices'
  import giftService from '@/services/giftService'
  import { message } from '@/utils/common'
  export default {
    name: 'timeset',
    loading: false,
    data() {
      return {
        edits: false,
        couponStatus: false,
        groups: '',
        showTimeModal: false,
        coupon: false,
        value1: '',
        value2: '',
        isreal: '0', // 是否中奖
        editObj: {
          id: '',
          openonce: '0',
          startTime: '',
          endTime: '',
          status: 0,
          start_time: '',
          end_time: '',
          isreal: '0'
        },
        options: [],
        timeData: [],
        query: {
          page: 1,
          pagesize: 15,
          total: 0
        },
        pickerStart: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 24 * 60 * 60 * 1000
          }
        },
        timeDataAll: [],
        timeprize: {
          hasprizeid: [],
          prizetime: {}
        }
      }
    },
    created () {
      this.getTimeList()
      this.getGiftList()
      this.getTimeList('all')
    },
    methods: {
      checkData () {
        // 检查数据
        let str = ''
        if (this.editObj.openonce === '0') {
          str = '只能在单次排班生效'
        }
        let optarr = this.options.filter(v => {
          return v.ischeck
        })
        if (!optarr.length || optarr.length > 1) {
          str = '单次只能开一个奖'
        }
        if (str.length) {
          message(this, str, false)
          this.editObj.isreal = '0'
        }
      },
      handleSizeChange (page) {
        this.query.page = page
        this.getTimeList()
      },
      handleCurrentChange (page) {
        this.query.page = page
        this.getTimeList()
      },
      showTimeFunc () {
        this.showTimeModal = true
        this.edits = false
        this.editTimeBox()
      },
      editTimeBox (obj) {
        if (obj) this.edits = true
        else this.edits = false
        this.editObj.id = obj && obj.id || ''
        this.editObj.name = obj && obj.name || ''
        this.editObj.openonce = obj && String(obj.openonce) || '0'
        this.editObj.start_time = obj && obj.start_time * 1000 || ''
        this.editObj.end_time = obj && obj.end_time * 1000 || ''
        this.editObj.isreal = obj && Boolean(obj.is_real) || '0'
        if (obj) {
          obj.start_min = parseInt(obj.start_min) < 10 ? '0' + obj.start_min : obj.start_min
          obj.end_min = parseInt(obj.end_min) < 10 ? '0' + obj.end_min : obj.end_min
          this.editObj.startTime = obj.start_hour && (obj.start_hour + ':' + obj.start_min) || ''
          this.editObj.endTime = obj.end_hour && (obj.end_hour + ':' + obj.end_min) || ''
        } else {
          this.editObj.startTime = ''
          this.editObj.endTime = ''
        }
        let prize_ids = obj && obj.prize_ids.split(',') || []
        this.options.map(v => {
          if (~prize_ids.indexOf(v.id + '')) v.ischeck = true
          else v.ischeck = false
        })
        this.showTimeModal = true
      },
      saveTime () {
        let { id, name, startTime, endTime, status, start_time, end_time, openonce, isreal } = this.editObj
        let isok = this.validateTime()
        let str = this.edits ? '编辑' : '新增'
        if (!openonce) {
          str = '每日排班' + str
        } else {
          str = '单日排班' + str
        }
        let startTimeDc = start_time
        let endTimeDc = end_time
        if (isok) {
          let [ start_hour, start_min ] = startTime && startTime.match(/\d+/g) || []
          let [ end_hour, end_min ] = endTime && endTime.match(/\d+/g) || []
          let prize_idarr = []
          let prize_namearr = []
          this.options.map(v => {
            if (v.ischeck) prize_idarr.push(v.id)
            if (v.ischeck) prize_namearr.push(v.id + ':' + v.title)
          })
          let prize_ids = prize_idarr.join(',')
          let prize_names = prize_namearr.join('prizenames')
          if (!prize_ids) return message(this, '必须至少选择一个奖品组，如果没有请先赠一个奖品组！', false)
          let tempdata = {
            id,
            name,
            start_hour,
            start_min,
            end_hour,
            end_min,
            prize_ids,
            prize_names,
            status,
            openonce: openonce * 1,
            start_time: startTimeDc && new Date(startTimeDc).getTime() / 1000 || '',
            end_time: endTimeDc && new Date(endTimeDc).getTime() / 1000 || '',
            is_real: Number(isreal)
          }
          // if (!tempdata.is_real) delete tempdata.is_real
          timeService.saveTime(tempdata).then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              message(this, str + '时间表成功！', true)
              this.getTimeList()
              this.getTimeList('all')
              this.edits = false
              this.showTimeModal = false
            } else {
              message(this, str + '时间表失败！', false)
              this.edits = false
            }
          }).catch(e => {
            message(this, str + '时间表失败！', false)
            this.edits = false
          })
        }
      },
      publishTime (obj) {
        let id = obj && obj.id
        if (!id) return message('当前时间表记录存在问题，请联系管理员!', false)
        timeService.publishTime({id}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            message(this, '时间表发布成功！', true)
            this.getTimeList()
          } else {
            message(this, '时间表发布失败！', false)
          }
        })
      },
      stopTime (obj) {
        let id = obj && obj.id
        if (!id) return message('当前时间表记录存在问题，请联系管理员!', false)
        timeService.stopTime({id}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            message(this, '时间表暂停成功！', true)
            this.getTimeList()
          } else {
            message(this, '时间表暂停成功！', false)
          }
        })
      },
      validateTime () {
        let str = ''
        let startTime = this.editObj.startTime.replace(':', '')
        let endTime = this.editObj.endTime.replace(':', '')
        if (!this.editObj.name) str = '时间表名称不能为空！'
        else if (this.editObj.name && this.editObj.name.length > 36) str = '时间表名称不能大于36个字符！'
        else if (!this.editObj.startTime && !(this.editObj.openonce * 1)) str = '开始时间不能为空！'
        else if (!this.editObj.endTime && !(this.editObj.openonce * 1)) str = '结束时间不能为空！'
        else if ((parseInt(startTime) > parseInt(endTime)) && !(this.editObj.openonce * 1)) str = '开始时间不能大于等于结束时间'
        else if (this.editObj.start_time && new Date(this.editObj.start_time).getTime() < new Date().getTime()) str = '开始时间不能低于当前时间！'
        else if (!this.editObj.start_time && this.editObj.openonce * 1) str = '开始时间不能为空！'
        else if (!this.editObj.end_time && this.editObj.openonce * 1) str = '结束时间不能为空！'
        else if ((parseInt(this.editObj.start_time) > parseInt(this.editObj.end_time)) && this.editObj.openonce * 1) str = '开始时间不能大于等于结束时间'
        return str.length ? !!message(this, str, false) : !str
      },
      delefuncmgs (id, name) {
        this.optid = id
        this.contentstr = `确定要删除当前时间表名称为<span style='color:red;'>"${name}"</span>的数据？`
        this.couponStatus = true
      },
      delefunc(obj) {
        if (obj && obj.isCancel || !this.optid) {
          this.couponStatus = false
          return
        }
        timeService.delTime({id: this.optid}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            message(this, '删除成功！', true)
            this.couponStatus = false
            this.optid = ''
            this.getTimeList()
            this.getTimeList('all')
          } else {
            message(this, '删除失败！', false)
          }
        })
      },
      getTimeList (all) {
        let { page, pagesize } = this.query
        pagesize = all ? 1000 : pagesize
        timeService.getList({page, pagesize}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200 && !all) {
            this.query.total = res.data && res.data.data && res.data.data.total
            this.timeData = res.data && res.data.data && res.data.data.data
            this.timeData.map(v => {
              v.isover = false
              if (v.status && v.openonce * 1 === 1) {
                if (v.endTime * 1000 > new Date().getTime()) {
                  v.isover = true
                }
              }
              v.prize_names = v.prize_names.split('prizenames') || []
            })
          }
          if (res.status === 200 && res.data && res.data.code === 200 && all) {
            this.timeDataAll = res.data && res.data.data && res.data.data.data
            this.saveTimeid('initdata')
          }
        })
      },
      getGiftList () {
        giftService.getList({page: 1, pagesize: 1000}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            this.options = res.data && res.data.data && res.data.data.data
          }
        })
      },
      choseNowItem (index) {
        let obj = this.options[index]
        obj.ischeck = !obj.ischeck
        this.$set(this.options, index, obj)
        let optarr = this.options.filter(v => {
          return v.ischeck
        })
        if (optarr.length !== 1) {
          this.editObj.isreal = false
        }
      },
      saveTimeid (initdata) {
        if (initdata) {
          this.timeprize.hasprizeid = []
          this.timeprize.prizetime = {}
        }
        let hasprizeid = this.timeprize.hasprizeid
        let prizetimeobj = this.timeprize.prizetime
        this.timeDataAll.map(v => {
          let prizearr = v.prize_ids && v.prize_ids.split(',') || []
          let start_min = parseInt(v.start_min) < 10 ? '0' + v.start_min : v.start_min
          let end_min = parseInt(v.end_min) < 10 ? '0' + v.end_min : v.end_min
          let startTime = v.start_hour && (v.start_hour + ':' + start_min) || ''
          let endTime = v.end_hour && (v.end_hour + ':' + end_min) || ''
          let timeobj = {
            startTime: startTime,
            endTime: endTime
          }
          prizearr.map(prize => {
            if (Number(v.openonce)) {
              return
            }
            if (!~hasprizeid.indexOf(prize)) {
              hasprizeid.push(prize)
              prizetimeobj[prize] = [timeobj]
            } else {
              prizetimeobj[prize].push(timeobj)
            }
          })
        })
        console.log(this.timeprize)
      }
    },
    filters: {
      prizeNames (val) {
        let str = val
        return str.length > 25 ? (str.substring(0, 25) + '...') : str
      }
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
.isrealprize {
  color: #41b2ec;
  font-size: 18rpx;
  font-weight: 600;
}
</style>
<style>
  .timesetTime {
    width: 200px !important;
    & input {
      border: 0;
      border-radius: 0;
      border-bottom: 1px solid #ced4da;
    }
    & input:focus{
      border-bottom: 2px solid #4285f4;
    }
  }
</style>
