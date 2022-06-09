<template>
  <div class="activity">
    <header
      class="header"
      :style="{ paddingTop: safeTop + 'px', height: 46 + safeTop + 'px' }"
    >
      <div class="header_custom">
        <div class="left font1">
          <span class="nav-title">{{ $t("activity.hd") }}</span>
        </div>
        <div class="right c444" @click="toViewLogin">
          <van-icon name="notes-o" size="20px" style="margin-top: -5px" />
        </div>
      </div>
    </header>
    <!-- <img src="@/assets/images/activity/banner.png" alt="" class="banner" /> -->
    <div
      class="list"
      v-for="(v, k) in dataList"
      :key="k"
      @click="xiangqing(v.id, v.currencyName)"
    >
      <img :src="v.image" alt="" />
      <span class="span1">{{ v.currencyName }}</span>
      <div>
        <p class="p1">{{ i18n.zgkd }}</p>
        <p class="p2">{{ (v.timeF * 100 + "%") | capitalize }}</p>
      </div>
    </div>

    <!-- <div class="nav">
      <van-row gutter="100" class="accountBox">
        <van-col span="4">
          <div class="items" style="color:#39BB97;font-size:15px">
            {{$t("activity.sm")}}
          </div>
        </van-col>
        
        <van-col span="4">
          <div class="items" @click="goMortgage" style="font-size:15px">
            {{$t("activity.zy")}}
            <i class="borders"></i>
          </div>
        </van-col>
        <van-col span="5">
          <div class="items" @click="goRedeem">
            赎回
            <i class="borders"></i>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="nav">
      <van-row gutter="20" class="accountBox" style="background:#fff;border-top:1px solid #eaeaea">
        <van-col span="5">
          <div
            class="items"
            :class="{'cur':curType=='ING'}"
            @click="switchTab('ING')"
            style="font-size:14px"
          >
            {{$t("activity.jxz")}}
            <i class="borders"></i>
          </div>
        </van-col>
        <van-col span="5">
          <div
            class="items"
            :class="{'cur':curType=='WAIT'}"
            @click="switchTab('WAIT')"
            style="font-size:14px"
          >
            {{$t("activity.jjks")}}
            <i class="borders"></i>
          </div>
        </van-col>
        <van-col span="5">
          <div
            class="items"
            :class="{'cur':curType=='PASS'}"
            @click="switchTab('PASS')"
            style="font-size:14px"
          >
            {{$t("activity.yjs")}}
            <i class="borders"></i>
          </div>
        </van-col>
      </van-row>
    </div> -->
    <!-- <mescroll-vue ref="mescroll" :down="mescrollDown" class="content" @init="mescrollInit">
      <div
        class="item"
        v-for="item in dataList"
        :key="item.id"
        @click="$router.push({path:'/activityDetails',query:{id:item.id,type:curType}})"
      >
        <img :src="item.projectImg" class="img" />
        <div class="bottom">
          <div class="title c000">{{item.projectName}}</div>
          <div class="desc">{{item.projectName}}</div>
                <div class="thumbs-up">
                    <van-slider v-model="slider" bar-height="10px" active-color="#fbc400">
                        <template #button>
                            <div></div>
                        </template>
                    </van-slider>
                    <div class="right" @click="alert('点赞')">
                        <img src="../../assets/images/activity/dz.png" class="img" />
                        <div class="count">333</div>
                    </div>
          </div>
          <div class="percentage">
            <div class="name c111">USDT(ERC20)</div>
            <van-slider
              class="slider"
              :value="(item.nowNum/item.sumNum)*100"
              bar-height="10px"
              active-color="#39BB97"
            >
              <template #button>
                <div></div>
              </template>
            </van-slider>
            <div class="val c444">{{(item.nowNum/item.sumNum)*100|toNumber(2)}}%</div>
          </div>
        </div>
      </div>
      <div class="footer c111">{{$t("activity.mygd")}}</div>
    </mescroll-vue> -->
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["nowThemeInfo"]),
    safeTop() {
      return this.$store.state.safeAreaTop;
    },
    i18n() {
      return this.$t("activity");
    },
  },

  data() {
    return {
      active: 0,
      count: "",
      productId: "",
      dataList: [],
      curType: "ING",
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

  activated() {
    this.init();
    // document.body.addEventListener(
    //   "touchmove",
    //   function (e) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   },
    //   { passive: false }
    // );
  },
  created() {},
  deactivated() {},
  filters: {
    capitalize: function (value) {
      let realVal = parseFloat(value).toFixed(2);
      return realVal+'%';
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
    // 初始化
    init() {
      // this.setnavTitle("活动");
      this.setbackRouter("");
      this.setnavBarState(false);
      this.settabBarState(true);
      this.setnavBarArrow(false);
      this.setCurrency("");
      if (this.nowThemeInfo !== "night-theme") {
        document.querySelector(".nav-title").style.color = "#323233";
      } else {
        document.querySelector(".nav-title").style.color = "#fff";
      }
      if (this.$store.state.token != "") {
        this.$get("/entrust/arbirtage/getWealth", {}).then((res) => {
          this.dataList = res.result.wList;
        });
      }
      // if (this.$store.state.token == "") {
      //   this.$router.push("/login");
      // }
    },
    // 去质押
    goMortgage() {
      this.$router.push({
        path: `/mortgage`,
      });
    },
    // 赎回记录
    goRedeem() {
      this.$router.push({
        path: `/redeem_record`,
      });
    },
    // 打开项目详情
    openWin(url) {
      window.open(url);
      // 打开新页面
      api.openWin({
        name: "activityFrame",
        url: url,
        bgColor: "#fff",
      });
      api.execScript({
        //在指定页面中执行srcipt中脚本
        name: "activityFrame", //打开外部网页的Win名
        script:
          "api.historyBack(function(ret, err) {if (!ret.status) {api.closeWin();}});",
      }); //要执行的脚本字符串
    },
    // 获取列表

    //切换
    switchTab(type) {
      // console.log(1);
      if (type == this.curType) {
        return;
      }
      this.curType = type;
      this.mescroll.resetUpScroll();
      this.pageNum = 1;
      this.dataList = [];
      this.getPeList();
    },
    // 跳转需要登录的页面
    toViewLogin() {
      if (!this.$util.isLogin()) {
          // this.$router.push({
          //   path: "/login"
          // });
        return;
      } else {
        this.$router.push("/activityHistory");
      }
    },
    xiangqing(v, k) {
      this.$router.push({
        path: "/activityDetails",
        query: {
          id: v,
          name: k,
        },
      });
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    //下拉刷新
    downCallback() {
      setTimeout((res) => {
        this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.activity {
  @include base-background();
  font-family: Din;
  .dialog {
    .dialog-content {
      width: 100%;
      display: flex;
      justify-content: center;
      margin: 10px auto;

      .input {
        padding: 0 10px;
        margin: auto;
        width: 80%;
        height: 50px;
        border: none;
      }
    }
  }
  .banner {
    width: 100%;
    margin: 0;
    padding: 0;
    margin-bottom: 5px;
  }
  .list {
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    margin-top: 10px;
    background-color: #1f2630;
    width: 92%;
    height: 75px;
    .span1 {
      line-height: 75px;
      margin-right: 90px;
      font-size: 20px;
      color: #fff;
    }
    .p1 {
      margin-right: 20px;
      margin-top: 18px;
      font-size: 14px;
      color: #999999;
      height: 13px;
    }
    .p2 {
      margin-right: 20px;
      margin-top: 13px;
      font-size: 18px;
      color: #ffffff;
      width: 85px;
      overflow: hidden;
    }
    img {
      width: 65px;
      height: 65px;
      margin-top: 5px;
      margin-left: 5px;
    }
  }
  .content {
    width: 100vw !important;
    height: calc(100vh - 180px);
    overflow-y: auto;
    margin-left: -15px;

    .item {
      padding: 15px;
      margin: 5px auto 0;

      .img {
        width: 100%;
        height: 150px;
      }

      .title {
        margin-top: 5px;
        font-weight: bold;
        font-size: 16px;
      }

      .desc {
        line-height: 30px;
        font-size: 14px;
      }

      .thumbs-up {
        display: flex;
        align-items: center;

        .right {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-left: 15px;

          .img {
            width: 20px;
            height: 20px;
          }

          .count {
            margin-top: 2px;
            font-size: 12px;
          }
        }
      }

      .percentage {
        margin: 10px auto;
        display: flex;
        font-size: 14px;
        align-items: center;

        .slider {
          margin: 0 4px;
        }
      }

      .btn {
        width: 60%;
        margin: 20px auto 5px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background-color: #39bb97;
        color: #fff;
        border-radius: 5px;
      }
    }

    .footer {
      margin: 5px auto 0;
      text-align: center;
      color: #999;
      padding: 20px 0 50px;
    }
  }

  .nav {
    position: relative;
    height: 52px;
    padding: 10px auto 0;

    .accountBox {
      left: 0;
      position: fixed;
      padding: 0 15px;
      width: 100%;
      display: flex;
      justify-content: center;

      .items {
        padding: 15px 0;
        width: 80px;
        height: 52px;
        position: relative;
        font-size: 15px;
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
        color: #39bb97;

        .borders {
          background: #39bb97;
        }
      }
    }
  }
  .f16 {
    font-size: 16px;
  }
  .header {
    position: relative;
    width: 100%;
    left: 0;
    top: 0;

    .header_custom {
      width: 100%;
      display: flex;
      justify-content: center;
      line-height: 46px;
      align-items: center;
      position: fixed;
      left: 0;

      .left {
        width: 100%;
        height: 46px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        line-height: 46px;
      }

      .right {
        display: flex;
        align-items: center;
        position: absolute;
        right: 15px;

        .img {
          width: 15px;
          height: 15px;
        }

        .count {
          font-size: 14px;
          margin: 0 3px;
        }
      }
    }
  }
}
.nav-title {
  color: #fff;
}
</style>
