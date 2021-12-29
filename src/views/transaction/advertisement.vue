<template>
<div class="advertisement container_common1 flex_column" :class="isNight=='night-theme'?'night':'day'">
    <header class="headers flex header_custom hei46 align_center" :style="{ paddingTop: safeTop+'px'}">
        <div class="left_icon absolute" :class="isNight=='night-theme'?'whiteIcons':'darkIcons'">
            <van-icon name="arrow-left" @click="back()" />
        </div>
        <div class="titleContent font1">
            <div class="items c222" @click="switchTab(1)" :class="{'cur':curType==1}">
                <span>购买广告</span>
                <i class="borders"></i>
            </div>
            <div class="items c222" @click="switchTab(2)" :class="{'cur':curType==2}">
                <span>出售广告</span>
                <i class="borders"></i>
            </div>
        </div>
        <div class="right_icon absolute pad_r_10" @click="openPoups">
            <img src="../../assets/images/home/mores1.png" alt srcset class="icons wid20 hei18" />
        </div>
        <mores @close="close1" v-if="isShowMore" type="otc" class="absolute right15 top46" :style="{ paddingTop: safeTop+'px'}"></mores>
    </header>
    <div class="sections flex1" id="advertiseCont">
        <div class="operationBox pad_t_b_15">
            <van-cell is-link :to="{name:'chooseCoin',params:{type:'OTC'}}" class="cellBorders size13">
                <span slot="title" class="font1">币种({{currency}})</span>
                <span slot="default" class="font1">指数价格≈{{formBox.nowPrice|SubString(2)}}CNY</span>
            </van-cell>
            <div class="priceStep mar_t_8 flex align_center" id="priceStep">
                <van-field v-model="formBox.upDownNumber" class="cellBorders size13 flex1" input-align="right">
                    <div slot="label" class="flex align_center font1">
                        溢价
                        <img src="../../assets/images/home/tips.png" alt srcset class="wid15 hei15 mar_l_5" />
                    </div>
                    <span slot="right-icon" class="c333">%</span>
                </van-field>
                <span class="plus btn" @click="increase()"></span>
                <span class="reduce btn" @click="reduce()"></span>
            </div>
            <div class="firstPrcie size13 font1 c222 flex align_center mar_t_8">
                <span>初始报价</span>
                <img src="../../assets/images/home/tips.png" alt srcset class="wid15 hei15 mar_l_5 mar_r_2" />
                <span>：{{initPrice|SubString(2)}}</span>
            </div>
            <div class="cellBorders size13 flex align_center mar_t_8">
                <!-- input_right -->
                <van-field v-model="formBox.extremum" class="flex1 flex align_center size13 mar_r_10 input-align" type="number" placeholder="请输入价格" input-align="right">
                    <div slot="label" class="flex align_center font1">
                        可接受最低价格
                        <img src="../../assets/images/home/tips.png" alt srcset class="wid15 hei15 mar_l_5" />
                    </div>
                </van-field>
                <span class="font1 c222 mar_r_10">CNY</span>
            </div>
            <div class="cellBorders size13 flex align_center mar_t_8">
                <van-field v-model="formBox.num" class="flex1 flex align_center size13 mar_r_10" placeholder="请输入交易数量" type="number" input-align="right">
                    <div slot="label" class="flex align_center font1">数量</div>
                </van-field>
                <span class="font1 c222 mar_r_10">USDT</span>
            </div>
            <div class="mar_t_8 size12 c333 font1">OTC账户余额：{{balance}} {{currency}}</div>
            <div class="inputBox mar_t_8 flex align_center c222" id="inputBox">
                <div class="inputs cellBorders">
                    <van-field v-model="formBox.minPrice" placeholder="购买金额" type="number" class="flex1 size12" />
                    <span>CNY</span>
                </div>
                <img src="../../assets/images/home/transIcon.png" alt srcset class="wid16 hei12 mar_l_r_10" />
                <div class="inputs cellBorders">
                    <van-field v-model="formBox.maxQuota" placeholder="最高成交额" type="number" class="flex1 size12" readonly />
                    <span>CNY</span>
                </div>
            </div>
            <div class="lines"></div>
            <van-cell is-link class="size13 pad0" @click="goPayment">
                <span slot="title" class="font1">支付方式</span>
                <span slot="default" class="flex align_center flex_end" style="height:100%">
                    <div v-for="(item,i) in chooseArr" :key="i">
                        <img src="../../assets/images/home/bankCard.png" alt srcset class="wid16 hei16" v-if="item=='BANKCARD'" />
                        <img src="../../assets/images/home/wexin.png" alt srcset class="wid16 hei16 mar_l_10" v-if="item=='WECHAT'" />
                        <img src="../../assets/images/home/zhifubao.png" alt srcset class="wid16 hei16 mar_l_10" v-if="item=='ALIAY'" />
                    </div>
                </span>
            </van-cell>
            <div class="darkLine"></div>
            <van-collapse v-model="activeNames" class="mar0">
                <van-collapse-item title="交易设置（选填）" class="font1">
                    <van-field v-model="formBox.remarks" type="textarea" placeholder="请输入交易说明" class="greyBg" rows="3">
                        <!-- <span class="font1" slot="label">交易说明</span> -->
                    </van-field>
                </van-collapse-item>
            </van-collapse>
            <div class="advertiseOption">
                <van-cell center title="自动回复" class="pad0 font1">
                    <van-switch v-model="checked" slot="right-icon" size="24" />
                </van-cell>
                <van-field v-model="formBox.autoMsg" type="textarea" class="greyBg" rows="3"></van-field>
                <!-- <div class="greyBg size13 flex align_center mar_t_8">
            <van-field
              v-model="formBox.leastCount"
              type="number"
              class="flex1 flex align_center size13"
              placeholder="请输入数量"
              input-align="right"
            >
              <div slot="label" class="flex align_center font1">对方至少成交数量</div>
            </van-field>
            <span class="font1 c222 mar_r_10">单</span>
          </div>-->
            </div>
            <van-button type="info" block class="mar_t_20 font1" @click="submitEvent">发布广告</van-button>
        </div>
    </div>
