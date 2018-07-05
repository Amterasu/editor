<template>
  <div>
    <tool-image v-show="currType == 1" />
    <tool-text v-show="currType == 2" />
  </div>
</template>

<script>
import ToolImage from "./ToolImage";
import ToolText from "./ToolText";
export default {
  data() {
    return {
      open: true,
      imgScale: 20,
      activeNames: ["1"],
      currType: 1,
      font: {
        fontSize: 12,
        color: "#3fbad9",
        lineHeights: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
        lineHeight: 1
      }
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    }
  },
  components: {
    ToolImage,
    ToolText
  }
};
</script>

<style  lang="scss">
@import "../style/toolbar";
@import "../style/toolbarfont";
.control {
  font-family: Microsoft YaHei, STHeitiSC-Light;
}

.editor-menu {
  display: inline-block;
}
</style>
