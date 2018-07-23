<template>
  <vue-ueditor-wrap v-model="msg" :config="UEDITOR_CONFIG" @ready="ready"></vue-ueditor-wrap>
</template>

<script>
import VueUeditorWrap from "vue-ueditor-wrap";
import UEDITOR_CONFIG from "./editorConfig";
import Vue from "vue";
import { mapMutations, mapState } from "vuex";
import common from "./editorCommon";
export default {
  data() {
    return {
      UEDITOR_CONFIG: this.UEDITOR_CONFIG,
      material_nodes: [], // 素材的所有节点
      material: null, // 目标素材的最高级容器 就是单个素材的区域
      attributes: {}, // 点击元素的所有支持修改的属性
      selectStyleTarget: null, // 设置成选中区域的目标。 如果是图片则图片设置选中，否则根节点设置选中，获取属性时也会用这个
      msg:
        '<h2><img src="http://img.baidu.com/hi/jx2/j_0003.gif"/>Vue2.x + UEditor + v-model双向绑定</h2>'
    };
  },
  methods: {
    ...mapMutations("toolBarData", ["SET_TOOL_BAR"]),
    ready(editorInstance) {
      // 将实例绑定在this上
      Vue.prototype.ue = editorInstance;
      $("#edui1_iframeholder").height($(window).height() * 1 - 200);
      // 消除百度编辑器默认事件，使用自定义事件
      this.editorClikEvent();
    },
    editorClikEvent() {
      const self = this;
      $(this.ue.body).delegate(".KolEditor", "click", function(event) {
        event = event || window.event;
        const target = event.target || event.srcElement;
        Vue.prototype.$material = $(this);
        Vue.prototype.$currTarget = target;
        // 阻止百度编辑器默认事件
        if (event.stopPropagation) {
          event.stopPropagation();
        } else {
          event.cancelBubble = true;
        }
        self.toolBarInit(this);
      });
    },
    toolBarInit(target) {
      this.material = $(target);
      // 查找当前节点所有子节点
      this.computedMaterial_nodes();

      // 判断点击素材的类型
      this.setClickType();

      // 获取点击元素的属性
      // this.getToolBarData();

      // 设置选区
      this.setSelected4editor(target);
    },
    setSelected4editor() {
      // 只把自己的状态设置为选中
      $(this.ue.body)
        .find(".checkSelected")
        .removeClass("checkSelected");
      $(this.selectStyleTarget).addClass("checkSelected");
    },
    computedMaterial_nodes() {
      let self = this;
      this.material_nodes.push(this.material.get(0));
      done(this.material.get(0));
      function done(node) {
        if (node.children.length != 0) {
          var childrenNodes = node.children;
          for (var index = 0; index < childrenNodes.length; index++) {
            if (childrenNodes[index].className === "KolEditor-select") {
              continue;
            }
            self.material_nodes.push(childrenNodes[index]);
            done(childrenNodes[index]);
          }
        }
      }
    },
    setClickType() {
      // 判断点击素材的类型
      if (this.$currTarget.tagName.toLowerCase() === "img") {
        this.selectStyleTarget = this.$currTarget;
        // 只包含图片
        // 获取点击元素的属性
        this.getToolBarData('img');
        this.SET_TOOL_BAR({
          toolBarType: "img",
          cssRulers: this.attributes
        });
      } else {
        // 包含文字
        // 获取点击元素的属性
        this.getToolBarData('text');
        for (var i = 0; i < this.material_nodes.length; i++) {
          var nodeType = this.material_nodes[i].childNodes[0]
            ? this.material_nodes[i].childNodes[0].nodeType
            : -1;
          if (nodeType == 3) {
            this.selectStyleTarget = this.$material;
            // 如果有文本节点, 则跳出循环, 加载文字工具条
            this.SET_TOOL_BAR({
              toolBarType: "text",
              cssRulers: this.attributes
            });
            break;
          }
        }
      }
    },
    getToolBarData(type) {
      const eventSelection =
        type == "text"
          ? this.ue.selection.getStart()
          : this.selectStyleTarget;
      const transforms = !!eventSelection.style.transform
        ? eventSelection.style.transform.split(" ")
        : [];
      const filters = !!eventSelection.style.filter
        ? eventSelection.style.filter.split(" ")
        : [];
      const text = eventSelection.innerHTML;
      const fontSize = parseFloat(
        common.getCurryStyle(eventSelection).fontSize
      );
      const color = common.getCurryStyle(eventSelection).color;
      const backgroundColor =
        common.getCurryStyle(eventSelection).backgroundColor ==
        "rgba(0, 0, 0, 0)"
          ? "#fff"
          : common.getCurryStyle(eventSelection).backgroundColor;
      const textAlign = common.getCurryStyle(eventSelection).textAlign;
      const fontStyle = common.getCurryStyle(eventSelection).fontStyle;
      const fontWeight = common.getCurryStyle(eventSelection).fontWeight;
      const opacity =
        Number(common.getCurryStyle(eventSelection).opacity) * 100;
      // transform
      let translateX = 0;
      let translateY = 0;
      let rotate = 0;
      let scale = 1;
      // let scaleY = 0;
      let skewX = 0;
      let skewY = 0;
      // filter
      let grayscale = 0;
      let sepia = 0;
      let saturate = 1;
      let hueRotate = 0;
      let invert = 0;
      let brightness = 1;
      let contrast = 1;
      let blur = 0;
      if (transforms.length > 0) {
        transforms.forEach(element => {
          let value = parseFloat(element.split("(")[1]);
          if (element.includes("translateX")) translateX = value;
          if (element.includes("translateY")) translateY = value;
          if (element.includes("rotate")) rotate = value;
          if (element.includes("scale")) scale = value;
          // // if (element.includes("scaleY")) scaleY = value;
          if (element.includes("skewX")) skewX = value;
          if (element.includes("skewY")) skewY = value;
        });
      }
      if (filters.length > 0) {
        filters.forEach(element => {
          let value = parseFloat(element.split("(")[1]);
          if (element.includes("grayscale")) grayscale = value;
          if (element.includes("sepia")) sepia = value;
          if (element.includes("saturate")) saturate = value;
          if (element.includes("hueRotate")) hueRotate = value;
          if (element.includes("invert")) invert = value;
          if (element.includes("brightness")) brightness = value;
          if (element.includes("blur")) blur = value;
        });
      }
      const textDecoration =
        common.getCurryStyle(eventSelection).textDecoration == "none"
          ? $(eventSelection)
              .parents("span:first")
              .css("text-decoration")
          : common.getCurryStyle(eventSelection).textDecoration;
      // const lineHeight = common.getCurryStyle(eventSelection).lineHeight;
      const letterSpacing =
        common.getCurryStyle(eventSelection).letterSpacing == "normal"
          ? 0
          : common.getCurryStyle(eventSelection).letterSpacing;
      const lineHeight = common.getCurryStyle(eventSelection).lineHeight;

      this.attributes = {
        text,
        fontSize,
        color,
        backgroundColor,
        textAlign,
        fontStyle,
        fontWeight,
        textDecoration,
        lineHeight,
        opacity,
        translateX,
        translateY,
        rotate,
        scale,
        // scaleY,
        skewX,
        skewY,
        grayscale,
        sepia,
        saturate,
        hueRotate,
        invert,
        brightness,
        blur,
        letterSpacing
      };
    }
  },
  components: {
    VueUeditorWrap
  },
  props: {},
  computed: {
    ...mapState("toolBarData", ["toolBarType"])
  }
};
</script>
