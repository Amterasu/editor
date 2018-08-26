<template>
  <!-- 上导航 -->
  <div id="navbar">
    <div class="navbar">
      <div class="nbContent">
        <div class="designer-view-mid">
          <button class="btn preview-btn" title="预览" @click="preview">
            <span class="icon"></span>
            <span class="title">预览</span>
          </button>
          <button class="btn qrCode-btn" title="二维码" @click="showQrcode">
            <span class="icon"></span>
            <span class="title">二维码</span>
          </button>
          <button class="btn release-btn" title="发布" @click="publish4Article">
            <span class="icon"></span>
            <span class="title">发布</span>
          </button>
        </div>
      </div>
    </div>
    <login-dialog :show.sync="showLoginDialog" />
    <am-publish :show.sync="showPublishPage" />
    <am-preview :show.sync="showPreview" />
    <am-qrcode-dialog :show.sync="qrcodeDia" v-model="qrcodeImg" @close="hideQrcodeDia" />
  </div>

</template>

<script>
import LoginDialog from "../components/LoginDialog";
import amQrcodeDialog from "../components/BaseQrcodeDialog";
import amPublish from "../components/PublishArticle";
import amPreview from "../components/PhonePreview";
export default {
  data() {
    return {
      showLoginDialog: false,
      qrcodeDia: false,
      qrcodeImg: "",
      showPublishPage: false,
      showPreview: false
    };
  },
  methods: {
    loginShow() {
      this.showLoginDialog = true;
    },
    showQrcode() {
      this.qrcodeDia = true;
    },
    hideQrcodeDia() {
      // 隐藏了二维码弹框
    },
    publish4Article() {
      this.showPublishPage = true;
    },
    preview() {
      this.showPreview = true;
    }
  },
  components: {
    LoginDialog,
    amQrcodeDialog,
    amPublish,
    amPreview
  }
};
</script>
<style lang="scss" scoped>
.navbar {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 120;
  width: 100%;
  height: 37px;
  border-bottom: 1px solid #151515;
  background: #353535;
  display: flex;
  align-items: stretch;
  .nbContent {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    .designer-view-mid {
      position: absolute;
      top: 0;
      left: 50%;
      height: 100%;
      transform: translateX(-50%) scale(0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      .btn {
        border-radius: 2px;
        height: 28px;
        line-height: 24px;
        background: #4a4a4a;
        margin-left: 2px;
        display: block;
        font-size: 12px;
        color: #fff;
        text-align: left;
        cursor: pointer;
        &:hover {
          background: #282828;
          color: #ddd;
        }
        .title {
          margin: 0 9px 0 4px;
        }
        &.preview-btn .icon {
          width: 24px;
          height: 24px;
          background-position: -480px 0;
        }
        &.qrCode-btn .icon {
          width: 24px;
          height: 24px;
          background-position: -520px 0;
        }
        &.release-btn .icon {
          width: 24px;
          height: 24px;
          background-position: -560px 0;
        }
        .icon {
          background: url(../images/icon1.svg) no-repeat;
          float: left;
          display: block;
        }
      }
    }
  }
}
</style>

