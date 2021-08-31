<template>
  <div>
    <div class="orderItem flex-between pad_t_b_10 font1" @click="goDetail">
      <div class="leftBox">
        <div>
          <span class="size16 blue_text"  v-if="userId==list.userId">{{list.userDirection=='SELL'?'卖出':'买入'}}{{list.currency}}</span>
          <span class="size16 blue_text"  v-else>{{list.storeDirection=='SELL'?'卖出':'买入'}}{{list.currency}}</span>
        </div>
        <div class="size16 c666 mar_t_2">{{list.price|SubString(2)}}</div>
        <div class="size12 c333 mar_t_2">总金额：{{list.totalPrice|SubString(2)}}</div>
      </div>
      <div class="rightBox size13 c333">
        <span v-if="list.status=='NONPAYMENT'">未付款</span>
        <span v-if="list.status=='PAYMENT'">已付款</span>
        <span v-if="list.status=='FINISH'">已完成</span>
        <span v-if="list.status=='CALLOFF'">已取消</span>
        <div class="mar_t_2">数量：{{list.num}}</div>
        <span class=" size12 mar_t_2">{{list.createTime|yndhms('M')}}</span>
      </div>
    </div>
    <div class="darkLine"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    list: {
      type: Object,
      default: {}
    },
    type: {
      type: String, //entrust委托,history历史
      default: ""
    },
    subType: {
      type: String, //'contractType'全部类型，entrust委托，revoke撤销
      default: ""
    },
    n: {
      type: Number,
      default: -1
    },
    userId:{
      type:String,
      default:''
    }
  },
  computed: {
   
  },
  data() {
    return {
    };
  },
  methods: {
    //撤单
    cancelorder(id) {
      if (!this.$util.isLogin()) {
        return;
      }
      this.Dialog.confirm({
        title: "提醒",
        message: "是否确认撤销订单"
      })
        .then(() => {
          this.$util.showLoading();
          this.$post1("entrust/entrust/closeEntrust", {
            entrust: id
          })
            .then(res => {
              this.Toast.clear();
              if (res && res.status == "SUCCEED") {
                if (res.result == true) {
                  this.Toast("撤销订单成功");
                  this.$emit("cancelorder", id);
                }
              } else {
                this.Toast(res.errorMessage);
              }
            })
            .catch(err => {
              this.Toast.clear();
            });
        })
        .catch(() => {});
    },
    //去详情
    goDetail() {
      // this.$router.push({
      //   path: `/transaction/orderDetail`
      // });
      this.$router.push({
        // path: `/quotes/quotesDetail?id=${id}`
        path: `/transactionDetail`,
        query: {orderPriceId:this.list.id }
      });
    }
  },
  mounted() {},
  computed: {}
};
</script>
<style lang="scss">
.contractItem {
  .van-cell {
    padding-left: 0;
    padding-right: 0;
    font-size: 11px;
  }
  .van-cell__title {
    color: #666666;
  }
  .van-cell__value {
    color: #222222;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";
.orderItem {
  .rightBox {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }
}
</style>
