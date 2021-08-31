<template>
<div class="quotes container_common1 flex_column">

    <!-- Allen 测试环境 放开此处 -->

    <div class="tabList " v-if='!this.$no_bb'>
        <span class="items bold" v-for="(item,i) in tabList" :key="i" :class="{'cur':curType==item.type}" @click="switchTab(item.type)">{{item.name}}</span>
    </div>

    <!-- Allen 测试环境 放开此处 -->
    <div class="subContent bor_b" v-if="subTabList.length>0">
        <div class="subTabList">
            <span class="items bold size14" v-for="(item,i) in subTabList" :key="i" :class="{'cur':curSubType==item.type}" @click="switchSubTab(item.type)">
                {{item.name}}
                <i class="borders"></i>
            </span>
        </div>
    </div>
    <van-row gutter="20" class="sortList">
        <van-col v-for="(item,i) in sortList" :key="i" :span="i==0?10:i==1?8:6">
            <div @click="switchSortType(item.type)" :class="sortType==item.type?isSort?'cur upper':'cur lower':''" class="items" :style="{'justify-content':i==sortList.length-1?'flex-end':'flex-star'}">
                <span class="bold size12"> {{item.name}}</span>
                <span class="icons"></span>
            </div>
        </van-col>
    </van-row>
    <mescroll-vue ref="mescroll" :down="mescrollDown" @init="mescrollInit" class="container_common marketList flex1">
        <div v-for="(item,i) in pairsList" :key="i">
            <ListItems :n="i" :l="pairsList.length" :type="curType" :list="item"></ListItems>
        </div>
    </mescroll-vue>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import ListItems from "../../components/listItem1";
