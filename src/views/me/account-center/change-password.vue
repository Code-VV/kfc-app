<template>
<div class="xiugaimima a_title">

    <div class="con pad_16">

        <van-cell-group>
            <!-- <van-field
          v-model="account"
          @blur="accountBlur(account)"
          label="原密码"
          type="text"
          placeholder="请输入原密码"
          :error-message="accountError"

        />
       -->
            <van-field v-model="account" @blur="accountBlur(account)" :label="$t('change.old_password')" type="text" :placeholder="$t('change.original_password')" :error-message="accountError" />

            <van-field v-model="password" @blur="passwordBlur(password)" :label="$t('change.new_password')" type="password" :placeholder="$t('change.not_pure_numbers')" :error-message="passwordError" />

            <van-field v-model="passwordOk" type="password" @blur="passwordOkBlur(passwordOk)" :label="$t('change.confirm_password')" :placeholder="$t('change.enter_password_again')" :error-message="passwordOkError" />

        </van-cell-group>

        <div class="size11 a_right pad_t_10">

            <router-link to="/forget">
                <span class="c_blue ">{{$t("change.forget_password")}}</span>
                <!-- <span class="c_blue ">忘记密码</span> -->
            </router-link>

        </div>

        <div class="btn pad_t_60" @click="submit">
            <van-button style="width:100%;background-color:#fbc400" type="info">{{$t("change.modify")}}</van-button>
        </div>

        <div class="size12 c_red pad_t_20">{{$t("change.Cannot_withdraw_password")}}</div>

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
import {
    hbmd5
} from "../../../plugins/md5";
export default {
    components: {
        sendCode
    },
    data() {
        return {
            account: '',
            password: '',
            passwordOk: '',
            code: '',

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
            "setnavBarArrow"
        ]),
        init() {
            this.setnavTitle(this.$t("change.change_Password"));
            // this.setnavTitle("修改密码");
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

            if (val == '') {
                this.accountError = this.$t('change.original_password')
                // this.accountError = '输入原密码'

                return false
            } else {
                this.accountError = ''
                return true
            }

        },

        // 新密码
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
                this.passwordOkError = this.$t('change.Inconsistent_passwords_twice')
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

        submit() {

            let {
                account,
                password,
                passwordOk,
                code
            } = this;

            if (this.accountBlur(account)

                &&
                this.passwordBlur(password) &&
                this.passwordOkBlur(passwordOk)
            ) {

                // console.log(account,password,passwordOk)
                //  修改密码
                this.$post1('member/member/resetPassword', {
                    member: this.$store.state.userId,
                    oldPass: hbmd5(account),
                    newPass: hbmd5(password)
                }).then(res => {
                    if (res.status == "FAILED") {
                        this.Toast(res.errorMessage)
                    } else if (res.status == "SUCCEED") {
                        this.Toast(this.$t("change.Modify_successfully"))
                        // this.Toast('修改成功,重新登录')

                        window.sessionStorage.removeItem('userId');
                        window.sessionStorage.removeItem('token');
                        window.sessionStorage.removeItem('isLogin');
                        setTimeout(res => {
                            this.$router.push('/login');
                        }, 500)
                    }
                })

            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.xiugaimima {
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
