<template>
  <div id="tools" class="box jq_dd_div window ui-draggable window_act">
    <div class="hd">
      <i class="iconFold" title="缩小还原" @click="toolShow = !toolShow" :class="{folded:!toolShow}"></i>
      <span class="name">工具集</span>
    </div>
    <div class="bd list" v-show="toolShow">
      <el-tooltip class="item" effect="dark" content="清除参考线" placement="right">
        <p @click="removeRulerLine">
          <i class="iconfont icon-qingchu"></i>清除参考线
        </p>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="隐藏参考线" placement="right">
        <p @click="hideRulerLine">
          <i class="iconfont icon-yincang"></i>隐藏参考线
        </p>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="显示参考线" placement="right">
        <p @click="showRulerLine">
          <i class="iconfont icon-xianshikejian"></i>显示参考线
        </p>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="锁定后不能新增或者操作参考线" placement="right">
        <p @click="lockRulerLine">
          <i class="iconfont icon-suoding"></i>锁定参考线
        </p>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="解锁参考线" placement="right">
        <p @click="unlockRulerLine">
          <i class="iconfont icon-jiesuo"></i>解锁参考线
        </p>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="清除参考线" placement="right">
        <p @click="showGird">
          <i class="iconfont icon-wangge"></i>显示网格
        </p>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="清除参考线" placement="right">
        <p @click="hideGird">
          <i class="iconfont icon-Eliminate"></i>清除网格
        </p>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 工具箱
      toolShow: true
    };
  },
  methods: {
    hideRulerLine() {
      this.$emit("update:isShowRulerLine", false);
    },
    showRulerLine() {
      this.$emit("update:isShowRulerLine", true);
    },
    unlockRulerLine() {
      this.$emit("update:lineMove", true);
    },
    lockRulerLine() {
      this.$emit("update:lineMove", false);
    },

    showGird() {
      this.$emit("update:isGird", true);
    },
    hideGird() {
      this.$emit("update:isGird", false);
    },
    removeRulerLine(){
      this.$emit('removeRulerLine')
    }
  }
};
</script>

<style  lang="scss">
@import "../style/toolbar";
@import "../style/toolbarfont";
// 工具箱
#tools {
  position: fixed;
  top: 37px;
  right: 277px;
  width: 105px;
  z-index: 2009;
  color: #999;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  text-align: left;
  opacity: 0.95;
  .list p {
    padding: 5px;
  }
  p {
    cursor: pointer;
    border-bottom: 1px solid #242424;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.05);
    -webkit-transition: all 1s ease-out;
    -moz-transition: all 1s ease-out;
    -o-transition: all 1s ease-out;
    transition: all 1s ease-out;
    &:hover {
      color: #fff;
    }
    a {
      color: inherit;
    }
    i {
      margin-right: 5px;
    }
    &:hover [class^="icon-"],
    &:hover [class*=" icon-"],
    &:hover .icon-xxx {
      opacity: 1;
      filter: alpha(opacity=100);
      filter: alpha(opacity=100);
    }
  }
}
.box {
  background-color: #333;
  border: #000 1px solid;
  color: #999;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0 0 5px #000;
  -moz-box-shadow: 0 0 5px #000;
  box-shadow: 0 0 5px #000;
  opacity: 0.95;
  filter: alpha(opacity=95);
  filter: alpha(opacity=95);
}

.box {
  box-sizing: content-box;
  .hd {
    color: #ccc;
    height: 20px;
    padding: 5px;
    border-bottom: 1px solid #242424;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    zoom: 1;
    box-sizing: content-box;
    padding-left: 12px;
    .iconFold {
      width: 32px;
      position: absolute;
      height: 26px;
      background: url(/static/img/icon1.8996f06.svg) no-repeat -1240px 0;
      right: 0;
      top: 0;
      cursor: pointer;
      &.folded {
        background: url(/static/img/icon1.8996f06.svg) no-repeat -1160px -360px;
      }
    }
    &:before,
    &:after {
      display: table;
      content: "";
      line-height: 0;
    }
    &:after {
      clear: both;
    }
  }
  .bd {
    padding: 5px;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    min-height: 30px;
    zoom: 1;
    &:before,
    &:after {
      display: table;
      content: "";
      line-height: 0;
    }
    &:after {
      clear: both;
    }
  }
}
</style>
