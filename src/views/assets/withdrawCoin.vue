<template>
<div class="withdrawCoin container_common">
    <div class="chooseCoin c222">
        <van-cell :title="i18n.bz" is-link :value="currency" to="/assets/chooseCoin" />
    </div>
    <div class="addressPic1" v-if="currency=='USDT'">
        <van-cell :title="i18n.lm" is-link @click="selectHandle">
            <span slot="default">{{names}}</span>
        </van-cell>
    </div>
    <van-cell-group class="withdrawCoinForm c222">
        <van-field v-model.trim="address" center clearable :label="i18n.tbdz" :placeholder="i18n.qsrtbdz">
            <!-- <img src="../../assets/images/home/scan.png" alt srcset slot="right-icon" class="scan" @click="openScan" /> -->
        </van-field>
        <van-field v-model.trim="coinNum" center clearable type="number" :label="i18n.sl" :placeholder="i18n.zdtbsl+wallets.money+currency">
            <span slot="right-icon" class="allCoinNum" @click="allCoinNum">{{i18n.qbtq}}</span>
        </van-field>
    </van-cell-group>
    <van-cell-group class="withdrawCoinForm moneyBox">
        <van-cell :title="i18n.sxf">
            <span slot="default">{{wallets.fee|SubString(4)}} {{currency}}</span>
        </van-cell>
        <van-cell :title="i18n.sjdzsl">
            <span slot="default">{{wallets.actuals|SubString(4)}} {{currency}}</span>
        </van-cell>
    </van-cell-group>
    <van-button v-if="disableWithdrawCoin" type="info" disabled class="submit">{{i18n.jztb}}</van-button>
    <van-button v-else type="info" @click="submit" class="submit">{{i18n.tb}}</van-button>
    <div class="tipDetail">
        <p>{{$t('coin.zxtbsl')}}{{min_withdraw_value+currency}}</p>
        <!-- <p>{{i18n.txsxf}}{{wallets.fee+currency}}。</p>
        <p>{{i18n.zxtxje}}{{ disableWithdrawCoin ? "0.00" : min_withdraw_value+currency }}。</p>
        <p>{{i18n.zjaq}}</p> -->
    </div>
    <!-- 联系客服 -->
    <!-- <div class="customer-service c222">
        <div class="tit">{{i18n.qlxkf}}</div>
        <div class="tit flex-center" @click="copythat('FVT213')">
            <div class="i-block">
                {{i18n.wxh}}<span class="color-red">FVT213</span>
                <img src="../../assets/images/user/fuzhi.png" class="img" />
            </div>
        </div>
        <img class="img" src="../../assets/images/customerService.png" @click="check" />
    </div> -->
    <!-- 放大 -->
    <!-- <div v-if="isShow" class="check" @click="check">
        <img class="img" src="../../assets/images/customerService.png">
    </div> -->
    <van-action-sheet v-model="isSelect" :actions="actions" :cancel-text="i18n.qx" title @cancel="onCancel" @select="onSelect" color="”#fbc400“" />
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    components: {},

    data() {
        return {
            // 显示大图
            isShow: false,
            address: "", //提币地址
            coinNum: null, //提币金额
            currency: "USDT", //当前币种
            wallets: {
                money: 0, //最大提币数
                fee: 0,
                actuals: 0 //实际到账金额
            },
            min_withdraw_value: 1, //最小提币数
            isRenzhang: false, //是否实名
            index: 0,
            rechangeList: [{
                    name: "BTC",
                    value: 0.01,
                    fee: 0.0005
                },
                {
                    name: "ETH",
                    value: 0.05,
                    fee: 0.005
                },
                {
                    name: "EOS",
                    value: 1,
                    fee: 0.1
                },
                {
                    name: "BCH",
                    value: 0.01,
                    fee: 0.0001
                },
                {
                    name: "LTC",
                    value: 0.1,
                    fee: 0.001
                },
                {
                    name: "DASH",
                    value: 0.02,
                    fee: 0.002
                },
                {
                    name: "XRP",
                    value: 20,
                    fee: 0.1
                },
                {
                    name: "USDT",
                    value: 200,
                    fee: 5
                }
            ],
            isSelect: false, //弹框
            names: "ERC20",
            actions: [{
                    name: "ERC20"
                },{
                    name: "TRC20"
                }
                // {
                //     name: "OMNI"
                // }
            ]
        };
    },
    computed: {
        i18n() {
            return this.$t("coin");
        },
        disableWithdrawCoin() {
            return (this.min_withdraw_value) < 0 ? true : false;
        },
        userId() {
            return this.$store.state.userId;
        },
        chooseCurrency() {
            return this.$store.state.chooseCurrency;
        }
    },
    watch: {
        coinNum: function (val) {
            val = val + "";
            if (!val) {
                return;
            }
            this.coinNum = this.$util.SubString(val, 4);
            if (this.coinNum - this.wallets.fee >= 0) {
                this.wallets.actuals =
                    (this.coinNum * 1000000 - this.wallets.fee * 1000000) / 1000000;
            } else {
                this.wallets.actuals = 0;
            }
        },
        address(val) {
            this.address = val.replace(/\s+/g, "");
        }
    },
    activated() {},
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
            this.setnavTitle(this.i18n.tb);
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
            this.getHandling()
            setTimeout(() => {
                this.setnavBarShowRight(true);
            }, 100)
        },
        check() {
            this.isShow = !this.isShow;
        },
        // 全部提取
        allCoinNum() {
            this.coinNum = this.wallets.money;
        },
        //财产记录筛选事件
        selectHandle() {
            this.isSelect = true;
        },
        //查询资产列表
        getBalances(init) {
            let data = {};
            if (init) {
                this.$get("data/data/getIndexCoin?getCoinType=UPDOWN", data).then(res => {
                    if (res && res.status == "SUCCEED" && res.result) {
                        let iindex = "";
                        res.result.forEach((ele, i) => {
                            if (!iindex && ele.isDw) {
                                iindex = i;
                            }
                            // if (ele.tokenCur == "ETH") {
                            //     iindex = i;
                            // }
                        });
                        // this.currency = this.chooseCurrency ||
                        //     (res.result[iindex] && res.result[iindex].tokenCur ?
                        //         res.result[iindex].tokenCur :
                        //         "");
                        this.getRechargeMinLimit();
                        // this.getHandling();
                        this.getBalances();
                    }
                })
                return;
            } else {
                data = {
                    member: this.userId,
                    balanceType: "BALANCE_BB",
                    currency: this.currency
                };
            }
            this.$get("member/balance/getBalances", data).then(res => {
                console.debug(res);
                if (res && res.status == "SUCCEED" && res.result) {
                    let iindex = "";
                    res.result.forEach((ele, i) => {
                        if (ele.currency == "ETH") {
                            iindex = i;
                        }
                    });

                    this.wallets.money =
                        res.result[0] && res.result[0].assetsBalance ?
                        res.result[0].assetsBalance :
                        0; //可提币金额
                    this.wallets.money = this.$util.SubString(this.wallets.money, 4);

                }
            });
        },
        onCancel() {
            this.isSelect = false;
        },
        onSelect(item) {
            this.isSelect = false;
            if (this.names == item.name) {
                return;
            }
            this.names = item.name;
            this.getRechargeMinLimit();
            // this.getHandling();
        },
        //获取最小提币额
        getRechargeMinLimit() {
            // if (this.currency === "ETH") {
            //     this.min_withdraw_value = 1;
            // } else if (this.currency === "USDT") {
            //     this.min_withdraw_value = 20;
            // }else{
            //     this.min_withdraw_value = 0;
            // }
            // let currency =
            //     this.currency == "USDT" ?
            //     this.names == "ERC20" ?
            //     "USDT/ERC20" :
            //     "USDT/OMNI" :
            //     this.currency;
            // this.$get("member/quota/extract_min_limit", {
            //     currency: currency
            // }).then(res => {
            //     if (res && res.status == "SUCCEED" && res.result) {
            //         // this.copyAddress = res.result.wallet || "";
            //         this.min_withdraw_value = res.result || 0;
            //     } else {
            //         this.rechangeList.map((item, i) => {
            //             if (item.name == this.currency) {
            //                 // console.log(222);
            //                 this.min_withdraw_value = item.value;
            //             }
            //         });
            //     }
            // });
        },
        //获取最小提币手续费 和最小提币数量
        getHandling() {
            // let currency =
            //     this.currency == "USDT" ?
            //     this.names == "ERC20" ?
            //     "USDT/ERC20" :
            //     "USDT/OMNI" :
            //     this.currency;
            // this.$get("member/quota/extract_handling", {
            //     currency: currency
            // }).then(res => {
            //     if (res && res.status == "SUCCEED" && res.result) {
            //         this.wallets.fee = res.result || 0;
            //     } else {
            //         this.rechangeList.map((item, i) => {
            //             if (item.name == this.currency) {
            //                 // console.log(11);
            //                 this.wallets.fee = item.fee;
            //             }
            //         });
            //     }
            // });
            this.$get("/data/sys/getUsdtTheMinimumWithdrawalAmount").then(res=>{
                // console.log(res);
                this.wallets.fee=res.result[0].uvalue
                this.min_withdraw_value=res.result[1].uvalue
            })
        },
        //提币操作
        submit() {
            var _this = this;
            // let currency =
            //     this.currency == "USDT" ?
            //     this.names == "ERC20" ?
            //     "USDT/ERC20" :
            //     "USDT/OMNI" :
            //     this.currency;
            let currency = this.currency;
            let coinNum = parseFloat(this.coinNum);
            /*var reg = /^0x[A-Za-z\d]{40}$/; //ETH HJGX USDT(erc20协议)
            var reg1 = /^[1|3][A-Za-z\d]{33}$/; //.BTC BCH BSV BCHBSV USDT(omni协议)
            var reg2 = /^L[A-Za-z\d]{33}$/; //LTC
            // if (this.currency == "USDT") {
            //   if (!reg.test(this.address) && !reg1.test(this.address)) {
            //     this.Toast("请输入正确的地址");
            //     return;
            //   }
            // }
            if (
                this.currency == "ETH" ||
                this.currency == "HJGX" ||
                (this.currency == "USDT" && this.names == "ERC20")
            ) {
                if (!reg.test(this.address)) {
                    this.Toast(this.i18n.qsrzxdtbdz);
                    return;
                }
            }
            if (
                this.currency == "BTC" ||
                this.currency == "BCH" ||
                this.currency == "BSV" ||
                this.currency == "BCHBSV" ||
                (this.currency == "USDT" && this.names == "OMNI")
            ) {
                if (!reg1.test(this.address)) {
                    this.Toast(this.i18n.qsrzxdtbdz);
                    return;
                }
            }
            if (this.currency == "LTC") {
                if (!reg2.test(this.address)) {
                    this.Toast(this.i18n.qsrzxdtbdz);
                    return;
                }
            }*/
            // if (!this.address) {
            //   this.Toast("请输入正确的地址");
            //   return;
            // }
            if (!coinNum) {
                this.Toast(this.i18n.qsrtbje);
                this.coinNum = "";
                return;
            }
            if (this.coinNum - this.min_withdraw_value < 0) {
                this.Toast(
                    this.i18n.zxtbsl + this.min_withdraw_value + this.currency + "！"
                );
                return;
            }

            if (coinNum - this.wallets.money > 0) {
                this.Toast(this.i18n.cczdje);
                return;
            }
            if (!this.isRenzhang) {
                this.Dialog.confirm({
                        title: "",
                        message: this.i18n.wsmrz
                    })
                    .then(() => {
                        _this.$router.push("/realname");
                    }).catch(() => {});
                return;
            }
            let data = {
                member: this.userId,
                balance: this.coinNum,
                currency: currency || "",
                wallet: this.address
            };
            this.$util.showLoading();
            this.$post1("member/balance/extractCoin", data).then(res => {
                this.Toast.clear();
                if (res && res.status == "SUCCEED") {
                    if (res.result == true) {
                        this.Toast(this.i18n.tbcg);
                        setTimeout(res => {
                            this.$router.push({
                                path: `/assets/withdrawCoinSuccess?balance=${this.wallets.actuals}&currency=${this.currency}`
                            });
                        }, 300);
                    } else {
                        this.Toast(res.errorMessage);
                    }
                } else {
                    this.Toast(res.errorMessage);
                }
            });
        },
        //扫一扫获取地址
        openScan() {
            // this.$router.push({
            //   path: `/assets/wxscanline`
            // });
            var _this = this;
            if (_this.$util.confirmPer("camera", this.i18n.xj)) {
                var FNScanner = api.require("FNScanner");
                FNScanner.open({
                        autorotation: true
                    },
                    function (ret, err) {
                        if (ret) {
                            if (ret.eventType == "success" && ret.content != "") {
                                // 扫码成功执行函数操作传值
                                _this.address = ret.content;
                                return;
                            }
                            if (ret.eventType == "albumError") {
                                if (!_this.$util.confirmPer("photos", _this.i18n.xj)) {
                                    return;
                                }
                            }
                            if (ret.eventType == "fail") {
                                _this.Toast(_this.i18n.smsb);
                                return;
                            }
                        } else {
                            _this.Toast(_this.i18n.smcw);
                        }
                    }
                );
            }
        },
        getUserInfo() {
            this.$get("member/member/getMember", {
                member: this.$store.state.userId
            }).then(res => {
                if (res.status == "FAILED") {
                    this.Toast(res.errorMessage);
                } else if (res.status == "SUCCEED" && res.result) {
                    let data = res.result;
                    if (data.cardNo == "") {
                        this.isRenzhang = false;
                    } else {
                        this.isRenzhang = true;
                    }
                }
            });
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
        this.getBalances(1);
        this.getUserInfo();
    },
    destroyed() {
        this.setnavBarShowRight(false);
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.withdrawCoin {
    @include base-background();

    .addressPic1 {
        .van-cell {
            padding-left: 0;
            padding-right: 0;
        }
    }

    .chooseCoin {
        .van-cell {
            background: #f8f7fd;
            display: flex;
            align-items: center;
        }

        .van-cell__value {
            // color: #222222;
        }
    }

    .withdrawCoinForm {
        .van-cell {
            padding: 20px 0;
        }

        .van-field__label {
            // color: #222222;
        }

        .van-field__control {
            font-size: 12px;
        }

        .van-icon-clear {
            margin-right: 10px;
        }

        .van-cell__value {
            // color: #222222;
        }

        .van-cell:not(:last-child)::after {
            left: 0;
        }

        &.van-hairline--top-bottom::after {
            border-top: 0;
        }

        &.moneyBox {
            padding-top: 10px;

            &.van-hairline--top-bottom::after {
                border: 0;
            }

            .van-cell:not(:last-child)::after {
                border: 0;
            }

            .van-cell {
                padding: 0 !important;
                margin-top: 15px;
            }
        }
    }

    .submit {
        width: 100%;
        background: #fbc400;
        font-size: 16px;
        margin-top: 40px;
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.addressPic1 {
    font-size: 14px;
    border-radius: 5px;
}

.chooseCoin {
    margin: 0 -15px;
}

.withdrawCoinForm {
    .scan {
        width: 18px;
        height: 18px;
    }

    .allCoinNum {
        color: #fbc400;
        font-size: 14px;
    }
}

.tipDetail {
    color: #999999;
    font-size: 12px;
    margin-top: 80px;
    line-height: 18px;
}

.customer-service {
    width: 100%;
    margin-top: 20px;
    text-align: center;

    .img {
        width: 200px;
        height: 200px;
        margin: 5px auto;
        display: block;
    }

    .color-red {
        color: red;
    }

    .tit {
        font-size: 18px;
    }

    .i-block {
        display: inline-block;

        .img {
            display: inline-block;
            margin-top: 0;
            margin-left: 5px;
            width: 15px;
            height: 15px;
        }
    }

    .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;

    }
}

.check {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    left: 0;
    background: rgba(0, 0, 0, 00.9);

    .img {
        width: 300px;
        height: 300px;
    }
}
</style>
