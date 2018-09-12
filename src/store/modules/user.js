import {
  SET_USER_INFO
} from '../mutation-types'
// 这里有登陆状态的判定方法，如果user为null说明用户未登陆
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
