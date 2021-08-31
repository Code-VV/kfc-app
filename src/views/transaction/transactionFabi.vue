<template>
<div class="payBox container_common1 flex_column">
    <header class="headers flex header_custom hei46 align_center relative" :style="{ paddingTop: safeTop+'px'}">
        <div class="left_icon absolute" :class="isNight=='night-theme'?'whiteIcons':'darkIcons'">
            <van-icon name="arrow-left" @click="back()" />
        </div>
        <div class="titleContent font1">
            <div class="items c222" @click="switchTab(1)" :class="{'cur':curType==1}">
                <span>{{$t("fb.gm")}}</span>
                <i class="borders"></i>
            </div>
            <div class="items c222" @click="switchTab(2)" :class="{'cur':curType==2}">
                <span>{{$t("fb.chus")}}</span>
                <i class="borders"></i>
            </div>
            <div class="items c222" @click="switchTab(3)" :class="{'cur':curType==3}">
                <span>{{$t("fb.cwsh")}}</span>
                <i class="borders"></i>
            </div>
        </div>
        <div class="right_icon absolute pad_r_10" @click="openPoups">
            <img src="../../assets/images/home/mores1.png" alt srcset class="icons wid20 hei18" />
        </div>
        <mores @close="close1" v-if="isShowMore" type="otc" class="absolute right15 top46" :style="{ paddingTop: safeTop+'px'}"></mores>
    </header>
    <div class="subTabList bg_exit_btn bor_b" v-if="curType!=3">
        <span class="size15 bold" v-for="(item,i) in tabList" :key="i" :class="{'blue_text':subTabType==i}" @click="switchSubTab(i)">{{item.currency}}</span>
    </div>
    <!-- <div class="sections flex1"> -->
    <mescroll-vue class="sections flex1" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div v-if="curType==1">
            <div class="operationBox pad_t_b_15 font1">
                <div class="flex-between align_center size12 c999">
                    <p class="size18 c222 font1">{{$t("fb.yjgb")}}</p>
                    <span>{{$t("fb.ckjg")}}</span>
                </div>
                <div class="flex flex_end align_center size12 c999 mar_t_6">
                    <!-- <span class="font1">
              限额:
              ￥500.00~￥50000.00
            </span>-->
                    <span>{{nowPrice|SubString(2)}} CNY/{{tabList[subTabType].currency}}</span>
                </div>
                <div class="inputBox flex align_center c222" id="inputBox">
                    <div class="inputs">
                        <van-field v-model="price" :placeholder="$t('fb.gbje')" type="number" class="flex1 size12" @focus="focusIndex=1" />
                        <span>CNY</span>
                    </div>
                    <div @click="getNumber" class="pad_t_b_10 pad_l_r_10">
                        <img src="../../assets/images/home/transIcon.png" alt srcset class="wid16 hei12" />
                    </div>
                    <div class="inputs">
                        <van-field v-model="number" :placeholder="$t('fb.gmsl')" type="number" class="flex1 size12" @focus="focusIndex=2" />
                        <span>USDT</span>
                    </div>
                </div>
                <div class="bottoms size12 c999 flex-between align_center mar_t_10">
                    <div class="leftBox flex align_center">
                        <!-- <span class="items" @click="switchPayType('ALIAY')" :class="{'cur':payType=='ALIAY'}">支付宝</span> -->
                        <span class="items" @click="switchPayType('BANKCARD')" :class="{'cur':payType=='BANKCARD'}">{{$t('fb.yhk')}}</span>
                        <!-- <span class="items" @click="switchPayType('WECHAT')" :class="{'cur':payType=='WECHAT'}">微信</span> -->
                    </div>
                    <div class="rightBox">
                        <p class="c222 right_text">{{$t('fb.cjdj')}}</p>
                        <span class="mar_t_5 block right_text" v-if="priceOrNum">{{priceOrNum|SubString(4)}}</span>
                        <span class="mar_t_5 block right_text" v-else>{{$t('fb.txhhd')}}</span>
                    </div>
                </div>
                <div class="mar_t_20 submit">
                    <van-button type="info" block @click="quickBuy">
                        <img src="../../assets/images/home/shandian.png" alt srcset class="wid15 hei22 mar_r_5" />{{$t('fb.yjgb')}}
                    </van-button>
                </div>
            </div>
            <div class="darkLine"></div>
            <div class="orderTitle size15 c999 bor_b">{{$t('fb.zxjy')}}</div>
        </div>
        <div v-if="curType==2">
            <div class="assetBox size12 flex-between align_center c999" @click="goTransfer">
                <div class="items">
                    <span>{{$t('fb.ky')}}：</span>
                    <span class="c222 font1">{{fabiBalance.fbBalance|SubString(4)}} {{fabiBalance.currency}}</span>
                </div>
                <div class="items">
                    <span>{{$t('fb.dj')}}：</span>
                    <span class="c222 font1">{{fabiBalance.fbBlockedBalance|SubString(4)}} {{fabiBalance.currency}}</span>
                </div>
            </div>

            <!-- <div class="orderList pad_t_15">
        <div v-for="(item,i) in 5" :key="i">
          <otcItem :list="{}" type="sell" />
        </div>
        </div>-->
        </div>
        <div v-if="curType==3">
            <applyMer />
        </div>
        <div class="orderList flex1" v-if="curType!=3">
            <div v-if="orderList.length>0">
                <div v-for="(item,i) in orderList" :key="i">
                    <otcItem :list="item" :type="curType==1?'buy':'sell'" :noBorder="i+1==orderList.length" :nickName="nickName" :payType="item.payType" />
                </div>
            </div>
            <div v-else>
                <nodata :title="$t('fb.zwsj')" class="pad_t_50"></nodata>
            </div>
        </div>
    </mescroll-vue>
