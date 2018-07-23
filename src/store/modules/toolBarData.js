import {
  SET_TOOL_BAR
} from '../mutation-types'

const state = {
  toolBarType: 'text', // text 包含文字； img 只包含图片
  cssRulers: {
    backgroundColor: "#fff",
    blur: 0,
    brightness: 100,
    color: "rgb(60, 60, 60)",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "400",
    grayscale: 0,
    hueRotate: 0,
    invert: 0,
    letterSpacing: 0,
    lineHeight: "27px",
    opacity: 100,
    rotate: 0,
    saturate: 100,
    scale: 1,
    sepia: 0,
    skewX: 0,
    skewY: 0,
    text: "",
    textAlign: "start",
    textDecoration: "none solid rgb(60, 60, 60)",
    translateX: 0,
    translateY: 0,
  },
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
