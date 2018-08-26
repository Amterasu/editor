<template>
  <div class="login-container" v-show="showStatus">
    <div class="duotuweSelectedContainer" v-show="currStep == 3">
      <div class="layout-right">
        <div class="list-main">
          <div class="tips" v-show="duotuwenSelectedArr.length == 0">一次最多同步8篇图文信息</div>
          <div class="firstTuwen" v-show="duotuwenSelectedArr.length > 0">
            <img src="http://47.95.9.245/tag/nodejs.jpg" alt="">
            <div>{{duotuwenSelectedArr[0]}}</div>
          </div>
          <div class="list-op" v-show="duotuwenSelectedArr.length > 0">
            <i class="fa fa-long-arrow-down content_move_down" @click="clickCellDown(0)" v-show="duotuwenSelectedArr.length > 1"></i>
            <i class="fa fa-trash-o content_move_del" @click="clickCellRemove(0)"></i>
          </div>
        </div>
        <div class="list-others">
          <div class="list-others-item" v-for="(item,index) in duotuwenSelectedArr" :key="item +'1i'" v-if="index > 0">
            <div class="item-info">
              <div class="title">{{item}}</div>
              <div class="cover"><img src="http://47.95.9.245/tag/nodejs.jpg"></div>
            </div>
            <div class="list-op">
              <i class="fa fa-long-arrow-up content_move_up" @click="clickCellUp(index)"></i>
              <i class="fa fa-long-arrow-down content_move_down" @click="clickCellDown(index)" v-if="index + 1 < duotuwenSelectedArr.length"></i>
              <i class="fa fa-trash-o content_move_del" @click="clickCellRemove()"></i>
            </div>
          </div>
          <div class="add-tip">
            <div class="title">点击左侧内容选取图文</div>
            <div class="cover">
              <i class="iconfont icon-image"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="header">
      <div class="logo"></div>
      <div class="close-btn" @click="close"></div>
    </div>
    <div class="mask"></div>
    <div class="login-box">
      <div class="title">将文章同步到微信</div>
      <div class="main">
        <div class="register">
          <ul class="tab">
            <li class="person-tab" :class="{active:currStep == 1}">设置文章信息</li>
            <li class="person-tab" :class="{active:currStep == 2 || currStep == 3}">同步设置</li>
            <li class="person-tab" :class="{active:currStep == 4}">选择同步账号</li>
          </ul>
          <div class="form">
            <div class="step" v-show="currStep == 1">
              <div class="form-items">
                <p class="labelText">封面:</p>
                <div class="wx-loginImg">
                  <div class="iconfont icon-yunshangchuan"></div>
                </div>
                <p class="labelText">标题:</p>
                <input v-model="syncStep1.Title" placeholder="请输入标题(必填)">
                <p class="labelText">作者:</p>
                <input v-model="syncStep1.Author" placeholder="请输入作者(必填)">
                <p class="labelText">摘要:</p>
                <textarea v-model="syncStep1.Summary" placeholder="选填，如果不填写会默认抓取正文前54个字"></textarea>
                <p class="labelText">原文链接:</p>
                <input v-model="syncStep1.EndUrl" placeholder="请输入原文链接">
              </div>
              <div class="next-btn" @click="gotoStep2">下一步</div>
            </div>
            <div class="step" v-show="currStep == 2">
              <div class="resource-item-container">
                <div class="resource-item f--hlc flex-1 " @click="syncType = 1" :class="{active:syncType == 1}">
                  <div class="item-wrap f--hlc flex-1">
                    <div class="item-inner-wrap f--hlc">
                      <div class="item-pic f--hcc">
                        <div class="item-pic-logo mtextIcon-logo"></div>
                      </div>
                      <div class="item-info">
                        <div class="item-info-text">单图文同步</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="resource-item-container" @click="syncType = 2">
                <div class="resource-item f--hlc flex-1 " :class="{active:syncType == 2}">
                  <div class="item-wrap f--hlc flex-1">
                    <div class="item-inner-wrap f--hlc">
                      <div class="item-pic f--hcc">
                        <div class="item-pic-logo mtextIcon-logo"></div>
                      </div>
                      <div class="item-info">
                        <div class="item-info-text">多图文同步</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="next-btn" @click="gotoStep3">下一步</div>
            </div>
            <div class="step" v-show="currStep == 3">
              <div class="form-items">
                <div class="resource-item-container" v-for="item in duotuwenList" :key="item">
                  <div class="resource-item f--hlc flex-1 hover-item" @click.stop="contentClick(item)">
                    <div class="item-wrap f--hlc flex-1">
                      <div class="item-inner-wrap f--hlc">
                        <div class="item-pic f--hcc">
                          <div class="item-pic-logo mtextIcon-logo"></div>
                        </div>
                        <div class="item-info">
                          <div class="description">111</div>
                          <div class="author">222</div>
                          <div class="time">333</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-group">
                <div class="item-btn" @click="gotoStep2" style="margin:0 10px;">上一步</div>
                <div class="item-btn" @click="gotoStep4">下一步</div>
              </div>
            </div>
            <div class="step" v-show="currStep == 4">
              <div class="form-items">
                <div class="resource-item-container" v-for="item in 10" :key="item">
                  <div class="resource-item f--hlc flex-1 " @click="selectSyncAccount(account)" :class="{active:accountSelected.includes(account.AccountId)}">
                    <div class="item-wrap f--hlc flex-1">
                      <div class="item-inner-wrap f--hlc">
                        <div class="item-pic f--hcc">
                          <div class="item-pic-logo mtextIcon-logo"></div>
                        </div>
                        <div class="item-info">
                          <div class="item-info-text">账号信息</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-group">
                <div class="item-btn" @click="gotoAuth">新增授权</div>
                <div class="item-btn" @click="gotoStep2from4" style="margin:0 10px;">上一步</div>
                <div class="item-btn" @click="gotoSync">同步</div>
              </div>
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
      showStatus: this.show,
      syncStep1: {
        Title: "",
        Author: "",
        Summary: "",
        EndUrl: "",
        Cover: ""
      },
      currStep: 1,
      syncType: 1,
      accountSelected: [],
      duotuwenSelectedArr: [], // 多图文选择的文章
      duotuwenList: [1, 2, 3, 4, 5, 6, 7],
      // showDuotuwenSelectedDialog:false,
      account: {
        AccountId: "gh_b9efc6c032a0",
        AppId: "wx9950b0e7afc1d294",
        IsTrue: 1,
        NickName: "robyne",
        ProfileImageUrl:
          "http://wx.qlogo.cn/mmopen/AhLk989Zrl1Is9t7VDhyILHmdY8CSbet4JdtJWurx2oYHHKZpoKM5OGNf3Nq55ibnEyQicRpA6AZt9WZ6TMwkH0mnX1pJQLfqn/0",
        Status: 1,
        Type: 2
      }
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
      this.currStep = 1;
      this.syncType = 1;
      this.accountSelected = [];
      this.syncStep1 = {
        Title: "",
        Author: "",
        Summary: "",
        EndUrl: "",
        Cover: ""
      };
      this.$emit("update:show", this.showStatus);
    },
    gotoStep2() {
      this.accountSelected = [];
      this.currStep = 2;
    },
    gotoStep3() {
      if (this.syncType == 2) {
        this.currStep = 3;
        this.duotuwenSelectedArr = [];
      } else this.currStep = 4;
    },
    gotoStep4() {
      this.currStep = 4;
    },
    gotoStep2from4() {
      if (this.syncType == 2) {
        this.accountSelected = [];
        this.currStep = 3;
      } else this.currStep = 2;
    },
    selectSyncAccount(item) {
      if (this.accountSelected.includes(item.AccountId)) {
        this.accountSelected.splice(
          this.accountSelected.indexOf(item.AccountId),
          1
        );
      } else {
        this.accountSelected.push(item.AccountId);
      }
    },
    gotoSync() {},
    gotoAuth() {},
    contentClick(item) {
      if (this.duotuwenSelectedArr.length <= 7)
        this.duotuwenSelectedArr.push(item);
    },
    clickCellUp(index) {
      const arrCopy = [...this.duotuwenSelectedArr];
      let arrCopy4Vue = [...this.duotuwenSelectedArr];
      arrCopy4Vue[index] = arrCopy[index - 1];
      arrCopy4Vue[index - 1] = arrCopy[index];
      this.duotuwenSelectedArr = arrCopy4Vue;
    },
    clickCellDown(index) {
      const arrCopy = [...this.duotuwenSelectedArr];
      let arrCopy4Vue = [...this.duotuwenSelectedArr];
      arrCopy4Vue[index] = arrCopy[index + 1];
      arrCopy4Vue[index + 1] = arrCopy[index];
      this.duotuwenSelectedArr = arrCopy4Vue;
    },
    clickCellRemove(index) {
      this.duotuwenSelectedArr.splice(index, 1);
    }
  },
  watch: {
    show(newVal) {
      this.showStatus = newVal;
    }
  },
  computed: {}
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
    background: rgba(0, 0, 0, 0.6);
    transition: 0.5s;
    opacity: 1;
    z-index: -200;
  }
  .login-box {
    width: 440px;
    position: absolute;
    transition: 0.5s;
    top: 45%;
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
      background-color: #353535;
      padding: 20px 40px;
      border-radius: 8px;
      overflow: hidden;
      .register {
        position: relative;
        .tab {
          overflow: hidden;
          margin-bottom: 14px;
          li {
            float: left;
            width: 84px;
            margin-right: 50px;
            font-size: 14px;
            color: #b5b5b5;
            padding-bottom: 18px;
            text-align: center;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
            }
            &.active {
              color: #ffa800;
              // border-bottom: 2px solid #ffa800;
            }
          }
        }

        .form {
          position: relative;
          .form-items {
            height: 280px;
            overflow: auto;
            .labelText {
              height: 30px;
              line-height: 30px;
              display: block;
              margin-top: 2px;
              font-size: 12px;
              color: #b5b5b5;
              width: 300px;
              margin-left: 30px;
              text-align: left;
            }

            input,
            textarea {
              border-radius: 2px;
              width: 100%;
              line-height: 32px;
              font-size: 14px;
              border: none;
              outline: none;
              background: #232323;
              color: #fff;
              width: 300px;
              padding-left: 10px;
            }
            input {
              height: 32px;
            }
            textarea {
              height: 121px;
              resize: none;
              padding: 0 10px;
            }
          }
          .resource-item-container {
            border-radius: 2px;
            border-top: none;
            margin-bottom: 4px;
            overflow: hidden;
            .hover-item:hover {
              background-color: #39311f;
            }
            .resource-item {
              cursor: pointer;
              color: #adadad;
              background-color: #303030;
              &.active {
                background-color: #39311f;
              }
              .item-wrap {
                padding: 4px;
                width: 232px;
                min-width: 232px;
                .item-inner-wrap {
                  width: 100%;
                  .item-pic {
                    width: 68px;
                    min-width: 68px;
                    height: 68px;
                    min-height: 68px;
                    margin-right: 6px;
                    background-color: #151515;
                    position: relative;
                    .item-pic-logo {
                      width: 68px;
                      height: 68px;
                    }
                  }
                }
                .item-inner-info {
                  width: 100%;
                  > div {
                    color: #fff;
                    font-size: 16px;
                  }
                  .item-info-text {
                    color: #fff;
                    font-size: 16px;
                  }
                  .author {
                    font-size: 14px;
                  }
                  .time {
                    font-size: 12px;
                  }
                }
              }
            }
          }
          .wx-loginImg {
            width: 300px;
            height: 170px;
            background: #232323;
            margin-left: 30px;
            margin-bottom: 20px;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            .iconfont {
              font-size: 30px;
              color: #aaa;
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
          .btn-group {
            display: flex;
            justify-content: center;
            margin-top: 20px;
            .item-btn {
              border-radius: 4px;
              border: none;
              outline: none;
              cursor: pointer;
              height: 36px;
              flex: 1;
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
          .next-btn {
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
        }
      }
    }
  }
}
.duotuweSelectedContainer {
  width: 290px;
  position: absolute;
  transition: 0.5s;
  padding: 10px;
  top: 40%;
  right: 50%;
  margin-right: -520px;
  transform: translateY(-50%);
  opacity: 1;
  background: #353535;
  border-radius: 5px;
  .layout-right {
    width: 270px;
    float: left;
    padding: 18px 24px;
    box-sizing: border-box;
    // background: #e8f6ff;
    border-radius: 2px;
    height: 290px;
    overflow-y: auto;
    .list-main {
      width: 100%;
      // height: 130px;
      background: #fff;
      border-radius: 2px;
      position: relative;
      .firstTuwen {
        position: relative;
        font-size: 0;
        > img {
          width: 100%;
          height: 100%;
        }
        > div {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          left: 0;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.65);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 12px;
        }
      }
      .tips {
        line-height: 128px;
        font-weight: 600;
        text-align: center;
        box-sizing: border-box;
      }
      .item-info {
        height: 130px;
        position: relative;
        box-sizing: border-box;
        border: 1px solid #bfbfbf;
        border-radius: 2px;
        position: relative;
        .cover {
          width: 100%;
          img {
            width: 100%;
            height: 128px;
          }
        }
        .title {
          width: 100%;
          height: 30px;
          line-height: 30px;
          padding: 0 10px;
          box-sizing: border-box;
          position: absolute;
          bottom: 0;
          left: 0;
          color: #ffffff;
          background: rgba(0, 0, 0, 0.65);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .list-op {
        padding-top: 32px;
      }
      &:hover {
        .list-op {
          opacity: 1;
        }
      }
    }
    .list-others {
      border: 1px solid #bfbfbf;
      .add-tip,
      .item-info {
        padding: 0 10px;
        box-sizing: border-box;
        height: 66px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #fff;
      }
      .title {
        width: 140px;
        color: #999;
        font-size: 12px;
        margin-right: 6px;
      }
      .cover {
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        background: #ececec;
        border-radius: 4px;
        .iconfont {
          color: #c9c9c9;
          font-size: 30px;
          vertical-align: middle;
        }
      }
      .add-tip {
        border-top: none;
      }
      .list-others-item {
        position: relative;
        .item-info {
          border: 1px solid #bfbfbf;
          border-top: none;
          cursor: pointer;
          .title {
            max-height: 60px;
            overflow: hidden;
            color: #333;
            text-align: left;
          }
          img {
            width: 50px;
            height: 50px;
          }
        }
        &:hover {
          .list-op {
            opacity: 1;
          }
        }
      }
    }
    .list-op {
      position: absolute;
      top: 0;
      left: -22px;
      opacity: 0;
      transition: all 0.3s;
      i {
        width: 20px;
        height: 20px;
        line-height: 20px;
        background: #585858;
        text-align: center;
        display: block;
        margin-bottom: 3px;
        color: #f5f5f5;
        cursor: pointer;
      }
    }
  }
}
</style>
