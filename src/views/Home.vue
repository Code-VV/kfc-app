<template>
  <div class="home container_common1 bold">
    <header-home
      class="headers"
      :style="{ paddingTop: safeTop + 'px' }"
      :languageShow="false"
    >
    </header-home>
    <!-- <section class="home_content"> -->
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      class="home_content"
      @init="mescrollInit"
    >
      <!-- 首页轮播 -->
      <van-swipe :autoplay="3000" indicator-color="white" class="banner">
        <van-swipe-item v-for="(item, i) in bannerList" :key="i">
          <!-- <van-image :src="item.bannerUrl" class="imgs" /> -->
          <van-image :src="item.bannerUrl" class="imgs" />
          <!-- <van-image  src="https://img.yzcdn.cn/vant/cat.jpeg" class="imgs"/> -->
          <!-- <img :src="item.bannerUrl" alt srcset class="imgs" /> -->
        </van-swipe-item>
      </van-swipe>
      <!-- 公告 -->
      <div class="notice" id="noticeItem" @click="toNoticeList">
        <van-swipe
          vertical
          :touchable="false"
          :show-indicators="false"
          class="noticeDetail"
          :autoplay="3000"
        >
          <img src="" alt="" />
          <van-swipe-item
            v-for="(item, i) in noticeList"
            :key="i"
            class="eils c222"
            >{{ item.title }}</van-swipe-item
          >
        </van-swipe>
      </div>
      <!-- <router-link to="/contract">
        <div class="activitys" name="activity">
          <img src="@/assets/images/home/registerPic.png" alt />
        </div>
      </router-link> -->
      <div class="darkLine mar_t_10"></div>
      <!--交易对信息-->
      <div class="marketList">
        <van-swipe
          class="marketListDetail pad_t_15"
          :class="pairsList.length > 1 ? 'pad_b_20' : 'pad_b_15'"
        >
          <van-swipe-item v-for="(item, i) in pairsList" :key="i">
            <div
              v-for="(items, k) in item"
              :key="k"
              class="marketItem"
              @click="goQuotesDetail(items.pairsName)"
            >
              <div class="name font1 c222">{{ items.pairsName }}</div>
              <span
                class="price font1 bold mar_t_3"
                :class="
                  items.updown > 0
                    ? 'green_text'
                    : items.updown == 0
                    ? 'dark_text'
                    : 'orange_text'
                "
                >{{ items.price | SubString(4) }}</span
              >
              <span
                class="increasement mar_t_4"
                :class="
                  items.updown > 0
                    ? 'green_text'
                    : items.updown == 0
                    ? 'dark_text'
                    : 'orange_text'
                "
                >{{ items.updown > 0 ? "+" : items.updown == 0 ? "" : ""
                }}{{ (items.updown * 100) | SubString(2) }}%</span
              >
              <span v-if="qh" class="payment mar_t_4 c999"
                >≈ {{ items.price | SubString(2) }}USD</span
              >
              <span v-else class="payment mar_t_4 c999"
                >≈ {{ items.chPrice | SubString(2) }}CNY</span
              >
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <div class="darkLine"></div>
      <!-- 帮助中心 -->
      <div class="missionCenter">
        <!-- <div class="top">
    
          <div class="leftCenter" @click="coinCharging">
            <div class="text">
              <h3 class="h3 c333">{{ i18n.kjmb }}</h3>
              <p class="p c999">{{ i18n.zhbz }}</p>
            </div>
            <div class="imgs">
              <img src="@/assets/images/home/task.png" alt />
            </div>
          </div>
          <div class="right">
            <div class="rightItem" @click="goBuy">
              <div class="imgs">
                <img src="@/assets/images/home/quickCash.png" alt />
              </div>
              <p class="p c222">{{ i18n.kscb }}</p>
            </div>
            <div class="mlines"></div>
            <div class="rightItem" @click="goHelpCenter">
              <div class="imgs">
                <img src="@/assets/images/home/guide.png" alt />
              </div>
              <p class="p c222">{{ i18n.bzzx }}</p>
            </div>
          </div>
        </div> -->
        <van-grid :border="false" :column-num="4" class="top">
          <van-grid-item @click="coinCharging">
            <img src="@/assets/images/home/cz.png" alt="" />
            <span>{{ i18n.cz }}</span>
          </van-grid-item>
          <van-grid-item @click="goShens">
            <img src="@/assets/images/home/shens.png" alt="" />
            <span>{{ i18n.shens }}</span>
          </van-grid-item>
          <van-grid-item @click="goNiuxiong">
            <img src="@/assets/images/home/niux.png" alt="" />
            <span>{{ i18n.niux }}</span>
          </van-grid-item>
          <van-grid-item @click="assets">
            <img src="@/assets/images/home/shan.png" alt="" />
            <span>{{ i18n.sd }}</span>
          </van-grid-item>
          <van-grid-item @click="transaction">
            <img src="@/assets/images/home/jiao.png" alt="" />
            <span>{{ i18n.jy }}</span>
          </van-grid-item>
          <van-grid-item @click="gohuan">
            <img src="@/assets/images/home/huan.png" alt="" />
            <span>{{ i18n.hxtl }}</span>
          </van-grid-item>
          <van-grid-item @click="goRealname">
            <img src="@/assets/images/home/qihuo.png" alt="" />
            <span>{{ i18n.qihuo }}</span>
          </van-grid-item>
          <van-grid-item @click="toNoticeList">
            <img src="@/assets/images/home/gong.png" alt="" />
            <span>{{ i18n.gg }}</span>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="darkLine"></div>

      <!-- 涨幅度 成交额榜 -->
      <div class="lists">
        <div class="tabList bor_b">
          <span
            class="items"
            v-for="(item, i) in tabList"
            :key="i"
            :class="{ cur: curType == item.type }"
            @click="switchTab(item.type)"
          >
            {{ item.name }}
            <i class="borders"></i>
          </span>
        </div>
        <div class="listDetail">
          <van-row gutter="20" class="tops flex c999">
            <van-col span="8">
              <span class="leftBox flex a"
                >{{ i18n.mc }} </span>
            </van-col>
            <van-col span="8">
              <span v-if="curType == 'UPDOWN'" class="flex flex_center a"
                >{{ i18n.zxj }} </span>
              <span v-else-if="qh" class="flex flex_center a"
                >{{ i18n.zxj }} USD </span>
              <span v-else class="flex flex_center a"
                >{{ i18n.zxj }} CNY
              </span>
            </van-col>
            <van-col span="8">
              <span class="flex flex_end" v-if="curType == 'VOLUME'">{{
                i18n.xjl24h
              }}</span>
              <span class="flex flex_end a" v-else
                >{{ i18n.zdf }} </span
              >
            </van-col>
          </van-row>
          <div class="listContent">
            <div v-for="(item, i) in quotationsList" :key="i">
              <ListItem
                :n="i"
                :type="curType"
                :list="item"
                :l="quotationsList.length"
                :qh='qh'
              ></ListItem>
            </div>
          </div>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import ListItem from "../components/listItem";
