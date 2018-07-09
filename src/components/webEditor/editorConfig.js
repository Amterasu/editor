export const UEDITOR_CONFIG = {
  // UEDITOR_HOME_URL: e,
  serverUrl: '/javascript/lib/ueditor/php/controller.php',
  toolbars: [
      ["undo", "redo", "|", "fontsize", "blockquote", "|", "removeformat", "formatmatch", "|", "link", "emotion", "spechars", "superscript", "subscript", "|", "PastePlain", "directionalityltr", "directionalityrtl", "|", 'touppercase', 'tolowercase', ],
      ["bold", "italic", "underline", "forecolor", "shadowcolor", "backcolor", "|", "indent", "lineheight", 'letterspacing', 'outpadding', "rowspacingtop", "rowspacingbottom", "|", "justifyleft", "justifycenter", "justifyright", "justifyjustify", ],
      ["insertorderedlist", "insertunorderedlist", "|", "autotypeset", "insertvideo", "music", 'background', 'insertimage', "horizontal", "searchreplace", "|", "source", ]
  ],

  zIndex: 0,
  charset: "utf-8",
  textarea: "content",
  initialStyle: "",
  autoClearEmptyNode: !1,
  enableAutoSave: !1,
  saveInterval: 5e6,
  imagePopup: !0,
  emotionLocalization: !0,
  insertorderedlist: {
      decimal: "",
      "lower-alpha": "",
      "lower-roman": "",
      "upper-alpha": "",
      "upper-roman": "",
      "cjk-ideographic": "一、二、三、",
      "lower-greek": "α,β,γ,δ"
  },
  insertunorderedlist: {
      circle: "",
      disc: "",
      square: ""
  },
  listDefaultPaddingLeft: "30",
  maxListLevel: -1,
  autoTransWordToList: !0,
  fontfamily: [{
      label: "",
      name: "yahei",
      val: "微软雅黑"
  }, {
      label: "",
      name: "songti",
      val: "宋体,SimSun"
  }, {
      label: "",
      name: "kaiti",
      val: "楷体,楷体_GB2312,SimKai"
  }, {
      label: "",
      name: "heiti",
      val: "黑体,SimHei"
  }, {
      label: "",
      name: "lishu",
      val: "隶书,SimLi"
  }, {
      label: "",
      name: "arial",
      val: "arial,helvetica,sans-serif"
  }],
  fontsize: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 24, 28, 32, 36],
  letterspacing: [0, 0.5, 1, 1.5, 2, 3, 4, 5],
  enableContextMenu: !0,
  elementPathEnabled: !1,
  wordCount: !1,
  removeFormatTags: "a,b,big,code,del,dfn,em,font,i,section,blockquote,pre,fieldset,ins,kbd,q,samp,small,span,label,strike,strong,sub,sup,tt,u,var",
  removeFormatAttributes: "class,style,lang,width,accuse,height,align,hspace,valign,data-width,data-brushtype,opacity,border,title,placeholder",
  maxUndoCount: 50,
  autoHeightEnabled: !1,
  scaleEnabled: !1,
  imageScaleEnabled: !1,
  autoFloatEnabled: !1,
  autotypeset: {
      mergeEmptyline: !0,
      removeClass: !1,
      removeEmptyline: !1,
      textAlign: !1,
      imageBlockLine: !1,
      pasteFilter: !1,
      clearFontSize: !1,
      clearFontFamily: !1,
      removeEmptyNode: !1,
      indent: !1,
      indentValue: "2em",
      bdc2sb: !1,
      tobdc: !1
  },
  sourceEditor: "codemirror",
  catchRemoteImageEnable: true
}