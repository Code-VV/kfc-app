<template>
  <div class="quotes container_common1 flex_column">
    <p class="title">{{ i18n2.Markets }}</p>
    <!-- Allen 测试环境 放开此处 -->

    <div class="tabList " v-if='!this.$no_bb'>
        <span class="items bold" v-for="(item,i) in tabList" :key="i" :class="{'cur':curType==item.type}" @click="switchTab(item.type)">{{item.name}}</span>
    </div>

    <!-- Allen 测试环境 放开此处 -->
    <div class="subContent bor_b" v-if="subTabList.length > 0">
      <div class="subTabList" v-for="(item, i) in subTabList" :key="i">
        <span
          class="items s1 bold size14"
          :class="{ cur: curSubType == sc }"
          @click="switchSubTab2(0)"
          >{{ i18n.sc }}

          <i class="borders"></i>
        </span>
        <span
          :class="{ cur: curSubType != sc }"
          @click="switchSubTab2(1)"
          class="items s2 bold size14"
        >
          {{ item.name }}
          <i class="borders"></i>
        </span>
      </div>
    </div>
    <van-row gutter="20" class="sortList">
      <van-col
        v-for="(item, i) in sortList"
        :key="i"
        :span="i == 0 ? 10 : i == 1 ? 8 : 6"
      >
      <!-- @click="switchSortType(item.type)"
          :class="
            item.type == 0?'':sortType == item.type ? (isSort ? 'cur upper' : 'cur lower') : ''
          "

          :style="{
            'justify-content':
              i == sortList.length - 1 ? 'flex-end' : 'flex-star',
          }" -->
        <div
          
        >
          <span class="bold size12"> {{ item.name }}</span>
          <span class="icons"></span>
        </div>
      </van-col>
    </van-row>
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      @init="mescrollInit"
      class="container_common marketList flex1"
    >
      <div v-show="sc" v-for="(item, i) in pairsList" :key="i">
        <ListItems
          ref="list1"
          :n="i"
          :l="pairsList.length"
          :type="curType"
          :list="item"
          :list2="pairsList2"
          :l2="pairsList2.length"
          :qh="qh"
          @getPairsByMainCur2="getPairsByMainCur2"
          :sc="sc"
          :xz2="xz"
        >
        </ListItems>
      </div>

      <div v-show="!sc" v-for="(item, b) in pairsList2" :key="item.id">
        <ListItems2
          :n="b"
          :l="pairsList2.length"
          :type="curType"
          :list="item"
          :qh="qh"
          @getPairsByMainCur2="getPairsByMainCur2"
        ></ListItems2>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapActions } from "vuex";
