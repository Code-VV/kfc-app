<template>
<div class="about_us a_title">
    <van-cell :title="$t('about.yszc')" is-link value to="/aboutAgreement" />
    <van-cell :title="$t('about.bb')" value @click="checkUpdate">
        <span>V{{appVersion}}</span>
        <!-- <span class="c_red size12 pad_l_4">●</span> -->
    </van-cell>
    <update v-if="isUpdate" :type="1" @updateClose='updateClose' />
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import sendCode from "@/components/SendCode.vue"
import update from "@/components/update"; // 更新
export default {
    components: {
        sendCode,
        update
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
            isUpdate: false, //检测更新弹框
            appVersion: '1.00', //版本
        };
    },
    mounted() {
        this.appVersion = api.appVersion;
    },
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
            this.setnavTitle(this.$t('about.gywm'));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true)
        }, // 初始化页面
        //检查更新
        checkUpdate() {
            this.isUpdate = true;
        },
        sec(n) {
            this.index = n
        },
        //版本更新关闭
        updateClose() {
            this.isUpdate = false;
        },

        // 账号
        accountBlur(val) {
            if (val.indexOf('@') != -1) { //邮箱
                if (this.$util.testEmail(val)) {
                    this.accountError = '输入正确的邮箱格式'
                    return false
                } else {
                    this.accountError = ''
                    return true
                }
            } else { //手机
                if (!val) {
                    this.accountError = '输入正确的手机格式'
                    return false
                } else {
                    this.accountError = ''
                    return true
                }
            }

        },

        // 验证码
        codeBlur(val) {
            if (this.$util.testCode(val)) {
                this.codeError = '输入6位验证码'
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
                this.passwordOkError = '两次密码不一致'
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
            this.$refs.mychild.send(phone);
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

                //  // console.log(account,password,passwordOk,code)

            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.about_us {
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
