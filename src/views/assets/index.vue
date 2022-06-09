<template>
  <div class="assets container_common1 flex flex_column">
    <div class="topBox">
      <div class="leftBoxs">
        <div class="size12 opacity9 flex-between">
          <!-- @click='goAssetDetail' -->
          <span class="span flex align_center">
            {{ i18n.zzhzczh }}
            <!-- <van-icon name="arrow" class="mar_t_2" /> -->
          </span>
          <div class="iconBox">
            <img
              src="../../assets/images/home/eye2.png"
              alt
              srcset
              class="icons"
              v-show="isShowAsset"
              @click="closeAsset"
            />
            <img
              src="../../assets/images/home/eye2_1.png"
              alt
              srcset
              class="icons"
              v-show="!isShowAsset"
              @click="closeAsset"
            />
          </div>
        </div>
        <div class="bottoms">
          <div>
            <div class="marks" v-show="isShowAsset">
              {{ assetList.usdtPrice | SubString(8) }} USDT
            </div>
            <div class="marks" v-show="!isShowAsset">******** USDT</div>
            <div class="size13 mar_t_5" v-show="isShowAsset">
              ≈{{ assetList.usdtPrice | SubString(2) }} USD
            </div>
            <div class="size13 mar_t_5" v-show="!isShowAsset">
              ≈******** USD
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="operationTab c333">
      <div class="items" @click="coinCharging">
        <img src="../../assets/images/home/coinCharging.png" alt class="imgs" />
        <p>{{ i18n.cb }}</p>
      </div>
      <div class="items" @click="goWithdrawCoin">
        <img src="../../assets/images/home/withdrawCoin.png" alt class="imgs" />
        <p>{{ i18n.tb }}</p>
      </div>
      <div class="items" @click="goTransfer">
        <img src="../../assets/images/home/transfer.png" alt class="imgs" />
        <p>{{ i18n.hz }}</p>
      </div>
    </div>
    <van-row gutter="20" class="accountBox bor_b">
      <van-col offset="2" span="8">
        <div
          class="items c444"
          :class="{ cur: curType == 1 }"
          @click="switchTab(1)"
        >
          {{ i18n.bb }}
          <i class="borders"></i>
        </div>
      </van-col>
      <van-col span="8">
        <div
          class="items c444"
          :class="{ cur: curType == 2 }"
          @click="switchTab(2)"
        >
          {{ i18n.hy }}
          <i class="borders"></i>
        </div>
      </van-col>

      <!-- <van-col span="4">
            <div class="items c444" :class="{'cur':curType==3}" @click="switchTab(3)">
                {{i18n.fb}}
                <i class="borders"></i>
            </div>
        </van-col> -->
      <!-- <van-col span="4">
        <div
          class="items c444"
          :class="{ cur: curType == 4 }"
          @click="switchTab(4)"
        >
          {{ i18n.ct }}
          <i class="borders"></i>
        </div>
      </van-col> -->
      <!-- <van-col span="4">
            <div class="items c444" :class="{'cur':curType==5}" @click="switchTab(5)">
                {{i18n.qt}}
                <i class="borders"></i>
            </div>
        </van-col> -->
    </van-row>

    <div
      class="accountDetail flex1"
      v-if="assetList.balances && assetList.balances.length > 0"
    >
      <!-- <div class="tops size14">
        <p class="" v-if="curType==1">合约总资产折合（BTC）</p>
         <p class="" v-if="curType==2">币币总资产折合（BTC）</p>
        <p class="" v-if="curType==3">法币总资产折合（BTC）</p>
        <p class="" v-if="curType==4">充提总资产折合（BTC）</p>
        <div class="bottoms size12">
          <span class="marks font1">{{assetList.usdtPrice|SubString(8)}}</span>
          ≈{{assetList.cnyPrice|SubString(2)}}CNY
        </div>
      </div> -->
      {{ assetList.balances[0].length }}
      <div class="lists">
        <assetItem
          v-for="(item, i) in assetList.balances"
          :key="i"
          :list="item"
          :type="curType"
        ></assetItem>
      </div>
    </div>
    <nodata class="mar_t_20" v-else></nodata>
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions } from "vuex";
import assetItem from "../../components/assetItem";
export default {
  components: {
    assetItem,
  },

  activated() {
    this.init();
    this.initBalanceList(); //资产列表
    this.timer = setInterval(this.initBalanceList(), 5000);
    if (this.$store.state.nowThemeInfo == "night-theme") {
      $(".assets")
        .find(".operationTab")
        .css("background-color", this.$bg_night_second);
    } else {
      $(".assets").find(".operationTab").css("background-color", "#fff");
    }
  },
  deactivated() {
    clearInterval(this.timer);
    this.setnavBarBgColor("#fff");
  },
  computed: {
    i18n() {
      return this.$t("assets");
    },
    userId() {
      return this.$store.state.userId;
    },
  },
  updated(){
    setTimeout(() => {
       this.$router.go(0)
    }, 100000);
   
  },
  mounted() {
    if (this.isNight == "night-theme") {
      //黑夜模式
      // $('.assets').find(".lists").find('.van-cell:not(:last-child)::after').style.borderBottom = 'none';
    } else {
      //白天模式
    }
  },
  data() {
    return {
      active: "",
      curType: 1, //币币，2合约，3法币，4充提
      isShowAsset: true, //显示资产
      assetList: {}, //资产列表
      set: null,
    };
  },
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setnavBarBgColor",
      "setCurrency",
      "setStatusBar",
    ]),
    init() {
      this.setnavTitle(this.i18n.zc);
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(true);
      this.setnavBarArrow(false);

      this.setnavBarBgColor("#272A40");

      this.setCurrency("");
      this.setStatusBar("light");
    }, // 初始化页面
    switchTab(num) {
      if (num == this.curType) {
        return;
      }
      this.assetList = {};
      this.curType = num;
      this.initBalanceList();
    },
    //充币
    coinCharging() {
      this.$router.push({
        path: `/assets/coinCharging`,
        //  path: `/assets/withdrawCoin`
      });
    },
    //提币
    goWithdrawCoin() {
      this.$router.push({
        path: `/assets/withdrawCoin`,
      });
    },
    //划转
    goTransfer() {
      this.$router.push({
        path: `/assets/transfer`,
      });
    },
    //
    goAssetDetail() {
      this.$router.push({
        path: `/assets/assetsIndex`,
      });
    },
    initBalanceList() {
      // let balanceType =
      //   this.curType == 1
      //     ? "BALANCE_BB"
      //     : this.curType == 2
      //     ? "BALANCE_HY"
      //     : "BALANCE_FB";
      let coinType =
        this.curType == 1
          ? "SPOT"
          : this.curType == 2
          ? "CONTRACT"
          : this.curType == 3
          ? "FB"
          : this.curType == 4
          ? "ASSETS"
          : "RELEASE";
      this.$get("member/balance/getBalanceList", {
        member: this.userId,
        coinType: coinType,
        // balanceType: balanceType
      }).then((res) => {
        if (res && res.status == "SUCCEED") {
          if (this.curType == 5) {
            res.result.balances = res.result.balances.filter(
              (elem) => elem.currency == "FVC"
            );
          }
          this.assetList = res.result || {};
          this.assetList.balances.reverse();

        }
      });
    },
    // 资产显示隐藏事件
    closeAsset() {
      this.isShowAsset = !this.isShowAsset;
    },
  },

  deactivated() {
    this.setnavBarBgColor("");
    // this.setStatusBar("dark");
    // console.log(1111)
    clearTimeout(this.set);
  },
};
</script>

