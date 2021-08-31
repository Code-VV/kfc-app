<template>
  <div class="mortgage">
    <!-- 质押说明 -->
    <div class="mortgage_about">
      <p>{{$t("activity.sytcyz")}}</p>
    </div>
    <!-- 质押操作 -->
    <div class="mortgage_form">
      <span class="f14" style="display:inline-flex;align-items:center" @click="goRecord(0)"><van-icon
        name="notes-o"
        size="22px"
        color="#333"
      />{{$t("activity.zyjr")}}</span>
      <!-- <span class="f14" style="display:flex;align-items:center;float:right" @click="goRecord(1)"><van-icon
        name="notes-o"
        size="22px"
        color="#333"
      />{{$t("activity.shjr")}}</span> -->
      <ul>
        <li class="console_list">
          <span class="f16">{{$t("activity.wdljfh")}} : </span>
          <span class="textstyle">{{usdt||0.00}} USDT</span>
        </li>
        <li class="console_list">
          <span class="f16">{{$t("activity.kyzc")}} : </span>
          <span class="textstyle">{{syt}} USDT</span>
        </li>
        <li class="console_list">
          <span class="f16"><van-cell class="xlk f16" is-link :title="$t('activity.zyzq')" @click="show = true">{{action.name}}</van-cell></span>
          <span><van-action-sheet v-model="show" :actions="actions" @select="onSelect" /></span>
        </li>
        <li class="console_list">
          <span class="f16">{{$t('activity.zyll')}} : </span>
          <span class="textstyle">{{rate.rate*100}} %</span>
        </li>
        <li class="console_list">
          <div class="box">
          <span class="f16 box1">{{$t('activity.zysl')}} : </span>
          <van-field type="number" class="srk" v-model="value" />
          <span class="textstyle box2">USDT</span>
          </div>
        </li>
      </ul>
      <van-button
        class="f14"
        @click.stop="showDialog"
        color="#68BEFF"
        style="width:100%;height:6vh;margin-top:10px"
      >{{$t("activity.zy")}}</van-button>
      <!-- <van-dialog
        v-model="openDialog"
        title="质押"
        class="dialog"
        show-cancel-button
        cancel-button-color="#ccc"
        confirm-button-text="质押"
        confirm-button-color="#68BEFF"
        @confirm="mortgage"
      >
        <div class="dialog-content">
          <input type="Number" v-model="count" :placeholder="placeNum" class="input" />
        </div>
      </van-dialog> -->
    </div>
    <!-- 规则说明 -->
    <!-- <div class="mortgage_rule">
      <h3>{{$t("activity.gzsm")}}</h3>
      <ul class="mort_about f14">
        <li class="mort_con">
          <span>1.{{$t("activity.hdfh")}}</span>
        </li>
        <li class="mort_con">
          <span>2.{{$t("activity.sssh")}}</span>
        </li>
        <li class="mort_con">
          <span>3.{{$t("activity.yhtjsh")}}</span>
        </li>
        <li class="mort_con">
          <span>4.{{$t("activity.zyfhbl")}}</span>
        </li>
        <li class="mort_con">
          <span>5.{{$t("activity.kyzcct")}}</span>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
