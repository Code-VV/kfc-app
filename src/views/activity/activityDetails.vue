<template>
  <div class="activity container_common1">
    <header class="header" :style="{ paddingTop: safeTop + 'px' }">
      <div class="header_custom">
        <div
          class="left"
          :class="isNight == 'night-theme' ? 'whiteIcons' : 'darkIcons'"
        >
          <van-icon name="arrow-left" @click="$router.go(-1)" />
        </div>
        <div class="center nav-title">套利</div>
      </div>
    </header>
    <div>
      <img src="@/assets/images/activity/btb.png" alt="" class="btb" />
      <p class="btc">{{ name }}</p>
    </div>
    <div class="qj">
      <p>{{ i18n.qj }}</p>
      <div class="data">
        <div :class="{ action: 1 == active }" @click="color(1)">1日</div>
        <div :class="{ action: 7 == active }" @click="color(7)">7日</div>
        <div :class="{ action: 15 == active }" @click="color(15)">15日</div>
      </div>
    </div>
    <div class="text">
      <div class="divd">
        <div class="r">{{ i18n.lj }}:</div>
        <p>{{ profit.totalYear * 100 + "%年收益" }}</p>
      </div>
      <div class="divd">
        <div class="r">{{ i18n.ky }}{{ name }}:</div>
        <p ref="ky">{{ profit.coinBalances }}</p>
      </div>
      <div class="divd">
        <div class="r">{{ i18n.jxfs }}:</div>
        <p>{{ profit.accrueInterest }}</p>
      </div>
      <div class="divd">
        <div class="r">{{ i18n.gxsj }}:</div>
        <p>{{ profit.updateTime }}</p>
      </div>
      <div class="divd">
        <div class="r">{{ i18n.zdtlzl }}:</div>
        <p>{{ profit.lowest }}{{ name }}</p>
      </div>
      <div class="divd">
        <div class="r">{{ i18n.tlzl }}:</div>
        <div class="ss">
          <input
            type="text"
            placeholder="请输入套利总量"
            style="padding-left: 11px"
            v-model="val"
          />
          <div class="inp" @click="quan">{{ i18n.qb }}</div>
        </div>
      </div>
      <div class="divd">
        <div class="r">{{ i18n.yjsy }}:</div>
        <p>{{ val*profit.totalYear  }} {{ name }}</p>
      </div>
      <van-button type="primary" color="#169E78" @click="showPopup">{{
        i18n.qrtl
      }}</van-button>
      <van-popup class="popup" v-model="show">
        <p>输入密码</p>
        <div class="inp">
          <span>资金密码 </span
          ><input
            v-model="password"
            type="password"
            placeholder="请输入资金密码"
          />
        </div>

        <van-button type="primary" color="#171E28" @click="taoli"
          >确认提交</van-button
        >
      </van-popup>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Slider, Checkbox } from "vant";
