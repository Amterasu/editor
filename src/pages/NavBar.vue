<template>
  <!-- 上导航 -->
  <div id="navbar">
    <div class="navbar">
      <div class="nbContent">
        <div class="designer-view-mid">
          <button class="btn preview-btn" title="预览">
            <span class="icon"></span>
            <span class="title">预览</span>
          </button>
          <button class="btn qrCode-btn" title="二维码">
            <span class="icon"></span>
            <span class="title">二维码</span>
          </button>
          <button class="btn release-btn" title="发布" @click="loginShow">
            <span class="icon"></span>
            <span class="title">发布</span>
          </button>
        </div>
      </div>
    </div>
    <login-dialog :show.sync="showLoginDialog" />
  </div>

</template>

<script>
import LoginDialog from "../components/LoginDialog";
export default {
  data() {
    return {
      showLoginDialog: false
    };
  },
  methods: {
    loginShow() {
      this.showLoginDialog = true;
    }
  },
  components: { LoginDialog }
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

