<template>
  <div class="account_center a_title">
    <!-- <van-cell
      @click="topathName('bind',{type:'phone'})"
      v-if="phone ==''"
      :title="$t('accountCenter.phone')"
      is-link
      value
    >
      <span class="c_red">{{$t('accountCenter.Unbound')}}</span>
    </van-cell>

    <van-cell v-else :title="$t('accountCenter.phone')" is-link value>
      <span>{{$t('accountCenter.Bound')}}</span>
    </van-cell> -->

    <van-cell
      @click="topathName('bind',{type:'email'})"
      v-if="mail==''"
      :title="$t('accountCenter.mail')"
      is-link
      value
    >
      <!-- <van-cell  @click="topathName('bind',{type:'email'})" v-if="mail==''" title="邮箱" is-link value="" > -->
      <span class="c_red">{{$t('accountCenter.Unbound')}}</span>
      <!-- <span class="c_red">未绑定</span> -->
    </van-cell>

    <van-cell v-else :title="$t('accountCenter.mail')" is-link value>
      <!-- <van-cell v-else title="邮箱" is-link value="" > -->
      <span>{{$t('accountCenter.Bound')}}</span>
      <!-- <span >已绑定</span> -->
    </van-cell>

    <!-- 谷歌验证 -->
    <!-- <van-cell :title="$t('accountCenter.googleAuthenticator')" is-link value="" @click="topath('/accountCenter/googleAuthenticator')">
         <span class="c_red">{{$t('accountCenter.Unbound')}}</span>
      </van-cell>
      <van-cell :title="$t('accountCenter.googleAuthenticator')" is-link value="" @click="topath('/accountCenter/closeGoogle')">
         <span class="c_red">{{$t('accountCenter.Unbound')}}</span>
    </van-cell>-->

    <van-cell
      :title="$t('accountCenter.login_password')"
      is-link
      value
      @click="topath('/accountCenter/change')"
    >
      <!-- <van-cell title="登录密码" is-link value="" @click="topath('/accountCenter/change')" > -->
      <span class>{{$t("accountCenter.modify")}}</span>
      <!-- <span class="">去修改</span> -->
    </van-cell>

    <!-- <van-cell v-show="payPassword==''" title="交易密码" is-link value=""  @click="topathName1('postPasswordSet')"  >
         <span  class="c_red">未设置</span>
    </van-cell>-->

    <!-- <van-cell v-show="payPassword!=''" title="交易密码" is-link value=""  @click="topathName1('postPasswordChange')"  >
         <span  class="">去修改</span>
    </van-cell>-->

    <div class="darkLine"></div>

    <!-- <van-cell title="法币交易设置" value></van-cell> -->
    <!-- <van-cell title="收款管理方式" is-link value="" >
    </van-cell>-->
    <van-cell
      :title="this.$t('mima.fbzjmm')"
      is-link
      value
      @click="topathName1('postPasswordSet')"
      v-show="payPassword==''"
    >
      <span class="c_red">{{$t('jymm.wsz')}}</span>
    </van-cell>
    <van-cell
      v-show="payPassword!=''"
      :title="this.$t('jymm.fbzjmm')"
      is-link
      value
      @click="topathName1('postPasswordChange')"
    >
      <span class>{{$t('jymm.qxg')}}</span>
    </van-cell>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import sendCode from "@/components/SendCode.vue";
import $ from "jquery";
export default {
  components: {
    sendCode
  },
  data() {
    return {
      mail: "",
      password: "",
      payPassword: "",
      phone: "",
      regType: null,
      welCode: "FLX27Z",
      welMember: ""
    };
  },
  mounted() {
    if (this.$store.state.nowThemeInfo == "night-theme") {
      // $('.account_center').find('.linesty').css('background-color', this.$bg_night_second)
    } else {
      $(".account_center")
        .find(".linesty")
        .css("background-color", "#F8F7FD");
    }
  },
  watch: {},
  created() {
    this.init();

    if (this.$store.state.isLogin) {
      this.getUserInfo();
    }
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
      this.setnavTitle(this.$t("accountCenter.title"));
      // this.setnavTitle("账户中心");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面

    topathName(path, qu) {
      if (this.$store.state.isLogin) {
        this.$router.push({
          name: path,
          query: qu
        });
      } else {
        this.toLOginAlert();
      }
    },
    topathName1(name) {
      if (this.$store.state.isLogin) {
        this.$router.push({
          name
        });
      } else {
        this.toLOginAlert();
      }
    },

    topath(path) {
      if (this.$store.state.isLogin) {
        this.$router.push({
          path
        });
      } else {
        this.toLOginAlert();
      }
    },

    toLOginAlert() {
      this.Dialog.confirm({
        message: this.$t("accountCenter.log_first"),
        confirmButtonText: window.vm.$t('common0.qd'),
        cancelButtonText: window.vm.$t('common0.qx'),
        // message: '请先去登录'
      })
        .then(() => {
          this.$router.push({
            path: "/login"
          });
        })
        .catch(() => {
          // on cancel
        });
    },

    getUserInfo() {
      // console.log(1111);
      this.$get("member/member/getMember", {
        member: this.$store.state.userId
      }).then(res => {
        if (res.status == "FAILED") {
          this.Toast(res.errorMessage);
        } else if (res.status == "SUCCEED") {
          this.userId = res.result.id;

          this.mail = res.result.mail;
          this.phone = res.result.phone;
          this.password = res.result.password; //登录密码
          this.payPassword = res.result.payPassword; //支付密码
          this.regType = res.result.regType;
          this.welCode = res.result.welCode; //邀请码
          this.welMember = res.result.welMember;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.account_center {
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
}
</style>

