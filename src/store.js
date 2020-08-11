import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    keyword: '',
    userInfo: {},
    isLogin: false
  },
  mutations: {
    updateKeyword(state, val) {
      state.keyword = val
    },
    login(state, val) {
      state.userInfo = val.userInfo
      state.isLogin = val.isLogin
    },
    logout(state) {
      state.userInfo = {}
      state.isLogin = false
    }
  },
  actions: {

  }
})
