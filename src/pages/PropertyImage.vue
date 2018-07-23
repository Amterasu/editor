<template>
  <div id="PropertyView" style="right: 0;">
    <h1 id="PropertyViewHeader" class="f--hlc" style="cursor:default">
      <div class="property-header f--hlc">
        <div class="header-name">图片</div>
        <div>的属性</div>
      </div>
      <button class="btn btn-clear" title="收起" @click="foldMenu" :class='{folded:foldMenuStatus}'></button>
    </h1>
    <div class="" id="PropertyViewBody" style="max-height: calc(100% - 30px); overflow-y: scroll;" v-show="!foldMenuStatus">
      <div class="property-fields">
        <form class="ant-form ant-form-horizontal form_display">
          <am-input @change='changeTranslateX' v-model="cssRulersData.translateX" label="X轴位移" icon='px' :full="false" min=-9999 />
          <am-input @change='changeTranslateY' v-model="cssRulersData.translateY" label="Y轴位移" icon='px' :full="false" min=-9999 />
          <am-input @change='changeRotate' v-model="cssRulersData.rotate" icon='degree' :full="false" min=-360>
            <template slot="label">
              <div class="rotation" title="旋转"></div>
            </template>
          </am-input>
          <am-input @change='changeScale' v-model="cssRulersData.scale" label="缩放" icon='rate' :full="false" />
          <am-input @change='changeSkewX' v-model="cssRulersData.skewX" label="X轴倾斜" icon='degree' min=-360 :full="false" />
          <am-input @change='changeskewY' v-model="cssRulersData.skewY" label="Y轴倾斜" icon='degree' min=-360 :full="false" />

        </form>
        <form class="ant-form ant-form-horizontal form_display2">
          <am-input @change='changeBlur' v-model="cssRulersData.blur" label="模糊" icon='px' />
          <am-input @change='changeOpacity' v-model="cssRulersData.opacity" label="不透明度" icon='rate' showSlider min=0 max=100 />
          <am-input @change='changeGrayscale' v-model="cssRulersData.grayscale" label="灰度" icon='rate' showSlider min=0 max=100 />
          <am-input @change='changeBrightness' v-model="cssRulersData.brightness" label="亮度" icon='rate' showSlider min=0 max=100 />
          <am-input @change='changeInvert' v-model="cssRulersData.invert" label="反色" icon='rate' showSlider min=0 max=100 />
          <am-input @change='changeSaturate' v-model="cssRulersData.saturate" label="饱和度" icon='rate' showSlider min=0 max=100 />
          <am-input @change='changeSepia' v-model="cssRulersData.sepia" label="褐色化" icon='rate' showSlider min=0 max=100 />
          <am-input @change='changeHueRoutate' v-model="cssRulersData.hueRotate" label="色相旋转" icon='degree' max=360 showSlider min=0 />
          <!-- <am-switch-input v-model="change1" label="图片可换" /> -->
        </form>
        <form class="ant-form ant-form-horizontal form_display2" style="padding-bottom:20px;">

          <button type="button" class="ant-btn ant-btn-primary" style="margin-bottom:10px;" @click="beforeRow">
            <span>前插空行</span>
            <span> </span>
          </button>
          <button type="button" class="ant-btn ant-btn-primary" style="margin-bottom:10px;" @click="afterRow">
            <span>后插空行</span>
            <span> </span>
          </button>
          <!-- <button type="button" class="ant-btn ant-btn-primary" style="margin-bottom:10px;" @click="clearStyle">
            <span>清除格式</span>
            <span> </span>
          </button> -->
          <button type="button" class="ant-btn ant-btn-primary" style="margin-bottom:10px;" @click="selectArea">
            <span>选中</span>
            <span> </span>
          </button>
          <button type="button" class="ant-btn ant-btn-primary" style="margin-bottom:10px;" @click="copyArea" id="copyPart">
            <span>复制</span>
            <span> </span>
          </button>
          <button type="button" class="ant-btn ant-btn-primary" style="margin-bottom:10px;" @click="deleteArea">
            <span>删除</span>
            <span> </span>
          </button>
        </form>

      </div>
    </div>
    <am-alert :show.sync="showAlert" v-model="alertText" @ensure="hideAlert" type="error" />
  </div>
</template>

<script>
import amInput from "../components/BaseToolInput";
import amColorPicker from "../components/BaseColorPicker";
import amSwitchInput from "../components/BaseSwitchInput";
import amToolTextarea from "../components/BaseToolTextarea";
import amAlert from "../components/BaseAlert";
import amConfirm from "../components/BaseConfirm";

