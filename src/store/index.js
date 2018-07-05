import Vue from 'vue'
import Vuex from 'vuex'
import dataStructure from './modules/dataStructure'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    dataStructure
  }
})