import headerHome from "../components/headerHome";
import TabBar from "../components/TabBar"; // tabbar

var set, set1;
export default {
  name: "home",
  components: {
    ListItem,
    headerHome,
    TabBar,
  },
  computed: {
    safeTop() {
      return this.$store.state.safeAreaTop;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    tabList() {
      return [
        {
          name: this.i18n.zfb,
          type: "UPDOWN",
        },
        {
          name: this.i18n.cjeb,
          type: "VOLUME",
        },
        {
          name: this.i18n.xbb,
          type: "PROJECT",
        },
      ];
    },
    i18n() {
      return this.$t("home");
    },
  },

  data() {
    return {
      qh: "",
      mescroll: null, // mescroll实例对象
      // bannerList: ['https://biyan888.oss-cn-beijing.aliyuncs.com/img/68140be0a0023e1c302631ece78db3a.jpg','https://biyan888.oss-cn-beijing.aliyuncs.com/img/c08434eaa37c115b21466eb8ef93c62.jpg'], //轮播图列表
      bannerList: [], //轮播图列表
      activeName: "gain", //当前tab所在项，gain涨幅榜t;urnover成交额榜;newCurrency新币榜
      noticeList: [], //公告列表
      quotationsList: [], //行情列表
      curType: "UPDOWN",
      pairsList: [], //交易对列表
      mescrollDown: {
        offset: 46,
        callback: this.downCallback,
        textInOffset: this.$t("add.xlsx"),
        textOutOffset: this.$t("add.sfgx"),
        textLoading: this.$t("add.jzz"),
        auto: false,
        //是否在初始化完毕之后自动执行下拉回调callback; 默认true
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
    };
  },
  activated() {
    this.init();
    this.getBanner(); //轮播图
    this.getNotice(); //公告列表
    this.getPairList(); //行情列表
    this.getPairsByMainCur();
  },
  deactivated() {
    this.setnavBarShowRight(false);
    if (set) {
      clearTimeout(set);
    }
    if (set1) {
      clearTimeout(set1);
    }
  },
  created() {
    this.SET_THEMEINFO("night");
    this.setStatusBar("light");
  },
  methods: {
    ...mapMutations(["SET_THEMEINFO", "setStatusBar"]),
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setCurrency",
      "setPairsName",
      "setPairsName1",
      "setnavBarShowRight",
    ]),
    init() {
      this.setbackRouter("");
      this.setnavBarState(false);
      this.settabBarState(true);
      this.setnavBarArrow(false);
      this.setnavBarShowRight(true);
      this.setCurrency("");
      this.qh = this.$store.state.qh;
      console.log(this.qh);
    },
    //环形套利
    gohuan() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: "/activity",
      });
    },
    // 跳转公告列表
    toNoticeList() {
      this.$router.push({
        path: "/noticeList",
      });
    },
    // 初始化页面
    getBanner() {
      let data = {
        bannerType: "DATA_BANNER", //DATA_BANNER主页,WEL_BANNER邀请返佣,PROJECT_BANNER项目方
        global: "CHINESE_SIM",
      };
      //获取轮播图
      this.$get("data/data/getBanners", data).then((res) => {
        if (res && res.status == "SUCCEED") {
          this.bannerList = res.result || [];
        }
      });
    },
    //公告列表
    getNotice() {
      let data = {
        noticeType: "OFFICIAL",
        global: "CHINESE_SIM",
      };
      //获取公告列表
      this.$get("data/data/getNotices", data).then((res) => {
        if (res && res.status == "SUCCEED") {
          this.noticeList = res.result || [];
        }
      });
    },
    //行情列表
    getPairList() {
      let data = {
        getCoinType: this.curType, //DATA_BANNER主页,WEL_BANNER邀请返佣,PROJECT_BANNER项目方
      };
      //获取详情列表
      this.$get("data/data/getIndexCoin", data).then((res) => {
        if (res && res.status == "SUCCEED") {
          this.quotationsList = res.result || [];
        }
        console.log( this.quotationsList);
        set = setTimeout((res) => {
          this.getPairList();
        }, 5000);
      });
    },
    //行情tab切换
    switchTab(type) {
      console.log(type);
      if (type == this.curSubType) {
        return;
      }
      this.curType = type;
      if (set) {
        clearTimeout(set);
      }
      this.getPairList();
    },
    //好友邀请
    goInvitation() {
      this.show = false;
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: `/invitation`,
      });
    },
    //获取交易对列表
    getPairsByMainCur() {
      let pairsList = [];
      this.$get("/data/data/getPairsByMainCur", {
        mainCur: "USDT",
        type: "SPOT",
      }).then((res) => {
        console.log(res);
        if (res && res.status == "SUCCEED" && res.result) {
          res.result.map((item, i) => {
            if (i < 4) {
              var page = Math.floor(i / 3);
              if (!pairsList[page]) {
                pairsList[page] = [];
              }
              pairsList[page].push(item);
            }
          });
          this.pairsList = pairsList;
          console.log(this.pairsList);
        }
        set1 = setTimeout((res) => {
          this.getPairsByMainCur();
        }, 5000);
      });
    },
    //交易
    transaction() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: "/transaction",
      });
    },
    //闪兑
    assets() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: "/transaction",
      });
    },
    //充币
    coinCharging() {
      if (!this.$util.isLogin()) {
        return;
      }
      // window.open(
      //   "http://kf.5621a.cn/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=1&groupid=0&special=1",
      //   "_blank"
      // );
      this.$router.push({
        path: `/assets/coinCharging`,
      });
    },
    //帮助中心
    goHelpCenter() {
      // if (!this.$util.isLogin()) {
      //   return;
      // }
      this.$router.push({
        path: `/assets/withdrawCoin`,
      });

      // // 打开新页面
      // api.openWin({
      //     name: "helpFrame",
      //     url: "https://fvexsupport.zendesk.com/hc/zh-cn",
      //     bgColor: "#fff"
      // });
      // api.execScript({
      //     //在指定页面中执行srcipt中脚本
      //     name: "helpFrame", //打开外部网页的Win名
      //     script: "api.historyBack(function(ret, err) {if (!ret.status) {api.closeWin();}});"
      // }); //要执行的脚本字符串
    },
    //神兽
    goShens() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: `/shenshou`,
      });
    },
    // 买币
    goBuy() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: `/assets/coinCharging`,
      });
      // this.Toast("敬请期待");
    },
    //期货
    goRealname() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.show = false;

      this.$router.push({
        path: `/contract`,
      });
    },
    // 牛熊大战
    goNiuxiong() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.show = false;
      this.$router.push({
        path: `/qiquan/Entrance`,
      });
    },
    //行情详情
    goQuotesDetail(name) {
      this.setPairsName1(name);

      this.$router.push({
        // path: `/quotes/quotesDetail?id=${id}`
        path: `/quotes/quotesDetail`,
        query: {
          type: this.$no_bb ? "contract" : "bibi",
        },
      });
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    //下拉刷新
    downCallback() {
      this.getBanner(); //轮播图
      this.getNotice(); //公告列表
      setTimeout((res) => {
        this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
      }, 1000);
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.home {
  @include base-background();
  font-family: "JDZY";
  .banner {
    .van-swipe__indicator {
      width: 3px;
      height: 3px;
      border-radius: 50%;
      margin-right: 4px;
    }

    .van-swipe__indicator--active {
      width: 7px;
      height: 2px;
      border-radius: 6px;
    }

    img {
      border-radius: 6px;
      padding: 0 1px;
    }
  }

  .marketList {
    .van-swipe__indicator {
      width: 11px;
      height: 2px;
      border-radius: 2px;
    }
  }

  .lists {
    .van-tabs__line {
      background-color: #07dec6;
      height: 2px;
    }

    .van-tab--active {
      color: #07dec6;
    }
  }
}
</style>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  font-family: "JDZY";
  .activitys {
    height: 55px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .footerBox {
    margin: 0 -15px;
    width: auto;
  }

  .headers {
    width: 100%;
  }

  .home_content {
    margin: 0 -15px;
    padding: 0 15px;
    flex: 1;
    overflow-y: auto;
  }

  .banner {
    width: 100%;
    height: 145px;
    border-radius: 6px;

    .imgs {
      width: 100%;
      height: 100%;
      border-radius: 6px;
      padding-left: 15px;
    }
  }

  .notice {
    padding: 12px 0;

    // border-bottom: 1px solid rgba(227, 227, 227, 0.2);
    .noticeDetail {
      height: 22px;
      line-height: 24px;
      padding-left: 24px;
      background: url(../assets/images/home/noticePic.png) no-repeat 0 center;
      background-size: 14px 14px;

      .van-swipe-item {
        width: 100% !important;
        font-size: 12px;
      }
    }
  }

  .tabList {
    display: flex;
    font-size: 14px;
    color: #666666;
    justify-content: space-between;
    padding: 0 15px;

    // border-bottom: 1px solid rgba(227, 227, 227, 0.2);
    .items {
      padding: 15px 0;
      position: relative;
      flex: 1;
      text-align: center;

      .borders {
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%);
        width: 37px;
        height: 2px;
        background: transparent;
        border-radius: 2px;
      }
    }

    .cur {
      color: #07dec6;
      font-weight: 500;

      .borders {
        background: #07dec6;
      }
    }
  }

  .marketList {
    margin: 0 -15px;

    .marketListDetail {
      min-height: 112px;

      .van-swipe__indicators {
        bottom: 10px;
      }

      .van-swipe-item {
        display: flex;

        .marketItem {
          display: flex;
          flex-direction: column;
          width: 33.3%;
          padding: 0 15px;
          align-items: center;

          .name {
            font-size: 13px;
          }

          .price {
            font-size: 16px;
          }

          .increasement {
            font-size: 11px;
          }

          .payment {
            font-size: 11px;
            text-align: center;
          }
        }
      }
    }
  }

  .missionCenter {
    // padding-bottom: 14px;
    .top {
      display: flex;

      align-items: stretch;
      width: 100%;

      // padding: 15px 0;

      /deep/.van-grid-item__content {
        background-color: #171e28;
        color: #fff;
        font-size: 13px;
        font-weight: 400;
        width: 86px;
      }
      span {
        margin-top: 10px;
        font-family: "JDZY";
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: center;
        width: 100%;
      }
    }

    .leftCenter {
      padding: 12px 8px 12px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex: 1;
      margin-right: 8px;
      border-right: 1px solid rgba(227, 227, 227, 0.2);

      .text {
        flex: 1;
        margin-right: 15px;
      }

      .imgs {
        width: 67px;
        height: 50px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .text {
        .h3 {
          font-size: 14px;
          font-weight: bold;

          white-space: nowrap;
        }

        .p {
          font-size: 11px;
          margin-top: 8px;

          white-space: nowrap;
        }
      }
    }

    .right {
      display: flex;
      justify-content: space-between;
      flex-direction: column;

      .mlines {
        width: 100%;
        height: 1px;
        background: rgba(227, 227, 227, 0.2);
      }

      .rightItem {
        display: flex;
        align-items: center;
        padding: 0 20px;

        .imgs {
          width: 17px;
          height: 17px;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .p {
          font-size: 14px;

          margin-left: 10px;
          white-space: nowrap;
        }
      }
    }
  }

  .lists {
    margin: 0 -15px;

    .listDetail {
      padding: 0 15px;

      .tops {
        padding-top: 15px;
        font-size: 11px;
      }
    }

    // .gain {
    //   .left_text {
    //     min-width: 65px;
    //   }
    // }
  }
}
.icons {
  display: flex;
  flex-direction: column;
  margin-left: 12px;
}

.icons::before {
  content: "";
  width: 0;
  height: 0;
  border-bottom: 5px solid #999;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}

.icons::after {
  content: "";
  width: 0;
  height: 0;
  border-top: 5px solid #999;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  margin-top: 2px;
}
.a {
  align-items: center;
}
</style>