</div>
</template>

<script>
import $ from "jquery";
import {
    mapState,
    mapActions,
    mapMutations
} from "vuex";
import otcItem from "../../components/otcItem";
import mores from "../../components/mores"; //更多弹框
import applyMer from "../../components/applyMer"; //申请商户
export default {
    components: {
        otcItem,
        mores,
        applyMer
    },
    computed: {
        safeTop() {
            return this.$store.state.safeAreaTop;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        },
        resetUserinfo() {
            return this.$store.state.resetUserinfo;
        }
    },
    watch: {
        resetUserinfo(val) {
            if (val) {
                this.getUserInfo();
                this.setResetUserinfo(0);
            }
        },
        price(val) {
            if (this.focusIndex == 1) {
                if (!parseFloat(val)) {
                    this.number = null;
                }
                this.number = (val / this.nowPrice).toFixed(4);
            }
        },
        number(val) {
            if (this.focusIndex == 2) {
                if (!parseFloat(val)) {
                    this.price = null;
                }
                this.price = val * this.nowPrice;
            }
        }
    },
    activated() {
        this.init();
        //商户信息
        this.$store.state.isLogin && this.getUserInfo();
        this.getTabList(); //获取币种列表

        // this.$hub.$on("setNickNames", res => {
        //   this.getUserInfo();
        // });
    },
    data() {
        return {
            curType: 1, //1购买，2出售，3成为商户
            subTabType: 0,
            number: null,
            operateType: 1, //1买2卖
            payType: "ALIAY", //支付方式
            tabList: [{
                currency: "USDT"
            }],
            isShowMore: false, //显示更多弹框

            storeState: "", //商户申请状态
            nickName: "", //用户昵称
            mescrollDown: {
                offset: 46,
                callback: this.downCallback,
                textInOffset:this.$t('add.xlsx'),
                textOutOffset:this.$t('add.sfgx'),
                textLoading:this.$t('add.jzz'),
                auto: false //是否在初始化完毕之后自动执行下拉回调callback; 默认true
            }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
            mescrollUp: {
                callback: this.upCallback,
                auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
                htmlNodata: '<p class="upwarp-nodata"></p>'
            },
            pageNum: 1, //当前页码
            pageSize: 10, //当前页数
            noMores: true, //没有更多数据了
            orderList: [], //订单列表
            isRenZheng: false,
            userInfo: {},
            fabiBalance: {
                fbBalance: 0,
                fbBlockedBalance: 0
            }, //账户
            nowPrice: 0, //当前币种价格
            price: null, //价格
            priceOrNum: 0, //匹配到的订单价格
            focusIndex: 0, //焦点获取到的input,1价格2数量
            // 禁止点击
            disableClick: false
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
            "setStatusBar",
            "setResetUserinfo"
        ]),
        init() {
            this.setnavTitle("");
            this.setbackRouter("");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(true);
            this.setCurrency("");
        }, // 初始化页面
        //获取当前价
        getPrice() {
            this.$post1("otc/order/getPrice", {
                currency: this.tabList[this.subTabType].currency
            }).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.nowPrice = res.result;
                    this.initPrice = res.result;
                }
            });
        },
        //输入
        getNumber() {
            // 暂未匹配到符合的广告
            if (!parseFloat(this.price) && !parseFloat(this.number)) {
                return;
            }
            if (this.price && this.number) {
                return;
            }
            if (this.focusIndex == 0) {
                return;
            }
            if (this.focusIndex == 1) {
                if (!this.price) {
                    return;
                }
                this.orderGetPrice(1);
            } else if (this.focusIndex == 2) {
                if (!this.number) {
                    return;
                }
                this.orderGetPrice(2);
            }
        },

        //一键购买匹配价格
        orderGetPrice(n) {
            var data = {
                userId: this.$store.state.userId,
                type: n == 1 ? "PRICE" : "NUM",
                price: n == 1 ? parseFloat(this.price) : parseFloat(this.number),
                direction: "BUY",
                currency: this.tabList[this.subTabType].currency,
                payType: this.payType
            };

            // this.$util.showLoading();
            this.$post1("otc/order/fastPlaceAnOrderGetPrice", data).then(res => {
                this.Toast.clear();
                if (res && res.status == "SUCCEED" && res.result) {
                    if (n == 1) {
                        this.number = res.result.priceOrNum || 0;
                    } else {
                        this.price = res.result.priceOrNum || 0;
                    }
                    this.priceOrNum = res.result.price;
                    this.focusIndex = 0;
                } else {
                    if (n == 1) {
                        this.number = null;
                    }
                    if (n == 2) {
                        this.price = null;
                    }
                    this.Toast(res.errorMessage);
                }
            });
        },
        //一键购买
        async quickBuy() {
            // 禁止多次点击
            if (this.disableClick) {
                return;
            }
            if (!this.$util.isLogin()) {
                return;
            } else {
                //商户信息
                this.getUserInfo();
            }
            let _this = this;
            if (!this.$util.isRenZhengs(this, this.isRenzheng)) {
                return;
            }
            if (!this.$util.isNickname(this, this.nickName)) {
                return;
            }

            if (!parseFloat(this.price)) {
                // this.Toast("请输入价格");
                if (!parseFloat(this.number)) {
                    this.Toast("请输入价格");
                    return;
                }
                let data = {
                    userId: this.$store.state.userId,
                    type: "NUM",
                    price: parseFloat(this.number),
                    direction: "BUY",
                    currency: this.tabList[this.subTabType].currency,
                    payType: this.payType
                };
                let res1 = await this.$post1(
                    "otc/order/fastPlaceAnOrderGetPrice",
                    data
                );

                if (res1 && res1.status == "SUCCEED" && res1.result) {
                    this.price = res1.result.priceOrNum || 0;
                    this.priceOrNum = res1.result.price;
                    this.focusIndex = 0;
                } else {
                    this.Toast(res1.errorMessage);
                    return;
                }
            }
            // 禁止重复点击
            this.disableClick = true;
            // console.log(this.price);
            let res = await this.$post1("otc/order/ownOrderList", {
                priceOrderStatus: "NONPAYMENT",
                userId: this.$store.state.userId,
                page: 1,
                size: 10
            });
            if (res.result && res.result.data && res.result.data.length > 0) {
                this.Dialog.confirm({
                        title: "",
                        message: "当前有未完成订单，去完成？"
                    }).then(() => {
                        _this.$router.push({
                            name: "otcOrder",
                            params: {
                                active: 1
                            }
                        });
                    })
                    .catch(() => {});
                return;
            }
            let data = {
                userId: this.$store.state.userId,
                price: parseFloat(this.price),
                direction: "BUY",
                currency: this.tabList[this.subTabType].currency,
                payType: this.payType
            };
            // this.$util.showLoading();
            this.$post1("otc/order/fastPlaceAnOrder", data).then(res => {
                this.Toast.clear();
                // 延迟启用点击
                setTimeout(() => {
                    this.disableClick = false;
                }, 300);
                if (res && res.status == "SUCCEED" && res.result) {
                    this.price = null;
                    this.number = null;
                    setTimeout(ret => {
                        this.$router.push({
                            // path: `/quotes/quotesDetail?id=${id}`
                            path: `/transactionDetail`,
                            query: {
                                type: "BUY",
                                orderPriceId: res.result.orderPriceId
                            }
                        });
                    }, 300);
                } else {
                    this.Toast(res.errorMessage);
                }
            }).catch(() => {
                // 延迟启用点击
                setTimeout(() => {
                    this.disableClick = false;
                }, 300);
            });
            // console.log(this.number);
        },
        mescrollInit(mescroll) {
            this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
        },
        //下拉刷新
        downCallback() {
            this.pageNum = 1;
            this.mescroll.resetUpScroll();
            this.getOrderList();
        },
        //上拉加载
        upCallback() {
            if (this.noMores) {
                return;
            }
            this.getOrderList(1);
        },
        getTabList() {
            this.$util.showLoading();
            this.$post("otc/order/currencyList", {}).then(res => {
                this.Toast.clear();
                if (res && res.status == "SUCCEED") {
                    this.tabList = res.result;
                    this.getOrderList(); //订单列表
                    this.$store.state.isLogin && this.getBalances();
                    this.getPrice(); //当前币种价格
                }
            });
        },
        getBalances() {
            let data = {
                member: this.$store.state.userId,
                currency: this.tabList[this.subTabType].currency
            };
            let obj = {
                fbBalance: 0,
                fbBlockedBalance: 0
            };
            this.$get("member/balance/getBalances", data).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.fabiBalance = res.result[0] || obj;
                }
            });
        },
        getUserInfo() {
            this.$get("member/member/getMember", {
                member: this.$store.state.userId
            }).then(res => {
                if (res.status == "FAILED") {
                    this.Toast(res.errorMessage);
                } else if (res.status == "SUCCEED" && res.result) {
                    this.storeState = res.result.storeState;
                    this.nickName = res.result.nickName;
                    this.userInfo = res.result;
                    if (res.result.cardNo == "") {
                        this.isRenzheng = false;
                    } else {
                        this.isRenzheng = true;
                    }
                }
            });
        },
        //获取otc订单记录
        getOrderList(type) {
            var data = {
                page: this.pageNum,
                size: this.pageSize,
                currency: this.tabList[this.subTabType].currency,
                direction: this.curType == 1 ? "BUY" : this.curType == 2 ? "SELL" : ""
            };
            if (type) {
                this.$util.showLoading();
            }
            this.$post1("otc/order/orderList", data)
                .then(res => {
                    this.Toast.clear();
                    if (res && res.status == "SUCCEED" && res.result) {
                        if (this.pageNum == 1) {
                            this.orderList = res.result.data || [];
                        } else {
                            this.orderList = this.orderList.concat(res.result.data);
                        }
                        if (res.result.data.length < this.pageSize) {
                            this.noMores = true;
                        } else {
                            this.pageNum = this.pageNum + 1;
                            this.noMores = false;
                        }
                        this.mescroll.endSuccess(res.result.data.length, !this.noMores);
                    } else {
                        this.mescroll.endErr();
                    }
                })
                .catch(err => {
                    this.Toast.clear();
                    // this.mescroll.endSuccess(10,false);
                    this.mescroll.endSuccess(10, false);
                });
        },
        //二级tab切换
        switchSubTab(n) {
            if (n == this.subTabType) {
                return;
            }
            this.subTabType = n;
            this.mescroll.resetUpScroll(true);
            this.getOrderList(1);
            this.price = null;
            this.number = null;
        },
        switchPayType(n) {
            if (n == this.payType) {
                return;
            }

            this.payType = n;
        },
        //返回上一页
        back() {
            setTimeout(res => {
                this.orderList = [];
                this.curType = 1;
            }, 300);
            this.focusIndex = 0;
            this.merchantInfo = {};
            this.$router.go(-1);
        },
        //切换
        switchTab(type) {
            if (type == this.curType) {
                return;
            }

            if (type == 3) {
                if (this.userInfo.cardState != "PASS") {
                    this.Dialog.confirm({
                            title: "",
                            message: this.$t('zcsh.zcsh'),
                            confirmButtonText:this.$t('zcsh.qd'),
                            cancelButtonText: this.$t('zcsh.qx'),
                        })
                        .then(() => {
                            this.$router.push("/personalCenter");
                        })
                        .catch(() => {});
                    return;
                }
                if (
                    this.storeState == "null" ||
                    this.storeState == "REFUSE" ||
                    this.storeState == null
                ) {
                    this.curType = type;
                } else {
                    this.$router.push({
                        path: `/transaction/merchantAudit`
                    });
                }
                return;
            }
            this.curType = type;
            this.price = null;
            this.number = null;
            this.mescroll.resetUpScroll();
            this.pageNum = 1;
            this.orderList = [];
            this.getOrderList(1);
            this.getPrice(); //当前币种价格
        },
        // 打开更多弹框
        openPoups() {
            this.isShowMore = true;
        },
        close1() {
            this.isShowMore = false;
        },

        //划转
        goTransfer() {
            if (!this.$util.isLogin()) {
                return;
            }
            this.$router.push({
                path: `/assets/transfer`
            });
        }
    },

    deactivated() {
        this.number = null; //购买金额
        this.isShowMore = false;
        this.price = null;
        // this.setStatusBar("dark");
    }
};
</script>

