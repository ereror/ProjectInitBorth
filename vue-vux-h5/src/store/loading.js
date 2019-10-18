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
    },
    isToken (state, istoken) {
      state.isloginroute = istoken
    }
  }
}
