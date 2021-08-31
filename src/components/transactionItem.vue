<template>
<div class="contractItem">
    <div class="titleBox flex-between bor_b">
        <div class="leftBox" :class="list.entrustType=='BUY'?'green':'red'">
            <span class="size16">{{list.pairsName}}</span>
            <span class="mar_l_10 size10 pad_l_r_5 payStauts">{{list.entrustType=='BUY'?'买入':'卖出'}}</span>
        </div>
        <span class="status font1" v-if="type=='history'&&list.state=='CLOSE'">已撤销</span>
    </div>
    <div class="listContent ">
        <div class="lists c666">
            <!-- 当前委托 -->
            <div class="tableBox" v-if="type=='history'">
                <div class="items">
                    <span>委托价(USDT)</span>
                    <span class="markers c222 font1" v-if="list.priceType=='MARKET_PRICE'">市价</span>
                    <span class="markers c222 font1" v-else>{{list.price|toNumber}}</span>
                </div>
                <div class="items">
                    <span v-if="list.priceType=='MARKET_PRICE'&&list.entrustType=='BUY'">交易额({{list.mainCur}})</span>
                    <span v-else>委托量({{list.tokenCur}})</span>
                    <span class="markers c222 font1" v-if="list.priceType=='MARKET_PRICE'&&list.entrustType=='BUY'">{{list.matchFee|toNumber(8)}}</span>
                    <span class="markers c222 font1" v-else>{{list.count|toNumber(8)}}</span>
                </div>
                <div class="items">
                    <span>成交均价({{list.mainCur}})</span>
                    <span class="markers c222 font1">{{list.matchPrice|toNumber}}</span>
                </div>
                <div class="items">
                    <span>成交量({{list.tokenCur}})</span>
                    <span class="markers c222 font1">{{list.matchCount|toNumber(8)}}</span>
                </div>
                <div class="items">
                    <span>成交总额(USDT)</span>
                    <span class="markers c222 font1">{{(list.matchFee-list.tradeFee)|toNumber(8)}}</span>
                </div>
                <!-- <div class="items">
            <span>手续费</span>
            <span class="markers c222">{{list.tradeFee|SubString(4)}}</span>
          </div> -->
                <div class="items">
                    <span>时间</span>
                    <span class="markers c222 font1">{{list.createTime|yndhms('M')}}</span>
                </div>
            </div>
            <div class="tableBox" v-else>
                <div class="items">
                    <span>价格({{list.mainCur}})</span>
                    <span class="markers c222 font1">{{list.price|toNumber}}</span>
                </div>
                <div class="items">
                    <span>数量({{list.tokenCur}})</span>
                    <span class="markers c222 font1">{{list.count|toNumber(8)}}</span>
                </div>
                <div class="items">
                    <span>实际成交({{list.tokenCur}})</span>
                    <span class="markers c222 font1">{{list.matchCount|toNumber(8)}}</span>
                </div>
                <!-- <div class="items">
            <span>手续费</span>
            <span class="markers c222">{{list.tradeFee|SubString(4)}}</span>
          </div> -->
                <div class="items">
                    <span>时间</span>
                    <span class="markers c222">{{list.createTime|yndhms('M')}}</span>
                </div>
            </div>
        </div>
    </div>
    <div class="tabBox flex flex_end bor_t" v-if="type!='history'">
        <span class="btns" @click="cancelorder(list.id)">撤单</span>
    </div>
    <div class="darkLine"></div>
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
            type: String, //entrust委托,history历史
            default: ""
        },
        subType: {
            type: String, //'contractType'全部类型，entrust委托，revoke撤销
            default: ""
        },
        n: {
            type: Number,
            default: -1
        }
    },
    data() {
        return {};
    },
    methods: {
        //撤单
        cancelorder(id) {
            if (!this.$util.isLogin()) {
                return;
            }
            this.Dialog.confirm({
                    title: "提醒",
                    message: "是否确认撤销订单"
                })
                .then(() => {
                    this.$util.showLoading();
                    this.$post1("entrust/entrust/closeEntrust", {
                            entrust: id
                        })
                        .then(res => {
                            this.Toast.clear();
                            if (res && res.status == "SUCCEED") {
                                if (res.result == true) {
                                    this.Toast("撤销订单成功");
                                    this.$emit("cancelorder", id);
                                }
                            } else {
                                this.Toast(res.errorMessage);
                            }
                        })
                        .catch(err => {
                            this.Toast.clear();
                        });
                })
                .catch(() => {});
        }
    },
    mounted() {},
    computed: {}
};
</script>

<style lang="scss">
.contractItem {
    .van-cell {
        padding-left: 0;
        padding-right: 0;
        font-size: 11px;
    }

    .van-cell__title {
        color: #666666;
    }

    .van-cell__value {
        color: #222222;
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.contractItem {
    .titleBox {
        align-items: center;
        // border-bottom: 1px solid rgba(227, 227, 227, 0.2);
        font-size: 13px;
        color: #666;
        padding: 15px 0;

        .leftBox {
            display: flex;
            align-items: center;

            .payStauts {
                border-radius: 2px;
                border: 1px solid;
            }

            &.green {
                color: $green;

                .payStauts {
                    border-color: rgba(8, 200, 99, 1)
                        /*no*/
                    ;
                }
            }

            &.red {
                color: $red;

                .payStauts {
                    border-color: #E8054C
                        /*no*/
                    ;
                }
            }
        }
    }

    .listContent {
        padding: 12px 0;

        // border-bottom: 1px solid rgba(227, 227, 227, 0.2);
        .lists {
            font-size: 11px;
            // color: #666666;
            position: relative;

            .columLines {
                position: absolute;
                width: 1px;
                top: 23px;
                bottom: 5px;
                left: 50%;
                background: rgba(227, 227, 227, 0.2);
            }

            .markers {
                // color: #222222;
            }
        }

        .tableBox {
            display: flex;
            flex-wrap: wrap;

            .items {
                margin-top: 11px;
                display: flex;
                width: 50%;
                justify-content: space-between;

                &:nth-child(odd) {
                    padding-right: 15px;
                }

                &:nth-child(even) {
                    padding-left: 15px;
                }
            }

            // .leftBoxs {
            //   width: 50%;
            //   border-right: 1PX solid rgba(227, 227, 227, .4);
            //   &:last-child {
            //     border: 0;
            //   }

            // }
        }
    }

    .tabBox {
        padding: 10px 0;
        font-size: 13px;
        width: 100%;

        .items {
            display: flex;

            .imgs {
                width: 21px;
                height: 21px;
                margin-right: 5px;
            }
        }

        .btns {
            color: $blue;
            display: block;
            min-width: 60px;
            text-align: center;
            padding: 2px 4px;
            border-radius: 3px;
            border: 1px solid $blue
                /*no*/
            ;
        }
    }
}
</style>
