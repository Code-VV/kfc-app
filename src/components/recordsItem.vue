<template>
<div>
    <div class="recordsItem" @click="goDetail" :class="{'bor_b':(l-1-n)>0}" v-if="type=='transfer'||type=='coinCharging'">
        <div class="top">
            <div class="leftBox">
                <h5 class="title" style="max-width:100%" v-if="type=='transfer'">
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
                </h5>
                <h5 class="title" style="max-width:100%" v-else>
                    <span class="eils c666">{{list.coin}}</span>
                </h5>
            </div>
            <div v-if="list.currency">
                <span class="rightText c666" v-if="list.currency.indexOf('USDT')>=0">{{list.fee|SubString(4)}} USDT</span>
                <span class="rightText c666" v-else>{{list.fee|SubString(4)}} {{list.currency}}</span>
            </div>
            <div v-else>
                <span class="rightText c666" v-if="list.coin.indexOf('USDT')>=0">{{list.amount|SubString(4)}} USDT</span>
                <span class="rightText c666" v-else>{{list.amount|SubString(4)}} {{list.coin}}</span>
            </div>
        </div>
        <p class="time c999" v-if="type=='transfer'">{{list.createTime|yndhms}}</p>
        <p class="time c999" v-else>{{list.createTime|yndhms}}</p>
    </div>
    <div class="recordsItem" @click="goDetail" :class="{'bor_b':(l-1-n)>0}" v-else>
        <div class="top">
            <div class="leftBox">
                <h5 class="title">
                    <span class="eils c333">{{list.type}}</span>
                </h5>
                <div class="statusBtn">
                    <span class="span err" v-if="list.state=='REJECT'">{{$t('hzjr.sb')}}</span>
                    <span class="span sucess" v-if="list.state=='PASS'">{{$t('hzjr.cg')}}</span>
                    <span class="span conduct c777" v-if="list.state=='CREATE'">{{$t('hzjr.jxz')}}</span>
                </div>
            </div>
            <span class="rightText c333" v-if="list.currency.indexOf('USDT')>=0">{{list.balance|SubString(4)}} USDT</span>
            <span class="rightText c333" v-else>{{list.balance|SubString(4)}} {{list.currency}}</span>
        </div>
        <p class="time c999">{{list.extractTime}}</p>
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
        n: {
            type: Number
        },
        l: {
            type: Number
        },
        type: {
            type: String
        }
    },
    data() {
        return {};
    },
    methods: {
        //资金记录详情
        goDetail() {
            // var data=JSON.stringify(this.list)
            var data = {
                data: this.list,
                type: this.type
            };
            this.$GLOBAL.setRecordsDetail(data);
            this.$router.push({
                // path: `/assets/capitalRecordsDetail?type=${this.type}&data=${data}`,
                name: "capitalRecordsDetail"
                // params: {
                //   type: this.type,
                //   data: data
                // }
            });
        }
    },
    mounted() {},
    computed: {}
};
</script>

<style lang="scss">
</style><style lang="scss" scoped>
.recordsItem {
    // border-bottom: 1px solid rgba(227, 227, 227, 0.4);
    padding: 12px 0;

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .leftBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 55%;

            .title {
                font-size: 15px;
                max-width: 75%;
                padding-right: 15px;
                display: flex;
                align-items: center;

                span {
                    flex: 1;
                }
            }

            .statusBtn {
                display: flex;
                align-items: center;

                .span {
                    min-width: 46px;
                    box-sizing: border-box;
                    padding: 0 5px;
                    text-align: center;
                    font-size: 11px;
                    border: 1px solid
                        /*no*/
                    ;
                    border-radius: 2px;

                    &.err {
                        border-color: #f35758;
                        color: #f35758;
                    }

                    &.sucess {
                        border-color: #10b887;
                        color: #10b887;
                    }

                    &.conduct {
                        border-color: #777777;
                    }
                }
            }
        }

        .rightText {
            font-size: 15px;
        }
    }

    .time {
        margin-top: 10px;
        font-size: 14px;
    }
}
</style>