import axios from 'axios';
import Qs from 'qs'
export default {
  data() {
    return {
      openDialog: false,
      count: 0, //质押数量
      placeNum: "", //提示数量
      minNum: 0, //最低数量
      maxNum: 0, //最高数量
      syt: 0, //可质押金额
      usdt:0, //累计分红
      value:'10',
      show: false,
      // 质押周期数组
      actions: [],
      //当前质押周期
      action:null,
      //质押费率数组
      rates:[],
      //质押费率
      rate:null,
      // 质押id
      periodId:null

    };
  },
  mounted() {
    this.init();
    //获取可质押数
    // this.getDataRequest();
  },
  watch: {
    value(){
      if(this.value>this.syt){
        // alert("a")
        this.value=this.syt
      }
    }
  },
  created() {
        // this.getDataRequest();
        this.getPeriodAll()
        this.getAccumulateShare()
        this.getmoney()
  },
  computed: {
      userId() {
            return this.$store.state.userId;
        }
    // i18n() {
    //     return this.$t("form");
    // },
    // countryCode() {
    //     return this.$store.state.countryCode || 86;
    // }
  },
  destroyed() {
    this.setnavBarBgColor("");
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
    onSelect(item){
      this.show = false;
      console.log(item);
      this.action=item
      this.periodId=this.action.id
      for(let i=0 ; i<this.actions.length; i++){
              if(this.actions[i]==item){
                // alert(i)
                // console.log(i);
                this.rate=this.rates[i]
                // this.periodId=

        }
      }
      console.log(this.action);
      // console.log();
    },
    goRecord(type) {
      //记录页面
      if(type == 0){
        this.$router.push("/mort_record");
      }else{
        this.$router.push("/redeem_record");
      }
    },
    init() {
      this.setnavTitle($t("activity.sytzyjh"));
      this.setbackRouter("activity");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    },
    //获取可质押数量
    getPeriodAll(){
      axios.post("/member/pledge/selectPledgePeriodAll",{
      }).then((res)=>{
        for(let result of res.result){
          console.log(result.day);
          this.actions.push({name:result.day+this.$t('activity.t'),id:result.id})
          this.rates.push({rate:result.rate})
        }
        this.rate=this.rates[0]
        this.action=this.actions[0]
        this.periodId=this.actions[0].id
        console.log(this.actions);
      })
    },
    // 获取质押利率
    getAccumulateShare(){
      axios.post("/member/pledge/selectAccumulateShare",this.userId).then((res)=>{
        this.usdt=res.result
          console.log(this.result);
      })
    },
    // 获取可用资产
    getmoney(){
          this.$get("member/balance/getBalanceList", {
                member: this.userId,
                coinType: 'SPOT'
                // balanceType: balanceType
            }).then(res => {
                for(let m of res.result.balances){
                      if(m.currency=="USDT"){
                        this.syt=m.scaleBalanceUsdt
                      }
                }
            });
    },
    // 这个请求失败
    // getDataRequest() {
    //   this.$post1("otc/ieo/availablesyt", {
    //     member: this.$store.state.userId,
    //   }).then((res) => {
    //     console.log(res);
    //     this.syt = res.result.syt;
    //     this.usdt = res.result.usdt
    //   });
    // },
    // 获取质押周期

    mortgage() {
      //质押
      if (!this.count) {
        this.$toast($t("activity.qsrzysl"));
      } else if (this.count < 10 || this.count > 100000) {
        this.$toast($t("activity.kzyslzj"));
        return;
      }
      this.$post1("otc/ieo/mortgage", {
        member: this.$store.state.userId,
        num: this.count,
      }).then((res) => {
        console.log(res);
        if (res.result == "SUCCESS") {
          this.$toast($t("activity.zycg"));
          this.getDataRequest();
          // this.mortgageId = res.result.mortgageId;
        } else {
          this.$toast(res.errorMessage);
        }
      });
    },
    // 显示质押框
    showDialog() {
      // if (!this.$util.isLogin()) {
      //   return;
      // } else {
      // this.openDialog = true;
      // this.count = "";
      // this.placeNum = "$t('activity.sssh')+(" + 10 + "-" + 100000 + ")";
      // }
      // 添加质押 127.0.0.1:8765/pledge/pledgeSave?member=b9824f5772d23ce0c0b3a91a3b9a4904&money=1000&period=30
      let d={
        member:this.userId+"",
        money:this.value,
        periodId:this.periodId
      }
      // this.$post("member/pledge/pledgeSave",Qs.stringify(d)).then(res => {
      //   console.log(res);
      //    });
      // axios({
      //   method: 'post',
      //   url:'/pledge/pledgeSave',
      //   headers:{
      //     // 'Content-Type': 'multipart/form-data'
      //     "Content-Type":"application/x-www-form-urlencoded"
      //   },
      //   data:Qs.stringify(d)
      // })
      axios({
                url:"/member/pledge/pledgeSave",
                method: 'post',
                headers:{
				    "Content-Type":"application/x-www-form-urlencoded", //改这里就好了
                },
                data:Qs.stringify(d)//这是处理请求参数
            })
    },
    rememberAccount(account) {
      window.localStorage.setItem("account", account);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.xlk{
  margin: 0;
  padding: 0;
  color: black;
}
.box{
  display: flex;
}
.box1{

}
.box2{
  
}
.srk{
  display: inline-block;
    margin: 0;
  padding: 0;
  display: 1;
  width: 100px;
}
.mortgage {
  [class*="van-hairline"]::after {
    border: none;
  }
  background: #f9f9f9;
  width: 100%;
  height: 100%;
  position: relative;

  .headers {
    @include base-background();
    // background-color: #fff;
    padding-top: 20px;
    color: #333;
  }

  .title {
    margin-top: 30px;
    height: 40px;
    line-height: 40px;

    .bottom1 {
      border-bottom: 2px solid $blue;
      position: absolute;
      width: 40px;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
    }
  }

  .logo {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .logo_img {
      width: 90px;
      height: 90px;

      //  background: #ededed;
      img {
        width: 90px;
        height: 90px;
      }
    }
  }
  .mortgage_about {
    width: 100%;
    height: 9vh;
    text-align: center;
    font-size: 14px;
    color: #333;
    p {
      width: 60vw;
      text-align: center;
      margin-left: 50%;
      margin-top: 20px;
      transform: translate(-50%, 0);
    }
  }
  .mortgage_form {
    background: #fff;
    width: 94vw;
    height: 33vh;
    margin: 0 3vw 2vh 3vw;
    border-radius: 20px;
    padding: 2vh 4vw;
  }
  .mortgage_rule {
    background: #fff;
    width: 94vw;
    height: 37vh;
    margin: 3vh 3vw 0vh 3vw;
    border-radius: 20px;
    padding: 3vh 4vw 5vh 3vw;
    h3 {
      margin-bottom: 5vh;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
    }
    ul {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .mort_about {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
  }
  .con {
    .btn {
      width: 100%;
    }
  }
}
.textstyle {
  font-size: 16px;
  color: #68beff;
  text-indent: 5vw;
}
.f16 {
  font-size: 16px;
}
.f14 {
  font-size: 14px;
  color: #666666;
}
.console_list {
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 5px;
  margin-top: 15px;
}
.mort_con {
  padding-bottom: 4px;
  margin-top: 2px;
}
.dialog {
  .dialog-content {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 10px auto;

    .input {
      padding: 0 10px;
      margin: auto;
      width: 80%;
      height: 50px;
      border: none;
    }
  }
}
</style>
