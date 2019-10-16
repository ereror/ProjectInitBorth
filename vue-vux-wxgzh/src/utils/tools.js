import dudutool from '@/service/dudutool'
import store from '@/store/index'
import development from '../../config/index'
import LocalStorageService from '@/service/storage'
import { wxconfig } from '../../config/app'
// 预加载图片资源
export function getAccessCode (code, agent, share, formid) {
  var param = {
    code: code,
    agent: agent,
    share: share,
    fromid: formid,
    grant_type: 'authorization_code'
  }
  return dudutool.getUserToken(param).then(res => {
    if (res.status === 200 && res.data && !res.data.errcode) store.commit('setUAccessToken', res.data)
  })
}

export function resfOpt (path) {
  console.log('%o', development)
  if (!path) return
  path = path.substring(0, path.indexOf('/'))
  var resf = development.dev.proxyTable
  for (var proxyUrl in resf) {
    if (proxyUrl.indexOf(path) >= 0) {
      return resf[proxyUrl].target
    }
  }
}

export function isuserIdNull (param) {
  var url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + wxconfig.appid + '&redirect_uri=http%3A%2F%2Fwww.' + wxconfig.domain + '.com%2F%23%2F' + param + '&response_type=code&scope=snsapi_userinfo&state=1&connect_redirect=1#wechat_redirect'
  LocalStorageService.remove('storeState')
  location.href = url
}

export function goDownload (val, obj) {
  obj.$router.push({name: 'download'})
}

export function openGame (arg, callback, obj) {
  arg = arg || ''
  obj.$router.push({name: 'download', params: {open: 'openapp'}})
}
