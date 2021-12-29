<template>
<div class="zhaohuimima a_title">

    <div class="con pad_16">

        <van-cell-group>
            <van-field v-model="account" @blur="accountBlur(account)" @change="accountBlur(account)" :label="$t('form.Phone_or_email')" :placeholder="$t('form.Enter_phoneOrEmail')" :error-message="accountError" />

            <van-field @blur="codeBlur(code)" v-model="code" :label="$t('form.Verification_code')" :placeholder="$t('form.Enter_confirmation_code')" :error-message="codeError">
                <van-button v-show="isPhone" @click="fun(account)" slot="button" size="small">
                    <sendCode ref="mychild" @res="codeResFun"></sendCode>
                </van-button>

                <van-button v-show="!isPhone" @click="funEmail(account)" slot="button" size="small">
                    <sendEmail ref="mychild1"></sendEmail>
                </van-button>

            </van-field>

            <van-field v-model="password" @blur="passwordBlur(password)" :label="$t('change.new_password')" type="password" :placeholder="$t('change.not_pure_numbers')" :error-message="passwordError" />

            <van-field v-model="passwordOk" type="password" @blur="passwordOkBlur(passwordOk)" :label="$t('change.confirm_password')" :placeholder="$t('change.enter_password_again')" :error-message="passwordOkError" />

        </van-cell-group>

        <!-- <div class="size11 a_right pad_t_10">

         <span class="c_blue ">忘记密码</span>

      </div> -->

        <div class="btn pad_t_60" @click="submit">
            <van-button style="width:100%;background-color:#499C7A" type="info">{{$t("forget.finish")}}</van-button>
        </div>

        <div class="size12 c_red pad_t_20">{{$t("forget.Cannot_withdraw_password")}}</div>
        <!-- <div class="size12 c_red pad_t_20">找回密码后，24小时内无法提币</div> -->

    </div>

    <!-- 
      <div class=" a_center c666 size12 a_fixed bottom27" style="width:100%">
         <span>还没有**账号？赶快去</span>
         <router-link to="/register"> 
            <span class="c_blue pad_l_r_4"></span>
         </router-link>

         <span>吧</span>
      </div> -->

</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import sendCode from "@/components/SendCode.vue";
import sendEmail from "@/components/SendEmail";
import {
    hbmd5
} from "../../plugins/md5";
export default {
    components: {
        sendCode,
        sendEmail
    },
    data() {
        return {
            account: '',
            password: '',
            passwordOk: '',
            code: '',
            isPhone: true,

            accountError: '',
            passwordError: '',
            passwordOkError: '',
            codeError: '',
        };
    },
    mounted() {},
    watch: {
        account(val) {

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
            "setnavBarArrow",
            "setLogin",
            "setToken",
        ]),

        init() {
            this.setnavTitle(this.$t("forget.Retrieve_password"));
            // this.setnavTitle("找回密码");
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true)
        }, // 初始化页面
        sec(n) {
            this.index = n
        },

        // 账号
        accountBlur(val) {
            // console.log(val)
            if (val.indexOf('@') != -1) { //邮箱
                if (this.$util.testEmail(val)) {
                    // this.accountError = '输入正确的邮箱格式'
                    this.accountError = this.$t("form.email_format")
                    return false
                } else {
                    this.accountError = ''
                    this.isPhone = false
                    return true
                }
            } else { //手机
                if (!val) {
                    this.accountError = this.$t("form.Enter_phoneOrEmail")
                    // this.accountError = '输入正确的手机格式'
                    return false
                } else {
                    this.accountError = ''
                    this.isPhone = true
                    return true
                }
            }

        },

        // 验证码
        codeBlur(val) {
            if (this.$util.testCode(val)) {
                this.codeError = this.$t("form.Enter_6_digit_verification")
                // this.codeError = '输入6位验证码'
                return false
            } else {
                this.codeError = ''
                return true
            }
        },
        // 密码
        passwordBlur(val) {
            if (!val) {
                this.passwordError = this.$t("form.enter_password")
                // this.passwordError = '请输入8-20位字符，不能是纯数字'
                return false
            } else {
                this.passwordError = ''
                return true
            }
        },

        // 确认密码
        passwordOkBlur(val) {
            if (this.password != val) {
                this.passwordOkError = this.$t("forget.Inconsistent_passwords_twice")
                // this.passwordOkError = '两次密码不一致'
                return false
            } else {
                this.passwordOkError = ''
                return true
            }
        },

        codeResFun(res) {
            // console.log(res)
            this.accountError = res
        },
        fun(phone) {
            this.$refs.mychild.send(phone, 'RETRIEVE');
        },

        funEmail(email) {

            this.$refs.mychild1.send(email, 'RETRIEVE');
        },

        submit() {

            let {
                account,
                password,
                passwordOk,
                code
            } = this;

            if (this.accountBlur(account) &&
                this.codeBlur(code) &&
                this.passwordBlur(password) &&
                this.passwordOkBlur(passwordOk)
            ) {
                //console.log(account,password,passwordOk,code)
                this.$post1('member/member/forgetPass', {
                    phMail: account,
                    password: hbmd5(password),
                    code
                }).then(res => {
                    // console.log(res)
                    if (res.status == "FAILED") {
                        this.Toast(res.errorMessage)
                    } else if (res.status == "SUCCEED") {
                        // window.localStorage.setItem('token',res.result);
                        this.setLogin(false);
                        this.setToken('');
                        this.Toast(this.$t("form.Successful_operation"));
                        // this.Toast('操作成功')
                        this.$router.push({
                            path: '/login'
                        });
                    }
                })

            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.zhaohuimima {
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
            background: #ededed
        }

    }

    .con {
        .van-cell-group::after {
            border-top: none !important
        }

        .btn {
            width: 100%
        }
    }

}
</style>