import { hbmd5 } from "../../plugins/md5";
export default {
  name: "detail",
  components: {
    Slider,
    Checkbox,
  },
  computed: {
    ...mapState(["nowThemeInfo"]),

    safeTop() {
      return this.$store.state.safeAreaTop;
    },
    isNight() {
      return this.$store.state.nowThemeInfo;
    },
    isLogin() {
      return this.$store.state.isLogin;
    },
    i18n() {
      return this.$t("activity");
    },
  },
  data() {
    return {
      password: "",
      show: false,
      profit: "",
      active: 1,
      detail: undefined,
      id: "",
      type: "",
      count: "",
      openDialog: false,
      checked: false,
      placeNum: "",
      predict: 0,
      val: "",
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.name = this.$route.query.name;
    console.log(this.name, this.id);
    this.type = this.$route.query.type;
    // this.getPeList();
    let params = {
      id: this.id,
      day: this.active,
      userId: this.$store.state.userId,
    };

    this.$post1("/entrust/arbirtage/getPayWealth", params).then((res) => {
      console.log(res);
      if (res.result != null) {
        this.profit = res.result;
      } else {
      }
      let params1 = {
        id: this.id,
        day: this.active,
        userId: this.$store.state.userId,
        estimates: this.profit.lowest,
      };
      console.log(this.profit.lowest);
      this.active = 1;
      // 预估收益
      this.$post1("/entrust/arbirtage/getEstimated", params1).then((res) => {
        console.log(res);
        if (res.result != null) {
          this.predict = res.result.predict;
        } else {
          this.predict = 0;
        }
      });
    });
    //
  },
  mounted() {
    this.init();
  },
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setCurrency",
      "setPairsName",
      "setPairsName1",
      "setnavBarShowRight",
    ]),
    showPopup() {
      this.show = true;
    },
    taoli() {
      let data = {
        member: this.$store.state.userId,
        password: hbmd5(this.password),
      };
      console.log(hbmd5(this.password));
      this.$post1("/member/member/setToPayPass", data).then((res) => {
        if (res.result) {
          let params2 = {
            id: this.id,
            day: this.active,
            userId: this.$store.state.userId,
            estimates: this.val,
            predict: this.predict,
          };
          console.log(this.val);
          if (this.$refs.ky.innerHTML < params2.estimates) {
            this.Toast("余额不足");

            this.val = "";
            return;
          }
          this.$post1("/entrust/arbirtage/payForCoin", params2).then((res) => {
            console.log(res);
            if (res.errorMessage === "该币种已购买,处于收益状态") {
              this.Toast(res.errorMessage);
              this.password = "";
              return;
            }
            this.Toast("购买成功");
            this.profit.coinBalances = this.profit.coinBalances - this.val;
            this.password = "";
            this.val = "";
            setTimeout(() => {
              this.$router.push({
                path: "/activity",
              });
            }, 1000);
          });
        } else if (res.result == false) {
          console.log(res);
          this.Toast("密码错误");
          this.password = "";
        } else {
          this.Toast("请设置资金密码");
          this.password = "";
        }
      });
    },
    quan() {
      this.val = this.profit.coinBalances;
    },
    color(v) {
      console.log(v);
      this.active = v;
      let params1 = {
        id: this.id,
        day: this.active,
        userId: this.$store.state.userId,
        estimates: this.profit.lowest,
      };
      let params = {
        id: this.id,
        day: this.active,
        userId: this.$store.state.userId,
      };
      this.$post1("/entrust/arbirtage/getPayWealth", params).then((res) => {
        this.profit = res.result;
      });
      this.$post1("/entrust/arbirtage/getEstimated", params1).then((res) => {
        if (res.result != null) {
          this.predict = res.result.predict;
        }
      });
    },
    init() {
      // this.setnavTitle("活动");
      this.setnavTitle("");
      this.setbackRouter("/activity");
      this.setnavBarState(false);
      this.settabBarState(false);
      this.setnavBarArrow(false);
      // this.setCurrency("");
      if (this.nowThemeInfo !== "night-theme") {
        document.querySelector(".nav-title").style.color = "#323233";
      } else {
        document.querySelector(".nav-title").style.color = "#fff";
      }
    },
    // // 获取列表
    // getPeList() {
    //   this.$get(`/otc/ieo/peList?status=${this.type}`).then((res) => {
    //     if (res.status === "SUCCEED") {
    //       let temp = res.result.filter((elem) => elem.id == this.id);
    //       if (temp.length) {
    //         this.detail = temp[0];
    //         this.placeNum =
    //           this.$t("sm.qsrrgsl") +
    //           "(" +
    //           this.detail.minNum +
    //           "-" +
    //           this.detail.maxNum +
    //           ")";
    //       }
    //     } else {
    //       this.Toast(res.errorMessage);
    //     }
    //   });
    // },
    // 显示认购框
    showDialog(id) {
      // 判断账号是否冻结
      this.changeData("Privateplacement");
      if (!this.$util.isLogin()) {
        return;
      } else {
        this.productId = id;
        this.openDialog = true;
        this.count = "";
      }
    },
    // 认购
    buy() {
      if (this.count < this.detail.minNum || this.count > this.detail.maxNum) {
        this.Toast(
          this.$t("sm.kgmsl") +
            `${this.detail.minNum}-${this.detail.maxNum}` +
            this.$t("sm.zj")
        );
        return;
      }
      this.$util.showLoading();
      this.$post1(`/otc/ieo/order`, {
        projectId: this.id,
        member: this.$store.state.userId,
        num: this.count,
      })
        .then((res) => {
          this.Toast.clear();
          if (res.status === "SUCCEED") {
            this.Toast(this.$t("sm.rgcg"));
          } else {
            this.Toast(res.errorMessage);
          }
        })
        .catch((err) => {
          this.Toast.clear();
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

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
      height: 40px;
      border: 1px solid #eaeaea;
      border-radius: 7px;
    }
    .input::placeholder {
      color: #a1a1a1;
    }
  }
}

.activity {
  @include base-background();
  font-family: "JDZY";
  background-color: #171E28 !important;
}
.qj .data .action {
  background-color: #169e78;
}
//   .content {
//     width: 100vw !important;
//     height: 90%;
//     overflow-y: auto;
//     margin-left: -15px;
//     padding: 20px 15px 100px;

//     .title {
//       font-weight: bold;
//       font-size: 28px;
//       margin: 0 0 20px;
//     }

//     .tit {
//       font-size: 16px;
//       font-weight: bold;
//       margin: 20px 0 10px;
//     }

//     .item {
//       .img {
//         width: 100%;
//         object-fit: contain;
//       }
//     }

//     .body {
//       margin: 5px auto 0;

//       .img {
//         width: 100%;
//         height: 150px;
//       }

//       .title {
//         font-weight: bold;
//         font-size: 16px;
//         margin: 20px 0 20px;
//       }

//       .desc {
//         line-height: 30px;
//         font-size: 14px;
//       }

//       .thumbs-up {
//         display: flex;
//         align-items: center;

//         .right {
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           margin-left: 15px;

