<template>
  <div class="login-container" v-show="showStatus">
    <div class="header">
      <div class="logo"></div>
      <div class="close-btn" @click="close"></div>
    </div>
    <div class="mask"></div>
    <div class="login-box">
      <div class="title">注册</div>
      <div class="main">
        <div class="register">
          <ul class="tab">
            <li class="person-tab active">微信注册</li>
          </ul>
          <div class="form">
            <div class="wx-loginImg">

            </div>
            <div class="wx-refresh">
              <div class="iconfont icon-refresh"></div>
            </div>
            <div class="check">
              <label class="agree-check ant-checkbox-wrapper">
                <span class="ant-checkbox ant-checkbox-checked ant-checkbox-checked-1">
                  <span class="ant-checkbox-inner"></span><input type="checkbox" class="ant-checkbox-input"></span>
              </label>
              <label>
                同意
                <a href="/agreement.pdf">服务协议</a>
              </label>
            </div>
            <div class="login-btn">注册</div>
            <div>
              <span class="toggle">未注册用户扫码后可直接注册并登陆</span>
            </div>
          </div>
        </div>
        <div class="mistake-message hidden">手机号不能为空</div>
      </div>
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      showStatus: this.show
    };
  },
  props: {
    show: {
      // 状态
      type: Boolean,
      default: false
    }
  },
  methods: {
    ensure() {
      this.close();
      this.$emit("ensure");
    },
    close() {
      this.showStatus = false;
      this.$emit("update:show", this.showStatus);
    }
  },
  watch: {
    show(newVal) {
      this.showStatus = newVal;
    }
  }
};
</script>

<style lang="scss" scoped>
.login-container {
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
  .header {
    background-color: #303030;
    width: 100%;
    height: 60px;
    position: absolute;
    transition: 0.5s;
    top: 0;
    opacity: 1;
    .close-btn {
      background: url(../images/icon1.svg);
      width: 30px;
      height: 30px;
      float: right;
      margin-top: 15px;
      margin-right: 24px;
      cursor: pointer;
      filter: brightness(5);
      transform: scale(1.5);
      background-position: -480px -360px;
    }
  }
  .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    background: #575757;
    transition: 0.5s;
    opacity: 1;
    z-index: -200;
  }
  .login-box {
    width: 400px;
    position: absolute;
    transition: 0.5s;
    top: 40%;
    transform: translateY(-50%);
    opacity: 1;

    .title {
      width: 100%;
      font-size: 20px;
      text-align: center;
      color: #fff;
      margin-bottom: 14px;
    }
    .main {
      width: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      padding: 20px 40px;
      border-radius: 8px;
      overflow: hidden;
      .register {
        position: relative;
        .tab {
          overflow: hidden;
          margin-bottom: 34px;
          li {
            float: left;
            width: 84px;
            margin-right: 26px;
            font-size: 14px;
            color: #b5b5b5;
            padding-bottom: 18px;
            text-align: center;
            cursor: pointer;
            &.active {
              color: #ffa800;
              border-bottom: 2px solid #ffa800;
            }
          }
        }
        .form {
          position: relative;
          .wx-loginImg {
            width: 220px;
            height: 220px;
            background: #fff;
            margin-left: 50px;
            margin-bottom: 20px;
          }
          .wx-refresh {
            position: absolute;
            top: 0;
            left: 50px;
            width: 220px;
            height: 220px;
            background: #333;
            opacity: 0.7;
            display: flex;
            justify-content: center;
            align-items: center;
            > .icon {
              color: #fff;
              font-size: 20px;
              cursor: pointer;
            }
          }
          .form-item {
            width: 100%;
            margin-bottom: 30px;
            position: relative;
            .icon {
              position: absolute;
              background: url(../images/icon1.svg);
              width: 36px;
              height: 36px;
            }
            .mistake-icon {
              background-position: -400px 0;
              position: absolute;
              right: 0;
              top: 0;
            }
            .phone-icon {
              background-position: -160px 0;
            }
            input {
              width: 100%;
              border-radius: 4px;
              height: 36px;
              line-height: 36px;
              background: #383838;
              padding-left: 36px;
              padding-right: 36px;
              font-size: 14px;
              color: #fff;
              border: 1px solid #383838;
              outline: none;
            }
          }
          .check {
            height: 40px;
            font-size: 12px;
            color: #fff;
            label {
              margin-right: 3px;
              color: #b5b5b5;
              float: left;
              a {
                color: #ffa800;
                font-size: 12px;
              }
            }
          }
          .toggle {
            float: right;
            margin-top: 10px;
            color: #fff;
            cursor: pointer;
          }
          .login-btn {
            border-radius: 4px;
            border: none;
            outline: none;
            cursor: pointer;
            width: 100%;
            height: 36px;
            background: #ffa800;
            font-size: 16px;
            color: #fff;
            text-align: center;
            line-height: 36px;
            &:hover {
              background-color: #ffba33;
            }
          }
        }
      }
    }
  }
}
</style>
