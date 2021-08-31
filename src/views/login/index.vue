<template>
<div class="login a_title" id='login'>
    <div class="logo pad_l_r_60 a_center size16 c222">
        <div class="logo_img">
            <img src="./../../assets/images/logo.png" alt="">
        </div>
    </div>
    <div class="title pad_l_r_60 a_center size16 c111">
        <van-row>
            <van-col span="12" class="a_re">
                <div @click="sec(1)" class="item" :class="index==1?'c_blue size17':''">{{i18n.sj}}</div>
                <div :class="index==1?'bottom1':''"></div>
            </van-col>

            <van-col span="12" class="a_re">
                <div @click="sec(2)" class="item" :class="index==2?'c_blue size17':''">{{i18n.yx}}</div>
                <div :class="index==2?'bottom1':''"></div>
            </van-col>
        </van-row>
    </div>

    <div class="con pad_38" v-show="index==1">
        <van-cell-group>
            <van-field v-model="phone" type="tel" :placeholder="i18n.qsrsjh" @blur="phoneBlur(phone)" :error-message="phoneError">
                <span slot="label" @click="chooseArea">+{{countryCode}} ></span>
                <!-- <span slot="label">+{{countryCode}} ></span> -->
            </van-field>
            <van-field @blur="passwordBlur(password)" v-model="password" :label="i18n.mm" type="password" :placeholder="i18n.qsrmm" :error-message="passwordError" />
        </van-cell-group>
        <div class="size11 a_right pad_t_10">
            <router-link to="/forget?type=0">
                <span class="c_blue ">{{i18n.wjmm}}</span>
                <!-- <span class="c_blue ">忘记密码</span> -->
            </router-link>
        </div>
        <div class="btn pad_t_60" @click="submit">
            <van-button style="width:100%;background-color:#fbc400" type="info">{{i18n.dl}}</van-button>
            <!-- <van-button style="width:100%;background-color:#fbc400" type="info">登录</van-button> -->
        </div>
    </div>
    <div class="con pad_38" v-show="index==2">
        <van-cell-group>
            <van-field v-model="email" :label="i18n.yx" :placeholder="i18n.qsryx" @blur="emailBlur(email)" :error-message="emailError" />
            <van-field @blur="passwordBlur(password)" v-model="password" :label="i18n.mm" type="password" :placeholder="i18n.qsrmm" :error-message="passwordError" />

        </van-cell-group>
        <div class="size11 a_right pad_t_10">
            <router-link to="/forget?type=1">
                <span class="c_blue ">{{i18n.wjmm}}</span>
                <!-- <span class="c_blue ">忘记密码</span> -->
            </router-link>
        </div>
        <div>
        </div>
        <div class="btn pad_t_60" @click="submit">
            <van-button style="width:100%;background-color:#fbc400" type="info">{{i18n.dl}}</van-button>
        </div>
    </div>
    <div class=" a_center  size12 c666" style="width:100%">
        <span>{{i18n.hmyzhyzc}}</span>
        <router-link to="/register" replace>
            <span class="c_blue pad_l_r_4">{{i18n.zc}}</span>
        </router-link>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import {
    hbmd5
} from "../../plugins/md5";
import $ from 'jquery';
export default {
    data() {
        return {
            index: 1,
            phone: "", //账号
            email: "",
            password: '',
            phoneError: '',
            emailError: '',
            passwordError: ''
        };
    },
    mounted() {
        this.init();
        if (this.$store.state.nowThemeInfo == 'night-theme') {
            $('.login').find('.van-nav-bar__title').css('color', '#fff');
        } else {
            $('.login').find('.van-nav-bar__title').css('color', '#333')
            $('.login').find('.van-field__label').find('span').css('color', '#333') //账号密码标题
            $('.login').find('.van-cell').css('color', this.$bg_day)
        }
    },
    watch: {
        phone(val) {
            this.phone = val.replace(/\s+/g, "");
        },
        email(val) {
            this.email = val.replace(/\s+/g, "");
        },
        password(val) {
            this.password = val.replace(/\s+/g, "");
        },
    },
    created() {
        let account = window.localStorage.getItem('account');
        if(account!=null){
        if (account.indexOf("@") == -1) { //手机
            if (account) {
                this.index = 1;
                this.phone = account
            }
        } else { //邮箱
            if (account) {
                this.index = 2;
                this.email = account
            }
        }
        }else{
            // alert("account为null!!!")
            console.log("account为null!!!");
        }

    },
    computed: {
        i18n() {
            return this.$t("form");
        },
        countryCode() {
            return this.$store.state.countryCode;
        }
    },
    destroyed() {
        this.setnavBarBgColor("");;
    },
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setLogin",
            "setToken",
            "setUserId",
            "setnavBarBgColor"
        ]),
        init() {
            this.setnavTitle(this.i18n.dl);
            this.setbackRouter("home");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);

            // 判断白天黑夜
            // if(this.$store.state.nowThemeInfo=='night-theme'){
            //     this.setnavBarBgColor(this.$bg_night);
            // }else{
            //   this.setnavBarBgColor(this.$bg_day);
            // }

        }, // 初始化页面
        sec(n) {
            this.index = n
        },
        onClickLeft() {
            this.$router.go(-1)
        },

        // 手机
        phoneBlur(val) {
            if (!val) {
                this.phoneError = this.i18n.qsrzqdyxgs;
                return false;
            } else {
                this.phoneError = "";
                return true;
            }
        },
        // 邮箱
        emailBlur(val) {
            if (this.$util.testEmail(val)) {
                this.emailError = this.i18n.qsrzqdyxgs;
                return false;
            } else {
                this.emailError = "";
                return true;
            }
        },

        // 密码
        passwordBlur(val) {
            if (!val) {
                this.passwordError = this.i18n.qsrmm;
                // this.passwordError = '请输入8-20位字符，不能是纯数字'
                return false
            } else {
                this.passwordError = ''
                return true
            }

        },
        rememberAccount(account) {
            window.localStorage.setItem('account', account);
        },
        //选择国家
        chooseArea() {
            this.$router.push({
                path: `/chooseArea`
            });
        },
        submit() {
            let {
                phone,
                email,
                countryCode,
                password
            } = this;

            if ((this.emailBlur(email) || this.phoneBlur(phone)) && this.passwordBlur(password)) {

                let {
                    phone,
                    email,
                    countryCode,
                    password
                } = this;
                let params = {
                    password: hbmd5(password)
                }
                if (this.index == 1) {
                    params.phMail = phone;
                    params.areaCode = countryCode;
                } else {
                    params.phMail = email;
                }
                this.$post1('member/member/login', params).then(res => {
                    if (res.status == "FAILED") {
                        this.Toast(res.errorMessage)
                    } else if (res.status == "SUCCEED") {
                        this.rememberAccount(params.phMail)
                        this.setLogin(true);
                        this.setToken(res.result.token);
                        this.setUserId(res.result.id);

                        this.Toast(this.i18n.dlcg);
                        // this.Toast('登录成功')
                        this.$router.replace({
                            path: '/home'
                        });
                    }
                });
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.login {
    @include base-background();

    [class*="van-hairline"]::after {
        border: none;
    }

    height:100%;
    position: relative;

    .headers {
        @include base-background();
        // background-color: #fff;
        padding-top: 20px;
        color: #333;

    }

    .title {
        margin-top: 30px;
        height: 40px;
        line-height: 40px;

        .bottom1 {
            border-bottom: 2px solid $blue;
            position: absolute;
            width: 40px;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
    }

    .logo {
        display: flex;
        justify-content: center;
        margin-top: 30px;

        .logo_img {
            width: 90px;
            height: 90px;

            //  background: #ededed;
            img {
                width: 90px;
                height: 90px;
            }
        }

    }

    .con {

        .btn {
            width: 100%
        }
    }

}
</style>
