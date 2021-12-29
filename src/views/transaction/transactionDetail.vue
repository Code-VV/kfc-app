<template>
<div class="transactionDetail container_common1 flex_column" v-if="orderInfo.id">
    <header class="headers flex header_custom hei46 align_center" :style="{ paddingTop: safeTop+'px'}">
        <div class="left_icon absolute" :class="isNight=='night-theme'?'whiteIcons':'darkIcons'">
            <van-icon name="arrow-left" @click="back()" />
        </div>
        <div class="titleContent font1 c222" v-if="userId==orderInfo.userId">{{orderInfo.userDirection=="SELL"?'卖出':'买入'}}{{orderInfo.currency}}</div>
        <div class="titleContent font1 c222" v-else>{{orderInfo.storeDirection=="SELL"?'卖出':'买入'}}{{orderInfo.currency}}</div>
        <div class="right_icon absolute pad_r_15">
            <span class="size14 blue_text" @click="explainModel=true">交易说明</span>
        </div>
    </header>
    <div class="sections flex1" style="overflow:auto">
        <div class="pad_t_20 size14 font1">订单编号：</div>
        <div class="orderNo flex-between pad_b_10 mar_t_5 font1">
            <div class="flex align_center c222 size14" v-if="orderInfo.id">
                <span>{{orderInfo.id}}</span>
                <img src="../../assets/images/user/uid.png" alt srcset class="wid14 hei16 mar_l_5" @click="copythat(orderInfo.id)" />
            </div>
            <!-- v-if="userId==orderInfo.userId" -->
            <div>
                <span class="size13 c999 font1" v-if="orderInfo.status=='NONPAYMENT'">待付款</span>
                <span class="size13 c999 font1" v-if="orderInfo.status=='PAYMENT'">待放币</span>
                <span class="size13 c999 font1" v-if="orderInfo.status=='FINISH'">已完成</span>
                <span class="size13 c999 font1" v-if="orderInfo.status=='CALLOFF'">已取消</span>
                <!-- <span class="size13 c999 font1" v-if="orderInfo.status=='NONPAYMENT'">已完成</span> -->
            </div>
            <!-- <div class v-else>
          <span class="size13 c999 font1" v-if="orderInfo.status=='NONPAYMENT'">待付款</span>
          <span class="size13 c999 font1" v-if="orderInfo.status=='PAYMENT'">待放币</span>
          <span class="size13 c999 font1" v-if="orderInfo.status=='FINISH'">已完成</span>
          <span class="size13 c999 font1" v-if="orderInfo.status=='CALLOFF'">已取消</span>
        </div>-->
        </div>
        <van-cell-group class="formBox" id="formBox" v-if="userId!=orderInfo.userId">
            <van-cell title="真实姓名" :value="orderInfo.userName" />
            <van-cell title="手机号" :value="orderInfo.userPhone|encryptionphone" />
            <van-cell title="交易金额" :value="orderInfo.price|SubString(2)" />
            <van-cell title="数量" :value="orderInfo.num|SubString(4)" />
            <van-cell title="价格" :value="orderInfo.totalPrice|SubString(2)" />
            <!-- <van-cell title="付款备注" value="无" /> -->
        </van-cell-group>
        <van-cell-group class="formBox" id="formBox" v-else>
            <van-cell title="真实姓名" :value="orderInfo.storeName" />
            <van-cell title="手机号" :value="orderInfo.storePhone|encryptionphone" />
            <van-cell title="交易金额" :value="orderInfo.price|SubString(2)" />
            <van-cell title="数量" :value="orderInfo.num|SubString(4)" />
            <van-cell title="价格" :value="orderInfo.totalPrice|SubString(2)" />
            <!-- <van-cell title="付款备注" value="无" /> -->
        </van-cell-group>
        <div v-if="(userId==orderInfo.userId&&orderInfo.userDirection=='BUY')||(userId!=orderInfo.userId&&orderInfo.storeDirection=='BUY')">
            <van-cell title="支付方式" id="payType" v-if="orderInfo.payType">
                <span slot="default" class="blue_text" v-if="orderInfo.payType=='WECHAT'">微信</span>
                <span slot="default" class="blue_text" v-if="orderInfo.payType=='ALIAY'">支付宝</span>
                <span slot="default" class="blue_text" v-if="orderInfo.payType=='BANKCARD'">银行卡</span>
            </van-cell>
            <van-cell title="支付方式" id="payType" is-link @click="payTypeShow=true" v-if="!orderInfo.payType&&orderInfo.status=='NONPAYMENT'">
                <span slot="default" class="blue_text">{{payType}}</span>
            </van-cell>
        </div>
        <div v-if="(userId==orderInfo.userId&&orderInfo.userDirection=='SELL')||(userId!=orderInfo.userId&&orderInfo.storeDirection=='SELL')">
            <van-cell title="支付方式" id="payType" v-if="orderInfo.payType">
                <span slot="default" class="blue_text" v-if="orderInfo.payType=='WECHAT'">微信</span>
                <span slot="default" class="blue_text" v-if="orderInfo.payType=='ALIAY'">支付宝</span>
                <span slot="default" class="blue_text" v-if="orderInfo.payType=='BANKCARD'">银行卡</span>
            </van-cell>
        </div>

        <div class="darkLine"></div>
        <div class="evaluate pad_t_b_15" v-if="orderInfo.status=='FINISH'">
            <!-- <p class="size13 font1 c999">对该订单进行评价</p> -->
            <div class="btnBox a_center pad_t_b_30">
                <!-- <van-button type="info" size="normal" class="btns">已完成</van-button> -->
                <van-button size="normal" class="btns cancels" v-if="orderInfo.appealStatus=='NORMAL'" @click="appealHandle(orderInfo.id)">申诉</van-button>
            </div>
            <p class="size13 font1 blue_text a_center">平台客服不会参与任何资金往来，请注意识别风险</p>
        </div>
        <!-- v-else -->
        <div class="payBox pad_t_b_15" v-if="orderInfo.status!='FINISH'">
            <div v-if="orderInfo.status=='NONPAYMENT'">
                <p class="size15 font1 c999">交易备注:</p>
                <div class="size13 font1 c999 mar_t_8">
                    请在
                    <van-count-down :time="time" format="mm分ss秒" class="c999 inline_block" ref="countDown" @finish="countDownFinish" />内完成付款，并点击确认付款，超时将自动取
                    消订单。
                </div>
            </div>
            <div v-if="userId==orderInfo.userId" class="flex flex_center pad_t_15 pad_b_10">
                <van-button size="normal" class="btns cancels" v-if="(orderInfo.status=='PAYMENT'||orderInfo.status=='CALLOFF')&&orderInfo.appealStatus=='NORMAL'" @click="appealHandle(orderInfo.id)">申诉</van-button>
                <div v-if="orderInfo.userDirection=='BUY'" class="btnBox flex">
                    <van-button size="normal" class="btns cancels" @click="cancelOrder(orderInfo.id)" v-if="orderInfo.status=='NONPAYMENT'">取消订单</van-button>
                    <van-button type="info" size="normal" class="btns" @click="goPayment(2)" v-if="orderInfo.status=='NONPAYMENT'">确认付款</van-button>
                    <van-button type size="normal" class="btns defaultBg" v-if="orderInfo.status=='PAYMENT'">等待放币</van-button>
                </div>
                <!--  flex_center pad_t_15 pad_b_10 -->
                <div v-else class="btnBox flex">
                    <!-- <van-button
              size="normal"
              class="btns cancels"
              v-if="orderInfo.status=='PAYMENT'||orderInfo.status=='CALLOFF'"
              @click="appealHandle(orderInfo.id)"
            >申诉</van-button>-->
                    <van-button type size="normal" class="btns defaultBg" v-if="orderInfo.status=='NONPAYMENT'">等待付款</van-button>
                    <van-button type="info" size="normal" class="btns" @click="goPayment(1)" v-if="orderInfo.status=='PAYMENT'">确认放币</van-button>
                </div>
            </div>
            <div v-else class="btnBox flex flex_center pad_t_15 pad_b_10">
                <van-button size="normal" class="btns cancels" v-if="(orderInfo.status=='PAYMENT'||orderInfo.status=='CALLOFF')&&orderInfo.appealStatus=='NORMAL'" @click="appealHandle(orderInfo.id)">申诉</van-button>
                <div v-if="orderInfo.storeDirection=='BUY'" class="btnBox flex">
                    <van-button size="normal" class="btns cancels" @click="cancelOrder(orderInfo.id)" v-if="orderInfo.status=='NONPAYMENT'">取消订单</van-button>
                    <van-button type="info" size="normal" class="btns" @click="goPayment(2)" v-if="orderInfo.status=='NONPAYMENT'">确认付款</van-button>
                    <van-button type size="normal" class="btns defaultBg" v-if="orderInfo.status=='PAYMENT'">等待放币</van-button>
                </div>

                <div v-else class="btnBox flex">
                    <!-- <van-button
              size="normal"
              class="btns cancels"
              v-if="(orderInfo.status=='PAYMENT'||orderInfo.status=='CALLOFF')&&orderInfo.appealStatus!='NORMAL'"
              @click="appealHandle(orderInfo.id)"
            >申诉</van-button>-->
                    <van-button type size="normal" class="btns defaultBg" v-if="orderInfo.status=='NONPAYMENT'">等待付款</van-button>
                    <van-button type="info" size="normal" class="btns" @click="goPayment(1)" v-if="orderInfo.status=='PAYMENT'">确认放币</van-button>
                </div>
            </div>
            <p class="size13 font1 blue_text a_center">平台客服不会参与任何资金往来，请注意识别风险</p>
            <!-- 评价 -->
        </div>
        <!-- <div>
        <chat></chat>
      </div>-->
    </div>
    <!-- 放大 -->
    <div v-if="isShow" class="check" @click="check">
        <img class="img" :src="payUrl" />
    </div>
    <van-popup v-model="explainModel" closeable class="ruleBox">
        <div class="title c222">交易说明</div>
        <div class="content c666">
            <p class="p">1.您的汇款将直接汇入卖方提供的账户，卖方交易中的数字资产在平台担保质押待对方确认。</p>
            <p class="p">2.请确认对方的收款账户和姓名，并在备注中注明。</p>
            <p class="p">3.大额度支付时，请完成第一笔付款后既点击确认支付</p>
            <p class="p">4.你作为普通每天可以免责取消一次买入订单超过取消次数你将会被禁止当日主动发起交易</p>
            <!-- <p class="p">3.好友交易返佣每单统计一次，每天0：00结算，0：00之后产生的的返佣会顺延到下一个结算点。</p>
        <p class="p">4.返佣结算方法：返佣额=实际交易手续费*返佣比例。</p>
        <p class="p">5.目前支持返佣的交易有USDT永续合约交易，即被邀请人只有进行了合约交易才能获得返佣，返佣币种与手续费币种一致。</p>
        <p class="p">6.每月1号月度榜单可以看到上月数据。</p>-->
        </div>
    </van-popup>
    <van-action-sheet v-model="payTypeShow" :actions="actions" @select="onSelect" cancel-text="取消" />
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
        userId() {
            return this.$store.state.userId;
        }
    },
    mounted() {
        this.init();

        this.type = this.$route.query.type || "buy";
        this.priceOrderId = this.$route.query.orderPriceId || "";
        console.log(this.priceOrderId + "测试");
        this.getOrderDetails();
        this.getOrderEndTime(); //获取订单结束时间
        if (this.isNight == "night-theme") {
            //黑夜模式
            // $('.assets').find(".lists").find('.van-cell:not(:last-child)::after').style.borderBottom = 'none';
        } else {
            //白天模式
        }
    },
    data() {
        return {
            isShow: false,
            payUrl: "",

            order: {
                no: "165921617539189181"
            },
            type: "", //buy买入sell卖出
            explainModel: false, //交易说明弹框
            time: 0,
            priceOrderId: 0,
            orderInfo: {}, //訂單信息
            payTypeShow: false,
            payType: "",
            actions: [{
                name: "微信"
            }, {
                name: "支付宝"
            }, {
                name: "银行卡"
            }],
            identity: 1, //1用户，2商户
            set: null
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

            this.setCurrency("");
        }, // 初始化页面
        //选择支付方式
        onSelect(item) {
            console.log(item);
            if (item.name == this.payType) {
                return;
            }
            this.payType = item.name;
            this.payTypeShow = false;
        },
        //返回上一页
        back() {
            this.$router.go(-1);
        },
        copythat: function (text) {
            var self = this;
            if (!text) {
                return this.Toast("复制失败，请稍后重试");
            }
            var clipBoard = api.require("clipBoard");
            clipBoard.set({
                    value: text
                },
                function (ret, err) {
                    if (ret) {
                        return self.Toast("复制成功");
                    } else {
                        return self.Toast("复制失败，请稍后重试");
                    }
                }
            );
        },
        getOrderDetails(type) {
            if (type) {
                this.$util.showLoading();
            }
            this.$post1("otc/order/orderDetails", {
                priceOrderId: this.priceOrderId,
                userId: this.$store.state.userId
            }).then(res => {
                this.Toast.clear();
                if (res && res.status == "SUCCEED" && res.result) {
                    this.orderInfo = res.result;
                    this.set = setTimeout(ret => {
                        this.getOrderDetails();
                    }, 10000);
                    // if (res.result.userId == ) {
                    //   this.identity == 1;
                    // } else {
                    //   this.identity == 2;
                    // }
                }
            });
        },
        //获取订单结束时间
        getOrderEndTime() {
            this.$post1("otc/order/orderEndTime", {
                priceOrderId: this.priceOrderId,
                member: this.$store.state.userId
            }).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.time = res.result.orderEndTime - res.result.nowTime || 0;
                    console.log(this.time);
                }
            });
        },
        // 查看
        check() {
            this.isShow = !this.isShow;
        },
        goPayment(n) {
            this.$util.showLoading();
            if (!this.payType && n == 2) {
                this.Toast("请选择支付方式");
                return;
            }
            var payType;
            if (this.payType.indexOf("微信") >= 0) {
                payType = "WECHAT";
            } else if (this.payType.indexOf("支付宝") >= 0) {
                payType = "ALIAY";
            } else if (this.payType.indexOf("银行卡") >= 0) {
                payType = "BANKCARD";
            }
            var url;
            var data = {
                priceOrderId: this.priceOrderId,
                userId: this.$store.state.userId
            };
            // 1确认放币2确认付款
            if (n == 1) {
                url = "otc/order/deliverGoods";
            } else if (n == 2) {
                url = "otc/order/payment";
                let elem = this.orderInfo.payMap[payType];
                if (elem.url) {
                    this.payUrl = elem.url;
                    this.check();
                } else {
                    this.Toast("不支持该付款方式");
                }
                data["payType"] = payType;
            }
            this.$post1(url, data).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.Toast("订单交易成功");
                    this.getOrderDetails();
                } else {
                    this.Toast(res.errorMessage);
                }
            });
        },
        //取消订单
        cancelOrder(id) {
            var _this = this;
            if (!id) {
                return;
            }
            this.Dialog.confirm({
                    title: "提醒",
                    message: "是否确认取消订单"
                })
                .then(() => {
                    _this.$util.showLoading();
                    _this
                        .$post1("otc/order/backOrder", {
                            priceOrderId: id,
                            userId: _this.$store.state.userId
                        })
                        .then(res => {
                            _this.Toast.clear();
                            if (res && res.status == "SUCCEED") {
                                _this.Toast("订单取消成功");
                                setTimeout(res => {
                                    _this.back();
                                }, 300);
                            } else {
                                _this.Toast(res.errorMessage);
                            }
                        });
                })
                .catch(() => {});
        },
        //申诉
        appealHandle(id) {
            if (!id) {
                return;
            }
            this.$router.push({
                path: `/transaction/appeal?id=${id}`
            });
        },
        //定时器停止事件
        countDownFinish() {
            console.log("定时器停止");
            if (this.orderInfo.status == "PAYMENT") {
                this.Toast("当前订单已取消，请重新下单");
                setTimeout(res => {
                    this.back();
                }, 300);
            }
        }
    },

    destroyed() {
        if (this.set) {
            clearTimeout(this.set);
        }
        // this.setStatusBar("dark");
    }
};
</script>

