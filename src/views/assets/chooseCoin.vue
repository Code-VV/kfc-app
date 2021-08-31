<template>
<div class="chooseCoin">
    <header class="flex headers" :style="{ paddingTop: safeTop+'px'}">
        <!-- 搜索框 -->
        <van-cell-group class="searchBox">
            <van-field left-icon="search" :placeholder="$t('chooseCoin.ssbz')" clearable v-model="searchText" />
        </van-cell-group>
        <span class="span c444" @click="back">{{$t('chooseCoin.qx')}}</span>
    </header>
    <div class="lists" v-if="tokenCurlist.length>0">
        <div v-if="type=='OTC'">
            <div v-for="(item,i) in tokenCurlist" :key="i">
                <van-cell :title="item.currency" @click="chooseCurrency(item.currency)" />
            </div>
        </div>
        <div v-else-if="typeCurr==='transfer'">
            <div>
                <van-cell title="USDT" @click="chooseCurrency('USDT')" />
            </div>
            <div v-for="(item,i) in tokenCurlist" :key="i">
                <van-cell :title="item.tokenCur" @click="chooseCurrency(item.tokenCur)" />
            </div>
        </div>
        <div v-else>
            <div>
                <van-cell title="USDT" @click="chooseCurrency('USDT')" />
            </div>
            <div v-for="(item,i) in tokenCurlist" :key="i">
                <!-- 暂停充币 -->
                <van-cell class="c999" :title="item.tokenCur" :value="$t('chooseCoin.ztct')" />
                <!-- <van-cell v-else :title="item.tokenCur" @click="chooseCurrency(item.tokenCur)" /> -->
            </div>
        </div>
    </div>
    <nodata class="mar_t_20" v-else :title="$t('chooseCoin.zwbz')"></nodata>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";

export default {
    computed: {
        safeTop() {
            return this.$store.state.safeAreaTop;
        },
        userId() {
            return this.$store.state.userId;
        }
    },
    watch: {
        searchText(val) {
            if (val == "") {
                //恢复原来的数据
                this.tokenCurlist = this.copyTokenCurlist;
            } else {
                val = val.toUpperCase();
                let copylist = this.copyTokenCurlist;
                // console.log(this.copyTokenCurlist);
                let arr = [];
                copylist.forEach(ele => {
                    if (ele.tokenCur.indexOf(val) != -1) {
                        arr.push(ele);
                    } else if (ele.currency && ele.currency.indexOf(val) != -1) {
                        arr.push(ele);
                    }
                });
                this.tokenCurlist = arr;
            }
        }
    },
    created() {
        this.typeCurr = this.$route.query.type || "";
        this.init();
        this.type = this.$route.params.type || "";
        if (this.type == 'OTC') {
            this.getTabList();
        } else {
            this.getBalances();
        }
    },
    destroyed() {
        this.searchText = "";
    },
    data() {
        return {
            searchText: "", //搜索内容
            tokenCurlist: [], //主币列表
            copyTokenCurlist: [],
            type: "",
            typeCurr: ""
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
            "setnavBarShowRight",
            "setCurrency"
        ]),
        init() {
            this.setnavTitle("详细信息");
            this.setbackRouter("");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        },
        //返回上一页
        back() {
            this.$router.go(-1);
        },
        //查询资产列表
        getBalances() {
            let data = {
                member: this.userId,
                balanceType: "BALANCE_BB"
            };
            this.$get("data/data/getIndexCoin?getCoinType=UPDOWN", data).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    res.result = res.result.sort((a, b) => b.isDw.length - a.isDw.length);
                    this.copyTokenCurlist = res.result || [];
                    this.tokenCurlist = res.result || [];
                }
            });
        },
        getTabList() {
            this.$util.showLoading();
            this.$post("otc/order/currencyList", {}).then(res => {
                this.Toast.clear();
                if (res && res.status == "SUCCEED") {
                    this.copyTokenCurlist = res.result || [];
                    this.tokenCurlist = res.result || [];
                }
            });
        },
        //选择币种
        chooseCurrency(val) {
            // XRP   DASH   EOS

            this.setCurrency(val);
            setTimeout(res => {
                this.back();
            }, 300);
        }
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.chooseCoin {
    .van-cell:not(:last-child)::after {
        border: none;
    }

    .van-field__control {
        &::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #888;
            font-size: 12px;
        }
    }

    .van-index-bar__sidebar {
        display: none;
    }

    .van-index-anchor {
        background: #f8f7fd;
    }

    .searchBox {
        .van-cell {
            // background: #f8f7fd!important;
            @include base-background-serch();
        }
    }

    .van-hairline--top-bottom::after {
        border: none;
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.chooseCoin {
    height: 100%;
    display: flex;
    flex-direction: column;
    @include base-background();

    .headers {
        padding-right: 15px;
        align-items: center;
        // background: #f8f7fd;
        // @include base-background();
        @include base-background-serch();

        .span {
            font-size: 12px;

            margin-left: 15px;
        }
    }

    .searchBox {
        flex: 1;
    }

    .lists {
        flex: 1;
        overflow-y: auto;
    }
}
</style>
