<template>
  <div class="notice-list">
    <div @click="qie(0)" class="da">
      <div class="r">
        <div>
          <img src="../../assets/images/meiyuan.png" alt="" />
          <div>USD</div>
        </div>
      </div>
      <img v-show="qh" src="../../assets/images/duigou.png" alt="" />
    </div>

    <!-- <div @click="qie(1)" class="da">
      <div class="r">
        <div>
          <img src="../../assets/images/renminbi.png" alt="" />
          <div>CNY</div>
        </div>
      </div>
      <img v-show="!qh" src="../../assets/images/duigou.png" alt="" />
    </div> -->
  </div>
</template>

<script>
import { Toast } from "vant";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      // 公告列表
      noticeList: [],
      qh: "",
    };
  },
  mounted() {
    this.init();
    this.getNotice();
  },
  destroyed() {
    this.setnavBarShowRight(false);
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
    ]),
    init() {
      this.setnavTitle(this.$t("add.qhhl"));
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
      this.setnavBarShowRight(false);
    },
    qie(v) {
      if (v == 0) {
        this.$store.commit("huilv", true);
      } else {
        this.$store.commit("huilv", false);
      }
      this.$router.push("home");

    },
    //公告列表
    getNotice() {
      let data = {
        noticeType: "OFFICIAL",
        global: "CHINESE_SIM",
      };
      //获取公告列表
      this.$get("data/data/getNotices", data).then((res) => {
        if (res && res.status == "SUCCEED") {
          this.noticeList = res.result || [];
        }
      });
    },
  },
  created() {
    this.qh = this.$store.state.qh;
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.notice-list {
  height: 100%;
  background-color: rgb(23, 30, 40);
  .da {
    color: #fff;
    font-size: 16px;
    height: 40px;
    padding-left: 30px;
    padding-right: 50px;
    border-bottom: 4px solid #1e2633;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      display: flex;
      align-items: center;
    }
    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }
}
</style>
