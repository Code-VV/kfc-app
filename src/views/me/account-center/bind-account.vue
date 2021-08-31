<template>
<div class="login a_title">

    <div class="con pad_16">
        <van-cell-group>

            <van-field v-if="type=='phone'" v-model="phone" type="tel" :placeholder="$t('form.enter_number')" @blur="phoneBlur(phone)" :error-message="phoneError">
                <span slot="label" @click="chooseArea">{{`+${countryCode}>`}}</span>
            </van-field>
            <van-field v-if="type=='email'" size="large" v-model="email" @blur="emailBlur(email)" :label="$t('form.mail')" :placeholder="$t('form.input_email')" :error-message="emailError"></van-field>
        </van-cell-group>

        <div class="btn mar_t_100" @click="submit">
            <van-button style="width:100%;background-color:#fbc400" type="info">{{$t("form.Next_step")}}</van-button>
        </div>
    </div>

</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import sendCode from "@/components/SendCode.vue"
export default {
    components: {
        sendCode
    },
    data() {
        return {
            type: '',
            phone: '',
            email: '',
            phoneError: '',
            emailError: '',

        };
    },
    computed: {
        countryCode() {
            return (this.$store.state.countryCode || 86);
        }
    },
    created() {
        this.type = this.$route.query.type;
        if (this.type == 'phone') {
            this.init(this.$t("bind.title1"));
            //  this.init('绑定手机');
        }
        if (this.type == 'email') {
            this.init(this.$t("bind.title2"));
            //  this.init('绑定邮箱');
        }

    },
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow"
        ]),
        // 初始化页面
        init(title) {
            this.setnavTitle(title);
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true)
        },
        //选择国家
        chooseArea() {
            this.$router.push({
                path: `/chooseArea`
            });
        },
        // 手机
        phoneBlur(val) {
            if (!val) {
                this.phoneError = this.$t("form.phone_format")
                // this.phoneError = '输入正确的手机格式'
                return false
            } else {
                this.phoneError = ''
                return true
            }

        },
        // 邮箱
        emailBlur(val) {
            if (this.$util.testEmail(val)) {
                this.emailError = this.$t("form.email_format")
                // this.emailError = '输入正确的邮箱格式'
                return false
            } else {
                this.emailError = ''
                return true
            }

        },

        sendPhone(phone, type) {
            this.$router.push({
                name: 'bindSecond',
                query: {
                    type: 'phone',
                    phone,
                    countryCode: this.countryCode
                }
            })
        },
        sendEmail(mailbox, type) {
            this.$router.push({
                name: 'bindSecond',
                query: {
                    type: 'email',
                    email: mailbox
                }
            })
        },

        submit() {
            let {
                phone,
                email,
                type
            } = this;
            if (type == 'phone') {
                if (this.phoneBlur(phone)) {
                    this.sendPhone(phone, 'SETPHMAIL')
                }
            } else {

                if (this.emailBlur(email)) {
                    this.sendEmail(email, 'SETPHMAIL')
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.login {
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
