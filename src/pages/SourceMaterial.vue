<template>
  <div class="editor-left">
    <mu-paper class="material-menu">
      <div class="material-nav">
        <div class="nav-btn" v-for="item in navList" :key="item.index" @click="currNav = item.index" :class="{'active' : item.index == currNav}">
          <i class="material-icons">{{item.icon}}</i>
          <span>{{item.title}}</span>
        </div>
      </div>
      <div class="material-container">
        <material-item />
        <material-item />
        <material-item />
      </div>
    </mu-paper>
  </div>
</template>

<script>
import MaterialItem from "../components/BaseMaterialContainer";
let id = 1000;
export default {
  data() {
    return {
      open: true,
      currNav: 8,
      navList: [
        {
          title: "热门",
          icon: "subtitles",
          index: 8
        },
        {
          title: "标题",
          icon: "subtitles",
          index: 1
        },
        {
          title: "正文",
          icon: "text_format",
          index: 2
        },
        {
          title: "图文",
          icon: "texture",
          index: 3
        },
        {
          title: "关注",
          icon: "favorite",
          index: 4
        },
        {
          title: "分隔符",
          icon: "airline_seat_individual_suite",
          index: 5
        },
        {
          title: "二维码",
          icon: "dashboard",
          index: 6
        },
        {
          title: "交互",
          icon: "people_outline",
          index: 7
        }
      ]
    };
  },
  methods: {},
  computed: {},
  components: {
    MaterialItem
  }
};
</script>

<style  lang="scss" scoped>
@charset "UTF-8";
/* 左边导航 */
.editor-left {
  position: absolute;
  left: 0px;
  width: 360px;
  height: 100%;
  background-color: #232323;
  .material-nav {
    user-select: none;
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    bottom: 0;
    background: #272c33;
    border-right: 1px solid #151515;
    .nav-btn {
      height: 60px;
      width: 60px;
      text-align: center;
      line-height: 60px;
      position: relative;
      color: #fff;
      cursor: pointer;
      font-family: "PingFangSC-Regular";
      &.feedBack {
        position: absolute;
        bottom: 20px;
      }
      i {
        position: absolute;
        font-size: 17px;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
      }
      span {
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
      }
      &.active {
        background: #232323;
        color: #7e57c2;
      }
      &:hover {
        color: #7e57c2;
      }
    }
  }
  .material-container {
    padding: 20px;
    // background: #3f4652;
    box-sizing: border-box;
    position: absolute;
    width: 260px;
    left: 80px;
  }
}
</style>
