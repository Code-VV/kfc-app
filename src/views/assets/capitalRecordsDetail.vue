<template>
<div class="container_common capitalRecordsDetail">
    <div v-if="type=='coinCharging'">
        <van-cell :title="$t('hzjr.je')" class="money">
            <span>{{list.amount}}</span>
        </van-cell>
        <van-cell :title="$t('hzjr.bz')">
            <span>{{list.coin}}</span>
        </van-cell>
        <van-cell title="TO" @click="copythat(list.to)">
            <span v-if="list.to==''">{{list.to}}</span>
            <span v-else>{{list.toAddress}}</span>
        </van-cell>
        <van-cell title="FROM" @click="copythat(list.from)">
            <span v-if="list.from==''">{{list.from}}</span>
            <span v-else>{{list.fromAddress}}</span>
        </van-cell>
        <van-cell :title="$t('hzjr.hydz')" @click="copythat(list.contract)">
            <span>{{list.contract}}</span>
        </van-cell>
        <van-cell :title="$t('hzjr.qkgd')">
            <span>{{list.blockNumber}}</span>
        </van-cell>
        <van-cell :title="$t('hzjr.jyha')">
            <span>{{list.hash}}</span>
        </van-cell>
    </div>
    <div v-else>
        <van-cell :title="$t('hzjr.je')" class="money">
            <div slot="default" class="size18 blue_text" v-if="type=='withdrawCoin'">
                <span class="size18 blue_text" v-if="list.currency.indexOf('USDT')>=0">{{list.balance|SubString(4)}} USDT</span>
                <span class="size18 blue_text" v-else>{{list.balance|SubString(4)}} {{list.currency}}</span>
            </div>
            <div slot="default" class="size18 blue_text" v-else>
                <span class="size18 blue_text" v-if="list.currency.indexOf('USDT')>=0">{{list.fee|SubString(4)}} USDT</span>
                <span class="size18 blue_text" v-else>{{list.fee|SubString(4)}} {{list.currency}}</span>
            </div>
        </van-cell>
        <van-cell-group class="moneyBox c222">
            <van-cell :title="$t('hzjr.lx')">
                <div slot="default" v-if="type=='transfer'" class="eils">
                    <span v-if="list.type =='BALANCE_MOVE_TOKEN'" class="eils c666">{{$t('hzjr.bbzhy')}}</span>
                    <span v-if="list.type =='BALANCE_MOVE_ASSETS'" class="eils c666">{{$t('hzjr.bbzct')}}</span>
                    <span v-if="list.type =='BALANCE_MOVE_FB'" class="eils c666">{{$t('hzjr.bbzfb')}}</span>
                    <span v-if="list.type =='TOKEN_MOVE_BALANCE'" class="eils c666">{{$t('hzjr.hyzbb')}}</span>
                    <span v-if="list.type =='TOKEN_MOVE_FB'" class="eils c666">{{$t('hzjr.hyzfb')}}</span>
                    <span v-if="list.type =='TOKRN_MOVE_ASSETS'" class="eils c666">{{$t('hzjr.hyzct')}}</span>
                    <span v-if="list.type =='FB_MOVE_BALANCE'" class="eils c666">{{$t('hzjr.fbzbb')}}</span>
                    <span v-if="list.type =='FB_MOVE_TOKEN'" class="eils c666">{{$t('hzjr.fbzhy')}}</span>
                    <span v-if="list.type =='FB_MOVE_ASSETS'" class="eils c666">{{$t('hzjr.fbzct')}}</span>
                    <span v-if="list.type =='ASSETS_MOVE_BALANCE'" class="eils c666">{{$t('hzjr.ctzbb')}}</span>
                    <span v-if="list.type =='ASSETS_MOVE_FB'" class="eils c666">{{$t('hzjr.ctzfb')}}</span>
                    <span v-if="list.type =='ASSETS_MOVE_TOKEN'" class="eils c666">{{$t('hzjr.ctzhy')}}</span>
                </div>
                <div slot="default" v-else class="eils">
                    <span>{{list.type}}</span>
                </div>
            </van-cell>
            <!-- <van-cell title="人民币金额（预估）">
        <span slot="default">+{{100.00|SubString(4)}} CNY</span>
      </van-cell>
      <van-cell title="人民币金额（实际）">
        <span slot="default">+{{100.00|SubString(4)}} CNY</span>
      </van-cell>
      <van-cell title="银行卡" value="-" />-->
            <!-- 提笔记录 -->

            <van-cell :title="$t('hzjr.tbdz')" v-if="type=='withdrawCoin'">
                <span>{{list.wallet}}</span>
            </van-cell>

            <van-cell :title="$t('hzjr.cbdz')" v-if="type=='coinCharging'">
                <span>{{list.wallet}}</span>
            </van-cell>

            <van-cell :title="$t('hzjr.zt')" v-if="type=='withdrawCoin'">
                <span v-if="list.state=='REJECT'">{{$t('hzjr.sb')}}</span>
                <span v-if="list.state=='PASS'">{{$t('hzjr.shtg')}}</span>
                <span v-if="list.state=='CREATE'">{{$t('hzjr.jxz')}}</span>
                <span v-if="list.state=='CLOSE'">{{$t('hzjr.cg')}}</span>
            </van-cell>

            <van-cell :title="$t('hzjr.sxf')" v-if="type=='withdrawCoin' ">
                <span v-if="list.currency.indexOf('USDT')>=0">{{list.handlingFee|SubString(4)}} USDT</span>
                <span v-else>{{list.handlingFee}} {{list.currency}}</span>
            </van-cell>

            <!-- 充币记录 -->
            <van-cell :title="$t('hzjr.zt')" v-if="type=='coinCharging'">
                <span>{{$t('hzjr.cg')}}</span>
            </van-cell>

            <van-cell :title="$t('hzjr.sj')">
                <span slot="default" v-if="type=='transfer'">{{list.createTime|yndhms}}</span>
                <span slot="default" v-else-if="type=='coinCharging'">{{list.createTime}}</span>
                <span slot="default" v-else>{{list.extractTime}}</span>
            </van-cell>
        </van-cell-group>
    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    computed: {
        i18n() {
            return this.$t("coin");
        },
    },
    data() {
        return {
            type: "",
            list: {
                fee: "",
                balance: "",
                type: "",
                wallet: "",
                handlingFee: "",
                state: "",
                currency: ''
            }
        };
    },
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setnavBarBgColor",
            "setnavBarShowRight"
        ]),
        init() {
            this.setnavTitle(this.$t('hzjr.xxxx'));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        },
        copythat: function (text) {
            var self = this;
            if (!text) {
                return this.Toast(this.i18n.fzsb);
            }
            var clipBoard = api.require("clipBoard");
            clipBoard.set({
                    value: text
                },
                function (ret, err) {
                    if (ret) {
                        return self.Toast(self.i18n.fzcg);
                    } else {
                        return self.Toast(self.i18n.fzsb);
                    }
                }
            );
        },
    },
    mounted() {
        this.init();
        this.type = this.$GLOBAL.recordsDetail.type;
        var data = this.$GLOBAL.recordsDetail.data;
        this.list = data;
    }
};
</script>

<style lang="scss">
.capitalRecordsDetail {
    .van-cell:not(:last-child)::after {
        border: 0;
    }

    .van-hairline--top-bottom::after {
        border: 0;
    }

    .moneyBox {
        .van-cell__value {
            // color: #222222;
        }
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.capitalRecordsDetail {
    height: 100%;
    @include base-background();

    padding-left: 0;
    padding-right: 0;

    .money {
        @include base-background-second();

        // background: #f8f7fd;
    }
}
</style>
