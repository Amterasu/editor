<template>
  <div class="item">
    <div class="">
      <section class="KolEditor">
        <section style="display:flex;align-items:center;justify-content:center;margin:10px auto;">
          <section style="max-width:320px !important;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/152325635ebec93aa28d082b9ce28bba10fadd.png" style="max-width:100%;margin:0px auto;"></section>
        </section>
      </section>
    </div>
    <i class="fa media fa-star-o"></i>
    <img src="../images/vip.png" class="isvip">
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: this.value
    };
  },
  methods: {
    changeSwitch() {
      this.emitSwitch();
    },
    emitSwitch() {
      this.$emit("changeSwitch", this.status);
    }
  },
  props: {
    type: {
      // template mertial
      type: String,
      default: 'mertial'
    },
    isVip: {
      // 是否是vip
      type: Boolean,
      default: false
    },
    full: {
      // 容器全宽或者半宽
      type: Boolean,
      default: true
    }
  }
};
</script>
<style lang="scss" scoped>
.item{
  margin-top:10px;
}
i.media {
  position: absolute;
  right: 0px;
  top: 0px;
  color: #f7ba2a;
  font-size: 20px;
  display: block;
  width: 40px;
  height: 40px;
  text-align: center;
  padding-left: 8px;
  line-height: 35px;
  background-color: rgba(0, 0, 0, 0.4);
  border-bottom-left-radius: 100%;
  display: none;
  z-index: 99;
}
i.fa-trash-o {
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.6);
  line-height: 30px;
  text-align: center;
  font-size: 16px;
  color: #fff;
  border-radius: 50%;
  display: none;
}
.isvip {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 99;
      width: 25px;
}
i.fa-times {
  color: #ff4949 !important;
}
.item {
  &:hover {
    transition: all 0.3s ease;
    i.media {
      display: block;
    }
    i.fa-trash-o {
      display: block;
    }
    .isvip {
      display: block;
    }
    .templateSelect {
      display: block;
    }
    i.pasterAbout {
      display: block !important;
    }
  }
  &.item {
    position: relative;
    overflow: hidden;
    background: #fff;
    padding: 5px 10px;
    cursor: pointer;
    min-height: 60px;
    border-radius: 5px;
    transition: background, 0.3s, ease;
    &.designTemplate,
    &.template {
      .mytemplate-Name,
      .mytemplate-title {
        display: none;
      }
    }
    &.draft,
    &.myTemplate,
    &.mysign {
      max-height: 240px;
      border: 1px solid #e6e6e6;
      padding: 0px;
      > div {
        > div {
          padding: 10px;
        }
      }
      .mytemplate-Name {
        height: 33px;
        line-height: 33px;
        background-color: #f9fafc;
        color: #333333;
        font-size: 14px;
        box-sizing: border-box;
        padding-left: 12px;
      }
      .mytemplate-summary {
        line-height: 1.5px;
        background-color: #f9fafc;
        color: #333333;
        font-size: 12px;
        box-sizing: border-box;
        padding: 5px 12px;
      }
    }

    img {
      max-width: 100%;
    }
    .templateSelect {
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: 88;
      display: none;
      > p {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 100%;
      }
      button {
        &:hover {
          i,
          span {
            color: #f7ba2a;
          }
        }
        border: none;
        background-color: transparent;
        > span {
          i {
            font-size: 40px;
            width: 40px;
            color: #fff;
            line-height: 100%;
            height: 100%;
            text-align: center;
            display: inline-block;
          }
          > span {
            display: block;
            font-size: 16px;
            color: #fff;
            margin-top: 15px;
          }
        }
      }
    }
  }
}
.mytemplate {
  border-width: 1px;
  border-color: rgb(230, 230, 230);
  border-style: solid;
  border-radius: 4px;
  padding: 0px;
  margin-top: 12px;
  > div > div {
    margin: 12px;
    max-height: 180px;
    overflow: hidden;
    overflow-y: auto;
  }
  p.mytemplate-title {
    height: 34px;
    line-height: 34px;
    padding: 0px 12px;
    background-color: #f9fafc;
    font-size: 14px;
    color: #333333;
  }
  p.mytemplate-summary {
    height: 34px;
    line-height: 34px;
    padding: 0px 12px;
    background-color: #f9fafc;
    font-size: 14px;
    color: #333333;
  }
}
p.mytemplate-title {
  height: 34px;
  line-height: 34px;
  padding-left: 12px;
  background-color: #f9fafc;
  font-size: 14px;
  color: #333333;
}
p.designTemplat-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  margin-top: 6px;
  span {
    &:nth-child(1) {
      font-size: 14px;
      color: #666666;
      i {
        font-size: 16px;
        margin-right: 3px;
      }
    }
    &:nth-child(2) {
      font-size: 20px;
      color: #ff5e45;
      i {
        font-style: normal;
        font-size: 14px;
      }
    }
  }
}
qqmusic {
  min-height: 60px;
  width: 100%;
  border: 1px solid #e7e7ed;
  margin: 17px 1px 16px 0;
  display: block;
  // background-image: url("../../javascript/lib/ueditor/themes/default/images/icon_qqmusic_audio_default.png");
  background-position: right center;
  background-repeat: no-repeat;
  position: relative;
  padding: 9px 12px;
}
qqmusic:before {
  content: "QQ音乐";
  display: block;
  text-align: left;
}
qqmusic:after {
  content: "QQ音乐--预览查看";
  color: #8d8d8d;
  display: block;
  text-align: left;
}
</style>
