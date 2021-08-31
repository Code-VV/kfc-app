<template>
  <div class="wxscanline">
    <header class="headers flex header_custom" :style="{ paddingTop: safeTop+'px'}">
      <van-icon name="arrow-left" @click="back()" />
      <div class="titlesBox">相册</div>
      <span class="rightIcon size12 blue_text">闪关灯</span>
    </header>
    <section class="flex1 wxscanline_cont">
      <addfrm v-if="isShowAddfrm" />
    </section>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import util from "./../../assets/js/common";
import addfrm from "@/components/add_frm";
var FNScanner, headerH;
export default {
  components: {
    addfrm
  },
  computed: {
    safeTop() {
      return this.$store.state.safeAreaTop;
    }
  },
  watch: {},
  data() {
    return {
      isShowAddfrm: false //扫码线显示
    };
  },
  methods: {
    ...mapActions(["setnavBarState", "settabBarState"]),
    init() {
      this.setnavBarState(false);
      this.settabBarState(false);
    },
    //返回上一页
    back() {
      // 关闭扫码模块
      FNScanner.closeView();
      this.$router.go(-1);
    },
    fnOpenFNScanner() {
      var _this = this;
      _this.isShowAddfrm = true;

      setTimeout(res => {
        // 打开扫码模块
        FNScanner.openView(
          {
            autorotation: true,
            rect: {
              x: 0,
              y: headerH,
              w: api.frameWidth,
              h: api.frameHeight
            }
          },
          function(ret, err) {
            if (ret) {
              if (ret.eventType == "success" && ret.content != "") {
                // 扫码成功执行函数操作传值
                _this.fnOpenCouple(ret.content);
                return;
              }
              if (ret.eventType == "albumError") {
                if (!util.confirmPer("photos", "相机")) {
                  setTimeout(res => {
                    _this.back();
                  }, 300);
                  return;
                }
              }
              if (ret.eventType == "fail") {
                _this.Toast("扫码失败,请重新扫码");
                setTimeout(res => {
                  _this.back();
                }, 300);
                return;
              }
            } else {
              _this.Toast("扫码错误,请稍后再试");
              setTimeout(res => {
                _this.back();
              }, 300);
            }
          }
        );
      }, 500);
    },
    fnOpenCouple(content) {
      // console.log(content);
      window.sessionStorage.setItem("content", content); //扫码内容
      this.back(); //建议打开下一页我这块只是为了方便直接调用返回按钮   扫码成功之后必须关闭扫码模块  不然会出现多次扫码情况
    }
  },
  created() {
    this.init();
  },
  destroyed() {
    // 关闭扫码模块
    FNScanner.closeView();
    api.setStatusBarStyle({
      style: "dark"
    });
  },
  mounted() {
    headerH = document.querySelector(".headers").offsetHeight;
    FNScanner = api.require("FNScanner");

    //监听应用回到前台
    api.addEventListener(
      {
        name: "resume"
      },
      function(ret, err) {
        FNScanner.onResume();
      }
    );

    //监听应用回到后台
    api.addEventListener(
      {
        name: "pause"
      },
      function(ret, err) {
        FNScanner.onPause();
      }
    );
    api.setStatusBarStyle({
      style: "light"
    });
    this.fnOpenFNScanner();
  }
};
</script>
<style lang="scss">
.header_custom {
  height: 46px;
  .van-icon {
    position: absolute;
    left: 15px;
  }
}
</style>
<style lang="scss" scoped>
.headers {
  padding: 0 15px;
  align-items: center;
  position: relative;
  background: #222222;
  .titlesBox {
    display: flex;
    padding: 0 30px;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 18px;
    color: #fff;
    font-weight: 600;
  }
  .rightIcon {
    font-size: 14px;
    position: absolute;
    right: 15px;
  }
}
.wxscanline {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #23232d;
  display: flex;
  flex-direction: column;
  .wxscanline_cont {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
