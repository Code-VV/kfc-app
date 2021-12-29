<template>
<div class="register a_title">
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
            <!-- <van-field readonly clickable label="国家" :value="value" placeholder="选择国家" @click="showPicker = true" />
            <van-popup v-model="showPicker" position="bottom">
                <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
            </van-popup> -->

            <van-field v-model="phone" type="tel" :placeholder="i18n.qsrsjh" @blur="phoneBlur(phone)" :error-message="phoneError">
                <span slot="label" @click="chooseArea">+{{countryCode}} ></span>
                <!-- <span slot="label">+{{countryCode}} ></span> -->
            </van-field>

            <van-field v-model="code" :label="i18n.yzm" @blur="codeBlur(code)" :placeholder="i18n.qsryzm" :error-message="codeError">
                <!-- <van-button slot="button" size="small" type="primary">发送验证码</van-button> -->
                <van-button @click="fun(phone)" slot="button" size="small">
                    <sendCode ref="mychild" @res="codeResFun"></sendCode>
                </van-button>
            </van-field>

            <van-field v-model="password" @blur="passwordBlur(password)" :label="i18n.mm" type="password" :placeholder="i18n.qsrmm" :error-message="passwordError" />
            <van-field v-model="passwordOk" @blur="passwordOkBlur(passwordOk)" :label="i18n.qrmm" type="password" :placeholder="i18n.qsrqrmm" :error-message="passwordOkError" />

            <!-- <van-field v-model="invitation" label="邀请码" placeholder="请输入邀请码（选填）" /> -->
            <van-field v-model="invitation" :label="i18n.yqm" :placeholder="i18n.qsryqm" />
        </van-cell-group>

        <div class="btn pad_t_60">
            <van-button @click="submit" style="width:100%;background-color:#499C7A;font-weight:400;" type="info">{{i18n.zc}}</van-button>
        </div>

        <div class="size11 a_center pad_t_30 flex-center">
            <img v-show="!read" @click="read=true" class="inline_block wid12 hei12 a_middle" src="./../../assets/images/user/read.png" alt />
            <img v-show="read" @click="read=false" class="inline_block wid12 hei12 a_middle" src="./../../assets/images/user/readed.png" alt />

            <span class=" pad_l_r_5 c666">{{i18n.yydbty}}</span>
            <router-link to="/agreement">
                <span class="c_blue">{{i18n.yhzcxy}}</span>
                <!-- <span class="c_blue">《用户注册协议》</span> -->
            </router-link>
        </div>
    </div>

    <div class="con pad_38" v-show="index==2">
        <!-- <van-field
          readonly
          clickable
          label="国家"
          :value="value"
          placeholder="选择国家"
          @click="showPicker = true"
        />

        <van-popup v-model="showPicker" position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirm"
          />
      </van-popup> -->

        <van-cell-group>
            <van-field v-model="email" :label="i18n.yx" :placeholder="i18n.qsryx" @blur="emailBlur(email)" :error-message="emailError" />
            <!-- <van-button slot="button" size="small" type="primary">发送验证码</van-button> -->

            <van-field v-model="code" :label="i18n.yzm" :placeholder="i18n.qsryzm" @blur="codeBlur(code)" :error-message="codeError">
                <van-button @click="funEmail(email)" slot="button" size="small">
                    <sendEmail ref="mychild1" @res="codeResFunEmail"></sendEmail>
                </van-button>
            </van-field>

            <van-field v-model="password" :label="i18n.mm" @blur="passwordBlur(password)" :placeholder="i18n.qsrmm" type="password" :error-message="passwordError" />
            <van-field v-model="passwordOk" :label="i18n.qrmm" @blur="passwordOkBlur(passwordOk)" :error-message="passwordOkError" type="password" :placeholder="i18n.qsrqrmm" />

            <van-field v-model="invitation" :label="i18n.yqm" :placeholder="i18n.qsryqm" />
        </van-cell-group>

        <div class="btn pad_t_60">
            <van-button @click="submit" style="width:100%;background-color:#499C7A" type="info">{{i18n.zc}}</van-button>
        </div>

        <div class="size11 a_center pad_t_30">
            <img v-show="!read" @click="read=true" class="inline_block wid12 hei12 a_middle" src="./../../assets/images/user/read.png" alt />
            <img v-show="read" @click="read=false" class="inline_block wid12 hei12 a_middle" src="./../../assets/images/user/readed.png" alt />

            <span class=" pad_l_r_5 c666">{{i18n.yydbty}}</span>

            <router-link to="/agreement">
                <span class="c_blue">{{i18n.yhzcxy}}</span>
            </router-link>
        </div>
    </div>

    <div class="a_center  size12 pad_t_30 pad_b_48 c666" style="width:100%">
        <span>{{i18n.yjyzhydl}}</span>
        <router-link to="/login" replace>
            <span class="c_blue pad_l_r_4">{{i18n.dl}}</span>
        </router-link>
    </div>
