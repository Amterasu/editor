<template>
  <div class="editor">
    <nav-bar/>
    <div class="editor-main">
      <source-material/>
      <property-view/>
      <design-view/>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import SourceMaterial from "./SourceMaterial";
import PropertyView from "./PropertyView";
import DesignView from "./DesignView";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    NavBar,
    SourceMaterial,
    PropertyView,
    DesignView
  }
};
</script>
<style lang="scss" scoped>
.editor-main {
  margin-top: 36px;
}
</style>
