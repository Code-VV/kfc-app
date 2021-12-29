<template>
<div class="container_common allContract">
    <van-tabs v-model="active" class="allContract_tabBar c444" @change='changeTab'>
      <van-tab :title="$t('add.qbwt')"></van-tab>
      <van-tab :title="$t('add.lsjr')"></van-tab>
    </van-tabs>
    <van-row type="flex" justify="space-between" class="center_text screen size13 all_con">
        <van-col span="8">
            <div @click="switchType('contractType')">
                <span class="pad_r_6 c333">{{currentCoinText}}</span>
                <img class="wid10 hei6 a_middle inline_block" src="./../../assets/images/home/dropDown.png" alt="">
            </div>
        </van-col>
        <van-col span="7">
            <!-- <div @click="switchType('entrust')" >普通委托</div> -->
            <div @click="switchType('entrust')">
                <span class="pad_r_6 c333">{{currentTypeText}}</span>
                <img class="wid10 hei6 a_middle inline_block" src="./../../assets/images/home/dropDown.png" alt="">
            </div>
        </van-col>

        <van-col v-show="active==0" span="7">
            <div class="c999">{{$t('add.qbcx')}}</div>
            <!-- <div  v-show="putongList.length==0">全部撤销</div>
        <div v-show="putongList.length>0" @click="switchType('revoke')" class="c_blue">全部撤销</div> -->
        </van-col>

        <van-col v-show="active==1" span="7">
            <!-- <div @click="switchType('entrust')" >普通委托</div> -->
            <div @click="switchType('historyType')">
                <span class="pad_r_6 c333">{{currentHistoryTypeText}}</span>
                <img class="wid10 hei6 a_middle inline_block" src="./../../assets/images/home/dropDown.png" alt="">
            </div>
        </van-col>

    </van-row>
    <!-- 列表 -->
    <!-- 普通列表 -->
    <div v-show="active==0" class="list flex1">
        <div v-if="putongList.length>0">
            <div v-for='(item,i) in putongList' :key="i">
                <contractItem @res="result" :type='type' :list="item" :subType='subCurType' :ensure="ensure" />
            </div>
        </div>
        <div v-else>
            <nodata :title="$t('add.zwdqwt')"></nodata>
        </div>
    </div>
    <!-- 历史列表 -->

    <div v-show="active==1" class="list flex1">

        <!-- 未成交 -->
        <div v-show="currentHistoryType==3">
            <div v-if="chicangList.length>0">
                <div v-for='(item,i) in chicangList' :key="i">
                    <!-- //1. 已成交 3.未成交 2. 已撤销 -->
                    <contractItem :currentHistoryType="'3'" @res="result" :type="''" :list="item" :subType='subCurType' :ensure="ensure" />

                </div>
            </div>
            <div v-else>
                <nodata :title="$t('qiquan.zwsj')"></nodata>
            </div>
        </div>

        <!-- 已撤销 和已成交 -->
        <div v-show="currentHistoryType!=3">
            <div v-if="historyList.length>0">
                <div v-for='(item,i) in historyList' :key="i">
                    <!-- //1. 已成交 3.未成交 2. 已撤销 -->
                    <!-- 已成交 -->
                    <contractItem :xiabiao="i+1" v-show="currentHistoryType==1" :currentHistoryType="'1'" @res="result" :type='type' :list="item" :subType='subCurType' :ensure="ensure" />
                    <!-- 已撤销 -->
                    <contractItem v-show="currentHistoryType==2" :currentHistoryType="'2'" @res="result" :type='type' :list="item" :subType='subCurType' :ensure="ensure" />
                </div>
            </div>
            <div v-else>
                <nodata :title="$t('qiquan.zwsj')"></nodata>
            </div>
        </div>

    </div>

    <!-- 交易对弹框列表 -->

    <van-action-sheet v-model="selectCoinPrisShow" :actions="actions" :cancel-text="$t('add.qx')" @select="onSelect" @cancel="onCancel" />

    <van-action-sheet v-model="selectTypeShow" :actions="actions1" :cancel-text="$t('add.qx')" @select="onSelect1" @cancel="onCancel1" />
    <van-action-sheet v-model="selectTypehistoryShow" :actions="actions2" :cancel-text="$t('add.qx')" @select="onSelect2" @cancel="onCancel2" />

