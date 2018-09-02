// 格式化百度编辑器内的代码为微信所需格式  JGQ 2018-8-20 11:50:31
import jQuery from 'jquery'
var ParseEditorHtml = function (outer, ue) {
  this.current_editor = ue;
}
ParseEditorHtml.prototype.strip_tags = function (input, allowed) {
  var _this = this;
  allowed = (((allowed || '') + '').toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');
  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
    commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
  return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
    return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
  });
}
ParseEditorHtml.prototype.clean_LKhelper = function () {
  var _this = this;

  var editor_document = _this.current_editor.selection.document;
  jQuery(editor_document).find('._editor').each(function () {
    jQuery(this).find('.tool-border').remove();
    jQuery(this).css({
      'border': '0 none',
      'padding': 0
    });
  });
  _this.current_editor.sync();
}

ParseEditorHtml.prototype.parseMmbizUrl = function (html) {
  var _this = this;

  html = html.replace(/https:\/mmbiz./g, '');
  html = html.replace(/https:\/\/mmbiz.qlogo.cn/g, '');
  return html;
}
ParseEditorHtml.prototype.setElementTransform = function (dom, transform) {
  var _this = this;

  if (transform == "none")
    return;
  var sty = jQuery(dom).attr('style');
  sty = sty.replace(/;\s*transform\s*:[A-Za-z0-9_%,.\-\(\)\s]*;/gim, ';');
  sty = sty.replace(/\s*\-[a-z]+\-transform\s*:[A-Za-z0-9_%,.\-\(\)\s]*;/gim, '');
  sty = sty + ';transform: ' + transform + ';-webkit-transform: ' + transform + ';-moz-transform: ' + transform + ';-ms-transform: ' + transform + ';-o-transform: ' + transform + ';';
  sty = sty.replace(';;', ';');
  jQuery(dom).attr('style', sty);
}
ParseEditorHtml.prototype.setElementFlex = function (dom, flex) {
  var _this = this;
  if (flex != "flex")
    return;
  var sty = jQuery(dom).attr('style');
  var str = "";
  $.each(sty.split(";"), function (a, b) {
    var larr1 = b.split(":")[1];
    var larr0 = b.split(":")[0];
    var lstr = "";
    if (b.split(":")[1]) {
      if (b.split(":")[1].trim() == "flex") {
        lstr = "display:-webkit-flex;display:-moz-flex;display:-ms-flex;display:-o-flex;";
        str += lstr;
      } else if (b.split(":")[0].trim() == "flex-direction" || b.split(":")[0].trim() == "flex-wrap" || b.split(":")[0].trim() == "flex-flow" || b.split(":")[0].trim() == "justify-content" || b.split(":")[0].trim() == "align-items" || b.split(":")[0].trim() == "align-content" || b.split(":")[0].trim() == "flex-grow" || b.split(":")[0].trim() == "flex-shrink" || b.split(":")[0].trim() == "flex-basis" || b.split(":")[0].trim() == "flex" || b.split(":")[0].trim() == "align-self") {
        lstr = "-webkit-" + larr0 + ":" + larr1 + ";-moz-" + larr0 + ":" + larr1 + ";-ms-" + larr0 + ":" + larr1 + ";-o-" + larr0 + ":" + larr1 + ";";
        str += lstr;
      } else if (b.split(":")[0].trim() == "background-image") {
        str += larr0 + ":" + larr1 + ":" + b.split(":")[2] + ";";
      } else {
        str += larr0 + ":" + larr1 + ";";
      }
    }
  });
  sty = str.replace(';;', ';');
  jQuery(dom).attr('style', sty);
}
ParseEditorHtml.prototype.parseLKEditorHtml = function (html, outer_falg) {
  var _this = this;

  html = _this.parseMmbizUrl(html);
  var htmlObj = jQuery('<div>' + html + ' </div>');
  htmlObj.find('*').each(function () {
    if (this.style.transform) {
      _this.setElementTransform(this, this.style.transform);
      return;
    }
    if (this.style.display == "flex") {
      _this.setElementFlex(this, this.style.display);
      return;
    }
    if (this.tagName == "SECTION") {
      var style = jQuery(this).attr('style');
      if (style) {
        style = style.toLowerCase();
        if (style.indexOf('box-sizing') >= 0) {
          return;
        } else if (style.indexOf('padding') >= 0 || style.indexOf('border') >= 0) {
          jQuery(this).css('box-sizing', 'border-box');
        }
      }
    } else if (this.tagName == "BR" || this.tagName == "TSPAN" || this.tagName == "TEXT" || this.tagName == "IMAGE") {
      return;
    } else if (this.tagName == "IMG" || this.tagName == "IFRAME" || this.tagName == "EMBED") {
      jQuery(this).css({
        'max-width': '100%',
        "height": "auto"
      });
      jQuery(this).attr('crossOrigin','anonymous')
      return;
    } else if (this.tagName == "STRONG" || this.tagName == "SPAN" || this.tagName == "B" || this.tagName == "EM" || this.tagName == "I") {
      return;
    } else if (this.tagName == "P") {
      return;
    } else if (this.tagName == "H1" || this.tagName == "H2" || this.tagName == "H3" || this.tagName == "H4" || this.tagName == "H5" || this.tagName == "H6") {
      jQuery(this).css('font-weight', 'bold');
      if (!this.style.fontSize) {
        jQuery(this).css({
          'font-size': '16px'
        });
      }
      if (!this.style.lineHeight) {
        jQuery(this).css({
          'lineHeight': '1.6em'
        });
      }
      return;
    } else if (this.tagName == "OL" || this.tagName == "UL" || this.tagName == "DL") {
      jQuery(this).css({
        'margin': '0px',
        'padding': '0 0 0 30px'
      });
      return;
    }
    if ((this.tagName == "TD" || this.tagName == "TH") && this.style.padding == "" && this.style.paddingLeft == "" && this.style.paddingRight == "" && this.style.paddingTop == "" && this.style.paddingBottom == "") {
      jQuery(this).css({
        'margin': '5px 10px'
      });
    }
  });
  var html = htmlObj.html();
  if (jQuery.trim(html) == "") {
    return "";
  }
  return html;
}
ParseEditorHtml.prototype.getEditorHtml = function (outer) {
  var _this = this;

  // var current_editor = _this.current_editor
  $(_this.current_editor.selection.document).find('p').each(function () {
    if ($.trim(_this.strip_tags($(this).html())) == "&nbsp;") {
      $(this).html('<br/>');
    } else if ($.trim(_this.strip_tags($(this).html())) == "") { //由于各种编辑操作可能使内容包含了多余的空段落标签，需要去除(不含图片，不含换行)。如“<p><span style="font-size: 12px; "></span></p>”
      //
      if ($(this).find('img,audio,iframe,mpvoice,video').length > 0) {
        return;
      }
      if ($(this).find('br').length > 0) {
        $(this).html('<br/>');
      }
      // else {
      //     if (!this.style.clear) {
      //         $(this).remove();
      //     }
      // }
    }
  });

  _this.clean_LKhelper();

  while ($(_this.current_editor.selection.document).find('.article').length > 1) {
    $(_this.current_editor.selection.document).find('.article').each(function (i) {
      if (i > 0) {
        if (this.style.backgroundColor && this.style.backgroundColor != "" || $(this).css('background-image') && $(this).css('background-image') != 'none') {
          $(this).removeAttr('class');
          $(this).removeAttr('label');
        } else {
          $(this).replaceWith($(this).html()); //文章中包含article的class标签通通去掉，只保留内部的内容。
        }
      }
    });
  }

  var html = '';
  if (_this.current_editor.getWxContent && !outer) {

    html = _this.current_editor.getWxContent();
  } else {
    html = _this.current_editor.getContent();
  }
  html = _this.parseLKEditorHtml(html);
  //return html;
  // 最外层增加一个节点，粘贴微信时，就不会生成多余的空格。 	
  //return $.trim(html);
  return '<section data-role="outer" label="Powered by 365editor" style="font-family:微软雅黑;font-size:16px;">' + $.trim(html) + '</section>';
}
export default ParseEditorHtml

