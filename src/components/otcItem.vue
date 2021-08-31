<template>
  <div class="otcItem pad_l_r_15 pad_t_b_15" :class="{'bor_b':!noBorder}">
    <div class="topBox flex-between align_center">
      <div class="leftBox size15 font1 flex align_center" style="max-width:65%">
        <span class="leftIcon">{{list.memberFbName|subStrings(1)}}</span>
        <span class="c222 eils">{{list.memberFbName}}</span>
      </div>
      <span class="rightText size12 c999 font1">{{list.dealCount}}单</span>
    </div>
    <div class="bottomBox mar_t_10 flex-between">
      <div class="leftBox c999 size12 flex_column font1" style="justify-content:space-between">
        <div>限额：{{list.minPrice|SubString(2)}}-{{(list.nowPrice*list.num)|SubString(2)}} CNY</div>
        <div class="mar_t_3">数量：{{(list.num)|SubString(8)}} {{list.currency}}</div>
        <div class="iconBox mar_t_6">
          <!-- <img src="../assets/images/home/bankCard.png" alt srcset class="icons" />
          <img src="../assets/images/home/zhifubao.png" alt srcset class="icons" />-->
          <!-- <img
            src="../assets/images/home/wexin.png"
            alt
            srcset
            class="icons"
            v-show="list.payType=='WECHAT'"
          />-->
          <!-- <div v-for="(item,i) in chooseArr" :key="i"> -->
          <div class="flex align_center">
            <img
              src="../assets/images/home/bankCard.png"
              alt
              srcset
              class="wid16 hei16 mar_r_6"
              v-if="payType.indexOf('BANKCARD')>=0"
            />
            <img
              src="../assets/images/home/wexin.png"
              alt
              srcset
              class="wid16 hei16 mar_r_6"
              v-if="payType.indexOf('WECHAT')>=0"
            />
            <img
              src="../assets/images/home/zhifubao.png"
              alt
              srcset
              class="wid16 hei16 mar_r_6"
              v-if="payType.indexOf('ALIAY')>=0"
            />
          </div>
        </div>
      </div>
      <div class="rightBox">
        <p class="size20 blue_text font1 linehei15 right_text">￥{{list.nowPrice|SubString(2)}}</p>
        <!-- <span class="blue_bg btns mar_t_8" @click='goPay'></span> -->
        <span class="blue_bg btns mar_t_8" @click="goBuy" v-if="type=='buy'">购买</span>
        <span class="blue_bg btns mar_t_8" @click="goBuy" v-if="type=='sell'">出售</span>
      </div>
    </div>
    <transactionPoup :type="type" ref="mychild" :list="list" />
  </div>
</template>
<script>
import { mapState } from "vuex";
import transactionPoup from "./transactionPoup";
export default {
  props: ["type", "list", "noBorder", "nickName", "payType"],
  components: { transactionPoup },
  data() {
    return {
      chooseArr: []
    };
  },
  methods: {
    async goBuy() {
      var _this = this;
      if (!this.$util.isNickname(this, this.nickName)) {
        return;
      }
      if (this.$store.state.userId == this.list.member) {
        this.Toast("请勿购买自己的订单");
        return;
      }
      let res = await this.$post1("otc/order/ownOrderList", {
        priceOrderStatus: "NONPAYMENT",
        userId: this.$store.state.userId,
        page: 1,
        size: 10
      });
      if (res.result && res.result.data && res.result.data.length > 0) {
        this.Dialog.confirm({
          title: "",
          message: "当前有未完成订单，去完成？"
        })
          .then(() => {
            _this.$router.push({
              name: "otcOrder",
              params: {
                active: 1
              }
            });
          })
          .catch(() => {});
        return;
      }
      this.$refs.mychild.goBuy();
    }
  },
  mounted() {
    // console.log(this.payType);
    // if (this.payType) {
    //   this.chooseArr = this.payType.split("-");
    // }
  },
  computed: {}
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.otcItem {
  .topBox {
    .leftIcon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: inline-block;
      background: #3c78e1;
      color: #fff;
      text-align: center;
      line-height: 30px;
      margin-right: 10px;
    }
  }
  .iconBox {
    display: flex;
    align-items: center;
    .icons {
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }
  .bottomBox {
    .rightBox {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .btns {
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 5px;
        font-weight: bold;
      }
    }
  }
}
</style>
