<template>
  <div class="editor-left">
    <mu-paper class="material-menu">
      <div class="material-nav">
        <div class="nav-btn" v-for="item in navList" :key="item.index" @click="currNav = item.index" :class="{'active' : item.index == currNav}">
          <i class="material-icons">{{item.icon}}</i>
          <span>{{item.title}}</span>
        </div>
      </div>
      <div class="material-container" id="material-container">
        <material-item v-for="item in renderList" :key="item.id" :html="item.html" :datas="item" />
      </div>
    </mu-paper>
  </div>
  
</template>

<script>
import MaterialItem from "../components/BaseMaterialContainer";
let id = 1000;
export default {
  data() {
    return {
      open: true,
      currNav: 8,
            renderList: [
        {
          html: `
              <section class="KolEditor">
               <meta http-equiv="Content-Type" content="text/html; charset=utf-8"><section><section class="KolEditor"><section style="margin:10px auto;text-align:center;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114416004a5458a0647d47d47e6434eb1c7a01.jpeg" style="max-width:100%;margin:0px auto;" class="KolImg"></section></section><section class="KolEditor" style="position: relative;"><section style="margin:10px auto;text-align:center;width: 250px;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114415f1d997ceed4cba273431e720ee6f998b.png" style="max-width:100%;margin:0px auto;" class="KolImg"></section></section><section class="KolEditor" style="position: relative;"><section style="margin:10px auto;text-align:center;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114414b9c3853f4d12a59b2210785311f2e8a4.png" style="max-width:100%;margin:0px auto;" class="KolImg"></section></section><section class="KolEditor" style="position: relative;"><section style="margin: 10px auto;display: flex;justify-content: center;align-items: center;"><section style="width: 25px;transform: rotate(0deg);background-color: #fff;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/11441500dec80da2513a78754579e58fde91db.png" style="max-width:100%;margin:0px auto;"></section><section style="border: 1px solid #3fab24;padding: 5px;margin: 0px -12px;"><p style="border-top: 1px solid #3fab24;border-bottom: 1px solid #3fab24;font-size: 16px;line-height: 1.5;margin: 0px;padding: 0px 15px;">小暑</p>
                    </section><section style="width: 25px;background-color: #fff;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114415d5de3278a588f0d96ebdb7c4fb8e471e.png" style="max-width:100%;margin:0px auto;"></section></section></section><section class="KolEditor" style="position: relative;"><section style="margin: 10px auto;display: flex;justify-content: center;align-items: flex-start;"><section style="width: 40px;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/11441571923a94f39e1cd15b8886a82a6c9a8f.png" style="max-width:100%;margin:0px auto;"></section><section style="border-top: 1px solid #3fab24;padding-top: 10px;flex: 1;"><section style="border-top: 1px solid #3fab24;padding: 10px;"><p style="margin: 0px;font-size: 15px;line-height: 1.8;color: #3c3c3c;">小暑(Lesser Heat)，二十四节气之第十一节气，每年7月7日或8日视太阳到达黄经105°时为小暑；暑，表示炎热的意思，小暑为小热，还不十分热。意指天气开始炎热，但还没到最热，全国大部分地区基本符合。全国的农作物都进入了茁壮成长阶段，需加强田间管理。</p>
                        </section></section><section style="width: 40px;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/1144153ee2bf9b525e9f82bc085cd8bfaf4b4b.png" style="max-width:100%;margin:0px auto;"></section></section></section><section class="KolEditor"><section style="margin: 10px auto;border: 1px dashed #3fab24;padding: 8px;"><section style="display: flex;justify-content: space-between;"><section><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114414eab5b7abe4047bcde3e1b023027c18a5.png" style="max-width:100%;margin:0px auto;"></section><section><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/11441420db1de2d925d068501aa3ed1edf53f2.png" style="max-width:100%;margin:0px auto;"></section></section><section style="border-left: 1px dashed #3fab24;border-right: 1px dashed #3fab24;padding: 0px 20px;margin: 0px 8px;"><p style="margin: 0px;font-size: 15px;line-height: 1.8;color: #3c3c3c;">每年7月7日或8日视太阳到达黄经105°时为小暑（slight heat）。《月令七十二候集解》：“六月节……暑，热也，就热之中分为大小，月初为小，月中为大，今则热气犹小也。”暑，表示炎热的意思，小暑为小热，还不十分热。意指天气开始炎热，但还没到最热，全国大部分地区基本符合。</p>
                    </section><section style="display: flex;justify-content: space-between;"><section><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114414e08fef9e36248573919a633c486726fb.png" style="max-width:100%;margin:0px auto;"></section><section><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114414cc44289f59b6702f5536acf17c537059.png" style="max-width:100%;margin:0px auto;"></section></section></section></section><section class="KolEditor"><section style="margin:10px auto;text-align:center;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/1144152a88bef6c23571c084e93a04e4b278b7.png" style="max-width:100%;margin:0px auto;" class="KolImg"></section></section><section class="KolEditor"><section style="margin: 10px auto;background-image:url(http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/1144121fea3b1e56fcdf7ff6bf6cc7c7e77263.png);background-repeat: no-repeat;background-size: auto 100%;height: 45px;background-position: center;"><p style="margin: 0px;font-size: 20px;text-align: center;color: #fff;line-height: 45px;letter-spacing: 2px;padding-left: 6px;">小暑农事</p>
                </section></section><section class="KolEditor"><section style="margin: 10px auto;background-image:url(http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/1144126a674326218983a179fa2498e4c3a0cd.png);background-repeat: no-repeat;background-size: auto 100%;height: 45px;background-position: center;"><p style="margin: 0px;font-size: 20px;text-align: center;color: #3fab24;line-height: 45px;letter-spacing: 2px;padding-left: 6px;">01</p>
                </section></section><section class="KolEditor"><section style="margin: 10px;display: flex;align-items: center;"><section style="flex: 1;padding-top: 10px;background-image:url(http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/1144124840260c0b1dd559b9b14983d5444ffe.jpeg);background-repeat: no-repeat;"><section style="margin-left: -10px;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114415d170988699c36e6d2b0c4e3e40a3a827.jpeg" style="max-width:100%;margin:0px auto;vertical-align: bottom" class="KolImg"></section></section><section style="flex: 1;padding-left:10px; "><p style="margin: 0px;font-size: 15px;line-height: 1.8;color: #3c3c3c;">立足抗灾夺丰收，防涝抗旱两打算。 夏播作物间定苗，追肥治虫狠锄田。 春苗中耕带培土，防治病虫严把关。 棉花进入花铃期，修治追耪酌情灌。</p>
                    </section></section></section><section class="KolEditor"><section style="margin:10px auto;display: flex;flex-direction: column;align-items: flex-end;"><section style="width: 150px;height: 150px;border-radius: 50%;overflow: hidden;transform: rotate(0deg);"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/11441537ba0daafdd234457909c8ce13fe1d77.jpeg" style="max-width:100%;margin:0px auto;vertical-align: bottom" class="KolImg"></section><section style="border-top: 1px solid #3fab24;display: flex;align-items: flex-start;margin-top: -40px;"><section style="flex: 1;padding-top: 20px;padding-right: 50px;padding-left: 10px;"><p style="margin: 0px;font-size: 15px;line-height: 1.8;color: #3c3c3c;">雨季造林好时机，精细认真管果园，冬修榆树夏修桑，修整白杨于伏天。村村户户沤绿肥，肥堆如山麦增产。</p>
                        </section><section style="width: 70px;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114415c32d7c2ac81f614376ddcdc48c3eda9d.png" style="max-width:100%;margin:0px auto;vertical-align: bottom"></section></section></section></section><section class="KolEditor"><section style="margin:10px auto;"><section style="margin: 0px auto;background-image:url(http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/11441307d8050902e5b3e704b8d925aa9af355.png);background-repeat: no-repeat;background-size: 210px auto;height: 155px;box-sizing: border-box;padding-top: 15px;background-position: center top;"><section style="width: 120px;overflow:hidden;margin: 0px auto;border-radius: 6px;overflow: hidden;"><img src="http://kol-statics.oss-cn-beijing.aliyuncs.com/editor/114415d9dea106ff0284482dcc9f62d8a0e415.jpeg" style="max-width:100%;vertical-align:bottom; " class="KolImg "></section></section></section></section></section></section>`
        ,id:1,
        IfSystem:1,
        Cover:'http://editor-statics.oss-cn-beijing.aliyuncs.com/template/20180813/1534155945301107.jpeg',
        IsVip:1,
        IsCollect:1,
        }
      ],
      navList: [
        {
          title: "热门",
          icon: "subtitles",
          index: 8
        },
        {
          title: "标题",
          icon: "subtitles",
          index: 1
        },
        {
          title: "正文",
          icon: "text_format",
          index: 2
        },
        {
          title: "图文",
          icon: "texture",
          index: 3
        },
        {
          title: "关注",
          icon: "favorite",
          index: 4
        },
        {
          title: "分隔符",
          icon: "airline_seat_individual_suite",
          index: 5
        },
        {
          title: "二维码",
          icon: "dashboard",
          index: 6
        },
        {
          title: "交互",
          icon: "people_outline",
          index: 7
        }
      ]
    };
  },
  methods: {},
  computed: {},
  components: {
    MaterialItem
  }
};
</script>

