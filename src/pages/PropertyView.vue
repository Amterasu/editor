<template>
  <div v-show="$material">
    <property-image v-show="toolBarType == 'img'" :cssRulers='cssRulerData' />
    <property-text v-show="toolBarType == 'text'" :cssRulers='cssRulerData' />
  </div>
</template>

<script>
import PropertyImage from "./PropertyImage";
import PropertyText from "./PropertyText";
import { mapMutations, mapState } from "vuex";

export default {
  data() {
    return {
      open: true,
      imgScale: 20,
      activeNames: ["1"],
      cssRulerData:{},
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
    PropertyImage,
    PropertyText
  },
  computed:{
    ...mapState("toolBarData", ["toolBarType", "cssRulers"])
  },
  watch:{
    cssRulers(newVal){
      // this.cssRulerData = newVal
      this.cssRulerData = Object.assign({}, this.cssRulerData, newVal)
    }
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
