<template>
<div class="payBox container_common1 flex_column">
    <header class="headers flex header_custom hei46 align_center" :style="{ paddingTop: safeTop+'px'}">
        <div class="left_icon absolute" :class="isNight=='night-theme'?'whiteIcons':'darkIcons'">
            <van-icon name="arrow-left" @click="back()" />
        </div>
        <div class="titleContent font1 c222">商户认证</div>
        <div class="right_icon absolute pad_r_15" v-if="storeState=='PASS'">
            <span class="size14 blue_text font1">已认证</span>
        </div>
     
    </header>

    <div v-if="storeState=='PASS'">
        <div class="subTabList bg_exit_btn bor_b">
            <span class="size15 bold" v-for="(item,i) in tabList" :key="i" :class="{'blue_text':subTabType==i}" @click="switchSubTab(i)">{{item.currency}}</span>
        </div>
        <div class="assetBox size12 flex-between align_center c999" @click="goaAvertisement">
            <span class="size15 c222 font1">发布广告</span>
            <span>零手续费</span>
        </div>
    </div>
    <div v-if="storeState=='NO'">
       <applyMer />
    </div>
    <!-- <div class="sections flex1 " v-if="storeState=='PASS'"> -->
    <!--   -->
    <mescroll-vue class="sections flex1" ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" v-if="storeState=='PASS'">
        <!-- @click="goDetail" -->
        <div class="orderList" v-if="orderList.length>0">
            <div v-for="(item,i) in orderList" :key="i">
                <div class="items size12 c222 pad_t_10 pad_b_10" :class="{'bor_b':i+1<orderList.length}">
                    <div class="flex-between align_center size13">
                        <span class="font1" v-if="item.direction=='SELL'">卖出{{item.currency}}</span>
                        <span class="font1" v-else>买入{{item.currency}}</span>
                        <span class="blue_text font1" v-if="item.status=='NORMAL'">生效中</span>
                        <span class="c666 font1" v-if="item.status=='BACKOUT'">已撤销</span>
                    </div>
                    <div class="flex-between align_center mar_t_10">
                        <span>已成交：{{item.dealNum|SubString(4)}}</span>
                        <span>未成交金额：：{{(item.num*item.nowPrice)|SubString(2)}}</span>
                    </div>
                    <div class="flex-between align_center mar_t_5">
                        <span>数量：{{item.num|SubString(4)}}</span>
                        <span>发布时间：{{item.createTime|yndhms('M')}}</span>
                    </div>
                    <div class="flex-between align_center mar_t_10">
                        <span class="blue_text size15 font1">￥{{item.nowPrice|SubString(2)}}</span>
                        <div class="flex align_center">
                            <div class="flex align_center" @click.stop="goaAvertisement('edit',item)" v-if="item.status=='NORMAL'">
                                <img src="../../assets/images/home/edit1.png" alt srcset class="wid16 hei16 mar_r_4" />
                                <span class="size13">编辑</span>
                            </div>
                            <div class="flex align_center mar_l_30" v-if="item.status=='NORMAL'" @click.stop="revokeEvent(item.id,i)">
                                <img src="../../assets/images/home/reset.png" alt srcset class="wid16 hei16 mar_r_4" />
                                <span class="size13">撤销</span>
                            </div>
                            <!-- <div class="flex align_center mar_l_30" v-if="item.status=='FINISH'">
                  <img
                    src="../../assets/images/home/delete.png"
                    alt
                    srcset
                    class="wid16 hei16 mar_r_4"
                  />
                  <span class="size13">删除</span>
                </div>-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <nodata :title="'暂无广告'" class="pad_t_50"></nodata>
        </div>
    </mescroll-vue>
    <div v-if="storeState=='WAIT'" class="flex_column align_center">
        <img src="../../assets/images/home/examine.png" alt srcset class="mar_t_40 wid160 hei160" />
        <div class="size20 c222 bold mar_t_20">商户认证审核中</div>
        <p class="size15 c222" style="margin-top:10px">请等待审核结果</p>
        <van-button class="hei42 size16 mar_t_30" type="info" block @click="goHome">回首页</van-button>
    </div>
</div>
</template>

