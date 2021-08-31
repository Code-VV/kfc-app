<template>
<div class="login a_title">
    <div class="con pad_16">
        <van-cell-group>
            <van-field v-model="account" @blur="accountBlur(account)" maxlength="6" :label="$t('add.ymm')" type="number" :placeholder="$t('add.qsrymm')" :error-message="accountError" />

            <van-field v-model="password" @blur="passwordBlur(password)" :label="$t('add.xmm')" maxlength="6" type="password" :placeholder="$t('add.qsrlw')" :error-message="passwordError" />

            <van-field v-model="passwordOk" type="password" maxlength="6" @blur="passwordOkBlur(passwordOk)" :label="$t('add.qrmm')" :placeholder="$t('add.qzcsrmm')" :error-message="passwordOkError" />
        </van-cell-group>

        <div class="size11 a_right pad_t_10">
            <router-link :to="{name:'postPasswordForget'}">
                <span class="c_blue">{{$t('add.wjmm')}}</span>
            </router-link>
        </div>

        <div class="btn mar_t_60" @click="submit">
            <van-button style="width:100%;background-color:#fbc400" type="info">{{$t('add.wc')}}</van-button>
        </div>

        <div class="size12 c_red pad_t_20">{{$t('add.xgmmh')}}</div>
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
            code: "",

            accountError: "",
            passwordError: "",
            passwordOkError: "",
            codeError: ""
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
            this.setnavTitle(this.$t('add.xgjymm'));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        }, // 初始化页面
        sec(n) {
            this.index = n;
        },

        // 账号
        accountBlur(val) {
            if (val == "") {
                this.accountError = "";
                // this.accountError = '输入原密码'
                return false;
            } else {
                this.accountError = "";
                return true;
            }
        },

        // 新密码
        passwordBlur(val) {
            if (!val) {
                this.passwordError = "";
                return false;
            }
            if (this.$util.testPostPassword(val)) {
                this.passwordError = this.$t('add.qsrlw');
                return false;
            } else if (val == this.account) {
                this.passwordError = this.$t('add.bnyymm');
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
                this.passwordOkError = this.$t('add.lymmbyz');
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

        submit() {
            let {
                account,
                password,
                passwordOk
            } = this;

            if (
                this.accountBlur(account) &&
                this.passwordBlur(password) &&
                this.passwordOkBlur(passwordOk)
            ) {
                // console.log(account, password);
                //  修改交易密码
                this.$post1("member/member/resetPayPass", {
                    member: this.$store.state.userId,
                    oldPass: hbmd5(account),
                    password: hbmd5(password)
                }).then(res => {
                    if (res.status == "FAILED") {
                        this.Toast(res.errorMessage);
                    } else if (res.status == "SUCCEED") {
                        this.Toast(this.$t('add.xgcg'));
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
