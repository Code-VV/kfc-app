<template>
<div class="assets container_common1 flex flex_column">
    <div class="topBox">
        <div class="leftIcon">
            <van-icon name="arrow-left" @click="back" />
        </div>
        <div class="leftBoxs">
            <div class="size12 opacity9 flex-between">
                <span class="span">{{$t('assetsi.zzhzczh')}}</span>
                <div class="iconBox">
                    <img src="../../assets/images/home/eye2.png" alt srcset class="icons" v-show="isShowAsset" @click="closeAsset" />
                    <img src="../../assets/images/home/eye2_1.png" alt srcset class="icons" v-show="!isShowAsset" @click="closeAsset" />
                </div>
            </div>
            <div class="bottoms">
                <div>
                    <div class="marks" v-show="isShowAsset">{{assetList.usdtPrice|SubString(8)}} USDT</div>
                    <div class="marks" v-show="!isShowAsset">******** USDT</div>
                    <div class="size13 mar_t_5" v-show="isShowAsset">≈{{assetList.cnyPrice|SubString(2)}} CNY</div>
                    <div class="size13 mar_t_5" v-show="!isShowAsset">≈******** CNY</div>
                </div>
            </div>
        </div>
    </div>
    <div class="operationTabBox">
        <div class="operationTop">
            <p class="c666 size12">{{$t('assetsi.cztxzh')}}</p>
            <div class="c666 size11 mar_t_5">
                <span class="c222 size15 font1">{{3456.78388888|SubString(8)}}</span>
                ≈{{7845.78|SubString(2)}}CNY
            </div>
        </div>
        <div class="operationTab c333 mar_t_10">
            <div class="items" @click="coinCharging">
                <img src="../../assets/images/home/coinCharging.png" alt class="imgs" />
                <p>{{$t('assets.cb')}}</p>
            </div>
            <div class="items" @click="goWithdrawCoin">
                <img src="../../assets/images/home/withdrawCoin.png" alt class="imgs" />
                <p>{{$t('assets.tb')}}</p>
            </div>
            <div class="items" @click="goTransfer">
                <img src="../../assets/images/home/transfer.png" alt class="imgs" />
                <p>{{$t('assets.hz')}}</p>
            </div>
        </div>
    </div>

    <div class="accountDetail flex1">
        <div class="lists">
            <div class="items " v-for="(item,i) in lists" :key="i" :class="i<lists.length-1?'bor_b':''">
                <div class="size14 c666 flex flex-between">
                    {{item.names}}
                    <span class="blue_text" @click="goTransfer">{{$t('assets.hz')}}</span>
                </div>
                <div class="mar_t_10">
                    <span class="c222 size15 font1">{{item.num|SubString(8)}}</span>
                    ≈{{item.cnyNum|SubString(2)}}CNY
                </div>
            </div>
        </div>
    </div>
    <!-- <nodata class="mar_t_20" v-else></nodata> -->
</div>
</template>

<script>
import $ from "jquery";
import {
    mapActions
} from "vuex";
import assetItem from "../../components/assetItem";
export default {
    components: {
        assetItem
    },
    mounted() {
        this.init();
        this.initBalanceList(); //资产列表

        if (this.$store.state.nowThemeInfo == "night-theme") {
            $(".assets")
                .find(".operationTabBox")
                .css("background-color", this.$bg_night_second);
        } else {
            $(".assets")
                .find(".operationTabBox")
                .css("background-color", "#fff");
        }
    },
    computed: {
        userId() {
            return this.$store.state.userId;
        }
    },
    // mounted() {

    // },
    data() {
        return {
            active: "",
            isShowAsset: true, //显示资产
            assetList: [], //资产列表
            set: null,
            lists: [{
                    names: "币提币账户",
                    num: '3456.78388888',
                    cnyNum: '7845.78'
                },
                {
                    names: "币币账户",
                    num: '3456.78388888',
                    cnyNum: '7845.78'
                },
                {
                    names: "USDT合约账户",
                    num: '3456.78388888',
                    cnyNum: '7845.78'
                },
                {
                    names: "OTC账户（USDT）",
                    num: '3456.78388888',
                    cnyNum: '7845.78'
                }
            ]
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
            "setCurrency",
            "setStatusBar"
        ]),
        init() {
            this.setnavTitle("");
            this.setbackRouter("");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(true);
            this.setnavBarBgColor("#4A80E6");
            this.setCurrency("");
            this.setStatusBar("light");
        }, // 初始化页面
        back() {
            this.$router.go(-1);
        },
        //充币
        coinCharging() {
            this.$router.push({
                path: `/assets/coinCharging`
                //  path: `/assets/withdrawCoin`
            });
        },
        //提币
        goWithdrawCoin() {
            this.$router.push({
                path: `/assets/withdrawCoin`
            });
        },
        //划转
        goTransfer() {
            this.$router.push({
                path: `/assets/transfer`
            });
        },
        initBalanceList() {
            this.$get("member/balance/getBalanceList", {
                member: this.userId
            }).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.assetList = res.result || [];
                }
                this.set = setTimeout(res => {
                    // console.log("定时器");
                    this.initBalanceList();
                }, 5000);
            });
        },
        // 资产显示隐藏事件
        closeAsset() {
            this.isShowAsset = !this.isShowAsset;
        }
    },

    destroyed() {
        this.setnavBarBgColor("");;
        // this.setStatusBar("dark");
        clearTimeout(this.set);
    }
};
</script>

<style lang="scss">
.assets {
    .van-tabs__line {
        background-color: #fbc400;
        height: 2px;
    }

    .van-tab--active {
        color: #fbc400;
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.assets {
    @include base-background();

    .topBox {
        color: #fff;
        padding: 70px 15px 50px;
        margin: 0 -15px;
        background: url("../../assets/images/home/assetBg.png") no-repeat;
        background-size: cover;
        display: flex;
        position: relative;

        .leftIcon {
            padding-left: 15px;
            height: 46px;
            display: flex;
            align-items: center;
            width: 35px;
            position: absolute;
            top: 20px;
            left: 0;
        }

        .van-icon {
            font-size: 20px;
        }

        .van-icon-arrow-left:before {
            color: #fff !important;
        }

        .leftBoxs {
            flex: 1;

            .flex-between {
                align-items: center;
            }

            .bottoms {
                .marks {
                    font-size: 23px;
                    font-weight: 500;
                }
            }
        }

        .iconBox {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;

            .icons {
                width: 17px;
                height: 17px;
            }
        }
    }

    .operationTabBox {
        border-radius: 5px;
        padding: 20px 0;
        margin-top: -35px;
        box-shadow: 0px 3px 11px 1px rgba(121, 121, 121, 0.09);
        position: relative;
        z-index: 1;

        .operationTop {
            padding: 0 24px;
        }
    }

    .operationTab {
        // @include base-background-second();

        display: flex;

        font-size: 14px;

        .items {
            flex: 1;
            display: flex;
            border-right: 1px solid rgba(227, 227, 227, 0.4);
            align-items: center;
            margin-left: 24px;

            &:last-child {
                border-right: 0;
            }

            .imgs {
                width: 31px;
                height: 31px;
                margin-right: 10px;
            }
        }
    }

    .accountDetail {
        margin: 0 -15px;
        overflow-y: auto;

        .items {
            padding: 15px;
        }
    }
}
</style>
