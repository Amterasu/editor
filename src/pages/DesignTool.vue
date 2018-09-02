<template>
  <div>
    <div id="tools" class="box jq_dd_div window ui-draggable window_act">
      <div class="hd">
        <i class="iconFold" title="缩小还原" @click="toolShow = !toolShow" :class="{folded:!toolShow}"></i>
        <span class="name">工具集</span>
      </div>
      <div class="bd list" v-show="toolShow">
        <el-tooltip class="item" effect="dark" content="清空内容" placement="right">
          <p @click="showClearConfirm = true">
            <i class="iconfont icon-qingkongshanchu"></i>清空内容
          </p>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="复制全文" placement="right">
          <p @click="copyAllArea">
            <i class="iconfont icon-fuzhi"></i>复制全文
          </p>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="生成长图" placement="right">
          <p @click="createContentImg">
            <i class="iconfont icon-tupian"></i>生成长图
          </p>
        </el-tooltip>

        <el-tooltip class="item" effect="dark" content="上传图片" placement="right">
          <p @click="copyAllArea">
            <i class="iconfont icon-icon-"></i>上传图片
          </p>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="导入文章" placement="right">
          <p @click="copyAllArea">
            <i class="iconfont icon-daoru"></i>导入文章
          </p>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="保存模板" placement="right">
          <p @click="copyAllArea">
            <i class="iconfont icon-baocun"></i>保存模板
          </p>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="预览" placement="right">
          <p @click="preview">
            <i class="iconfont icon-yulan"></i>预览
          </p>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="二维码" placement="right">
          <p @click="showQrcode">
            <i class="iconfont icon-saoma"></i>二维码
          </p>
        </el-tooltip>
        <el-tooltip class="item" effect="dark" content="发布" placement="right">
          <p @click="publish4Article">
            <i class="iconfont icon-fabu"></i>发布
          </p>
        </el-tooltip>
      </div>
    </div>
    <am-confirm :show.sync="showClearConfirm" v-model="ClearConfirmText" @ensure="clearAllArea" type="warning" />
    <am-alert :show.sync="showAlert" v-model="alertText" @ensure="hideAlert" type="error" />
    <am-alert :show.sync="showAlertCopy" v-model="alertTextCopy" type="error" />
    <login-dialog :show.sync="showLoginDialog" />
    <am-publish :show.sync="showPublishPage" />
    <am-preview :show.sync="showPreview" />
    <am-qrcode-dialog :show.sync="qrcodeDia" v-model="qrcodeImg" @close="hideQrcodeDia" />
  </div>

</template>

<script>
import amConfirm from "../components/BaseConfirm";
import amAlert from "../components/BaseAlert";
import html2canvas from "html2canvas";
import parseHtml from "../components/PhonePreivewParseHtml";
import LoginDialog from "../components/LoginDialog";
import amQrcodeDialog from "../components/BaseQrcodeDialog";
import amPublish from "../components/PublishArticle";
import amPreview from "../components/PhonePreview";
export default {
  data() {
    return {
      // 工具箱
      toolShow: true,
      showClearConfirm: false,
      ClearConfirmText: "确认清空内容吗",
      showAlert: false,
      alertText: "",
      showAlertCopy: false,
      alertTextCopy: "请先选中编辑器中的一个元素",
      showLoginDialog: false,
      qrcodeDia: false,
      qrcodeImg: "",
      showPublishPage: false,
      showPreview: false
    };
  },
  methods: {
    hideAlert() {},
    clearAllArea() {
      this.ue.setContent("<p></p>");
    },
    copyAllArea() {
      const self = this;
      if (!this.$material) this.showAlertCopy = true;
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
    createContentImg() {
      let parseEditorHtml = new parseHtml(true, this.ue);
      let content = parseEditorHtml.getEditorHtml(true);
      // var TargetNode = $("#material-container")
      var cloneDom = $(content);
      cloneDom.css({
        position: "absolute",
        top: "0px",
        "z-index": "-1",
        height: "auto",
        width: "500px"
      });
      $("body").css({ overflow: "auto" });
      //将克隆节点动态追加到body后面。
      $("body").append(cloneDom);
      html2canvas(cloneDom[0], {
        useCORS: true,
        logging: false
      }).then(canvas => {
        var imgUri = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream"); // 获取生成的图片的url
        window.location.href = imgUri;
        cloneDom.remove();
        $("body").css({ overflow: "hidden" });
      });
    },
    loginShow() {
      this.showLoginDialog = true;
    },
    showQrcode() {
      this.qrcodeDia = true;
    },
    hideQrcodeDia() {
      // 隐藏了二维码弹框
    },
    publish4Article() {
      this.showPublishPage = true;
    },
    preview() {
      this.showPreview = true;
    }
  },
  components: {
    amConfirm,
    amAlert,
    LoginDialog,
    amQrcodeDialog,
    amPublish,
    amPreview
  }
};
</script>

<style  lang="scss">
@import "../style/toolbar";
@import "../style/toolbarfont";
// 工具箱
#tools {
  position: fixed;
  top: 52px;
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
