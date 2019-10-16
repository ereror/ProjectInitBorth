<template lang="pug">
div
  div.contain.giftadd.animated.rotateInUpLeft
    mdb-btn.btnfixed.btn-floating.btn-lg.purple-gradient.waves-effect.waves-light(:class="{'animated bounceInDown': isloaded}" gradient="purple" floating size="lg" @click.native='saveData' v-show='isloaded')
      mdb-icon(icon="check")
    mdb-row
      mdb-col(md="12")
      mdb-card(class='col-md-12')
        blockquote(class="blockquote bq-primary")
          el-breadcrumb(separator-class="el-icon-arrow-right")
            el-breadcrumb-item(:to="{ path: '/' }") 首页
            el-breadcrumb-item(:to="{ path: '/setmanager' }") 抽奖活动管理
            el-breadcrumb-item 奖品设置中心
    mdb-row.seartable
      mdb-col(md='3' style='overflow:hidden;max-height:900px;padding-bottom:30px;')
        mdb-card
          mdb-row
            mdb-col(md='12')
              label.flex-c(for='title' md='12')
                mdb-col(md='4')
                  span 奖品组名称
                mdb-input(name='title' md='8' v-model='title' maxlength='10')
          mdb-row
            mdb-col.flex-c(md='12')
              el-upload(class="upload-demo" ref='uploadid' drag, action="https://prizedraw.myxianxiaobao.com/common/File/upload?XDEBUG_SESSION_START=13465" md='12', :onSuccess='sendFile', :on-remove='clearData')
                i(class="el-icon-upload" v-show='!icon.length')
                img(:src='icon', v-if='icon.length' style='width:auto;height:100%;margin:0 auto;')
                div(class="el-upload__text" v-show='!icon.length')
                  | 将图片拖到此处，或
                  em 点击上传
          mdb-row
            mdb-col(md='12')
              div.float-l(md='3')
                mdb-btn(class="blue-gradient" rounded size="sm" type="submit" class="mr-auto" @click.native='editAgin') 
                  i(class="fa fa-plus" aria-hidden="true" style='margin-right:.2em;' v:if='false')
                  span 裁剪图片
              div.float-r(md='3' style='padding-right:30px;')
                mdb-btn(class="blue-gradient" rounded size="sm" type="submit" class="mr-auto" @click.native='addPrize' v-if='prizelist.length < 3')
                  i(class="fa fa-plus" aria-hidden="true" style='margin-right:.2em;')
                  span 添加新奖项
        mdb-card.mt20.animateH(v-for="(item, index) in prizelist", :key="index", :class="{'pd30 animateHnow': is_spand != index + 1}")
          mdb-row(v-show='is_spand != index + 1' @click.native='is_spand = index + 1')
            mdb-col(md='12')
              span(style='margin-right:1em;') 
                span(v-if='index === 0') ∫
                span(v-if='index === 1') ∬
                span(v-if='index === 2') ∭
              span 
                |  奖项
                span(v-if='index === 0') 一
                span(v-if='index === 1') 二
                span(v-if='index === 2') 三
              span.float-r(@click.stop='deletePrize(index)' style='display:inline-block;color:#b30f0f;' v-show='index > 0') 删除
                icon.icon.iconbtn(name='delete' @click.native.stop='deletePrize(index)' v-if='false')
          div(v-show='is_spand == index + 1')
            mdb-row
              mdb-col(md='12')
                label.flex-b(md='12' style='height:50px')
                  mdb-col(md='4' style='text-align:center;padding-left:2.5em;')
                    span 奖品类型
                  mdb-col.flex-c(md='8')
                    el-radio(v-model="item.type" label="1") 实物
                    el-radio(v-model="item.type" label="2") 虚拟
            mdb-row
              mdb-col(md='12')
                label.flex-c(for='giftName' md='12')
                  mdb-col(md='4')
                    span 奖品名称
                  mdb-input(name='giftName' md='8' v-model='item.name')
            mdb-row(v-if="item.type == 1")
              mdb-col(md='12')
                label.flex-c(for='prizeCount' md='12')
                  mdb-col(md='4')
                    span 奖品份数
                  mdb-input(name='prizeCount' md='8' v-model='item.num')
            mdb-row(v-if="item.type == 2")
              mdb-col(md='9' style='margin:0 auto;')
                div.md-form(md="12")
                  textarea(rows="3" class="form-control md-textarea" v-model="item.sn" @focus='deldhm(1, index)' @blur='deldhm(0, index)' style='scrollbar-arrow-color:yellow;scrollbar-base-color:lightsalmon;overflow-y:auto;')
                  label(:class="{'active': item.sn || (index === showdhm_index) && showdhm}") 兑换码
      mdb-col(md='6.5')
        mdb-card
          vue-editor(v-model="content" style='min-height:400px;max-width:840px;overflow-x:hidden;', placeholder='填写此次抽奖的图文详情...', :useCustomImageHandler='true' @imageAdded="handleImageAdded")
      mdb-col(md='3')
        mdb-card
          mdb-row
            mdb-col(md='12')
              label.flex-c(for='sponsor' md='12')
                mdb-col(md='4')
                  span 赞助商
                mdb-input(name='sponsor' md='8' id='sponsor' v-model='sponsor')
          mdb-row
            mdb-col(md='9' style='margin:0 auto;')
              //- mdb-textarea(md='12' label="抽奖说明", :rows="3" v-model='introduce')
              div.md-form(md="12")
                textarea(rows="3" class="form-control md-textarea" v-model="introduce" @blur='showcjms = false' @focus='showcjms = true')
                label(:class="{'active': introduce || showcjms}") 抽奖说明
        mdb-card.mt20.pd30
          mdb-row
            mdb-col.flex-b(md='12')
              .giftl-head.flex-l
                span 口令
                i(class="fa  fa-exclamation-circle grcolor" aria-hidden="true" style='margin-left:.2em;')
              .giftl-switch
                el-switch(v-model="kl" active-color="#41b2ec" inactive-color="gray")
          mdb-row
            mdb-col(md='12')
              mdb-input(label="填写口令内容36字以内" icon="unlock-alt" v-model='pass')
        mdb-card.mt20.pd30
          mdb-row
            mdb-col.flex-b(md='12')
              .giftl-head.flex-l
                span 一键复制
                i(class="fa  fa-exclamation-circle grcolor" aria-hidden="true" style='margin-left:.2em;')
              .giftl-switch
                el-switch(v-model="yjcopy" active-color="#41b2ec" inactive-color="gray")
          mdb-row
            mdb-col(md='12')
              mdb-input(label="填写一键复制描述" icon="twitch" v-model='copy_introduce')
          mdb-row
            mdb-col(md='12')
              mdb-input(label="填写一键复制内容" icon="wordpress" v-model='copy_content')
        mdb-card.mt20.pd30
          mdb-row
            mdb-col.flex-b(md='12')
              .giftl-head.flex-l
                span 抽奖类型
                i(class="fa  fa-exclamation-circle grcolor" aria-hidden="true" style='margin-left:.2em;')
              .giftl-switch
                el-switch(v-model="zd" active-color="#41b2ec" inactive-color="gray" disabled)
          mdb-row
            mdb-col.flex-b(md='12' style='height:40px;')
              .dhead 陪我抽奖方式
              .flex-r
                el-radio(v-model="upper_get" label="0") 普通奖品组
                el-radio(v-model="upper_get" label="1" disabled) 陪我抽奖
        mdb-card.mt20.pd30
          mdb-row
            mdb-col.flex-b(md='12')
              .giftl-head.flex-l
                span 未中奖随机红包 (分)
                i(class="fa  fa-exclamation-circle grcolor" aria-hidden="true" style='margin-left:.2em;')
              .giftl-switch
                el-switch(v-model="sj" active-color="#41b2ec" inactive-color="gray")
          mdb-row
            mdb-col.flex-b(md='10' style='margin:0 auto;')
              .flex-c
                mdb-input.xncounts(v-model='hb_min')
                span 分
                span(md='3' style='font-size:20px;margin:0 10px;') ~
                mdb-input.xncounts(v-model='hb_max')
                span 分
          mdb-row
            mdb-col.flex-b(md='12' style='height:40px;')
              .dhead 报名按钮位置
              .flex-r
                el-radio(v-model="btnposition" label="0") 底部
                el-radio(v-model="btnposition" label="1") 顶部
        mdb-card.mt20.pd30
          mdb-row
            mdb-col.flex-b(md='12')
              .giftl-head.flex-l
                span 当前虚拟人物加成
                i(class="fa  fa-exclamation-circle grcolor" aria-hidden="true" style='margin-left:.2em;')
              .giftl-switch
                el-switch(v-model="xn" active-color="#41b2ec" inactive-color="gray")
          mdb-row
            mdb-col.flex-c(md='12')
              span 已有
              mdb-input.xncounts(placeholder="虚拟人数上限" v-model='v_max')
              span 人报名
          mdb-row
            mdb-col.flex-b(md='12')
              span 开始时每秒3~5人数加成，加满为止
  mdb-modal(size="lg" v-if="ytmodal" @close="ytmodal = false" class='imgcropper_01')
      mdb-modal-header
        mdb-modal-title 图片裁剪
      mdb-modal-body.flex-s
        div(class="imgcropper")
          VueCropper(ref="cropper", :img="option.img", :outputSize="option.outputSize", :outputType="option.outputType", :info="option.info", :canScale="option.canScale", :autoCrop="option.autoCrop", :autoCropWidth="option.autoCropWidth", :autoCropHeight="option.autoCropHeight", :fixed="option.fixed", :fixedNumber="option.fixedNumber" @realTime='realTime')
        div(class='imgshow flex-y')
          div(:style="previewStyle1")
            div(:style="previews.div")
              img(:src="previews.url", :style="previews.img")
      mdb-modal-footer(center)
        span(class="mr-4") 确定
        mdb-btn(tag="a" floating size="sm" class="btn-fb" @click.native='uploadRealImg')
          mdb-icon(icon="upload")
  mdb-modal(v-if="errormsg.length" @close="errormsg = []")
      mdb-modal-header(center :close="false" color="blue-grey")
        mdb-modal-title 
          p(class="heading") 你的表单Mssage
      mdb-modal-body
        div(v-for='(item, index) in errormsg', :key='index')
          div(style='color:red;font-size:18px;')
            span *{{item}}
      mdb-modal-footer(center)
        mdb-btn(class="btn-fb" @click.native='errormsg = []' color="blue-grey") 确定
