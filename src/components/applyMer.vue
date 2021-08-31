<template>
  <div class="applyMer">
    <div class="formBox pad_t_15">
      <van-field v-model="merchantInfo.name" label="昵称" placeholder="请输入昵称" />
      <van-field v-model="merchantInfo.phone" label="手机号" type="number" placeholder="请输入手机号码"/>
      <van-field v-model="merchantInfo.uid" label="UID" type="number" placeholder="请输入UID"/>
      <van-field v-model="merchantInfo.weixin" label="微信号码"  placeholder="请输入微信号码"/>
      <van-field v-model="merchantInfo.email" label="邮箱号码" placeholder="请输入邮箱号码" />
      <van-field v-model="merchantInfo.idCard" label="身份证号" placeholder="请输入身份证号"/>
    </div>
    <div class="mar_t_20 red_text size12">
      温馨提示：申请成商户可以在OTC上发布出售单和求购单,
      系统将在OTC账户冻结您的1000USDT保证金。
    </div>
    <van-button type="info" block class="mar_t_20" @click="submitEvent">提交</van-button>
    <div class="flex pad_t_30">
      <div>
        <img
          v-show="!read"
          @click="read=true"
          class="inline_block wid12 hei12 a_middle"
          src="./../assets/images/user/read.png"
          alt
        />
        <img
          v-show="read"
          @click="read=false"
          class="inline_block wid12 hei12 a_middle"
          src="./../assets/images/user/readed.png"
          alt
        />
      </div>
      <div class="size11 pad_l_5">
        <span class="c666">我已阅读并同意</span>
        <!-- <span class=" pad_l_r_5 c666" >已阅读并同意</span> -->
        <router-link to="/merchantAgreement">
          <span class="c_blue pad_l_r_5">《成为商户条款》</span>
          <!-- <span class="c_blue">《用户注册协议》</span> -->
        </router-link>
        <span class="c666">并冻结1000USTD作为保证金。</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {
      read: false, //是否阅读
      merchantInfo: {
        name: "", //商户名字
        phone: "", //手机号
        UID: "", //uid
        weixin: "", //微信号
        email: "", //邮箱
        idCard: "" //身份证
      } //商户信息
    };
  },
  methods: {
    //商户信息提交
    submitEvent() {
      if (!this.merchantInfo.name) {
        this.Toast("请输入昵称");
        return;
      }
      // if (!this.merchantInfo.phone) {
      //   this.Toast("请输入手机号码");
      //   return;
      // }
      if (!this.merchantInfo.phone) {
        this.Toast(this.$t("form.phone_format"));
        return;
      }
      if (!this.merchantInfo.uid) {
        this.Toast("请输入UID");
        return;
      }
      if (!this.merchantInfo.weixin) {
        this.Toast("请输入微信号码");
        return;
      }
      if (!this.merchantInfo.email) {
        this.Toast("请输入邮箱号码");
        return;
      }
      if (this.$util.testEmail(this.merchantInfo.email)) {
        this.Toast(this.$t("form.email_format"));
        return;
      }
      if (!this.merchantInfo.idCard) {
        this.Toast("请输入身份证号码");
        return;
      }
      if (!this.read) {
        this.Toast("请阅读商户条例");
        return;
      }
      var data = {
        member: this.$store.state.userId,
        storeName: this.merchantInfo.name,
        phone: this.merchantInfo.phone,
        uuid: this.merchantInfo.uid,
        wechatCode: this.merchantInfo.weixin,
        mail: this.merchantInfo.email,
        card: this.merchantInfo.idCard
      };
      this.$post1("member/member/setStore", data).then(res => {
        if (res.status == "FAILED") {
          this.Toast(res.errorMessage);
        } else if (res.status == "SUCCEED" && res.result) {
          this.Toast("申请成功");
          this.$router.push({
            path: `/transaction/merchantAudit`
          });
        }
      });
    }
  },
  mounted() {},
  computed: {},
  watch: {
    "merchantInfo.name"(val) {
      this.merchantInfo.name = val.replace(/\s+/g, "");
    },
    "merchantInfo.phone"(val) {
      this.merchantInfo.phone = val.replace(/\s+/g, "");
    },
    "merchantInfo.uid"(val) {
      this.merchantInfo.uid = val.replace(/\s+/g, "");
    },
    "merchantInfo.weixin"(val) {
      this.merchantInfo.weixin = val.replace(/\s+/g, "");
    },
    "merchantInfo.email"(val) {
      this.merchantInfo.email = val.replace(/\s+/g, "");
    },
    "merchantInfo.idCard"(val) {
      this.merchantInfo.idCard = val.replace(/\s+/g, "");
    }
  }
};
</script>
<style lang="scss">
.applyMer {
  .formBox {
    .van-field__control {
      text-align: right;
    }
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";
</style>
