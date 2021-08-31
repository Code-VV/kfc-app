<template>
  <!-- style="background-color:#fff;" -->
  <div
    id="app"
    v-cloak
    :data-theme="nowThemeInfo"
    :class="isNight=='night-theme'?'nightTheme':'dayTheme'"
  >
    <!-- <div class="in-maintenance" v-if="disableApp">
        维护中...
    </div>-->
    <noconnet
      v-if="noconnet"
      @refreshEvent="refreshs"
      :class="isNight=='night-theme'?'night_style':'day_style'"
    ></noconnet>
    <div
      style="height:100%"
      class="flex flex_column"
      :class="isNight=='night-theme'?'night_style':'day_style'"
    >
      <NavBar
        v-if="isNavBar"
        :isleftarrow="isNavArrow"
        :onClickLeft="toto"
        :onClickRight="clickHandle"
        :isShowRight="isShowRight"
        :bgColor="bgColor"
      ></NavBar>
      <section class="app_content" :style="{'margin-top':bgColor?'-4px':'0'}">
        <keep-alive>
          <router-view style="width:100%;overflow-y:auto" v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view style="width:100%;overflow-y:auto" v-if="!$route.meta||!$route.meta.keepAlive"></router-view>
      </section>

      <TabBar v-if="isTabBar"></TabBar>
      <update v-if="isUpdate" @updateClose="updateClose" />
      <coinPopup @closePopup="closePopup" :type="popupType" v-if="isShowPopup"></coinPopup>
      <headerPopup @closeHeadPopup="closeHeadPopup" v-if="isShowHeadPopup"></headerPopup>
      <reName v-if="isShowReName" @editeClose="editeClose" @setNickName="setNickName" />
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar"; // navbar
import TabBar from "./components/TabBar"; // tabbar
import noconnet from "./components/noconnet"; // tabbar
import update from "./components/update"; // 更新
import coinPopup from "./components/coinPopup";
import headerPopup from "./components/headerPopup";
import reName from "./components/reName";
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  components: {
    TabBar,
    NavBar,
    noconnet,
    update,
    coinPopup,
    headerPopup,
    reName,
  },
  data() {
    return {
      // 禁止使用app
      disableApp: true,
      noconnet: false,
      // 动画名称
      transitionName: "",
      isUpdate: false, //更新弹框
      isShowPopup: false,
      isShowReName: false, //设置昵称弹框
      popupType: "", //交易侧拉类型
      isShowHeadPopup: false, //首页个人中心侧拉
    };
  },
  computed: {
    ...mapState([
      "isNavBar",
      "isTabBar",
      "isNavFixed",
      "isNavArrow",
      "isShowRight",
      "bgColor",
      "nowThemeInfo",
    ]),
    isNight() {
      return this.$store.state.nowThemeInfo;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    safeBottom() {
      return this.$store.state.safeAreaBottom;
    },
    safeTop() {
      return this.$store.state.safeAreaTop;
    },
    statusBar() {
      return this.$store.state.statusBar; //状态栏颜色
    },
  },
  watch: {
    statusBar(val) {
      window.apiready = () => {
        if (val == "light") {
          api.setStatusBarStyle({
            style: "light",
            color: "rgba(0,0,0,0)",
          });
        } else if (val == "bg") {
          api.setStatusBarStyle({
            color: "rgba(0,0,0,.4)",
          });
        } else {
          api.setStatusBarStyle({
            style: "dark",
            color: "rgba(0,0,0,0)",
          });
        }
      };
    },
    isTabBar(val) {
      if (this.$test) {
        window.apiready = () => {
          api.sendEvent({
            name: "isTabBarEvent",
            extra: {
              isTabBar: this.isTabBar,
            },
          });
        };
      }
    },
  },
  methods: {
    ...mapActions([
      "setSafeAreaBottom",
      "setSafeAreaTop",
      "setShowHeadPopup",
      "setResetUserinfo",
    ]),
    toto() {
      // 跳转返回首页菜单显示
      let url = "";
      url = window.location.href.slice(
        window.location.href.indexOf("#") + 1
      );
      this.$router.go(-1);
      // console.log(url);
      if (url == "/personalCenter" || url == "/accountCenter" || url == "/setting" || url == "/payment" || url == "/customer" || url == "/about") {
        // console.log(1);
        this.isShowHeadPopup = true;
        this.setShowHeadPopup(true);
      }
    },
    //资金记录
    clickHandle() {
      // console.log(this.$store.state.navTitle);
      let title = this.$store.state.navTitle;
      if (title.indexOf("充币") != -1) {
        this.$router.push({
          path: `/assets/capitalRecords?type=coinCharging`,
        });
        return;
      }
      if (title.indexOf("提币") != -1) {
        this.$router.push({
          path: `/assets/capitalRecords?type=withdrawCoin`,
        });
        return;
      }
      this.$router.push({
        path: `/assets/capitalRecords?type=transfer`,
      });
    },
    refreshs() {
      this.noconnet = false;
    },
    //版本更新关闭
    updateClose() {
      this.isUpdate = false;
    },
    //关闭侧边栏
    closePopup() {
      this.isShowPopup = false;
    },
    //关闭昵称弹框
    editeClose() {
      this.isShowReName = false;
    },
    //昵称设置成功返回事件
    setNickName() {
      this.isShowReName = false;
      this.setResetUserinfo(1);
    },
    //关闭侧边栏
    closeHeadPopup() {
      this.isShowHeadPopup = false;
      this.setShowHeadPopup(false);
    },
  },
  created() {
    this.$hub.$on("showPopup", (res) => {
      this.popupType = res == 1 ? "contract" : "";
      this.isShowPopup = true;
    });
    this.$hub.$on("showHeadPopup", (res) => {
      this.isShowHeadPopup = true;
    });
    this.$hub.$on("showReName", (res) => {
      // console.log(res);
      this.isShowReName = true;
    });
  },
  mounted() {
    if (!this.$test) {
      window.apiready = () => {
        var systemType = api.systemType;
        this.isUpdate = true;
        api.sendEvent({
          name: "isTabBarEvent",
          extra: {
            isTabBar: this.isTabBar,
          },
        });
        this.noconnet =
          window.sessionStorage.getItem &&
          window.sessionStorage.getItem("noconnet") == true
            ? true
            : false;
        if (this.safeBottom <= 0) {
          this.setSafeAreaBottom(api.safeArea.bottom);
        }
        if (this.safeTop <= 20) {
          var top = api.safeArea.top;
          if (systemType == "ios") {
            // top -= 10;
            this.setSafeAreaTop(top);
          } else {
            this.setSafeAreaTop(top);
          }
        }
        // 修改状态栏颜色
        if (this.statusBar == "light") {
          api.setStatusBarStyle({
            style: "light",
            color: "rgba(0,0,0,0)",
          });
        } else if (this.statusBar == "bg") {
          api.setStatusBarStyle({
            color: "rgba(0,0,0,.4)",
          });
        } else {
          api.setStatusBarStyle({
            style: "dark",
            color: "rgba(0,0,0,0)",
          });
        }

        api.addEventListener(
          {
            name: "offline",
          },
          function (ret, err) {
            this.noconnet = true;
          }
        );
      };
      return;
    }

    var systemType = api.systemType;
    this.isUpdate = true;
    this.noconnet = api.connectionType == "none" ? true : false;
    if (this.safeBottom <= 0) {
      this.setSafeAreaBottom(api.safeArea.bottom);
    }
    if (this.safeTop <= 20) {
      var top = api.safeArea.top;
      if (systemType == "ios") {
        // top -= 10;
        this.setSafeAreaTop(top);
      } else {
        this.setSafeAreaTop(top);
      }
    }
    // 修改状态栏颜色
    if (this.statusBar == "light") {
      api.setStatusBarStyle({
        style: "light",
        color: "rgba(0,0,0,0)",
      });
    } else if (this.statusBar == "bg") {
      api.setStatusBarStyle({
        color: "rgba(0,0,0,.4)",
      });
    } else {
      api.setStatusBarStyle({
        style: "dark",
        color: "rgba(0,0,0,0)",
      });
    }
  },
  activated() {},
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

* {
  user-select: none;
  -webkit-user-select: none;
}

input,
textarea {
  user-select: auto !important;
  -webkit-user-select: auto !important;
}

.nightTheme {
  .app_content {
    background: #272a3f;
  }

  .van-stepper__minus,
  .van-stepper__plus,
  .van-stepper__input {
    color: #fff !important;
  }
}

.headers {
  .van-icon {
    font-size: 20px;
  }
}

[v-cloak] {
  display: none !important;
}

*::-webkit-scrollbar {
  display: none;
}

.van-overlay {
  background: rgba(0, 0, 0, 0.5) !important;
}

.mescroll {
  width: auto !important;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // color: #2c3e50;
  // background: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .app_content {
    // @include base-background();
    // background: #272A3F;
    width: 100%;
    overflow-y: auto;
    flex: 1;
  }
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 450ms;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backface-visibility: hidden;
  perspective: 800;
}

.slide-right-enter {
  opacity: 1;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 1;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.in-maintenance {
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 99999;
  text-align: center;
  line-height: 100vh;
  font-size: 24px;
  color: #38bb96;
}
</style>