</div>
</template>

<script>
import $ from 'jquery'
import {
    mapActions
} from "vuex";
import {
    hbmd5
} from "../../plugins/md5";
import sendCode from "@/components/SendCode.vue";
import sendEmail from "@/components/SendEmail";

export default {
    components: {
        sendCode,
        sendEmail
    },
    data() {
        return {
            read: false,

            value: "",
            phone: "", //账号
            email: "",
            password: "",
            passwordOk: "",

            code: "", //验证码
            invitation: "", //邀请码

            phoneError: "",
            emailError: "",
            codeError: "",
            passwordError: "",
            passwordOkError: "",

            index: 1,
            showPicker: false,
            columns: ["杭州", "宁波", "温州", "嘉兴", "湖州"]
        };
    },
    watch: {

        phone(val) {
            this.phone = val.replace(/\s+/g, "");
        },
        value(val) {
            this.value = val.replace(/\s+/g, "");
        },
        email(val) {
            this.email = val.replace(/\s+/g, "");
        },
        password(val) {
            this.password = val.replace(/\s+/g, "");
        },
        passwordOk(val) {
            this.passwordOk = val.replace(/\s+/g, "");
        },
        invitation(val) {
            this.invitation = val.replace(/\s+/g, "");
        },
        code(val) {
            this.code = val.replace(/\s+/g, "");
        },

    },
    mounted() {
        if (this.$store.state.nowThemeInfo == 'night-theme') {
            $('.register').find('.van-nav-bar__title').css('color', '#fff');
            $('.register').find('.van-cell').css('color', this.$bg_night);
            $('.register').find('.van-field__label').find('span').css('color', '#ffffffcc'); //账号密码标题 0.8
            // $('.login').find('.van-field').css('border-bottom','0.026667rem solid #ebedf0') //input 边框
        } else {
            $('.register').find('.van-nav-bar__title').css('color', '#333');
            $('.register').find('.van-field__label').find('span').css('color', '#333'); //账号密码标题
            $('.register').find('.van-cell').css('color', this.$bg_day);
        }
    },
    created() {
        // 获取邀请码
        this.invitation = this.$route.query.invitation || "";
        this.init();
    },
    computed: {
        i18n() {
            return this.$t("form");
        },
        countryCode() {
            return this.$store.state.countryCode || 86;
        }
    },
    methods: {
        fun(a) {
            this.$refs.mychild.send(a, "REGISTER");
        },

        funEmail(a) {
            this.$refs.mychild1.send(a, "REGISTER");
        },

        codeResFun(res) {
            // console.log(res);
            this.phoneError = res;
        },
        codeResFunEmail(res) {
            // console.log(res);
            this.emailError = res;
        },

        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setCountryCode",
            "setCountryName"
        ]),
        init() {
            this.setnavTitle(this.i18n.zc);
            this.setbackRouter("home");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        }, // 初始化页面
        sec(n) {
            this.init();
            this.inindata();
            this.index = n;
        },
        inindata() {
            this.phoneError = "";
            this.emailError = "";
            this.codeError = "";
            this.passwordError = "";
            this.passwordOkError = "";
        },

        onConfirm(value) {
            this.value = value;
            // console.log(value);
            this.showPicker = false;
        },

        // 账号验证

        // 手机
        phoneBlur(val) {
            if (!val) {
                this.phoneError = this.i18n.qsrsjh;
                return false;
            } else {
                this.phoneError = "";
                return true;
            }
        },
        // 邮箱
        emailBlur(val) {
            if (this.$util.testEmail(val)) {
                this.emailError = this.i18n.qsryxgs;
                return false;
            } else {
                this.emailError = "";
                return true;
            }
        },

        // 验证码
        codeBlur(val) {
            if (this.$util.testCode(val)) {
                this.codeError = this.i18n.qsryzmgs;
                return false;
            } else {
                this.codeError = "";
                return true;
            }
        },
        // 密码
        passwordBlur(val) {
            if (!val) {
                this.passwordError = this.i18n.qsrmm;
                return false;
            } else {
                this.passwordError = "";
                return true;
            }
        },

        // 确认密码
        passwordOkBlur(val) {
            if (val == "") {
                this.passwordOkError = this.i18n.qzcsrmm;
                return false;
            } else if (this.password != val && val != "") {
                this.passwordOkError = this.i18n.lcmmbyz;
                return false;
            } else {
                this.passwordOkError = "";
                return true;
            }
        },
        readFun() {
            if (!this.read) {
                this.Toast(this.i18n.qydbtyyhzcxy);
                return false;
            } else {
                return true;
            }
        },

        submit() {
            let {
                phone,
                email,
                code,
                password,
                passwordOk,
                invitation,
                countryCode
            } = this;

            if (this.index == 1) {
                //phone
                if (
                    this.phoneBlur(phone) &&
                    this.codeBlur(code) &&
                    this.passwordBlur(password) &&
                    this.passwordOkBlur(passwordOk) &&
                    this.readFun()
                ) {
                    this.formdata(phone, email, code, password, passwordOk, invitation, countryCode);
                }
            } else {
                //email
                if (
                    this.emailBlur(email) &&
                    this.codeBlur(code) &&
                    this.passwordBlur(password) &&
                    this.passwordOkBlur(passwordOk) &&
                    this.readFun()
                ) {
                    this.formdata(phone, email, code, password, passwordOk, invitation);
                }
            }
        },
        formdata(phone, email, code, password, passwordOk, invitation, countryCode) {
            let params = {
                code
            };
            let data = {
                password: hbmd5(password),
                welCode: invitation,

            };
            if (this.index == 1) {
                data.phone = phone;
                data.regType = "PHONE";
                data.areaCode = countryCode;
            } else {
                data.mail = email;
                data.regType = "MAIL";
            }
            this.$post1("member/member/register", params, data).then(res => {
                if (res.status == "SUCCEED") {
                    this.Toast(this.i18n.zcgg);
                    if (this.index == 1) {
                        window.localStorage.setItem('account', phone);
                    } else {
                        data.mail = email;
                        window.localStorage.setItem('account', email);
                    }
                    this.$router.replace({
                        path: "/login"
                    });
                }
                if (res.status == "FAILED") {
                    this.Toast(res.errorMessage);
                }
            });
        },
        //选择国家
        chooseArea() {
            this.$router.push({
                path: `/chooseArea`
            });
        },
        //用户注册协议
        goAgreement() {
            this.$router.push({
                path: `/agreement`
            });
        },
        onClickLeft() {
            this.$router.go(-1)
        }
    },
    destroyed() {
        this.setCountryCode("");
        this.setCountryName("");
    }
};
</script>

<style>
.register .van-field__label {
    color: #ffffffcc
}

.register .van-picker__cancel,
.register .van-picker__confirm {
    color: #499C7A !important;
}
</style><style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.register {
    @include base-background();
    height: 100%;
    position: relative;

    [class*="van-hairline"]::after {
        border: none;
    }

    .headers {
        @include base-background();

        padding-top: 20px;
        color: #333;
        //  .van-icon-arrow-left:before {
        //     color: #333;
        //   }
    }

    .title {
        margin-top: 30px;
        height: 40px;
        line-height: 40px;

        .bottom1 {
            border-bottom: 2px solid #499C7A;
            position: absolute;
            width: 40px;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
        }
    }

    .con {
        .van-cell-group {
            &::after {
                border-top: none !important;
            }
        }
    }

    .btn {
        width: 100%;
    }

    .flex-center {
        display: flex;
        align-items: center;
        justify-content: center;

    }
}
</style>
