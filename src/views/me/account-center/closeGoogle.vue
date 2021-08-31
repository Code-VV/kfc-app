<template>
  <div class="container_common1 googleAuthenticator">
    <div class="closeTip all_con c666">{{$t("googleAuthenticator.closeTip")}}</div>
    <div class="content">
      <div class="items">
        <p class="title">{{$t("googleAuthenticator.pleaseEnter")}}</p>
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
      <van-button type="info" block @click="submit()">关闭</van-button>
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
      scode: "", //谷歌验证码
      showKeyboard: false
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
      this.setnavTitle("关闭谷歌二次验证");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面

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
    background-color: #fbc400;
    border: 1px solid #fbc400;
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
  .van-password-input {
    margin-top: 10px;
  }
  .van-password-input__security {
    li {
      margin: 0 8px;
      border-bottom: 1px solid #fbc400;
      font-weight: 500;
      font-size: 30px;
      color: #fbc400;
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
  .closeTip {
    margin: 0 -15px;
    padding: 15px;
    font-size: 12px;
}
  .content {
    margin-top: 20px;
    .items {
      display: flex;
      flex-direction: column;
      align-items: center;
      .title {
        font-size: 14px;
        color: rgba(34, 34, 34, 1);
      }
    }
  }
}
</style>

