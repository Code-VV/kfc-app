<template>
  <div class=" helpCenter">

    <van-row class="bor_b hei60 c_fff size14 pad_l_r_15" v-for="(item,i) in 4" :key="i">
        <van-col :span="18" class="flex_col hei00">
            <div class="c222">充币成功：您已成功充币9USDT</div>
            <div class="c999">2020-06-25 14:56:45</div>
        </van-col>
        <van-col :span="6">
            <div class="c_blue a_right linehei60">查看详情</div>
        </van-col>
    </van-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  // activated() {
    
    
  // },
  
  components: {},
  data() {
    return {
      show: true
    };
  },
  computed: {
    
  },
  mounted() {
    var _this = this;
    this.init();
  },
  watch: {},
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setStatusBar"
    ]),
    init() {
      this.setnavTitle("消息列表");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    back() {
      this.$router.go(-1);
    },

  },
  destroyed() {}
};
</script>
<style lang="scss">
.invitation {
  .van-row {
    margin-left: 0;
    margin-right: 0;
  }
  .leftIcon {
    padding-left: 15px;
    height: 46px;
    display: flex;
    align-items: center;
    width: 35px;
  }
  .van-icon {
    font-size: 20px;
  }
  .van-icon-arrow-left:before {
    color: #fff;
  }
  .models {
    height: 400px;
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  }
}
</style>
<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.helpCenter{
    @include base-background();
    .flex_col{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

  .imgs {
    width: 100%;
  }
}

</style>