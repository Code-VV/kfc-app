<template>
  <div class="withdrawCoin">
    <div class="success_bg">
      <div class="center_text size12  pad_l_15 pad_r_15">{{$t('tbcg.dzsj')}}</div>
    </div>
    <van-cell :title="$t('tbcg.sjdz')" class="money">
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
      address: "", //提币地址
      coinNum: null, //提币金额
      currency:''
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
      this.setnavTitle(this.$t('tbtbcgcg.tbcg'));
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
      this.setnavBarShowRight(true);
      this.setnavBarBgColor("#3863EF");
      this.setStatusBar("light");
    }
  },
  mounted() {
    this.init();
    this.coinNum = this.$route.query.balance || 0;
    this.currency = this.$route.query.currency || 'USDT';
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
  padding-top: 54px;
  margin-top: -46px;
  color: #fff;
}
</style>