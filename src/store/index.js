import Vue from 'vue'
import Vuex from 'vuex'
import toolBarData from './modules/toolBarData'
import user from './modules/user'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toolBarData,
    user
  }
})
