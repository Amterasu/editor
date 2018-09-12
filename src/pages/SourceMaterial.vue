<template>
  <div class="editor-left">
    <mu-paper class="material-menu">
      <div class="material-nav">
        <div class="nav-btn" v-for="item in navList" :key="item.class_id" @click="changeNav(item.class_id)" :class="{'active' : item.class_id == currNav}">
          <i class="material-icons">{{icon(item.class_id)}}</i>
          <span>{{item.class_name}}</span>
        </div>
      </div>
      <div class="material-container" id="material-container" ref="renderContainer">
        <template v-if="renderList.length > 0">
          <material-item v-for="item in renderList" :key="item.id" :html="item.content" :datas="item" />
        </template>
        <el-button class="nomore" type="primary" :loading="contentLoading" style="width:100%;" v-if="!nomore">加载中...</el-button>
        <el-button class="nomore" type="primary" style="width:100%;" v-if="nomore">没有更多</el-button>
      </div>
    </mu-paper>
  </div>

</template>

<script>
import MaterialItem from "../components/BaseMaterialContainer";
import api from "../api/api";
import {  mapState } from "vuex";

let id = 1000;
export default {
  data() {
    return {
      open: true,
      currNav: 2,
      timeout: true, // 截流 是否请求数据
      nomore: false, // 没有更多
      contentLoading: false, //loading
      page: 0, // 当前页
      renderList: [],
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
  methods: {
    // 获取素材分类
    async getClasses() {
      let ClassesRes = await api.getMertialClasses();
      if (ClassesRes.status === 200 && ClassesRes.data.code === "S") {
        this.navList = ClassesRes.data.msg;
        this.getList();
      }
    },
    // 获取素材列表
    async getList() {
      let params = {
        page: (this.page = this.page + 1),
        c: 1,
        t: this.currNav
      };
      let ListRes = await api.getMertialList(params);
      if (ListRes.status === 200 && ListRes.data.code === "S") {
        this.renderList = this.renderList.concat(ListRes.data.msg.data);
        this.contentLoading = false;
        this.nomore =
          ListRes.data.msg.current_page * ListRes.data.msg.per_page >=
          ListRes.data.msg.total;
      }
    },
    // 生成icon
    icon(class_id) {
      let icon = "";
      switch (class_id) {
        case 1:
          icon = "subtitles";
          break;
        case 2:
          icon = "text_format";
          break;
        case 3:
          icon = "texture";
          break;
        case 4:
          icon = "subtitles";
          break;
        case 5:
          icon = "favorite";
          break;
        case 6:
          icon = "airline_seat_individual_suite";
          break;
        case 7:
          icon = "dashboard";
          break;
        case 8:
          icon = "people_outline";
          break;
        default:
          break;
      }
      return icon;
    },
    // 切换导航
    changeNav(class_id) {
      this.currNav = class_id;
      this.resetStatus();
      this.getList();
    },
    // 重制状态
    resetStatus(){
      this.renderList = [];
      this.page = 0;
      this.timeout = !!1;
      this.nomore = !!0;
      this.contentLoading = !!0;
    },
    // 滚动加载 300ms截流
    onScroll() {
      let that = this;
      var $this = $(event.currentTarget),
        viewH = $this.height(), //可见高度
        contentH = $this.get(0).scrollHeight, //内容高度
        scrollTop = $this.scrollTop(); //滚动高度
      if (scrollTop + viewH + 42 >= contentH) {
        if (this.nomore || this.contentLoading || !this.timeout) return;
        this.timeout = false;
        this.contentLoading = true;
        setTimeout(() => {
          this.getList();
        }, 300);
      }
    }
  },
  computed: {
    ...mapState("user", ["user"]),
  },
  components: {
    MaterialItem
  },
  created() {
    this.getClasses();
    console.log(this.user)
  },
  mounted() {
    document
      .getElementById("material-container")
      .addEventListener("scroll", this.onScroll);
  }
};
</script>

<style  lang="scss" scoped>
@charset "UTF-8";
/* 左边导航 */
.editor-left {
  position: absolute;
  left: 0px;
  width: 460px;
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
    width: 360px;
    left: 80px;
    overflow: auto;
    height: calc(100% - 60px);
  }
  .nomore {
    text-align: center;
    background: #353535;
    color: #fff;
  }
}
</style>
