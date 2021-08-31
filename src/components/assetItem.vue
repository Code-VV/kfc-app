<template>
<div class="assetItems bor_b" :class="{'border_none':page=='detail'}" id="assetItems">
    <van-cell :value="list.currency" v-if="page=='detail'" />
    <!-- //合约，2币币，3法币，4充提 -->
    <!-- :to="{ name:'assetDetail', params: { current: list.currency,type:type}}" -->
    <div v-else>
        <van-cell :title="list.currency" @click="goDetail" is-link v-if="type==4" />
        <van-cell :title="list.currency" v-else />
    </div>
    <div class="lists">
        <div v-if="type==5" class="rows flex-between c111">
            <div class="items">{{$t('assetsi.dj')}}</div>
            <div class="items size14 mar_t_8" v-if="type==5">{{list.raiseBalance|toNumber(4)}}</div>
        </div>
        <div v-else>
            <van-row gutter="20" class="rows size13 c111">
                <van-col span="8">
                    <!-- <div class="items">{{type==2?'账户权益(BTC)':'可用'}}</div> -->
                    <div class="items">{{$t('assetsi.ky')}}</div>
                    <div class="items size14 mar_t_8" v-if="type==1">{{list.balance|toNumber(4)}}</div>
                    <div class="items size14 mar_t_8" v-if="type==2">{{list.tokenBalance|toNumber(4)}}</div>
                    <div class="items size14 mar_t_8" v-if="type==3">{{list.fbBalance|toNumber(4)}}</div>
                    <div class="items size14 mar_t_8" v-if="type==4">{{list.assetsBalance|toNumber(4)}}</div>
                </van-col>
                <van-col span="8" class="center_text">
                    <!-- <div class="items">{{type==2?'预估强平价(USD)':'冻结'}}</div> -->
                    <div class="items">{{$t('assetsi.dj')}}</div>
                    <!-- <div class="items size14 mar_t_8">{{(type==1?list.blockedBalance:list.tokenBlockedBalance)|toNumber(4)}}</div> -->
                    <div class="items size14 mar_t_8" v-if="type==1">{{list.blockedBalance|toNumber(4)}}</div>
                    <div class="items size14 mar_t_8" v-if="type==2">{{list.tokenBlockedBalance|toNumber(4)}}</div>
                    <div class="items size14 mar_t_8" v-if="type==3">{{list.fbBlockedBalance|toNumber(4)}}</div>
                    <div class="items size14 mar_t_8" v-if="type==4">{{list.assetsBlockedBalance|toNumber(4)}}</div>
                </van-col>
                <van-col span="8" class="right_text">
                    <div class="items">{{type==2?$t('assetsi.dq'):$t('assetsi.zh')}}</div>
                    <div class="items size14 mar_t_8">
                        <div class="items size14 mar_t_8" v-if="type==1">{{list.scaleBalanceCny|toNumber(2)}}</div>
                        <div class="items size14 mar_t_8" v-if="type==2">{{list.scaleTokenUsdt|toNumber(4)}}</div>
                        <div class="items size14 mar_t_8" v-if="type==3">{{list.scaleFbCny|toNumber(2)}}</div>
                        <div class="items size14 mar_t_8" v-if="type==4">{{list.scaleAssetsCny|toNumber(2)}}</div>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState
} from "vuex";
export default {
    props: {
        list: {
            type: Object,
            default: {}
        },
        type: {
            type: Number
        },
        page: {
            type: String
        }
    },
    data() {
        return {};
    },
    methods: {
        goDetail() {
            var arr = [];
            arr.push(this.list);
            // var list = JSON.stringify(arr);
            var data = {
                list: arr,
                types: this.type
            }
            this.$GLOBAL.setAssetDetail(data);
            this.$router.push({
                // path: `/assets/assetDetail?list=${list}&types=${this.type}`
                name: "assetDetail",
                // params:{
                //   list:list,
                //   types:this.type
                // }
            });
        }
    },
    mounted() {},
    computed: {}
};
</script>

<style lang="scss">
#assetItems {
    .van-cell:not(:last-child)::after {
        border: none !important;
    }
}

.assetItems {
    .van-icon-arrow:before {
        color: #e3e3e3;
    }
}
</style><style lang="scss" scoped>
.assetItems {
    // border-bottom: 1PX solid rgba(227, 227, 227, .4);
    padding-bottom: 10px;

    .lists {
        padding: 0 15px;

        .flex-between {
            display: flex;
            justify-content: space-between;
        }

        .rows {
            margin-top: 10px;

            &:first-child {
                margin-top: 0;
            }
        }
    }
}
</style>
