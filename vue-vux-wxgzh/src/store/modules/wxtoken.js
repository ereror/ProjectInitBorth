
import LocalStorageService from '@/service/storage'
var Q = require('q')
export default {
  state: {
    userid: '',
    uheadeimgurl: '',
    unickname: '',
    usex: '',
    diamond: 0,
    score: {},
    expris: '',
    isagent: false,
    logontimes: 0,
    duobao_tickets: 0
  },
  mutations: {
    setUAccessToken (state, newState) {
      var deferred = Q.defer()
      state.usex = newState.sex
      state.uheadeimgurl = newState.icon
      state.unickname = newState.nick
      state.userid = newState.userid
      state.diamond = newState.diamond
      state.score = newState.score
      state.isagent = newState.isagent
      state.logontimes = newState.logontimes
      state.duobao_tickets = newState.duobao_tickets
      state.expris = new Date().getTime()
      LocalStorageService.set('storeState', JSON.stringify(state))
      deferred.resolve(0)
      return deferred.promise
    },
    setstore (state, store) {
      for (var attr in store) {
        if (store[attr]) {
          state[attr] = store[attr]
        }
        if (store[attr] === 0) {
          state[attr] = 0
        }
      }
      LocalStorageService.set('storeState', JSON.stringify(state))
    }
  }
}
