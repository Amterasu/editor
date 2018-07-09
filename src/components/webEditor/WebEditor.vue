<template>
  <vue-ueditor-wrap v-model="msg" :config="UEDITOR_CONFIG" @ready="ready"></vue-ueditor-wrap>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap"
import UEDITOR_CONFIG from "./editorConfig"
import Vue from 'vue'

export default {
  data() {
    return {
      UEDITOR_CONFIG: this.UEDITOR_CONFIG,
      msg:
        '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue2.x + UEditor + v-model双向绑定</h2>'
    };
  },
  methods: {
    ready(editorInstance) {
      Vue.prototype.ue = editorInstance;
    }
  },
  components:{
    VueUeditorWrap
  },
  props: {
    value: {
      // 状态
      type: Boolean,
      default: false
    },
    label: {
      type: [String, Number],
      default: ""
    },
    full: {
      // 容器全宽或者半宽
      type: Boolean,
      default: true
    }
  }
};
</script>
