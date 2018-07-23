<template>
  <div id="PropertyView" style="right: 0;">
    <h1 id="PropertyViewHeader" class="f--hlc" style="cursor:default">
      <div class="property-header f--hlc">
        <div class="header-name">文本</div>
        <div>的属性</div>
      </div>
      <button class="btn btn-clear" title="收起" @click="foldMenu" :class='{folded:foldMenuStatus}'></button>
    </h1>
    <div class="" id="PropertyViewBody" style="max-height: calc(100% - 30px); overflow-y: scroll;" v-show="!foldMenuStatus">
      <div class="property-fields">
        <form class="ant-form ant-form-horizontal form_basic">
          <am-tool-textarea v-model="cssRulersData.text" label="选区代码" @changeTextarea="changeTextArea" />
        </form>
        <form class="ant-form ant-form-horizontal form_position">
          <!-- <am-input v-model="cssRulersData.translateY" label="字号" icon='px' :full="false" /> -->
          <!-- <am-input v-model="cssRulersData.opacity" label="字号" icon='px' showSlider/> -->
          <am-input v-model="cssRulersData.fontSize" label="字号" icon='px' @change="changeFont" min="12" />
          <am-input v-model="cssRulersData.lineHeight" label="行间距" icon='rate' @change="changeLineheight" min="0" />
          <am-input v-model="cssRulersData.letterSpacing" label="字间距" icon='px' @change="changeLetterSpacing" min="0" />
          <am-color-picker :switch='colorSwitch' v-model="cssRulersData.color" label="文字颜色" @changeStauts="changeFontColor" />
          <am-color-picker :switch='bgSwitch' label="背景颜色" v-model="cssRulersData.backgroundColor" @changeStauts="changeBgColor" />
          <div class="f--hlc ant-row ant-form-item ant-form-half text-align-block text-style-block-long" style="margin-bottom:12px;">
            <div class="ant-col-l ant-form-item-label">
              <label>
                文本对齐
              </label>
            </div>
            <div class="ant-col-r">
              <div class="ant-form-item-control">
                <div class="switchMore switchMore-rect">
                  <ul class="switchMore-ul">
                    <li class="switchMore-ul-mid" @click="changeTextCur('left')" :class="{cur: textCur == 'left' || textCur == 'start'}">
                      <div class="textAlign textAlign-left"></div>
                    </li>
                    <li class="switchMore-ul-on" @click="changeTextCur('center')" :class="{cur: textCur == 'center'}">
                      <div class="textAlign textAlign-center"></div>
                    </li>
                    <li class="switchMore-ul-off" @click="changeTextCur('right')" :class="{cur: textCur == 'right' || textCur == 'end'}">
                      <div class="textAlign textAlign-right"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="f--hlc ant-row ant-form-item ant-form-half text-align-block text-style-block-long">
            <div class="ant-col-l ant-form-item-label">
              <label>
                文本修饰
              </label>
            </div>
            <div class="ant-col-r">
              <div class="ant-form-item-control">
                <div class="switchMore switchMore-rect">
                  <ul class="switchMore-ul">
                    <li class="switchMore-ul-mid " @click="changeDesCur('underline')" :class="{cur: desCur == 'underline'}">
                      <div class="textDesoration textDesoration-underline"></div>
                    </li>
                    <li class="switchMore-ul-on" @click="changeDesCur('italic')" :class="{cur: styleCur == 'italic'}">
                      <div class="textDesoration textDesoration-italic"></div>
                    </li>
                    <li class="switchMore-ul-off" @click="changeDesCur('bold')" :class="{cur: weightCur == 'bold'}">
                      <div class="textDesoration textDesoration-bold"></div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <!-- <am-input v-model="cssRulersData.translateY" label="Y" icon='px' :full="false" /> -->
          <!-- <am-input v-model="cssRulersData.translateY" label="W" icon='px' :full="false" /> -->
          <!-- <am-input v-model="cssRulersData.translateY" icon='px' :full="false">
            <template slot="label">
              <div class="ant-lock ant-lock-checked">
              </div>
              H
            </template>
          </am-input>
          <am-input v-model="cssRulersData.translateY" :full="false">
            <template slot="label">
              <div class="originPos"></div>
            </template>
          </am-input> -->

        </form>
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
          <button type="button" class="ant-btn ant-btn-primary" style="margin-bottom:10px;" @click="clearStyle">
            <span>清除格式</span>
            <span> </span>
          </button>
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
    lockChecck() {},
    changeTextArea() {
      console.log("耶！还实现不了");
    },
    changeDesCur(cur) {
      if (this.desCur == cur && cur == "underline") {
        this.desCur = "normal";
        this.changeFontDescoration();
      } else if (this.desCur !== cur && cur == "underline") {
        this.desCur = "underline";
        this.changeFontDescoration();
      }
      if (this.styleCur == cur && cur == "italic") {
        this.styleCur = "normal";
        this.changeFontStyle();
      } else if (this.styleCur !== cur && cur == "italic") {
        this.styleCur = "italic";
        this.changeFontStyle();
      }
      if (this.weightCur == cur && cur == "bold") {
        this.weightCur = "normal";
        this.changeFontBold();
      } else if (this.weightCur !== cur && cur == "bold") {
        this.weightCur = "bold";
        this.changeFontBold();
      }
    },
    changeTextCur(cur) {
      if (this.textCur == cur) this.textCur = "left";
      else this.textCur = cur;
      this.changeTextAlign(cur);
    },
    changeToolBarDta() {},
    changeDomCssRulers(cmd, params) {
      // cmd 要执行的命令
      // params 执行参数， 具体参数参照ueditor官方文档
      this.ue.execCommand(cmd, params);
    },
    changeFont(newVal) {
      this.changeDomCssRulers("fontsize", newVal + "px");
    },
    changeFontColor(status, newColor) {
      if (status == false) this.changeDomCssRulers("forecolor", "#000");
      else this.changeDomCssRulers("forecolor", newColor);
      this.colorSwitch = status;
    },
    changeBgColor(status, newBgColor) {
      if (status == false) this.changeDomCssRulers("backcolor", "#fff");
      else this.changeDomCssRulers("backcolor", newBgColor);
      this.bgSwitch = status;
    },
    changeLetterSpacing(newVal) {
      $(this.ue.selection.getStart()).css({
        "letter-spacing": newVal
      });
    },
    changeLineheight(newVal) {
      $(this.ue.selection.getStart()).css({
        "line-height": newVal / 100
      });
    },
    changeFontDescoration() {
      this.changeDomCssRulers("underline");
    },
    changeFontStyle() {
      this.changeDomCssRulers("italic");
    },
    changeFontBold() {
      this.changeDomCssRulers("bold");
    },
    changeTextAlign(cur) {
      this.changeDomCssRulers("justify", cur);
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
      $(this.ue.selection.getStart()).css({
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
      $(this.ue.selection.getStart()).css({
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
