(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-regist-stepinfo"],{"0bd3":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("e143")),i=a(n("8212")),s=(a(n("db49")),a(n("6d8e")));function a(t){return t&&t.__esModule?t:{default:t}}var c=getApp(),r=o.default.extend({data:function(){return{title:"Hello",STATUS_BAR_HEIGHT:wx.STATUS_BAR_HEIGHT,DEFAULT_HEADER_HEIGHT:wx.DEFAULT_HEADER_HEIGHT,barconfig:{CustomBar:wx.STATUS_BAR_HEIGHT+wx.DEFAULT_HEADER_HEIGHT,StatusBar:wx.STATUS_BAR_HEIGHT,title:"完善基本资料",bgset:"bg-gradual-dred",tset:"bg-gradual-tred",isArrow:1},editDetail:[{key:"0",title:"行业",icon:"",content:"",arrow:!0,size:40,type:"url",url:"/pages/tool/job",isBorderR:!1,placeholder:"点击选择",isInput:!1,selfconf:!1},{key:"1",title:"年收入",icon:"",content:"",arrow:!0,size:40,type:"button",url:"",isBorderR:!1,placeholder:"点击选择",isInput:!1,selfconf:!1},{key:"2",title:"邀约项目",icon:"",content:"",arrow:!0,size:40,type:"button",url:"",isBorderR:!1,placeholder:"点击选择",isInput:!1,selfconf:!1},{key:"3",title:"微信",icon:"",content:"",arrow:!1,size:40,type:"text",url:"",isBorderR:!1,placeholder:"点击输入(选填)",isInput:!0,selfconf:!1,last:!0}],boxconfig:{key:0,model:2,btn:{ok:"确定",okcolor:"d-color-r",cancel:"取消",cancolor:"d-color-b"}},items:[],uinfoinputStyle:{"border-bottom":0},toastconfig:{model:2,icon:!1,content:"请填写完整的资料",type:1},wx:"",userInfo:{},jobObj:{id:"",title:""},pathurl:"/pages/regist/stepvideo?type=save",pathurl2:"/pages/message/join?type=stepinfo",showChoosebox:!1,showtoast:!1,selfPaysIndex:-1,selfTypesIndex:-1,choseKey:0,selfTypes:[],selfPays:[]}},onLoad:function(){},onShow:function(){this.initData(),this.setJob()},methods:{initData:function(){var t=this;this.userInfo=c.globalData.userInfo,this.selfTypes=c.globalData.selfTypes,this.selfPays=c.globalData.selfPays,this.editDetail[3].content=this.userInfo.wechat_number,this.jobObj={id:this.userInfo.occupation,title:this.userInfo.occupation_str||""},this.selfTypes.map(function(e,n){e.value===1*t.userInfo.objective&&(t.editDetail[2].content=e.text,t.selfTypesIndex=n)}),this.selfPays.map(function(e,n){e.value===1*t.userInfo.revenue&&(t.editDetail[1].content=e.text,t.selfPaysIndex=n)})},setJob:function(){var t=getCurrentPages(),e=t[t.length-1],n=e.data.jobObj.id&&e.data.jobObj||this.jobObj;this.editDetail[0].content=n.title||"",this.editDetail[0].url="/pages/tool/job?id="+n.id,this.jobObj=n,this.userInfo.occupation=n.id||0,this.userInfo.occupation_str=n.title},goDown:function(t){var e=this;this.editDetail[0].content.length&&this.editDetail[1].content.length&&this.editDetail[2].content.length?1===this.userInfo.gender?(this.pathurl="/pages/message/join?type=save",this.$nextTick(function(){uni.reLaunch({url:"/pages/message/join?type=save"})})):(i.default.showLoading("数据保存中..."),c.$vm.saveData(this.userInfo).then(function(t){i.default.hideAll(),i.default.showSuccess("数据保存成功！"),uni.$emit("getUserInfo",{msg:"更新用户信息"}),e.createOrder("/pages/index/index?gotoDesn=videorz")}).catch(function(t){})):i.default.showtoast(this,"showtoast",500)},createOrder:function(t){var e=this,n={pay_from:wx.IS_IOS?1:2,platform:1,app_name:"51y"};s.default.getGateCheck(n).then(function(n){1e4===n.code?uni.reLaunch({url:t}):e.messageFunc("保存信息失败，请重试！")})},chooseItem:function(t){var e=t.detail.val;switch(e){case"0":i.default.goUrl(t);break;case"1":this.items=Object.assign(this.selfPays),this.boxconfig.key=1,this.boxconfig.model=2,this.selfPaysIndex>-1&&(this.choseKey=this.selfPaysIndex,this.editDetail[1].content=this.items[this.selfPaysIndex].text||""),this.showChoosebox=!0;break;case"2":this.items=Object.assign(this.selfTypes),this.boxconfig.key=2,this.boxconfig.model=2,this.selfTypesIndex>-1&&(this.editDetail[2].content=this.items[this.selfTypesIndex].text||"",this.choseKey=this.selfTypesIndex),this.showChoosebox=!0;break;default:break}},surefunc:function(t){var e=t.detail,n=e.key,o=e.choseIndex,i=(e.time,e.val);switch(1*n){case 1:this.selfPaysIndex=1*o||0,this.editDetail[1].content=this.items[this.selfPaysIndex].text||"",this.showChoosebox=!1,this.userInfo.revenue=i;break;case 2:this.selfTypesIndex=1*o||0,this.editDetail[2].content=this.items[this.selfTypesIndex].text||"",this.showChoosebox=!1,this.userInfo.objective=i;break;default:break}},cancelfunc:function(){console.log("取消"),this.showChoosebox=!1},valChange:function(t){var e=t.detail,n=(e.key,e.val);this.userInfo.wechat_number=n||""},createFormId:function(t){t.detail.formId&&c.$vm.sendFormId(t.detail.formId)}}});e.default=r},"2b73":function(t,e,n){e=t.exports=n("2350")(!1),e.push([t.i,"uni-page-body[data-v-79a661ff]{background:#f9f9f8}.s-box[data-v-79a661ff]{padding:%?40?% %?30?% %?30?% %?30?%}.s-box-detail[data-v-79a661ff]{border-radius:%?30?%;background:#fff;overflow:hidden}.fixbtn[data-v-79a661ff]{position:fixed;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;bottom:%?40?%;z-index:99;width:100%}.job_btn[data-v-79a661ff]{width:%?690?%;height:%?88?%;margin:0 auto;border-radius:%?30?%;color:#fff}.job_btnA[data-v-79a661ff]{background:#f81f5e!important}body.?%PAGE?%[data-v-79a661ff]{background:#f9f9f8}",""])},"937c":function(t,e,n){var o=n("2b73");"string"===typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);var i=n("4f06").default;i("9e7cd28c",o,!0,{sourceMap:!1,shadowMode:!1})},c78e:function(t,e,n){"use strict";n.r(e);var o=n("0bd3"),i=n.n(o);for(var s in o)"default"!==s&&function(t){n.d(e,t,function(){return o[t]})}(s);e["default"]=i.a},d3ce:function(t,e,n){"use strict";var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return[n("custombar",{attrs:{name:"uni-app",barconfig:t.barconfig}}),t.showtoast?n("toast",{attrs:{toastconfig:t.toastconfig}}):t._e(),n("v-uni-view",{staticClass:"s-box"},[n("v-uni-view",{staticClass:"s-box-detail"},[n("iptitem",{attrs:{inputconfig:t.editDetail[0]},on:{choose:function(e){e=t.$handleEvent(e),t.chooseItem(e)}}}),n("iptitem",{attrs:{inputconfig:t.editDetail[1]},on:{choose:function(e){e=t.$handleEvent(e),t.chooseItem(e)}}}),n("iptitem",{attrs:{inputconfig:t.editDetail[2]},on:{choose:function(e){e=t.$handleEvent(e),t.chooseItem(e)}}}),n("iptitem",{attrs:{inputconfig:t.editDetail[3],inputStyle:t.uinfoinputStyle},on:{change:function(e){e=t.$handleEvent(e),t.valChange(e)}}})],1)],1),n("v-uni-view",{staticClass:"fixbtn"},[n("v-uni-form",{attrs:{"report-submit":!0},on:{submit:function(e){e=t.$handleEvent(e),t.createFormId(e)}}},[n("v-uni-button",{class:["c-btn lg job_btn",t.editDetail[0].content.length&&t.editDetail[1].content.length&&t.editDetail[2].content.length?"job_btnA":""],attrs:{"form-type":"submit","data-url":2===t.userInfo.gender?t.pathurl:t.pathurl2},on:{click:function(e){e=t.$handleEvent(e),t.goDown(e)}}},[t._v("下一步")])],1)],1),t.showChoosebox?n("dialogbox",{attrs:{items:t.items,boxconfig:t.boxconfig,choseKey:t.choseKey},on:{surefunc:function(e){e=t.$handleEvent(e),t.surefunc(e)},cancelfunc:function(e){e=t.$handleEvent(e),t.cancelfunc(e)}}}):t._e()]},i=[];n.d(e,"a",function(){return o}),n.d(e,"b",function(){return i})},d3ff:function(t,e,n){"use strict";n.r(e);var o=n("d3ce"),i=n("c78e");for(var s in i)"default"!==s&&function(t){n.d(e,t,function(){return i[t]})}(s);n("d98a");var a=n("2877"),c=Object(a["a"])(i["default"],o["a"],o["b"],!1,null,"79a661ff",null);e["default"]=c.exports},d98a:function(t,e,n){"use strict";var o=n("937c"),i=n.n(o);i.a}}]);