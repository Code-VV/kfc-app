<template>
<div class="bangding_account a_title">
    <div class="con pad_16">
        <van-cell-group>

            <van-field v-show="type=='phone'" v-model="phoneCode" type="number" size="large" label="手机验证码" placeholder="请输入手机验证码" @blur="phoneBlur(phoneCode)" :error-message="phoneError">
                <van-button @click="fun" slot="button" size="small">
                    <sendCode ref="mychild" @res="codeResFun"></sendCode>
                </van-button>
            </van-field>
            <van-field v-show="type=='email'" type="number" size="large" v-model="emailCode" @blur="emailBlur(emailCode)" label="邮箱验证码" placeholder="请输入邮箱验证码" :error-message="emailError">
                <van-button @click="funEmail" slot="button" size="small">
                    <sendEmail ref="mychild1" @res="codeResFunEmail"></sendEmail>
                </van-button>
            </van-field>
        </van-cell-group>
        <div class="btn mar_t_100" @click="submit">
            <van-button style="width:100%;background-color:#fbc400" type="info">完成</van-button>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import sendCode from "@/components/SendCode"
import sendEmail from "@/components/SendEmail"
export default {
    components: {
        sendCode,
        sendEmail
    },
    data() {
        return {
            type: '',
            phone: '',
            email: '',
            phoneCode: '',
            emailCode: '',
            phoneError: '',
            emailError: '',
            countryCode: ''
        };
    },
    mounted() {

    },
    watch: {
        // account(val) {

        // }
    },
    created() {
        this.type = this.$route.query.type;
        this.phone = this.$route.query.phone;
        this.email = this.$route.query.email;
        this.countryCode = this.$route.query.countryCode || 86;
        if (this.type == 'phone') {
            this.init('绑定手机');
        }
        if (this.type == 'email') {
            this.init('绑定邮箱');
        }

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
        init(title) {
            this.setnavTitle(title);
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true)
        }, // 初始化页面

        fun() {
            this.$refs.mychild.send(this.phone, 'SETPHMAIL');
        },

        funEmail() {
            this.$refs.mychild1.send(this.email, 'SETPHMAIL');
        },

        codeResFun(res) {
            // console.log(res)
            // this.phoneError = res
        },
        codeResFunEmail(res) {
            // console.log(res)
            // this.emailError = res
        },

        // 手机
        phoneBlur(val) {
            if (this.$util.testCode(val)) {
                this.phoneError = '输入6位验证码'
                return false
            } else {
                this.phoneError = ''
                return true
            }

        },
        // 邮箱
        emailBlur(val) {
            if (this.$util.testCode(val)) {
                this.emailError = '输入6位验证码'
                return false
            } else {
                this.emailError = ''
                return true
            }
        },

        submit() {
            let {
                phone,
                email,
                type,
                phoneCode,
                emailCode
            } = this;

            if (type == 'phone') {
                if (this.phoneBlur(phoneCode)) {
                    // console.log(phone,phoneCode)
                    this.$post1('member/member/setPhMail', {
                        // member=tryt&phMail=wee5rthy&regType=MAIL&code=1234"
                        phMail: phone,
                        regType: 'PHONE',
                        member: this.$store.state.userId,
                        areaCode: this.countryCode,
                        code: phoneCode
                    }).then(res => {
                        if (res.status == "FAILED") {
                            this.Toast(res.errorMessage)
                        } else if (res.status == "SUCCEED") {
                            this.Toast('绑定成功')
                            this.$router.go(-2)
                        }
                    });
                }
            } else {
                if (this.emailBlur(emailCode)) {
                    // console.log(email,emailCode)
                    this.$post1('member/member/setPhMail', {
                        regType: 'MAIL',
                        member: this.$store.state.userId,
                        phMail: email,
                        code: emailCode
                    }).then(res => {
                        if (res.status == "FAILED") {
                            this.Toast(res.errorMessage)
                        } else if (res.status == "SUCCEED") {
                            this.Toast('绑定成功')
                            this.$router.go(-2)
                        }
                    })

                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.bangding_account {
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
