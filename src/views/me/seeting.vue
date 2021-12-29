<template>
<div class="seeting a_title">
    <!-- Allen 测试环境 跳转路由 -->
    <!-- <van-cell :title="$t('seeting.langue')" is-link :value="langueText" /> -->
    <van-cell :title="$t('seeting.langue')" is-link :value="langueText" to="/langue" />
    <!-- <van-cell :title="$t('seeting.Valuation_method')" is-link :value="$t('seeting.chineseYuan')" /> -->
    <!-- <van-cell :title="$t('seeting.color')" is-link :value="$t('seeting.greeUp')" /> -->
    <div v-show="islogin" class="c_blue bg_exit_btn size16 a_center height40 linehei40 mar_t_6" @click="exit">{{$t('seeting.exit')}}</div>
    
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import sendCode from "@/components/SendCode.vue";
import $ from "jquery";
export default {
    components: {
        sendCode
    },
    data() {
        return {
            langueText: "English",
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
    computed: {
        islogin() {
            return this.$store.state.isLogin;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        }
    },
    watch: {
        account(val) {},
        isNight(val) {
            this.setDialogStyle();
        }
    },
    created() {
        this.init();
        this.setDialogStyle();
        let current = window.localStorage.getItem("currentLangue");
        if (current == null) {
            this.langueText = "English";
        } else {
            if (current == "en") {
                this.langueText = "English";
            }
            if (current == "zh") {
                this.langueText = "简体中文";
            }
            if (current == "zh_f") {
                this.langueText = "繁体中文";
            }
        }
    },
    beforeUpdate(to, from, next) {},
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setLogin"
        ]),

        init() {
            this.setnavTitle(this.$t("seeting.settings"));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        }, // 初始化页面
        sec(n) {
            this.index = n;
        },

        exit() {
            this.Dialog.confirm({
                    title: this.$t('tc.tx'),
                    message: this.$t('tc.sftc'),
                    confirmButtonText:this.$t('tc.qd'),
                    cancelButtonText: this.$t('tc.qx'),
                }).then(() => {
                    this.setLogin(false);
                    // window.localStorage.removeItem("userId");
                    // window.localStorage.removeItem("token");
                    window.localStorage.clear();

                    this.Toast(this.$t('tc.tccg'));
                })
                .catch(() => {});
            setTimeout(() => {
                this.setDialogStyle();
            }, 10);
        },
        setDialogStyle() {
            if (this.isNight == "night-theme") {
                //黑夜模式
                let bg = "#171E28";
                $(".van-dialog").css("backgroundColor", bg);
                $(".van-popup").css("backgroundColor", "none");

                $(".van-dialog")
                    .find(".van-dialog__header")
                    .css("color", "rgba(255,255,255,.8)");
                $(".van-dialog")
                    .find(".van-dialog__message")
                    .css("color", "rgba(255,255,255,.6)");
                let dom1 = $(".van-dialog").find(".van-button--default");
                let dom2 = $(".van-dialog").find(".van-button__text");
                let dom3 = $(".van-dialog").find(".van-dialog__confirm");

                dom2.css("color", "#f0f0f0");
                dom1.css("backgroundColor", bg);
                dom3.css("backgroundColor", bg);
            } else {
                let bg = "#fff";
                $(".van-dialog").css("backgroundColor", bg);
                $(".van-popup").css("backgroundColor", "none");

                $(".van-dialog")
                    .find(".van-dialog__header")
                    .css("color", "#333");
                $(".van-dialog")
                    .find(".van-dialog__message")
                    .css("color", "#666");
                let dom1 = $(".van-dialog").find(".van-button--default");
                let dom2 = $(".van-dialog").find(".van-button__text");
                let dom3 = $(".van-dialog").find(".van-dialog__confirm");

                dom2.css("color", "#333");
                dom1.css("backgroundColor", bg);
                dom3.css("backgroundColor", bg);
            }
        },

        // 账号
        accountBlur(val) {
            if (val.indexOf("@") != -1) {
                //邮箱
                if (this.$util.testEmail(val)) {
                    this.accountError = "输入正确的邮箱格式";
                    return false;
                } else {
                    this.accountError = "";
                    return true;
                }
            } else {
                //手机
                if (!val) {
                    this.accountError = "输入正确的手机格式";
                    return false;
                } else {
                    this.accountError = "";
                    return true;
                }
            }
        },

        // 验证码
        codeBlur(val) {
            if (this.$util.testCode(val)) {
                this.codeError = "输入6位验证码";
                return false;
            } else {
                this.codeError = "";
                return true;
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
                this.passwordOkError = "两次密码不一致";
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
            this.$refs.mychild.send(phone);
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
                // console.log(account, password, passwordOk, code);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.seeting {
    height: 100%;
    position: relative;

    @include base-background-exit();

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

    // .van-cell:not(:last-child)::after{
    //   // border-bottom:1px solid #313131
    //   0.026667rem solid #ebedf0
    // }
}
</style>
