<template>
  <div >
    <img src="../../assets/images/home/helpDetail4.png" alt class="wid00"/>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  activated() {
    this.init();
  },
  components: {},
  data() {
    return {
    };
  },
  computed: {},
  mounted() {
    var _this = this;
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
      this.setnavTitle("充币");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    back() {
      this.$router.go(-1);
    }
  },
  destroyed() {}
};
</script>
<style lang="scss">

</style>
<style lang="scss" scoped>

</style>