</div>
</template>

<script>
import $ from "jquery";
import {
    mapActions
} from "vuex";
import otcItem from "../../components/otcItem";
import mores from "../../components/mores"; //更多弹框

export default {
    components: {
        otcItem,
        mores
    },
    computed: {
        safeTop() {
            return this.$store.state.safeAreaTop;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        },
        chooseCurrency() {
            return this.$store.state.chooseCurrency;
        },
        payType() {
            this.chooseArr = this.$store.state.payType;
            return this.$store.state.payType;
        }
    },
    watch: {
        "formBox.upDownNumber"(val) {
            var reg = /^\-?[0-9\,]*\.?\d*$/;
            if (!this.maxRatio || !this.minRatio) {
                this.formBox.upDownNumber = 0;
                this.initPrice = this.formBox.nowPrice;
                return;
            }
            if (!reg.test(val)) {
                this.formBox.upDownNumber = null;
                this.initPrice = this.formBox.nowPrice;
                return;
            }

            this.initPrice = this.formBox.nowPrice * (1 + parseFloat(val / 100));
            this.formBox.maxQuota = this.$util.SubString(
                this.initPrice * parseFloat(this.formBox.num),
                2
            );

            if ((val * 10000 - this.maxRatio * 10000) / 10000 >= 0) {
                this.formBox.upDownNumber = this.maxRatio;
                return;
            }
            if ((val * 10000 + this.minRatio * 10000) / 10000 <= 0) {
                // this.upDownNumber = 0-this.minRatio;
                this.formBox.upDownNumber = "-" + 30;
                return;
            }
            this.formBox.upDownNumber = this.$util.SubString(val, 4);
        },
        "formBox.minPrice"(val) {
            if (!val) {
                this.minPrice = null;
                return;
            }
            val = val + "";
            val = val.replace(/\s+/g, "");
            var minPrice = this.formBox.maxQuota ?
                val - this.formBox.maxQuota > 0 ?
                this.formBox.maxQuota :
                val :
                val;
            this.formBox.minPrice = this.$util.SubString(minPrice, 2);
        },
        "form.maxQuota"(val) {
            this.formBox.minPrice = null;
        },
        "formBox.num"(val) {
            if (!val) {
                this.formBox.num = null;
                return;
            }
            val = val + "";
            val = val.replace(/\s+/g, "");
            this.formBox.num = this.$util.SubString(val, 4);
            this.formBox.maxQuota = this.$util.SubString(
                this.initPrice * parseFloat(this.formBox.num),
                2
            );
        },
        "formBox.extremum"(val) {
            if (!val) {
                this.formBox.extremum = null;
                return;
            }
            val = val + "";
            val = val.replace(/\s+/g, "");
            this.formBox.extremum = this.$util.SubString(val, 4);
        },
        "formBox.remarks"(val) {
            if (!val) {
                return;
            }
            this.formBox.remarks = val.replace(/\s+/g, "");
        },
        payType(val) {
            if (!val) {
                return;
            }
            this.chooseArr = val;
        }
    },

    activated() {
        this.init();
        this.getTabList();
        this.getratioConfig();

        this.isNext = false;

        let list = this.$GLOBAL.advertiseDetail;

        if (list.id) {
            this.formBox = list;
            this.isEdit = true;
            this.initPrice = this.formBox.nowPrice;
            this.checked = this.formBox.autoStatus == "OPEN";
        }
        if (this.$route.query && this.$route.query.list && !this.payType) {
            this.chooseArr = list.payType.split("-");
        }
    },
    data() {
        return {
            curType: 1, //1购买，2出售
            number: null,
            activeNames: ["1"],
            checked: false, //自动回复switch
            isShowMore: false, //显示更多弹框
            isEdit: false, //编辑订单
            chooseArr: [],
            currency: "USDT", //当前币种
            balance: 0,
            isNext: false,
            initPrice: 7, //初始价格
            formBox: {
                remarks: "", //备注
                autoMsg: "", //自动回复
                price: null, //价格
                upDownNumber: 0, //溢价
                extremum: null, //最高价格
                num: null, //交易数量
                // leastCount: null, //最少成交数
                minPrice: null, //最小金额
                maxQuota: null, //最高成交金额
                nowPrice: 0,
                maxRatio: 0, //溢价配置
                minRatio: 0
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
            "setCurrency",
            "setStatusBar",
            "setPayType"
        ]),
        init() {
            this.setnavTitle("");
            this.setbackRouter("");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(true);

            this.setCurrency("");
        }, // 初始化页面
        goPayment() {
            this.isNext = true;
            this.$router.push({
                path: "/payment?type=open"
            });
        },
        getTabList() {
            this.$post("otc/order/currencyList", {}).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.currency = this.chooseCurrency ?
                        this.chooseCurrency :
                        res.result[0] ?
                        res.result[0].currency :
                        "";
                    this.getBalances();
                    this.getPrice();
                }
            });
        },
        //获取溢价配置
        getratioConfig() {
            this.$post("otc/order/ratioConfig", {}).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.maxRatio = parseFloat(res.result.maxRatio) || 0;
                    this.minRatio = parseFloat(res.result.minRatio) || 0;
                }
            });
        },

        //获取当前价
        getPrice() {
            this.$post1("otc/order/getPrice", {
                currency: this.currency
            }).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.formBox.nowPrice = res.result;
                    this.initPrice = res.result;
                }
            });
        },
        //计数器增加
        increase() {
            var upDownNumber = this.formBox.upDownNumber;
            this.formBox.upDownNumber = this.$util.SubString(
                (upDownNumber * 10000 + 1 * 10000) / 10000,
                4
            );
        },
        //减
        reduce() {
            var upDownNumber = this.formBox.upDownNumber;
            this.formBox.upDownNumber = this.$util.SubString(
                (upDownNumber * 10000 - 1 * 10000) / 10000
            );
        },
        //返回上一页
        back() {
            this.$router.go(-1);
        },
        //发布广告
        submitEvent() {
            if (this.balance - 0 <= 0 || !this.balance) {
                this.Toast("当前余额不足");
                return;
            }
            if (!this.formBox.extremum) {
                this.Toast("请输入可接受最低价格");
                return;
            }
            if (!this.formBox.num) {
                this.Toast("请输入数量");
                return;
            }
            if (!this.formBox.minPrice) {
                this.Toast("请输入购买金额");
                return;
            }
            // if (!(this.formBox.leastCount - 0)) {
            //   this.Toast("请输入最少成交单数");
            //   return;
            // }
            if (this.chooseArr.length == 0) {
                this.Toast("请选择支付方式");
                return;
            }
            var payType = this.chooseArr.join("-");
            var url;
            var data = {
                userId: this.$store.state.userId,
                upDownNumber: this.formBox.upDownNumber ?
                    parseFloat(this.formBox.upDownNumber) :
                    0,
                extremum: parseFloat(this.formBox.extremum), //可接受最低价格
                num: parseFloat(this.formBox.num),
                minPrice: parseFloat(this.formBox.minPrice),
                // minPrice: this.formBox.leastCount,
                payType: payType,
                remarks: this.formBox.remarks, //交易说明
                autoMsg: this.formBox.autoMsg, //自动回复
                autoStatus: this.checked ? "OPEN" : "UNOPEN"
            };
            if (this.isEdit) {
                url = "otc/order/updataOrder";
                data["orderId"] = this.formBox.id;
            } else {
                url = "otc/order/orderReleasing";
                data["currency"] = this.currency;
                data["direction"] = this.curType == 1 ? "BUY" : "SELL";
            }
            this.$util.showLoading();
            this.$post1(url, data).then(res => {
                this.Toast.clear();
                if (res && res.status == "SUCCEED") {
                    this.Toast("发布成功");
                    setTimeout(res => {
                        this.$router.go(-1);
                    }, 300);
                } else {
                    this.Toast(res.errorMessage);
                }
            });
        },
        getBalances() {
            var data = {
                member: this.$store.state.userId,
                currency: this.currency
            };
            this.$get("member/balance/getBalances", data).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.balance = this.$util.SubString(res.result[0].fbBalance, 4);
                }
            });
        },

        //切换
        switchTab(type) {
            if (this.isEdit) {
                this.Toast("编辑订单不可切换订单类型");
                return;
            }
            if (type == this.curType) {
                return;
            }
            this.curType = type;
        },
        // 打开更多弹框
        openPoups() {
            this.isShowMore = true;
        },
        close1() {
            this.isShowMore = false;
        }
    },

    deactivated() {
        this.setPayType("");
        this.isShowMore = false;
        if (!this.isNext) {
            this.isEdit = false;
            this.chooseArr = [];
            this.checked = false;
            this.$GLOBAL.setAdvertiseDetail("");
            this.activeNames = ["1"],
                this.formBox = {
                    remarks: "", //备注
                    autoMsg: "", //自动回复
                    price: null, //价格
                    upDownNumber: 0, //溢价
                    extremum: null, //最高价格
                    num: null, //交易数量
                    // leastCount: null, //最少成交数
                    minPrice: null, //最小金额
                    maxQuota: null, //最高成交金额
                    nowPrice: 0,
                    maxRatio: 0, //溢价配置
                    minRatio: 0
                };
        }
    }
};
</script>

