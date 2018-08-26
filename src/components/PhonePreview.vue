<template>
  <div class="phone-preview" v-show="showStatus">
    <div class="mask">1</div>
    <div class="preview-view" data-type="fsType">
      <div class="preview_title">简夏编辑器</div>
      <div class="preview_body" id="preview_body" src="###">
        <div v-html="content"></div>
      </div>
    </div>
    <i class="fa fa-times-circle" @click="close"></i>
  </div>
</template>
<script>
import parseHtml from "./PhonePreivewParseHtml";
export default {
  data() {
    return {
      previewUrl: "http://www.baidu.com",
      showStatus: this.show,
      content: ""
    };
  },
  methods: {
    close() {
      this.showStatus = false;
      this.$emit("update:show", this.showStatus);
    }
  },
  props: {
    show: {
      // 状态
      type: Boolean,
      default: false
    }
  },
  watch: {
    show(newVal) {
      this.showStatus = newVal;
      let parseEditorHtml = new parseHtml(true, this.ue);
      this.content = parseEditorHtml.getEditorHtml(true);
    }
  },
  created() {}
};
</script>
<style lang="scss">
.phone-preview {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  z-index: 2010;
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.6);
    transition: 0.5s;
    opacity: 1;
    z-index: -200;
  }
  .fa {
    font-size: 35px;
    color: #fff;
    cursor: pointer;
  }
  .preview-view {
    width: 340px;
    height: 688px;
    box-sizing: border-box;
    background-image: url(../images/47.png);
    background-size: 100% auto;
    background-repeat: no-repeat;
    background-position: left top;
    padding-top: 102px;
    padding-left: 23px;

    .preview_title {
      width: 295px;
      margin-top: -17px;
      height: 40px;
      line-height: 40px;
      background-color: #21292c;
      font-size: 14px;
      color: #fff;
      text-align: center;
      padding: 0px 12px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      justify-content: space-between;
    }
    #preview_body {
      width: 295px;
      height: 483px;
      overflow-x: hidden;
      overflow-y: auto;
      background: #fff;
    }
  }
}
</style>