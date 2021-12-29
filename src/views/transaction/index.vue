<template>
  <div class="container_common1 contract bold">
    <!-- <div class="tabsList flex" v-if="!$no_fb">
        <span class="span cur">{{i18n.bb}}</span>
        <span class="span bor_r bor_t bor_r bor_b c444" @click="$router.push('/contract')">{{i18n.hy}}</span>
       
        <span class="span bor_r bor_t bor_r bor_b c444" @click="goqiquan">{{$t("qiquan.qiquan")}}</span>
    </div> -->
    <div class="contractTops relative mar_t_15" :class="{ mar_t_15: !$no_fb }">
      <div class="titlesBox flex c333" @click="openPoup">
        <img
          src="../../assets/images/home/mores_1.png"
          alt
          srcset
          class="mores"
        />
        <span class="span">{{ currentName }}</span>
        <span
          :class="
            currentCoinInfo.updown > 0
              ? 'green_text green_bg_a'
              : currentCoinInfo.updown < 0
              ? 'orange_text red_bg_a'
              : 'dark_text dark_bg_a'
          "
          class="gain_span"
          >{{ (currentCoinInfo.updown * 100) | toFixedRate(2) }}%</span
        >
      </div>
      <div class="iconsBox">
        <img
          src="../../assets/images/home/transactionIcon.png"
          alt
          srcset
          class="icons"
          @click="goQuotesDetail"
        />
        <!-- <router-link to="/quotes/quotesDetail"></router-link> -->
        <div class="icons1" @click="openPoups">
          <img
            src="../../assets/images/home/mores1.png"
            alt
            srcset
            class="icons"
          />
        </div>
        <mores
          @close="close1"
          v-if="isShowMore"
          class="absolute right0 top22"
        ></mores>
      </div>
    </div>
    <!-- 合约操作 -->
    <div class="transactionDetail">
      <div class="leftBox">
        <div class="btnBox">
          <span
            class="btn btn1"
            :class="{ cur: operationType == 'open' }"
            @click="operation('open')"
          >
            {{ i18n.mr }}
            <img
              src="../../assets/images/home/green_bg.png"
              alt
              srcset
              v-if="operationType == 'open'"
            />
            <img
              :src="
                isNight == 'night-theme'
                  ? require('../../assets/images/home/dark_bg1.png')
                  : require('../../assets/images/home/dark_bg.png')
              "
              alt
              srcset
              v-else
              class="darkBg"
            />
          </span>
          <span
            class="btn"
            @click="operation('close')"
            :class="{ cur: operationType == 'close' }"
          >
            {{ i18n.mc }}
            <img
              src="../../assets/images/home/orange_bg.png"
              v-if="operationType == 'close'"
            />
            <img
              :src="
                isNight == 'night-theme'
                  ? require('../../assets/images/home/dark_bg1.png')
                  : require('../../assets/images/home/dark_bg.png')
              "
              alt
              srcset
              v-else
            />
          </span>
        </div>
        <div class="entrustsBox">
          <div class="entrusts flex">
            <div class="items" @click="priceShow = true">
              <span class="size12 span c222" v-if="priceType == 1">
                {{ i18n.sj }}</span
              >
              <span class="size12 span c222" v-if="priceType == 2">
                {{ i18n.xj }}</span
              >
              <img
                src="../../assets/images/home/dropDown.png"
                alt
                srcset
                class="icons"
              />
            </div>
          </div>
          <div
            class="entrusts1 c222 grayBg mar_t_15 c999"
            v-if="priceType == 1"
          >
            {{ i18n.ydqzyj }}
          </div>
          <div class="entrusts entrusts1 c222 stepBox" v-else>
            <van-stepper
              v-model="markPrice"
              step="0.0001"
              @blur="blurFun(1)"
              @focus="focusFun"
              :min="0"
              :decimal-length="4"
            />
          </div>
          <div v-if="priceType == 1" class="mar_t_30"></div>
          <div class="size10 mar_t_8 transerPrice" v-else>
            ≈{{
              ((currentCoinInfo.chPrice / currentCoinInfo.nowPrice) * markPrice)
                | SubString(2)
            }}
            CNY
          </div>
          <div
            class="entrusts entrusts1 flex-between c222"
            v-if="priceType == 1 && operationType == 'open'"
          >
            <!-- <span class="name" v-if="transaction.count">{{transaction.count}}</span>
            <span class="name" v-else>数量</span>-->
            <input
              type="number"
              :placeholder="i18n.je"
              class="marketCount"
              v-model="transaction.marketPrice"
              @blur="blurFun(2)"
              @focus="focusFun"
              style="width: 75%; background: none"
              step="0.1"
            />
            <span class>USDT</span>
          </div>
          <div class="entrusts entrusts1 flex-between c222" v-else>
            <!-- <span class="name" v-if="transaction.count">{{transaction.count}}</span>
            <span class="name" v-else>数量</span>-->
            <input
              type="number"
              :placeholder="i18n.sl"
              class="marketCount"
              v-model="transaction.marketCount"
              @blur="blurFun(3)"
              @focus="focusFun"
              style="width: 75%; background: none"
              step="0.1"
            />
            <span class>{{ tokenCur }}</span>
          </div>

          <div
            class="size10 mar_t_12 transerPrice"
            v-if="operationType == 'close'"
          >
            {{ i18n.ky }} {{ assets.balance | SubString(8) }} {{ tokenCur }}
          </div>
          <div class="size10 mar_t_12 transerPrice" v-else>
            {{ i18n.ky }} {{ assets.balance | SubString(8) }} USDT
          </div>
        </div>
        <div class="pad_l_r_10" v-if="operationType == 'open'">
          <van-slider
            v-model="transaction.slideNum"
            active-color="#38BB96"
            class="mar_t_25"
            @change="slideChange"
          >
            <img
              src="../../assets/images/home/icon1.png"
              slot="button"
              class="handleBtn"
            />
          </van-slider>
        </div>
        <div class="pad_l_r_10" v-else>
          <van-slider
            v-model="transaction.slideNum"
            active-color="#E8054C"
            class="mar_t_25"
            @change="slideChange"
          >
            <img
              src="../../assets/images/home/icon_2.png"
              slot="button"
              class="handleBtn"
            />
          </van-slider>
        </div>
        <div class="amountBox flex-between size10 mar_t_15">
          <span>0</span>
          <!-- {{tokenCur}} -->
          <span>{{ transaction.slideNum | subString(2) }}%</span>
        </div>
        <div class="balanceBox c222">
          <span
            v-if="
              assets.balance - markPrice * transaction.marketCount < 0 &&
              operationType != 'close'
            "
            >{{ i18n.yebz }}</span
          >
          <div v-else>
            <div v-if="priceType == 1">
              <span v-if="operationType == 'open'"
                >{{ i18n.jye }}
                {{
                  (transaction.marketPrice ? transaction.marketPrice : 0)
                    | SubString(8)
                }}USDT</span
              >
              <span v-else
                >{{ i18n.jye }}
                {{
                  (currentCoinInfo.nowPrice * transaction.marketCount)
                    | toNumber(8)
                }}USDT</span
              >
            </div>
            <div v-else>
              <span
                >{{ i18n.jye }}
                {{
                  (markPrice * transaction.marketCount) | toNumber(8)
                }}USDT</span
              >
            </div>
          </div>
        </div>
        <div class="operatingBtn">
          <div
            class="items orange_bg"
            v-if="operationType == 'close'"
            @click="submitHandle('SELL')"
          >
            {{ i18n.mc }}{{ tokenCur }}
          </div>
          <div class="items green_bg" v-else @click="submitHandle('BUY')">
            {{ i18n.mr }}{{ tokenCur }}
          </div>
        </div>
      </div>
      <div class="rightBox">
        <van-row gutter="20" class="pad_r_5 size10 c111">
          <van-col span="12">{{ i18n.jg }}</van-col>
          <van-col span="12 right_text">{{ i18n.sl }}</van-col>
        </van-row>
        <div class="contentBox flex1 mar_t_10">
          <div class="flex1 tops">
            <van-row
              gutter="20"
              v-for="(item, i) in opendown"
              :key="i"
              @click="setMarkPrice(item.price)"
              class="relative-index-2 size11 flex1 items c777 pad_r_5"
            >
              <van-col span="12" class="orange_text">{{
                item.price
                  | SubStringZreo(currentName.split("/")[0] == "HJGX" ? 8 : 4)
              }}</van-col>
              <van-col span="12 right_text">{{
                item.num | SubString(4)
              }}</van-col>
            </van-row>
            <div class="areaBox">
              <div
                v-for="(item, i) in opendown"
                :key="i"
                :style="{ width: (item.num / maxSell) * 70 + '%' }"
                class="orange items"
              ></div>
            </div>
          </div>
          <div class="pad_t_b_20">
            <div v-if="qh" class="price size11 c333">
              <span class="green_text size16 mar_r_11">{{
                currentCoinInfo.nowPrice | SubString(4)
              }}</span>
              <p>≈ ¥{{ currentCoinInfo.chPrice | SubString(2) }}</p>
            </div>
            <div v-else class="price size11 c333">
              <span class="green_text size16 mar_r_11">{{
                currentCoinInfo.chPrice | SubString(4)
              }}</span>
              <p>≈ ${{ currentCoinInfo.nowPrice | SubString(2) }}</p>
            </div>
            <!-- <div class="size11 c333">
              <span>指数价格</span>
              <span class="mar_l_4">{{zhishuPrice|SubStringZreo(4)}}</span>
            </div>-->
          </div>
          <div class="flex1 tops">
            <van-row
              gutter="20"
              v-for="(item, i) in openup"
              :key="i"
              @click="setMarkPrice(item.price)"
              class="relative-index-2 size11 items pad_r_5 c777"
            >
              <van-col span="12" class="green_text">{{
                item.price
                  | SubStringZreo(currentName.split("/")[0] == "HJGX" ? 8 : 4)
              }}</van-col>
              <van-col span="12 right_text">{{
                item.num | SubString(4)
              }}</van-col>
            </van-row>
            <div class="areaBox">
              <div
                v-for="(item, i) in openup"
                :key="i"
                :style="{ width: (item.num / maxBuy) * 70 + '%' }"
                class="green items"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="darkLine"></div>
    <!-- 列表 -->
    <div class="contranctList">
      <div class="top flex-between bor_b">
        <div class="tabBar c222">
          <span>{{ i18n.dqwt }}</span>
        </div>
        <span class="all" @click="lookAll">{{ i18n.ckqb }}</span>
      </div>
      <div class="listBox" v-if="entrustList.length > 0">
        <div v-for="(item, i) in entrustList" :key="i">
          <transactionItem
            :list="item"
            type="entrust"
            :n="i"
            @cancelorder="cancelorder"
          ></transactionItem>
        </div>
      </div>
      <div v-else>
        <nodata :title="i18n.zwwt" class="pad_t_50"></nodata>
      </div>
    </div>
    <van-dialog
      v-model="priceShow"
      :cancel-button-text="$t('add.qx')"
      class="transactionPop"
      :title="i18n.xzlx"
      show-cancel-button
      :showConfirmButton="false"
    >
      <div class="pad_15 c111">
        <p
          @click="selectPrice(2)"
          class="center_text linehei40 size14"
          :class="{ blue_text: priceType == '2' }"
        >
          {{ i18n.xj }}
        </p>
        <p
          @click="selectPrice(1)"
          class="center_text linehei40 size14"
          :class="{ blue_text: priceType == '1' }"
        >
          {{ i18n.sj }}
        </p>
      </div>
    </van-dialog>
    <!-- <van-popup v-model="priceShow" class="transactionPop">
      <div class="pad_15">
        <p
          @click="selectPrice(1)"
          class="center_text linehei40 size16"
          :class="{'blue_text':priceType=='1'}"
        >市价</p>
        <p
          @click="selectPrice(2)"
          class="center_text linehei40 size16"
          :class="{'blue_text':priceType=='2'}"
        >限价</p>
      </div>
    </van-popup>-->
    <!-- 侧拉弹框 -->
    <!-- <div v-if="isShowPopup">
      <coinPopup @closePopup="closePopup"></coinPopup>
    </div>-->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import coinPopup from "../../components/coinPopup";
