<template>
  <div class="login-container" v-show="showStatus">
    <div class="header">
      <div class="logo"></div>
      <div class="close-btn" @click="close"></div>
    </div>
    <div class="mask"></div>
    <div class="login-box">
      <div class="title">{{text}}</div>
      <div class="main">
        <div class="register">
          <ul class="tab" v-show="typeNum != 3">
            <li class="person-tab" :class="{active: tabType ==1}" @click="tabType = 1">微信{{text}}</li>
            <li class="person-tab" :class="{active: tabType ==2}" @click="tabType = 2" v-show="typeNum == 1">手机号{{text}}</li>
          </ul>
          <!-- 注册 -->
          <div class="form" v-show="typeNum == 2">
            <div class="wx-loginImg">
              <img id="qrcodeRegsiter" v-show="registerQrcodeImg" style="width:100%;height:100%" :src="registerQrcodeImg">
            </div>
            <div class="wx-refresh" v-show="showRegisterRefresh" @click="refreshRegisterQrcode">
              <div class="iconfont icon-refresh"></div>
            </div>
            <div class="check">
              <div class="password-toggle-btn">
                <span @click="toggleToLogin">已有账号</span>
              </div>
            </div>

          </div>
          <!-- 登陆 -->
          <div class="password-toggle-layer" v-show="typeNum == 1">
            <div v-if="tabType == 2">
              <div class="normal">
                <div>
                  <div class="iconfont icon-shoujihao"></div><input v-model="loginMobile" type="text" placeholder="请输入手机号" autocomplete="on" required="">
                  <div class="alarm"></div>
                </div>
              </div>

              <div class="special">
                <div>
                  <div class="iconfont icon-guanbi"></div><input v-model="loginImgcode" type="text" maxlength="6" placeholder="请输入图形验证码" required="">
                  <button class="get-btn" @click="refreshImgCode"><img style="width:100%;height:100%;cursor:pointer" :src="imgCode" alt=""></button>
                </div>
              </div>
              <div class="special">
                <div>
                  <div class="iconfont icon-yanzhengma"></div><input v-model="loginVcode" type="text" maxlength="6" placeholder="请输入验证码" required="">
                  <button class="get-btn" @click="sendVcode(1)">{{timeoutRegisterText}}</button>
                </div>
              </div>
            </div>
            <template v-else-if="tabType == 1">
              <div class="wx-loginImg">
                <img id="qrcodeLogin" v-show="loginQrcodeImg" style="width:100%;height:100%" :src='loginQrcodeImg'>
              </div>
              <div class="wx-refresh" v-show="showLoginRefresh" @click="refreshLoginQrcode">
                <div class="iconfont icon-refresh"></div>
              </div>
            </template>
            <div class="login-btn" v-show="tabType == 2 && typeNum == 1" @click="mobileLogin">登陆</div>
            <div>
              <span class="toggle" :style="tabType == 1?'margin-right: 48px;':'margin-top:10px;'" @click="toggleToRegister">注册</span>
              <!-- <span class="toggle" v-show="tabType == 2" :style="tabType == 1?'margin-right: 48px;':'margin-top:10px;'" style="margin-right:15px;" @click="toggleToForget">忘记密码</span> -->
            </div>
          </div>
          <!-- 找回密码 -->
          <div class="password-toggle-layer" v-show="typeNum == 3">
            <div v-if="tabType == 2">
              <div class="normal">
                <div>
                  <div class="iconfont icon-shoujihao"></div><input type="text" placeholder="请输入手机号" autocomplete="on" required="">
                  <div class="alarm"></div>
                </div>
              </div>
              <div class="special">
                <div>
                  <div class="iconfont icon-yanzhengma"></div><input type="text" maxlength="6" placeholder="请输入验证码" required="">
                  <button class="get-btn" @click="sendVcode(2)">{{timeoutFindPasswordText}}</button>
                </div>
                <p class="hidden">
                  未收到短信？&nbsp;&nbsp;请尝试
                </p>
              </div>
              <div class="normal">
                <div>
                  <div class="iconfont icon-mima"></div><input type="password" placeholder="请输入新密码" required="">
                  <div class="alarm"></div>
                </div>
              </div>
            </div>
            <template v-else-if="tabType == 1">
              <div class="wx-loginImg">
                <!-- <div id="qrcodeLogin"></div> -->
              </div>
              <div class="wx-refresh">
                <div class="iconfont icon-refresh"></div>
              </div>
            </template>
            <div class="login-btn">确认修改</div>
            <div>
              <span class="toggle" :style="tabType == 1?'margin-right: 48px;':'margin-top:10px;'" @click="toggleToRegister">注册</span>
              <span class="toggle" @click="toggleToLogin" v-show="tabType == 2" :style="tabType == 1?'margin-right: 48px;':'margin-top:10px;'" style="margin-right:15px;">我想起来了</span>
            </div>
          </div>
        </div>
        <div class="mistake-message">{{errorMsg}}</div>
      </div>
    </div>
  </div>