//           .img {
//             width: 20px;
//             height: 20px;
//           }

//           .count {
//             margin-top: 2px;
//             font-size: 12px;
//           }
//         }
//       }

//       .date {
//         margin: 5px 0 20px -15px;
//         display: flex;
//         justify-content: space-around;
//         width: 100vw;
//         padding: 20px 15px 0;
//         border-top: 5px solid #efefef;

//         .item {
//           width: 50%;
//           text-align: center;
//           border-right: 1px solid #efefef;

//           &:last-child {
//             border-right: none;

//             // .top {
//             //     color: #fbc400;
//             // }
//           }

//           .top {
//             font-size: 14px;
//           }

//           .bottom {
//             font-size: 12px;
//             padding-top: 10px;
//           }
//         }
//       }

//       .percentage {
//         margin: 10px auto;
//         display: flex;
//         font-size: 14px;
//         align-items: center;
//         width: 100vw;
//         padding: 0 15px 15px;
//         margin-left: -15px;
//         border-bottom: 5px solid #efefef;

//         .slider {
//           margin: 0 4px;
//         }
//       }

//       .participate {
//         margin: 5px 0 10px -15px;
//         display: flex;
//         justify-content: space-between;
//         width: 100vw;
//         padding: 10px 15px 15px;
//         border-bottom: 5px solid #efefef;

//         .item {
//           width: 50%;
//           text-align: center;
//           border-right: 1px solid #efefef;

//           &:last-child {
//             border-right: none;
//           }

//           .top {
//             font-size: 14px;
//           }

//           .bottom {
//             font-size: 12px;
//             padding-top: 10px;
//           }
//         }
//       }

//       .row {
//         height: 30px;
//         line-height: 30px;
//         display: flex;
//         align-items: center;

//         .label {
//           font-size: 14px;
//         }

//         .value {
//           font-size: 14px;
//         }

//         .sel {
//           color: #39bb97;
//         }
//       }

//       .btn {
//         width: 95%;
//         height: 45px;
//         text-align: center;
//         line-height: 50px;
//         background-color: #39bb97;
//         position: fixed;
//         margin: auto;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         font-size: 16px;
//         border-radius: 30px;
//         bottom: 20px;
//       }
//     }

//     .footer {
//       margin: 5px auto 0;
//       text-align: center;
//       padding: 20px 0 50px;
//     }
//   }

//   .header {
//     position: relative;
//     height: 46px;
//     width: 100%;

//     .header_custom {
//       width: 100%;
//       position: fixed;
//       left: 0;

//       .left {
//         width: 100%;
//         height: 46px;
//         font-size: 16px;
//         line-height: 46px;
//         position: absolute;
//         left: 15px;
//       }
//     }
//   }
// }
.center {
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 46px;
  margin-top: -28px;
  color: #fff;
}
.btb {
  width: 50px;
  height: 50px;
  margin: 35px auto;
}
.btc {
  text-align: center;
  font-size: 20px;
  color: #fff;
  margin: -22.5px auto;
}
.qj {
  width: 100%;
  height: 71.5px;
  margin-top: 50px;
  p {
    font-size: 15px;
    color: #fff;
    margin-bottom: 16.5px;
  }
  .data {
    display: flex;
    justify-content: space-between;
    margin: auto;
    width: 100%;
    div {
      width: 32%;
      height: 41px;
      line-height: 41px;

      text-align: center;
      color: #ffffff;
      font-size: 16px;
      background-color: #474957;
      border-radius: 5px;
    }
  }
}
.text {
  width: 100%;
  margin-top: 15px;
  border-top: 1px solid #2e3045;
  .divd {
    width: 100%;
    height: 52px;
    line-height: 52px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #2e3045;
    .r {
      font-size: 15px;
      color: #ffffff;
    }
    p {
      font-size: 14px;
      color: #bbbbbb;
    }
    .ss {
      margin-top: 8.5px;
      width: 261px;
      height: 33px;
      display: flex;
      flex-direction: row;
      input {
        width: 190.5px;
        height: 33px;
        font-size: 16px;
        border: 1px solid #979797;
        color: #666c71;
        background-color: #171E28;
      }
      .inp {
        width: 70px;
        font-size: 16px;
        color: #08ab9c;
        height: 33px;
        line-height: 33px;
        text-align: center;
        border: 1px solid #979797;
      }
    }
  }
  /deep/.van-button {
    margin-top: 30px;
    width: 100%;
  }
}
.popup {
  color: #fff;
  border-radius: 10px;
  background: #171E28;
  .inp {
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  p {
    background: #171E28;
    color: #fff;
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin: 10px auto;
    font-size: 14px;
  }
  span {
    margin-right: 3px;
  }
  input {
    margin: 0 auto;
    background: #171E28;
    border-radius: 5px;
    height: 20px;
  }
  .van-button {
    margin-top: 0;
    width: 232px;
    background: #171E28;
    border-top: 1px solid #fff;
  }
}
</style>