import mores from "../../components/mores"; //更多弹框
import transactionItem from "../../components/transactionItem";
import socket from "./../../components/TradeView/datafeeds/socket.js";
import $ from "jquery";
export default {
  components: {
    coinPopup,
    transactionItem,
    mores,
  },
  data() {
    return {
      isShowMore: false, //显示更多弹框
      currentCoinInfo: {
        volume: 0,
        nowPrice: 0,
        lowPrice: 0,
        chPrice: 0,
        higPrice: 0,
        updown: 0,
        open: 0,
      },
      qh: "",
      timer: null,
      timer1: null,
      timer2: null,
      isShowPopup: false, //侧边弹框显示
      transaction: {
        count: 0, //当前可选手数
        slideNum: null, //滑动条数据,
        marketCount: null, //当前选择手数
        marketCount1: null, //当前选择手数
        marketPrice: null, //输入金额
        marketPrice1: null,
        setCount: null,
      },
      tabIndex: 0, //列表所在项
      operationType: "open", //开仓
      priceShow: false, //显示市价限价弹框
      priceType: 1, //1市价，2限价

      markPrice: null, //委托价格
      openup: [],
      opendown: [],
      socket: new socket(),
      // zhishuPrice: "", // 指数价格
      assets: {
        balance: 0,
      }, //可用资产
      entrustList: [], //委托列表
      contractMulId: "", //交易对id
      tokenCur: "",
      storeState: "", //商户申请状态
      originalHeight:
        document.documentElement.clientHeight || document.body.clientHeight,
      // 禁止点击
      disableClick: false,
    };
  },
  watch: {
    priceShow() {
      setTimeout(() => {
        this.setStyle();
      }, 100);
    },
    pairsName(val) {
      this.currentName = val;
      this.tokenCur = val.split("/")[0];
      // this.sendMessage(`initMatch-${this.currentName}`);
      this.sendMessage(`initEntrust-${this.currentName}`);

      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (this.timer1) {
        clearTimeout(this.timer1);
      }
      if (this.timer2) {
        clearTimeout(this.timer2);
      }
      this.transaction.marketCount = null;
      this.transaction.marketPrice = null;
      this.getCoinInfo(1);
      this.getPairsByMainCur();
      if (this.isLogin) {
        this.getAsset();
        this.getEntrustList();
      } else {
        this.entrustList = [];
        this.assets.balance = 0;
      }
    },
    "transaction.marketCount": function (val) {
      // var vals = parseFloat(val);
      var vals = val + "";
      //  && this.transaction.slideNum != 100
      if (!val || val < 0) {
        vals = parseFloat(val);
        if (vals == 0) {
          this.transaction.marketCount = 0;
        } else {
          this.transaction.marketCount = null;
        }
        this.transaction.slideNum = 0;
        return;
      }
      if (vals.indexOf(".") == -1 && parseFloat(vals) == 0) {
        this.transaction.marketCount = 0;
        return;
      }
      // let count = Math.floor(this.assets.balance / this.markPrice);
      let count;
      if (this.operationType == "open") {
        count = this.assets.balance / this.markPrice;
      } else {
        count = this.assets.balance;
      }

      vals = count - val > 0 ? val : count;
      this.transaction.marketCount = this.$util.SubString(vals, 8);
      // vals.toString().indexOf(".") > -1 &&
      //   this.$util.SubString(this.marketCount1, 8) - 0 == vals - 0
      if (this.transaction.slideNum == 100) {
        return;
      }
      this.marketCount1 = vals;
      this.transaction.setCount = vals;
      this.transaction.slideNum = this.$util.toNumber((vals / count) * 100);
    },
    "transaction.marketPrice": function (val) {
      // var vals = parseFloat(val);
      var vals = val + "";
      // && this.transaction.slideNum != 100
      if (!val || val < 0) {
        vals = parseFloat(val);
        if (vals - 0 == 0) {
          this.transaction.marketPrice = 0;
        } else {
          this.transaction.marketPrice = null;
        }
        this.transaction.slideNum = 0;
        return;
      }
      if (vals.indexOf(".") == -1 && parseFloat(vals) == 0) {
        this.transaction.marketPrice = 0;
        return;
      }
      let count = this.assets.balance;
      vals = count - val > 0 ? val : count;
      this.transaction.marketPrice = this.$util.SubString(vals, 8);
      //  vals.toString().indexOf(".") > -1 &&
      //   this.$util.SubString(this.marketPrice1, 8) - 0 == vals - 0 &&
      //   this.transaction.slideNum == 100
      if (this.transaction.slideNum == 100) {
        return;
      }
      this.marketPrice1 = vals;
      this.transaction.setCount = vals;
      this.transaction.slideNum = this.$util.toNumber((vals / count) * 100);
    },
    markPrice(val) {
      if (this.operationType == "open" && this.priceType == 2) {
        this.transaction.slideNum = 0;
        this.transaction.marketCount = null;
        this.transaction.marketPrice = null;
      }
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
  },
  computed: {
    actions() {
      return [
        {
          name: this.i18n.sj,
          color: "#499C7A",
          type: "1",
        },
        {
          name: this.i18n.xj,
          color: "#07c160",
          type: "2",
        },
      ];
    },
    pairsName() {
      let name = this.$store.state.pairsName1;
      this.currentName = name;
      this.tokenCur = name.split("/")[0];
      return name;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    isNight() {
      return this.$store.state.nowThemeInfo;
    },
    i18n() {
      return this.$t("transaction");
    },
  },

  activated() {
    this.init();
    this.getCoinInfo(1);
    this.socket.doOpen();
    this.getPairsByMainCur();

    this.socket.on("open", () => {
      this.socket.send("PING");
      this.sendMessage(`initEntrust-${this.currentName}`);
      // this.sendMessage(`initMatch-${this.currentName}`);
    });
    this.socket.on("message", this.onMessage);
    if (this.isLogin) {
      this.getAsset();
      this.getEntrustList();
    }
    let telType = this.IsIA();

    //调用
    if (telType == 1) {
      //1:安卓 2:苹果
      //获取原窗口的高度

      window.addEventListener("resize", this.resizeEvent, false);
    } else {
    }

    this.setStyle();
    // 移除监听显示事件 onHide
    // setTimeout(() => {
    //     api.removeEventListener({
    //         name: "viewappear"
    //     });
    // }, 200);
  },
  deactivated() {
    this.priceType = 1;
    this.operationType = "open";
    this.transaction.marketCount = null;
    this.transaction.marketCount1 = null;
    this.transaction.marketPrice = null;
    this.transaction.marketPrice1 = null;
    this.isShowMore = false;
    window.removeEventListener("resize", this.resizeEvent);
    if (this.timer) {
      clearTimeout(this.timer);
    }

    if (this.timer1) {
      clearTimeout(this.timer1);
    }
    if (this.timer2) {
      clearTimeout(this.timer2);
    }
    this.socket.toClose();
    // 监听显示事件 onShow
    // api.addEventListener({
    //     name: 'viewappear'
    // }, () => {
    //     this.activated();
    // });
  },
  methods: {
    // 设置买卖价格
    setMarkPrice(val) {
      this.markPrice = val;
    },
    setStyle() {
      if (this.$store.state.nowThemeInfo == "night-theme") {
        $(".contract").find(".van-dialog").css("background-color", "#171E28");

        $(".contract").find(".van-dialog__header").css("color", "#fff");

        $(".contract").find(".van-stepper__minus").css("color", "#fff");

        $(".contract").find(".van-stepper__plus").css("color", "#fff");

        $(".contract").find(".van-stepper__input").css("color", "#fff");

        $(".contract").find(".grayBg").css("background-color", "#1E2633 ");
        // 加和减的按钮颜色
      } else {
        $(".contract").find(".van-dialog__header").css("color", "#222");

        $(".contract").find(".van-dialog").css("background-color", "#fff");
        $(".contract").find(".van-stepper__minus").css("color", "#333");
        $(".contract").find(".van-stepper__plus").css("color", "#333");
        $(".contract").find(".van-stepper__input").css("color", "#333");
        $(".contract").find(".grayBg").css("background-color", "#f8f7fd");
      }
    },
    resizeEvent() {
      var _this = this;
      var originalHeight = this.originalHeight;
      var resizeHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      if (resizeHeight - 0 < originalHeight - 0) {
        //当软键盘弹起，在此处操作
        _this.settabBarState(false);
      } else {
        //当软键盘收起，在此处操作
        _this.settabBarState(true);
      }
    },
    //法币
    goFabi() {
      this.$router.push({
        path: `/transaction/transactionFabi`,
      });
    },
    // 期权
    goqiquan() {
      this.$router.push({
        path: "/qiquan/Entrance",
        query: { type: "contract" },
      });
    },

    // 打开更多弹框
    openPoups() {
      this.isShowMore = true;
    },
    close1() {
      this.isShowMore = false;
    },
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setCurrency",
    ]),
    init() {
      this.setnavTitle(this.i18n.jy);
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(true);
      this.setnavBarArrow(false);
      this.setCurrency("");
      this.huilv();
    }, // 初始化页面
    //打开侧边栏
    openPoup() {
      // this.isShowPopup = true;
      this.$hub.$emit("showPopup");
    },
    huilv() {
      this.qh = this.$store.state.qh;
    },
    //关闭侧边栏
    closePopup() {
      this.isShowPopup = false;
    },
    // getZhishu(pairsName) {
    //   this.$get("contract/contractMul/getIndexPrice", {
    //     pairsName
    //   }).then(res => {
    //     if (res && res.status == "SUCCEED") {
    //       let data = res.result;
    //       this.zhishuPrice = data;
    //     }
    //   });
    // },
    IsIA() {
      if (/android/gi.test(navigator.appVersion)) {
        return 1;
      } else if (
        navigator.userAgent.indexOf("iPhone") != -1 ||
        navigator.userAgent.indexOf("iPod") != -1 ||
        navigator.userAgent.indexOf("iPad") != -1
      ) {
        return 2;
      }
    },

    focusFun() {
      //调用
      let _this = this;
      let telType = _this.IsIA();

      if (telType != 1) {
        //1:安卓 2:苹果
        this.settabBarState(false);
      }
    },
    blurFun(type) {
      let _this = this;
      let telType = _this.IsIA();
      if (telType != 1) {
        //1:安卓 2:苹果
        this.settabBarState(true);
      }
      //  this.settabBarState(true);
    },
    //列表切换
    switchList(num) {
      if (num == this.tabIndex) {
        return;
      }
      this.tabIndex = num;
    },
    // 开平仓
    operation(type) {
      if (type == this.operationType) {
        return;
      }
      if (this.timer2) {
        clearTimeout(this.timer2);
        this.timer2 = null;
      }
      this.assets.balance = 0;
      this.operationType = type;
      this.transaction.marketCount = null;
      this.transaction.marketCount1 = null;
      this.transaction.marketPrice = null;
      this.transaction.marketPrice1 = null;
      this.markPrice = this.currentCoinInfo.nowPrice;
      if (this.isLogin) {
        this.getAsset();
      }
    },
    //查看全部
    lookAll() {
      if (!this.$util.isLogin()) {
        return;
      }
      setTimeout((res) => {
        this.$router.push({
          path: `/transaction/allTransaction`,
        });
      }, 500);
    },
    //去行情详情
    goQuotesDetail() {
      setTimeout((res) => {
        this.$router.push({
          path: `/quotes/quotesDetail`,
          query: {
            type: "bibi",
          },
        });
      }, 500);
    },
    //获取 币种详情
    getCoinInfo(type) {
      let pairsName = this.pairsName;
      // this.getZhishu(pairsName);
      this.$get("data/data/getCoinInfo", {
        pairsName,
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = JSON.parse(res.result);
          this.currentCoinInfo = data;
          console.log(this.currentCoinInfo);
          if (type) {
            this.markPrice = data.nowPrice;
          }
        }
      });
      this.timer = setTimeout(() => {
        this.getCoinInfo();
      }, 5000);
    },
    //可用资产
    getAsset(type) {
      let pairsName = this.pairsName;
      let currency;
      if (this.operationType == "open") {
        currency = pairsName.split("/")[1];
      } else {
        currency = pairsName.split("/")[0];
      }
      this.$get("member/balance/getBalances", {
        currency: currency,
        member: this.$store.state.userId,
        balanceType: "BALANCE_BB",
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          if (data.length != 0) {
            this.assets = data[0];
            var banlance = data[0].balance;
            this.assets.balance = this.$util.toNumber(banlance);
          }

          if (this.isLogin) {
            this.timer2 = setTimeout((res) => {
              this.getAsset();
            }, 5000);
          }
        }
      });
    },

    //获取交易对列表
    getPairsByMainCur() {
      let pairsName = this.pairsName;
      this.$get("data/data/getPairsByMainCur", {
        mainCur: pairsName.split("/")[1],
        type: "SPOT",
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          res.result.map((item) => {
            if (item.pairsName == pairsName) {
              this.contractMulId = item.id;
            }
          });
        }
      });
    },
    //选择市价限价
    selectPrice(name) {
      setTimeout(() => {
        if (this.$store.state.nowThemeInfo == "night-theme") {
          $(".contract").find(".van-stepper__minus").css("color", "#fff");
          $(".contract").find(".van-stepper__plus").css("color", "#fff");
          $(".contract").find(".van-stepper__input").css("color", "#fff");
          $(".contract").find(".grayBg").css("background-color", "#1E2633 ");

          // 加和减的按钮颜色
        } else {
          $(".contract").find(".van-stepper__minus").css("color", "#333");
          $(".contract").find(".van-stepper__plus").css("color", "#333");
          $(".contract").find(".van-stepper__input").css("color", "#333");
          $(".contract").find(".grayBg").css("background-color", "#f8f7fd");
        }
      }, 100);
      this.priceShow = false;
      if (this.priceType == name) {
        return;
      }
      if (this.priceType == 2) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.getCoinInfo(1);
      }
      this.priceType = name;
    },
    //滑动条改变事件
    slideChange(e) {
      this.transaction.slideNum = e;
      let count, counts;
      if (this.operationType == "open" && this.priceType == 1) {
        // count = parseFloat(this.assets.balance).toFixed(4);
        count = this.assets.balance;
        counts =
          count * (this.transaction.slideNum / 100) == 0
            ? 0
            : count * (this.transaction.slideNum / 100);
        this.transaction.marketPrice = this.$util.toNumber(counts);
        this.transaction.setCount = this.$util.toNumber(counts);
        return;
      }
      if (this.operationType == "open") {
        count = this.assets.balance / this.markPrice;
        // console.log(this.markPrice);
      } else {
        count = this.assets.balance;
      }
      counts =
        count * (this.transaction.slideNum / 100) == 0
          ? 0
          : count * (this.transaction.slideNum / 100);
      this.transaction.marketCount = this.$util.toNumber(counts);
      this.transaction.setCount = this.$util.toNumber(counts);
    },
    sendMessage(data) {
      if (this.socket.checkOpen()) {
        this.socket.send(data);
      } else {
        this.socket.on("open", () => {
          this.socket.send(data);
        });
      }
    },
    // 获取盘口数据
    onMessage(data) {
      //  盘口数据

      if (data && data.openup) {
        let up = data.openup.slice(0, 6);
        up = up.filter((ele) => ele.num > 0);
        // data.opendown.length - 6,
        let down = data.opendown.slice(0, 6);
        down = down.filter((ele) => ele.num > 0);
        down.sort((a, b) => {
          return b.price - a.price;
        });

        this.openup = up;
        this.opendown = down;
        this.maxBuy = Math.max.apply(
          Math,
          this.openup.map((ele) => ele.num)
        );
        this.maxSell = Math.max.apply(
          Math,
          this.opendown.map((ele) => ele.num)
        );
        // console.log(this.maxSell)
        // console.log(this.maxSell)
      }
      // console.log(data);
    },

    //获取委托列表
    getEntrustList() {
      let pairsName = this.pairsName;
      this.$get("entrust/entrust/getEntrustList", {
        member: this.$store.state.userId,
        pairsName: pairsName,
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          this.entrustList = res.result || [];
          if (this.isLogin) {
            this.timer1 = setTimeout((res) => {
              this.getEntrustList();
            }, 5000);
          }
        }
      });
    },
    //买入卖出
    submitHandle(type) {
      // 禁止多次点击
      if (this.disableClick) {
        return;
      }
      // 判断账号是否冻结
      this.changeData("Conins");
      let marketCount;
      // console.log(this.transaction.slideNum);
      this.$util.toNumber(this.transaction.setCount);
      if (!this.$util.isLogin()) {
        return;
      }
      // if (this.assets.balance - 0 <= 0) {
      //     this.Toast(this.i18n.zcbz);
      //     return;
      // }
      if (this.priceType == 2) {
        //限价
        // if (!(this.markPrice - 0)) {
        //     this.Toast(this.i18n.qsrjg);
        //     return;
        // }
      }
      if (this.priceType == 1) {
        this.markPrice = this.currentCoinInfo.nowPrice;
      }
      if (this.priceType == 1 && this.operationType == "open") {
        // marketCount = this.transaction.marketPrice / this.markPrice;
        // marketCount = this.$util.SubString(
        //   this.transaction.setCount / this.markPrice,
        //   8
        // );
        marketCount = this.$util.toNumber(
          this.transaction.setCount / this.markPrice,
          8
        );
        if (!(this.transaction.setCount - 0)) {
          this.Toast(this.i18n.qsrje);
          this.transaction.marketPrice = parseFloat(0).toFixed(8);
          return;
        }
      } else {
        // marketCount = this.transaction.marketCount;
        marketCount = this.$util.toNumber(this.transaction.setCount, 8);
        // if (!(marketCount - 0)) {
        //     this.Toast(this.i18n.qsrsl);
        //     this.transaction.marketCount = parseFloat(0).toFixed(8);
        //     return;
        // }
      }

      let data = {
        count: marketCount,
        price: this.markPrice,
        member: this.$store.state.userId,
        entrustType: type,
        pairs: this.contractMulId,
        priceType: this.priceType == 1 ? "MARKET_PRICE" : "CUSTOM_PRICE",
        percentageCount: this.$util.toNumber(
          this.transaction.slideNum / 100,
          8
        ),
        matchFee:
          this.priceType == 1 && this.operationType == "open"
            ? this.transaction.marketPrice
            : this.$util.toNumber(marketCount * this.markPrice),
      };

      // this.$util.showLoading();
      this.disableClick = true;
      this.$post("entrust/entrust/setEntrust", data)
        .then((res) => {
          // 延迟启用点击
          setTimeout(() => {
            this.disableClick = false;
          }, 300);
          this.Toast.clear();
          if (res && res.status == "SUCCEED") {
            if (res.result == true) {
              this.transaction.marketCount = null;
              this.transaction.marketPrice = null;
              this.transaction.slideNum = 0;
              this.transaction.setCount = null;
              if (type == "BUY") {
                this.Toast(this.i18n.mrcg);
              } else {
                this.Toast(this.i18n.mccg);
              }
              if (this.timer1) {
                clearTimeout(this.timer1);
              }
              if (this.timer2) {
                clearTimeout(this.timer2);
              }
              this.getAsset();
              this.getEntrustList();
            }
          } else {
            this.Toast(res.errorMessage);
          }
        })
        .catch((err) => {
          // 延迟启用点击
          setTimeout(() => {
            this.disableClick = false;
          }, 300);
          this.Toast.clear();
        });
    },
    //撤单
    cancelorder(e) {
      for (var i = 0; i < this.entrustList.length; i++) {
        var item = this.entrustList[i];
        if (item.id == e) {
          this.entrustList.splice(i, 1);
        }
      }
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.transactionPop {
  @include base-background();

  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .van-dialog__header {
    font-size: 18px;
  }
}

.contract {
  .stepBox {
    padding: 0 !important;
    border: none;

    .van-stepper {
      width: 100%;
      display: flex;

      .van-stepper__minus,
      .van-stepper__plus {
        width: 44px;
      }

      .van-stepper__minus--disabled,
      .van-stepper__plus--disabled,
      .van-stepper__minus,
      .van-stepper__plus {
        background: transparent;
      }

      .van-stepper__input {
        flex: 1;
        background-color: transparent;
        border-left: 1px solid #e3e3e3;
        border-right: 1px solid #e3e3e3;
      }
    }
  }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

// 交易
.contract {
  @include base-background();

  .tabsList {
    display: flex;

    height: 30px;

    .span {
      flex: 1;
      font-size: 15px;
      text-align: center;
      line-height: 28px;

      &:last-child {
        border-left: 0;
      }

      &.cur {
        font-size: 16px;
        border: 1px solid #39bb97;
        color: #39bb97;
        font-weight: 500;
      }
    }
  }

  .contractTops {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .titlesBox {
      align-items: center;
      font-size: 16px;

      font-weight: 500;

      .gain_span {
        font-size: 12px;
        padding: 2px 6px;
        border-radius: 2px;
        margin-left: 5px;
      }

      .dark_bg_a {
        background: #ededed;
      }

      .green_bg_a {
        background: rgba(8, 200, 99, 0.16);
      }

      .red_bg_a {
        background: rgba(248, 100, 63, 0.16);
      }

      .mores {
        width: 17px;
        height: 17px;
        margin-right: 8px;
      }
    }

    .iconsBox {
      display: flex;
      position: relative;

      .icons1 {
        padding-left: 20px;
      }

      .icons {
        width: 15px;
        height: 15px;
      }
    }
  }

  .transactionDetail {
    display: flex;
    margin-top: 12px;
    padding-bottom: 20px;
    min-height: 300px;

    .leftBox {
      width: 60%;

      .amountBox {
        color: #999999;
      }

      .btnBox {
        display: flex;

        .btn {
          width: 50%;
          height: 32px;
          text-align: center;
          line-height: 32px;
          color: #666666;
          font-size: 14px;
          border-radius: 3px;
          position: relative;
          z-index: 1;

          &.cur {
            color: #fff;
          }

          img {
            position: absolute;
            width: 100%;
            height: 100%;
            z-index: -1;
            left: 0;
            top: 0;
          }

          &.btn1 {
            .darkBg {
              transform: rotate(180deg);
            }
          }
        }
      }

      .entrustsBox {
        .transerPrice {
          color: #777;
        }

        .entrusts {
          margin-top: 15px;

          .items {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 10px;
            height: 24px;
            border: 1px solid rgba(227, 227, 227, 0.5);
            margin-right: 5px;
            border-radius: 3px;

            .span {
              // color: #222222;
            }

            &:last-child {
              margin-right: 0;
            }

            .icons {
              width: 8px;
              height: 6px;
              margin-left: 5px;
            }

            .blue_text {
              margin-left: 8px;
            }
          }
        }

        .entrusts1 {
          display: flex;
          height: 32px;
          border: 1px solid rgba(227, 227, 227, 0.5);
          border-radius: 3px;
          align-items: center;
          padding-left: 10px;
          padding-right: 10px;
          // color: #222222;
          font-size: 12px;

          &.grayBg {
            background: rgba(248, 247, 253, 1);

            border: none;
          }

          .marketCount {
            border: none;
          }

          .name {
            color: #a3a3a3;
          }

          .rightBorder {
            border: 1px solid #39bb97;
            color: #39bb97;
            border-radius: 3px;
            width: 43px;
            height: 27px;
            text-align: center;
            line-height: 27px;
            margin-right: -10px;
          }
        }
      }

      .handleBtn {
        width: 20px;
        height: 20px;
      }

      .balanceBox {
        padding-top: 25px;
        font-size: 12px;
      }

      .operatingBtn {
        .orange_bg {
          background-color: #f85d5a;
        }

        .items {
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 15px;
          position: relative;
          border-radius: 3px;
          font-size: 14px;

          .tips {
            position: absolute;
            font-size: 10px;
            color: rgba(255, 255, 255, 0.8);
            right: 10px;
          }
        }
      }
    }

    .rightBox {
      width: 40%;
      padding-left: 30px;
      display: flex;
      flex-direction: column;

      .contentBox {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .tops {
          position: relative;

          .items {
            // color: #777777;
            height: 16.6%;
            display: flex;
            align-items: center;
          }

          .relative-index-2 {
            position: relative;
            z-index: 2;
          }

          .areaBox {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .items {
              height: 20%;

              &.orange {
                background: rgba(248, 100, 63, 0.16);
              }

              &.green {
                background: rgba(8, 200, 99, 0.16);
              }
            }
          }
        }
      }
    }

    .price {
      // color: #666;

      .span {
        // color: #222222;
      }
    }
  }

  .contranctList {
    margin: 0 -15px;
    padding: 0 15px;

    .top {
      // border-bottom: 1px solid rgba(227, 227, 227, 0.2);
      padding: 10px 15px;
      margin: 0 -15px;

      .tabBar {
        font-size: 16px;
        // color: #222222;
        display: flex;
        font-weight: 500;

        span {
          text-align: center;
        }
      }

      .all {
        color: #999999;
        font-size: 12px;
        background: url(../../assets/images/home/rightArrow.png) no-repeat right;
        background-size: 6px 10px;
        padding-right: 14px;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
