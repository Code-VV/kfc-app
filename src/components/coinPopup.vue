<template>
<div class="coinPopup">
    <!-- <div class="titlesBox flex" @click="openPoup">
      <img src="../assets/images/home/mores.png" alt srcset class="mores" />
      <span class="span">PAX/HUSD</span>
    </div>-->
    <div id="screen"></div>
    <van-popup position="left" :style="{ width:'81%'}" v-model="show" @closed="closed" get-container="#screen">
        <div class="titles c000" :class="{'pad_b_21':type=='contract'}">{{type=='contract'?$y('quotes.hy'):$t('quotes.bb')}}</div>
        <div class="subContent" v-if="true">
            <div class="subTabList">
                <span class="items" v-for="(item,i) in subTabList" :key="i" :class="{'cur':curSubType==item.type}" @click="switchSubTab(item.type)">
                    {{item.name}}
                    <i class="borders"></i>
                </span>
            </div>
        </div>
        <!-- 搜索框 -->
        <!-- <van-cell-group>
        <van-field left-icon="search" placeholder="搜索币种" clearable v-model="searchText" />
      </van-cell-group>-->

        <div class="marketList">
            <div class="listItems bor_b" v-for="(item,i) in pairsList" :key="i" @click="switchCoinName(item.pairsName)" :class="{'border_none':i==pairsList.length-1}">
                <div class="titleBox c222">
                    {{item.tokenCur}}
                    <span class="marks c999">/ {{item.mainCur}}</span>
                    <span v-show="type=='contract'" class="size12 c999"> 永续</span>
                </div>
                <div class="right_box">
                    <!-- <span :class="item.updown>0?'green_text':'orange_text'">{{item.price|SubString(2)}}</span> -->
                    <span :class="item.updown>0?'green_text':'orange_text'">{{item.price|SubString3(2,4)}}</span>
                </div>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    props: {
        type: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            currentMainCoin: "",
            isShowPopup: true,
            show: true,
            subTabList: [
                // {
                //   name: "USDT",
                //   type: 1
                // },
                // {
                //   name: "HUSD",
                //   type: 2
                // },
                // {
                //   name: "BTC",
                //   type: 3
                // },
                // {
                //   name: "ETH",
                //   type: 4
                // },
                // {
                //   name: "HT",
                //   type: 5
                // },
                // {
                //   name: "ALTS",
                //   type: 6
                // }
            ], //二级分类tab
            curSubType: 1, //当前二级分类所在项
            searchText: "", //搜索关键字
            pairsList: [],
            copylist: []
        };
    },
    watch: {
        searchText(val) {
            if (val == "") {
                //恢复原来的数据
                this.pairsList = this.copylist;
            } else {
                // console.log(val);
                val = val.toUpperCase();
                let copylist = this.copylist;
                let arr = [];
                copylist.forEach(ele => {
                    if (ele.tokenCur.indexOf(val) != -1) {
                        arr.push(ele);
                    }
                });
                this.pairsList = arr;
            }
        }
    },
    mounted() {
        this.getMainCurs();
    },
    methods: {
        ...mapActions(["setPairsName", "setPairsName1"]),
        // 切换交易对
        switchCoinName(pairsName) {
            // 切换前先关闭sorket
            // this.$emit("closeSorcet",1);
            this.closed();
            if (this.type == "contract") {
                this.setPairsName(pairsName);
            } else {
                this.setPairsName1(pairsName);
            }
        },
        //弹框关闭
        closed() {
            this.$emit("closePopup");
        },
        //二级分类tab切换
        switchSubTab(type) {
            if (type == this.curSubType) {
                return;
            }
            this.curSubType = type;
        },
        //打开侧边栏
        openPoup() {
            this.isShowPopup = true;
        },
        //获取交易对主币列表
        getMainCurs() {
            let subTabList = [];
            this.$get("data/data/getMainCurs", {}).then(res => {
                if (res && res.status == "SUCCEED") {
                    if (res.result) {
                        res.result.forEach((item, i) => {
                            subTabList.push({
                                name: item,
                                type: i
                            });
                        });
                        this.subTabList = subTabList || [];
                        this.curSubType = this.subTabList[0].type;
                        this.currentMainCoin = this.subTabList[0].name;

                        this.getPairsByMainCur(
                            this.type == "contract" ? "CONTRACT" : "SPOT"
                        ); //合约交易对  CONTRACT ,  币币 SPOT
                    }
                }
            });
        },
        //获取交易对列表
        getPairsByMainCur(type) {
            this.$get("data/data/getPairsByMainCur", {
                mainCur: this.currentMainCoin,
                type
            }).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.pairsList = res.result || [];
                    this.copylist = res.result || [];
                }
            });
        }
    },
    computed: {}
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.coinPopup {
    .van-overlay {
        background-color: rgba(0, 0, 0, 0.5);
    }

    .van-popup {
        @include base-background();
        padding: 40px 15px 20px;
        height: 100%;
        display: flex;
        flex-direction: column;
    }

    .van-cell-group {
        margin: 0 -15px;
    }

    .van-cell {
        background: #f8f7fd;
    }
}
</style><style lang="scss" scoped>
.coinPopup {
    .titlesBox {
        // padding: 0 30px;
        align-items: center;
        justify-content: center;
        // width: 100%;
        font-size: 18px;
        color: #333333;
        font-weight: 600;

        .mores {
            width: 18px;
            height: 18px;
            margin-right: 8px;
        }
    }

    .marketList {
        flex: 1;
        overflow-y: auto;
    }

    &::-webkit-scrollbar {
        display: none;
    }
}

.titles {
    font-size: 18px;
    font-weight: 600;
}

.subContent {
    overflow-y: hidden;
    height: 48px;
}

.subTabList {
    display: flex;
    font-size: 14px;
    color: #666666;
    white-space: nowrap;
    overflow-x: auto;

    .items {
        padding: 15px 0;
        position: relative;
        flex-shrink: 0;
        margin-right: 25px;
        height: 52px;

        .borders {
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translate(-50%);
            width: 37px;
            height: 2px;
            background: transparent;
            border-radius: 2px;
        }
    }

    .cur {
        color: #fbc400;

        .borders {
            background: #fbc400;
        }
    }
}

.listItems {
    display: flex;
    align-items: center;
    padding: 15px 0;
    // border-bottom: 1PX solid rgba(227, 227, 227, .4);
    justify-content: space-between;
    font-size: 15px;

    .titleBox {
        font-weight: 500;

        .marks {
            font-size: 11px;
        }
    }
}

// .listItems:last-child {
//   border: none;
// }
</style>
