<template>
  <div class="container_common1 orderDetail">
      <div class="size16 blue_text mar_t_15">成交数量</div>
      <div class="greyBg pad_t_b_8 pad_l_r_10 mar_t_10 size16">720.58989236 USDT</div>
      <div class="size16 blue_text mar_t_25">未成交数量</div>
      <div class="greyBg pad_t_b_8 pad_l_r_10 mar_t_10 size16">720.58989236 USDT</div>
      <div class="size12 c999 mar_t_15">成交时间：07-08 14:56:45</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.init();
  },
  components: {
  },
  computed: {

  },
  data() {
    return {
     
    };
  },
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow"
    ]),
    init() {
      this.setnavTitle("出售单详情");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
   
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/theme.scss";

.orderDetail {
  @include base-background();

}
</style>
<style lang="scss" scoped>
.orderDetail {
  display: flex;
  flex-direction: column;

}
</style>