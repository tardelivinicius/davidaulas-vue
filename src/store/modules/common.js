import Vue from 'vue'

const state = {
  access_token: '',
  refresh_token: ''
}

const actions = {
  SET_ACCESS_TOKEN (context, [accessToken, refreshToken]) {
    context.commit('SAVE_ACCESS_TOKEN', [accessToken, refreshToken])
  }
}

const mutations = {
  SAVE_ACCESS_TOKEN: (state, [accessToken, refreshToken]) => {
    Vue.set(state, 'access_token', accessToken)
    Vue.set(state, 'refresh_token', refreshToken)
  }
}

const getters = {
  access_token: state => {
    return state.access_token
  },
  refresh_token: state => {
    return state.refresh_token
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
