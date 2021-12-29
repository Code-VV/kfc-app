<template>
<div class="quotesDetail">
    <!-- header -->
    <header class="headers flex header_custom" :style="{ paddingTop: safeTop+'px'}">
        <div class="left_icon absolute">
            <van-icon name="arrow-left" @click="back()" />
        </div>
        <div class="titlesBox flex">
            <!-- <img @click="openPoup" src="../../assets/images/home/mores.png" alt srcset class="mores" /> -->
            <span class="span">{{trade}}{{$t("qiquan.mhy")}}</span>
            <!-- <span class="span" v-else>{{currentName}}</span> -->
            <!-- <div class="switching" @click="switching()"><img src="../../assets/images/home/mores_1.png" alt srcset class="switchingImg" /></div> -->
        </div>
        <!-- <div class="right_icon" v-show="type == 'bibi'"> -->
            <!-- <span class="rightIcon"></span> -->
            <!-- <img v-show="!isCollectstatus" @click="collectFun(1)" class="wid20 hei20" src="./../../assets/images/home/collect.png" alt />
            <img v-show="isCollectstatus" @click="collectFun(0)" class="wid20 hei20" src="./../../assets/images/home/collected.png" alt /> -->
        <!-- </div> -->
    </header>

    <!-- <van-button @click="$refs.trade.setSymbol('EOS/USDT',1)"> EOS/USDT 1</van-button>
    <van-button @click="ddd"> ETH/USDT  </van-button>-->

    <div class="quotesContent">
        <div class="topBox">
            <div class="item item1 bold">
                <!-- <h3
            class="h3"
            :class="currentCoinInfo.updown>0?'green_text':currentCoinInfo.updown<0?'orange_text':'dark_text'"
          >{{currentCoinInfo.nowPrice|toFixed(4)}}</h3>-->
                <h3 class="h3" :class="currentCoinInfo.updown>0?'green_text':currentCoinInfo.updown<0?'orange_text':'dark_text'">{{currentCoinInfo_nowPrice|toFixed(6)}}</h3>
                <!-- <p class="p"> -->
                    <!-- ≈ ¥ {{currentCoinInfo.chPrice|SubStringZreo(2)}} -->
                    <span :class="currentCoinInfo.updown>0?'green_text':currentCoinInfo.updown<0?'orange_text':'dark_text'">{{currentCoinInfo.updown*100|toFixedRate(2)}}%</span>
                <!-- </p> -->
            </div>
            <ul class="item item2 bold">
                <li class="quotationData">
                    <p class="name">High</p>
                    <span class="num">{{currentCoinInfo.higPrice|SubStringZreo(4)}}</span>
                </li>
                <li class="quotationData">
                    <p class="name">Low</p>
                    <span class="num">{{currentCoinInfo.lowPrice|SubStringZreo(4)}}</span>
                </li>
                <li class="quotationData">
                    <p class="name">24h</p>
                    <span class="num">{{currentCoinInfo.volume |SubStringZreo(2)}}</span>
                </li>
            </ul>
        </div>
        <div class="darkLine_allen"></div>
        <!--k线 周期tab -->
        <div class="timeEchart">
            <ul class="tabbar">
                <li class="items" v-for="(item,i) in timeTab" :key="i" :class="{'cur':tabIndex==item.type}" @click="switchTab(item.type)">{{item.name}}</li>
                <li class="items" @click="switchTab('mores')">
                    <span :class="moreText!='more'?'c_blue':''">{{moreText}}</span>
                    <img src="../../assets/images/home/iconMore.png" alt srcset class="loadMore" />
                </li>
                <li class="items" :class="{'cur':tabIndex=='deep'}" @click="switchTab('deep')">Deep</li>
                <!-- <span class="icons" @click="switchTabFolder"></span> -->
            </ul>
            <!-- 点击更多 下拉弹框-->
            <div class="dropDownBox">
                <div class="times" v-show="isMoreTime">
                    <span class="items" v-for="(item,i) in subTimeTab" :key="i" @click="switchTab1(item.type)" :class="subCurTimeTab==item.type?'blue_text':'c222'">{{item.name}}</span>
                </div>
                <div class="klineType" v-show="folder">
                    <div class="maines flex align_center bor_b">
                        <span class="name">{{$t('quotesDetail.zt')}}</span>
                        <div class="flex align_center">
                            <span class="blue_text">MA</span>
                            <span>BOLL</span>
                        </div>
                    </div>
                    <div class="maines flex align_center">
                        <span class="name">{{$t('quotesDetail.ft')}}</span>
                        <div class="flex align_center">
                            <span class="blue_text">MACD</span>
                            <span>KDJ</span>
                            <span>RSL</span>
                            <span>WR</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="hei600">
                <!-- :style="{width:wid}" -->
                <!-- <div  style="height:100%;width:100%" v-show="tabIndex!='deep'">
               <trade-view ref="trade"></trade-view>
          </div>-->
                <!-- <div  style="height:100%;width:100%" v-show="tabIndex=='deep'"> -->
                <!-- <deep

            :toBuy="buyData"
            :toSell="sellData"
            :toName="currentName"
            v-show="false"
            style="height:100%;width:100%"
          ></deep>-->
                <!-- v-show="tabIndex!='deep'" -->
                <!-- <trade-view ref="trade" style="height:100%"  @pankouData="pankouData" ></trade-view> -->
                <div style="height:100%;width:100%;position:relative">
                    <deep class="hei600" style="width:100%" :toBuy="buyDataLong" :toSell="sellDataLong" :toName="currentName" v-show="tabIndex=='deep'"></deep>
                    <div class="a_ab hei600" style="left:0;top:0;width:100%;z-index:1" :style="{left:(tabIndex=='deep'?'-2000px':'0px')}">
                        <trade-view ref="trade" @pankouData="pankouData" :type="type"></trade-view>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="darkLine_allen">asdfasd</div> -->
        <!-- 委托挂单 成交 介绍 -->
        <!-- <van-tabs v-model="listIndex" class="tabBox bold">
            
        </van-tabs> -->
        <!-- <div>
            <div class="qiquan">
                <div class="Quantity">
                    <button v-for="i in quantity" :key="i" :class="{'selectQuantity':i==selectQuantity}" @click="QuantityClick(i)">{{i}}</button>
                </div>
               <div class="kc">
                <div class="kyye">可用余额：10.00 {{currency}}</div>
                <div class="kcsj">开仓时间：60s</div>
               </div>
               <div class="zd_btn">
                   <button class="kanz">看涨</button>
                   <button class="kand">看跌</button>
               </div>
            </div>
        </div> -->

        <request :trade="trade"></request>
    </div>
    <!-- 合约 -->
    <!-- <footer v-show="type=='contract'" class="footersBox" :style="{ paddingBottom: safeBottom+'px'}">
        <router-link to="/contract">
            <button type="button" name="button" class="operationBtn green_bg">开仓</button>
        </router-link>
        <router-link to="/contract">
            <button type="button" name="button" class="operationBtn orange_bg">平仓</button>
        </router-link>
    </footer> -->
    <!-- 币币 -->
    <!-- <footer v-show="type=='bibi'" class="footersBox" :style="{ paddingBottom: safeBottom+'px'}">
        <router-link to="/transaction">
            <button type="button" name="button" class="operationBtn green_bg">买入</button>
        </router-link>
        <router-link to="/transaction">
            <button type="button" name="button" class="operationBtn orange_bg">卖出</button>
        </router-link>
    </footer> -->
    <!-- 侧拉弹框 -->
    <!-- <div v-if="isShowPopup">
        <coinPopup @closePopup="closePopup" @closeSorcet="toClose" :type="type"></coinPopup>
    </div> -->
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import ListItems from "@/components/listItem1";
import coinPopup from "@/components/coinPopup";

