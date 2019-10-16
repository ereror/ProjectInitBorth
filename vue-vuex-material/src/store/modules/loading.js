export default {
  state: {
    isLoading: false,
    isloginroute: false
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      if (location.hash === '#/login') state.isloginroute = true
      else state.isloginroute = false
      state.isLoading = payload.isLoading
       // 加载或关闭loading图标
      // optloading(state)
    },
    isToken (state, istoken) {
      state.isloginroute = istoken
    }
  }
}
