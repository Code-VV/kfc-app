<template>
  <div class="withdrawCoin container_common">
    <div class="transferTops flex mar_t_10">
      <div class="leftTitleBox c999">
        <div>{{ $t("transfer.c") }}</div>
        <div>{{ $t("transfer.d") }}</div>
      </div>
      <!-- <van-cell-group class="center_formBox">
        <van-cell class="c333" :title="transferTit?'币币账户':'合约账户'" />
        <van-cell class="c333" :value="!transferTit?'币币账户':'合约账户'" />
      </van-cell-group>-->
      <van-cell-group class="center_formBox">
        <van-cell class="c333" @click="openPoup(1)">
          <span slot="default" v-if="formType == -1">{{
            $t("transfer.zczm")
          }}</span>
          <span slot="default" v-else>{{ formName }}</span>
          <!-- <span slot="default" v-if="formType==1">充币提币账户</span>
          <span slot="default" v-if="formType==2">币币账户</span>
          <span slot="default" v-if="formType==3">USDT合约账户</span>
          <span slot="default" v-if="formType==4">OTC账户（USDT）</span>-->
        </van-cell>
        <van-cell class="c333" @click="openPoup(2)">
          <span slot="default" v-if="toType == -1">{{
            $t("transfer.zrzh")
          }}</span>
          <span slot="default" v-else>{{ toName }}</span>
          <!-- <span slot="default" v-if="toType==1">充币提币账户</span>
          <span slot="default" v-if="toType==2">币币账户</span>
          <span slot="default" v-if="toType==3">USDT合约账户</span>
          <span slot="default" v-if="toType==4">OTC账户（USDT）</span>-->
        </van-cell>
      </van-cell-group>
      <div class="rightIcons" @click="transferTitHand">
        <!-- <van-button type="default" class="icons"></van-button> -->
        <!-- <van-button icon="../../assets/images/home/transfer_1.png" class="icons"></van-button> -->
        <img
          src="../../assets/images/home/transfer_1.png"
          alt
          srcset
          class="icons"
        />
      </div>
    </div>
    <div class="mar_t_24 darkLine"></div>
    <van-cell-group class="withdrawCoinForm c222">
      <van-cell
        :title="$t('transfer.bz')"
        is-link
        :value="currency"
        to="/assets/chooseCoin?type=transfer"
      />
      <van-field
        v-model="coinNum"
        center
        clearable
        type="number"
        :label="$t('transfer.hzsl')"
        :placeholder="
          this.$t('transfer.zdkhz') + transferInfo.amount + currency
        "
      >
        <span slot="right-icon" class="allCoinNum" @click="transferAll">{{
          $t("transfer.qbzc")
        }}</span>
      </van-field>
    </van-cell-group>
    <van-button type="info" @click="showPopup" class="submit">{{
      $t("transfer.hz")
    }}</van-button>
    <van-popup class="popup" v-model="show">
      <p>输入密码</p>
      <div class="inp">
        <span>资金密码 </span
        ><input
          v-model="password"
          type="password"
          placeholder="请输入资金密码"
        />
      </div>

      <van-button type="primary" color="#171E28" @click="transferHandle()"
        >确认提交</van-button
      >
    </van-popup>

    <div class="tipDetail">
      <p>{{ $t("transfer.zyj") }}</p>
    </div>
    <van-dialog
      v-model="priceShow"
      class="transactionPop"
      title
      :showConfirmButton="false"
      :closeOnClickOverlay="true"
    >
      <div class="pad_15" v-if="transferType == 1">
        <p
          v-for="(item, i) in chooseList"
          :key="i"
          @click="selectPrice(item, i)"
          class="center_text linehei40 size14"
          :class="formType == i ? 'blue_text' : 'c333'"
        >
          {{ item }}
        </p>
      </div>
      <div class="pad_15" v-else>
        <p
          v-for="(item, i) in chooseList"
          :key="i"
          @click="selectPrice(item, i)"
          class="center_text linehei40 size14"
          :class="toType == i ? 'blue_text' : 'c333'"
        >
          {{ item }}
        </p>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
