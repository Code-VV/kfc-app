<template>
  <div class="page">
    <div class="con">
      <!-- <van-empty description="暂无记录" v-show="isShow" /> -->
      <div class="box" v-for="(item,index) in recordList" :key="index" v-show="isRecord">
        <span class="mort_date">{{$t('zy.cjsj')}}{{item.createTime}}</span>
        <span class="mort_num">{{$t('zy.zysl')}}{{item.money}}USDT</span>
        <span class="reward_num">{{$t('zy.fhje')}}{{item.expectMoney}}USDT</span>
        <span class="reward_num">{{$t('zy.jssj')}}{{item.expireTime}}</span>
        <!-- <van-button
          color="#68BEFF"
          @click="redeemThis(item.id,item.syt_num)"
          style="width:100%;height:40px;line-height:40px;"
        >{{$t('zy.sh')}}</van-button> -->
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
      isShow: false, //是否展示空状态
      isRecord: true, //是否展示数据
    };
  },
  created() {
    this.init();
    this.getDataResult();
  },
  components:{
          userId() {
            return this.$store.state.userId;
        }
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
      this.setnavTitle(this.$t('zy.zyfhjr'));
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    },
    //获取质押记录
    getDataResult() {
      // this.$post1("otc/ieo/mortgageHistory", {
      //   member: this.$store.state.userId,
      // }).then((res) => {
      //   console.log(res);
      //   if (res.result.length == 0) {
      //     this.isShow = true;
      //     this.isRecord = false;
      //   } else {
      //     this.recordList = res.result;
      //     this.isRecord = true;
      //   }
      // });
      //获取分红记录
      //  this.$post1("otc/ieo/rewardHistory", {
      //   member: this.$store.state.userId,
      // }).then((res) => {
      //   this.reward = res.result
        // if (res.result.length == 0) {
        //   this.isShow = true;
        // } else {
        //   this.recordList = res.result;
        //   this.isRecord = true;
        // }
      // });
      this.$post1("member/pledge/selectPledgeRecord",{
        member:this.userId
      }).then((res)=>{
        for(let i=0; i<res.result.length; i++){
          res.result[i].createTime=new Date(parseInt(res.result[i].createTime)).toLocaleString().replace(/:\d{1,2}$/,' ');  
          res.result[i].expireTime=new Date(parseInt(res.result[i].expireTime)).toLocaleString().replace(/:\d{1,2}$/,' ');  
        // alert("a")

        }
        this.recordList=res.result
      })
    },
    //赎回
    redeemThis(id, num) {
      this.$post1("otc/ieo/redeem", {
        mortgageId: id,
        member: this.$store.state.userId,
        num: num,
      }).then((res) => {
        if (res.status == "SUCCEED") {
          this.$toast(this.$t('zy.shcg'));
          this.getDataResult(); //重显
        } else {
          this.$toast(res.errorMessage);
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
  height: 25vh;
  background-color: white;
  padding: 3vh 10vw;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  span {
    color: #333;
    font-size: 16px;
    line-height: 4vh;
  }
}
</style>