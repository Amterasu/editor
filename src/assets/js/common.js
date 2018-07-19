/**
 * 素材工具栏
 * @authors SX
 * @date    2017-04-05 10:24:28
 */
(function($) {

  function ToolsBar() {
      this.id = tools_fun().GetRandomNum(10000, 99999);
      this.ueditor = ""; // 百度编辑器对象
      this.material = ""; // 目标素材
      this.material_nodes = []; // 素材的所有节点

      this.toolsBar_wrapper_code = '<menu id="' + this.id + '" class="material-operation-tools"></menu>';
      this.$toolsBar_wrapper = ""; // 工具条jquery 对象
      this.toolsBar_code = '<div class="tools-bar"></div>';
  }

  // 初始化方法
  ToolsBar.prototype.init = function() {

      if (this.material.attr("data-tools-id") && $("#" + this.material.attr("data-tools-id")).size() > 0) {
          return false;
      }

      // 向页面部署初始化代码
      this.randerInitToolsBar();

      // 向页面部署通用素材工具条
      this.randerBaseToolsBar();

      // 判断素材类型, 根据类型不同加载不同的工具条
      this.randerSeniorToolsBar();

      // 调整工具条的位置
      this.setToolsPosition();

      //加载监听颜色字号等的事件
      this.enevtListener();

      // 加载一些特殊事件
      this.loadSpecialEvent();
  };

  // 工具条操作项
  ToolsBar.prototype.operationItems = function() {

      var that = this;
      // 拖动操作
      var _drop = function() {
          var code = '<li class="operation-item" data-tips="拖动" style="cursor:move;">' +
              '	<a style="cursor:move;" href="javascript:void(0)" title="拖动" data-act="drop"><i class="fa fa-arrows"></i></a>' +
              '</li>';

          // 拖拽功能
          that.$toolsBar_wrapper.delegate('[data-act="drop"]', 'mousedown', start);
          var obj = $('menu.material-operation-tools');

          function start(e) {
              var ol = obj.offset().left;
              var ot = obj.offset().top;
              deltaX = e.pageX - ol;
              deltaY = e.pageY - ot;
              $(document).bind({
                  'mousemove': move,
                  'mouseup': stop
              });
              return false;
          }

          function move(e) {
              var _left = (e.pageX - deltaX);
              var _top = (e.pageY - deltaY);
              if (_left < 0) {
                  _left = 0;
              } else if (_left > $(window).width() - obj.width()) {
                  _left = $(window).width() - obj.width();
              }
              if (_top < 50) {
                  _top = 50;
              } else if (_top > $(window).height() - obj.height()) {
                  _top = $(window).height() - obj.height();
              }
              obj.css({
                  "left": _left,
                  "top": _top
              });
              return false;
          }

          function stop() {
              localStorage.setItem("material_top", obj.position().top);
              localStorage.setItem("material_left", obj.position().left);
              $(document).unbind({
                  'mousemove': move,
                  'mouseup': stop
              });
          }
          return code;
      };
      // 删除操作
      var _del = function() {
          var code = '<li class="operation-item" data-tips="删除">' +
              '	<a href="javascript:void(0)" title="删除" data-act="del"><i class="fa fa-trash-o"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act="del"]', 'click', function(event) {
              that.material.parents(".KolEditor").find(".checkSelected").removeClass("checkSelected");
              that.material.find(".checkSelected").removeClass("checkSelected");
              that.$toolsBar_wrapper.remove();
              that.ueditor.selection.getRange().selectNode(that.material.get(0)).deleteContents();
          });
          return code;
      };

      // 复制操作
      var _copy = function() {
          var code = '<li class="operation-item"  data-tips="复制" id="partcopy">' +
              '	<a href="javascript:void(0)" title="复制" data-act="copypart" class="partcopy"><i class="fa fa-files-o"></i></a>' +
              '</li>';

          return code;
      };
      var _select = function() {
          var code = '<li class="operation-item" data-tips="选中">' +
              '<a href="javascript:void(0)" title="选中" data-act="select"><i class="fa fa-object-group" aria-hidden="true"></i></a>' +
              '</li>';
          that.$toolsBar_wrapper.delegate('[data-act="select"]', 'click', function(event) {
              that.ueditor.selection.getRange().selectNode(that.material.get(0)).select();
          });
          return code;
      }

      // 插入行操作
      var _insert_row = function() {
          var code = '<li class="operation-item" data-tips="插入空行">' +
              '	<a href="javascript:void(0)" data-act="before-row">前插空行</a>' +
              '	<a href="javascript:void(0)" data-act="choose-insert-row"><i class="fa fa-caret-down"></i></a>' +
              '	<menu class="choose-insert-row">' +
              '		<li data-act="before-row">前插空行</li>' +
              '		<li data-act="after-row">后插空行</li>' +
              '	</menu>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=choose-insert-row]', 'click', function(event) {
              if (that.$toolsBar_wrapper.find("menu[class=choose-insert-row]").is(":hidden")) {
                  that.$toolsBar_wrapper.find("menu[class=choose-insert-row]").show();
                  that.$toolsBar_wrapper.find("menu[class=set-style]").hide();
                  that.$toolsBar_wrapper.find("menu[class=set-all-color]").hide();
              } else {
                  that.$toolsBar_wrapper.find("menu[class=choose-insert-row]").hide();
                  return false;
              }

              that.$toolsBar_wrapper.find("menu[class=choose-insert-row]").find("li").click(function() {
                  $(this).parents(".operation-item").find("a").first().attr("data-act", $(this).data("act")).text($(this).text());
                  that.$toolsBar_wrapper.find("menu[class=choose-insert-row]").hide();
              });;
          });

          that.$toolsBar_wrapper.delegate('[data-act=before-row]', 'click', function(event) {
              if (that.material[0].tagName.toLowerCase() == "img") {
                  that.material.parent("section").before('<p><br/></p>');
              } else {
                  that.material.before('<p><br/></p>');
              }
          });

          that.$toolsBar_wrapper.delegate('[data-act=after-row]', 'click', function(event) {
              if (that.material[0].tagName.toLowerCase() == "img") {
                  that.material.parent("section").after('<p><br/></p>');
              } else {
                  that.material.after('<p><br/></p>');
              }
          });
          return code;
      };
      //转为图片操作
      var _change_img = function() {
          var code = '<li class="operation-item"  data-tips="转为图片">' +
              '	<a href="javascript:void(0)" title="转为图片" data-act="changeimg" class="changeimg">转为图片</a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=changeimg]', 'click', function(event) {
              that.$toolsBar_wrapper.find("menu").hide();
              if (!$.mytools.getCookie("UserId")) {
                  $.mytools.requireScript("login", "/login.js", function() {
                      login._init();
                  });
              } else {
                  if (!Number(topnavInfo.userInfo.IsVip)) { //vip长图判断当前是否是vip用户
                      vm.dialog.vipTips = true;
                      vm.vipMessage = '单个素材可转为图片';
                  } else {
                      var conditions = {};
                      conditions.content = that.material.html();
                      $.ajax({
                          url: '/api/phone/setpreview',
                          data: conditions,
                          async: false,
                          type: 'POST',
                          success: function(backData) {
                              if (backData.code == 'S') {
                                  var host = location.host;
                                  var protocol = location.protocol;
                                  var url = protocol + '//' + host + '/phone_preview?key=' + backData.msg;
                                  var condition = {};
                                  condition.url = url + '&width=465';
                                  that.material.addClass("executeIng");
                                  $.get('/meterial/pic', condition, function(backDate) {
                                      if (backDate.code == 'S') {
                                          that.material.empty().append("<section><img src='" + backDate.msg[0] + "'></section>");
                                          that.material.removeClass("executeIng");
                                      } else {
                                          that.material.removeClass("executeIng");
                                          layui.use('layer', function() {
                                              var layer = layui.layer;
                                              layer.msg(backDate.msg);
                                          });
                                      }
                                  })
                              } else {
                                  layui.use('layer', function() {
                                      var layer = layui.layer;
                                      layer.msg(backData.msg);
                                  });
                              }
                          }
                      })
                  }

              }
          });

          return code;
      };

      // 设置颜色操作
      var _set_color = function() {
          // 分析素材中的颜色, 并且组织代码
          var eventSelection = that.ueditor.selection.getStart();
          var color = getcurryStyle(eventSelection).color;
          var code = "";
          if (analyzeMaterialColor().codeNum > 5) {
              code = '<li class="operation-item"  data-tips="素材中的所有颜色"><div data-act="all-color" clas="showAllColor"><span style="display:inline-block;width:25px;height:25px;border:2px solid #fff;border-radius:50%;margin:5px;float:left;background-color:' + color + '"></span><i class="fa fa-ellipsis-h" style="font-size:18px;color:#fff;margin-top:12px;"></i></div>' +
                  '<menu class="set-all-color">' + analyzeMaterialColor().code + '</menu>' +
                  '</li>';
          } else {
              code = '<li class="operation-item"  data-tips="素材中的所有颜色">' + analyzeMaterialColor().code + '</li>';
          }

          // 分析素材中的颜色, 并且组织代码
          function analyzeMaterialColor() {
              var colors = []; // 颜色值

              that.material_nodes.push(that.material.get(0));
              done(that.material.get(0));

              function done(node) {
                  if (node.children.length != 0) {
                      var childrenNodes = node.children;
                      for (var index = 0; index < childrenNodes.length; index++) {
                          if (childrenNodes[index].className === "KolEditor-select") {
                              continue;
                          }
                          that.material_nodes.push(childrenNodes[index]);
                          done(childrenNodes[index]);
                      }
                  }
              }

              for (var i = 0; i < that.material_nodes.length; i++) {
                  var style_code = $(that.material_nodes[i]).attr("style") ? $(that.material_nodes[i]).attr("style").replace(/\s/g, "") : "";

                  var _styles = style_code.split(";");

                  for (var j = 0; j < _styles.length; j++) {
                      var _style_val = _styles[j].split(":");
                      if (_style_val[0] != "color") {
                          var _index_1 = _style_val[1] ? _style_val[1].indexOf("#") : -1,
                              // var _index_1 = -1,
                              _index_2 = _style_val[1] ? _style_val[1].indexOf("rgb") : -1,
                              _index_3 = _style_val[1] ? _style_val[1].indexOf("rgba") : -1;

                          if (_index_1 >= 0 || _index_2 >= 0 || _index_3 >= 0) {

                              if (_index_1 >= 0) {

                                  _color_val = _style_val[1].substring(_index_1 + 1, _style_val[1].length);
                                  // continue;

                              } else if (_index_2 >= 0 && _index_3 < 0) {

                                  _color_val = _style_val[1].substring(_index_2 + 4, _style_val[1].length - 1);

                              } else if (_index_3 >= 0) {

                                  _color_val = _style_val[1].substring(_index_3 + 5, _style_val[1].length - 1);
                                  continue;
                              }

                              // 查重, 如果没有重复, 插入数组
                              // var flag = true;
                              // for (var x = 0; x < colors.length; x++) {
                              // 	if(_color_val === colors[x].color){
                              // 		flag = false;
                              // 	}
                              // }

                              // if(flag){
                              colors.push(_color_val);
                              // }
                          }
                      }
                  }
              }
              var color = {};
              color.codeNum = 0;
              color.code = "";
              colors = tools_fun().array_unique(colors);
              for (var i = 0; i < colors.length; i++) {
                  var _style = "";
                  if (colors[i].indexOf(",") >= 0) {
                      _style = "background: rgb(" + colors[i] + ")";
                  } else {
                      _style = "background: #" + colors[i];
                  }
                  color.codeNum++;
                  color.code += '<span class="colorPicker-alone" style="' + _style + '" data-colorval="' + colors[i] + '"></span>';
              }

              return color;
          }

          that.$toolsBar_wrapper.delegate('[data-act=all-color]', 'click', function(event) {
              if (that.$toolsBar_wrapper.find("menu[class=set-all-color]").is(":hidden")) {
                  that.$toolsBar_wrapper.find("menu[class=set-all-color]").show();
                  that.$toolsBar_wrapper.find("menu[class=set-style]").hide();
                  that.$toolsBar_wrapper.find(".choose-insert-row").hide();
                  that.$toolsBar_wrapper.find(".set-image-border").hide();
                  // 设置下拉菜单的高度
                  that.setMenuHeight("set-all-color");
              } else {
                  that.$toolsBar_wrapper.find("menu[class=set-all-color]").hide();
                  return false;
              }
          })

          return code;
      };

      // 设置样式操作
      var _set_style = function() {
          var code = '<li class="operation-item" data-tips="设置素材样式">' +
              '	<a href="javascript:void(0)" data-act="set-style"><i class="fa fa-star-half-o"></i></a>' +
              '	<menu class="set-style">' +
              '		<li data-act="set-transparent">' +
              '			<span class="prop-name"><i class="fa fa-eye-slash"></i>透明度</span>' +
              '			<div class="fill-item"><input class="bubble-slider" type="number" min="0" max="100" data-color="#fff" value="100"></div>' +
              '			<input type="number" class="input-val-small" id="transparency">' +
              '		</li>' +
              '		<li data-act="set-rotate">' +
              '			<span class="prop-name"><i class="fa fa-repeat"></i>旋转</span>' +
              '			<div class="fill-item"><input class="bubble-slider" type="number" min="0" max="360" data-color="#fff" value="0"></div>' +
              '			<input type="number" class="input-val-small" id="rotate">' +
              '		</li>' +
              '		<li data-act="set-zoom">' +
              '			<span class="prop-name"><i class="fa fa-clone"></i>缩放</span>' +
              '			<div class="fill-item"><input class="bubble-slider" type="number" min="0" max="10" data-color="#fff" value="0"></div>' +
              '			<input type="number" class="input-val-small" id="zoom">' +
              '		</li>' +
              '		<li data-act="set-margintop">' +
              '			<span class="prop-name"><i class="fa fa-level-up"></i>段前距</span>' +
              '			<input type="number" placeholder="请填写正负数值" class="input-val-big" id="margintop">' +
              '			<em class="company">像素</em>' +
              '		</li>' +
              '		<li data-act="set-marginbottom">' +
              '			<span class="prop-name"><i class="fa fa-level-down"></i>段后距</span>' +
              '			<input type="number" placeholder="请填写正负数值" class="input-val-big" id="marginbottom">' +
              '			<em class="company">像素</em>' +
              '		</li>' +
              '		<li data-act="set-offsetx">' +
              '			<span class="prop-name"><i class="fa fa-indent"></i>偏移</span>' +
              '			<input type="number" placeholder="请填写正负数值" class="input-val-big" id="offsetx">' +
              '			<em class="company">像素</em>' +
              '		</li>' +
              '	</menu>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-style]', 'click', function(event) {
              if (that.$toolsBar_wrapper.find("menu[class=set-style]").is(":hidden")) {
                  that.$toolsBar_wrapper.find("menu[class=set-style]").show();
                  that.$toolsBar_wrapper.find("menu[class=set-all-color]").hide();
                  that.$toolsBar_wrapper.find(".choose-insert-row").hide();
                  that.$toolsBar_wrapper.find(".set-image-border").hide();
                  if (that.$toolsBar_wrapper.find(".bubble-slider-wrap").size() <= 0) {
                      that.$toolsBar_wrapper.find(".bubble-slider").each(function(index, el) {
                          $(this).bubbleSlider();
                      });
                  }
                  // 设置默认值
                  setDefaultValue();

                  // 设置下拉菜单的高度
                  that.setMenuHeight("set-style");
              } else {
                  that.$toolsBar_wrapper.find("menu[class=set-style]").hide();
                  return false;
              }

              that.$toolsBar_wrapper.find(".bubble-slider-thumb").mousedown(function(event) {
                  that.$toolsBar_wrapper.find(".bubble-slider-thumb").mousemove(function(event) {
                      var val = $(this).parents(".fill-item").find(".bubble-slider").val();
                      $(this).parents(".fill-item").siblings("input").val(val);
                      var act = $(this).parents("li").data("act");
                      setStyle(act, val);
                  });
                  $(this).mouseup(function(event) {
                      $(this).unbind("mousemove");
                  });
              });

              that.$toolsBar_wrapper.find("menu.set-style").find("input").keyup(function(event) {
                  if (event.keyCode === 13) {
                      var act = $(this).parents("li").data("act");
                      setStyle(act, $(this).val());
                  }
              });

              that.$toolsBar_wrapper.find("menu.set-style").find("input").blur(function(event) {
                  var act = $(this).parents("li").data("act");
                  setStyle(act, $(this).val());
              });
          });

          function setDefaultValue() {
              that.$toolsBar_wrapper.find("menu[class=set-style]").find("li").each(function(index, el) {
                  var styleType = $(this).data("act").split("-")[1];
                  var val = that.material.attr("data-" + styleType);
                  if (val) {
                      if (styleType == "transparent") {
                          val = 100 - (val * 100);
                      }

                      // 处理滑动条
                      var bubbleSlider = that.$toolsBar_wrapper.find("menu[class=set-style]").find("li[data-act=set-" + styleType + "]").find(".bubble-slider-wrap");
                      if (bubbleSlider.size() > 0) {
                          bubbleSlider.remove();
                          that.$toolsBar_wrapper.find("menu[class=set-style]").find("li[data-act=set-" + styleType + "]").find(".fill-item").find("input").attr("value", val).bubbleSlider();
                      }
                      that.$toolsBar_wrapper.find("menu[class=set-style]").find("li[data-act=set-" + styleType + "]").find("input").val(val);
                  }
              });
          }

          function setStyle(styleType, val) {

              switch (styleType) {

                  // 设置透明
                  case "set-transparent":
                      that.material.attr("data-transparent", (val >= 0 && val <= 100) ? (100 - val) / 100 : 1);
                      that.material.css({
                          opacity: val / 100
                      });
                      break;

                      // 设置旋转
                  case "set-rotate":
                      that.material.attr("data-rotate", ((val >= 0 && val <= 360) ? val : 0));
                      that.material.css({
                          "transform": "rotate(" + ((val >= 0 && val <= 360) ? val : 0) + "deg)"
                      });
                      break;

                      // 设置缩放
                  case "set-zoom":
                      that.material.attr("data-zoom", ((val >= 0 && val <= 100) ? val : 0));
                      that.material.css({
                          "transform": "scale(" + ((val > 0 && val <= 100) ? val : 1) + ")"
                      });
                      break;

                      // 设置段前距
                  case "set-margintop":
                      that.material.attr("data-margintop", val);
                      that.material.css({
                          "margin-top": val + "px"
                      });
                      break;

                      // 设置段后距
                  case "set-marginbottom":
                      that.material.attr("data-marginbottom", val);
                      that.material.css({
                          "margin-bottom": val + "px"
                      });
                      break;

                      // 偏移
                  case "set-offsetx":
                      that.material.attr("data-offsetx", val);
                      that.material.css({
                          "transform": "translate3d(" + val + "px, 0px, 0px)"
                      });
                      break;
              }
          }

          return code;
      };

      // 清除格式操作
      var _clear_style = function() {
          var code = '<li class="operation-item" data-tips="清除格式">' +
              '	<a href="javascript:void(0)" titile="清除格式" data-act="clear-style"><i class="fa fa-eraser"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act="clear-style"]', 'click', function(event) {
              var text = that.material.text();
              that.material.empty();
              that.material.html(text);
              that.$toolsBar_wrapper.remove();
          });
          return code;
      };
      //复位
      var _reset = function() {
              var code = '<li class="operation-item" data-tips="复位">' +
                  '	<a href="javascript:void(0)" titile="复位" data-act="reset">复位</a>' +
                  '</li>';
              that.$toolsBar_wrapper.delegate('[data-act="reset"]', 'click', function(event) {
                  localStorage.removeItem("material_top");
                  localStorage.removeItem("material_left");
                  that.setToolsPosition();
              });

              return code;
          }
          // 素材上移
      var _material_set_up = function() {
          var code = '<li class="operation-item" data-tips="上移">' +
              '	<a href="javascript:void(0)" data-act="material_set_up">上移</a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=material_set_up]', 'click', function(event) {
              var _thisMaterial = that.material;
              if (that.material[0].tagName.toLocaleLowerCase() == "img") {
                  _thisMaterial = _thisMaterial.parents(".KolEditor").eq(0);
              }
              if (_thisMaterial.prev()) {
                  _thisMaterial.prev().before(_thisMaterial);
              }
          });
          return code;
      };
      // 素材下移
      var _material_set_down = function() {
          var code = '<li class="operation-item" data-tips="下移">' +
              '	<a href="javascript:void(0)" data-act="material_set_down">下移</a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=material_set_down]', 'click', function(event) {
              var _thisMaterial = that.material;
              if (that.material[0].tagName.toLocaleLowerCase() == "img") {
                  _thisMaterial = _thisMaterial.parents(".KolEditor").eq(0);
              }
              if (_thisMaterial.next()) {
                  _thisMaterial.next().after(_thisMaterial);
              }
          });
          return code;
      };

      // ---------------------- 关于文字的操作 ----------------------

      // 字号
      var _font_size = function() {
          var code = '<li class="operation-item set-font-size-item"  data-tips="选中后,设置字号">' +
              '	<input type="text" class="input-val-small" id="setFontSize" min="12" value="" readonly="readonly" />' +
              '	<a href="javascript:void(0)" data-act="set-font-size"><i class="fa fa-caret-down"></i></a>' +
              '	<menu class="set-font-size">' +
              '		<li data-fontsize="12">12</li>' +
              '		<li data-fontsize="14">14</li>' +
              '		<li data-fontsize="16">16</li>' +
              '		<li data-fontsize="18">18</li>' +
              '		<li data-fontsize="21">21</li>' +
              '		<li data-fontsize="22">22</li>' +
              '		<li data-fontsize="24">24</li>' +
              '		<li data-fontsize="28">28</li>' +
              '		<li data-fontsize="32">32</li>' +
              '		<li data-fontsize="36">36</li>' +
              '		<li data-fontsize="42">42</li>' +
              '		<li data-fontsize="48">48</li>' +
              '		<li data-fontsize="56">56</li>' +
              '		<li data-fontsize="64">64</li>' +
              '		<li data-fontsize="72">72</li>' +
              '		<li data-fontsize="80">80</li>' +
              '		<li data-fontsize="88">88</li>' +
              '		<li data-fontsize="96">96</li>' +
              '	</menu>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('#setFontSize', 'keyup', function(event) {
              if (event.keyCode === 13) {
                  setFontSize($(this).val());
              }
          });

          that.$toolsBar_wrapper.delegate('#setFontSize', 'blur', function(event) {
              setFontSize($(this).val());
          });

          that.$toolsBar_wrapper.delegate('.set-font-size-item', 'click', function(event) {

              if ($(".set-font-size").is(":hidden")) {
                  $(".set-font-size").show();

                  // 设置下拉菜单的高度
                  that.setMenuHeight("set-style");
              } else {
                  $(".set-font-size").hide();
                  return false;
              }

              that.$toolsBar_wrapper.find(".set-font-size").find("li").unbind('click');
              that.$toolsBar_wrapper.find(".set-font-size").find("li").click(function(event) {
                  $(".set-font-size").hide();
                  $("#setFontSize").val($(this).data("fontsize"));
                  setFontSize($(this).data("fontsize"));
              });
          });

          // 设置字体大小
          function setFontSize(size) {
              that.ueditor.execCommand('fontsize', size + 'px');
          }

          return code;
      }

      // 文字颜色 / 背景颜色 / 文字阴影
      var _font_color = function() {
          var code = '<li class="operation-item" data-tips="选中后,设置字体颜色">' +
              '	<span class="colorPicker-alone-font-color"></span>' +
              '</li>';

          return code;
      }

      var _font_bg_color = function() {
          var code = '<li class="operation-item" data-tips="选中后,设置文字背景颜色">' +
              '	<span class="colorPicker-alone-font-bg-color"></span>' +
              '</li>';

          return code;
      }

      // 文字对齐, 左 中 右
      var _font_align_left = function() {
          var code = '<li class="operation-item" data-tips="左对齐">' +
              '	<a href="javascript:void(0)" data-act="set-font-align-left"><i class="fa fa-align-left"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-font-align-left]', 'click', function(event) {
              that.ueditor.execCommand('justify', 'left');
              $("a[data-act*=set-font-align]").css("background", "none");
              $(this).css("background", "rgba(32,160,255,0.6)");
          });
          return code;
      }

      var _font_align_center = function() {
          var code = '<li class="operation-item" data-tips="居中对齐">' +
              '	<a href="javascript:void(0)" data-act="set-font-align-center"><i class="fa fa-align-center"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-font-align-center]', 'click', function(event) {
              that.ueditor.execCommand('justify', 'center');
              $("a[data-act*=set-font-align]").css("background", "none");
              $(this).css("background", "rgba(32,160,255,0.6)");
          });
          return code;
      }

      var _font_align_right = function() {
          var code = '<li class="operation-item" data-tips="右对齐">' +
              '	<a href="javascript:void(0)" data-act="set-font-align-right"><i class="fa fa-align-right"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-font-align-right]', 'click', function(event) {
              that.ueditor.execCommand('justify', 'right');
              $("a[data-act*=set-font-align]").css("background", "none");
              $(this).css("background", "rgba(32,160,255,0.6)");
          });
          return code;
      }

      var _font_align_justify = function() {
          var code = '<li class="operation-item" data-tips="两端对齐">' +
              '	<a href="javascript:void(0)" data-act="set-font-align-justify"><i class="fa fa-align-justify"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-font-align-justify]', 'click', function(event) {
              that.ueditor.execCommand('justify', 'justify');
              $("a[data-act*=set-font-align]").css("background", "none");
              $(this).css("background", "rgba(32,160,255,0.6)");
          });
          return code;
      }

      // 加粗
      var _font_bold = function() {
          var code = '<li class="operation-item" data-tips="选中后,设置字体加粗">' +
              '	<a href="javascript:void(0)" data-act="set-font-bold"><i class="fa fa-bold"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-font-bold]', 'click', function(event) {
              that.ueditor.execCommand('bold');
              if (getcurryStyle(that.ueditor.selection.getStart()).fontWeight == "bold" || getcurryStyle(that.ueditor.selection.getStart()).fontWeight > 400) {
                  $(this).css("background", "rgba(32,160,255,0.6)");
              } else {
                  $(this).removeAttr('style');
              }
          });
          return code;
      }

      // 斜体
      var _font_italic = function() {
          var code = '<li class="operation-item" data-tips="选中后,设置斜体字">' +
              '	<a href="javascript:void(0)" data-act="set-font-italic"><i class="fa fa-italic"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-font-italic]', 'click', function(event) {
              that.ueditor.execCommand('italic');
              if (getcurryStyle(that.ueditor.selection.getStart()).fontStyle == "italic") {
                  $(this).css("background", "rgba(32,160,255,0.6)");
              } else {
                  $(this).removeAttr('style');
              }
          });
          return code;
      }

      // 下划线
      var _font_underline = function() {
          var code = '<li class="operation-item" data-tips="选中后,设置下划线">' +
              '	<a href="javascript:void(0)" data-act="set-font-underline"><i class="fa fa-underline"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-font-underline]', 'click', function(event) {
              that.ueditor.execCommand('underline');
              var textDecoration = getcurryStyle(that.ueditor.selection.getStart()).textDecoration == "none" ? $(that.ueditor.selection.getStart()).parents("span:first").css("text-decoration") : getcurryStyle(that.ueditor.selection.getStart()).textDecoration;
              if (textDecoration == "underline") {
                  $(".operation-item a[data-act=set-font-strikethrough").removeAttr('style');
                  $(this).css("background", "rgba(32,160,255,0.6)");
              } else {
                  $(this).removeAttr('style');
              }
          });
          return code;
      }

      // 删除线
      var _font_strikethrough = function() {
          var code = '<li class="operation-item" data-tips="选中后,设置删除线">' +
              '	<a href="javascript:void(0)" data-act="set-font-strikethrough"><i class="fa fa-strikethrough"></i></a>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-font-strikethrough]', 'click', function(event) {
              that.ueditor.execCommand('strikethrough');
              var textDecoration = getcurryStyle(that.ueditor.selection.getStart()).textDecoration == "none" ? $(that.ueditor.selection.getStart()).parents("span:first").css("text-decoration") : getcurryStyle(that.ueditor.selection.getStart()).textDecoration;
              if (textDecoration == "line-through") {
                  $(".operation-item a[data-act=set-font-underline").removeAttr('style');
                  $(this).css("background", "rgba(32,160,255,0.6)");
              } else {
                  $(this).removeAttr('style');
              }
          });
          return code;
      }

      // 行间距
      var _font_set_lineheight = function() {
          var code = '<li class="operation-item"  data-tips="设置行间距">' +
              '	<a href="javascript:void(0)" data-act="set-font-line-height">行间距</a>' +
              '	<menu class="set-font-line-height">' +
              '		<li>' +
              '			<input type="number" id="setLineHeight" />' +
              '			<em class="company">倍</em>' +
              '		</li>' +
              '	</menu>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-font-line-height]', 'click', function(event) {
              if (that.$toolsBar_wrapper.find(".set-font-line-height").is(":hidden")) {
                  that.$toolsBar_wrapper.find(".set-font-line-height").show();
              } else {
                  that.$toolsBar_wrapper.find(".set-font-line-height").hide();
              }
          });
          that.$toolsBar_wrapper.delegate('#setLineHeight', 'keyup', function(event) {
              if (event.keyCode === 13) {
                  that.ueditor.execCommand('lineheight', $(this).val());
                  that.$toolsBar_wrapper.find(".set-font-line-height").hide();
              }
          });

          that.$toolsBar_wrapper.delegate('#setLineHeight', 'blur', function(event) {
              that.ueditor.execCommand('lineheight', $(this).val());
              that.$toolsBar_wrapper.find(".set-font-line-height").hide();
          });

          return code;
      };

      // ---------------------- 关于图片的操作 ----------------------

      // 图片宽度
      var _image_width = function() {
          var code = '<li class="operation-item" data-tips="设置图片宽度">' +
              '	<a href="javascript:void(0)" data-act="set-imgwidth">宽度</a>' +
              '	<menu class="set-imgwidth" style="height:42px;">' +
              '		<li>' +
              '			<span class="prop-name">宽度</span>' +
              '			<div class="fill-item"><input class="bubble-slider" type="number" min="0" max="640" data-color="#fff" value="100"></div>' +
              '			<input type="number" class="input-val-small" id="imgwidth">' +
              '		</li>' +
              '	</menu>' +
              '</li>';
          that.$toolsBar_wrapper.delegate('[data-act=set-imgwidth]', 'click', function(event) {
              if (that.$toolsBar_wrapper.find("menu[class=set-imgwidth]").is(":hidden")) {
                  that.$toolsBar_wrapper.find("menu[class=set-imgwidth]").show();
                  that.$toolsBar_wrapper.find("menu[class=set-all-color]").hide();
                  that.$toolsBar_wrapper.find(".choose-insert-row").hide();
                  that.$toolsBar_wrapper.find(".set-image-border").hide();
                  if (that.$toolsBar_wrapper.find(".bubble-slider-wrap").size() <= 0) {
                      that.$toolsBar_wrapper.find(".bubble-slider").each(function(index, el) {
                          $(this).bubbleSlider();
                      });
                  }
                  // 设置默认值
                  setDefaultValue();
              } else {
                  that.$toolsBar_wrapper.find("menu[class=set-imgwidth]").hide();
                  return false;
              }

              that.$toolsBar_wrapper.find(".bubble-slider-thumb").mousedown(function(event) {
                  that.$toolsBar_wrapper.find(".bubble-slider-thumb").mousemove(function(event) {
                      var val = $(this).parents(".fill-item").find(".bubble-slider").val();
                      $(this).parents(".fill-item").siblings("input").val(val);
                      var act = $(this).parents("li").data("act");
                      setStyle(val);
                  });
                  $(this).mouseup(function(event) {
                      $(this).unbind("mousemove");
                  });
              });

              that.$toolsBar_wrapper.find("menu.set-imgwidth").find("input").keyup(function(event) {
                  if (event.keyCode === 13) {
                      var act = $(this).parents("li").data("act");
                      setStyle($(this).val());
                  }
              });

              that.$toolsBar_wrapper.find("menu.set-imgwidth").find("input").blur(function(event) {
                  var act = $(this).parents("li").data("act");
                  setStyle($(this).val());
              });
          });

          function setDefaultValue() {
              that.$toolsBar_wrapper.find("menu[class=set-imgwidth]").find("li").each(function(index, el) {
                  var val = that.material.css("width");
                  // 处理滑动条
                  var bubbleSlider = that.$toolsBar_wrapper.find("menu[class=set-imgwidth]").find("li").find(".bubble-slider-wrap");
                  if (bubbleSlider.size() > 0) {
                      bubbleSlider.remove();
                      that.$toolsBar_wrapper.find("menu[class=set-imgwidth]").find("li").find(".fill-item").find("input").attr("value", val).bubbleSlider();
                  }
                  that.$toolsBar_wrapper.find("menu[class=set-imgwidth]").find("li").find("input").val(parseInt(val));
              });
          }

          function setStyle(val) {
              that.material.css({
                  width: val + "px"
              });
              that.material.parent("section").css({
                  width: val + "px"
              });
          }
          return code;
      };

      // 图片边框
      var _image_border = function() {

          var code = '<li class="operation-item" data-tips="设置图片边框">' +
              '	<a href="javascript:void(0)" data-act="set-image-border">边框&nbsp;&nbsp;<i class="fa fa-caret-down"></i></a>' +
              '	<menu class="set-image-border">' +
              '		<li>' +
              '			<select name="border-direction">' +
              '				<option value="border" selected="selected">全部</option>' +
              '				<option value="border-top">上边</option>' +
              '				<option value="border-left">左边</option>' +
              '				<option value="border-right">右边</option>' +
              '				<option value="border-bottom">下边</option>' +
              '			</select>' +
              '		</li>' +
              '		<li>' +
              '			<span class="prop-name">样式</span>' +
              ' 			<div class="fill-item">' +
              '				<select name="border-style">' +
              '					<option label="无边框" value="none" selected="selected">无边框</option>' +
              '					<option label="点状" value="dotted">点状</option>' +
              '					<option label="虚线" value="dashed">虚线</option>' +
              '					<option label="实线" value="solid">实线</option>' +
              '					<option label="双线" value="double">双线</option>' +
              '					<option label="3D凹槽" value="inset">3D凹槽</option>' +
              '					<option label="3D垄状" value="ridge">3D垄状</option>' +
              '					<option label="3D内嵌" value="inset">3D内嵌</option>' +
              '					<option label="3D外嵌" value="outset">3D外嵌</option>' +
              '				</select>' +
              ' 			</div>' +
              '		</li>' +
              '		<li>' +
              '			<span class="prop-name">尺寸</span>' +
              ' 			<div class="fill-item">' +
              '				<input type="number" class="input-val-big" name="border-size" />' +
              ' 			</div>' +
              '		</li>' +
              '		<li>' +
              '			<span class="prop-name">弧度</span>' +
              ' 			<div class="fill-item">' +
              '				<input type="number" class="input-val-big" name="set-image-border-radius" />' +
              ' 				<select id="set-image-border-radius-unit">' +
              ' 					<option value="percent" selected="selected">%</option>' +
              ' 					<option value="px">像素</option>' +
              '				</select>' +
              ' 			</div>' +
              '		</li>' +
              '		<li>' +
              '			<span class="prop-name">颜色</span>' +
              ' 			<div class="fill-item">' +
              '				<span class="colorPicker-alone-image-border-color"></span>' +
              ' 			</div>' +
              '		</li>' +
              '	</menu>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-image-border]', 'click', function(event) {

              if (that.$toolsBar_wrapper.find(".set-image-border").is(":hidden")) {
                  that.$toolsBar_wrapper.find(".set-image-border").show();
                  // 设置下拉菜单的高度
                  that.setMenuHeight("set-image-border");
              } else {
                  that.$toolsBar_wrapper.find(".set-image-border").hide();
              }
          });

          that.$toolsBar_wrapper.delegate('[name="border-style"]', 'change', function(event) {

              var border_direction = that.$toolsBar_wrapper.find("[name=border-direction]").val();
              var border_width = that.$toolsBar_wrapper.find("[name=border-size]").val();

              if (border_width && border_width > 0) {
                  // var style_txt = border_direction+" : "+border_width+"px "+$(this).val()+";";
                  that.material.css(border_direction, border_width + "px " + $(this).val());
              }
          });

          that.$toolsBar_wrapper.delegate('[name="border-size"]', 'blur', function(event) {

              var border_direction = that.$toolsBar_wrapper.find("[name=border-direction]").val();
              var border_width = $(this).val();

              if (border_width && border_width > 0) {
                  // var style_txt = border_direction+" : "+border_width+"px "+$(this).val()+";";
                  that.material.css(border_direction, border_width + "px " + that.$toolsBar_wrapper.find("[name=border-style]").val());
              }
          });

          that.$toolsBar_wrapper.delegate('[name="border-size"]', 'keyup', function(event) {

              if (event.keyCode === 13) {
                  var border_direction = that.$toolsBar_wrapper.find("[name=border-direction]").val();
                  var border_width = $(this).val();

                  if (border_width && border_width > 0) {
                      // var style_txt = border_direction+" : "+border_width+"px "+$(this).val()+";";
                      that.material.css(border_direction, border_width + "px " + that.$toolsBar_wrapper.find("[name=border-style]").val());
                  }
              }
          });

          that.$toolsBar_wrapper.delegate('[name=set-image-border-radius]', 'blur', function(event) {

              var unit = that.$toolsBar_wrapper.find("#set-image-border-radius-unit").val();

              if (unit === "px") {
                  that.material.css("border-radius", $(this).val() + "px");
              } else {
                  that.material.css("border-radius", $(this).val() + "%");
              }
          });

          that.$toolsBar_wrapper.delegate('[name=set-image-border-radius]', 'keyup', function(event) {

              if (event.keyCode === 13) {
                  var unit = that.$toolsBar_wrapper.find("#set-image-border-radius-unit").val();

                  if (unit === "px") {
                      that.material.css("border-radius", $(this).val() + "px");
                  } else {
                      that.material.css("border-radius", $(this).val() + "%");
                  }
              }
          });

          return code;
      };

      // 图片阴影
      var _image_shadow = function() {
          var code = '<li class="operation-item" data-tips="设置图片阴影">' +
              '	<a href="javascript:void(0)" data-act="set-image-shadow">阴影&nbsp;&nbsp;<i class="fa fa-caret-down"></i></a>' +
              '	<menu class="set-image-shadow">' +
              '		<li>' +
              '			<span class="prop-name">大小</span>' +
              ' 			<div class="fill-item">' +
              '				<input type="number" class="input-val-big" name="shadow-size" />' +
              ' 			</div>' +
              '			<em class="company">像素</em>' +
              '		</li>' +
              '		<li>' +
              '			<span class="prop-name">模糊</span>' +
              ' 			<div class="fill-item">' +
              '				<input type="number" class="input-val-big" name="shadow-vague" />' +
              ' 			</div>' +
              '			<em class="company">像素</em>' +
              '		</li>' +
              '		<li>' +
              '			<span class="prop-name">方向</span>' +
              '			<div class="fill-item" style="width: 100px;"><input class="bubble-slider" type="number" min="0" max="360" data-color="#fff" value="0"></div>' +
              '			&nbsp;<input type="number" class="input-val-small" id="direction">' +
              '		</li>' +
              '		<li>' +
              '			<span class="prop-name">颜色</span>' +
              ' 			<div class="fill-item">' +
              '				<span class="colorPicker-alone-image-border-shadow"></span>' +
              ' 			</div>' +
              '		</li>' +
              '	</menu>' +
              '</li>';

          that.$toolsBar_wrapper.delegate('[data-act=set-image-shadow]', 'click', function(event) {

              if (that.$toolsBar_wrapper.find(".set-image-shadow").is(":hidden")) {
                  that.$toolsBar_wrapper.find(".set-image-shadow").show();
                  // 设置下拉菜单的高度
                  that.setMenuHeight("set-image-shadow");

                  if (that.$toolsBar_wrapper.find(".bubble-slider-wrap").size() <= 0) {
                      that.$toolsBar_wrapper.find(".bubble-slider").each(function(index, el) {
                          $(this).bubbleSlider();
                      });

                      that.$toolsBar_wrapper.find(".bubble-slider-thumb").mousedown(function(event) {
                          that.$toolsBar_wrapper.find(".bubble-slider-thumb").mousemove(function(event) {
                              var val = $(this).parents(".fill-item").find(".bubble-slider").val();
                              $(this).parents(".fill-item").siblings("input").val(val);
                              var act = $(this).parents("li").data("act");
                          });
                          $(this).mouseup(function(event) {
                              $(this).unbind("mousemove");
                          });
                      });
                  }
              } else {
                  that.$toolsBar_wrapper.find(".set-image-shadow").hide();
              }
          });

          return code;
      };

      // 图片上传
      var _image_upload = function() {
          var code = '<li class="operation-item" data-tips="上传图片">' +
              '	<a href="javascript:void(0)" data-act="image-upload">替换图片</a>' +
              '</li>';


          if (!$.mytools.getCookie("UserId")) {

              code = '<li class="operation-item">' +
                  '	<a href="javascript:void(0)" data-act="login-btn">登录后, 可替换图片</a>' +
                  '</li>';

              that.$toolsBar_wrapper.delegate('[data-act=login-btn]', 'click', function(event) {
                  $.mytools.requireScript("login", "/login.js", function() {
                      $(document).trigger("click");
                      login._init();
                  });
              });
          }

          return code;
      };

      // 图片编辑
      var _image_edit = function() {
          var code = '<li class="operation-item" data-tips="编辑美化图片">' +
              '	<a href="javascript:void(0)" data-act="image-edit">美化</a>' +
              '</li>' +
              '<li class="operation-split"></li>';

          // 如果是GIF则不显示美化按钮
          if (that.material.attr("src").indexOf(".gif") >= 0) {
              return '';
          }

          that.$toolsBar_wrapper.delegate('[data-act=image-edit]', 'click', function(event) {

              var img_obj = that.material;

              // that.material.attr("data-toedit", "yes");
              // var xiuxiusrc = "/image_edit?imgurl=" + encodeURI(img_obj.attr("src"));
              // $("body").append("<div id='xiuxiuContent' style='width:100%;height:100%;background-color:rgba(0,0,0,0.3);position:fixed;left:0px;top:0px;z-index:999;'>" +
              //     "<iframe src=" + xiuxiusrc + " style='position:absolute;left:" + ($(window).width() / 12) + "px;top:" + ($(window).height() / 12) + "px;z-index:199;width:" + ($(window).width() / 1.2) + "px;height:" + ($(window).height() / 1.2) + "px;'></iframe>" +
              //     "</div>");
              vm.beautyImg(encodeURI(img_obj.attr("src")));

          });

          return code;
      };

      return {
          "drop": _drop,
          "del": _del,
          "copy": _copy,
          "selec": _select,
          "insert_row": _insert_row,
          "change_img": _change_img,
          "set_color": _set_color,
          "set_style": _set_style,
          "clear_style": _clear_style,
          "reset": _reset,
          "image_upload": _image_upload,
          "image_edit": _image_edit,
          "font_size": _font_size,
          "font_color": _font_color,
          "font_bg_color": _font_bg_color,
          "font_align_left": _font_align_left,
          "font_align_center": _font_align_center,
          "font_align_right": _font_align_right,
          "font_align_justify": _font_align_justify,
          "font_bold": _font_bold,
          "font_italic": _font_italic,
          "font_underline": _font_underline,
          "font_strikethrough": _font_strikethrough,
          "font_set_lineheight": _font_set_lineheight,
          "material_set_up": _material_set_up,
          "material_set_down": _material_set_down,
          "image_width": _image_width,
          "image_border": _image_border,
          "image_shadow": _image_shadow,

      };
  };

  // 向页面部署通用素材工具条
  ToolsBar.prototype.randerBaseToolsBar = function() {

      var that = this;
      that.$toolsBar_wrapper.prepend($(that.toolsBar_code).addClass("base-tools"));
      that.$toolsBar_wrapper.find(".base-tools").prepend(
          that.operationItems().drop() +
          that.operationItems().del() +
          that.operationItems().copy() +
          that.operationItems().selec() +
          '<li class="operation-split"></li>' +
          that.operationItems().insert_row() +
          '<li class="operation-split"></li>' +
          that.operationItems().change_img() +
          '<li class="operation-split"></li>' +
          that.operationItems().set_color() +
          '<li class="operation-split"></li>' +
          that.operationItems().set_style() +
          '<li class="operation-split"></li>' +
          that.operationItems().clear_style() +
          '<li class="operation-split"></li>' +
          that.operationItems().material_set_up() +
          that.operationItems().material_set_down()
      );
      if (localStorage.getItem("material_top") && localStorage.getItem("material_left")) {
          that.$toolsBar_wrapper.find(".base-tools").prepend(
              that.operationItems().reset()
          );
      }

      that.$toolsBar_wrapper.find(".operation-item").each(function(index, el) {
          if ($(this).children().size() <= 0) {
              $(this).next(".operation-split").remove();
              $(this).remove();
          }
      });
  };

  // 判断素材类型, 根据类型不同加载不同的工具条
  ToolsBar.prototype.randerSeniorToolsBar = function() {

      var that = this;

      fontToolsBar();

      imageToolsBar();

      function imageToolsBar() {
          var isHasImage = false;
          // 判断素材中是否只包含图片
          if (that.material.get(0).tagName.toLowerCase() === "img") {
              isHasImage = true;
          }

          if (!isHasImage) { return false; }

          that.ueditor.selection.getRange().selectNode(that.material.get(0));

          that.$toolsBar_wrapper.append($(that.toolsBar_code).addClass("senior-image-tools"));
          that.$toolsBar_wrapper.find(".senior-image-tools").prepend(
              that.operationItems().image_width() +
              '<li class="operation-split"></li>' +
              that.operationItems().image_border() +
              '<li class="operation-split"></li>' +
              that.operationItems().image_edit() +
              that.operationItems().image_upload()
              // that.operationItems().image_shadow()
          );
      }

      function fontToolsBar() {
          var isHasText = false;
          // 判断素材类型, 文字(包含)
          for (var i = 0; i < that.material_nodes.length; i++) {
              var nodeType = that.material_nodes[i].childNodes[0] ? that.material_nodes[i].childNodes[0].nodeType : -1
              if (nodeType == 3) {
                  // 如果有文本节点, 则跳出循环, 加载文字工具条
                  isHasText = true;
                  break;
              }
          }

          if (!isHasText) { return false; }

          that.$toolsBar_wrapper.append($(that.toolsBar_code).addClass("senior-text-tools"));
          that.$toolsBar_wrapper.find(".senior-text-tools").prepend(
              that.operationItems().font_size() +
              '<li class="operation-split"></li>' +
              that.operationItems().font_align_left() +
              that.operationItems().font_align_center() +
              that.operationItems().font_align_right() +
              that.operationItems().font_align_justify() +
              '<li class="operation-split"></li>' +
              that.operationItems().font_bold() +
              that.operationItems().font_italic() +
              that.operationItems().font_strikethrough() +
              that.operationItems().font_underline() +
              '<li class="operation-split"></li>' +
              that.operationItems().font_color() +
              '<li class="operation-split"></li>' +
              that.operationItems().font_bg_color() +
              '<li class="operation-split"></li>' +
              that.operationItems().font_set_lineheight()

          );
      }

      that.$toolsBar_wrapper.find(".operation-item").each(function(index, el) {
          if ($(this).children().size() <= 0) {
              $(this).next(".operation-split").remove();
              $(this).remove();
          }
      });

  };

  // 向页面部署初始化代码
  ToolsBar.prototype.randerInitToolsBar = function() {

      $(".material-operation-tools").remove();
      this.material.attr("data-tools-id", this.id);
      $("body").prepend(this.toolsBar_wrapper_code);
      this.$toolsBar_wrapper = $("body").find("#" + this.id);
  };

  // 调整工具条的位置
  ToolsBar.prototype.setToolsPosition = function() {

      var that = this;
      // 控制位置
      var left = (that.material.offset().left * 1) + ($(that.ueditor.iframe).offset().left * 1) - 5;
      // 剩余高度, 判断够不够显示工具条
      var top = 0;
      var residue_height = ($(that.ueditor.iframe).height() - (that.material.offset().top + that.material.height())) + $($(that.ueditor.iframe).get(0).contentWindow).scrollTop();
      if (residue_height < 240) {
          // 不够显示, 则显示在素材上方
          top = (that.material.offset().top * 1) - $($(that.ueditor.iframe).get(0).contentWindow).scrollTop() + 100;
          if (that.$toolsBar_wrapper.find(".tools-bar").size() > 0) {
              top -= (that.$toolsBar_wrapper.find(".tools-bar").size() - 1) * 50;
          }
      } else {
          // 显示再素材下方
          top = ((that.material.offset().top * 1) + that.material.height() + 60) - $($(that.ueditor.iframe).get(0).contentWindow).scrollTop() + 90;
      }

      if (top < 0) {
          top = ($(that.ueditor.iframe).offset().top * 1);
      } else if (top < 100) {
          top = ($(that.ueditor.iframe).offset().top * 1);
      }

      if (left < 0) {
          left = ($(that.ueditor.iframe).offset().left * 1);
      }
      localStorage.getItem("material_top") ? top = localStorage.getItem("material_top") : "";
      localStorage.getItem("material_left") ? left = localStorage.getItem("material_left") : "";

      that.$toolsBar_wrapper.css({
          left: left + "px",
          top: top + "px"
      }).show();
      if (left > $(window).width() - $('menu.material-operation-tools').width()) {
          that.$toolsBar_wrapper.css("left", $(window).width() - $('menu.material-operation-tools').width());
      }
      var tools_bar_width = [];
      that.$toolsBar_wrapper.find(".tools-bar").each(function(index, el) {
          tools_bar_width.push($(this).width());
      });
      tools_bar_width.sort(function(a, b) {
          return b - a;
      });
      that.$toolsBar_wrapper.css({
          width: ((tools_bar_width[0] * 1) + 50) + "px"
      });
  };

  // 加载一些特殊事件
  ToolsBar.prototype.loadSpecialEvent = function() {

      var that = this;

      // 初始化颜色选择器
      that.$toolsBar_wrapper.find(".colorPicker-alone").each(function(index, el) {
          var $colorPicker = $(this);
          $colorPicker.colpick({
              layout: "rgbhex",
              color: '#' + ($colorPicker.data("colorval")).toString().colorHex(),
              onChange: function(hsb, hex, rgb, el, bySetColor) {
                  $colorPicker.css('backgroundColor', '#' + hex);
                  if ($colorPicker.data("colorval").toString().indexOf(",") < 0) {
                      setMaterialColor(hex, $colorPicker.attr("data-colorval").toString(), $colorPicker);
                  } else {
                      setMaterialColor(rgb.r + "," + rgb.g + "," + rgb.b, $colorPicker.attr("data-colorval").toString(), $colorPicker);
                  }
              },
              onSubmit: function() {
                  $colorPicker.colpickHide();
              }
          });
      });

      that.$toolsBar_wrapper.find(".colorPicker-alone-font-color").each(function(index, el) {
          var $colorPicker = $(this);
          var color = getcurryStyle($(".colorPicker-alone-font-color")[0]).backgroundColor == "rgba(0, 0, 0, 0)" ? "#ffffff" : getcurryStyle($(".colorPicker-alone-font-color")[0]).backgroundColor;
          // color.colorHex();
          $colorPicker.colpick({
              layout: "rgbhex",
              color: '#' + color.colorHex(),
              onChange: function(hsb, hex, rgb, el, bySetColor) {
                  $(".colorPicker-alone-font-color").css({ "background-color": '#' + hex })
                  $colorPicker.css('backgroundColor', '#' + hex);
                  that.ueditor.execCommand('forecolor', '#' + hex);
              },
              onSubmit: function() {
                  $colorPicker.colpickHide();
                  $(".colpick").hide();
              }
          });
      });

      that.$toolsBar_wrapper.find(".colorPicker-alone-font-bg-color").each(function(index, el) {
          var $colorPicker = $(this);
          var color = getcurryStyle($(".colorPicker-alone-font-bg-color")[0]).backgroundColor == "rgba(0, 0, 0, 0)" ? "#ffffff" : getcurryStyle($(".colorPicker-alone-font-bg-color")[0]).backgroundColor;

          $colorPicker.colpick({
              layout: "rgbhex",
              color: '#' + color.colorHex(),
              onChange: function(hsb, hex, rgb, el, bySetColor) {
                  $(".colorPicker-alone-font-bg-color").css({ "background-color": '#' + hex, "background-image": "none" })
                  $colorPicker.css('backgroundColor', '#' + hex);
                  that.ueditor.execCommand('backcolor', '#' + hex);
              },
              onSubmit: function() {
                  $colorPicker.colpickHide();
                  $(".colpick").hide();
              }
          });
      });

      that.$toolsBar_wrapper.find(".colorPicker-alone-image-border-color").each(function(index, el) {
          var $colorPicker = $(this);
          $colorPicker.colpick({
              layout: "rgbhex",
              color: '#00000',
              onShow: function(colpkr) {
                  var winH = $(window).height();
                  $(colpkr).show();
                  if (winH - ($(colpkr).height()) < $(colpkr).position().top) {
                      $(colpkr).css("top", (winH - ($(colpkr).height() + 10)));
                  }
              },
              onChange: function(hsb, hex, rgb, el, bySetColor) {
                  $colorPicker.css('backgroundColor', '#' + hex);
                  that.material.css("border-color", "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")");
              },
              onSubmit: function() {
                  $colorPicker.colpickHide();
                  $(".colpick").hide();
              },

          });
      });

      imageUpload();

      function imageUpload() {

          var imgUploadBtn = that.$toolsBar_wrapper.find("[data-act=image-upload]");

          if (imgUploadBtn.size() <= 0) { return false; }

          var setting_hard = {
              runtimes: 'html5,flash,silverlight,html4',
              url: $.mytools.uploadUrl + '/attachment/upload', //服务器端的上传页面地址
              flash_swf_url: $.mytools.jsUrl + 'website/dep/plupload_2.1.7/Moxie.swf', //swf文件，当需要使用swf方式进行上传时需要配置该参数
              silverlight_xap_url: $.mytools.jsUrl + 'website/dep/plupload_2.1.7/Moxie.xap', //silverlight文件，当需要使用silverlight方式进行上传时需要配置该参数
              filters: {
                  mime_types: [ //只允许上传图片和zip文件
                      { title: "Image files", extensions: "jpg,gif,png,bmp,jpeg" }
                  ],
                  max_file_size: '2mb', //最大只能上传2mb的文件
                  //prevent_duplicates : true   //不允许选取重复文件
              },
              file_data_name: "attachment"
          };

          function filesAdded(uploader, files, btn, filesize) {

              //后台接口验证
              var getRandomNum = $.mytools.GetRandomNum(10000, 10000000);
              var getTimestamp = $.mytools.getTimestamp();
              uploader.setOption({
                  multipart: true,
                  multipart_params: { "timestamp": getTimestamp, "sign": getRandomNum, type: 'editor' },
                  headers: { "request-id": $.mytools.MD5(btoa(getRandomNum) + btoa(getTimestamp)) }
              });
              that.material.addClass("executeIng");

              // 开始上传
              uploader.start();
          }

          // 当队列中的某一个文件上传完成后触发
          function fileUploaded(uploader, file, responseObject, btn) {

              var backData = eval("(" + responseObject.response + ")");
              if (backData && backData.code === "S") {

                  var upload_image_src = backData.data.pubUrl;
                  if (upload_image_src.substr(0, 4).toLowerCase() != "http") {
                      upload_image_src = "http:" + upload_image_src;
                  }
                  that.material.attr("src", upload_image_src);
                  that.material.attr("_src", upload_image_src);
                  that.material.removeClass("executeIng");

                  var conditions = {};
                  conditions.urls = [];
                  conditions.urls.push(backData.data.pubUrl);
                  conditions.type = 2;
                  $.post("/upload/doupload", conditions, function() {
                      if (backData.code = 'S') {
                          refreshgif(1);
                      } else {
                          layui.use('layer', function() {
                              var layer = layui.layer;
                              layer.msg(backData.msg);
                          });
                      }
                  })

              } else if (backData && backData.code === "F" && backData.message) {
                  layui.use('layer', function() {
                      var layer = layui.layer;
                      layer.msg('<i class="fa fa-exclamation-triangle color-yellow"></i> 文件: ' + file.name + ' 上传失败！' + backData.message);
                  });
              } else {
                  // 上传失败
              }
          }

          function uploadError(uploader, err) {
              if (err.code == -600) {
                  layui.use('layer', function() {
                      var layer = layui.layer;
                      layer.msg('<i class="fa fa-exclamation-triangle color-yellow"></i> 失败！选择的图片文件过大，请上传小于2MB的图片！');
                  });
              } else if (err.code == -601) {
                  layui.use('layer', function() {
                      var layer = layui.layer;
                      layer.msg('<i class="fa fa-exclamation-triangle color-yellow"></i> 失败！选择的文件类型错误，请上传jpg,gif,png为后缀的文件！');
                  });
              } else if (err.code == -602) {
                  layui.use('layer', function() {
                      var layer = layui.layer;
                      layer.msg('<i class="fa fa-exclamation-triangle color-yellow"></i> 已经上传了该图片!');
                  });
              } else {
                  layui.use('layer', function() {
                      var layer = layui.layer;
                      layer.msg('<i class="fa fa-exclamation-triangle color-yellow"></i> "上传出错！请联系管理员！ "' + err.code);
                  });
              }
          }

          function uploadProgress(uploader, file, imgPool) {
              var totleSize = uploader.total.size; // 文件总大小
              var loaded = uploader.total.loaded; // 已上传大小
              // imgPool.find(".progress-bar").width((loaded/totleSize).toFixed(2)*100);
          }

          var upload_image = {};
          upload_image = setting_hard;
          upload_image['browse_button'] = $(imgUploadBtn).get(0);
          var uploader_hard = new plupload.Uploader(setting_hard);
          // 选择文件完成后触发
          uploader_hard.bind('FilesAdded', function(uploader, files) {
              filesAdded(uploader, files, imgUploadBtn, 500);
          });
          // 当队列中的某一个文件上传完成后触发
          uploader_hard.bind('FileUploaded', function(uploader, file, responseObject) {
              fileUploaded(uploader, file, responseObject, imgUploadBtn);
          });
          uploader_hard.bind('Error', function(uploader, err) {
              uploadError(uploader, err);
          });
          uploader_hard.bind('UploadProgress', function(uploader, file) {
              uploadProgress(uploader, file, imgUploadBtn);
          });
          //在实例对象上调用init()方法进行初始化
          uploader_hard.init();
      }

      // 设定素材的主题颜色
      function setMaterialColor(colorVal, mark, $colorPicker) {
          for (var i = 0; i < that.material_nodes.length; i++) {

              var style_code = $(that.material_nodes[i]).attr("style") ? $(that.material_nodes[i]).attr("style") : "";
              var style_code_trim = style_code.replace(/\s/g, "");
              var _styles = style_code_trim.split(";");

              for (var j = 0; j < _styles.length; j++) {
                  var _style_item = _styles[j].split(":");
                  var _style_val = _style_item[1];

                  if (_style_item[0].indexOf("border") >= 0) {

                      if (mark.split(",").length >= 3) {
                          var _index_1 = _style_val.indexOf("rgb");
                          var _index_2 = _style_val.indexOf(")", _index_1);
                          _style_val = _style_val.substring(_index_1, _index_2 + 1);
                      } else {
                          var _index_1 = _style_val.indexOf("#");
                          _style_val = _style_val.substring(_index_1);
                      }
                  }
                  if (_style_val && _style_val.indexOf(mark) >= 0) {
                      var str = _style_val.replace("\(", "\\(").replace("\)", "\\)").replace(/\s/g, "");
                      str = str.split(",").join(",[\\S\\s]*?");
                      var reg = new RegExp(str, "g");
                      var new_style = "";
                      if (colorVal.split(",").length > 0 && colorVal.split(",").length < 4 && colorVal.indexOf(",") >= 0) {
                          new_style = style_code.replace(reg, "rgb(" + colorVal + ")");
                      } else if (colorVal.toString().split("").length === 6) {
                          new_style = style_code.replace(reg, "#" + colorVal);
                      } else {
                          new_style = style_code.replace(reg, "rgba(" + colorVal + ")");
                      }

                      $colorPicker.attr("data-colorval", colorVal);
                      $(that.material_nodes[i]).removeAttr("style").attr("style", new_style);
                  }
              }
          }
      }

      // 气泡提示框
      that.bubbleTips();
      // 复制
      that.partCopy();
  };

  // 气泡提示框
  ToolsBar.prototype.bubbleTips = function() {

      var that = this;

      that.$toolsBar_wrapper.find("li.operation-item").hover(function() {
          showTips($(this));
      }, function() {
          hideTips($(this));
      });

      // 显示提示
      function showTips(actionItem) {

          if (actionItem.find(".bubbleTips").size() > 0) {

              actionItem.find(".bubbleTips").show();
          } else {

              var tip_txt = actionItem.data("tips");

              if (!tip_txt) { return false; }

              var code = '';
              code += '<div class="bubbleTips"> <em>' + tip_txt + '</em> <i class="fa fa-caret-down"></i></div>';

              actionItem.prepend(code);
              var width = tip_txt.split("").length * 14;
              if (tip_txt.indexOf(",") >= 0) {
                  width -= 6;
              }

              actionItem.find(".bubbleTips").find("em").css({
                  width: width + "px"
              });

              actionItem.find(".bubbleTips").css({
                  left: (actionItem.width() / 2) - ((width + 20) / 2) + "px"
              });

              actionItem.find(".bubbleTips").find("i").css({
                  left: (actionItem.find(".bubbleTips").width() / 2) + 2 + "px"
              });
          }
      }

      // 隐藏提示
      function hideTips(actionItem) {
          actionItem.find(".bubbleTips").hide();
      }

  };
  //复制功能
  ToolsBar.prototype.partCopy = function() {
      var that = this;
      var client2 = new ZeroClipboard(document.getElementById("partcopy"));
      client2.on('copy', function(event) {
          var pNode = $(that.ueditor.document).find(".checkSelected");
          var html = $.partwechat._init(that.ueditor, pNode, true);
          event.clipboardData.setData("text/html", html);
          layui.use('layer', function() {
              var layer = layui.layer;
              layer.msg("复制成功");
          });
      })
  }

  // 设置下拉菜单的高度
  ToolsBar.prototype.setMenuHeight = function(className) {

      var that = this;
      var winH = $(window).height();
      if (winH - (that.$toolsBar_wrapper.height() + that.$toolsBar_wrapper.offset().top) > 350) {
          return false;
      }

      that.$toolsBar_wrapper.find("menu." + className).css({
          height: winH - (that.$toolsBar_wrapper.height() + that.$toolsBar_wrapper.offset().top) - 20 + "px",
          "overflow-y": "auto"
      });
  };
  //鼠标更改选区,监听color bgcolor fontsize的变化,生成对象
  ToolsBar.prototype.enevtListener = function() {
          var eventSelection = this.ueditor.selection.getStart();
          var attribute = {};
          var fontSize = getcurryStyle(eventSelection).fontSize;
          var color = getcurryStyle(eventSelection).color;
          var backgroundColor = getcurryStyle(eventSelection).backgroundColor;
          var justify = getcurryStyle(eventSelection).textAlign;
          var fontStyle = getcurryStyle(eventSelection).fontStyle;
          var fontWeight = getcurryStyle(eventSelection).fontWeight;
          var textDecoration = getcurryStyle(eventSelection).textDecoration == "none" ? $(eventSelection).parents("span:first").css("text-decoration") : getcurryStyle(eventSelection).textDecoration;
          var lineHeight = getcurryStyle(eventSelection).lineHeight;
          attribute = {
              fontSize: fontSize,
              color: color,
              backgroundColor: backgroundColor,
              textAlign: justify,
              fontStyle: fontStyle,
              fontWeight: fontWeight,
              textDecoration: textDecoration,
              lineHeight: lineHeight
          };
          this.writeBack(attribute);
          // var ohead = $(document.getElementById("ueditor_0").contentWindow.document).find("head");
          // document.getElementsByTagName('head')[0].innerHTML=document.getElementsByTagName('head')[0].innerHTML+"js脚本";
          // var iframe = document.frames ? document.frames["ueditor_0"] : document.getElementById("ueditor_0");
          // var ifWin = iframe.contentWindow || iframe;
          // console.log(ifWin.getSelection().toString());
          //  var ele = this.ueditor.domUtils.createElement( document, 'style', {
          // 	id: 'test'
          // } );
          // ohead.append("<style>.transparentSelection::selection {background:maroon; color:#fff;} .transparentSelection::-moz-selection {background:maroon; color: #fff;}.transparentSelection::-webkit-selection {background: maroon;color: #fff;}</style > ");
          // $(eventSelection).addClass("transparentSelection");
      }
      //将监听到的信息反写到bar
  ToolsBar.prototype.writeBack = function(attribute) {
          //字号
          $("#setFontSize").val(parseInt(attribute.fontSize));
          //对齐方式
          if (attribute.textAlign != "left" && attribute.textAlign != "right" && attribute.textAlign != "center" && attribute.textAlign != "justify") {
              attribute.textAlign = "left";
          }
          $(".operation-item a[data-act=set-font-align-" + attribute.textAlign + "]").css("background", "rgba(32,160,255,0.6)");
          //是否斜体
          if (attribute.fontStyle == "italic") {
              $(".operation-item a[data-act=set-font-italic]").css("background", "rgba(32,160,255,0.6)");
          }
          //划线
          if (attribute.textDecoration == "line-through") {
              $(".operation-item a[data-act=set-font-strikethrough").css("background", "rgba(32,160,255,0.6)");
          } else if (attribute.textDecoration == "underline") {
              $(".operation-item a[data-act=set-font-underline").css("background", "rgba(32,160,255,0.6)");
          }
          //是否粗体
          if (attribute.fontWeight == "bold" || attribute.fontWeight > 400) {
              $(".operation-item a[data-act=set-font-bold]").css("background", "rgba(32,160,255,0.6)");
          }
          //默认字体颜色
          $(".colorPicker-alone-font-color").css({ "background-color": attribute.color });
          //默认背景颜色
          if (attribute.backgroundColor == "rgba(0, 0, 0, 0)") {
              $(".colorPicker-alone-font-bg-color").css({ "background-color": "transparent", "background-image": "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)" });
          } else {
              $(".colorPicker-alone-font-bg-color").css({ "background-color": attribute.backgroundColor });
          }
          //行间距
          if (attribute.lineHeight.substr(-2, 2) == "em") {
              var lineHeight = parseFloat(attribute.lineHeight);
          } else if (attribute.lineHeight.substr(-2, 2) == "px") {
              var lineHeight = parseFloat(attribute.lineHeight) / parseFloat(attribute.fontSize);
          } else if (attribute.lineHeight.substr(-2, 3) == "rem") {
              var lineHeight = parseFloat(attribute.lineHeight) / 16;
          } else {
              var lineHeight = parseFloat(attribute.lineHeight);
          }
          $("#setLineHeight").val(lineHeight);
      }
      // ue: ueditor编辑器对象
  $.fn.materialToolsBar = function(ue) {

      var toolsBar = new ToolsBar();
      toolsBar.ueditor = ue;
      toolsBar.material = $(this);

      toolsBar.init();
  }

  // 工具函数
  function tools_fun() {

      return {
          // 获得随机数
          GetRandomNum: function(Min, Max) {
              var Range = Max - Min;
              var Rand = Math.random();
              return (Min + Math.round(Rand * Range));
          },

          array_unique: function(array) {
              var n = {},
                  r = []; //n为hash表，r为临时数组
              for (var i = 0; i < array.length; i++) { //遍历当前数组
                  if (!n[array[i]]) { //如果hash表中没有当前项
                      n[array[i]] = true; //存入hash表
                      r.push(array[i]); //把当前数组的当前项push到临时数组里面
                  }
              }
              return r;
          }
      }
  };

  function getcurryStyle(oEl) {
      var oStyle = oEl.currentStyle ? oEl.currentStyle : window.getComputedStyle(oEl, false);
      return oStyle;
  }
  //十六进制颜色值域RGB格式颜色值之间的相互转换

  //-------------------------------------
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /*RGB颜色转换为16进制*/
  String.prototype.colorHex = function() {
      var that = this;
      if (that.indexOf(",") >= 0) {
          var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
          var strHex = "";
          for (var i = 0; i < aColor.length; i++) {
              var hex = Number(aColor[i]).toString(16);
              if (hex === "0") {
                  hex += hex;
              }
              strHex += hex;
          }
          if (strHex.length !== 6) {
              strHex = that;
          }
          return strHex;
      } else if (reg.test(that)) {
          var aNum = that.replace(/#/, "").split("");
          if (aNum.length === 6) {
              return that;
          } else if (aNum.length === 3) {
              var numHex = "#";
              for (var i = 0; i < aNum.length; i += 1) {
                  numHex += (aNum[i] + aNum[i]);
              }
              return numHex;
          }
      } else {
          return that;
      }
  };

  //-------------------------------------------------

  /*16进制颜色转为RGB格式*/
  String.prototype.colorRgb = function() {
      var sColor = this.toLowerCase();
      if (sColor && reg.test(sColor)) {
          if (sColor.length === 4) {
              var sColorNew = "#";
              for (var i = 1; i < 4; i += 1) {
                  sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
              }
              sColor = sColorNew;
          }
          //处理六位的颜色值
          var sColorChange = [];
          for (var i = 1; i < 7; i += 2) {
              sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
          }
          return "RGB(" + sColorChange.join(",") + ")";
      } else {
          return sColor;
      }
  };
})(jQuery)