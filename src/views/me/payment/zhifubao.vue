<template>
  <div class="container_common weixinCard">
    <!-- <div class="tops size15 blue_text flex align_center bold pad_t_20">
      <img src="../../../assets/images/home/bankCard.png" alt srcset class="wid19 hei19 mar_r_10" />
      <span>银行卡</span>
    </div>-->
    <!-- <div class="flex1">
        <div class="countryCode" @click="chooseArea">
          <img src="../../../assets/images/home/realnameIcon1.png" alt srcset class="leftIcon" />
          <span class="names flex1">{{countryCode?'国家':'请选择国家或地区'}}</span>
          <div class="rightBox">
            <span v-if="countryCode">{{countryName+'（'+countryCode+'）'}}</span>
            <span class="rightIcon"></span>
          </div>
    </div>-->
    <van-cell-group class="formBox mar_t_10">
      <van-field v-model="userInfo.aliayName" label="账户名" />
    </van-cell-group>
    <div class="uploadBox size14">
      <div class="uploadgroup">
        <div class="relative wid85 hei85 mar_t_15">
          <van-image
            :src="userInfo.payAliay"
            v-if="userInfo.payAliay"
            class="wid85 hei85 border_radius"
          ></van-image>
          <div class="imgs b_bg" v-else>
            <getPicture
              class="absolute"
              style="top:0;right:0;bottom:0;left:0;z-index:99"
              @getImg="getImgSrc"
            />
          </div>
          <div v-if="userInfo.payAliay">
            <van-icon name="cross" class="close"  @click="close(1)" />
          </div>
        </div>
        <div class="size12 c222 mar_t_10">
          <p class="span">请上传标准收款二维码</p>
          <p class="span">JPG/JPEG/PNG 格式上传</p>
        </div>
      </div>
    </div>
    <van-button
      class="hei42 size16 mar_t_100"
      type="info"
      block
      @click="submit"
    >{{$t("form.submit")}}</van-button>
    <numberKeyboard type="zfb" ref="mychild" @submitEvent="submitEvent" />
    <!-- <div v-else class="flex align_center size15 pad_t_10" style=“width:100%>
      <img src="../../../assets/images/home/realnameIcon4.png" alt class="wid20 hei20 mar_r_15" />
      <span>张彦龙</span>
      <div class="right_text flex1">{{idNUm|cardNum}}</div>
    </div>-->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "../../../axios/index";
import numberKeyboard from "@/components/numberKeyboard";
import getPicture from "@/components/getPicture";
import $ from "jquery";
export default {
  created() {
    this.init();
  },
  components: {
    numberKeyboard,
    getPicture
  },
  mounted() {
    this.getUserInfo();
    setTimeout(() => {
      if (this.$store.state.nowThemeInfo == "night-theme") {
        $(".van-cell-group").css("cssText", "background-color:#000!important"); //;要想修改多个属性，可以这么做：
      } else {
      }
    }, 100);
  },
  data() {
    return {
      userInfo: {
        aliayName: "",
        payAliay: ""
      }
    };
  },
  computed: {},
  watch: {
    "userInfo.aliayName"(val) {
      this.userInfo.aliayName = val.replace(/\s+/g, "");
    }
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
      this.setnavTitle("支付宝绑定");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    submit() {
      if (!this.userInfo.aliayName) {
        this.Toast("请输入账户名");
        return;
      }
      if (!this.userInfo.payAliay) {
        this.Toast("请上传收款二维码");
        return;
      }
	  this.submitEvent("") ;
      //this.$refs.mychild.submit();
    },
    getUserInfo() {
      this.$get("member/member/getMember", {
        member: this.$store.state.userId
      }).then(res => {
        if (res.status == "FAILED") {
          this.Toast(res.errorMessage);
        } else if (res.status == "SUCCEED" && res.result) {
          this.userInfo = res.result;
        }
      });
    },
    submitEvent(val) {
      var data = {
        code: val,
        name: this.userInfo.aliayName,
        file: this.userInfo.payAliay
      };
      // console.log(data);
      var fd = new FormData();

      fd.append("code", data.code);
      fd.append("name", data.name);
      var reg = /^\s*data:([a-z]+\/[a-z0-9-+.]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,([a-z0-9!$&',()*+;=\-._~:@\/?%\s]*?)\s*$/i;
      if (reg.test(data.file)) {
        fd.append("file", this.$util.base64toFile(data.file));
      } else {
       fd.append("file", null);
      }
      this.$util.showLoading();
      this.$post1(
        "member/member/setPayAliay",
        { member: this.$store.state.userId },
        fd
      )
        .then(res => {
          // console.log(JSON.stringify(res));
          if (res && res.status == "SUCCEED") {
            this.Toast("支付宝绑定成功");
            setTimeout(res => {
              this.$router.go(-1);
            }, 300);
          } else {
            this.Toast(res.errorMessage);
          }
        })
        .catch(err => {
          // console.log(JSON.stringify(err));
        });
    },
    //获取本地图片路径
    getImgSrc(e) {
      this.userInfo.payAliay = e;
    },

    //删除图片
    close(index) {
      this.userInfo.payAliay = "";
    }
  },
  destroyed() {}
};
</script>
<style lang="scss">
@import "@/assets/scss/theme.scss";

.weixinCard {
  @include base-background();
  padding-left: 30px !important;
  padding-right: 30px !important;
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-top: 0;
  }
  .van-button--info {
    background: #499C7A;
    border: 1px solid #499C7A;
  }
  .formBox {
    .van-cell:not(:last-child)::after {
      left: 0;
    }
    .van-cell {
      padding: 12px 0;
    }
    .van-field__control {
      text-align: right;
    }
  }

  .uploadgroup {
    .border_radius {
      .van-image__img {
        border-radius: 4px;
      }
    }
    .imgs {
      width: 85px;
      height: 85px;
      border-radius: 4px;
      position: relative;
      &::after {
        content: "+";
        font-size: 40px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #878789;
      }
    }
    .close {
      position: absolute;
      background: #c1c1c1;
      border-radius: 50%;
      padding: 2px;
      right: -7px;
      top: -7px;
    }
    .van-icon-cross:before {
      color: #fff;
    }
  }
}
</style>
<style lang="scss" scoped>
.weixinCard {
  .countryCode {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #444444;
    padding: 12px 0;
    .leftIcon {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
    .name {
      color: #222222;
    }
    .rightBox {
      min-width: 20px;
      display: flex;
      align-items: center;
      .rightIcon {
        width: 6px;
        height: 11px;
        margin-left: 15px;
        background: url(../../../assets/images/home/rightArrow.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .formBox {
    .leftIcon {
      width: 18px;
      height: 18px;
    }
  }
  .uploadgroup {
    .span {
      margin-top: 6px;
    }
  }
}
</style>