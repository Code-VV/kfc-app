<template>
<div class="login a_title">
    <div class="con pad_16">
        <van-cell-group>
            <van-field v-model="account" @blur="accountBlur(account)" :label="$t('form.Phone_or_email')" :placeholder="$t('form.Enter_phoneOrEmail')" :error-message="accountError" />

            <van-field @blur="codeBlur(code)" v-model="code" :label="$t('form.Verification_code')" maxlength="6" :placeholder="$t('form.Enter_confirmation_code')" :error-message="codeError">
                <van-button v-show="caccountTypePhone" @click="fun(account)" slot="button" size="small">
                    <sendCode ref="mychild" @res="codeResFun"></sendCode>
                </van-button>

                <van-button v-show="!caccountTypePhone" @click="funEmail(account)" slot="button" size="small">
                    <sendEmail ref="mychild1" @res="codeResFun"></sendEmail>1
                </van-button>

                <!-- <van-button @click="fun(phone)" slot="button" size="small" >
            <sendCode ref="mychild"  @res="codeResFun"></sendCode>
          </van-button>-->
            </van-field>

            <van-field v-model="password" @blur="passwordBlur(password)" :label="$t('form.New_transaction_password')" type="password" maxlength="6" :placeholder="$t('form.Enter_6_digit_characters')" :error-message="passwordError" />

            <van-field v-model="passwordOk" type="password" maxlength="6" @blur="passwordOkBlur(passwordOk)" :label="$t('form.confirm_password_post')" :placeholder="$t('form.Enter_transaction_password_again')" :error-message="passwordOkError" />
        </van-cell-group>

        <!-- <div class="size11 a_right pad_t_10">

         <span class="c_blue ">忘记密码</span>

      </div>-->

        <div class="btn mar_t_60" @click="submit">
            <van-button style="width:100%;background-color:#fbc400" type="info">{{$t("form.finish")}}</van-button>
        </div>

        <!-- <div class="size12 c_red pad_t_20">找回密码后，24小时内无法提币</div> -->
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
import {
    mapActions
} from "vuex";
import sendCode from "@/components/SendCode.vue";
import sendEmail from "@/components/SendEmail.vue";
import {
    hbmd5
} from "../../../plugins/md5";
export default {
    components: {
        sendCode,
        sendEmail
    },
    data() {
        return {
            caccountTypePhone: true,
            account: "",
            password: "",
            passwordOk: "",
            code: "",

            accountError: "",
            passwordError: "",
            passwordOkError: "",
            codeError: ""
        };
    },
    mounted() {},
    watch: {
        account(val) {
            this.accountChange(val);
        }
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
            this.setnavTitle(this.$t("form.Recover_transaction_password"));
            // this.setnavTitle("找回交易密码");
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        }, // 初始化页面
        sec(n) {
            this.index = n;
        },
        accountChange(val) {
            // console.log(val);
            if (val.indexOf("@") != -1) {
                this.caccountTypePhone = false;
            } else {
                this.caccountTypePhone = true;
            }
        },
        // 账号
        accountBlur(val) {
            if (!val) {
                this.accountError = "";
                return false;
            }
            if (val.indexOf("@") != -1) {
                //邮箱
                if (this.$util.testEmail(val)) {
                    this.accountError = this.$t("form.email_format");
                    // this.accountError = '输入正确的邮箱格式' email_format
                    return false;
                } else {
                    this.accountError = "";
                    return true;
                }
            } else {
                //手机
                if (!val) {
                    this.accountError = this.$t("form.phone_format");
                    // this.accountError = '输入正确的手机格式'  phone_format
                    return false;
                } else {
                    this.accountError = "";
                    return true;
                }
            }
        },

        // 验证码
        codeBlur(val) {
            if (!val) {
                this.codeError = "";
                return false;
            }
            if (this.$util.testCode(val)) {
                this.codeError = this.$t("form.Enter_6_digit_verification");
                // this.codeError = '输入6位验证码' Enter_6_digit_verification
                return false;
            } else {
                this.codeError = "";
                return true;
            }
        },
        // 密码
        passwordBlur(val) {
            if (!val) {
                this.passwordError = "";
                return false;
            }
            if (this.$util.testPostPassword(val)) {
                this.passwordError = this.$t("form.Enter_6_digit_characters");
                // this.passwordError = '请输入6位数字字符' Enter_6_digit_characters
                return false;
            } else {
                this.passwordError = "";
                return true;
            }
        },

        // 确认密码
        passwordOkBlur(val) {
            if (!val) {
                this.passwordOkError = "";
                return false;
            }
            if (this.password != val) {
                this.passwordOkError = this.$t("form.Inconsistent_passwords_twice");
                // this.passwordOkError = '两次密码不一致' Inconsistent_passwords_twice
                return false;
            } else {
                this.passwordOkError = "";
                return true;
            }
        },

        codeResFun(res) {
            // console.log(res);
            this.accountError = res;
        },
        fun(phone) {
            this.$refs.mychild.send(phone, "PAYRESET");
        },
        funEmail(email) {
            this.$refs.mychild1.send(email, "PAYRESET");
        },

        submit() {
            let {
                account,
                password,
                passwordOk,
                code
            } = this;

            if (
                this.accountBlur(account) &&
                this.codeBlur(code) &&
                this.passwordBlur(password) &&
                this.passwordOkBlur(passwordOk)
            ) {
                // console.log(account, password, code);

                this.$post1("member/member/forgetPayPass", {
                    member: this.$store.state.userId,
                    phMail: account,
                    password: hbmd5(password),
                    code
                }).then(res => {
                    if (res.status == "FAILED") {
                        this.Toast(res.errorMessage);
                    } else if (res.status == "SUCCEED") {
                        this.Toast(this.$t("form.Successful_operation"));
                        // this.Toast('操作成功') Successful_operation
                        this.$router.go(-1);
                    }
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
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
