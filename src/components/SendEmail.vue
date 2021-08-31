<template>
<div id="NavBar">
    <!-- <div v-if="!hassend" class="c_blue" >发送验证码</div>
     <span v-if="hassend" class="c999" >{{min}}s后发送</span> -->
    <div v-if="!hassend" class="c_blue">{{$t("form.send_code")}}</div>
    <span v-if="hassend" class="c999">{{min}}s{{$t("form.send_late")}}</span>

</div>
</template>

<script>
export default {
    // props:['type'],
    data() {
        return {
            hassend: false,
            min: 60
        };
    },
    methods: {
        send(val, type) {
            let _this = this;
            if (this.hassend) {
                return
            }
            if (val == '') {
                this.$emit('res', '请输入邮箱');
                return false;
            } else {
                if (!_this.$util.testEmail(val)) {
                    this.sendEmail(val, type)
                } else {
                    this.$emit('res', '邮箱格式错误');
                    return false
                }
            }
        },

        sendEmail(mailbox, type) {
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
            this.$post1("data/sms/sendMail", {
                mailbox,
                type //  
            }).then(res => {
                if (res.status == "SUCCEED") {
                    this.Toast('发送成功')
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
