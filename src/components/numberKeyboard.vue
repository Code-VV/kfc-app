<template>
<!-- 单项选择器的组件 -->
<div class="numberKeyboard">
    <van-overlay :show="show" @click="closed" />

    <!-- @close="comfirm"   close-button-text="完成"-->
    <van-number-keyboard :show="show" @blur="show = false" @input="onInput" @delete="onDelete" duration="0.5">
        <div slot="title-left">
            <div class="tops flex-between align_center">
                <span class="size18 font1 c222">安全认证</span>
                <van-icon name="cross" size="20" @click="closed" />
            </div>
            <div class="scCode flex align_center hei45 size15 mar_t_12 b_bg" id="scCodes">
                <span class="font1 c222 pad_l_r_10 bor_r">短信验证码</span>
                <!-- <van-password-input
            :value="value"
            info="请输入短信验证码" class="flex1" :mask="false"
          />-->
                <!-- <span class="flex1 a_left pad_l_r_6">{{value}}</span> -->

                <van-field v-model="value" placeholder="请输入短信验证码" class="flex1 relative" ref="scanTextbox" readonly="readonly" @click="getFocuse">
                    <span :class="{'cur':isFocuse}" class="focuseLine" slot="label" v-show="isFocuse"></span>
                </van-field>

                <span class="pad_l_r_10 bor_l" @click="sendCode">
                    <sendCode ref="mychild"></sendCode>
                </span>
            </div>
        </div>
    </van-number-keyboard>
</div>
</template>

<script>
import sendCode from "@/components/SendCode.vue";
export default {
    components: {
        sendCode
    },
    data() {
        return {
            show: false,
            value: "", //验证码
            isFocuse: false
        };
    },
    props: ["type"],
    mounted() {},
    computed: {
        phone() {
            return this.$store.state.phone;
        }
    },
    watch: {
        value(val) {
            if (val) {
                this.isFocuse = false;
            } else {
                this.isFocuse = true;
            }
            if (val.length == 6) {
                this.$emit("submitEvent", val);
                // if (this.type == "bank") {

                // } else if (this.type == "weixin") {
                // }
            }
        }
    },
    methods: {
        submit() {
            this.show = true;
        },
        onInput(key) {
            this.value = (this.value + key).slice(0, 6);
        },
        onDelete() {
            this.value = this.value.slice(0, this.value.length - 1);
        },
        //关闭
        closed() {
            this.value = "";
            this.isFocuse = false;
            this.show = false;
            // this.$emit("onClose");
        },
        //发送验证码
        sendCode() {
            var _this = this;
            if (!this.phone) {
                this.Dialog.confirm({
                        title: "",
                        message: "您当前未绑定手机号，去绑定？"
                    })
                    .then(() => {
                        _this.$router.push("/accountCenter/bind?type=phone");
                    })
                    .catch(() => {});
                return;
            }
            this.isFocuse = false;
            if (this.type == "bank") {
                this.$refs.mychild.send(this.phone, "OTCBANK");
            } else if (this.type == "weixin") {
                this.$refs.mychild.send(this.phone, "OTCWECHAT");
            } else {
                this.$refs.mychild.send(this.phone, "OTCALIAY");
            }
        },
        //点击input获取焦点
        getFocuse() {
            this.isFocuse = true;
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.numberKeyboard {
    .van-number-keyboard {
        border-radius: 10px 10px 0px 0px;
        @include base-background();
    }

    .van-hairline--top::after {
        border: 0;
    }

    .van-cell {
        background: transparent !important;
    }

    #scCodes {
        .van-cell[data-v-2bbe8460]:not(:last-child)::after {
            border: 0 !important;
        }

        .van-field__label {
            position: absolute;
            left: 16px;
            top: 13px;
            width: auto;

            span.cur {
                width: 1px;
                height: 16px;
                display: block;
                animation: opName 1500ms ease infinite;
            }
        }
    }

    @keyframes opName {
        0% {
            opacity: 1;
        }

        80% {
            opacity: 0;
        }
    }

    .van-button--info {
        background: #6b3ce1;
        border: 1px solid #6b3ce1;
    }

    .van-number-keyboard__title {
        display: block;
        height: auto;
        line-height: unset;
        padding: 20px 15px;

        .van-number-keyboard__title-left {
            position: relative;
            border-radius: 10px 10px 0px 0px;
        }
    }
}
</style><style lang="scss" scoped>
.numberKeyboard {
    .scCode {
        // background: rgba(248, 248, 248, 1);
        border-radius: 4px;
    }
}
</style>
