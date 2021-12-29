<template>
  <div class="container_common1 googleAuthenticator">
    <div class="steps">
      <div class="stepItem c666" :class="activeIndex>=0?'active':''">
        <span class="span">1</span>
        <p class="item m">{{$t("googleAuthenticator.InstallVerifier")}}</p>
      </div>
      <div class="auLines" :class="activeIndex>=0?'cur':''"></div>
      <div class="stepItem c666" :class="activeIndex>=1?'active':''">
        <span class="span">2</span>
        <p class="item">{{$t("googleAuthenticator.BindingVerifier")}}</p>
      </div>
      <div class="auLines" :class="activeIndex>=1?'cur':''"></div>
      <div class="stepItem c666" :class="activeIndex>=2?'active':''">
        <span class="span">3</span>
        <p class="item">{{$t("googleAuthenticator.enterVerificationCode")}}</p>
      </div>
    </div>
    <div class="content">
      <div class="items" v-show="activeIndex==0">
        <p class="title c222">{{$t("googleAuthenticator.verifierTip")}}（Goole Authenticator)</p>

        <button
          type="button"
          name="button"
          class="downLoad mar_t_15"
          @click="downloadApp"
        >{{$t("googleAuthenticator.download")}}</button>
        <!-- <button type="button" name="button" class="submit" 
        onclick='nextStep(1)'>{{$t("googleAuthenticator.nextstep")}}</button>-->
      </div>
      <div class="items" v-show="activeIndex==1">
        <p class="title c222">{{$t("googleAuthenticator.scanningApp")}}</p>
        <div class="qrcode mar_t_15">
          <vue-qr :text="copyAddress" :size="150" class="qrcode"></vue-qr>
        </div>
        <div class="copyBox mar_t_15 c222">
          <span>{{$t("googleAuthenticator.secretkey")}}:</span>
          <span class="copyText">{{copyAddress}}</span>
          <button
            class="copyUid"
            data-clipboard-action="copy"
            data-clipboard-target="#target"
            @click="copythat()"
          >{{$t("invitation.copy")}}</button>
        </div>
        <!-- <button type="button" name="button" class="submit" tapmode
        onclick='nextStep(2)'>{{$t("googleAuthenticator.nextstep")}}</button>-->
      </div>
      <div class="items" v-show="activeIndex==2">
        <p class="title c222">{{$t("googleAuthenticator.pleaseEnter")}}</p>
        <!-- 密码输入框 -->
        <van-password-input
          :value="scode"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
          :mask="false"
        />

        <!-- 数字键盘 -->
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
        <!-- <div class="val-box" id="val-box">
                        <input type="tel" id="val-code-input" maxlength="6" oninput="checkForNum(this)">
                        <div name="val-item" v-for='item in 6'></div>
        </div>-->
        <!-- <button type="button" name="button" class="submit" tapmode onclick='openGoog()'
        :disabled='scode.length!=6'>{{$t("googleAuthenticator.open")}}</button>-->
      </div>
    </div>
    <div class="mar_t_60">
      <van-button type="info" block @click="nextStep()" v-if="activeIndex<2">下一步</van-button>
      <van-button type="info" block @click="submit()" v-else >开启</van-button>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import sendCode from "@/components/SendCode.vue";
import vueQr from "vue-qr";
export default {
  components: {
    sendCode,
    vueQr
  },
  data() {
    return {
      activeIndex: 0,
      copyAddress: "K5DVUTZSKMZUEEBI",
      scode: "", //谷歌验证码
      showKeyboard: true
    };
  },
  mounted() {},
  watch: {
    account(val) {}
  },
  created() {
    this.init();
  },
  beforeUpdate(to, from, next) {},
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow"
    ]),
    init() {
      this.setnavTitle("开启谷歌二次验证");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    downloadApp() {
      var _this = this;
      if (api.systemType.toLowerCase() == "android") {
        if (this.$util.confirmPer("photos", this.$t("permissions.photos"))) {
          api.download(
            {
              url: _this.googInfo.googleDownloadUrlByAndroid,
              savePath: "fs://test.rar",
              report: true,
              cache: true,
              allowResume: true
            },
            function(ret, err) {
              // console.log(JSON.stringify(ret));
              if (ret && ret.state == 0) {
                api.showProgress({
                  style: "default",
                  animationType: "fade",
                  title: _this.$t("googleAuthenticator.downloading"),
                  text: ret.percent + "%",
                  modal: true
                });
              }
              if (ret && ret.state == 1) {
                api.hideProgress();
                // 下载完成
                var savePath = ret.savePath;
                api.installApp({
                  appUri: savePath
                });
              }
            }
          );
        }
      } else {
        // api.installApp({
        //   appUri: _this.googInfo.googleDownloadUrlByIos
        // });
      }
    },
    //下一步
    nextStep() {
      this.activeIndex = this.activeIndex + 1;
    },
    copythat: function(text) {
      var self = this;
      if (!text) {
        return this.Toast(self.$t("invitation.copy_fail"));
      }
      var clipBoard = api.require("clipBoard");
      clipBoard.set(
        {
          value: text
        },
        function(ret, err) {
          if (ret) {
            return self.Toast(self.$t("invitation.copy_sucess"));
          } else {
            return self.Toast(self.$t("invitation.copy_fail"));
          }
        }
      );
    },
    onInput(key) {
      this.scode = (this.scode + key).slice(0, 6);
    },
    onDelete() {
      this.scode = this.scode.slice(0, this.scode.length - 1);
    },
    submit() {
      // console.log(this.scode);
       if(this.scode.length<6){
        return;
      }
    }
  }
};
</script>
<style lang="scss" >
.googleAuthenticator {
  .van-button--info {
    color: #fff;
    background-color: #499C7A;
    border: 1px solid #499C7A;
  }
  .van-button {
    font-size: 16px;
    height: 42px;
    line-height: 40px;
    border-radius: 4px;
  }
  .van-password-input {
    margin: 0;
    width: 100%;
  }
  .van-password-input{
    margin-top: 10px;
  }
  .van-password-input__security {
    li {
      margin: 0 8px;
      border-bottom: 1px solid #499C7A;
      font-weight: 500;
      font-size: 30px;
      color: #499C7A;
    }
  }
  .van-hairline--surround::after {
    border-width: 0;
  }
  .van-hairline--left::after {
    border-left-width: 0;
  }
}
</style>
<style lang="scss" scoped>
 @import '@/assets/scss/theme.scss';
.googleAuthenticator {
   @include base-background();
  .steps {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-top: 15px;
    .stepItem {
      display: flex;
      flex-direction: column;
      align-items: center;
      .item {
        margin-top: 10px;
      }
      .span {
        width: 30px;
        height: 15px;       
        border-radius: 8px;
        font-size: 12px;
        color: #fff;
        text-align: center;
        line-height: 15px;
      }
      &.active {
        color: #499C7A;
        .span {
          background: #499C7A;
          color: #499C7A;
        }
      }
    }
    .auLines {
      width: 38px;
      background: rgba(206, 206, 206, 0.7);
      height: 1px;
      &.cur {
        background: #499C7A;
      }
    }
  }
  .content {
    margin-top: 30px;
    .items {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 14px;
      }
      .downLoad {
        font-size: 14px;
        color:#499C7A;
        padding: 4px 12px;
        border: 1px solid #499C7A;
        border-radius: 5px;
        background: transparent;
        font-weight: 600;
      }
      .copyBox {
        display: flex;
        align-items: center;
        font-size: 14px;
        .copyUid {
          color: #499C7A;
          font-size: 15px;
          background: transparent;
        }
      }
    }
  }
}
</style>