import TradeView from "@/components/TradeView/index.vue";
import deep from "@/components/deep/deep.vue";
import request from "./Request.vue"

// import contractPopup from "../../components/contractPopup";
export default {
    name: "quotes",
    components: {
        ListItems,
        coinPopup,
        TradeView,
        deep,
        request
    },
    data() {
        return {
            quantity:[10,50,100,500,1000,2000,5000,10000],
            //选中数量
            selectQuantity:100,
            //使用货币
            currency:'USDT',
            //当前交易对
            trade:'',




            pairsDetail: {},
            currentPairsId: "",
            isCollectstatus: false,
            currentCoinInfo_nowPrice: 0,
            rate: 7,
            updownRate: 0,
            timing: 5000,
            wid: document.body.clientWidth + "px", // 屏幕尺寸
            option: {},
            maxBuy: 10,
            maxSell: 10,
            currentName: "",
            moreText: "more",
            folder: false,
            isShowPopup: false,
            tabIndex: 15, //tab所在项 默认15分钟
            subCurTimeTab: "times",
            listIndex: 0, //0委托挂单，1成交，2简介
            type: "contract", //合约或币币  默认合约
            isMoreTime: false, //是否显示more周期
            // 截取后长度
            buyData: [],
            sellData: [],
            // 原长度  深度图
            buyDataLong: [],
            sellDataLong: [],

            chengjiaoData: [],
            currentCoinInfo: {
                volume: 0,
                nowPrice: 0,
                lowPrice: 0,
                chPrice: 0,
                higPrice: 0,
                updown: 0,
                open: 0
            },
            timer: null,
            timeTab: [{
                    name: "M1",
                    type: "1"
                },
                {
                    name: "M5",
                    type: "5"
                },
                {
                    name: "M15",
                    type: "15"
                },
                {
                    name: "M30",
                    type: "30"
                }
            ],
            subTimeTab: [{
                    name: "H1",
                    type: "60"
                },
                {
                    name: "D1",
                    type: "D"
                },
                {
                    name: "W1",
                    type: "W"
                }
            ]
        };
    },

    watch: {
        pairsName(val) {
            //  console.log(val)
            this.currentName = val;
            this.setSymbol(val);
            clearInterval(this.timer);
            this.timer = null;
            this.getCoinInfo(val);
            // this.getJinajie(val);

            if (this.type == "bibi") {
                this.isCollect(); //获取币种是否 收藏
            }
        },
        // "currentCoinInfo.nowPrice": {
        //     handler: function (val) {
        //         this.currentCoinInfo.chPrice = val * this.rate;

        //         //  console.log(this.updownRate)
        //         //  console.log(val/this.updownRate)
        //         this.currentCoinInfo.updown = val / this.updownRate;
        //     }
        // },
        currentCoinInfo_nowPrice(val) {
            this.currentCoinInfo.chPrice = val * this.rate;

            this.currentCoinInfo.updown = val / this.updownRate;
        }
    },
    created() {
        this.trade=this.$route.query.trade
        console.log(this.trade);
        // console.log(this.$route.query.bizhong);
        this.$hub.$on("fromRandomCurrentPrice", res => {
            // this.currentCoinInfo.nowPrice = res;  
                    setTimeout(() => {
                        this.currentCoinInfo_nowPrice = res;
                        //this.$hub.$emit("currentPrice",res);
                    }, 0);
        });
    },
    computed: {
        pairsName() {
            let name;
            // if (this.type == "contract") {
            //     name = this.$store.state.pairsName;
            // } else {
            //     name = this.$store.state.pairsName1;
            // }
            // name = this.$store.state.pairsName2;
            //记录
            this.currentName = "BTC/USDT";

            clearInterval(this.timer);
            // this.getCoinInfo(name);
            return name;
        },

        safeBottom() {
            return this.$store.state.safeAreaBottom;
        },
        safeTop() {
            return this.$store.state.safeAreaTop;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        },
        isLogin() {
            return this.$store.state.isLogin;
        },
        switching(){
            alert("点击！")
        }
    },
     updated(){
        setTimeout(() => {
            this.$router.go(0)
        }, 120000);
        
    },
    mounted() {
        this.init();
        this.type = this.$route.query.type || "bibi";
        // console.log("---------------");

        // let c = "ACI/USDT";
        let c = this.trade;
        this.getCoinInfo(c);
        if (this.type == "bib") {
            c = this.pairsName1;
        }

        window.MV.$emit("currentType", this.type);

        // 初始化
        this.$refs.trade.tradingViewInit(c, "15");

        if (this.type == "bibi") {
            this.isCollect(); //获取币种是否 收藏
        }

        // 获取简介
        // this.getJinajie(c);
    },
    beforeDestroy() {
        clearInterval(this.timer);
        // 主动断开
        // this.$refs.trade.toClose1();
    },

    destroyed() {
        clearInterval(this.timer);
        if (this.isNight != "night-theme") {
            this.setStatusBar("dark");
        }
    },

    methods: {
        QuantityClick(i){
            this.selectQuantity=i;
            console.log("测试！！！");
            console.log(this.selectQuantity);
        },
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setStatusBar"
        ]),
        isCollect() {
            if (this.isLogin) {
                // this.$get("member/member/getMemberPairsOptional", {
                //     member: this.$store.state.userId,
                //     pairs: this.pairsName
                // }).then(res => {
                //     if (res && res.status == "SUCCEED") {
                //         this.isCollectstatus = res.result.result;
                //         this.currentPairsId = res.result.pairId;
                //     }
                // });
            }
        },
        getJinajie(pairs) {
            pairs = pairs.split("/")[0];
            this.$get("data/data/getPairMsg", {
                pairs
            }).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.pairsDetail = res.result;
                    console.log(this.pairsDetail);
                }
            });
        },

        collectFun(val) {
            if (!this.$util.isLogin()) {
                return;
            }

            let data = {
                member: this.$store.state.userId,
                pairs: this.currentPairsId
            };

            // 添加自选

            // subOptional  //取消自选

            if (val == 0) {
                this.$post1("member/member/subOptional", data).then(res => {
                    if (res && res.status == "SUCCEED") {
                        if (res.result == true) {
                            this.Toast(this.$t('quotesDetail.qxsc'));
                            this.isCollect(); //获取币种是否 收藏
                        } else {
                            this.Toast(res.errorMessage);
                        }
                    } else {
                        this.Toast(res.errorMessage);
                    }
                });
            } else {
                this.$post1("member/member/addOptional", data).then(res => {
                    if (res && res.status == "SUCCEED") {
                        if (res.result == true) {
                            this.Toast(this.$t('quotesDetail.sccg'));
                            this.isCollect(); //获取币种是否 收藏
                        } else {
                            this.Toast(res.errorMessage);
                        }
                    } else {
                        this.Toast(res.errorMessage);
                    }
                });
            }
        },

        pankouData(data) {
            this.allData = data;
            this.buyDataLong = data.openup;
            this.buyData = data.openup.slice(0, 20); //显示20条
            if (data.chengjiao.length == 1 && data.chengjiao[0] == "") {
                this.chengjiaoData = [];
            } else {
                this.chengjiaoData = data.chengjiao.slice(0, 20);
            }
            this.maxBuy = Math.max.apply(
                Math,
                data.openup.map(ele => ele.num)
            );
            this.sellDataLong = data.opendown;
            this.sellData = data.opendown.slice(0, 20);
            this.maxSell = Math.max.apply(
                Math,
                data.opendown.map(ele => ele.num)
            );
        },
        // 用于子组件使用
        toClose() {
            // 主动断开
            // this.$refs.trade.toClose1();
        },
        // 用于子组件使用
        setSymbol(val) {
            // 切换交易对
            this.$refs.trade.setSymbol(
                val,
                window.localStorage.getItem("currentTime")
            );
        },
        // ddd(){
        //   let time = window.localStorage.getItem('currentTime');

        //

        // },
        init() {
            this.setnavTitle("");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(false);
            this.setStatusBar("light");
        }, // 初始化页面

        //关闭侧边栏
        closePopup() {
            this.isShowPopup = false;
        },
        //选择tab事件
        switchTab(type) {
            // if (type == this.tabIndex) {
            this.folder = false;
            if (type == "mores") {
                this.isMoreTime = !this.isMoreTime;
                return;
            }
            if (type == "deep") {
                this.tabIndex = type;
                this.moreText = "more";
                this.subCurTimeTab = "times";
                return;
            }

            // }

            // 修改周期
            this.moreText = "more";
            this.subCurTimeTab = "times";
            // this.$refs.trade.setSymbol('BTC/USDT', 15)
            //    console.error('----------------')
            // console.error('发送指令前1时间戳：' +  new Date().getTime());
            this.$refs.trade.setTime(type);

            this.isMoreTime = false;
            this.tabIndex = type;
        },
        //更多tab事件
        switchTab1(type) {
            if (type == this.tabIndex) {
                return;
            }
            this.$refs.trade.setTime(type);
            // localStorage.setItem('klineTime',type)
            // this.$refs.trade.tradingViewInit()
            this.isMoreTime = false;
            this.tabIndex = "";
            if (type == "60") {
                this.moreText = "H1";
            }
            if (type == "D") {
                this.moreText = "D1";
            }
            if (type == "W") {
                this.moreText = "W1";
            }

            this.subCurTimeTab = type;
        },
        switchTabFolder() {
            this.folder = !this.folder;
            this.isMoreTime = false;
        },
        //返回上一页
        back() {
            this.$router.go(-1);
        },
        //打开侧边栏
        openPoup() {
            this.isShowPopup = true;
        },
        //获取 币种详情
        getCoinInfo(pairsName) {
            this.$get("data/data/getCoinInfo", {
                pairsName
            }).then(res => {
                if (res && res.status == "SUCCEED") {
                    let data = JSON.parse(res.result);
                    this.currentCoinInfo = data;

                    this.rate = data.chPrice / data.nowPrice;
                    this.updownRate = data.nowPrice / data.updown;
                    setTimeout(() => {
                        this.currentCoinInfo_nowPrice = data.nowPrice;

                        this.$hub.$emit("currentPrice", data.nowPrice);
                    }, 0);
                }
            });
            setTimeout(() => {
                this.getCoinInfo(pairsName);
            }, 60000);
        }
    }
};
</script>