<style lang="scss">
.advertisement {
    &.night {
        .cellBorders {
            border-color: rgba(218, 226, 240, 0.4) !important;

            .van-cell {
                border-color: rgba(218, 226, 240, 0.4) !important;
            }
        }

        .lines {
            background: rgba(248, 249, 253, 0.4);
        }

        .van-collapse-item__content {
            background: transparent !important;
        }
    }

    &.day {
        .cellBorders {
            background: rgba(248, 249, 253, 1) !important;
            border-color: rgba(218, 226, 240, 1) !important;

            .van-cell {
                background: rgba(248, 249, 253, 1) !important;
                border-color: rgba(218, 226, 240, 1) !important;
            }
        }

        .lines {
            background: #f5f6ff;
        }
    }

    #priceStep {
        .van-field__body {
            justify-content: center;

            .van-field__right-icon {
                padding-left: 2px;
            }
        }
    }

    .van-tabs__line {
        background-color: #499C7A;
        height: 2px;
    }

    .van-tab--active {
        color: #499C7A;
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

    #advertiseCont {
        .van-field__label {
            width: auto;
            margin-right: 10px;
        }

        .van-cell:not(:last-child)::after {
            border: none !important;
        }

        .greyBg {
            .van-cell {
                background: transparent !important;
            }
        }

        .van-collapse-item__content {
            padding-top: 0 !important;
        }

        .cellBorders {
            border: 1px solid;
            border-radius: 5px;
            padding: 0 10px;
            height: 40px;
            display: flex;
            align-items: center;

            .van-cell {
                padding: 0;
            }
        }

        .pad0 {
            padding: 10px 0;
        }

        .mar0 {
            margin: 0 -15px;
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

    .formBox {
        .van-field__control {
            text-align: right;
        }
    }

    .van-button--info {
        color: #fff;
        background-color: #499C7A;
        border: 1px solid #499C7A;
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.advertisement {
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
                    color: #499C7A;

                    .borders {
                        background: #499C7A;
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

        .priceStep {
            .btn {
                width: 60px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: rgba(128, 164, 227, 1);
                border: 1px solid rgba(60, 120, 225, 1);
                border-radius: 5px;
                margin-left: 5px;
                font-weight: bold;
                color: #fff;

                &.plus::after {
                    content: "+";
                    font-size: 20px;
                }

                &.reduce::after {
                    content: "-";
                    font-size: 24px;
                }
            }
        }

        .lines {
            margin: 15px -15px 0;
            height: 1px;
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
                        border-color: rgba(104, 124, 241, 0.4);
                        color: #687cf1;
                    }
                }
            }
        }
    }

    .inputBox {
        .inputs {
            height: 35px;
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
