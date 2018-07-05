<template>
  <div>
    <div class="editor-view">
      <design-tool :isShowRulerLine.sync="isShowRulerLine" :lineMove.sync="lineMove" :isGird.sync="isGird" @removeRulerLine="removeRulerLine" />
      <div id="line_top"></div>
      <div v-show=" hRulerLine && isShowRulerLine" id="line_top" v-for="i in  hRulerLine" :key="'topline_'+i" :ref="'hRulerLine_'+i" @mousedown="changeHDragTarget(i)" style="cursor:move" v-if=" i > delHLineIndex"></div>
      <div class="editor-view_bg" @mousemove="move" @mouseup="stopMove" :style="isDraging?'cursor:pointrer':''">
        <div id="line_left"></div>
        <div v-show="vRulerLine && isShowRulerLine" id="line_left" v-for="i in vRulerLine" :key="'leftline_'+i" :ref="'vRulerLine_'+i" @mousedown="changeVDragTarget(i)" style="cursor:move" v-if=" i > delVLineIndex"></div>
        <div class="h_ruler_wraper" @mousedown="createHRulerLine" @mouseup="stopMove">
          <ul id="h_ruler">
            <li v-for="i in rulerXScale" :key="i">{{i}}</li>
          </ul>
        </div>
        <div class="editor-view_contanier" :class="{gird:isGird}">
          <!-- <div class="custom-tree-container">
            <div class="block">
              <p>使用 render-content</p>
              <el-tree :data="data" default-expand-all :expand-on-click-node="false" :render-content="renderContent" draggable>
              </el-tree>
            </div>
          </div> -->
        </div>
        <ul id="v_ruler" @mousedown="createVRulerLine">
          <li v-for="i in rulerYScale" :key="i">
            <span>{{i}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import DesignTool from "./DesignTool";
export default {
  data() {
    return {
      // 参考线
      hRulerLine: 0,
      hRulerLineArr: [],
      vRulerLine: 0,
      vRulerLineArr: [],
      isDraging: false,
      currDrag: "",
      timeout: null,
      delVLineIndex: 0,
      delHLineIndex: 0,
      isShowRulerLine: true,
      lineMove: true,
      isGird: false,
      rulerXScale: [0, 100, 200, 300, 400, 500, 600],
      rulerYScale: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]
    };
  },
  methods: {
    // 参考线
    createHRulerLine($event) {
      if (!this.lineMove) {
        return;
      }
      this.hRulerLine++;
      this.hRulerLineArr.push("hRulerLine_" + this.hRulerLine);
      this.currDrag = "hRulerLine_" + this.hRulerLine;
      this.isDraging = true;
      this.isShowRulerLine = true;
    },
    createVRulerLine($event) {
      if (!this.lineMove) {
        return;
      }
      this.vRulerLine++;
      this.vRulerLineArr.push("vRulerLine_" + this.vRulerLine);
      this.currDrag = "vRulerLine_" + this.vRulerLine;
      this.isDraging = true;
      this.isShowRulerLine = true;
    },
    move($event) {
      if (!this.timeout && this.lineMove) {
        let that = this;
        this.timeout = setTimeout(function() {
          if (!!that.currDrag) {
            if (that.currDrag.includes("hRulerLine_")) {
              that.$refs[that.currDrag][0].style.top =
                $event.offsetY + 116 + "px";
            } else {
              that.$refs[that.currDrag][0].style.left =
                $event.offsetX - 5 + "px";
            }
          }

          that.timeout = null;
        }, 10);
      }
    },
    changeHDragTarget(i) {
      this.currDrag = "hRulerLine_" + i;
    },
    changeVDragTarget(i) {
      this.currDrag = "vRulerLine_" + i;
    },
    stopMove() {
      this.currDrag = "";
    },
    removeRulerLine() {
      this.delVLineIndex = this.vRulerLineArr.length;
      this.delHLineIndex = this.hRulerLineArr.length;
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span style="">
            <el-button
              size="mini"
              type="text"
              // on-click={() => this.append(data, data, store)}
            >
              Append
            </el-button>
            <el-button
              size="mini"
              type="text"
              // on-click={() => this.remove(node, data, data, store)}
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
  components: {
    DesignTool
  }
};
</script>

<style  lang="scss">
@charset "UTF-8";
/* 中部预览区 */
.editor-view {
  box-sizing: border-box;
  background: #151515;
  position: absolute;
  left: 360px;
  right: 270px;
  height: 100%;
  padding: 50px 0 150px 0;
  overflow: auto;
  .custom-tree-node {
    display: flex;
    justify-content: center;
    width: 50%;
    height: 100px;
  }
  .el-tree-node__content {
    height: auto;
  }
  #line_top {
    width: 100%;
    height: 0;
    border-bottom: 2px solid #4affff;
    // transform: scaleY(0.5);
    position: absolute;
    left: 0;
    top: 120px;
    z-index: 49;
  }
  #line_left {
    width: 0;
    height: 100%;
    border-right: 2px solid #4affff;
    // transform: scaleY(0.5);
    position: absolute;
    left: 0px;
    top: -120px;
    z-index: 49;
  }
  .editor-view_bg {
    position: absolute;
    margin: 0 auto;
    top: 120px;
    left: 50%;
    transform: translateX(-50%);

    .h_ruler_wraper {
      position: absolute;
      width: 100%;
      height: 14px;
      overflow: hidden;
      left: 0;
      top: -17px;
      #h_ruler {
        background: url(../images/h-ruler.jpeg) repeat-x;
        width: 130%;
        height: 100%;
        cursor: s-resize;
        li {
          width: 100px;
          height: 100%;
          text-align: left;
          float: left;
          font-size: 10px;
          color: #535353;
          line-height: 1.3;
          padding-left: 4px;
        }
      }
    }
    #v_ruler {
      background: url(../images/v-ruler.jpeg) repeat-y;
      width: 13px;
      height: 100%;
      position: absolute;
      left: -13px;
      top: 0;
      cursor: e-resize;
      overflow: hidden;
      li {
        width: 100%;
        height: 100px;
        span {
          font-size: 10px;
          color: #535353;
          transform: rotate(90deg);
          display: block;
          padding-left: 5px;
        }
      }
    }
    .editor-view_contanier {
      position: relative;
      background: #fff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
      width: 640px;
      height: 1040px;
      overflow: auto;
      margin-bottom: 150px;
      &.gird {
        background-color: #efefef;
        background-image: linear-gradient(white 2px, transparent 0),
          linear-gradient(90deg, white 2px, transparent 0),
          linear-gradient(hsla(0, 0%, 100%, 0.3) 1px, transparent 0),
          linear-gradient(90deg, hsla(0, 0%, 100%, 0.3) 1px, transparent 0);
        background-size: 75px 75px, 75px 75px, 15px 15px, 15px 15px;
      }
      .KolEditor {
        .vnodeRow {
          background-color: #f5f5f5;
          -webkit-box-sizing: border-box;
          -moz-box-sizing: border-box;
          box-sizing: border-box;
          -webkit-box-shadow: inset 0 1px 13px rgba(0, 0, 0, 0.1);
          -moz-box-shadow: inset 0 1px 13px rgba(0, 0, 0, 0.1);
          box-shadow: inset 0 1px 13px rgba(0, 0, 0, 0.1);
          border: 1px solid #dddddd;
          border-radius: 4px 4px 4px 4px;
          margin: 5px 0;
          position: relative;
          padding: 3px;
          position: relative;
          .vnodeColumn {
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 4px 4px 4px 4px;
            flex: 1;
            height: 50px;
            position: relative;
          }
        }
      }
    }
  }
}
</style>
