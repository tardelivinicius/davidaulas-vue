import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import common from './modules/common'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: state => ({
    common: state.common
  })
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    common
  },
  plugins: [vuexLocal.plugin]
})