</template>
<script>
  import { VueEditor } from 'vue2-editor'
  import { fileServer } from 'config/app'
  import { message } from '@/utils/common'
  import giftService from '@/services/giftService'
  import commonService from '@/services/common'
  import { VueCropper } from 'vue-cropper'
  import bg5 from '../../assets/imgs/bg5.jpg'
  export default {
    name: 'giftadd',
    components: {
      VueEditor,
      VueCropper
    },
    loading: false,
    data() {
      return {
        ytmodal: false, // 是否显示图片裁剪
        showcjms: false,
        showdhm: false,
        showdhm_index: 0,
        id: '',
        isload: false,
        isloaded: false,
        uploadSrc: '',
        title: '', // 奖品包名称
        icon: '', // 上传图片路径
        prizelist: [{
          type: '1', // 1 实物， 2 虚拟
          name: '', // 奖品名称
          num: '', // 奖品数量
          sn: '' // 兑换码列表
        }],
        prizelistOrigin: [{
          type: '1', // 1 实物， 2 虚拟
          name: '', // 奖品名称
          num: '', // 奖品数量
          sn: '' // 兑换码列表
        }],
        sponsor: '', // 赞助商
        introduce: '', // 抽奖说明
        content: '', // 图文详情
        pass: '', // 口令
        g_max: 0, // 队伍人数
        upper_get: '0', // 是否是陪我抽奖
        hb_min: 1, // 最小红包
        hb_max: 5, // 最大红包
        v_max: '2000', // 虚拟人数上限
        radio: 1,
        btnposition: '1',
        kl: false,
        zd: true,
        sj: true,
        xn: true,
        is_spand: 1,
        option: {
          full: true,
          img: bg5, // 裁剪图片的地址
          info: true, // 裁剪框的大小信息
          outputSize: 1, // 裁剪生成图片的质量
          outputType: 'png', // 裁剪生成图片的格式
          canScale: true, // 图片是否允许滚轮缩放
          autoCrop: true, // 是否默认生成截图框
          autoCropWidth: 375, // 默认生成截图框宽度
          autoCropHeight: 224, // 默认生成截图框高度
          fixed: false, // 是否开启截图框宽高固定比例
          fixedNumber: [16, 9], // 截图框的宽高比例
          mode: 'contain',
          centerBox: true,
          high: true
        },
        isShowCropper: false, // 是否显示截图框
        fileUpload: null,
        fileinfo: {},
        form: {},
        previews: {},
        errormsg: [],
        yjcopy: false,
        copy_introduce: '', // 一键复制描述
        copy_content: '' // 一键复制内容
      }
    },
    created () {
      this.id = this.$route.params.id || ''
      if (this.id) {
        this.getGiftById(this.id)
      }
      this.uploadSrc = fileServer + 'common/File/upload?XDEBUG_SESSION_START=13465'
      let that = this
      setTimeout(() => {
        that.isloaded = true
      }, 800)
    },
    methods: {
      deletePrize (index) {
        console.log(index)
        this.prizelist.splice(index, 1)
        return false
      },
      privewImg () {
        let that = this
        this.$refs.cropper.getCropData((data) => {
          // do something
          console.log(data)
          that.img_now_src = data
        })
      },
      realTime(data) {
        var previews = data
        var h = 0.5
        var w = 0.2
        console.log(h, w)
        this.previewStyle1 = {
          background: 'gray',
          width: previews.w + 'px',
          height: previews.h + 'px',
          overflow: 'hidden',
          margin: '0'
        }
        this.previewStyle2 = {
          width: previews.w + 'px',
          height: previews.h + 'px',
          overflow: 'hidden',
          margin: '0',
          zoom: h
        }
        this.previews = data
      },
      uploadRealImg () {
        let that = this
        this.$refs.cropper.getCropData(data => {
          console.log(data)
          let file = that.dataURLtoFile(data, new Date().getTime() + '.png')
          var formData = new FormData()
          formData.append('file', file)
          commonService.uploadFile(formData).then(res => {
            if (res.status === 200 && res.data && res.data.code === 200) {
              let imgsrc = res.data && res.data.data && res.data.data.data && res.data.data.data.url || ''
              message(that, '图片上传成功', true)
              that.icon = imgsrc
              that.ytmodal = false
            }
          }).catch(err => {
            console.log(err)
          })
        })
      },
      dataURLtoFile (dataurl, filename) { // 将base64转换为文件
        var arr = dataurl.split(',')
        var mime = arr[0].match(/:(.*?);/)[1]
        var bstr = window.atob(arr[1])
        var n = bstr.length
        var u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new File([u8arr], filename, {type: mime})
      },
      convertBase64UrlToBlob(urlData) {
        let bytes = window.atob(urlData.split(',')[1])
        let ab = new ArrayBuffer(bytes.length)
        let ia = new Uint8Array(ab)
        for (var i = 0; i < bytes.length; i++) {
          ia[i] = bytes.charCodeAt(i)
        }
        return new Blob([ab], { type: 'image/jpeg' })
      },
      deldhm (isshow, index) {
        this.showdhm = isshow === 1
        this.showdhm_index = index
      },
      getGiftById (id) {
        giftService.getGiftid({id}).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            let editObj = res.data.data
            this.id = editObj.id || ''
            this.title = editObj.title || ''
            this.icon = editObj.icon || ''
            this.prizelist = JSON.parse(editObj.prizelist) || this.prizelistOrigin
            this.sponsor = editObj.sponsor || ''
            this.introduce = editObj.introduce || ''
            this.content = editObj.content || ''
            this.pass = editObj.pass || ''
            this.g_max = (editObj.g_max + '') || '0'
            this.upper_get = (editObj.upper_get + '') || '0'
            this.hb_min = editObj.hb_min || ''
            this.hb_max = editObj.hb_max || ''
            this.v_max = editObj.v_max || ''
            this.copy_introduce = editObj.copy_introduce || ''
            this.copy_content = editObj.copy_content || ''
            this.btnposition = (editObj.bt_pos + '') || '0'
            var testreg = /%CODE%/g
            this.prizelist.map(v => {
              if (v.type * 1 === 2) v.sn = v.sn.replace(testreg, '\r')
            })
          }
        })
      },
      beforeUpload (file) {
        this.$refs.uploadid.clearFiles()
      },
      editAgin () {
        if (this.option.img) {
          message(this, '不支持对已经编辑的图片再次进行编辑，如需要重新编辑，请重新上传原图片进行编辑', false)
          return
        } else {
          this.ytmodal = true
        }
      },
      clearData () {
        this.icon = ''
        this.option.img = ''
      },
      addPrize () {
        // 添加新的奖项
        if (this.prizelist.length === 3) {
          message(this, '最多添加三个奖项', false)
        } else {
          let newObj = Object.assign({}, this.prizelistOrigin[0])
          this.prizelist.push(newObj)
        }
      },
      sendFile (res, file, files) {
        if (files.length > 1) {
          files.shift()
        }
        if (res.code === 200) {
          this.icon = res.data && res.data.data && res.data.data.url
          let img = res.data && res.data.data && res.data.data.path
          this.option.img = fileServer + img.substring(1)
          // this.ytmodal = true
        }
      },
      saveData () {
        this.errormsg = []
        let question = this.valiadateForm()
        this.errormsg = question.filter(v => {
          return v.length > 0
        })
        if (this.errormsg.length) {
          return
        }
        // 保存数据
        let temp = {
          id: this.id || '',
          title: this.title,
          icon: this.icon,
          prizelist: JSON.stringify(this.prizelist),
          sponsor: this.sponsor,
          introduce: this.introduce,
          content: this.content,
          pass: this.pass,
          g_max: this.g_max,
          upper_get: this.upper_get,
          hb_min: this.hb_min,
          hb_max: this.hb_max,
          v_max: this.v_max || 0,
          bt_pos: this.btnposition,
          copy_introduce: this.copy_introduce,
          copy_content: this.copy_content
        }
        // 检验
        let str = !this.id ? '新增' : '编辑'
        if (this.isload) return message(this, '正在处理请求，请稍等', false)
        this.isload = true
        giftService.saveGift(temp).then(res => {
          this.isload = false
          if (res.status === 200 && res.data && res.data.code === 200) {
            message(this, str + '奖品组成功', true)
            let that = this
            setTimeout(() => {
              that.$router.push({name: 'giftset'})
            }, 1000)
          } else {
            message(this, str + '奖品组失败', false)
          }
        }).catch(e => {
          this.isload = false
        })
      },
      testForm (sn) {
        sn = sn || ''
        var testreg = /(\r|\n)?.*(\r|\n)?/g
        let len = sn.match(testreg)
        return len.length - 1
      },
      valiadateForm () {
         // 返回相关消息
        let title = !this.title.length ? '奖品组名称不能为空' : (this.title.length > 36 ? '奖品组名称不能大于36个字符！' : '')
        let v_max = !this.v_max ? '虚拟人数不能为空' : (this.v_max * 1 > 5000 ? '虚拟人数上限为5000' : '')
        let pass = this.pass.length > 36 ? '口令不能大于36个字符！' : ''
        let introduce = this.introduce.length > 5000 ? '抽奖说明文字不超过5000个字符！' : ''
        let sponsor = this.sponsor.length > 36 ? '赞助商不超过36个字符！' : ''
        let copy_introduce = this.copy_introduce.length > 24 ? '一键复制描述不能超过24个字符！' : ''
        let copy_content = this.copy_content.length > 24 ? '一键复制内容不能超过24个字符！' : ''
        let prize_01 = ''
        let prize_02 = ''
        let prize_03 = ''
        this.prizelist.map((v, i) => {
          // type: 1, // 1 实物， 2 虚拟
          // name: '', // 奖品名称
          // num: '', // 奖品数量
          // sn: '' // 兑换码列表
          let namemsg = !v.name.length ? '奖品名称不能为空' : (v.name.length > 90 ? '奖品名称不能大于90个字符！' : '')
          let sfirst = this.prizelist.length > 1 ? '第一组' : ''
          if (v.type * 1 === 1) {
            let nummsg = (!(v.num * 1) || !v.num.length) ? '奖品数量不能为0' : (v.num * 1 > 2000 ? '奖品数量大于2000！' : '')
            if (i === 0) prize_01 = sfirst + namemsg + (!namemsg ? '' : ',') + nummsg
            if (i === 1) prize_02 = '第二组' + namemsg + (!namemsg ? '' : ',') + nummsg
            if (i === 2) prize_03 = '第三组' + namemsg + (!namemsg ? '' : ',') + nummsg
          } else {
            let snlen = this.testForm(v.sn)
            let snmsg = !v.sn.length ? '兑换码不能为空' : (snlen * 1 > 50 ? '兑换码不能大于50！' : '')
            v.num = snlen
            var testreg = /\r|\n/g
            v.sn = v.sn.replace(testreg, '%CODE%')
            if (i === 0) prize_01 = sfirst + namemsg + (!namemsg ? '' : ',') + snmsg
            if (i === 1) prize_02 = '第二组' + namemsg + (!namemsg ? '' : ',') + snmsg
            if (i === 2) prize_03 = '第三组' + namemsg + (!namemsg ? '' : ',') + snmsg
          }
        })
        if (prize_01 === ',' || prize_01 === '第一组') prize_01 = ''
        if (prize_02 === ',' || prize_02 === '第二组') prize_02 = ''
        if (prize_03 === ',' || prize_03 === '第三组') prize_03 = ''
        let str = [title, v_max, pass, introduce, sponsor, prize_01, prize_02, prize_03, copy_introduce, copy_content]
        return str
      },
      handleImageAdded (file, Editor, cursorLocation, resetUploader) {
        var formData = new FormData()
        formData.append('file', file)
        commonService.uploadFile(formData).then(res => {
          if (res.status === 200 && res.data && res.data.code === 200) {
            let imgsrc = res.data && res.data.data && res.data.data.data && res.data.data.data.url || ''
            Editor.insertEmbed(cursorLocation, 'image', imgsrc)
            resetUploader()
          }
        }).catch(err => {
          console.log(err)
        })
      }
    },
    filters: {
      controlLen (val, len = 10) {
        if (val.length > 10) {
          val = val.substring(0, 35)
        }
        return val
      }
    }
  }
