export default {
  state: {
    isLoading: false,
    content: {}
  },
  mutations: {
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    setContent (state, content) {
      state.content = content
    }
  }
}
