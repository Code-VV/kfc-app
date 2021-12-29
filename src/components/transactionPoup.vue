<template>
  <div class="transactionPoup">
    <van-popup
      v-model="show"
      class="updateBox pad_t_b_15 pad_l_r_15 font1"
      @closed="close"
      position="bottom"
    >
      <div class="tops flex-between align_center">
        <span class="size18 font1 c222">{{type=="buy"?"购买":"出售"}} USDT</span>
        <van-icon name="cross" size="20" @click="close" color="#8C8B8E" />
      </div>
      <p class="size12 c999 pad_t_3">单价 ￥{{list.nowPrice|SubString(2)}}</p>
      <div class="tabList size15 mar_t_10 c222">
        <div class="items" @click="operateEvent(1)" :class="{'cur':payType==1}">
          <p class="span">{{type=="buy"?"按价格购买":"按价格出售"}}</p>
          <span class="borders"></span>
        </div>
        <div class="items" @click="operateEvent(2)" :class="{'cur':payType==2}">
          <p class="span">{{type=="buy"?"按数量购买":"按数量出售"}}</p>
          <span class="borders"></span>
        </div>
      </div>
      <div id="inputBox">
        <div class="inputBox flex align_center" v-if="payType==1">
          <van-field
            v-model="number"
            placeholder="请输入价格"
            class="flex1 size15 c222 bg_exit_btn"
            type="number"
          />
          <span class="size15 c222 font1">CNY</span>
        </div>
        <div class="inputBox flex align_center" v-else>
          <van-field
            v-model="number"
            placeholder="请输入交易数量"
            class="flex1 size15 c222 bg_exit_btn"
            type="number"
          />
          <span class="size15 c222 font1">{{list.current}}</span>
        </div>
      </div>
      <div class="flex-between align_center size12 c999 mar_t_8 font1">
        <span>限额 {{list.minPrice|SubString(2)}}-{{(list.nowPrice*list.num)|SubString(2)}}CNY</span>
        <span class="blue_text" @click="allPay">全部购买</span>
      </div>
      <div class="flex-between align_center size12 c999 mar_t_15 font1">
        <div>
          <p>交易数量</p>
          <div class="c222 mar_t_2">{{list.num|SubString(4)}} USDT</div>
        </div>
        <div>
          <p>交易总额</p>
          <div class="c222 mar_t_2">￥{{(list.num*list.nowPrice)|SubString(2)}}</div>
        </div>
      </div>
      <div class="btnBox">
        <div class="btn cancel flex align_center" @click="close">
          取消(
          <van-count-down
            :time="time"
            format="sss"
            class="blue_text"
            ref="countDown"
            @finish="countDownFinish"
          />)
        </div>
        <div class="btn blue_bg" @click="goPay">下单</div>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { mapActions } from "vuex";
var mam;
export default {
  props: {
    type: {
      type: String,
      default: ""
    },
    list: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      show: false,
      payType: 1, //1按价格，2按数量
      number: null, //交易数量
      number1: null, //交易数量完整
      time: 60 * 1000
    };
  },
  watch: {
    number(val) {
      if (!val) {
        this.number = null;
        return;
      }
      if (this.payType == 1) {
        // console.log(11);
        this.number = this.$util.SubString(val, 2);
      } else {
        this.number = this.$util.SubString(val, 4);
      }
    }
  },
  mounted() {
    // 热更新;
    // this.show = true;
  },
  methods: {
    //关闭
    close() {
      this.show = false;
      // console.log(this.show);
      this.payType = 1;
      this.number = null;
    },
    //全部购买
    allPay() {
      if (this.payType == 1) {
        this.number = this.list.num * this.list.nowPrice;
      } else {
        this.number = this.list.num;
      }
    },
    //交易方式切换
    operateEvent(n) {
      if (n == this.payType) {
        return;
      }
      this.payType = n;
      this.number = null;
    },
    //下单
    goPay() {
      if (!this.number) {
        if (this.payType == 1) {
          this.Toast("请输入价格");
          return;
        }
        if (this.payType == 2) {
          this.Toast("请输入数量");
          return;
        }
      }
      var data = {
        userId: this.$store.state.userId,
        orderId: this.list.id,
        type: this.payType == 1 ? "PRICE" : "NUM",
        num: this.number
      };

      this.$util.showLoading();
      this.$post1("otc/order/placeAnOrder", data).then(res => {
        this.Toast.clear();
        if (res && res.status == "SUCCEED" && res.result) {
          // console.log(res.result);
          // console.log(res.result.orderPriceId);
          var orderPriceId = res.result.orderPriceId;
          this.close();
          setTimeout(ret => {
            this.$router.push({
              // path: `/quotes/quotesDetail?id=${id}`
              path: `/transactionDetail`,
              query: { type: this.type, orderPriceId: res.result.orderPriceId }
            });
          }, 300);
        } else {
          this.Toast(res.errorMessage);
        }
      });
    },
    //购买出售打开弹框时间
    goBuy() {
      this.show = true;
      if (this.$refs.countDown) {
        this.$refs.countDown.reset();
      }

      // this.time=30*1000;
    },
    //倒计时结束时间
    countDownFinish() {
      // console.log("停止");
      this.show = false;
    }
  },
  computed: {}
};
</script>
<style lang="scss">
@import "@/assets/scss/theme.scss";
.transactionPoup {
  .updateBox {
    min-height: 310px;
    border-radius: 10px 10px 0px 0px;
    @include base-background();
  }
  .van-hairline--top::after {
    border: 0;
  }

  #inputBox {
    .van-cell:not(:last-child)::after {
      border: none !important;
    }
    .van-cell {
      background: transparent !important;
      padding: 0;
    }
  }
}
</style>
<style lang="scss" scoped>
.transactionPoup {
  .btns {
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    font-weight: bold;
    display: block;
  }
  .tabList {
    height: 35px;
    display: flex;
    align-items: center;
    box-shadow: 0px 0px 10px 0px rgba(121, 121, 121, 0.1);
    .items {
      flex: 1;
      line-height: 35px;
      display: flex;
      justify-content: center;
      position: relative;
      &.cur {
        color: #499C7A;
        .borders {
          background: #499C7A;
          transition: all 0.5s;
        }
      }
      .borders {
        position: absolute;
        bottom: 0;
        width: 74px;
        height: 1px;
        background: transparent;
      }
    }
  }
  .inputBox {
    margin-top: 15px;
    height: 45px;
    // background: rgba(246, 249, 254, 1);
    border: 1px solid rgba(192, 215, 253, 1);
    border-radius: 5px;
    padding: 0 10px;
  }
  .btnBox {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    .btn {
      width: 160px;
      height: 45px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      font-size: 15px;
      font-weight: bold;
      &.cancel {
        background: rgba(226, 237, 255, 1);
        color: #3c78e1;
      }
    }
  }
}
</style>