</script>
<style scoped>
  .seartable {
    margin: 30px -30px 0 -30px;
  }
  .btnfixed {
    position: fixed;
    z-index: 998;
    bottom: 40px;
    right: 40px;
    outline: none;
    -webkit-box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    box-shadow: 0 5px 11px 0 rgba(0,0,0,.18), 0 4px 15px 0 rgba(0,0,0,.15);
    width: 80px;
    height: 80px;
    vertical-align: middle;
    overflow: hidden;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    padding: 0;
    font-size:2em;
    cursor: pointer;
    border:0;
  }
  .btnfixed :after {
    display:none;
  }
  .mt20 {
    margin-top:20px;
  }
  .pd30 {
    padding: 10px 30px;
    cursor: pointer;
  }
  .grcolor {
    color: #41b2ec;
  }
  .animateH {
    transition: all .5s;
  }
  .Horigin {
    height: 0;
    overflow: hidden;
  }
  .animateHnow {
    height: 50px;
  }
  .imgcropper {
    width: 1000px;
    height: 600px;
  }
  .imgshow {
    width:400px;
    overflow: hidden;
    flex-wrap:wrap;
  }
  .iconbtn {
    height: 20px;
    width: 20px;
    margin-right: 10px;
  }
</style>
<style>
  .ql-editor {
    min-height:400px !important;
    max-height: 700px !important;
    height:auto;
    overflow: auto;
  }
  .giftadd .md-form {
    margin: .2em 0;
  }
  .xncounts input {
    text-align:center;
  }
  .imgcropper_01 .modal-lg{
    width: 1400px !important;
    max-width: 1400px;
  }
</style>