<style lang="scss">
.transactionDetail {
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

    .formBox {
        .van-field__control {
            text-align: right;
        }
    }

    #formBox,
    #payType {
        .van-cell:not(:last-child)::after {
            border: none !important;
        }

        .van-cell {
            padding: 15px 0 0 0;
            font-size: 13px;
            font-weight: 500;

            &:last-child {
                padding-bottom: 15px;
            }
        }
    }

    #payType {
        &.van-cell:not(:last-child)::after {
            border: none !important;
        }

        &.van-cell {
            padding: 15px 0;
            font-size: 15px;
            font-weight: 500;
        }
    }

    .van-button--info {
        color: #fff;
        background-color: #499C7A;
        border: 1px solid transparent;
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.transactionDetail {
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
            padding: 0 60px;
            width: 100%;
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }
    }

    .sections {
        margin: 0 -15px;
        padding: 0 15px;

        .btnBox {}

        .btns {
            width: 160px;
            height: 45px;
            font-size: 15px;
            font-weight: bold;
            border-radius: 5px;

            &.cancels {
                background: rgba(226, 237, 255, 1);
                color: #3c78e1;
                border-color: transparent;
            }

            &.defaultBg {
                color: #fff;
            }

            &:last-child {
                margin-left: 20px;
            }
        }
    }

    //规则弹框
    .ruleBox {
        @include base-background-second();
        width: 300px;
        border-radius: 5px;
        padding: 0 22px 30px;

        .title {
            text-align: center;

            font-size: 15px;
            padding: 15px 0;
        }

        .content {

            // max-height: 220px;
            // overflow-y: auto;
            .p {
                font-size: 13px;
                margin-top: 5px;

                &:first-child {
                    margin-top: 0;
                }
            }
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
            width: 90%;
            object-fit: contain;
        }
    }
}
</style>
