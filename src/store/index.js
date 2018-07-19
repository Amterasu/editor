import Vue from 'vue'
import Vuex from 'vuex'
import toolBarData from './modules/toolBarData'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toolBarData
  }
})