<script>
import $ from "jquery";
import {
    mapActions
} from "vuex";
import mores from "../../components/mores"; //更多弹框
import applyMer from "../../components/applyMer"; //申请商户
export default {
    components: {
        mores,
        applyMer
    },
    computed: {
        safeTop() {
            return this.$store.state.safeAreaTop;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        }
    },
    mounted() {
        this.init();
        this.getUserInfo();
    },
    data() {
        return {
            tabList: [{
                currency: "USDT"
            }],
            subTabType: 0, //tab选中项
            storeState: "", //审核商户状态
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
                htmlNodata: '<p class="upwarp-nodata">没有更多数据了</p>'
            },
            pageNum: 1, //当前页码
            pageSize: 10, //当前页数
            noMores: true, //没有更多数据了
            orderList: []
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
        //回首页
        goHome() {
            this.$router.push({
                path: `/home`
            });
        },
        mescrollInit(mescroll) {
            this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
        },
        //下拉刷新
        downCallback() {
            this.pageNum = 1;
            this.getOrderList();
        },
        //上拉加载
        upCallback() {
            console.log(222);
            if (this.noMores) {
                return;
            }
            this.getOrderList();
        },
        getTabList() {
            this.$util.showLoading();
            this.$post("otc/order/currencyList", {}).then(res => {
                this.Toast.clear();
                if (res && res.status == "SUCCEED") {
                    this.tabList = res.result;
                }
            });
        },
        goDetail() {
            this.$router.push({
                // path: `/quotes/quotesDetail?id=${id}`
                path: `/transactionDetail`
                // query: { orderPriceId: res.result.orderPriceId }
            });
        },
        //撤销广告
        revokeEvent(id, index) {
            var _this = this;
            if (!id) {
                return;
            }
            this.Dialog.confirm({
                    title: "提醒",
                    message: "是否确认撤销广告"
                })
                .then(() => {
                    _this.$util.showLoading();
                    _this
                        .$post1("otc/order/orderBack", {
                            userId: _this.$store.state.userId,
                            orderId: id
                        })
                        .then(res => {
                            _this.Toast.clear();
                            if (res.status == "FAILED") {
                                _this.Toast(res.errorMessage);
                            } else if (res.status == "SUCCEED" && res.result) {
                                _this.Toast("撤销广告成功");
                                // _this.orderList.splice(index, 1);
                                _this.orderList[index].status = 'BACKOUT';
                            }
                        });
                })
                .catch(() => {});
        },
        //获取otc订单记录
        getOrderList(type) {
            var url;
            var data = {
                userId: this.$store.state.userId,
                page: this.pageNum,
                size: this.pageSize
            };
            if (type) {
                this.$util.showLoading();
            }
            this.$post1("otc/order/merchantsOrders", data)
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
                    this.mescroll.endErr();
                });
        },
        init() {
            this.setnavTitle("");
            this.setbackRouter("");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(true);

            this.setCurrency("");
        }, // 初始化页面
        getUserInfo() {
            this.$get("member/member/getMember", {
                member: this.$store.state.userId
            }).then(res => {
                if (res.status == "FAILED") {
                    this.Toast(res.errorMessage);
                } else if (res.status == "SUCCEED" && res.result) {
                    this.storeState = res.result.storeState;
                    if (res.result.storeState == "PASS") {
                        this.getTabList();
                        this.getOrderList();
                    }
                }
            });
        },
        //二级tab切换
        switchSubTab(n) {
            if (n == this.subTabType) {
                return;
            }
            this.subTabType = n;
            this.getOrderList();
        },
        //返回上一页
        back() {
            this.$router.go(-1);
        },
        //广告
        goaAvertisement(type, item) {
            if (type == "edit") {
                this.$GLOBAL.setAdvertiseDetail(item)
                this.$router.push({
                    path: `/advertisement`,
                    // query: {
                    //   list: JSON.stringify(item)
                    // }
                });
                return;
            }
            this.$router.push({
                path: `/advertisement`
            });
        }
    },

    destroyed() {
        // this.setStatusBar("dark");
    }
};
</script>

<style lang="scss">
.payBox {
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
            padding: 0 60px;
            width: 100%;
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
        }
    }

    .assetBox {
        height: 40px;
        padding: 0 27px 0 15px;
        box-shadow: 0px 0px 10px 0px rgba(121, 121, 121, 0.1);
        border-radius: 20px;
        margin-top: 20px;
        background: url(../../assets/images/home/rightArrow.png) no-repeat right 14px center;
        background-size: 6px 10px;
    }

    .sections {
        margin: 10px -15px 0;
        padding: 0 15px;
        overflow-y: auto;
    }

    .subTabList {
        display: flex;
        align-items: center;
        margin: 0 -15px;
        padding: 0 15px;
        height: 40px;
    }
}
</style>