<style lang="scss">
.assets {
  .van-tabs__line {
    background-color: #39bb97;
    height: 2px;
  }

  .van-tab--active {
    color: #39bb97;
  }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.assets {
  @include base-background();

  .topBox {
    color: #fff;
    padding: 20px 15px 0;
    margin: 0 -15px;
    height: 150px;
    background-image: url("../../assets/images/home/zichan-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    display: flex;
    color: #fff;

    .leftBoxs {
      flex: 1;

      .flex-between {
        align-items: center;
      }

      .bottoms {
        .marks {
          font-size: 23px;
          font-weight: 500;
        }
      }
    }

    .iconBox {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;

      .icons {
        width: 17px;
        height: 17px;
      }
    }
  }

  .operationTab {
    // @include base-background-second();

    display: flex;
    border-radius: 5px;
    padding: 20px 0;
    margin-top: -35px;

    box-shadow: 0px 3px 11px 1px rgba(121, 121, 121, 0.09);
    font-size: 14px;

    .items {
      flex: 1;
      display: flex;
      border-right: 1px solid rgba(227, 227, 227, 0.4);
      align-items: center;
      margin-left: 24px;

      &:last-child {
        border-right: 0;
      }

      .imgs {
        width: 31px;
        height: 23px;
        margin-right: 10px;
      }
    }
  }

  .accountBox {
    // margin: 0 -15px !important;
    padding: 0 15px;
    display: flex;
    justify-content: space-between;

    // border-bottom: 1px solid rgba(227, 227, 227, 0.2);
    .items {
      padding: 15px 0;
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

  .accountDetail {
    margin: 0 -15px;
    overflow-y: auto;

    .tops {
      padding: 15px;
      background: #f8f7fd;

      .size12 {
        color: #666666;
      }

      .bottoms {
        margin-top: 5px;
        color: #444;
        font-size: 11px;

        .marks {
          font-size: 15px;
          color: #222222;
          margin-right: 8px;
        }
      }
    }
  }
}
</style>
