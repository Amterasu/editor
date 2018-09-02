import {
  SET_USER_INFO
} from '../mutation-types'

const state = {
  user: null,
}

// mutations
const mutations = {
  [SET_USER_INFO](state, data) {
    state.user = data
  },
}
export default {
  state,
  mutations,
  namespaced: true
}