import { hbmd5 } from "../../plugins/md5";
export default {
  components: {},

  data() {
    return {
      password: "",
      show: false,
      coinNum: null, //转币金额
      isPwdShow: false, //密码框显示
      pwdValue: "", //密码
      showKeyboard: true,
      transferTit: true, //默认币币到合约
      pairsList: [], //交易对列表
      transferInfo: {
        amount: 0,
      },
      currencyList: [], //当前币种列表
      currency: "", //当前币种
      contract: 0, //合约
      bCount: 0, //BB合约
      fbCount: 0, //法币，
      assetsCount: 0, //充提
      setTime: null, //定时获取资产
      priceShow: false,
      formType: 0,
      formName: "",
      toType: 1,
      toName: "",
      transferType: 0, //1转出账户，2转入账户
      chooseList: [this.$t("transfer.bbzh"), this.$t("transfer.hyzh")],
    };
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    },
    chooseCurrency() {
      return this.$store.state.chooseCurrency;
    },
  },
  watch: {
    chooseCurrency(val) {
      // console.log(val);
    },
    coinNum(val) {
      val = val + "";
      if (!val) {
        return;
      }
      return (this.coinNum = this.$util.SubString(val, 4));
    },
    formType(val) {
      this.coinNum = "";
      this.transferInfo.amount =
        this.formType == 0
          ? this.$util.SubString(this.assetsCount, 4)
          : this.formType == 1
          ? this.$util.SubString(this.bCount, 4)
          : this.formType == 2
          ? this.$util.SubString(this.contract, 4)
          : this.$util.SubString(this.fbCount, 4);
    },
  },
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setnavBarBgColor",
      "setnavBarShowRight",
      "setCurrency",
    ]),
    init() {
      this.setnavTitle(this.$t("transfer.hz"));
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
      setTimeout(() => {
        this.setnavBarShowRight(true);
      }, 100);
    },
    showPopup() {
      this.show = true;
    },
    //选择弹框显示
    openPoup(type) {
      this.transferType = type;
      this.priceShow = true;
    },
    selectPrice(name, type) {
      this.priceShow = false;
      if (this.transferType == 1) {
        this.formType = type;
        this.formName = name;
      } else {
        this.toType = type;
        this.toName = name;
      }
    },
    //划转事件
    transferHandle() {
      let data = {
        member: this.$store.state.userId,
        password: hbmd5(this.password),
      };
      this.$post1("/member/member/setToPayPass", data).then((res) => {
        if ((res.errorMessage = null)) {
          this.Toast("666");
        }
        if (res.result) {
          console.log(res);
          // 判断账号是否冻结
          this.changeData("Transfer");
          let coinNum = parseFloat(this.coinNum);

          if (this.formType == this.toType) {
            this.Toast(this.$t("transfer.bnxt"));
            return;
          }
          if (!coinNum) {
            this.Toast(this.$t("transfer.qsrhz"));
            this.coinNum = "";
            return;
          }
          if (coinNum > parseFloat(this.transferInfo.amount)) {
            this.Toast(this.$t("transfer.ccjr"));
            return;
          }
          let moveType1 =
            this.formType == 0
              ? "ASSETS"
              : this.formType == 1
              ? "BALANCE"
              : this.formType == 2
              ? "TOKEN"
              : "FB";
          let moveType2 =
            this.toType == 0
              ? "ASSETS"
              : this.toType == 1
              ? "BALANCE"
              : this.toType == 2
              ? "TOKEN"
              : "FB";
          let moveType = moveType1 + "_MOVE_" + moveType2;
          let data = {
            member: this.userId,
            balance: this.coinNum,
            currency: this.currency,
            moveType: moveType,
          };
          this.$util.showLoading();
          this.$post1("member/balance/transferBalances", data).then((res) => {
            this.Toast.clear();
            if (res && res.status == "SUCCEED") {
              this.Toast(this.$t("transfer.hzcg"));
              // setTimeout(res => {
              //     this.$router.push({
              //         // path: `/assets/tranferSuccess?transferTit=${this.transferTit}&balance=${this.coinNum}&currency=${this.currency}`
              //         name: "tranferSuccess",
              //         params: {
              //             formName: this.formName,
              //             toName: this.toName,
              //             balance: this.coinNum,
              //             currency: this.currency
              //         }
              //     });
              // }, 300);
              setTimeout(() => {
                this.$router.push({
                  path: "/assets",
                });
              }, 300);
            } else {
              this.Toast(res.errorMessage);
            }
          });
        } else if (res.result == false) {
          console.log(res);
          this.Toast("密码错误");
          this.password = "";
        } else {
          this.Toast("请设置资金密码");
          this.password = "";
        }
      });
    },
    //全部转出
    transferAll() {
      this.coinNum = this.transferInfo.amount;
    },
    //切换划转方向
    transferTitHand() {
      this.coinNum = "";
      this.transferTit = !this.transferTit;
      let formType = this.formType;
      this.formType = this.toType;
      this.toType = formType;
      this.formName = this.chooseList[this.formType];
      this.toName = this.chooseList[this.toType];
      this.transferInfo.amount =
        this.formType == 0
          ? this.$util.SubString(this.assetsCount, 4)
          : this.formType == 1
          ? this.$util.SubString(this.bCount, 4)
          : this.formType == 2
          ? this.$util.SubString(this.contract, 4)
          : this.$util.SubString(this.fbCount, 4);
    },
    //查询资产列表
    getBalances(init) {
      let data = {};
      if (init) {
        this.$get("data/data/getIndexCoin?getCoinType=UPDOWN", data).then(
          (res) => {
            if (res && res.status == "SUCCEED" && res.result) {
              // let iindex = "";
              // res.result.forEach((ele, i) => {
              //     if (!iindex && ele.isDw) {
              //         iindex = i;
              //     }
              // if (ele.tokenCur == "ETH") {
              //     iindex = i;
              // }
              // });
              this.currency = this.chooseCurrency || "USDT";
              // (res.result[iindex] && res.result[iindex].tokenCur ?
              //     res.result[iindex].tokenCur :
              //     "");
              this.getBalances();
            }
          }
        );
        return;
      } else {
        data = {
          member: this.userId,
          // balanceType: this.transferTit ? "BALANCE_BB" : "BALANCE_HY",
          currency: this.currency,
          // moveType: this.transferTit
          //   ? "BALANCE_MOVE_TOKEN"
          //   : "TOKEN_MOVE_BALANCE"
        };
      }
      this.$get("member/balance/getBalances", data).then((res) => {
        if (res && res.status == "SUCCEED" && res.result) {
          let iindex = "";
          res.result.forEach((ele, i) => {
            if (ele.currency == "BTC") {
              iindex = i;
            }
          });

          this.contract =
            res.result[0] && res.result[0].tokenBalance
              ? res.result[0].tokenBalance
              : 0; //合约可划转
          this.bCount =
            res.result[0] && res.result[0].balance ? res.result[0].balance : 0; //合约可划转
          this.assetsCount =
            res.result[0] && res.result[0].assetsBalance
              ? res.result[0].assetsBalance
              : 0; //合约可划转
          this.fbCount =
            res.result[0] && res.result[0].fbBalance
              ? res.result[0].fbBalance
              : 0; //合约可划转
          this.transferInfo.amount =
            this.formType == 0
              ? this.$util.SubString(this.assetsCount, 4)
              : this.formType == 1
              ? this.$util.SubString(this.bCount, 4)
              : this.formType == 2
              ? this.$util.SubString(this.contract, 4)
              : this.$util.SubString(this.fbCount, 4);
        }
      });
    },
  },
  activated() {},

  mounted() {
    this.init();
    this.getBalances(1);
    if (this.formType >= 0) {
      this.formName = this.chooseList[this.formType];
    }
    if (this.toType >= 0) {
      this.toName = this.chooseList[this.toType];
    }
    setTimeout(() => {
      if (this.$store.state.nowThemeInfo == "night-theme") {
        $(".center_formBox")
          .find(".van-cell__value--alone")
          .css("color", "rgba(225, 225, 225, 0.8)");
        $(".center_formBox")
          .find(".van-cell__title")
          .css("color", "rgba(225, 225, 225, 0.8)");
      } else {
        $(".center_formBox")
          .find(".van-cell__value--alone")
          .css("color", "#333");
        $(".center_formBox").find(".van-cell__title").css("color", "#333");
      }
    }, 500);
  },
  destroyed() {
    this.setnavBarShowRight(false);
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.withdrawCoin {
  @include base-background();

  .transactionPop {
    @include base-background();
    border-radius: 3px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 80%;

    .van-dialog__header {
      font-size: 14px;
    }
  }

  .withdrawCoinForm {
    .van-cell {
      padding: 20px 0;

      display: flex;
      align-items: center;
    }

    .van-field__control {
      font-size: 12px;
    }

    .van-cell:not(:last-child)::after {
      left: 0;
    }

    &.van-hairline--top-bottom::after {
      border-top: 0;
    }

    .van-icon-clear {
      margin-right: 10px;
    }
  }

  .transferTops {
    .van-cell {
      background: url(../../assets/images/home/dropDown.png) no-repeat right
        center !important;
      background-size: 8px 6px !important;
    }

    .van-hairline--top-bottom::after {
      border: 0;
    }
  }

  .van-button.submit {
    width: 100%;
    background: #39bb97;
    font-size: 16px;
    margin-top: 40px;
  }

  .pwdModel {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;

    .van-action-sheet__content {
      min-height: 350px;
    }

    .van-action-sheet__header {
      padding-top: 30px;
    }

    .van-icon-close:before {
      content: "";
      background: url("../../assets/images/home/close.png") no-repeat left
        center;
      background-size: 100% 100%;
      width: 20px;
      height: 20px;
    }

    .van-hairline--bottom::after {
      border: 0;
    }
  }
}
</style><style lang="scss" scoped>
.withdrawCoinForm {
  .allCoinNum {
    color: #39bb97;
    font-size: 14px;
  }
}

.tipDetail {
  color: #999999;
  font-size: 12px;
  margin-top: 80px;
  line-height: 18px;
}

.transferTops {
  border: 1px solid rgba(227, 227, 227, 0.2);
  border-radius: 5px;
  padding: 2px 20px;
  align-items: stretch;

  .leftTitleBox {
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 14px 0;
  }

  .center_formBox {
    flex: 1;
  }

  .rightIcons {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 20px;

    .icons {
      width: 35px;
      height: 35px;
      background: url("../../assets/images/home/transfer_1.png") no-repeat;
      background-size: 100% 100%;
      border-radius: 50%;
    }
  }
}

.forGetPwd {
  justify-content: flex-end;
  padding: 10px 15px;
}
.popup {
  color: #fff;
  border-radius: 10px;
  background: #171E28;
  .inp {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  p {
    background: #171E28;
    color: #fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 10px auto;
    font-size: 14px;
  }
  span {
    margin-right: 3px;
  }
  input {
    margin: 0 auto;
    background: #171E28;
    border-radius: 5px;
    height: 20px;
  }
  .van-button {
    margin-top: 0;
    width: 232px;
    background: #171E28;
    border-top: 1px solid #fff;
  }
}
</style>
