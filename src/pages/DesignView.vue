<template>
  <div>
    <div class="editor-view">
      <design-tool />
      <div class="editor-view_bg">
        <div class="editor-view_contanier">
          <web-editor />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import DesignTool from "./DesignTool";
import WebEditor from "../components/webEditor/WebEditor";
export default {
  data() {
    return {
      // 参考线
      isShowRulerLine: true,
    };
  },
  methods: {
    // 参考线

  },
  created(){
    //  页面尺寸变化
    $(window).resize(function() {
        // page_height = $(window).height();
        $("#edui1_iframeholder").height(($(window).height() * 1) - 200);
    })
  },
  computed: {
    ...mapState("dataStructure", {
      data: state => state.data
    })
  },
  components: {
    DesignTool,
    WebEditor
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
  left: 440px;
  right: 270px;
  height: 100%;
  padding: 50px 0 150px 0;
  overflow: hidden;
  .custom-tree-node {
    display: flex;
    justify-content: center;
    width: 50%;
    height: 100px;
  }
  .el-tree-node__content {
    height: auto;
  }
  .editor-view_bg {
    position: absolute;
    margin: 0 auto;
    // top: 120px;
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
      // background: #fff;
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
      width: 500px;
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
