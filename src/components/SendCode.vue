<template>
<div id="NavBar">
    <div v-if="!hassend" class="c_blue" :style="{zIndex:999}">{{$t("form.send_code")}}</div>
    <span v-if="hassend" class="c999">{{min}}s{{$t("form.send_late")}}</span>
    <!-- <span class="c_blue">发送验证码</span> -->
    <!-- 增加极验 -->
    <geet :isGeet="isGeet" @geetPath="geetPath" @clickChange="geetChange"></geet>
</div>
</template>

<script>
export default {
    // props:['type'],
    data() {
        return {
            hassend: false,
            min: 60,
            isGeet: false
        };
    },

    methods: {
        send(phone, type) {
            if (this.hassend) {
                return;
            }
            if (phone == '') {
                this.$emit('res', this.$t('geet.qsrsjhm'));
                return false
            } else {
                this.phone = phone;
                this.type = type;
                //this.isGeet = !this.isGeet;
                //return;
                this.$post1("data/sms/sendSms", {
                    phoneCode: this.$store.state.countryCode,
                    phone: this.phone,
                    type: this.type,
                }).then(res => {
                    if (res.status == "SUCCEED") {
                        this.Toast(this.$t('geet.fscg'))
                        this.countDown()
                    }
                });
            }
        },
        // 极验图片加载之后，通过更改控制变量实现可以再次加载
        geetChange(val) {
            this.isGeet = val;
        },
        geetPath(params) {
            // console.log(type)
            /**
             * 注册REGISTER
             * 重置密码
             * 重置支付密码
             * 绑定手机或者邮箱
             * 找回密码
             * 提币
             * 提现
             */
            //  REGISTER("REGISTER"),
            //  RESET("RESET"),
            //  PAYRESET("PAYRESET"),
            //  SETPHMAIL("PAYRESET"),
            //  RETRIEVE("RETRIEVE"),
            //  WITHDRAWAL_MONEY("WITHDRAWAL_MONEY"),
            //  WITHDRAWAL_COIN("WITHDRAWAL_COIN");
            //发送验证码
            this.$util.showLoading();
            this.$post1("data/sms/sendSms", {
                phoneCode: this.$store.state.countryCode,
                phone: this.phone,
                type: this.type,
                status: params.status,
                randomCode: params.randomCode,
                geetest_challenge: params.geetest_challenge,
                geetest_validate: params.geetest_validate,
                geetest_seccode: params.geetest_seccode,
            }).then(res => {
                if (res.status == "SUCCEED") {
                    this.Toast(this.$t('geet.fscg'))
                    this.countDown()
                }
            });
        },
        countDown() {
            this.min = this.min - 1;
            this.hassend = true;

            if (this.min == 0) {
                this.min = 60;
                this.hassend = false;
                return;
            }
            setTimeout(() => {
                this.countDown()
            }, 1000);
        }
    }

};
</script>