import ListItems from "../../components/listItem1";
import ListItems2 from "../../components/listItem2";
let set = null; //定时器
export default {
  name: "quotes",
  components: {
    ListItems,
    ListItems2,
  },
  data() {
    return {
      xz: false,
      ceshi: false,
      hl: "",
      price: "",
      sc: true,
      title: "Markets",
      subTabList: [], ////交易对主币tab
      curType: "bibi", //当前tab所在项
      curSubType: 0, //当前二级分类所在项
      sortType: 0, //筛选分类所在项
      isSort: false, //true升序,false降序
      pairsList: [], //交易对列表
      pairsList2: [], //收藏列表
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        offset: 40,
        callback: this.downCallback,
        textInOffset: this.$t("add.xlsx"),
        textOutOffset: this.$t("add.sfgx"),
        textLoading: this.$t("add.jzz"),
        auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
    };
  },
  created() {},
  activated() {
    this.init();
    this.getMainCurs();
    this.getPairsByMainCur2();
  },
  computed: {
    tabList() {
      return [
        {
          name: this.$t("quotes.bb"),
          type: "bibi",
        },
        {
          name: this.$t("quotes.hy"),
          type: "contract",
        },
      ];
    },
    sortList() {
      return [
        {
          name: this.i18n.mc,
          type: "0",
        },
        {
          name: this.i18n.zxj,
          type: "2",
        },
        {
          name: this.i18n.zdf,
          type: "1",
        },
      ];
    },

    i18n() {
      return this.$t("quotes");
    },
    i18n2() {
      return this.$t("common");
    },
  },
  created() {},
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setCurrency",
    ]),
    init() {
      this.setnavTitle(this.i18n.hq);
      this.setbackRouter("quotes");
      this.setnavBarState(false);
      this.settabBarState(true);
      this.setnavBarArrow(false);
      this.setCurrency("");

      this.qh = this.$store.state.qh;
      if (this.sc == false && this.$store.state.token == "") {
        Toast("请登录");
        setTimeout(() => {
          this.$router.push("/login");
        }, 2000);
      } else {
        this.getPairsByMainCur2();
      }
    }, // 初始化页面
    //tab切换
    switchTab(type) {
      if (type == this.curType) {
        return;
      }
      this.curType = type;
      this.getMainCurs();
    },
    //二级分类tab切换
    switchSubTab(type) {
      if (type == this.curSubType) {
        return;
      }
      this.curSubType = type;
    },
    switchSubTab2(v) {
      if (v == 1) {
        this.sc = true;
        this.getPairsByMainCur2();
        this.getPairsByMainCur();
      } else {
        this.sc = false;
        this.getPairsByMainCur2();
        this.getPairsByMainCur();
        if (this.sc == false && this.$store.state.token == "") {
          Toast("请登录");
          setTimeout(() => {
            this.$router.push("/login");
          }, 2000);
        } else {
          this.getPairsByMainCur2();
        }
      }
    },
    //筛选分类
    switchSortType(type) {
      if (this.sc == true) {
        if (type == this.sortType) {
          this.isSort = !this.isSort;
        } else {
          this.sortType = type;
          this.isSort = false;
        }

        if (set) {
          clearTimeout(set);
        }

        this.getPairsByMainCur();
      } else {
        if (type == this.sortType) {
          this.isSort = !this.isSort;
        } else {
          this.sortType = type;
          this.isSort = false;
        }

        if (set) {
          clearTimeout(set);
        }
        this.getPairsByMainCur2();
        this.getPairsByMainCur();
      }
      this.getPairsByMainCur();
    },
    //获取交易对主币列表
    getMainCurs() {
      let subTabList = [];
      this.$get("data/data/getMainCurs", {}).then((res) => {
        if (res && res.status == "SUCCEED") {
          if (res.result) {
            res.result.forEach((item, i) => {
              if (item) {
                subTabList.push({
                  name: item,
                  type: i,
                });
              }
            });
            this.subTabList = subTabList || [];
            if (set) {
              clearTimeout(set);
            }
            this.getPairsByMainCur();
          }
        }
      });
    },
    //获取交易对列表
    getPairsByMainCur() {
      let getCoinSort =
        this.sortType == 0
          ? this.isSort
            ? "NAME_UP"
            : "NAME_DOWN"
          : this.sortType == 1
          ? this.isSort
            ? "UP"
            : "DOWN"
          : this.isSort
          ? "PRICE_UP"
          : "PRICE_DOWN";
      this.$get("data/data/getCoinQuotation", {
        // mainCur: this.subTabList[this.curSubType].name,
        getCoinSort: getCoinSort,
        coinType: this.curType == "contract" ? "CONTRACT" : "SPOT",
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          console.log(res);
          this.pairsList = res.result || [];
        }
        set = setTimeout((res) => {
          this.getPairsByMainCur();
        }, 5000);
      });
    },

    // 收藏列表
    getPairsByMainCur2() {
      let getCoinSort =
        this.sortType == 0
          ? this.isSort
            ? "NAME_UP"
            : "NAME_DOWN"
          : this.sortType == 1
          ? this.isSort
            ? "UP"
            : "DOWN"
          : this.isSort
          ? "PRICE_UP"
          : "PRICE_DOWN";
      let data = {
        userId: this.$store.state.userId,
        getCoinSort: getCoinSort,
      };
      this.$get("/entrust/entrust/getCoinCollectionList", data).then((res) => {
        this.pairsList2 = res.result || [];

        set = setTimeout((res) => {
          this.getPairsByMainCur2();
        }, 5000);
      });
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    //下拉刷新
    downCallback() {
      if (set) {
        clearTimeout(set);
      }
      this.getPairsByMainCur();
      setTimeout((res) => {
        this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
      }, 1000);
    },
  },
  deactivated() {
    if (set) {
      clearTimeout(set);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.quotes {
  @include base-background();
  //   margin-top: -30px;
  .tabList {
    display: flex;
    color: #444444;
    font-size: 15px;
    border: 1px solid rgba(227, 227, 227, 0.2);
    justify-content: center;
    width: 100%;
    margin: 0 auto;

    .items {
      width: 50%;
      padding: 5px 0;
      text-align: center;
      border-right: 1px solid rgba(227, 227, 227, 0.2);
    }

    .cur {
      // background: #fbc400;

      color: #169e78;
      font-weight: 500;
      border: 1px solid #169e78;
    }

    .items:last-child {
      // border: none;
    }
  }

  .subContent {
    overflow-y: hidden;
    height: 48px;
    margin: 0 -15px;
    padding: 0 15px;
    // border-bottom: 1px solid rgba(227, 227, 227, 0.4);
  }

  .subTabList {
    display: flex;
    font-size: 14px;
    color: #666666;
    white-space: nowrap;
    overflow-x: auto;
    justify-content: center;
    span {
      width: 50px;
      display: flex;
      justify-content: center;
      align-content: center;
      padding-right: 0 !important;
    }
    .s1 {
      margin-right: 40px !important;
    }
    .s2 {
      margin-left: 40px !important;
      margin-right: 0 !important;
    }
    .items {
      padding: 15px 0;
      position: relative;
      flex-shrink: 0;
      margin-right: 35px;
      height: 52px;

      .borders {
        position: absolute;
        bottom: 4px;
        left: 50%;
        transform: translate(-50%);
        width: 37px;
        height: 2px;
        background: transparent;
        border-radius: 2px;
      }
    }

    .cur {
      color: #169e78;

      .borders {
        background: #169e78;
      }
    }
  }

  .sortList {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    color: #999999;
    padding: 15px 0;

    .items {
      display: flex;
      align-items: center;

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
    }

    .cur {
      color: #169e78;

      &.upper {
        .icons::before {
          border-bottom-color: #169e78;
        }
      }

      &.lower {
        .icons::after {
          border-top-color: #169e78;
        }
      }
    }
  }

  .marketList {
    margin: 0 -15px;
    padding: 0 15px;
    flex: 1;
    overflow-y: auto;
  }

  .areaBox {
    margin: 0 -15px;
    padding: 15px 0;
    font-size: 12px;

    span {
      width: 68px;
      height: 22px;
      background: rgba(243, 243, 243, 1);
      border-top-right-radius: 11px;
      border-bottom-right-radius: 11px;
      display: inline-block;
      line-height: 22px;
      color: #169e78;
      padding-left: 15px;
    }
  }
}
.title {
  color: #fff;
  margin: 0 auto;
  font-size: 0.426667rem;
  height: 46px;
  line-height: 46px;
  margin-top: 20px;
}
.van-col--8 {
  margin-left: 13px;
}
</style>