<style lang="scss">
$black: #12192d;
$white: #fff;
.switchingImg{
    width: 20px;
    height: 20px;
}
.switching{

    // display:inline-block;
    // float: right !i;
    // margin-left: 50px;
    position:absolute;
    right: 20px;
}
div.qiquan{
    // height: 500px;
}
div.Quantity{
    display: flex;
}
div.qiquan div.Quantity button{
    width: 52px;
    height: 25px;
    margin: 20px 0;
    border: 1px solid rgba(94, 88, 86, 0.753);
    background:#12192d;
    border-radius: 5px;
}
div.qiquan div.Quantity button.selectQuantity{
    border: 1px solid #39BB97;
    color: #fff;
    background-color: #39BB97;
}
div.qiquan div.kc{
    text-align: center;
    width: 80%;
    display: flex;
}
div.qiquan div.kc div{
    flex: 1;
    }

div.qiquan div.zd_btn{
    display: flex;
}
div.qiquan div.zd_btn button{
    flex: 1;
    height: 30px;
    margin-top: 20px;
}
div.qiquan div.zd_btn button.kanz{
    background: #38BB96;
}
div.qiquan div.zd_btn button.kand{
    background: #F85D5A;
}







.darkLine_allen {
    background-color: #0e1524 !important;
}

