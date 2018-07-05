<template>
  <div>
    <div class="editor-left">
      <mu-paper class="editor-menu">
        <div class="res-pannel-nav nav">
          <div class="nav-btn" v-for="item in navList" :key="item.index" @click="currNav = item.index" :class="{'active' : item.index == currNav}">
            <i class="material-icons">{{item.icon}}</i>
            <span>{{item.title}}</span>
          </div>
        </div>
        <div class="example-container">
          <div class="example-item">
            <div class="custom-tree-container">
              <div class="block">
                <p>使用 render-content</p>
                <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false" :render-content="renderContent" draggable>
                </el-tree>
              </div>
            </div>
          </div>
        </div>
      </mu-paper>
      <!-- 新增 -->
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import Vue from "vue";

let id = 1000;
export default {
  data() {
    return {
      open: true,
      currNav: 8,
      navList: [
        {
          title: "容器",
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
    ...mapMutations("dataStructure", ["APPEND_VNODES", "REMOVE_VNODES"]),
    drag() {
      this.SET_DRAG_DATA_TEMPLATE(this.dragStructure);
    },
    append(data, node, el) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
        this.APPEND_VNODES(el.root.data);
      console.log(data, node, el);
    },

    remove(node, data) {
      const parent = node.parent;
      const children = parent.data.children || parent.data;
      const index = children.findIndex(d => d.id === data.id);
      children.splice(index, 1);
    },

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data, data, store)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data, data, store)}
            >
              Delete
            </el-button>
          </span>
        </span>
      );
    }
  },
  computed: {
    ...mapState("dataStructure", {
      data: state => state.data
    })
  },
  components: {}
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
  background-color: #3f4652;
}

.res-pannel-nav {
  user-select: none;
  font-size: 12px;
  position: absolute;
  left: 0;
  top: 0;
  width: 60px;
  bottom: 0;
  background: #272c33;
}
.res-pannel-nav .nav-btn {
  height: 60px;
  width: 60px;
  text-align: center;
  line-height: 60px;
  position: relative;
  color: #fff;
  cursor: pointer;
  font-family: "PingFangSC-Regular";
}
.res-pannel-nav .nav-btn.feedBack {
  position: absolute;
  bottom: 20px;
}
.res-pannel-nav .nav-btn i {
  position: absolute;
  font-size: 17px;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
}
.res-pannel-nav .nav-btn span {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
.res-pannel-nav .nav-btn.active {
  background: #3f4652;
  color: #7e57c2;
}
.res-pannel-nav .nav-btn:hover {
  color: #7e57c2;
}
.example-container {
  padding: 20px;
  background: #3f4652;
  box-sizing: border-box;
  position: absolute;
  width: 300px;
  left: 60px;

  .example-item {
    background: #fff;
    // border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: background, 0.3s, ease;
    &:hover {
      box-shadow: 2px 4px 6px rgba(204, 204, 204, 0.5);
    }
  }
}
</style>
