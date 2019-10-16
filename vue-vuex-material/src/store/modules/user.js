// import localservice from '@/services/storage'
export default {
  state: {
    logined: false,
    username: 'admin',
    navselected: 1
  },
  mutations: {
    loginchange (state, username) {
      if (username && username.length) {
        state.logined = true
        state.username = username
      } else {
        state.logined = false
        state.username = ''
      }
      // localservice.set('userinfo', state)
    },
    navChange (state, navselected) {
      state.navselected = navselected
    }
  }
}
