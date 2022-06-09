<template>
  <div class="moresBox" id="moresBox">
    <van-overlay :show="show" @click="closed" z-index="9" />
    <div v-if="type == 'otc'" class="relative" style="z-index: 999"></div>
    <div v-else class="relative" style="z-index: 999">
      <div v-if="show" :get-container="getContainer" class="modelBox bg_tabbar">
        <div class="items" @click="changeLogin(1)">
          <span class="span">简体中文</span>
        </div>
        <div class="items" @click="changeLogin(3)">
          <span class="span">繁體中文</span>
        </div>
        <div class="items" @click="changeLogin(2)">
          <span class="span">English</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapMutations } from "vuex";
export default {
  props: {
    type: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      show: true,
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
        copylist.forEach((ele) => {
          if (ele.tokenCur.indexOf(val) != -1) {
            arr.push(ele);
          }
        });
        this.pairsList = arr;
      }
    },
  },
  mounted() {},
  methods: {
    changeLogin(v) {
      if (v === 1) {
        window.localStorage.setItem("currentLangue", "zh");
        this.$i18n.locale = "zh";
        this.$router.go(0);
      } else if (v === 2) {
        window.localStorage.setItem("currentLangue", "en");
        this.$i18n.locale = "en";
        this.$router.go(0);
      } else {
        window.localStorage.setItem("currentLangue", "zh_f");
        this.$i18n.locale = "zh_f";
        this.$router.go(0);
      }
    },
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
        path: `/assets/coinCharging`,
      });
    },
    //提币
    goWithdrawCoin() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: `/assets/withdrawCoin`,
      });
    },
    //划转
    goTransfer() {
      if (!this.$util.isLogin()) {
        return;
      }
      this.$router.push({
        path: `/assets/transfer`,
      });
    },
    //付款方式
    goPayment() {
      if (!this.$util.isLogin()) {
        return;
      }

      this.$router.push({
        path: `/payment`,
      });
    },
    //订单
    goOrderList() {
      if (!this.$util.isLogin()) {
        return;
      }

      this.$router.push({
        path: `/transaction/otcOrder`,
      });
    },
  },
  computed: {
    i18n() {
      return this.$t("form");
    },
  },
};
</script>
<style lang="scss">
.moresBox {
  .van-popup {
    position: absolute;
    top: 0px;
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
    position: fixed;
    top: 60px;
    right: 20px;
    min-width: 100px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 4px;
    .items {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding: 0 20px 0px;
      .imgs {
        width: 18px;
        height: 18px;
        margin-right: 4px;
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
      &:last-child {
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
.span {
  display: block;
  color: #fff;
  height: 33.5px;
  line-height: 33.5px;
}
</style>
