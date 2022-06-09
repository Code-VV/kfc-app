<template>
  <div class="activity">
    <header
      class="header"
      :style="{ paddingTop: safeTop + 'px', height: 46 + safeTop + 'px' }"
    >
      <div class="header_custom">
        <div
          class="left"
          :class="isNight == 'night-theme' ? 'whiteIcons' : 'darkIcons'"
        >
          <van-icon name="arrow-left" @click="back()" />
        </div>
        <div class="center nav-title">{{ i18n.tldd }}</div>
      </div>
    </header>

    <!-- <img src="@/assets/images/activity/banner.png" alt="" class="banner" /> -->

    <div class="top">
      <div @click="bz(-1)" :class="{ action: -1 == active }" class="cen">
        {{i18n.zx}}
      </div>

      <div
        v-for="(v, k) in dataList"
        :key="k"
        class="cen"
        :class="{ action: k == active }"
        @click="bz(k)"
      >
        {{ v.currencyName }}
      </div>
    </div>
    <div class="shouyi">
      <div class="zr">
        <p class="p1">{{ totalsY }}</p>
        <p class="p2">{{ i18n.zrsy }}</p>
      </div>
      <div class="x"></div>
      <div class="lj">
        <p class="p1">{{ totals }}</p>
        <p class="p2">{{ i18n.ljsy }}</p>
      </div>
    </div>

    <div class="xiangqing" v-for="(v, k) in coinList" :key="k">
      <div class="top">
        <div class="name">{{ v.coin }}</div>
        <div class="zt">{{ v.status == 0 ? jxz : ywc }}</div>
      </div>
      <div class="centent">
        <div>
          <p class="text">{{ i18n.lj }}</p>
          <p class="num">{{ v.totalsNum*100 }}%</p>
        </div>
        <div>
          <p class="text">{{ i18n.qj }}</p>
          <p class="num" ref="day">{{ (v.ftime - v.ctime) / 86400000 }}天</p>
        </div>
        <div>
          <p class="text">{{ i18n.tlzl }}</p>
          <p class="num">{{ v.arbitrage }}</p>
        </div>
      </div>
      <div class="bot">
        {{ i18n.jysj }}：{{ v.ctime | formatDate }} {{ i18n.z
        }}{{ v.ftime | formatDate }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { hbmd5 } from "../../plugins/md5";
import $ from "jquery";
export default {
  name: "history",

  computed: {
    ...mapState(["nowThemeInfo"]),

    safeTop() {
      return this.$store.state.safeAreaTop;
    },
    isNight() {
      return this.$store.state.nowThemeInfo;
    },
    userId() {
      return this.$store.state.userId;
    },

    i18n() {
      return this.$t("activity");
    },
  },

  data() {
    return {
      jxz:this.$t("activity.jxz"),
      ywc:this.$t("activity.ywc"),
      active: -1,
      indexSel: -1,
      dataList: [],
      ctime: "",
      ftime: "",
      day: this.$refs.day,

      curType: 1,
      arbitrage: "",
      estimated: "",
      coinList: "",
      totalsY: this.$t("add.zwsy"),
      totals:this.$t("add.zwsy"),
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        offset: 46,
        callback: this.downCallback,
        textInOffset: this.$t("add.xlsx"),
        textOutOffset: this.$t("add.sfgx"),
        textLoading: this.$t("add.jzz"),
        auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
    };
  },
  mounted() {
    this.init();
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    },
  },
  watch: {
    day(v, k) {
    },
  },
  methods: {
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
      // this.setnavTitle("活动");
      this.setnavTitle("");
      this.setbackRouter("");
      this.setnavBarState(false);
      this.settabBarState(false);
      this.setnavBarArrow(false);
      this.setCurrency("");
      // this.getPeOrderList();
      setTimeout(() => {
        if (this.nowThemeInfo !== "night-theme") {
          document.querySelector(".nav-title").style.color = "#171E28";
        } else {
          document.querySelector(".nav-title").style.color = "#fff";
        }
      }, 100);
      this.$get("/entrust/arbirtage/getWealth", {}).then((res) => {
        this.dataList = res.result.wList;
        let params = {
          userId: this.$store.state.userId,
          coin: "1",
        };
        this.$get("/entrust/arbirtage/getCoinList", params).then((res) => {
          this.coinList = res.result.lists;
          for (let i = 0; i < this.coinList.length; i++) {
            this.arbitrage = this.coinList[i].arbitrage;
            this.ctime = this.coinList[i].ctime;
            this.ftime = this.coinList[i].ftime;
            this.day = (this.ftime - this.ctime) / 86400000;
            this.estimated = this.coinList[i].totalsNum * 100;
          }

          // if ((this.day = 7)) {
          //   let params2 = {
          //     coin: this.dataList[0].currencyName,
          //     // day: this.day,
          //     userId: this.$store.state.userId,
          //   };
          //   // 累计收益
          //   this.$get("/entrust/arbirtage/getTotalsNum", params2).then(
          //     (res) => {
          //       console.log(res);
          //       this.estimated = res.result.totals * 100;
          //     }
          //   );
          // }
        });
        // 累计总收益
        this.$get("/entrust/arbirtage/getTotals", params).then((res) => {
          if (res.result.totals == null) {
            this.totals = this.$t("add.zwsy");
          } else {
            this.totals = res.result.totals;
          }
        });
        this.$get("/entrust/arbirtage/getYesterday", params).then((res) => {
          if (!res.result.totalsY === 0) {
            this.totalsY = res.result.totalsY;
          }
        });
      });
    },

    // 获取列表
    // getPeOrderList() {
    //   this.$get(`/otc/ieo/peOrder?member=${this.userId}`).then((res) => {
    //     if (res.status === "SUCCEED") {
    //       this.dataList = res.result;
    //     } else {
    //       this.Toast(res.errorMessage);
    //     }
    //   });
    // },
    //返回上一页
    back() {
      this.$router.go(-1);
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },

    bz(a) {
      if (a == -1) {
      } else {
        this.active = a;
      }
      if (a == -1) {
      }
      this.coinList.length = 0;
      let params = {
        userId: this.$store.state.userId,
        coin: a != -1 ? this.dataList[a].currencyName : "1",
      };
      this.$get("/entrust/arbirtage/getCoinList", params).then((res) => {
        this.coinList = res.result.lists;
        for (let i = 0; i < this.coinList.length; i++) {
          this.arbitrage = this.coinList[i].arbitrage;
          this.ctime = this.coinList[i].ctime;
          this.ftime = this.coinList[i].ftime;
          this.day = (this.ftime - this.ctime) / 86400000;
          this.estimated = this.coinList[i].totalsNum * 100;
        }
      });
      this.active = a;
      this.$get("/entrust/arbirtage/getTotals", params).then((res) => {
        if (res.result.totals == null) {
          this.totals = this.$t("add.zwsy");
        } else {
          this.totals = res.result.totals;
        }
      });
      this.$get("/entrust/arbirtage/getYesterday", params).then((res) => {
        if (!res.result.totalsY === 0) {
          this.totalsY = res.result.totalsY;
        }
      });
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

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";
.action {
  background-color: #169e78;
  font-family: "JDZY";
}
.activity {
  @include base-background();
  .item-list {
    .item {
      border-bottom: 1px solid #efefef;
      width: 100vw;
      margin-left: -15px;
      padding: 0 15px;

      .row {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        font-size: 14px;

        .label {
          font-size: 12px;
        }

        .time {
          font-size: 12px;
        }
      }

      .row-start {
        margin: 10px 0;
        font-size: 14px;
        display: flex;
        justify-content: flex-start;

        .label {
          font-size: 12px;
        }
      }
    }
  }

  .header {
    position: relative;
    width: 100%;
    background: #171e28 !important;
    .header_custom {
      width: 100%;
      position: fixed;
      left: 0;
      background: #171e28 !important;
      .left {
        width: 100%;
        height: 46px;
        font-size: 16px;
        line-height: 46px;
        position: absolute;
        left: 15px;
        top: -10px;
      }

      .center {
        margin-top: -10px;
        width: 100%;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 46px;
        background-color: #171e28;
        color: #fff;
      }
    }
  }
}
// .btb {
//   width: 50px;
//   height: 50px;
//   margin: 44px auto;
// }
// .btc {
//   font-size: 20px;
//   color: #fff;
//   margin: 7px auto;
//   width: 38px;
//   height: 15px;
// }
.banner {
  width: 100%;
  margin: 0;
  padding: 0;
}
.top {
  width: 92%;
  height: 42px;
  background-color: #16222f;
  margin: 15px auto;
  overflow-x: auto;
  // display: flex;
  white-space: nowrap;
  // float: left;
  .cen {
    display: inline-block;
    width: 20%;
    font-size: 14px;
    height: 42px;
    line-height: 42px;
    color: #fff;
    text-align: center;
    border-right: 1px solid #37495d;
  }
}
.shouyi {
  width: 90.4%;
  height: 82px;
  background-color: #16222f;
  margin: 2px auto 0;
  display: flex;
  .lj,
  .zr {
    width: 30%;
    height: 42px;
    margin: 17.5px auto;
    text-align: center;
    .p1 {
      color: #fff;
      font-size: 16px;
    }
    .p2 {
      margin-top: 10px;
      color: #999999;
      font-size: 14px;
    }
  }
  .x {
    width: 1px;
    height: 42px;
    margin-top: 20px;
    background-color: #999999;
  }
}
.xiangqing {
  width: 92%;
  height: 150px;
  background-color: #16222f;
  margin: 15px auto;
  position: relative;
  .top {
    display: flex;
    width: 91.3%;
    height: 30px;
    position: relative;
    top: 15px;
    margin: auto;
    background-color: #16222f;
    justify-content: space-between;
    .name {
      font-size: 16px;
      color: #fff;
    }
    .zt {
      font-size: 14px;
      color: #67dcff;
    }
  }
  .centent {
    width: 91.3%;
    height: 50px;
    margin: 29.5px auto;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #fff;

    div {
      .text {
        color: #dddddd;
        font-size: 12px;
      }
      .num {
        color: #00bda4;
        font-size: 19px;
        // margin-top: 8.5px;
      }
    }
  }
  .bot {
    width: 91.3%;
    height: 11.5px;
    font-size: 12px;
    color: #bbb;
    margin: -17.5px auto;
  }
}
</style>
