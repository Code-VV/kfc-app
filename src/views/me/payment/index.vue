<template>
<div class="payments container_common">
    <!-- <header
      class="headers header_custom hei46 pad_l_r_60 header_bg_style c333"
      :style="{ paddingTop: safeTop+'px'}"
    >
      <div
        class="left_icon absolute pad_l_15 hei46 flex align_center"
        :class="isNight=='night-theme'?'whiteIcons':'darkIcons'"
        style="left:0"
      >
        <van-icon name="arrow-left" @click="back()" />
      </div>
      <div class="titleContent font1 size16 hei46 linehei46 center_text">收款方式</div>
    </header>-->
    <div class="items bg_exit_btn c222" v-if="userInfo.bankCard">
        <div class="tops flex-between align_center">
            <div class="flex align_center size15 font1">
                <img src="../../../assets/images/home/bankCard.png" alt srcset class="logos" />
                <span>{{userInfo.bankUserName}}</span>
            </div>
            <div v-if="type=='open'">
                <van-switch v-model="checked" size="20px" @change="((val)=>{switchChange(val,'bank')})" />
            </div>
        </div>
        <div class="c999 size13 mar_t_15">{{userInfo.bankName}}</div>
        <van-cell :title="userInfo.bankCard" is-link class="size15 c222 font1 mar_t_12 accounts" :to="{name: 'bankCard'}" />
    </div>
    <div class="items bg_exit_btn c222" v-else>
        <van-cell is-link class="size15 c222 font1 accounts" :to="{name: 'bankCard'}" value="未设置">
            <div class="flex align_center">
                <img src="../../../assets/images/home/bankCard.png" alt srcset class="logos" slot="icon" />
                <span slot="title" class="c222">{{$t('skfs.yhk')}}</span>
            </div>
        </van-cell>
    </div>
    <!-- <div class="items bg_exit_btn c222" v-if="userInfo.payWechat">
        <div class="tops flex-between align_center">
            <div class="flex align_center size15 font1">
                <img src="../../../assets/images/home/wexin.png" alt srcset class="logos" />
                <span>微信名</span>
            </div>
            <div v-if="type=='open'">
                <van-switch v-model="checked1" size="20px" @change="((val)=>{switchChange(val,'wx')})" />
            </div>
        </div>
        <van-cell :title="userInfo.wechatName" is-link class="size15 c222 font1 mar_t_12 accounts" :to="{name: 'weixin'}" />
    </div>
    <div class="items bg_exit_btn c222" v-else>
        <van-cell is-link class="size15 c222 font1 accounts" :to="{name: 'weixin'}" value="未设置">
            <div class="flex align_center">
                <img src="../../../assets/images/home/wexin.png" alt srcset class="logos" slot="icon" />
                <span slot="title" class="c222">微信</span>
            </div>
        </van-cell>
    </div> -->
    <!-- <div class="items bg_exit_btn c222" v-if="userInfo.aliayName">
        <div class="tops flex-between align_center">
            <div class="flex align_center">
                <img src="../../../assets/images/home/zhifubao.png" alt srcset class="logos" />
                <span>支付宝</span>
            </div>
            <div v-if="type=='open'">
                <van-switch v-model="checked2" size="20px" @change="((val)=>{switchChange(val,'zfb')})" />
            </div> -->
            <!-- <van-switch v-model="checked2" size="20px" @change="((val)=>{switchChange(val,'zfb')})" /> -->
        <!-- </div>
        <van-cell :title="userInfo.aliayName" is-link class="size15 c222 font1 mar_t_12 accounts" :to="{name: 'zhifubao'}" />
    </div>
    <div class="items bg_exit_btn c222" v-else>
        <van-cell is-link class="size15 c222 font1 accounts" :to="{name: 'zhifubao'}" value="未设置">
            <div class="flex align_center">
                <img src="../../../assets/images/home/zhifubao.png" alt srcset class="logos" slot="icon" />
                <span slot="title" class="c222">支付宝</span>
            </div>
        </van-cell> -->
    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";

import $ from "jquery";
export default {
    components: {},
    data() {
        return {
            checked: false, //银行卡switch
            checked1: false, //微信switch
            checked2: false, //支付宝switch
            userInfo: {},
            type: ""
        };
    },
    mounted() {},
    computed: {
        islogin() {
            return this.$store.state.isLogin;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        },
        safeTop() {
            return this.$store.state.safeAreaTop;
        }
    },
    watch: {
        account(val) {}
    },
    activated() {
        this.init();
        this.getUserInfo();
        this.type = this.$route.query.type || "";
    },
    deactivated() {
        var chooseArr = [];
        if (this.checked) {
            chooseArr.push("BANKCARD");
        }
        if (this.checked1) {
            chooseArr.push("WECHAT");
        }
        if (this.checked2) {
            chooseArr.push("ALIAY");
        }
        this.setPayType(chooseArr);
        this.checked = false; //银行卡switch
        this.checked1 = false; //微信switch
        this.checked2 = false;
    },
    beforeUpdate(to, from, next) {},
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setLogin",
            "setPayType"
        ]),

        init() {
            this.setnavTitle(this.$t('skfs.skfs'));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        }, // 初始化页面
        getUserInfo() {
            this.$get("member/member/getMember", {
                member: this.$store.state.userId
            }).then(res => {
                if (res.status == "FAILED") {
                    this.Toast(res.errorMessage);
                } else if (res.status == "SUCCEED" && res.result) {
                    this.userInfo = res.result;
                }
            });
        },
        switchChange(val, index) {}
    }
};
</script>

<style lang="scss">
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.payments {
    height: 100%;
    position: relative;

    @include base-background-exit();

    .items {
        border-radius: 6px;
        margin-top: 10px;
        padding: 15px 10px;

        .logos {
            width: 19px;
            height: 19px;
            margin-right: 6px;
        }

        .accounts {
            padding: 0;
        }
    }
}
</style>
