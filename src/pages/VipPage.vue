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
  .banner {
    width: 100%;
    height: 1120px;
    background: url(../images/vip_banner_Bitmap.png);
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    .banner-content {
      margin-top: 108px;
      margin-bottom: 102px;
      width: 1200px;
      height: 1000px;
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
}
</style>
