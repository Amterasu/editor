<template>
  <div class="container">
    <nav-bar/>
    <div class="vip-container">
      <div class="banner">
        <div class="banner-content">
          <div class="banner-title">
            <img src="../images/VIP_title_zhuangshi.png" alt="">
            <div class="title_text">会员随心购</div>
            <img src="../images/VIP_title_zhuangshi.png" alt="">
          </div>
          <div class="banner-purch">
            <div class="banner-purch-group">
              <div class="banner-purch-item">
                <div class="item-title">日享会员</div>
                <div class="item-price">
                  <span class="price">1</span>
                  <span class="op">元／天</span>
                </div>
                <div class="item-btn">开通</div>
              </div>
              <div class="banner-purch-item">
                <div class="item-title">月享会员</div>
                <div class="item-price">
                  <span class="price">13</span>
                  <span class="op">元／月</span>
                </div>
                <div class="item-btn">开通</div>
              </div>
              <div class="banner-purch-item">
                <div class="item-title">季享会员</div>
                <div class="item-price">
                  <span class="price">32</span>
                  <span class="op">元／季</span>
                </div>
                <div class="item-btn">开通</div>
              </div>
            </div>
            <div class="banner-purch-group">
              <div class="banner-purch-item">
                <div class="item-title">年享会员</div>
                <div class="item-price">
                  <span class="price">32</span>
                  <span class="op">元／季</span>
                </div>
                <div class="item-btn">开通</div>
              </div>
              <div class="banner-purch-item">
                <div class="item-title">终身会员</div>
                <div class="item-price">
                  <span class="price">32</span>
                  <span class="op">元／季</span>
                </div>
                <div class="item-btn">开通</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content">
        <img src="../images/VIP_title.png" alt="" class="vip_title">
        <div class="vip_title-text">享专属特权</div>
        <div class="vip-context">
          <div class="vip-context-item">
            <img src="../images/vip_tequan_gaoqingtupian.png" alt="">
            <div>高清图片</div>
          </div>
          <div class="vip-context-item">
            <img src="../images/vip_tequan_wuxianrongliang.png" alt="">
            <div>无限容量</div>
          </div>
          <div class="vip-context-item">
            <img src="../images/vip_tequan_moban.png" alt="">
            <div>海量模版</div>
          </div>
          <div class="vip-context-item">
            <img src="../images/vip_tequan_sucai.png" alt="">
            <div>VIP素材</div>
          </div>
          <div class="vip-context-item">
            <img src="../images/vip_tequan_lianjie.png" alt="">
            <div>永久链接</div>
          </div>
          <div class="vip-context-item">
            <img src="../images/vip_tequan_shouquan.png" alt="">
            <div>多账号授权</div>
          </div>
          <div class="vip-context-item">
            <img src="../images/vip_tequan_paiban.png" alt="">
            <div>一键排版</div>
          </div>
        </div>
        <div class="purvip-title">
          <img src="../images/VIP_title_zhuangshi.png" alt="">
          <div class="title_text">邀请好友领会员</div>
          <img src="../images/VIP_title_zhuangshi.png" alt="">
        </div>
        <div class="invitate">
          <div class="invitateText" style="width: 490px;">
            <div class="title">我的邀请链接</div>
            <div class="neirong">Hi童鞋，我找到了一款微信图文编辑器超好用，海量素材，快速排版，你也来试试吧！通过链接注册可得7天VIP http://www.365editor.com/invitation？code=01be320d279b996effbe&i=352J&t=2&source=invite</div>
          </div>
          <div class="invitateText">
            <div class="text-button">复制连接</div>
          </div>
          <div class="invitateText">
            <div class="title">邀请步骤</div>
            <div class="neirong">
              <ul>
                <li>复制邀请链接，发送给好友</li>
                <li>好友使用链接注册成功</li>
                <li>每成功邀请一名好友</li>
                <li>双方各自动获得7天VIP</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="different">
          <div class="dif-item">
            <div class="title">免费会员</div>
            <div class="text">注册成功</div>
            <div class="text">即可获得免费会员</div>
            <div class="btn">开始使用</div>
          </div>
          <div class="line"></div>
          <div class="dif-item">
            <div class="title">VIP会员</div>
            <div class="text">超多素材任性使</div>
            <div class="text">专属特权无限量</div>
            <div class="text">多种时限随心选</div>
            <div class="btn" style="margin:15px">立即开通</div>
          </div>
        </div>
        <div class="power">
          <div class="item-title">
            <div>免费会员</div>
            <div>会员权益</div>
            <div>VIP会员</div>
          </div>
          <div class="item-content" v-for="i in 10" :key="i">
            <div class="warp">
              <div class="selected"></div>
            </div>
            <div class="text">会员权益第一条</div>
            <div class="warp">
              <div class="unselected">无</div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import NavBar from "./NavBar";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    NavBar
  }
};
</script>
<style lang="scss" scoped>
.container {
  margin-top: 50px;
  background: #fff;
  height: 100%;
  width: 100%;
  .vip-container {
    overflow: auto;
    height: calc(100% - 56px);
  }
  .banner {
    width: 100%;
    height: 920px;
    background: url(../images/vip_banner_Bitmap.png);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .banner-content {
      margin-top: 108px;
      margin-bottom: 102px;
      width: 1200px;
      // height: 1000px;
      .banner-title {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 54px;
        width: 100%;
        .title_text {
          font-size: 50px;
          margin: 0 20px;
          color: #c0a170;
        }
      }
      .banner-purch {
        .banner-purch-group {
          display: flex;
          justify-content: center;
          padding: 40px;
          width: 100%;
          .banner-purch-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 1;
            margin-right: 40px;
            height: 320px;
            background: #fff;
            border: 1px solid #f3f3f3;
            border-bottom: 0;
            position: relative;
            border-radius: 2px;
            &:hover {
              box-shadow: 0px 0px 7px 2px #e4e4e4;
            }
            // &::after{
            //   position: absolute;
            //   width: 0;
            //   height: 0;
            //   background: #fff;
            // }
            &:last-child {
              margin-right: 0;
            }
            .item-title {
              font-size: 30px;
              color: #c0a170;
              margin-bottom: 12px;
            }
            .item-price {
              .price {
                font-size: 88px;
              }
              .op {
                font-family: PingFangSC-Regular;
                font-size: 14px;
                color: #797979;
                letter-spacing: 0;
                text-align: center;
              }
            }
            .item-btn {
              color: #c0a170;
              border: 1px solid #c0a170;
              text-align: center;
              font-size: 20px;
              width: 120px;
              height: 38px;
              line-height: 38px;
              border-radius: 2px;
              cursor: pointer;
              &:hover {
                color: #fff;
                background: #c0a170;
                transition: 0.3s all;
              }
            }
          }
        }
      }
    }
  }
  .content {
    padding: 150px 160px;
    .vip_title {
      margin-bottom: 60px;
    }
    .vip_title-text {
      font-family: PingFangSC-Light;
      font-size: 36px;
      color: #a1752d;
      letter-spacing: 100px;
      text-align: center;
      padding-left: 100px;
    }
    .vip-context {
      margin-top: 64px;
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      .vip-context-item {
        flex: 1;
        width: 80px;
        img {
          width: 64px;
        }
        div {
          font-size: 16px;
          color: #797979;
          letter-spacing: 0;
          text-align: center;
        }
      }
    }
    .purvip-title {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 100%;
      margin-top: 120px;
      .title_text {
        font-size: 50px;
        margin: 0 20px;
        color: #c0a170;
      }
    }
    .invitate {
      padding: 50px;
      width: 100%;
      margin-top: 50px;
      display: flex;

      background: url(../images/vip_linghuiyuan_bj.png);
      .invitateText {
        .title {
          font-family: PingFangSC-Light;
          font-size: 20px;
          color: #ffffff;
          letter-spacing: 1.67px;
          text-align: left;
        }
        .neirong {
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: justify;
          line-height: 26px;
          word-break: break-all;
          list-style: circle;
        }
        .text-button {
          color: #fff;
          border: 1px solid #fff;
          text-align: center;
          font-size: 20px;
          width: 120px;
          height: 38px;
          line-height: 38px;
          border-radius: 2px;
          margin: 80px 20px 0 20px;
          cursor: pointer;
          &:hover {
            color: #fff;
            background: #c0a170;
            transition: 0.3s all;
          }
        }
      }
    }
  }
  .different {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    .line {
      width: 2px;
      height: 120px;
      border-radius: 50%;
      margin: 0 30px;
      background: #a1752d;
    }
    .dif-item {
      .title {
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #333333;
        letter-spacing: 0;
        text-align: justify;
        text-align: center;
      }
      .text {
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #797979;
        letter-spacing: 3px;
        text-align: center;
        line-height: 26px;
      }
      .btn {
        color: #c0a170;
        border: 1px solid #c0a170;
        text-align: center;
        font-size: 14px;
        width: 100px;
        height: 28px;
        line-height: 28px;
        border-radius: 2px;
        margin: 40px 20px 0 20px;
        cursor: pointer;
        &:hover {
          color: #fff;
          background: #c0a170;
          transition: 0.3s all;
        }
      }
    }
  }
  .power {
    background: #f8f8f8;
    width: 940px;
    margin-left: 20px;
    padding: 50px 150px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 50px;
    .item-title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    .item-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      .warp {
        width: 60px;
        text-align: center;
        display: flex;
        justify-content: center;
      }
      .selected {
        width: 20px;
        height: 20px;
        background: #bba176;
        border-radius: 10px;
        // margin-left: 15px;
      }
      .unselected {
      }
    }
  }
}
</style>