<style  lang="scss" scoped>
@charset "UTF-8";
/* 左边导航 */
.editor-left {
  position: absolute;
  left: 0px;
  width: 460px;
  height: 100%;
  background-color: #232323;
  .material-nav {
    user-select: none;
    font-size: 12px;
    position: absolute;
    left: 0;
    top: 0;
    width: 60px;
    bottom: 0;
    background: #272c33;
    border-right: 1px solid #151515;
    .nav-btn {
      height: 60px;
      width: 60px;
      text-align: center;
      line-height: 60px;
      position: relative;
      color: #fff;
      cursor: pointer;
      font-family: "PingFangSC-Regular";
      &.feedBack {
        position: absolute;
        bottom: 20px;
      }
      i {
        position: absolute;
        font-size: 17px;
        top: 16px;
        left: 50%;
        transform: translateX(-50%);
      }
      span {
        position: absolute;
        top: 15px;
        left: 50%;
        transform: translateX(-50%);
        white-space: nowrap;
      }
      &.active {
        background: #232323;
        color: #7e57c2;
      }
      &:hover {
        color: #7e57c2;
      }
    }
  }
  .material-container {
    padding: 20px;
    // background: #3f4652;
    box-sizing: border-box;
    position: absolute;
    width: 360px;
    left: 80px;
    overflow: auto;
    height: calc(100% - 60px);
  }
}
</style>
