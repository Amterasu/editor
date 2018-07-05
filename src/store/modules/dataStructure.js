import { APPEND_VNODES } from '../mutation-types'
import { REMOVE_VNODES } from '../mutation-types'

let id = 1000;
const data = [
  {
    id: 1,
    label: "一级 1",
    style: { backGround: "red" },
    children: [
      {
        id: 4,
        label: "二级 1-1",
        style: { backGround: "red" },
        children: [
          {
            id: 9,
            label: "三级 1-1-1",
            style: { backGround: "red" }
          },
          {
            id: 10,
            label: "三级 1-1-2",
            style: { backGround: "red" }
          }
        ]
      }
    ]
  }
];
const state = {
  data: data
}

// mutations
const mutations = {
  [APPEND_VNODES](state, data) {
    state.data = JSON.parse(JSON.stringify(data))
  },
  [REMOVE_VNODES](state) {
    let treeCopy = {};
  },
}
export default {
  state,
  mutations,
  namespaced: true
}
