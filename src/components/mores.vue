<template>
  <div class="moresBox" id="moresBox">
    <!-- <div class="iconsBox" @click="openPoup" @close="close" @click-overlay='clickOverlay'>
      {{show}}
      <img src="../assets/images/home/mores1.png" alt srcset class="icons" />
    </div>-->
     <van-overlay :show="show" @click="closed" z-index='9' />
    <div v-if="type=='otc'" class="relative" style="z-index:999">
      <div v-show="show" :get-container="getContainer" class="otcModel c333">
        <div class="items" @click="goTransfer">
          <img src="../assets/images/home/otcIcon1.png" alt srcset class="imgs wid16 hei12" />
          <span class="span">{{$t('fb.zjhz')}}</span>
        </div>
        <div class="items" @click="goOrderList">
          <img src="../assets/images/home/otcIcon2.png" alt srcset class="imgs wid14 hei17" />
          <span class="span border_t">{{$t('fb.jyd')}}</span>
        </div>
        <div class="items" @click="goPayment">
          <img src="../assets/images/home/otcIcon3.png" alt srcset class="imgs wid16 hei15" />
          <span class="span">{{$t('fb.skfs')}}</span>
        </div>
      </div>
      <!-- <van-popup v-model="show" :get-container="getContainer" class="otcModel" @close="close">
        <div class="items" @click="goCoinCharging">
          <img src="../assets/images/home/otcIcon1.png" alt srcset class="imgs wid16 hei12" />
          <span class="span">资金划转</span>
        </div>
        <div class="items" @click="goOrderList">
          <img src="../assets/images/home/otcIcon2.png" alt srcset class="imgs wid14 hei17" />
          <span class="span border_t">交易单</span>
        </div>
        <div class="items" @click="goPayment">
          <img src="../assets/images/home/otcIcon3.png" alt srcset class="imgs wid16 hei15" />
          <span class="span">收款方式</span>
        </div>
      </van-popup> -->
    </div>
    <div v-else class="relative" style="z-index:999">
      <div v-if="show" :get-container="getContainer" class="modelBox bg_tabbar" >
        <div class="items" @click="goCoinCharging">
          <img src="../assets/images/home/transaction1.png" alt srcset class="imgs" />
          <span class="span">{{$t('headerPopup.cb')}}</span>
        </div>
        <div class="items" @click="goWithdrawCoin">
          <img src="../assets/images/home/transaction2.png" alt srcset class="imgs" />
          <span class="span">{{$t('headerPopup.tb')}}</span>
        </div>
        <div class="items" @click="goTransfer">
          <img src="../assets/images/home/transaction3.png" alt srcset class="imgs" />
          <span class="span">{{$t('headerPopup.hz')}}</span>
        </div>
      </div>
      <!-- <van-popup v-model="show" :get-container="getContainer" class="modelBox" @close="close">
        <div class="items" @click="goCoinCharging">
          <img src="../assets/images/home/transaction1.png" alt srcset class="imgs" />
          <span class="span">充币</span>
        </div>
        <div class="items" @click="goWithdrawCoin">
          <img src="../assets/images/home/transaction2.png" alt srcset class="imgs" />
          <span class="span">提币</span>
        </div>
        <div class="items" @click="goTransfer">
          <img src="../assets/images/home/transaction3.png" alt srcset class="imgs" />
          <span class="span">划转</span>
        </div>
      </van-popup> -->
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    type: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: true
    };
  },
  watch: {
    searchText(val) {
      if (val == "") {
        //恢复原来的数据
        this.pairsList = this.copylist;
      } else {
        // console.log(val);
        val = val.toUpperCase();
        let copylist = this.copylist;
        let arr = [];
        copylist.forEach(ele => {
          if (ele.tokenCur.indexOf(val) != -1) {
            arr.push(ele);
          }
        });
        this.pairsList = arr;
      }
    }
  },
  mounted() {
  },
  methods: {
    // 返回一个特定的 DOM 节点，作为挂载的父节点
    getContainer() {
      return document.querySelector("#moresBox");
    },
    closed() {
      // console.log(this.show)
      this.$emit("close");
      // this.closed=false;
    },
    //充币
    goCoinCharging() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: `/assets/coinCharging`
      });
    },
    //提币
    goWithdrawCoin() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: `/assets/withdrawCoin`
      });
    },
    //划转
    goTransfer() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: `/assets/transfer`
      });
    },
    //付款方式
    goPayment() {
      if (!this.$util.isLogin()) {
        return;
      }

      this.$router.push({
        path: `/payment`
      });
    },
    //订单
    goOrderList() {
      if (!this.$util.isLogin()) {
        return;
      }

      this.$router.push({
        path: `/transaction/otcOrder`
      });
    }
  },
  computed: {}
};
</script>
<style lang="scss">
.moresBox {
  .van-popup {
    position: absolute;
    top: 86px;
    height: 120px;
    width: 85px;
    border-radius: 3px;
    left: 0;
    max-height: none;
  }
}
</style>
<style lang="scss" scoped>
.moresBox {
  position: relative;
  .iconsBox {
    position: relative;
    .icons {
      width: 15px;
      height: 15px;
    }
    padding-left: 20px;
  }
  .modelBox {
     min-width:100px;
    // height: 120px;
    padding-top: 15px;;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 4px;;
    .items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding: 0 20px 15px;
      .imgs {
        width: 18px;
        height: 18px;
        margin-right: 4px;;
      }
    }
  }
  .otcModel {
    // width: 120px;
    // height: 130px;
    background: rgba(51, 51, 51, 1);
    box-shadow: 0px 0px 10px 0px rgba(121, 121, 121, 0.2);
    padding: 15px 15px 15px 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 4px;
    .items {
      display: flex;
      padding-left: 13px;
      align-items: center;
       font-size: 14px;
       padding-bottom: 20px;
       &:last-child{
         padding-bottom: 0;
       }
      .imgs {
        margin-right: 10px;
      }
      .span {
        flex: 1;
        color: #fff;
        font-weight: 500;

        // &.border_t {
         
        //   padding-top: 13px;
        //   padding-bottom: 13px;
        //   border-bottom: 1px solid rgba(68, 68, 68, 1);
        //   border-top: 1px solid rgba(68, 68, 68, 1);
        // }
      }
    }
  }
}
.span{
  color: #fff;
}
</style>