.quotesDetail {
    background: $black;
    color: $white;

    .header_custom {
        height: 46px;

        .van-icon {
            font-size: 20px;
            // position: absolute;
            // left: 0;
            // padding-left: 15px;
        }

        .van-icon-arrow-left:before {
            color: #fff !important;
        }
    }

    .van-tabs__line {
        background-color: #499C7A;
        height: 2px;
    }

    .van-tab--active {
        color: #499C7A;
    }

    .van-row {
        margin-left: 0 !important;
        margin-right: 0 !important;
    }

    .introduction {
        background: #12192d;

        .item {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            color: #ccc;
            height: 40px;
            line-height: 40px;
            border-bottom: 1px solid #232323;
        }

        // .van-cell:not(:last-child)::after {
        //   border-bottom: none;

        // }

        // .van-cell:nth-child(odd) {
        //   background:#0e1524
        // }
        // .van-cell{
        //   background: #161b26;
        //   border-bottom: 1px solid #000;

        // }

        // .van-cell__title {
        //   flex: unset;
        //   margin-right: 20px;
        //   color: #ccc;
        //   font-size: 12px;
        // }

        // .van-cell__value {
        //   color: #ccc;
        //   font-size: 13px;
        // }
    }

    .tabBox {
        margin: 0 -15px;

        .van-tabs__wrap {
            &::after {
                position: absolute;
                box-sizing: border-box;
                content: " ";
                pointer-events: none;
                top: -50%;
                right: -50%;
                bottom: -50%;
                left: -50%;
                border: none;
                border-bottom: 1px solid #656565;
                -webkit-transform: scale(0.5);
                transform: scale(0.5);
            }

            .van-tabs__nav {
                background-color: #0e1524;
                color: #fff9;
            }
        }
    }
}
</style><style lang="scss" scoped>
.quotesDetail {
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.hei600 {
    height: 400px;
}

.headers {
    align-items: center;

    position: relative;

    .left_icon {
        padding-left: 15px;
        height: 46px;
        display: flex;
        align-items: center;
    }

    .right_icon {
        padding-right: 15px;
        height: 46px;
        display: flex;
        align-items: center;
    }

    .titlesBox {
        padding: 0 30px;
        flex: 1;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: #fff;
        font-weight: 600;

        .mores {
            width: 18px;
            height: 18px;
            margin-right: 8px;
        }
    }

    .rightIcon {
        width: 17px;
        height: 17px;
        background: url("../../assets/images/home/share.png") no-repeat;
        background-size: 100% 100%;
    }
}

.quotesContent {
    flex: 1;
    overflow-y: auto;
    padding: 0 15px 20px;

    .topBox {
        padding: 15px 0;
        display: flex;
        align-items: stretch;
        justify-content: space-between;

        .h3 {
            font-size: 20px;
            font-weight: 500;
        }

        .p {
            font-size: 12px;

            // color: #777777;
            .orange_text {
                margin-left: 10px;
            }
        }

        .item1 {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        .item {
            &.item2 {
                max-width: 50%;
            }
        }

        .quotationData {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 10px;
            color: #999999;
            margin-top: 5px;

            .num {
                color: #fff;
                margin-left: 20px;
            }
        }
    }
}

.timeEchart {
    position: relative;
    margin: 0 -15px;

    // padding: 0 15px;
    .tabbar {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: $fff6;
        padding-left: 15px;
        // padding-right: 60px;
        padding-right: 15px;

        position: relative;

        // border-bottom: 1px solid rgba(227, 227, 227, 0.4);
        .icons {
            position: absolute;
            right: 15px;
            top: 50%;
            width: 30px;
            height: 30px;
            transform: translateY(-50%);
            margin-top: -2px;
            background: url(../../assets/images/home/folder.png) no-repeat right center;
            background-size: 20px 20px;
        }

        .items {
            padding: 15px 0 15px 0;
            border-bottom: 2px solid transparent;
            position: relative;
            min-width: 35px;
            text-align: center;

            span {
                padding-right: 5px;
            }

            &.cur {
                transition: border 1s;
                border-bottom: 2px solid #499C7A;
                color: #499C7A;
                font-weight: bold;
            }

            .loadMore {
                width: 6px;
                height: 6px;
                position: absolute;
                right: 0;
                bottom: 15px;
            }
        }
    }
}

// 下拉弹框
.dropDownBox {
    position: absolute;
    left: 0;
    right: 0;
    top: 53px;
    z-index: 2;
    padding: 0 15px;
    background: #0f1523;

    box-shadow: 0px 3px 11px 1px rgba(121, 121, 121, 0.09);

    .times {
        display: flex;
        padding: 0 0 20px;
        align-items: center;
        flex-wrap: wrap;

        .items {
            color: rgba(255, 255, 255, 0.6);
            font-size: 13px;
            margin-right: 32px;
            margin-top: 20px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .klineType {
        .maines {
            padding: 10px 0;
            // border-bottom: 1px solid rgba(227, 227, 227, 0.4);
            background: url(../../assets/images/home/eyes.png) no-repeat right center;
            background-size: 19px 11px;

            &:last-child {
                border: none;
                background-image: url("../../assets/images/home/eyes_1.png");
            }

            .name {
                font-size: 13px;
                color: #222222;
                padding-right: 20px;
                border-right: 1px solid rgba(227, 227, 227, 0.4);
            }

            .flex {
                span {
                    margin-left: 20px;
                }
            }
        }
    }
}

// 委托挂单
.entrustList {
    position: relative;
    padding: 0 15px;

    .title {
        font-size: 11px;
        color: rgb(198, 198, 198);
        padding: 16px 0 10px;
    }

    .detailItems {
        line-height: 25px;
        height: 25px;

        .green_text {
            padding-right: 10px !important;
        }

        .orange_text {
            padding-left: 10px !important;
        }
    }

    .detail2 {
        display: flex;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;

        .leftBox {
            width: 50%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .c999 {
                color: rgba(255, 255, 255, 0.6);
            }

            .areaBg {
                background: rgba(8, 200, 99, 0.3);
                height: 25px;
            }
        }

        .rightBox {
            width: 50%;

            .areaBg {
                background: rgba(248, 100, 63, 0.3);
                height: 25px;
            }
        }
    }
}

//成交列表
.dealBox {
    .title {
        padding: 0 15px;
        line-height: 30px;
        // background: #f8f7fd;
        background: #0e1524;
        font-size: 12px;
        color: rgb(198, 198, 198);
    }
}

.dealList {
    .dealItems {
        padding: 0 15px;
        margin-top: 15px;
    }
}

//简介
.introduction {
    .titles {
        font-size: 14px;
        color: #fff;
        font-weight: 500;

        border-bottom: 1px solid #232323;
    }

    .productions {
        .name {
            color: #fff;
            font-size: 14px;
            padding: 10px 0;
        }

        .content {
            color: #ccc;
            font-size: 13px;
            text-indent: 26px;
        }
    }
}

.footersBox {
    height: 50px;
    box-shadow: 0px -3px 11px 1px rgba(121, 121, 121, 0.09);
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding: 0 16px;
    box-sizing: content-box;
    justify-content: space-between;

    .operationBtn {
        width: 140px;
        line-height: 36px;
        height: 36px;
        border-radius: 4px;
        font-size: 14px;
    }
}
</style>
