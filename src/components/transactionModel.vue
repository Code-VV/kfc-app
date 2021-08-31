<template>
  <div class="transactionModel">
    <van-action-sheet v-model="isPwdShow" title="请输入交易密码" class="pwdModel">
      <van-password-input
        :value="pwdValue"
        :mask="false"
        :focused="showKeyboard"
        @focus="showKeyboard = true"
      />
      <div class="flex size12 forGetPwd">
        <span class="blue_text">忘记密码?</span>
      </div>
      <van-number-keyboard v-model="pwdValue" :show="showKeyboard" :maxlength="6" />
    </van-action-sheet>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {
    list: {
      type: Object,
      default: {}
    },
    type: {
      type: String, //entrust委托,history历史
      default: ""
    },
    subType: {
      type: String, //'contractType'全部类型，entrust委托，revoke撤销
      default: ""
    }
  },
   watch: {
    pwdValue(val) {
      // console.log(val);
      if (val.length == 6) {
        this.showKeyboard = false;
        this.$emit('pwdValue', val);
        
      }
    }
  },
  data() {
    return {
      isPwdShow:true,
      pwdValue:'',//密码
      showKeyboard:true,//数字键盘显示
    };
  },
  methods: {},
  mounted() {},
  computed: {}
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.transactionModel {
}
</style>