<style lang="scss">
.payBox {
    .van-tabs__line {
        background-color: #fbc400;
        height: 2px;
    }

    .van-tab--active {
        color: #fbc400;
    }

    .submit {
        .van-button__text {
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 16px;
        }
    }

    #inputBox {
        .van-cell:not(:last-child)::after {
            border: none !important;
        }

        .van-cell {
            padding: 0;
        }
    }

    .van-button--info {
        color: #fff;
        background-color: #fbc400;
        border: 1px solid #fbc400;
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.payBox {
    @include base-background();

    .header_custom {
        margin: 0 -15px;

        .left_icon {
            padding-left: 15px;
            height: 46px;
            display: flex;
            align-items: center;
        }

        .right_icon {
            height: 46px;
            display: flex;
            align-items: center;
            right: 0;
        }

        .titleContent {
            padding: 0 40px;
            width: 100%;
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 16px;

            .items {
                line-height: 46px;
                position: relative;
                flex: 1;
                display: flex;
                justify-content: center;

                &.cur {
                    color: #fbc400;

                    .borders {
                        background: #fbc400;
                    }
                }

                .borders {
                    position: absolute;
                    bottom: 0;
                    left: 50%;
                    transform: translate(-50%);
                    width: 22px;
                    height: 2px;
                    background: transparent;
                }
            }
        }
    }

    .sections {
        margin: 0 -15px;
        padding: 0 15px;
        overflow-y: auto;

        .assetBox {
            height: 40px;
            padding: 0 27px 0 15px;
            box-shadow: 0px 0px 10px 0px rgba(121, 121, 121, 0.1);
            border-radius: 20px;
            margin-top: 20px;
            background: url(../../assets/images/home/rightArrow.png) no-repeat right 14px center;
            background-size: 6px 10px;
        }
    }

    .subTabList {
        display: flex;
        align-items: center;
        margin: 0 -15px;
        padding: 0 15px;
        height: 40px;
    }

    .operationBox {
        .bottoms {
            .leftBox {
                .items {
                    border: 1px solid rgba(153, 153, 153, 0.4);
                    border-radius: 3px;
                    line-height: 22px;
                    min-width: 50px;
                    text-align: center;
                    margin-right: 12px;

                    &.cur {
                        border-color: #fbc400;
                        color: #fbc400;
                    }
                }
            }
        }
    }

    .inputBox {
        margin-top: 10px;

        .inputs {
            height: 35px;
            border: 1px solid #fbc400;
            border-radius: 5px;
            display: flex;
            align-items: center;
            font-size: 12px;
            flex: 1;
            padding: 0 10px;
        }
    }

    .orderTitle {
        margin: 0 -15px;
        padding: 10px 15px;
    }

    .orderList {
        margin: 0 -15px;
    }
}
</style>
