<template>
  <div class="login a_title setPwd">
    <div class="con pad_16">
      <van-field
        v-model="password"
        @blur="passwordBlur(password)"
        :label="$t('mima.jymm')"
        maxlength="6"
        type="password"
        :placeholder="$t('mima.qsr6')"
        :error-message="passwordError"
      />

      <van-field
        v-model="passwordOk"
        type="password"
        maxlength="6"
        @blur="passwordOkBlur(passwordOk)"
        :label="$t('mima.qrmm')"
        :placeholder="$t('mima.qzcsrmm')"
        :error-message="passwordOkError"
      />

      <!-- <div class="size11 a_right pad_t_10">

        <router-link :to="{name:'postPasswordForget'}">
          <span class="c_blue ">忘记密码</span>
        </router-link>

       


      </div>-->

      <div class="btn pad_t_60" @click="submit">
        <van-button style="width:100%;background-color:#499C7A" type="info">{{$t('mima.wc')}}</van-button>
      </div>

      <!-- <div class="size12 c_red pad_t_20">修改密码后，24小时内无法提币</div> -->
    </div>

    <!-- 
      <div class=" a_center c666 size12 a_fixed bottom27" style="width:100%">
         <span>还没有**账号？赶快去</span>
         <router-link to="/register"> 
            <span class="c_blue pad_l_r_4"></span>
         </router-link>
        
         <span>吧</span>
    </div>-->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import sendCode from "@/components/SendCode.vue";
import {
    hbmd5
} from "../../../plugins/md5";
export default {
  components: {
    sendCode
  },
  data() {
    return {
      account: "",
      password: "",
      passwordOk: "",

      accountError: "",
      passwordError: "",
      passwordOkError: ""
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
      this.setnavTitle(this.$t('mima.szjymm'));
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    sec(n) {
      this.index = n;
    },

    // 账号
    // accountBlur(val){
    //       if(val==''){
    //         this.accountError = '输入原密码'
    //          return false
    //       }else{
    //       this.accountError = ''
    //         return true
    //       }
    // },

    // 新密码
    passwordBlur(val) {
      if(val==''){
         this.passwordError = "";
        return false;
      }
      if (this.$util.testPostPassword(val)) {
        this.passwordError = "请输入6位数字字符";
        return false;
      } else {
        this.passwordError = "";
        return true;
      }
    },

    // 确认密码
    passwordOkBlur(val) {
       if(val==''){
          this.passwordOkError = "";
        return false;
      }
      if (this.password != val) {
        this.passwordOkError = "两次密码不一致";
        return false;
      } else {
        this.passwordOkError = "";
        return true;
      }
    },

    submit() {
      let { password, passwordOk } = this;

      if (this.passwordBlur(password) && this.passwordOkBlur(passwordOk)) {
        //  设置交易密码
        this.$post1("member/member/setPayPass", {
          member: this.$store.state.userId,
          password: hbmd5(password)
        }).then(res => {
          if (res.status == "FAILED") {
            this.Toast(res.errorMessage);
          } else if (res.status == "SUCCEED") {
            this.Toast("设置成功");
            setTimeout(res=>{
              this.$router.go(-1);
            },300)
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
.setPwd {
  .van-cell {
    padding: 15px 0;
  }
  .van-cell:not(:last-child)::after{
    left: 0;
  }
  .van-field__label{
    margin-right: 10px;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";
.login {
  @include base-background();
  height: 100%;
  position: relative;
  .logo {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    .logo_img {
      width: 90px;
      height: 90px;
      background: #ededed;
    }
  }
  .con {
    .van-cell-group::after {
      border-top: none !important;
    }
    .btn {
      width: 100%;
    }
  }
}
</style>

