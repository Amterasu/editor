<template>
  <div id="PropertyView" style="right: 0;" :style="foldMenuStatus?'background:#efefef':''">
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
          <am-tool-textarea v-model="cssRulersData.text" label="选区代码" @changeTextarea="changeText" />
        </form>
        <form class="ant-form ant-form-horizontal form_position">
          <am-input v-model="cssRulersData.translateY" label="X" icon='px' :full="false" />
          <am-input v-model="cssRulersData.translateY" label="Y" icon='px' :full="false" />
          <am-input v-model="cssRulersData.translateY" label="W" icon='px' :full="false" />
          <am-input v-model="cssRulersData.translateY" icon='px' :full="false">
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
          </am-input>
          <am-input v-model="cssRulersData.translateY" :full="false" icon='degree'>
            <template slot="label">
              <div class="rotation"></div>
            </template>
          </am-input>
        </form>
        <form class="ant-form ant-form-horizontal form_display">
          <am-input v-model="cssRulersData.opacity" label="不透明度" icon='rate' showSlider/>
          <am-color-picker label="背景颜色" v-model="cssRulersData.backgroundColor" @changeStauts="changeColor" />
          <am-input v-model="cssRulersData.rotate" label="X轴旋转" icon='px' :full="false" />
          <am-input v-model="cssRulersData.rotate" label="Y轴旋转" icon='px' :full="false" />
        </form>
        <form class="ant-form ant-form-horizontal form_display2">
          <am-input v-model="cssRulersData.blur" label="模糊" icon='px' />
          <am-input v-model="cssRulersData.translateY" label="阴影偏X" icon='px' :full="false" />
          <am-input v-model="cssRulersData.translateY" label="阴影偏Y" icon='px' :full="false" />
          <am-input v-model="cssRulersData.translateY" label="阴影模糊" icon='px' />
          <am-color-picker v-model="cssRulersData.color" label="文字颜色" @changeStauts="changeColor" />
          <am-input v-model="cssRulersData.translateY" label="灰度" icon='rate' showSlider/>
          <am-input v-model="cssRulersData.translateY" label="亮度" icon='rate' showSlider/>
          <am-input v-model="cssRulersData.translateY" label="对比度" icon='rate' showSlider/>
          <am-input v-model="cssRulersData.translateY" label="反色" icon='rate' showSlider/>
          <am-input v-model="cssRulersData.translateY" label="饱和度" icon='rate' showSlider/>
          <am-input v-model="cssRulersData.translateY" label="褐色化" icon='rate' showSlider/>
          <am-input v-model="cssRulersData.translateY" label="色相旋转" icon='degree' showSlider/>
          <am-switch-input v-model="change1" label="图片可换" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import amInput from "../components/BaseToolInput";
import amColorPicker from "../components/BaseColorPicker";
import amSwitchInput from "../components/BaseSwitchInput";
import amToolTextarea from "../components/BaseToolTextarea";

export default {
  data() {
    return {
      foldMenuStatus: false,
      value1: 20,
      value2: true,
      color4: "#fff",
      change1: true,
      cssRulersData: {},
    };
  },
  props: {
    cssRulers: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  watch: {
    cssRulers(newVal) {
      this.cssRulersData  =  Object.assign({}, this.cssRulersData, newVal)
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
    changeText() {}
  },
  components: {
    amInput,
    amColorPicker,
    amSwitchInput,
    amToolTextarea
  }
};
</script>

<style  lang="scss" scoped>
</style>
