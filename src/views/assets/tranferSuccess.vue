<template>
  <div class="withdrawCoin">
    <div class="success_bg"></div>
    <van-cell title="划转路径">
      <!-- <span slot="default" class="size15 c222">{{transferTit=='true'?'币币账户 - 合约账户':'合约账户 - 币币账户'}}</span> -->
      <span slot="default" class="size15 c222">{{formName+'-'+toName}}</span>
    </van-cell>
    <van-cell title="实际到账数量">
      <span slot="default" class="size15 orange_text">{{coinNum|toFixed(4)}} {{currency}}</span>
    </van-cell>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},
  activated() {},
  data() {
    return {
      transferTit: true, //true币币到合约
      coinNum: 0, //提币金额
      currency:'',//币名
      formName:'',//转出账户
      toName:'',//转入账户
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
      "setnavBarShowRight",
      "setStatusBar"
    ]),
    init() {
      this.setnavTitle("划转成功");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
      this.setnavBarBgColor("#3863EF");
      this.setStatusBar("light");
       this.setnavBarShowRight(true);
    }
  },
  mounted() {
    this.init();
    this.formName = this.$route.params.formName || '';
    this.toName = this.$route.params.toName || '';
    this.coinNum = this.$route.params.balance || 0;
    this.currency = this.$route.params.currency || 'USDT';
  },
  destroyed() {
    this.setnavBarBgColor("");;
    // this.setStatusBar("dark");
     this.setnavBarShowRight(false);
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";
.withdrawCoin{
  @include base-background();
  height:100%
}

.success_bg {
    

  width: 100%;
  height: 248px;
  background: url(../../assets/images/home/succ_bg.png) no-repeat;
  background-size: 100% 100%;
  padding-top: 46px;
  margin-top: -46px;
}
</style>