</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import contractItem from "../../components/contractItem";
import $ from 'jquery'
export default {
    activated() {
        this.init();
        this.getPutong(this.currentCoin, this.currentType) // 全部类型  普通委托
        this.getPairsByMainCur();
        this.getWeichibaozhnegjinlv('BTC/USDT')
    },
    components: {
        contractItem
    },
    data() {
        return {
            ensure: 0, //维持保证金率

            active: 0,
            selectCoinPrisShow: false,
            selectTypeShow: false,
            selectTypehistoryShow: false,
            type: 'entrust', //当前tab类型，默认委托
            subCurType: 'contractType', //类型，entrust委托，revoke撤销
            putongList: [],
            historyList: [],
            CoinList: [],
            actions5: [{
                name: this.$t('add.qblx'),
                val: 'all'
            }],
            actions: [],
            actions1: [{
                    name: this.$t('add.ptwt'),
                    val: '1'
                },
                // { name: "止盈止损", val:'2' }
            ],
            actions2: [{
                    name: this.$t('add.ycj'),
                    val: '1'
                },
                {
                    name: this.$t('add.wcj'),
                    val: '3'
                },
                {
                    name: this.$t('add.ycx'),
                    val: '2'
                }
            ],
            chicangList: [],
            currentType: '1',
            currentCoin: 'all', // 默认 all EOS/USDT
            currentHistoryType: '1', //1. 已成交 3.未成交 2. 已撤销
            currentCoinText: this.$t('add.qblx'), //默认   全部类型
            currentTypeText: this.$t('add.ptwt'),
            currentHistoryTypeText: this.$t('add.ycj'),
        };
    },
    created() {
        this.setBgColor()
    },
    computed: {
        isNight() {
            return this.$store.state.nowThemeInfo

        }
    },
    watch: {
        isNight(val) {
            this.setBgColor()
        },
    },
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow"
        ]),
        init() {
            this.setnavTitle(this.$t('add.qb'),);
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        }, // 初始化页面

        setBgColor() {

            if (this.isNight == 'night-theme') { //黑夜模式
                $('.allContract').find(".van-dialog").css('backgroundColor', '#171E28');
                $('.allContract').find(".van-popup").css('backgroundColor', 'none');

                $('.allContract').find(".van-dialog__header").css('color', '#fff');
                //  $('.allContract').find(".van-tab").style.color = "#fff";

                $('.allContract').find(".van-dialog__message--has-title").css('color', '#d6d6d6');

                let dom1 = $('.allContract').find(".van-button--default");
                let dom2 = $('.allContract').find(".van-button__text");
                let dom3 = $('.allContract').find(".van-dialog__confirm");

                dom1.css('backgroundColor', "#171E28")
                dom1.css('color', "#fff")
                dom3.css('backgroundColor', "#171E28")

            } else { //白天模式
                //  $('.allContract').find(".van-dialog").style.backgroundColor = "#fff";
                // let dom1 =  $('.allContract').find(".van-button--default");
                // dom1.style.backgroundColor = "#fff";
                // dom1.style.color = "#333";

            }
        },

        //tab切换
        changeTab(index) {
            // console.log(this.active)
            // console.log(index)
            this.type = index == 0 ? 'entrust' : 'history';
            //  if(this.active != index){

            this.currentType = '1';
            this.currentCoin = 'all';
            this.currentHistoryType = '1';
            this.currentCoinText = this.$t('add.qblx');
            this.currentTypeText = this.$t('add.ptwt');
            this.currentHistoryTypeText = this.$t('add.ycj');
            if (index == '0') { //委托
                this.getPutong(this.currentCoin, this.currentType) // 全部类型  普通委托

            } else { //历史
                this.historyOrder(this.currentCoin, this.currentType, this.currentHistoryType) // 全部类型  普通委托

            }
            //  }
            // console.log(this.active)
        },
        //二级tab切换
        switchType(type) {
            if (type == 'contractType') {
                this.selectCoinPrisShow = true;
            }
            if (type == 'entrust') {
                this.selectTypeShow = true
            }
            //  全部撤销
            if (type == 'revoke') {
                // console.log('全部撤销')
            }
            //历史记录的 状态类型 已成交 已撤销
            if (type == 'historyType') {
                this.selectTypehistoryShow = true
            }

            if (type == this.subCurType) {
                return;
            }
            this.subCurType = type;
        },
        // 获取普通列表
        getPutong(coin, type) {
            let pairsName = coin;
            if (coin == 'all') {
                pairsName = null
            }

            // console.log(pairsName,type) // type  1 普通委托 2.止盈止损

            this.$post1("contract/contract/getEntrustOrder", {
                pairsName,
                member: this.$store.state.userId
            }).then(res => {
                if (res && res.status == "SUCCEED") {
                    let data = res.result;
                    this.putongList = data;
                }
            });
        },
        //历史记录
        historyOrder(coin, type, historyType) {

            let pairsName = coin;
            if (coin == 'all') {
                pairsName = null
            }

            // console.log(pairsName,type,historyType) 
            // type  1 普通委托 2.止盈止损
            // historyType  1 已成交 2.已撤销

            let orderState = '';
            if (historyType == '1') {
                orderState = 'FINAL'
            } else {
                orderState = 'CANCEL'
            }
            this.$get("contract/contract/getHistoryOrders", {
                pairsName,
                orderState,
                member: this.$store.state.userId
            }).then(res => {
                if (res && res.status == "SUCCEED") {
                    let data = res.result;

                    if (orderState == 'FINAL') { //已成交和持仓合并 并排序
                        // this.hebing(coin,data) //拆分一条 平仓前的数据
                        this.historyList = data;

                    } else {
                        this.historyList = data;
                    }
                }
            });
        },
        hebing(pairsName, arr) {

            let arr1 = [];
            arr.forEach(ele => {
                let a = ele;
                arr1.push(a)
                arr1.push(a)
            })

            // this.historyList  = arr;
            //  let [...newArr] = arr; //深拷贝
            //  let [...arr1] = arr; //深拷贝
            //  let arr2 = [...newArr,...arr1]; //数组合并
            // let arr3 = arr2.sort((a,b)=>{ //时间排序
            //   return b.updateTime - a.updateTime
            // })
            //     arr3.forEach((ele,i)=>{
            //       // console.log(i)
            //       if(i%2==0){  //偶数下标修改
            //         ele.from = 'chicang';
            //         ele.matchFee = '--';
            //         ele.price = ele.matchPrice;
            //       }
            //     })

            //    // console.log(arr3)  // 这里 打印出来 尽然每个元素都有 from 属性

            // newArr = newArr.concat(arr1)

            //  arr.forEach(ele=>{
            //            newArr.push(ele); //追加本身
            //            let beford = null;
            //             beford = ele;
            //             beford.price = beford.matchPrice;
            //             beford.from = 'chicang';
            //             beford.matchFee = '--';
            //            newArr.push(beford)
            //            beford = null;
            //         })

            this.historyList = arr1;

        },
        getPairsByMainCur(type) {
            this.$get("data/data/getPairsByMainCur", {
                mainCur: 'USDT',
                type: 'CONTRACT'
            }).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.CoinList = res.result;
                    // console.log(this.CoinList)
                    // pairsName
                    let data = this.CoinList.map(ele => {
                        return {
                            name: ele.pairsName,
                            val: ele.pairsName
                        }
                    })
                    this.actions = this.actions5.concat(data)
                }
            });
        },

        onCancel() {
            this.selectCoinPrisShow = false;
        },
        onCancel1() {
            this.selectTypeShow = false;
        },
        onCancel2() {
            this.selectTypehistoryShow = false;
        },

        // 选中当前交易对
        onSelect(item) {
            this.onCancel()

            this.currentCoinText = item.name;
            if (this.currentCoin != item.val) {
                this.currentCoin = item.val;
                if (this.active == 0) {
                    this.getPutong(this.currentCoin, this.currentType) // 全部类型  普通委托

                } else {
                    if (this.currentHistoryType == '3') {
                        this.getWarehouses(this.currentCoin);
                    } else {
                        this.historyOrder(this.currentCoin, this.currentType, this.currentHistoryType) // 全部类型  普通委托
                    }
                }
            }

        },
        // 委托选择类型  普通委托  止盈止损
        onSelect1(item) {
            this.onCancel1()

            //  this.currentTypeText = item.name;
            // if(this.currentType != item.val){
            //     this.currentType = item.val;
            //     if(this.active==0){
            //        this.getPutong(this.currentCoin,this.currentType) // 全部类型  普通委托
            //     }else{
            //     this.historyOrder(this.currentCoin,this.currentType, this.currentHistoryType) // 全部类型  普通委托

            //     }

            //  }
        },
        // 历史选择类型  已成交 已撤销 
        onSelect2(item) {
            this.onCancel2()
            this.currentHistoryTypeText = item.name;
            if (this.currentHistoryType != item.val) {
                this.currentHistoryType = item.val;
                if (item.val == '3') { //未成交 也就是持仓
                    this.getWarehouses(this.currentCoin);
                } else if (item.val == '2') { //已撤销
                    this.historyOrder(this.currentCoin, this.currentType, this.currentHistoryType) // 全部类型  普通委托
                } else { //已成交 
                    this.historyOrder(this.currentCoin, this.currentType, this.currentHistoryType) // 全部类型  普通委托
                }

            }
        },

        // 获取持仓列表
        getWarehouses(pairsName) {
            if (pairsName == 'all') {
                pairsName = null
            }
            this.$get("contract/contract/getWarehouses", {
                pairsName,
                member: this.$store.state.userId
            }).then(res => {
                if (res && res.status == "SUCCEED") {
                    let data = res.result.warehouses;
                    data.forEach(ele => {
                        ele.leverNum = ele.avgLevel
                    })

                    this.chicangList = data;
                }
            });
        },
        //维持保证金率
        getWeichibaozhnegjinlv(pairsName) {
            this.$get("contract/contractMul/getContractMul", {
                pairsName
            }).then(
                res => {
                    if (res && res.status == "SUCCEED") {
                        let data = res.result;
                        this.ensure = data[0].ensure;

                    }
                }
            );
        },

        // 子组件传来的平仓数据
        result(data, type, price) {
            this.setBgColor()
            // 撤单
            if (type == 'CHEDAN') {

                this.Dialog.confirm({
                    title: this.$t('add.tx'),
                    message: this.$t('add.sfcd')
                }).then(() => {
                    this.chedanFun(data)
                }).catch(() => {});
                setTimeout(() => {
                    this.setDialogStyle()
                }, 10)

            }
            // else if (type == "MATCH") {
            //   //平仓
            //   // console.log(data);
            //   document.getElementById(
            //     "container_common111"
            //   ).scrollTop = document.body.scrollTop = 0; //回到顶部
            //   this.pingType = data.tradeType;
            //   this.pingHand = data.hands;
            //   this.shouNum = data.hands;
            //   this.pingdata = data;
            //   this.disabled = true;
            //   this.kepingshoushu = data.hands-0+1;

            //   this.operationType = "close";
            // } else {
            //   this.zhiyingzhisun(type, data, price);
            // }
        },

        setDialogStyle() {

            if (this.isNight == 'night-theme') { //黑夜模式
                let bg = '#171E28';
                $(".van-dialog").css('backgroundColor', bg);
                $(".van-popup").css('backgroundColor', 'none');

                $('.van-dialog').find(".van-dialog__header").css('color', 'rgba(255,255,255,.8)');
                $('.van-dialog').find(".van-dialog__message").css('color', 'rgba(255,255,255,.6)');
                let dom1 = $('.van-dialog').find(".van-button--default");
                let dom2 = $('.van-dialog').find(".van-button__text");
                let dom3 = $('.van-dialog').find(".van-dialog__confirm");

                dom2.css('color', '#f0f0f0');
                dom1.css('backgroundColor', bg);
                dom3.css('backgroundColor', bg)
            } else {
                let bg = '#fff';
                $(".van-dialog").css('backgroundColor', bg);
                $(".van-popup").css('backgroundColor', 'none');

                $('.van-dialog').find(".van-dialog__header").css('color', '#333');
                $('.van-dialog').find(".van-dialog__message").css('color', '#666');
                let dom1 = $('.van-dialog').find(".van-button--default");
                let dom2 = $('.van-dialog').find(".van-button__text");
                let dom3 = $('.van-dialog').find(".van-dialog__confirm");

                dom2.css('color', '#333');
                dom1.css('backgroundColor', bg);
                dom3.css('backgroundColor', bg)
            }

        },

        // 撤单
        chedanFun(item) {
            let data = {
                orderId: item.id
            };
            this.$post1("contract/contract/closeContractOrder", data).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.Toast(this.$t('add.cdcg'));
                    setTimeout(() => {
                        this.getPutong(this.currentCoin, this.currentType) // 全部类型  普通委托

                    }, 500)
                } else if (res.status == "FAILED") {
                    this.Toast(res.errorMessage);
                }
            });
        },

    }
};
</script>

<style lang="scss">
@import '@/assets/scss/theme.scss';

.allContract {
    @include base-background();

    .allContract_tabBar {
        .van-tab {

            font-size: 15px;
        }

        .van-tabs__line {
            background-color: #39BB97;
            height: 2px;
            width: 55px !important;
        }

        .van-tab--active {
            color: #39BB97;
        }

        .van-hairline--top-bottom::after {
            border: none;
        }
    }

    .screen {
        margin: 0 -15px;
        padding: 15px;

    }
}
</style><style lang="scss" scoped>
.allContract {
    display: flex;
    flex-direction: column;

    .list {
        margin: 0 -15px;
        padding: 0 15px;
        overflow-y: auto;
    }
}
</style>