</template>
<script>
import api from "../api/api";
import QRCode from "qrcodejs2";
import { notice } from "../js/common";
import { mapMutations, mapState } from "vuex";
const errorMsg = [
  "手机号不能为空",
  "手机号格式不对",
  "图形验证码不能为空",
  "手机验证码不能为空",
  "图形验证码错误",
  "短信验证码错误",
  "该用户不存在"
];
export default {
  data() {
    return {
      showStatus: this.show,
      typeNum: this.type, // 1.登陆 2.注册
      tabType: 1, // 1.微信 2.手机号
      timeoutFindPassword: 60,
      timeoutRegister: 60,
      showRegisterRefresh: false,
      showLoginRefresh: false,
      LoginTimeOutWxQrcode: 60,
      registerTimeOutWxQrcode: 60,
      LoginTimeotReference: null, // 用于关闭窗口时清除定时器
      registerTimeotReference: null, // 用于关闭窗口时清除定时器
      loginQrcodeImg: "",
      registerQrcodeImg: "",
      imgCode: "",
      randomNum: 1,
      errorMsg: "",
      loginMobile: "",
      loginImgcode: "",
      loginVcode: ""
    };
  },
  props: {
    show: {
      // 状态
      type: Boolean,
      default: false
    },
    type: {
      // 状态
      type: Number,
      default: 1
    }
  },
  methods: {
    ...mapMutations("user", ["SET_USER_INFO"]),
    ensure() {
      this.close();
      this.$emit("ensure");
    },
    close() {
      this.showStatus = false;
      this.reset();
      this.$emit("update:show", this.showStatus);
    },
    reset() {
      this.tabType = 1;
      this.timeoutFindPassword = 60;
      this.timeoutRegister = 60;
      this.showRegisterRefresh = false;
      this.showLoginRefresh = false;
      this.LoginTimeOutWxQrcode = 60;
      this.registerTimeOutWxQrcode = 60;
      this.loginQrcodeImg = "";
      this.registerQrcodeImg = "";
      clearTimeout(this.LoginTimeotReference);
      clearTimeout(this.registerTimeotReference);
      this.loginQrcodeImg = "";
      this.registerQrcodeImg = "";
      this.imgCode = "";
      this.randomNum = 1;
      this.errorMsg = "";
      this.loginMobile = "";
      this.loginImgcode = "";
      this.loginVcode = "";
    },
    // 切换页面：注册
    toggleToRegister() {
      this.tabType = 1;
      this.typeNum = 2;
      this.getWxImg();
    },
    // 切换页面：忘记密码
    toggleToForget() {
      this.typeNum = 3;
      this.getWxImg();
    },
    // 切换页面：登陆
    toggleToLogin() {
      this.typeNum = 1;
      this.getWxImg();
    },
    // 发送手机验证码
    async sendVcode(type) {
      // type 1:注册 2:找回密码
      const varTypes = type == 1 ? "timeoutRegister" : "timeoutFindPassword";
      if (!this.loginMobile) {
        this.errorMsg = errorMsg[0];
        return;
      }
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.loginMobile
        )
      ) {
        this.errorMsg = errorMsg[1];
        return;
      }
      if (!this.loginImgcode) {
        this.errorMsg = errorMsg[2];
        return;
      }
      this.errorMsg = "";
      let mobileCodeStatus = await api.getMobileCode({
        phone: this.loginMobile,
        code: this.loginImgcode,
        sign: this.randomNum
      });
      if (
        mobileCodeStatus.data.code == "F" &&
        mobileCodeStatus.data.msg == "验证码错误，请重新输入"
      ) {
        this.errorMsg = errorMsg[4];
        this.refreshImgCode();
        return;
      }
      if (
        mobileCodeStatus.data.code == "F" &&
        mobileCodeStatus.data.msg == "该用户不存在"
      ) {
        this.errorMsg = errorMsg[6];
        return;
      }
      // if(mobileCodeStatus.data.code == "S"){
      //   this.loginVcode = mobileCodeStatus.data.msg
      // }
      if (this[varTypes] != 60) return;
      var self = this;
      cutDown();
      function cutDown(num) {
        if (self[varTypes] == 0) self[varTypes] = 60;
        else {
          self[varTypes] = self[varTypes] - 1;
          setTimeout(cutDown, 1000);
        }
      }
    },
    // 获取微信的二维码
    async getWxImg() {
      let backdata = await api.getWxCode();
      if (backdata.status == 200 && backdata.data.code == "S") {
        const target =
          this.typeNum == 1 ? "loginQrcodeImg" : "registerQrcodeImg";
        let url = backdata.data.msg.url;
        this.qrcode(target, url);
        this.socketWxCodeStatus(backdata.data.msg.sign);
      } else {
        notice.error("服务器错误");
      }
    },
    // 生成二维码
    qrcode(target, url) {
      this[target] = url;
      // $("#" + target).empty();
      // let qrcode = new QRCode(target, {
      //   width: 220,
      //   height: 220, // 高度
      //   text: url, // 二维码内容
      //   image: ""
      // });
    },
    // 获取二维码状态 轮询接口
    async socketWxCodeStatus(sign) {
      let self = this;
      let status = await api.getWxCodeStatus({ sign: sign });
      let whichTimeout =
        self.typeNum == 1 ? "LoginTimeOutWxQrcode" : "registerTimeOutWxQrcode";
      let whichMask =
        self.typeNum == 1 ? "showLoginRefresh" : "showRegisterRefresh";
      let whichTimeoutReference =
        self.typeNum == 1 ? "LoginTimeotReference" : "registerTimeotReference";
      if (status.data.code == "S") {
        // 成功登陆
        clearTimeout(self.LoginTimeotReference);
        clearTimeout(self.registerTimeotReference);
        this.setUserInfo(status);
        this.close();
        notice.success("登录成功");
      } else {
        if (self[whichTimeout] == 0) {
          // 二维码过期
          self[whichTimeout] = 60;
          self[whichMask] = true;
        } else {
          self[whichTimeout] = self[whichTimeout] - 1;
          self[whichTimeoutReference] = setTimeout(() => {
            self.socketWxCodeStatus(sign);
          }, 1000);
        }
      }
    },
    async setUserInfo(status) {
      window.localStorage.setItem("token", status.data.msg.access_token);
      let userInfo = await api.getUserInfo();
      this.SET_USER_INFO(userInfo.data);
    },
    // 刷新注册的图形验证码
    refreshRegisterQrcode() {
      this.showRegisterRefresh = false;
      this.getWxImg();
    },
    // 刷新登陆的图形验证码
    refreshLoginQrcode() {
      this.showLoginRefresh = false;
      this.getWxImg();
    },
    // 创建随机数 用于请求图形验证码
    createRandomNum() {
      this.randomNum = new Date().getTime();
    },
    // 获得图形验证码地址
    async getImgCodeUrl() {
      this.createRandomNum();
      this.imgCode =
        "https://server.jianxiakeji.com/api/login/code?sign=" + this.randomNum;
      // let res = api.getImgCodeUrl({ sign: this.randomNum });
      // console.log(res);
    },
    // 刷新图形验证码
    refreshImgCode() {
      this.getImgCodeUrl();
    },
    // 手机号登陆
    async mobileLogin() {
      if (!this.loginMobile) {
        this.errorMsg = errorMsg[0];
        return;
      }
      if (
        !/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(
          this.loginMobile
        )
      ) {
        this.errorMsg = errorMsg[1];
        return;
      }
      if (!this.loginImgcode) {
        this.errorMsg = errorMsg[2];
        return;
      }
      if (!this.loginVcode) {
        this.errorMsg = errorMsg[3];
        return;
      }
      this.errorMsg = "";
      let loginStatus = await api.login4mobile({
        phone: this.loginMobile,
        phonecode: this.loginVcode
      });
      if (loginStatus.data.code == "F") {
        this.errorMsg = errorMsg[5];
        return;
      }
      this.setUserInfo(loginStatus);
      this.close();
      notice.success("登录成功");
    }
  },
  computed: {
    text() {
      return this.typeNum == 1
        ? "登陆"
        : this.typeNum == 2 ? "注册" : "找回密码";
    },
    timeoutFindPasswordText() {
      return this.timeoutFindPassword == 60
        ? "获取验证码"
        : this.timeoutFindPassword;
    },
    timeoutRegisterText() {
      return this.timeoutRegister == 60 ? "获取验证码" : this.timeoutRegister;
    }
  },
  watch: {
    show(newVal) {
      this.showStatus = newVal;
      if (newVal) {
        this.getWxImg();
        this.getImgCodeUrl();
      }
    },
    type(newVal) {
      this.getWxImg();
    }
  },
  created() {
    this.getImgCodeUrl();
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
  .mistake-message {
    width: 200px;
    position: absolute;
    left: 95px;
    bottom: 20px;
    z-index: 11;
    text-align: center;
    font-size: 14px;
    color: #fc0119;
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
    margin-top: 20px;
    &:hover {
      background-color: #ffba33;
    }
  }
  .toggle {
    float: right;

    color: #fff;
    cursor: pointer;
    &:hover {
      color: #ffa800;
    }
  }
  .password-toggle-btn {
    position: relative;
    width: 160px;
    height: 20px;
    line-height: 20px;
    color: #b5b5b5;
    text-align: right;
    width: 100%;
    > span {
      &:hover {
        color: #ffa800;
        cursor: pointer;
      }
    }
  }
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
      .password-toggle-layer {
        width: 100%;
        margin-bottom: 30px;
        position: relative;
        .iconfont {
          position: absolute;
          color: #b5b5b5;
          font-size: 23px;
          margin: 1px 9px;
        }
        .mistake-icon {
          background-position: -400px 0;
          position: absolute;
          right: 0;
          top: 0;
        }

        .normal {
          margin-top: 30px;
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
        .special {
          margin-top: 30px;
          .get-btn {
            border-bottom-right-radius: 4px;
            border-top-right-radius: 4px;
            width: 109px;
            height: 36px;
            margin-left: 2px;
            font-size: 14px;
            color: #fff;
            background-color: #ffa800;
            cursor: pointer;
            &:hover {
              background: #f5bc51;
            }
          }
          > div {
            display: flex;
            input {
              border-radius: 4px;
              height: 36px;
              line-height: 36px;
              background: hsla(0, 0%, 100%, 0.2);
              padding-left: 36px;
              font-size: 14px;
              color: #fff;
              flex: 1;
              margin-right: -10px;
            }
          }
        }
      }
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
          opacity: 0.9;
          display: flex;
          justify-content: center;
          align-items: center;
          > .iconfont {
            color: #fff;
            font-size: 40px;
            cursor: pointer;
          }
        }
        .form {
          position: relative;

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
        }
      }
    }
  }
}
</style>
