<template>
  <div>
    <nav-bar/>
    <div style="margin-top:36px">
      <left-page/>
      <tool-drawer/>
      <view-content/>
    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar";
import LeftPage from "./LeftPage";
import ToolDrawer from "./ToolDrawer";
import ViewContent from "./ViewContent";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    NavBar,
    LeftPage,
    ToolDrawer,
    ViewContent
  }
};
</script>
