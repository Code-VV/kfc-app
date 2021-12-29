<template>
  <div id="container_common111" class="container_common1 contract bold">
    <header
      class="headers flex header_custom hei46 align_center relative"
      :style="{ paddingTop: safeTop + 'px' }"
    >
      <div
        class="left_icon absolute"
        :class="isNight == 'night-theme' ? 'whiteIcons' : 'darkIcons'"
      >
        <van-icon name="arrow-left" @click="back()" />
      </div>
      <div class="titleContent font1">
        <div class="items c222">
          <span>期货</span>
        </div>
      </div>
    </header>
    <div class="contractTops relative">
      <div class="titlesBox flex c333" @click="openPoup">
        <img
          src="../../assets/images/home/mores_1.png"
          alt
          srcset
          class="mores"
        />
        <span class="span">{{ pairsName }}{{ i18n.yx }}</span>
      </div>
      <div class="iconsBox">
        <router-link
          :to="{ path: '/quotes/quotesDetail', query: { type: 'contract' } }"
        >
          <img
            src="../../assets/images/home/transactionIcon.png"
            alt
            srcset
            class="icons"
          />
        </router-link>
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
    <div class="settlementType c777">{{ i18n.jshb }}</div>
    <van-row gutter="20" class="tabBox size12 center_text c777 contract_style1">
      <van-col span="6">
        <div>{{ i18n.fxd }}</div>
        <div class="mar_t_10" v-if="risk.risk - 0 == 0">
          {{ (risk.risk * 100) | SubString(2) }}%
        </div>
        <div class="mar_t_10 c_green bold" v-else-if="risk.risk <= 0.5">
          {{ (risk.risk * 100) | SubString(2) }}%
        </div>
        <div class="mar_t_10 c_red bold" v-else-if="risk.risk > 0.5">
          {{ (risk.risk * 100) | SubString(2) }}%
        </div>
      </van-col>
      <van-col span="12">
        <div>{{ i18n.syl }}</div>
        <div class="mar_t_10">{{ (risk.moneyRate * 100) | SubString(2) }}%</div>
      </van-col>
      <van-col span="6">
        <div>{{ i18n.zjgg }}</div>
        <div class="mar_t_10">{{ risk.moneyLever | SubString(4) }}</div>
        <!-- risk:'',
        moneyLever:'',
        moneyRate:'',-->
      </van-col>
    </van-row>
    <!-- 合约操作 -->
    <div class="transactionDetail">
      <div class="leftBox">
        <div class="btnBox">
          <span
            class="btn btn1"
            :class="{ cur: operationType == 'open' }"
            @click="operation('open')"
          >
            {{ i18n.kc }}
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
            {{ i18n.pc }}
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
              <span v-show="currentPriceType == '1'" class="size12 c222">{{
                i18n.sj
              }}</span>
              <span v-show="currentPriceType == '2'" class="size12 c222">{{
                i18n.xj
              }}</span>
              <img
                src="../../assets/images/home/dropDown.png"
                alt
                srcset
                class="icons"
              />
            </div>
            <!-- 
            <van-action-sheet
              v-model="priceShow"
              :actions="actions"
              cancel-text="取消"
              @select="selectPrice"
            />-->
            <div v-show="priceShow" class="ganggan c333">
              <!-- <div class="size16 bold hei40 linehei40 a_center">选择杠杆</div> -->
              <div class="con">
                <van-picker
                  :confirm-button-text="$t('add.qd')"
                  :cancel-button-text="$t('add.qx')"
                  show-toolbar
                  :title="i18n.xzlx"
                  :columns="actions"
                  :item-heigh="50"
                  @cancel="priceShow = false"
                  @confirm="selectPrice"
                />
              </div>
            </div>

            <div
              class="items"
              @click="gangganShow = true"
              v-if="operationType == 'open'"
            >
              <span class="size12 c222">{{ i18n.gg }}</span>
              <span class="size10 blue_text">{{ currentGangganType }}X</span>
              <img
                src="../../assets/images/home/dropDown.png"
                alt
                srcset
                class="icons"
              />
            </div>

            <div class="items" v-else>
              <span class="size12 c999">{{ i18n.gg }}</span>
              <span class="size10 c999">{{ currentGangganType }}X</span>
              <img
                src="../../assets/images/home/dropDown.png"
                alt
                srcset
                class="icons"
              />
            </div>

            <div v-show="gangganShow" class="ganggan c333">
              <!-- <div class="size16 bold hei40 linehei40 a_center">选择杠杆</div> -->
              <div class="con">
                <van-picker
                  :confirm-button-text="$t('add.qd')"
                  :cancel-button-text="$t('add.qx')"
                  show-toolbar
                  :title="i18n.xzgg"
                  :columns="columns"
                  :item-heigh="50"
                  @cancel="selGanggancLE"
                  @confirm="selGangganOk"
                />

                <!-- 
               <van-row  class="mar_b_10" >
                 <van-col class="col" :span="7" :class="currentGangganType==100?'bg_blue c_fff':''">
                   <div  @click.stop="selGanggan(100)">100X</div>
                 </van-col>
                 <van-col class="col" :span="7" :class="currentGangganType==50?'bg_blue c_fff':''">
                   <div  @click.stop="selGanggan(50)">50X</div>
                 </van-col>

                </van-row>-->
              </div>
              <!-- <div class="btn bor_t">
                <div class="c999" @click="selGanggancLE">取消</div>
                <div class="c_blue bor_l" @click="selGangganOk">确定</div>
              </div>-->
            </div>
            <van-overlay
              :show="gangganShow"
              @click="gangganShow = false"
            ></van-overlay>
            <van-overlay
              :show="priceShow"
              @click="priceShow = false"
            ></van-overlay>
          </div>

          <!-- 市价 -->
          <div
            v-show="currentPriceType == '1'"
            class="entrusts entrusts1 pad_l_10"
          >
            <span class="name">{{ i18n.sj }}</span>
            <span class="rightBorder" @click="currentPriceType = '2'">{{
              i18n.sj
            }}</span>
          </div>
          <!-- 限价 -->
          <div
            v-show="currentPriceType == '2'"
            class="entrusts entrusts1"
            style="padding-left: 0"
          >
            <div class="name a_re" style="width: 100%; height: 100%">
              <input
                class="inp c666"
                type="number"
                :placeholder="i18n.jg"
                v-model="price"
                @blur="blurFun"
                @focus="focusFun"
              />
              <div class="a_ab c666 right5 top5 size12">{{ coinMain }}</div>
            </div>
            <span class="rightBorder2 c111" @click="currentPriceType = '1'">{{
              i18n.sj
            }}</span>
          </div>

          <div class="entrusts a_re">
            <!-- <span class="name" v-if="transaction.count">{{transaction.count}}</span> -->
            <!-- <span class="name" v-else>数量</span>
            <span class="flex1"></span>-->

            <!-- 开仓手数输入 -->
            <input
              v-show="operationType == 'open'"
              class="inppp c666"
              type="number"
              :disabled="disabled"
              :class="{ bg_ededed: disabled }"
              v-model="shouNum"
              @blur="blurFun"
              @focus="focusFun"
              @input="changeShoushu(shouNum)"
              :placeholder="i18n.sl"
            />
            <!-- 平仓手数输入 -->
            <input
              v-show="operationType == 'close'"
              class="inppp c666"
              type="number"
              :disabled="disabledPingcang"
              :class="{ 'bg_ededed c999': disabledPingcang }"
              v-model="shouNumPing"
              @blur="blurFun"
              @focus="focusFun"
              @input="changeShoushuPing(shouNumPing)"
              :placeholder="i18n.sl"
            />

            <span class="a_ab right10 top5 c111">{{ i18n.s }}</span>
          </div>
        </div>
        <div v-if="operationType == 'open'" class="size11 c777 mar_t_5 bold">
          = {{ (contractMul * handerNan(shouNum)) | SubString(4)
          }}{{ currentName.split("/")[0] }}
        </div>
        <div v-else class="hei20"></div>

        <!-- 开仓进度条 -->
        <div class="pad_l_r_10" v-show="operationType == 'open'">
          <van-slider
            :disabled="disabled"
            v-model="sliderNum"
            @input="changeSlide(sliderNum)"
            active-color="#38BB96"
            class="mar_t_20"
          >
            <img
              src="../../assets/images/home/icon1.png"
              slot="button"
              class="handleBtn"
            />
          </van-slider>
        </div>

        <!-- 平仓进度条 -->

        <div class="pad_l_r_10" v-show="operationType == 'close'">
          <van-slider
            :disabled="disabledPingcang"
            v-model="sliderNumPing"
            @input="changeSlidePing(sliderNumPing)"
            active-color="#38BB96"
            class="mar_t_20"
          >
            <img
              src="../../assets/images/home/icon1.png"
              slot="button"
              class="handleBtn"
            />
          </van-slider>
        </div>

        <div
          v-show="operationType == 'open'"
          class="amountBox flex-between c999 size10 mar_t_10"
        >
          <span>0%</span>
          <span>{{ handerNan(sliderNum) }}%</span>
          <!-- <span>{{0.00000000 |toFixed(8)}}BTC</span> -->
        </div>

        <div
          v-show="operationType == 'close'"
          class="amountBox flex-between c999 size10 mar_t_10"
        >
          <span>0%</span>
          <span>{{ handerNan(sliderNumPing) }}%</span>
          <!-- <span>{{0.00000000 |toFixed(8)}}BTC</span> -->
        </div>

        <div class="balanceBox c222">
          <div class="items">
            <span>{{ i18n.kyzc }}</span>
            <span>{{ assets.tokenBalance | SubStringZreo(4) }}</span>
          </div>
          <div class="items" v-if="operationType == 'open'">
            <span>{{ i18n.kkss }}</span>
            <span>&lt;&nbsp;{{ kekaishoushu | SubString(2) }}</span>
          </div>
          <div class="items" v-else>
            <span>{{ i18n.kpss }}</span>
            <span>&lt;&nbsp;{{ kepingshoushuAnd }}</span>
          </div>
          <div class="items">
            <span>{{ i18n.dqzc }}</span>
            <span>{{
              (assets.tokenBalance - 0 + (assets.tokenBlockedBalance - 0))
                | SubStringZreo(4)
            }}</span>
          </div>
        </div>

        <div v-show="operationType == 'open'" class="operatingBtn">
          <div class="items green_bg" @click="submit(1)">
            {{ i18n.kd }}
            <span class="tips">{{ i18n.kz }}</span>
          </div>
          <div class="items orange_bg" @click="submit(2)">
            {{ i18n.kk }}
            <span class="tips">{{ i18n.kdie }}</span>
          </div>
        </div>

        <div v-show="operationType == 'close'" class="operatingBtn">
          <!-- 平多 -->
          <div class="items green_bg" @click="submit(3)">{{ i18n.pd }}</div>
          <!-- <div v-show="currentPingduoBtn" class="items orange_bg1">平空</div>  -->
          <!-- 平空 -->
          <div class="items orange_bg" @click="submit(4)">{{ i18n.pk }}</div>
          <!-- <div v-show="currentPingduoBtn==false" class="items green_bg1" >平多</div> -->
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
              class="size11 flex1 items pad_r_5 c777"
            >
              <van-col span="12" class="orange_text">{{
                item.price | SubStringZreo(4)
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

          <!-- 当前价格 -->
          <div class="pad_t_b_20">
            <div class="price size11 c333">
              <!-- <div
                :class="currentPrice>=prevePrice?'green_text':'orange_text'"
                class="size16 mar_r_6"
              >{{currentPrice1|SubStringZreo(4)}}</div>-->
              <div
                :class="
                  currentPrice >= prevePrice ? 'green_text' : 'orange_text'
                "
                class="size16 mar_r_6"
              >
                {{ currentPrice | SubStringZreo(4) }}
              </div>
              <!-- <div
                :class="currentPrice>=prevePrice?'green_text':'orange_text'"
                class="size16 mar_r_6"
              >{{currentPrice2|SubStringZreo(4)}}</div>-->

              <div>≈ ¥{{ currentChPrice | SubStringZreo(2) }}</div>
            </div>
            <div class="size11 mar_t_6 price c333">
              <span>{{ i18n.zsjg }}</span>
              <span class="span mar_l_4 c222">{{
                zhishuPrice | SubStringZreo(4)
              }}</span>
            </div>
          </div>

          <div class="flex1 tops">
            <van-row
              gutter="20"
              v-for="(item, i) in openup"
              :key="i"
              class="size11 items pad_r_5 c777"
            >
              <van-col span="12" class="green_text">{{
                item.price | SubStringZreo(4)
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
        <div class="tabBar c444">
          <span :class="{ active: tabIndex == 0 }" @click="switchList(0)">
            {{ i18n.cc }}
            <i class="bottomLine"></i>
          </span>
          <span :class="{ active: tabIndex == 1 }" @click="switchList(1)">
            {{ i18n.ppwt }}
            <i class="bottomLine"></i>
          </span>
        </div>
        <span class="all c999" @click="lookAll">{{ i18n.ckqb }}</span>
      </div>

      <div v-show="tabIndex == 0">
        <div
          v-show="chicangList.length > 0"
          class="titleBox flex-between contract_style2 c666"
        >
          <span>{{ i18n.cclb }}</span>
          <span class="blue_text" @click="yijianPingcang">{{ i18n.yjpc }}</span>
        </div>

        <div class="listBox" v-if="chicangList.length > 0">
          <div v-for="(item, i) in chicangList" :key="i">
            <contractItem
              @res="result"
              :list="item"
              :type="tabIndex == 1 ? 'entrust' : ''"
              :ensure="ensure"
            ></contractItem>
          </div>
        </div>
        <nodata :title="i18n.zwcc" v-else></nodata>
      </div>

      <div v-show="tabIndex == 1">
        <div class="listBox" v-if="putongList.length > 0">
          <div v-for="(item, i) in putongList" :key="i">
            <contractItem
              @res="result"
              :list="item"
              :type="tabIndex == 1 ? 'entrust' : ''"
              :ensure="ensure"
            ></contractItem>
          </div>
        </div>
        <nodata v-else></nodata>
      </div>
    </div>

    <van-popup v-model="show1" style="background: none">
      <div class="wrap">
        <div v-show="isKaiduo" class="size16 c333 a_center hei60 linehei60">
          {{ i18n.kd }}
        </div>
        <div v-show="!isKaiduo" class="size16 c333 a_center hei60 linehei60">
          {{ i18n.kk }}
        </div>

        <div class="minhei100 pad_l_r_40 size13">
          <!-- currentDta

pairsName: "XRP/USDT"
coinName: "XRP"
mainCur: "USDT"
priceType: "MARKET_PRICE"
contractHands: 2
price: 0.27323
member: "ca49f0a3ca7511f42297ef76ce5a4c3f"
tradeType: "OPEN_UP"
contractMulId: "537b5f5cb0ca0ae7ff2a5af8af59cdfd"
          leverId: "6e56dfdb7a7c40da4879f05be77b80a6"-->

          <van-row class="hei22 linehei22">
            <van-col :span="12" class="c999">{{ i18n.hy }}</van-col>
            <van-col :span="12" class="c333 a_right"
              >{{ currentDta.pairsName }}{{ i18n.yx }}</van-col
            >
          </van-row>

          <van-row class="hei22 linehei22">
            <van-col :span="12" class="c999">{{ i18n.jg }}</van-col>
            <van-col :span="12" class="c333 a_right">{{
              currentDta.price | SubStringZreo(4)
            }}</van-col>
          </van-row>

          <van-row class="hei22 linehei22">
            <van-col :span="12" class="c999">{{ i18n.sl }}</van-col>
            <van-col :span="12" class="c333 a_right">{{
              currentDta.contractHands
            }}</van-col>
          </van-row>

          <van-row class="hei22 linehei22">
            <van-col :span="12" class="c999">{{ i18n.gg }}</van-col>
            <van-col :span="12" class="c333 a_right"
              >{{ currentGangganType }}{{ i18n.b }}</van-col
            >
          </van-row>

          <!-- <div>合约乘数：{{contractMul}}</div> -->

          <van-row class="hei22 linehei22">
            <van-col :span="12" class="c999">{{ i18n.bzj }}</van-col>
            <!-- 保证金=手数×合约乘数×下单价格/杠杆 -->
            <van-col :span="12" class="c333 a_right">{{
              ((currentDta.contractHands * contractMul * currentDta.price) /
                currentGangganType)
                | SubStringZreo(4)
            }}</van-col>
          </van-row>
        </div>

        <van-row class="hei40 linehei40 size14 a_center bor_t">
          <van-col :span="12">
            <div @click="show1 = false" class="c333">{{ i18n.qx }}</div>
          </van-col>
          <van-col :span="12" class="c_blue bor_l">
            <div @click="opendownSubmit">{{ i18n.qd }}</div>
          </van-col>
        </van-row>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
import contractItem from "../../components/contractItem";
import mores from "../../components/mores"; //更多弹框
import socket from "./../../components/TradeView/datafeeds/socket.js";

export default {
  created() {
    let _this = this;
    this.init();
    this.setBgColor();
    this.socket.doOpen();
    this.socket.on("open", () => {
      this.socket.send("PING");
      this.sendMessage(`initMatch-${this.currentName}`);
      // this.sendMessage(`initEntrust-${this.currentName}`);
    });

    let telType = new _this.IsIA();

    //调用
    if (telType == 1) {
      //1:安卓 2:苹果
      //获取原窗口的高度
      var originalHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      window.οnresize = function () {
        //键盘弹起与隐藏都会引起窗口的高度发生变化
        var resizeHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        if (resizeHeight - 0 < originalHeight - 0) {
          //当软键盘弹起，在此处操作
          _this.settabBarState(false);
        } else {
          //当软键盘收起，在此处操作
          _this.settabBarState(true);
        }
      };
    } else {
    }

    this.socket.on("message", this.onMessage);
  },

  components: {
    // coinPopup,
    contractItem,
    mores,
  },
  data() {
    return {
      currentPingduoBtn: null,
      duodanData: {},
      kongdanData: {},
      currentTypeOpen: true, //默认开仓
      currentDta: {},
      show1: false,
      isKaiduo: true,
      timing: 3000,
      timer_putong: null,
      isclick: true,
      isclick1: true,
      noList: true, //默认没数据
      contractMul: 0, //合约乘数
      zhishuPrice: "", // 指数价格
      isShowMore: false, //显示更多弹框
      putongList: [],
      disabled: false,
      disabledPingcang: false,
      // 平仓价格和手数

      pingType: "OPEN_UP",

      ensure: 0, //维持保证金率
      leverId: "",
      contractMulId: "",
      currentName: "",
      price: 0,
      gangganSet: [],
      kekaishoushu: 0,
      kepingshoushu: 0,
      kepingshoushuAnd: 1, //可平手数和
      assets: {
        tokenBalance: 0, //可用
        tokenBlockedBalance: 0, //冻结
      },
      zancun1: "",
      columns: [],
      currentGangganType: "100",
      // actions: [
      //   { name: "市价",  type: "1" },
      //   { name: "限价",  type: "2" }
      // ],
      currentPriceType: "1", //默认市价
      gangganShow: false,
      priceShow: false,
      socket: new socket(),
      timer: null,
      maxBuy: 10,
      maxSell: 10,
      openup: [],
      opendown: [],
      isShowPopup: false, //侧边弹框显示
      transaction: {
        traders: "", //止盈
        stop: "", //止损
        stepValue: null,
        count: null,
      },

      sliderNum: 0, //步进百分率
      sliderNumPing: 0, //步进百分率
      shouNum: "", //手数
      shouNumPing: "",
      shouNumPingMax: 0, //可平手数较大者

      currentPrice: "", // 当前价格 只显示 和市价
      currentChPrice: "",

      currentPrice1: "",
      currentPrice2: "000",

      prevePrice: 0,
      price: "", // 提交价格
      coinMain: "", //当前主币

      currentCoinInfo: {
        volume: 0,
        nowPrice: 0,
        lowPrice: 0,
        chPrice: 0,
        higPrice: 0,
        updown: 0,
        open: 0,
      },
      tabIndex: 0, //列表所在项
      operationType: "open", //开仓
      chicangList: [],
      risk: {
        risk: "",
        moneyLever: "",
        moneyRate: "",
      }, //风险度
      TradingPairRange: [
        {
          name: "btc/usdt",
          val: 5,
        },
        {
          name: "eos/usdt",
          val: 0.1,
        },
        {
          name: "eth/usdt",
          val: 0.5,
        },
        {
          name: "bch/usdt",
          val: 2,
        },
        {
          name: "ltc/usdt",
          val: 0.3,
        },
        {
          name: "dash/usdt",
          val: 1,
        },
        {
          name: "xrp/usdt",
          val: 0.01,
        },
        {
          name: "etc/usdt",
          val: 0.3,
        },
      ],
    };
  },
  activated() {
    this.init();
    // 移除监听显示事件 onHide
    setTimeout(() => {
      api.removeEventListener({
        name: "viewappear",
      });
    }, 200);
  },
  deactivated() {
    // 监听显示事件 onShow
    api.addEventListener(
      {
        name: "viewappear",
      },
      () => {
        this.activated();
      }
    );
  },
  watch: {
    tabIndex(val) {
      if (val == 1) {
        this.getPutongList();
      } else {
        clearInterval(this.timer_putong);
      }
    },
    pairsName(val) {
      this.currentName = val;
      this.sendMessage(`initMatch-${this.currentName}`);
      // this.sendMessage(`initEntrust-${this.currentName}`);

      this.coinMain = val.split("/")[1];
      // console.log(val);
      clearInterval(this.timer);
      // clearInterval(this.timer_putong)
      this.getCoinInfo(val);
      this.sliderNum = 0;
      this.sliderNumPing = 0;
      this.shouNum = 0;
      this.shouNumPing = 0;
      if (this.$store.state.isLogin) {
        this.getGangganList(val);
        this.getjiaoyipeizhi(val);
        this.getAsset(val);
        this.getWarehouses(name);
        this.getPutong(name);

        this.getRisk(val);
        this.currentPriceType = "1";
      } else {
        //  // console.log('去登陆')
      }
    },
    price(val) {
      (this.kekaishoushu = 0), (this.sliderNum = 0);
      this.sliderNumPing = 0;

      if (val != "" && val > 0) {
        //           // console.log('2222222222')
        // console.log(this.currentPrice)
        this.getMaxHand(
          this.currentGangganType,
          this.currentName,
          this.price,
          this.currentPrice
        );
      }
    },
    isNight(val) {
      this.setBgColor();
    },

    currentPriceType(val) {
      //1.市价 2.限价

      if (val == 2) {
        // if(this.price==''||this.price==0){
        //     this.kekaishoushu = 0;
        //    this.sliderNum = 0
        // }else{
        this.price = this.currentPrice.toFixed(4) - 0;
        this.getMaxHand(
          this.currentGangganType,
          this.currentName,
          this.price,
          this.currentPrice
        );

        // }
      }

      if (val == 1) {
        this.getMaxHand(
          this.currentGangganType,
          this.currentName,
          this.price,
          this.currentPrice
        );
      }
    },
    sliderNum(val) {
      if (this.price == "" && this.currentPriceType == 2) {
        //限价
        this.Toast("请输入价格");
        this.sliderNum = 0;
        this.kekaishoushu = 0;
      }
    },
    shouNum(val) {
      // console.log(isNaN(val))
      if (isNaN(val)) {
        // this.shouNum =
      }
    },
  },

  computed: {
    safeTop() {
      return this.$store.state.safeAreaTop;
    },
    actions() {
      return [this.i18n.sj, this.i18n.xj];
    },
    isNight() {
      return this.$store.state.nowThemeInfo;
    },
    i18n() {
      return this.$t("contract");
    },
    pairsName() {
      // console.log(new Date())
      let name = this.$store.state.pairsName;
      if (name == "HJGX/USDT") {
        name = "BTC/USDT";
        this.setPairsName(name);
      }
      this.currentName = name;
      this.coinMain = name.split("/")[1];
      clearInterval(this.timer);
      // clearInterval(this.timer_putong)

      this.getCoinInfo(name);
      if (this.$store.state.isLogin) {
        this.getGangganList(name);
        this.getjiaoyipeizhi(name);
        this.getAsset(name);
        this.getWarehouses(name);
        this.getPutong(name);

        this.getRisk(name);
      } else {
        // console.log('去登陆')
      }

      return name;
    },
    userId() {
      return this.$store.state.userId;
    },
    maxHandData() {
      return;
    },
  },
  mounted() {
    this.setStyle();
  },
  destroyed() {},

  beforeDestroy() {
    clearInterval(this.timer);
    clearInterval(this.timer_putong);
    this.socket.toClose();
  },
  methods: {
    setStyle() {
      if (this.$store.state.nowThemeInfo == "night-theme") {
        $(".contract").find(".wrap").css("background-color", this.$bg_night);
      } else {
        $(".contract").find(".wrap").css("background-color", "#fff");
      }
      setTimeout(() => {
        if (this.$store.state.nowThemeInfo == "night-theme") {
          $(".contract").find(".wrap").css("background-color", this.$bg_night);
        } else {
          $(".contract").find(".wrap").css("background-color", "#fff");
        }
      }, 100);
    },

    getPutongList() {
      this.getPutong(this.currentName);
      this.timer_putong = setInterval(() => {
        this.getPutong(this.currentName);
      }, 5000);
    },

    setBgColor() {
      return;

      if (this.isNight == "night-theme") {
        //黑夜模式

        setTimeout(() => {
          document.querySelector(".van-dialog").style.backgroundColor =
            "#171E28";
          document.querySelector(".van-dialog__header").style.color = "#fff";
          document.querySelector(
            ".van-dialog__message--has-title"
          ).style.color = "#d6d6d6";
          document.querySelector(".van-dialog__message").style.color =
            "#d6d6d6";

          let dom1 = document.querySelector(".van-button--default");
          let dom2 = document.querySelector(".van-button__text");
          let dom3 = document.querySelector(".van-dialog__confirm");

          dom1.style.backgroundColor = "#171E28";
          dom3.style.backgroundColor = "#171E28";
          dom2.style.color = "#fff";
        }, 200);
      } else {
        //白天模式
        // document.querySelector(".van-dialog").style.backgroundColor = "#fff";
        // let dom1 = document.querySelector(".van-button--default");
        // dom1.style.backgroundColor = "#fff";
        // dom1.style.color = "#333";
      }
    },
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
      let telType = new _this.IsIA();

      if (telType != 1) {
        //1:安卓 2:苹果
        this.settabBarState(false);
      }
    },
    blurFun() {
      let _this = this;
      let telType = new _this.IsIA();

      if (telType != 1) {
        //1:安卓 2:苹果
        this.settabBarState(true);
      }
    },

    //  处理不需要登录的接口
    isHanderlogin() {
      if (!this.$store.state.isLogin) {
        this.Dialog.confirm({
          title: "",
          message: this$t("contract.qxdr"),
          confirmButtonText: this.$t("contract.qd"),
          cancelButtonText: this.$t("contract.qx"),
        }).then(() => {
          this.$router.push({
            path: "/login",
          });
        });
        setTimeout(() => {
          this.setDialogStyle();
        }, 10);

        return false;
      } else {
        return true;
      }
    },
    handerNan(n) {
      if (isNaN(n)) {
        return 0;
      } else {
        return n;
      }
    },

    // 撤单
    chedanFun(item) {
      let data = {
        orderId: item.id,
      };
      this.$post1("contract/contract/closeContractOrder", data).then((res) => {
        if (res && res.status == "SUCCEED") {
          this.Toast(this.i18n.cdcg);
          setTimeout(() => {
            this.getAsset(this.currentName);
            this.getPutong(this.currentName);
          }, 500);
        } else if (res.status == "FAILED") {
          this.Toast(res.errorMessage);
        }
      });
    },
    // 打开更多弹框
    openPoups() {
      this.isShowMore = true;
    },
    close1() {
      this.isShowMore = false;
    },
    // 一键平仓
    yijianPingcang() {
      this.Dialog.confirm({
        title: this.i18n.tx,
        message: this.i18n.sfpc,
      })
        .then(() => {
          let data = {
            memberId: this.$store.state.userId,
            pairsName: this.currentName,
          };
          this.$post1("contract/contract/setAllContractMatch", data).then(
            (res) => {
              if (res && res.status == "SUCCEED") {
                this.Toast(this.i18n.pccg);
                this.getWarehouses(this.currentName);
              } else if (res.status == "FAILED") {
                this.Toast(res.errorMessage);
              }
            }
          );
        })
        .catch(() => {});
    },
    // 手数 change
    changeShoushu(val) {
      if (val > this.kekaishoushu) {
        this.sliderNum = 100;
        this.shouNum = this.kekaishoushu;
      } else {
        this.shouNum = parseInt(val); //手数 取整
        let v = (this.shouNum / this.kekaishoushu) * 100;
        this.sliderNum = v.toFixed(2) - 0;
      }
    },

    changeShoushuPing(val) {
      if (val > this.shouNumPingMax) {
        this.sliderNumPing = 100;
        this.shouNumPing = this.shouNumPingMax;
      } else {
        this.shouNumPing = parseInt(val); //手数 取整
        let v = (this.shouNumPing / this.shouNumPingMax) * 100;
        this.sliderNumPing = v.toFixed(2) - 0;
      }
    },

    // 步进条
    changeSlide(val) {
      let shounum = (val / 100) * this.kekaishoushu;
      this.shouNum = parseInt(shounum);
    },

    changeSlidePing(val) {
      let shouNumPing = (val / 100) * this.shouNumPingMax;
      this.shouNumPing = parseInt(shouNumPing);
    },

    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setCurrency",
      "setnavBarBgColor",
      "setPairsName",
    ]),
    selectPrice(e) {
      this.currentPriceType = e == this.i18n.sj ? "1" : "2";
      // console.log(this.currentPriceType);
      this.priceShow = false;
    },

    selGangganOk(e) {
      this.currentGangganType = e.split("X")[0];
      this.leverId = this.gangganSet.find(
        (ele) => ele.lever == this.currentGangganType
      ).id;
      // this.kekaishoushu = this.gangganSet.find(
      //   ele => ele.lever == this.currentGangganType
      // ).handsMax;
      this.gangganShow = false;

      // 选择了杠杆，那么手数和 进度条 初始化
      this.initNum();

      this.getMaxHand(
        this.currentGangganType,
        this.currentName,
        this.price,
        this.currentPrice
      );
    },
    selGanggancLE() {
      this.gangganShow = false;
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
    // 初始化数量
    initNum() {
      this.shouNum = 0;
      this.sliderNum = 0;
      this.sliderNumPing = 0;
    },
    // 初始化页面
    init() {
      this.setnavTitle(this.i18n.hy);
      this.setbackRouter("");
      this.setnavBarState(false);
      this.settabBarState(false);
      this.setnavBarArrow(true);
      this.setCurrency("");

      //  if(this.isNight=='night-theme'){
      //     this.setnavBarBgColor("#171E28");
      //  }else{

      //     this.setnavBarBgColor("");;
      //     // console.log('-------------')
      //  }
    },
    //返回上一页
    back() {
      setTimeout((res) => {
        this.orderList = [];
        this.curType = 1;
      }, 300);
      this.focusIndex = 0;
      this.merchantInfo = {};
      this.$router.go(-1);
    },
    //打开侧边栏
    openPoup() {
      this.$hub.$emit("showPopup", "1");
      //this.isShowPopup = true;
    },

    //列表切换
    switchList(num) {
      if (num == this.tabIndex) {
        return;
      }
      this.tabIndex = num;
      // console.log(111)
      if (!this.isHanderlogin()) {
        return;
      }
    },
    // 开平仓
    operation(type) {
      this.currentPingduoBtn = null;
      if (type == "close") {
        this.currentTypeOpen = false;
        //平仓
        // this.kekaishoushu = this.kepingshoushu;

        // this.disabled = true;
        this.disabled = false;
        (this.disabledPingcang = false), (this.shouNum = 0);
        // this.kepingshoushu = 0
      } else {
        this.currentTypeOpen = true;

        //开仓
        // this.kekaishoushu = 0;
        this.disabled = false;
        this.shouNum = 0;
      }

      this.sliderNum = 0;
      this.sliderNumPing = 0;
      this.shouNumPing = 0;

      // this.currentGangganType = "";
      // this.leverId = "";

      if (type == this.operationType) {
        return;
      }
      this.operationType = type;
    },
    //查看全部
    lookAll() {
      // console.log(111)
      if (!this.isHanderlogin()) {
        return;
      }
      this.$router.push({
        path: `/contract/allContract`,
      });
    },
    //获取 币种详情
    getCoinInfo(pairsName) {
      let prevePrice = window.sessionStorage.getItem("nowPrice") || 0;
      this.getZhishu(pairsName);
      if (this.$store.state.isLogin) {
        this.getWarehouses(pairsName);
      }

      this.$get("data/data/getCoinInfo", {
        pairsName,
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = JSON.parse(res.result);
          this.currentCoinInfo = data;
          this.currentPrice1 = data.nowPrice;
          // 如果有持仓，当前价格为持仓接口取

          this.currentChPrice = data.chPrice;

          this.currentPrice = data.nowPrice;

          this.$hub.$emit("nowCoinInfo", data);
          window.sessionStorage.setItem("nowPrice", data.nowPrice);
          this.prevePrice = prevePrice;
          this.getGangganList(pairsName);
        }
      });
      this.timer = setInterval(() => {
        this.getZhishu(pairsName);

        if (this.$store.state.isLogin) {
          this.getRisk(pairsName);
          this.getWarehouses(pairsName);
          this.getAsset(pairsName);
        }
        let prevePrice1 = window.sessionStorage.getItem("nowPrice") || 0;
        this.$get("data/data/getCoinInfo", {
          pairsName,
        }).then((res) => {
          if (res && res.status == "SUCCEED") {
            let data = JSON.parse(res.result);
            this.$hub.$emit("nowCoinInfo", data);
            this.currentCoinInfo = data;
            // 如果有持仓，当前价格为持仓接口取

            this.currentPrice1 = data.nowPrice;
            // this.getGangganList(pairsName);

            if (this.noList) {
              //没有列表才显示这里的
              // console.log('--------------------')
              this.currentChPrice = data.chPrice;

              this.currentPrice = data.nowPrice;
            }

            window.sessionStorage.setItem("nowPrice", data.nowPrice);
            this.prevePrice = prevePrice1;

            this.getMaxHand(
              this.currentGangganType,
              this.currentName,
              this.price,
              this.currentPrice
            );
          }
        });
      }, this.timing);
    },
    // 杠杆配置
    getGangganList(pairsName) {
      this.$get("contract/contractMul/getLevers", {
        pairsName,
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          // console.log(data);
          //  handsMax: 0
          // id: "0aa3fa78746f268b0b007253dcf10c2d"
          // lever: 2
          // leverDesc: "2X"
          // pairsName: "BTC/USDT"

          this.gangganSet = data;
          // [
          //   {
          //     handsMax: 4000,
          //     id: "0aa3fa50787455442d",
          //     lever: 50,
          //     leverDesc: "50X",
          //     pairsName: "BTC/USDT"
          //   },

          //    {
          //     handsMax: 50,
          //     id: "0aa3fa787455442d",
          //     lever: 2,
          //     leverDesc: "2X",
          //     pairsName: "BTC/USDT"
          //   },
          // ];

          this.columns = this.gangganSet.map((ele) => {
            // return `${ele.lever}倍 保证金率${(100/ele.lever).toFixed(2)-0}%`
            return `${ele.lever}X`;
          });

          let item = this.gangganSet.find((ele) => ele.lever == 100);

          this.currentGangganType = item.lever;

          this.leverId = item.id;

          this.getMaxHand(
            this.currentGangganType,
            this.currentName,
            this.price,
            this.currentPrice
          );

          // console.log(this.currentGangganType);
        }
      });
    },
    getMaxHand(lever, name, price, currentPrice) {
      if (!this.$store.state.isLogin) {
        return;
      }

      if (this.currentPriceType == 1) {
        //市价
        this.getMaxHandData(lever, name, currentPrice);
      } else {
        //限价
        this.getMaxHandData(lever, name, price);
      }
    },
    // 请求最大可开手数
    getMaxHandData(level, pairsName, price) {
      // console.log(level,pairsName,price)
      if (price == "") {
        // console.log("Allen Allen ");
        return;
      }
      let data = {
        pairsName,
        level,
        price,
        member: this.$store.state.userId,
      };
      this.$get("contract/contract/getMaxHands", data).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          this.kekaishoushu = parseInt(data);
          // console.log(data);
        }
      });
    },
    // 交易配置
    getjiaoyipeizhi(pairsName) {
      this.$get("contract/contractMul/getContractMul", {
        pairsName,
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          // console.log(data);
          this.contractMulId = data[0].id;
          this.ensure = data[0].ensure;
          // 合约乘数
          this.contractMul = data[0].contractMul;
        }
      });
    },

    // 获取持仓列表
    getWarehouses(pairsName) {
      // console.log(99999)
      this.$get("contract/contract/getWarehouses", {
        pairsName,
        member: this.$store.state.userId,
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result.warehouses;
          let nowPrice = JSON.parse(res.result.nowPrice);
          if (data.length > 0) {
            this.noList = false;
            this.currentPrice = nowPrice.nowPrice;
            this.currentPrice2 = nowPrice.nowPrice;
            this.currentChPrice = nowPrice.chPrice;

            //  持仓列表的开多和开空 的id 和  手数， 每次获取新的，用来连续 平仓

            if (data.length == 2) {
              this.duodanData = data.find((ele) => ele.tradeType == "OPEN_UP");
              this.kongdanData = data.find(
                (ele) => ele.tradeType == "OPEN_DOWN"
              );

              // console.log(this.kongdanData)
              let subA = this.duodanData.hands - 0;
              let subB = this.kongdanData.hands - 0;

              this.kepingshoushuAnd = subA + subB;

              this.shouNumPingMax = subA >= subB ? subA : subB; //取较大的数;
            } else if (data.length == 1) {
              let duodanData = data.find((ele) => ele.tradeType == "OPEN_UP");
              let kongdanData = data.find(
                (ele) => ele.tradeType == "OPEN_DOWN"
              );

              if (duodanData == undefined) {
                //有空单数据
                this.kongdanData = kongdanData;
                this.kepingshoushuAnd = this.kongdanData.hands - 0;
                this.shouNumPingMax = this.kepingshoushuAnd;
              } else {
                this.duodanData = duodanData;
                this.kepingshoushuAnd = this.duodanData.hands - 0;
                this.shouNumPingMax = this.kepingshoushuAnd;
              }
            } else {
              // console.log("无持仓");
              this.shouNumPingMax = 0;
              this.kepingshoushuAnd = 0;
            }

            //  this.shouNumPing = this.duodanData.hands;

            // if(this.currentPingduoBtn){
            //     this.kongdanData = this.duodanData.hands;
            // }else{
            //     this.kongdanData = this.kongdanData.hands;
            // }

            // console.log(this.duodanData);
            // console.log(this.kongdanData);
          } else {
            this.noList = true;
            this.shouNumPingMax = 0;
            this.kepingshoushuAnd = 1;
          }

          data.forEach((ele) => {
            ele.leverNum = ele.avgLevel;
          });

          this.chicangList = data;
        }
      });
    },
    getZhishu(pairsName) {
      this.$get("contract/contractMul/getIndexPrice", {
        pairsName,
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          this.zhishuPrice = data;
        }
      });
    },
    // 获取普通列表
    getPutong(pairsName) {
      this.$post1("contract/contract/getEntrustOrder", {
        pairsName,
        member: this.$store.state.userId,
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          this.putongList = data;
        }
      });
    },

    getAsset(pairsName) {
      this.$get("member/balance/getBalances", {
        currency: pairsName.split("/")[1],
        member: this.$store.state.userId,
        balanceType: "BALANCE_HY",
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          if (data.length != 0) {
            this.assets = data[0];
          }

          //  // console.log(data)
        }
      });
    },

    // 获取盘口数据
    onMessage(data) {
      //  盘口数据
      if (!data) return;
      if (data.openup) {
        // console.log(data);

        //   let data={
        //     openup:[
        //     ],
        //     opendown:[
        //     ]
        //   }

        //     for (let i = 0; i < 10; i++) {

        //         let pr = i + (i*Math.random());

        //         data.openup.push({
        //           price: pr >10 ? i   :  pr ,
        //           num: 100 * Math.random()
        //         })

        //         // 根据价格从高到底，排序

        //          data.openup =  data.openup.sort(function(a,b){
        //           return  b.price - a.price;
        //         })

        //         data.opendown.push({
        //           price: i+30+ (i*Math.random()),
        //           num: 100 * Math.random()
        //         })
        //     }

        //  // console.log(data)
        let up = data.openup.slice(0, 6);
        let down = data.opendown.slice(0, 6);

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
        // console.log(data);
        // console.log(this.maxSell)
      }
    },

    // 子组件传来的平仓数据
    result(data, type, price) {
      this.setBgColor();
      // 撤单
      if (type == "CHEDAN") {
        this.Dialog.confirm({
          title: this.i18n.tx,
          message: this.i18n.sfcd,
        }).then(() => {
          this.chedanFun(data);
        });

        setTimeout(() => {
          this.setDialogStyle();
        }, 10);
      } else if (type == "MATCH") {
        // console.log(data.tradeType)
        // 再次区分平多还是凭空
        if (data.tradeType == "OPEN_DOWN") {
          //平空
          // this.currentPingduoBtn = false;
        } else {
          // this.currentPingduoBtn = true;
        }
        this.disabledPingcang = false;

        //平仓
        // console.log(data);
        document.getElementById("container_common111").scrollTop =
          document.body.scrollTop = 0; //回到顶部
        this.pingType = data.tradeType;

        this.sliderNumPing = 100;

        this.shouNumPing = data.hands - 0;

        this.changeShoushuPing(this.shouNumPing);

        // this.disabled = true;

        // this.sliderNum = 0;
        // this.currentGangganType = "";
        // this.leverId = "";
        this.operationType = "close";
      } else {
        this.zhiyingzhisun(type, data, price);
      }
    },
    submit(n) {
      //  延时3秒点击
      if (this.isclick) {
        // 判断账号是否冻结
        this.changeData("Contract");

        this.isclick = false;
        // console.log(111)
        // 1开多 2 开空 3 平多 4平空
        if (!this.isHanderlogin()) {
          return;
        }

        if (n == 1) {
          this.submitData("OPEN_UP");
        }
        if (n == 2) {
          this.submitData("OPEN_DOWN");
        }
        if (n == 3) {
          this.submitDataPing("OPEN_UP");
        }
        if (n == 4) {
          this.submitDataPing("OPEN_DOWN");
        }

        setTimeout(() => {
          this.isclick = true;
        }, 3000);
      }
    },
    setDialogStyle() {
      if (this.isNight == "night-theme") {
        //黑夜模式
        let bg = "#171E28";
        $(".van-dialog").css("backgroundColor", bg);
        $(".van-popup").css("backgroundColor", "none");

        $(".van-dialog")
          .find(".van-dialog__header")
          .css("color", "rgba(255,255,255,.8)");
        $(".van-dialog")
          .find(".van-dialog__message")
          .css("color", "rgba(255,255,255,.6)");
        let dom1 = $(".van-dialog").find(".van-button--default");
        let dom2 = $(".van-dialog").find(".van-button__text");
        let dom3 = $(".van-dialog").find(".van-dialog__confirm");

        dom2.css("color", "#f0f0f0");
        dom1.css("backgroundColor", bg);
        dom3.css("backgroundColor", bg);
      } else {
        let bg = "#fff";
        $(".van-dialog").css("backgroundColor", bg);
        $(".van-popup").css("backgroundColor", "none");

        $(".van-dialog").find(".van-dialog__header").css("color", "#333");
        $(".van-dialog").find(".van-dialog__message").css("color", "#666");
        let dom1 = $(".van-dialog").find(".van-button--default");
        let dom2 = $(".van-dialog").find(".van-button__text");
        let dom3 = $(".van-dialog").find(".van-dialog__confirm");

        dom2.css("color", "#333");
        dom1.css("backgroundColor", bg);
        dom3.css("backgroundColor", bg);
      }
    },
    // 开仓
    submitData(tradeType) {
      if (this.assets.tokenBalance <= 0) {
        this.Toast(this.i18n.kyzcbz);
        return;
      }
      // 提示判断范围 限价
      if (this.currentPriceType != 1) {
        if (this.price == "" || this.price == 0) {
          this.Toast(this.i18n.qsrjg);
          return;
        }
        let TradingPairRange = this.TradingPairRange;
        TradingPairRange.forEach((ele) => {
          ele.name = ele.name.toUpperCase();
        });
        // console.log(TradingPairRange)
        let currentNum_range = TradingPairRange.find(
          (ele) => ele.name == this.currentName
        ).val;

        // if(this.price>=this.currentPrice){  //大于当前价格时
        //   if(this.price-this.currentPrice>currentNum_range){
        //      this.Toast('价格浮动不能超出当前价格的正负' + currentNum_range)
        //        return ;
        //   }
        // }else{   //小于当前价格时
        //   if(this.currentPrice-this.price>currentNum_range){

        //         this.Toast('价格浮动不能超出当前价格的正负' + currentNum_range)
        //        return ;
        //   }
        // }

        if (this.price >= this.currentPrice) {
          //大于当前价格时 超过50%
          if (this.price - this.currentPrice > this.currentPrice * 0.5) {
            this.Toast(this.i18n.jgfd);
            return;
          }
        } else {
          //小于当前价格时
          if (this.currentPrice - this.price > this.currentPrice * 0.5) {
            this.Toast(this.i18n.jgfd);

            return;
          }
        }
      }

      let data = {
        pairsName: this.currentName,
        coinName: this.currentName.split("/")[0],
        mainCur: this.currentName.split("/")[1],
        priceType: this.currentPriceType == 1 ? "MARKET_PRICE" : "CUSTOM_PRICE",
        contractHands: this.shouNum,
        price: this.currentPriceType != 1 ? this.price : this.currentPrice, //1市价 2限价
        member: this.$store.state.userId,
        tradeType,
        contractMulId: this.contractMulId,
        leverId: this.leverId,
      };

      if (data.leverId == "") {
        this.Toast(this.i18n.qsrgg);
        return;
      }

      if (data.price == "" || data.price == 0) {
        this.Toast(this.i18n.qsrjg);
        return;
      }
      if (data.contractHands == "") {
        this.Toast(this.i18n.qsrss);
        return;
      }
      //  this.Toast('提示')
      this.currentDta = data;

      this.show1 = true;
      setTimeout(() => {
        this.setStyle();
      }, 100);

      if (tradeType == "OPEN_UP") {
        //开多
        this.isKaiduo = true;
      } else {
        this.isKaiduo = false;
      }
    },

    opendownSubmit() {
      //  延时3秒点击
      if (this.isclick1) {
        this.isclick1 = false;

        let data = this.currentDta;

        // console.log(data);
        this.$post("contract/contract/setContractOrder", data).then((res) => {
          if (res && res.status == "SUCCEED") {
            let data = res.result;
            this.getMaxHand(
              this.currentGangganType,
              this.currentName,
              this.price,
              this.currentPrice
            );
            this.Toast(this.i18n.kccg);
            this.show1 = false;
            this.currentDta = {};
            this.getAsset(this.currentName);
            this.initNum();
            this.getWarehouses(this.currentName);
            this.getPutong(this.currentName);
          } else if (res.status == "FAILED") {
            this.Toast(res.errorMessage);
            this.show1 = false;
          }
        });

        setTimeout(() => {
          this.isclick1 = true;
        }, 3000);
      }
    },

    // 平仓
    submitDataPing(type) {
      // if (this.pingType != type) {
      // if (type == "OPEN_UP") {
      //   this.Toast("当前不可平多1");
      // } else {
      //   this.Toast("当前不可平空2");
      // }

      // return;
      // }

      let id = "";
      if (type == "OPEN_UP") {
        //平多
        // alert('多'+this.duodanData.id)

        id = this.duodanData.id;
      } else {
        //平空
        // alert('空'+this.kongdanData.id)

        id = this.kongdanData.id;
      }

      if (id == "" || id == undefined) {
        this.Toast(this.i18n.bkp);
        return;
      }

      if (
        this.shouNumPing == 0 ||
        this.shouNumPing == "" ||
        isNaN(this.shouNumPing)
      ) {
        this.Toast(this.i18n.qsrpcss);
        return;
      }

      let data = {
        id,
        // price: this.currentPriceType == 1 ? this.currentPrice : this.price  , //1市价 2限价
        hands: this.shouNumPing,
        // matchType:'MATCH',
        // priceType: this.currentPriceType == 1 ? "MARKET_PRICE" : "CUSTOM_PRICE"   , //1市价 2限价
      };

      if (data.hands == 0) {
        this.Toast(this.i18n.bkp);
        return;
      }

      // if (data.price == "" || data.price == 0) {
      //   this.Toast("请输入价格");
      //   return;
      // }

      // console.log(data);
      //  平仓
      this.$post1("contract/contract/setOrderMatch", data).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          this.Toast(this.i18n.pccg);
          this.initNum();

          this.shouNumPing = 0;

          this.getWarehouses(this.currentName);
          this.getPutong(this.currentName);
        } else if (res.status == "FAILED") {
          this.Toast(res.errorMessage);
        }
      });
    },

    zhiyingzhisun(type, data, price) {
      //止盈止损
      let data1 = {
        id: data.id,
        price,
        // hands: data.hands,
        matchType: type,
        // matchType:'MATCH',
        // priceType:  'CUSTOM_PRICE'     // "MARKET_PRICE" : "CUSTOM_PRICE"   , //1市价 2限价
      };

      // console.log(data1)

      this.$post1("contract/contract/setOrdTriggerMatch", data1).then((res) => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          this.Toast(this.i18n.czcg);
          this.$hub.$emit("close", 1);
          // this.initNum();
          this.getWarehouses(this.currentName);
        } else if (res.status == "FAILED") {
          this.Toast(res.errorMessage);
        }
      });
    },
    //获取风险度
    getRisk(pairsName) {
      let data = {
        member: this.$store.state.userId,
        // pairsName,
      };
      this.$get("contract/contract/getRisk", data).then((res) => {
        if (res && res.status == "SUCCEED") {
          this.risk = res.result || {};
          // this.risk.risk = Math.random()<0.5?0:Math.random(); //allen
        } else if (res.status == "FAILED") {
          this.Toast(res.errorMessage);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

// 交易
.contract {
  .wrap {
    width: 80vw;
    min-height: 200px;
    @include base-background();
    border-radius: 10px;

    .input3 {
      outline: none;
      border: 1px solid #e3e3e3;
      border-radius: 5px;
      @include base-background();
      width: 100%;

      &:focus {
        border: 1px solid $blue;
      }
    }
  }

  @include base-background();

  .tabBox {
    margin: 15px -15px 0 !important;
    padding: 10px 15px;
  }

  .contractTops {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .titlesBox {
      align-items: center;
      font-size: 16px;

      font-weight: 500;

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

  .settlementType {
    margin-top: 5px;
    font-size: 12px;
  }

  .transactionDetail {
    display: flex;
    margin-top: 12px;
    padding-bottom: 20px;

    .leftBox {
      width: 60%;

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
        .entrusts {
          margin-top: 10px;

          .items {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 20px;
            border: 1px solid rgba(227, 227, 227, 0.2);
            margin-right: 5px;
            border-radius: 3px;

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

          .ganggan {
            position: fixed;
            top: 200px;
            left: 10%;
            z-index: 2;

            width: 80%;
            min-height: 200px;
            background: #fff;
            border-radius: 5px;

            .con {
              min-height: 100px;
              padding: 0 15px;

              .col {
                height: 35px;
                border: 1px solid #ededed;
                border-radius: 2px;
                text-align: center;
                line-height: 35px;
                margin-bottom: 10px;

                &:hover {
                }
              }
            }

            .btn {
              font-size: 16px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              justify-items: center;
              height: 40px;
              line-height: 40px;

              div {
                text-align: center;
                width: 50%;
              }
            }
          }
        }

        .entrusts1 {
          display: flex;
          height: 27px;
          border: 1px solid rgba(227, 227, 227, 0.2);
          border-radius: 3px;
          align-items: center;
          padding-left: 15px;
          padding-right: 10px;
          color: #222222;
          font-size: 12px;

          .name {
            color: #a3a3a3;
            flex: 1;

            .inp {
              @include base-background();
              width: 100%;
              height: 100%;
              border: none;
              outline: none;
              padding-left: 10px;

              &::placeholder {
                color: #999999;
              }

              &:focus {
                border: 1px solid $blue;
              }
            }
          }

          .rightBorder {
            border: 1px solid #499c7a;
            color: $blue;
            border-radius: 3px;
            width: 43px;
            height: 27px;
            text-align: center;

            line-height: 27px;
            margin-right: -10px;
          }

          .rightBorder2 {
            border: 1px solid #499c7a;
            border-radius: 3px;
            width: 43px;
            height: 27px;
            text-align: center;
            line-height: 27px;
            margin-right: -10px;
          }
        }

        .pad_l_10 {
          padding-left: 10px !important;
        }
      }

      .handleBtn {
        width: 20px;
        height: 20px;
      }

      .balanceBox {
        padding-top: 5px;

        .items {
          margin-top: 5px;

          font-size: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
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
          margin-top: 10px;
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
      padding-left: 20px;
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
            height: 16.66%;
            display: flex;
            align-items: center;
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
              height: 16.66%;

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
      .span {
        // color: #222222;
      }
    }
  }

  .header_custom {
    margin: 0 -15px;

    .left_icon {
      padding-left: 15px;
      height: 46px;
      display: flex;
      align-items: center;
    }

    .right_icon {
      height: 46px;
      display: flex;
      align-items: center;
      right: 0;
    }

    .titleContent {
      padding: 0 40px;
      width: 100%;
      height: 46px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 16px;

      .items {
        line-height: 46px;
        position: relative;
        flex: 1;
        display: flex;
        justify-content: center;

        &.cur {
          color: #499c7a;

          .borders {
            background: #499c7a;
          }
        }

        .borders {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%);
          width: 22px;
          height: 2px;
          background: transparent;
        }
      }
    }
  }

  .contranctList {
    margin: 0 -15px;
    padding: 0 15px;

    .titleBox {
      font-size: 12px;

      padding: 10px 0;
      margin: 0 -15px;
      padding: 15px;
      align-items: center;
    }

    .top {
      // border-bottom: 1px solid rgba(227, 227, 227, 0.2);

      .tabBar {
        font-size: 15px;

        display: flex;
        padding-top: 15px;

        span {
          margin-right: 50px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;

          &:last-child {
            margin-right: 0;
          }

          .bottomLine {
            background: transparent;
            width: 37px;
            height: 2px;
            display: inline-block;
            margin: 10px auto 0;
          }

          &.active {
            color: #499c7a;
            font-weight: bold;

            .bottomLine {
              background: #499c7a;
            }
          }
        }
      }

      .all {
        font-size: 12px;
        background: url(../../assets/images/home/rightArrow.png) no-repeat right;
        background-size: 6px 10px;
        padding-right: 14px;
        display: flex;
        align-items: center;
      }
    }
  }

  .inppp {
    @include base-background();
    height: 27px;
    border: 1px solid rgba(227, 227, 227, 0.2);
    border-radius: 3px;
    width: 100%;
    padding-left: 10px;
    padding-right: 10px;

    font-size: 12px;
    outline: none;

    padding-left: 10px;

    &::placeholder {
      color: #999999;
    }

    &:focus {
      border: 1px solid $blue;
    }
  }
}
.blue_text[data-v-307fabaf] {
  color: #499c7a 
}
</style>
