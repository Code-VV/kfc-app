<template>
  <div class="page">
    <div class="con">
      <van-empty :description="$t('record.zwjr')" v-show="isShow"/>
      <div class="box" v-for="(item,index) in recordList" :key="index" v-show="isRecord">
          <span class="mort_date">{{$t('record.dzsj')}}{{item.createTime|yndhms}}</span>
          <span class="mort_num">{{$t('record.dzsl')}}{{item.sytNum}}</span>
          <!-- <span class="reward_num">分红金额：0.00</span> -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "record",
  data() {
    return {
      recordList: [],
      isShow:false, //是否展示空状态
      isRecord:false //是否展示数据
    };
  },
  created() {
    this.init();
    this.getDataResult()
  },
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setLogin",
      "setToken",
      "setUserId",
      "setnavBarBgColor",
    ]),
    // 初始化页面
    init() {
      this.setnavTitle(this.$t('activity.shjr'));
      this.setbackRouter("activity");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, 
    //获取赎回记录
    getDataResult() {
      this.$post1("otc/ieo/redeemHistory", {
        member: this.$store.state.userId,
      }).then((res) => {
        if (res.result.length == 0) {
          this.isShow = true;
        } else {
          this.recordList = res.result;
          this.isRecord = true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  height: 100%;
  width: 100%;
  background-color: #f9f9f9;
}
.con {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.box {
  width: 90%;
  margin: 1vh 0;
  height: 20vh;
  background-color: white;
  padding: 2.5vh 12vw;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    color: #333;
    font-size: 16px;
    line-height: 5vh;
  }
}
</style>