export default {
  data() {
    return {
      foldMenuStatus: false,
      cssRulersData: {},
      textCur: "left",
      desCur: "normal",
      styleCur: "normal",
      weightCur: "normal",
      colorSwitch: true,
      bgSwitch: true,
      showAlert: false,
      alertText: "",

    };
  },
  props: {
    cssRulers: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  watch: {
    cssRulers(newVal) {
      this.cssRulersData = Object.assign({}, this.cssRulersData, newVal);
      this.textCur = this.cssRulersData.textAlign;
      this.desCur = this.cssRulersData.textDecoration.split(" ")[0];
      this.styleCur = this.cssRulersData.fontStyle;
      this.weightCur =
        this.cssRulersData.fontWeight == "bold" ||
        this.cssRulersData.fontWeight > 400
          ? "bold"
          : "normal";
      this.colorSwitch = true;
      this.bgSwitch = true;
      this.cssRulersData.scale = this.cssRulersData.scale * 100;
      this.cssRulersData.opacity = this.cssRulersData.opacity * 100;
      this.cssRulersData.grayscale = this.cssRulersData.grayscale * 100;
      this.cssRulersData.invert = this.cssRulersData.invert * 100;
      this.cssRulersData.saturate = this.cssRulersData.saturate * 100;
      this.cssRulersData.sepia = this.cssRulersData.sepia * 100;
      this.cssRulersData.brightness = this.cssRulersData.brightness * 100;
      this.cssRulersData.lineHeight = 160;
    }
  },
  methods: {
    changeColor(switchStatus, color) {
      console.log(switchStatus, color);
    },
    foldMenu() {
      this.foldMenuStatus = !this.foldMenuStatus;
    },
    changeTextArea() {
      console.log("耶！还实现不了");
    },
    changeDomCssRulers(cmd, params) {
      // cmd 要执行的命令
      // params 执行参数， 具体参数参照ueditor官方文档
      this.ue.execCommand(cmd, params);
    },
    changeTranslateX(newVal) {
      this.cssRulersData.translateX = newVal;
      this.changeTransform();
    },
    changeTranslateY(newVal) {
      this.cssRulersData.translateY = newVal;
      this.changeTransform();
    },
    changeScale(newVal) {
      this.cssRulersData.scale = newVal;
      this.changeTransform();
    },
    changeRotate(newVal) {
      this.cssRulersData.rotate = newVal;
      this.changeTransform();
    },
    changeSkewX(newVal) {
      this.cssRulersData.skewX = newVal;
      this.changeTransform();
    },
    changeskewY(newVal) {
      this.cssRulersData.skewY = newVal;
      this.changeTransform();
    },
    changeTransform() {
      $(this.$currTarget).css({
        transform: `translateX(${this.cssRulersData.translateX}px) translateY(${
          this.cssRulersData.translateY
        }px) scale(${this.cssRulersData.scale / 100}) rotate(${
          this.cssRulersData.rotate
        }deg) skewX(${this.cssRulersData.skewX}deg) skewY(${
          this.cssRulersData.skewY
        }deg)`
      });
    },
    changeBlur(newVal) {
      this.cssRulersData.blur = newVal;
      this.changeFilter();
    },
    changeOpacity(newVal) {
      this.cssRulersData.opacity = newVal;
      this.changeFilter();
    },
    changeGrayscale(newVal) {
      this.cssRulersData.grayscale = newVal;
      this.changeFilter();
    },
    changeBrightness(newVal) {
      this.cssRulersData.brightness = newVal;
      this.changeFilter();
    },
    changeInvert(newVal) {
      this.cssRulersData.invert = newVal;
      this.changeFilter();
    },
    changeSaturate(newVal) {
      this.cssRulersData.saturate = newVal;
      this.changeFilter();
    },
    changeSepia(newVal) {
      this.cssRulersData.sepia = newVal;
      this.changeFilter();
    },
    changeHueRoutate(newVal) {
      this.cssRulersData.hueRotate = newVal;
      this.changeFilter();
    },
    changeFilter() {
      $(this.$currTarget).css({
        filter: `blur(${this.cssRulersData.blur}px) opacity(${this.cssRulersData
          .opacity / 100}) grayscale(${this.cssRulersData.grayscale /
          100}) brightness(${this.cssRulersData.brightness / 100}) invert(${this
          .cssRulersData.invert / 100}) saturate(${this.cssRulersData.saturate /
          100}) sepia(${this.cssRulersData.sepia / 100}) hue-rotate(${this
          .cssRulersData.hueRotate}deg)`
      });
    },
    beforeRow() {
      if (this.$material[0].tagName.toLowerCase() == "img") {
        this.$material.parent("section").before("<p><br/></p>");
      } else {
        this.$material.before("<p><br/></p>");
      }
    },
    afterRow() {
      if (this.$material[0].tagName.toLowerCase() == "img") {
        this.$material.parent("section").after("<p><br/></p>");
      } else {
        this.$material.after("<p><br/></p>");
      }
    },
    clearStyle() {
      const text = this.$material.text();
      this.$material.empty();
      this.$material.html(text);
    },
    selectArea() {
      this.ue.selection
        .getRange()
        .selectNode(this.$material.get(0))
        .select();
    },
    deleteArea() {
      this.$material
        .parents(".KolEditor")
        .find(".checkSelected")
        .removeClass("checkSelected");
      this.$material.find(".checkSelected").removeClass("checkSelected");
      this.ue.selection
        .getRange()
        .selectNode(this.$material.get(0))
        .deleteContents();
    },
    copyArea() {
      const self = this;
      this.ue.selection
        .getRange()
        .selectNode(this.$material.get(0))
        .select();
      ZeroClipboard.config({
        swfPath: "../../static/lib/zeroclipboard/dist/ZeroClipboard.swf",
        zIndex: 101
      });
      var client = new ZeroClipboard(document.getElementById("copyPart"));
      client.on("copy", function(event) {
        var pNode = $(this.ue.selection.document);
        var html = $.partwechat._init(this.ue, pNode, false);
        event.clipboardData.setData("text/html", html);
        self.showAlert = true;
        self.alertText = "复制成功";
      });
      client.on("error", function(event) {
        self.alertText =
          "复制出错！请检查是否安装flash或者选中后在编辑区用ctrl+c试试吧！";
        self.showAlert = true;
      });
    },
    hideAlert() {
      // ....
    },

  },
  components: {
    amInput,
    amColorPicker,
    amSwitchInput,
    amToolTextarea,
    amAlert,
    amConfirm
  }
};
</script>

<style  lang="scss" scoped>
</style>
