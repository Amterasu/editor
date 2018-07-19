import { SET_TOOL_BAR } from '../mutation-types'

const state = {
  toolBarType:'text', // text 包含文字； img 只包含图片
  cssRulers:{},
}

// mutations
const mutations = {
  [SET_TOOL_BAR](state, data) {
    state.toolBarType = data.toolBarType
    state.cssRulers = data.cssRulers
  },
}
export default {
  state,
  mutations,
  namespaced: true
}