let set = null; //定时器
export default {
    name: "quotes",
    components: {
        ListItems
    },
    data() {
        return {
            subTabList: [], ////交易对主币tab
            curType: "bibi", //当前tab所在项
            curSubType: 0, //当前二级分类所在项
            sortType: 0, //筛选分类所在项
            isSort: false, //true升序,false降序
            pairsList: [], //交易对列表
            mescroll: null, // mescroll实例对象
            mescrollDown: {
                offset: 40,
                callback: this.downCallback,
                textInOffset:this.$t('add.xlsx'),
                textOutOffset:this.$t('add.sfgx'),
                textLoading:this.$t('add.jzz'),
                auto: false //是否在初始化完毕之后自动执行下拉回调callback; 默认true
            } //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        };
    },
    activated() {
        this.init();
        this.getMainCurs();
    },
    computed: {
        tabList() {
            return [{
                    name: this.$t('quotes.bb'),
                    type: "bibi"
                },
                {
                    name: this.$t('quotes.hy'),
                    type: "contract"
                }
            ];
        },
        sortList() {
            return [{
                    name: this.i18n.mc,
                    type: "0"
                },
                {
                    name: this.i18n.zxj,
                    type: "2"
                },
                {
                    name: this.i18n.zdf,
                    type: "1"
                }
            ];
        },

        i18n() {
            return this.$t("quotes");
        }
    },

    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setCurrency"
        ]),
        init() {
            this.setnavTitle(this.i18n.hq);
            this.setbackRouter("quotes");
            this.setnavBarState(true);
            this.settabBarState(true);
            this.setnavBarArrow(false);
            this.setCurrency("");
        }, // 初始化页面
        //tab切换
        switchTab(type) {
            if (type == this.curType) {
                return;
            }
            this.curType = type;
            this.getMainCurs();
        },
        //二级分类tab切换
        switchSubTab(type) {
            if (type == this.curSubType) {
                return;
            }
            this.curSubType = type;
            // this.getPairsByMainCur();
        },
        //筛选分类
        switchSortType(type) {
            console.log(type);
            if (type == this.sortType) {
                this.isSort = !this.isSort;
            } else {
                this.sortType = type;
                this.isSort = false;
            }

            if (set) {
                clearTimeout(set);
            }
            this.getPairsByMainCur();
        },
        //获取交易对主币列表
        getMainCurs() {
            let subTabList = [];
            this.$get("data/data/getMainCurs", {}).then(res => {
                if (res && res.status == "SUCCEED") {
                    if (res.result) {
                        res.result.forEach((item, i) => {
                            if (item) {
                                subTabList.push({
                                    name: item,
                                    type: i
                                });
                            }
                        });
                        this.subTabList = subTabList || [];
                        if (set) {
                            clearTimeout(set);
                        }
                        this.getPairsByMainCur();
                    }
                }
            });
        },
        //获取交易对列表
        getPairsByMainCur() {
            let getCoinSort =
                this.sortType == 0 ?
                this.isSort ?
                "NAME_UP" :
                "NAME_DOWN" :
                this.sortType == 1 ?
                this.isSort ?
                "UP" :
                "DOWN" :
                this.isSort ?
                "PRICE_UP" :
                "PRICE_DOWN";
            this.$get("data/data/getCoinQuotation", {
                // mainCur: this.subTabList[this.curSubType].name,
                getCoinSort: getCoinSort,
                coinType: this.curType == "contract" ? "CONTRACT" : "SPOT"
            }).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.pairsList = res.result || [];
                }
                set = setTimeout(res => {
                    this.getPairsByMainCur();
                }, 5000);
            });
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
        },
        //下拉刷新
        downCallback() {
            if (set) {
                clearTimeout(set);
            }
            this.getPairsByMainCur();
            setTimeout(res => {
                this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
            }, 1000);
        }
    },
    deactivated() {
        if (set) {
            clearTimeout(set);
        }
    }
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.quotes {
    @include base-background();

    .tabList {
        display: flex;
        color: #444444;
        font-size: 15px;
        border: 1px solid rgba(227, 227, 227, 0.2);
        justify-content: center;
        width: 100%;
        margin: 0 auto;

        .items {
            width: 50%;
            padding: 5px 0;
            text-align: center;
            border-right: 1px solid rgba(227, 227, 227, 0.2);
        }

        .cur {
            // background: #fbc400;

            color: #fbc400;
            font-weight: 500;
            border: 1px solid #fbc400;
        }

        .items:last-child {
            // border: none;
        }
    }

    .subContent {
        overflow-y: hidden;
        height: 48px;
        margin: 0 -15px;
        padding: 0 15px;
        // border-bottom: 1px solid rgba(227, 227, 227, 0.4);
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
            margin-right: 35px;
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

    .sortList {
        display: flex;
        justify-content: space-between;
        font-size: 11px;
        color: #999999;
        padding: 15px 0;

        .items {
            display: flex;
            align-items: center;

            .icons {
                display: flex;
                flex-direction: column;
                margin-left: 12px;
            }

            .icons::before {
                content: "";
                width: 0;
                height: 0;
                border-bottom: 5px solid #999;
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
            }

            .icons::after {
                content: "";
                width: 0;
                height: 0;
                border-top: 5px solid #999;
                border-right: 4px solid transparent;
                border-left: 4px solid transparent;
                margin-top: 2px;
            }
        }

        .cur {
            color: #fbc400;

            &.upper {
                .icons::before {
                    border-bottom-color: #fbc400;
                }
            }

            &.lower {
                .icons::after {
                    border-top-color: #fbc400;
                }
            }
        }
    }

    .marketList {
        margin: 0 -15px;
        padding: 0 15px;
        flex: 1;
        overflow-y: auto;
    }

    .areaBox {
        margin: 0 -15px;
        padding: 15px 0;
        font-size: 12px;

        span {
            width: 68px;
            height: 22px;
            background: rgba(243, 243, 243, 1);
            border-top-right-radius: 11px;
            border-bottom-right-radius: 11px;
            display: inline-block;
            line-height: 22px;
            color: #fbc400;
            padding-left: 15px;
        }
    }
}
</style>
