<template>
  <!-- 上导航 -->
  <div id="navbar">
    <div class="navbar">
      <div class="nbContent">
        <div class="designer-view-mid">
          <button class="btn preview-btn" title="首页" @click="preview">
          </button>
          <router-link class="btn release-btn" title="VIP服务" to="/vip" tag="button">
            <span class="title">首页</span>
          </router-link>
          <router-link class="btn qrCode-btn" title="编辑器" to="/" tag="button">
            <span class="title">编辑器</span>
          </router-link>

          <button class="btn release-btn" title="素材库" @click="publish4Article">
            <span class="title">素材库</span>
          </button>
          <button class="btn release-btn" title="公众号运营" @click="publish4Article">
            <span class="title">公众号运营</span>
          </button>
          <button class="btn release-btn" title="内容中心" @click="publish4Article">
            <span class="title">内容中心</span>
          </button>
          <router-link class="btn release-btn" title="VIP服务" to="/vip" tag="button">
            <span class="title">VIP服务</span>
          </router-link>
          <button class="btn release-btn" title="帮助中心" @click="publish4Article">
            <span class="title">帮助中心</span>
          </button>
          <button class="btn release-btn">
            <span class="title" v-if="!user || !user.nick_name" @click="loginShow">登录／注册</span>
            <span v-if="user && user.nick_name" class="userNick" @click="showPersonalModel" slot="reference">
              <span>{{user.nick_name}}</span>
              <i class="iconfont icon-xiala"></i>
            </span>
            <ul class="dropDownToggle" v-show="personalModel">
              <li>
                <span class="iconfont icon-gerenzhongxin"></span>
                个人中心
              </li>
              <li @click.stop="logout">
                <span class="iconfont icon-tuichu"></span>
                退出登录
              </li>
            </ul>
          </button>
        </div>

      </div>
    </div>
    <login-dialog :show.sync="showLoginDialog" @loginSuccess="loginSuccess"/>
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
import { mapMutations, mapState } from "vuex";
import api from "../api/api";

export default {
  data() {
    return {
      showLoginDialog: false,
      qrcodeDia: false,
      qrcodeImg: "",
      showPublishPage: false,
      showPreview: false,
      personalModel: false
    };
  },
  methods: {
    ...mapMutations("user", ["SET_USER_INFO"]),
    loginShow() {
      this.showLoginDialog = true;
    },
    loginSuccess(){
      // 登陆成功的回调，去处理一些事务
    },
    showPersonalModel() {
      this.personalModel = !this.personalModel;
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
    },
    logout(){
      window.localStorage.removeItem('token');
      location.reload()
    }
  },
  components: {
    LoginDialog,
    amQrcodeDialog,
    amPublish,
    amPreview
  },
  created() {
    if (window.localStorage.getItem("token")) {
      api.getUserInfo().then(res => {
        this.SET_USER_INFO(res.data);
      });
    }
  },
  computed: {
    ...mapState("user", ["user"])
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
  height: 50px;
  border-bottom: 1px solid #151515;
  background: #353535;
  display: flex;
  align-items: stretch;
  .dropDownToggle {
    position: absolute;
    z-index: 99;
    width: 112px;
    right: 0;
    top: 50px;
    margin: 0;
    background: #353535;
    border: 1px solid #1b1b1b;
    li {
      opacity: 0.6;
      display: flex;
      flex-direction: row;
      align-items: center;
      height: 32px;
      overflow: hidden;
      font-size: 12px;
      color: #b5b5b5;
      cursor: pointer;
      &:hover {
        background: #232323;
        color: #fff;
      }
      span {
        width: 24px;
        height: 24px;
        margin: 0 11px 0 7px;
        display: block;
      }
    }
  }
  .nbContent {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    width: 100%;
    .designer-view-mid {
      position: absolute;
      top: 0;
      right: 0;
      height: 100%;
      // transform: translateX(-50%) scale(0.9);
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .btn {
        border-radius: 2px;
        height: 100%;
        line-height: 24px;
        background: transparent;
        margin-left: 2px;
        display: block;
        font-size: 12px;
        color: #fff;
        text-align: center;
        .userNick {
          display: inline-block;
          width: 80px;
          height: 49px;
          line-height: 49px;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 0 12px;
          display: flex;
          i {
            font-size: 12px;
            margin-left: 5px;
          }
        }
        cursor: pointer;
        &:hover {
          background: #282828;
          color: #ddd;
        }
        .title {
          margin: 0 12px;
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

