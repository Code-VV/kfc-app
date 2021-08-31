<template>
  <div class="assets container_common1 flex flex_column">
    
	 <header class="headers flex header_custom hei46 align_center relative" :style="{ paddingTop: safeTop+'px'}">
        <div class="left_icon absolute" :class="isNight=='night-theme'?'whiteIcons':'darkIcons'">
            <van-icon name="arrow-left" @click="back()" />
        </div>
        <div class="titleContent font1">
            <div class="items c222" @click="operateEvent(1)" :class="{'cur':operateType==1}">
                <span>{{$t("fb.gm")}}</span>
                <i class="borders"></i>
            </div>
            <div class="items c222" @click="operateEvent(2)" :class="{'cur':operateType==2}">
                <span>{{$t("fb.chus")}}</span>
                <i class="borders"></i>
            </div>
        </div>
       
	 </header>
    <div class="subTabList bg_exit_btn bor_b" v-if="operateType!=3">
        <span class="size15 bold" v-for="(item,i) in tabList" :key="i" :class="{'blue_text':i==0}" @click="switchTab(i)">{{item.reName}}</span>
    </div>
    <div class="contentBox mar_t_20" id='contentBox'>
      <div>
        <p v-if="operateType==1" class="size14 c000">{{payType==1?$t(fb.gbje):$t(fb.gmsl)}}</p>
        <p v-else class="size14 c000">{{payType==1?$t(fb.csje):$t(fb.cssl)}}</p>
        <div v-if="operateType==1">
          <div class="c000 size12 flex align_center bor_b" v-if='payType==1'>
            <span class="size20 mar_r_8">￥</span>
            <van-field v-model="number" :placeholder="$t('fb.q100q')"  type="number"/>
          </div>
          <div class="c000 size12 flex align_center bor_b" v-else>
            <van-field v-model="number" :placeholder="$t('fb.qsrgmsl')" class="flex1"  type="number"/>
            <span class="size15 c222 font1">USDT</span>
          </div>
        </div>
        <div v-else>
          <div class="c000 size12 flex align_center bor_b"  v-if='payType==1'>
            <span class="size20 mar_r_8">￥</span>
            <van-field v-model="number" :placeholder="$t($t(fb.keshou))+0.00" class="flex1"  type="number"/>
            <span class="blue_text mar_l_10">{{$t('fb.qb')}}</span>
          </div>
          <div class="c000 size12 flex align_center bor_b"  v-else>
            <van-field v-model="number" :placeholder="$t('fb.keshou')" class="flex1"  type="number" />
            <span class="size15 c222 font1">USDT</span>
            <span class="blue_text mar_l_10" @click="allPay">{{$t('fb.qb')}}</span>
          </div>
        </div>
 <div class="leftBox flex align_center c999 ">
                        <!-- <span class="items" @click="switchPayType('ALIAY')" :class="{'cur':payacc=='ALIAY'}">支付宝</span> -->
                        <span class="items" @click="switchPayType('BANKCARD')" :class="{'cur':payacc=='BANKCARD'}">{{$t('fb.yhk')}}</span>
                        <!-- <span class="items" @click="switchPayType('WECHAT')" :class="{'cur':payacc=='WECHAT'}">微信</span> -->
                    </div>
        <div class="flex-between size12 c444 payBox mar_t_10 align_center">
          <span>{{$t('fb.dyj')}} {{nowPrice}} CNY/USDT</span>
		    <span>{{$t('fb.cy')}}{{fabiBalance.fbBalance|SubString(2)}} USDT</span>
          <!--div class="rightBox flex-between align_center" @click="transEvent">
            <img
              src="../../assets/images/home/transIcon.png"
              alt
              srcset
              class="wid13 hei10 mar_r_8"
              
            />
            <span v-if="operateType==1">{{payType==1?'按数量购买':'按金额购买'}}</span>
            <span v-else>{{payType==1?'按数量出售':'按金额出售'}}</span>
          </div-->
        </div>
      </div>
    </div>
	
    <div class="mar_t_50">
      <van-button type="info" block @click="buy" >{{operateType==1?$t('fb.gm'):$t('fb.cs')}}</van-button>
    </div>
	 <div class="size8 c999">
        <div class="mar_t_15">{{$t('fb.bdyj')}}( <router-link to="/otc365agreement"><span  class=" c_blue" >{{$t('fb.lj')}}</span ></router-link>)</div>
      </div>
    <!--div class="c444 size12 mar_t_10">交易手续费：0元</div-->
  </div>
</template>

<script>
import $ from "jquery";
import { mapActions } from "vuex";
export default {
  components: {},
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

    if (this.$store.state.nowThemeInfo == "night-theme") {
      $(".assets")
        .find(".operationTab")
        .css("background-color", this.$bg_night_second);
    } else {
      $(".assets")
        .find(".operationTab")
        .css("background-color", "#fff");
    }
    if (this.isNight == "night-theme") {
      //黑夜模式
      // $('.assets').find(".lists").find('.van-cell:not(:last-child)::after').style.borderBottom = 'none';
    } else {
      //白天模式
	  
    }
	
  },
  data() {
    return {
      curType: 0,
      number: null,
	  price:0,
	  disableClick:false,
	    nowPrice: 0, 
	  fabiBalance: {
                fbBalance: 0,
                fbBlockedBalance: 0
            }, 
      operateType: 1, //1买2卖
      payType: 2, //1按数量2按金额
	  payacc:"ALIAY",
      tabList: [
      
        {
          name: "泰达币",
          reName: "USDT"
        }
      ]
    };
  },
  activated() {
        this.init();
		this.$store.state.isLogin && this.getBalances();
                    this.getPrice(); //当前币种价格
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
	  /*if (this.$store.state.nowThemeInfo != "night-theme") {
		this.setnavBarBgColor("#4980E5");
      }else{
		this.setnavBarBgColor("#272A3F");
		 $(".topBox").css("background-color", "#272A3F");
	  }
*/
    
      this.setCurrency("");
      this.setStatusBar("light");
    }, // 初始化页面
	async buy(){
	  if (this.disableClick) {
                return;
            }
			this.disableClick = true;
			let direction="BUY";
			if(this.operateType=="2"){
			direction="SELL";
			}
	 let data = {
                userId: this.$store.state.userId,
                price: parseFloat(this.number),
                direction: direction,
                currency: this.tabList[this.curType].reName,
                payType: this.payacc
            };
			  if (!parseFloat(this.number)) {
                    this.Toast("请输入数量");
                    return;
                }
	let res = await this.$post1("otc/order/addOrder", data).then(res => {
                this.Toast.clear();
                // 延迟启用点击
                setTimeout(() => {
                    this.disableClick = false;
                }, 300);
                if (res && res.status == "SUCCEED" && res.result) {
                    //this.price = null;
                    //this.number = null;
                    setTimeout(ret => {
					 window.location.href =   res.result.link;
                        /*this.$router.push({
                            // path: `/quotes/quotesDetail?id=${id}`
                            path:  res.result.link,
                            query: {
                                type: "BUY",
                                orderPriceId: res.result.orderPriceId
                            }
                        });*/
                    }, 300);
                } else {
                    this.Toast(res.errorMessage);
                }
            }).catch(() => {
			setTimeout(() => {
                    this.disableClick = false;
                }, 300);
            });
  
	},
	  back() {
            
            this.$router.go(-1);
        },
	allPay() {
      if (this.payType == 2) {
        this.number = this.fabiBalance.fbBalance ;
      } else {
        this.number = this.fabiBalance.fbBalance ;
      }
    },
	switchPayType(n) {
            if (n == this.payacc) {
                return;
            }

            this.payacc = n;
        },
	 getBalances() {
            let data = {
                member: this.$store.state.userId,
                currency: this.tabList[this.curType].reName
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
		 getPrice() {
            this.$post1("otc/order/getPrice", {
                currency: this.tabList[this.curType].reName
            }).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.nowPrice = res.result;
                    this.initPrice = res.result;
                }
            });
        },
    //买卖切换
    operateEvent(num) {
      if (num == this.operateType) {
        return;
      }
      this.operateType = num;
      this.payType=2;
      this.number=null;
	  this.getBalances();
      this.getPrice();
    },
    //支付方式切换
    transEvent() {
      if (this.payType == 1) {
        this.payType = 2;
        return;
      }
      this.payType = 1;
      this.number=null;
    },
    //切换
    switchTab(type) {
      if (type == this.curType) {
        return;
      }
      this.curType = type;
    }
  },

  destroyed() {
    this.setnavBarBgColor("");;
    // this.setStatusBar("dark");
  }
};
</script>
<style lang="scss">
.assets {
  .van-tabs__line {
    background-color: #fbc400;
    height: 2px;
  }
  .van-tab--active {
    color: #fbc400;
  }
  .contentBox {
    .van-cell {
      padding: 15px 0 ;
    }
    
  }
  #contentBox{
    .van-cell:not(:last-child)::after{
      border:none!important;
    }
  }
  .van-button--info {
    color: #fff;
    background-color: #fbc400;
    border: 1px solid #fbc400;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";
.assets {
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
   .subTabList {
        display: flex;
        align-items: center;
        margin: 0 -15px;
        padding: 0 15px;
        height: 40px;
    }
  .topBox {
    color: #fff;
    padding: 15px 15px 0;
    margin: 0 -15px;
    height: 106px;
    background: #4880e5;
    .leftBoxs {
      display: flex;
      justify-content: center;
      position: relative;
      align-items: center;
      .span {
        font-size: 15px;
        color: rgba(255, 255, 255, 0.9);
        margin: 0 30px;
        &.cur {
          font-weight: 500;
          font-size: 16px;
        }
      }
      .iconBox {
        width: 15px;
        height: 15px;
        right: 10px;
        position: absolute;
      }
    }
  }
  .operationTab {
    // @include base-background-second();

    display: flex;
    border-radius: 5px;
    padding: 20px 15px 0;
    margin-top: -50px;
    justify-content: space-between;
    box-shadow: 0px 3px 11px 1px rgba(121, 121, 121, 0.09);
    font-size: 14px;

    .items {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 15px;
      position: relative;
      justify-content: center;
      font-size: 12px;
      .rename {
        font-size: 14px;
        margin-top: 5px;
      }
      &.cur {
        color: #fbc400;
        font-size: 13px;
        font-weight: 500;
        .rename {
          font-size: 15px;
          margin-top: 2px;
        }
        .borderb {
          background: #fbc400;
          transition: all 0.5s;
        }
      }
      .borderb {
        position: absolute;
        bottom: 0;
        width: 37px;
        height: 2px;
        border-radius: 1px;
        background: transparent;
      }
    }
  }
  .accountBox {
    margin: 0 -15px !important;
    padding: 0 15px;
    // border-bottom: 1px solid rgba(227, 227, 227, 0.2);
    .items {
      padding: 15px 0;
      height: 52px;
      position: relative;
      font-size: 15px;
      text-align: center;

      .borders {
        position: absolute;
        bottom: 0;
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
  .accountDetail {
    margin: 0 -15px;
    overflow-y: auto;
    .tops {
      padding: 10px 15px;
      background: #f8f7fd;
      .size12 {
        color: #666666;
      }
      .bottoms {
        margin-top: 5px;
        color: #444;
        font-size: 11px;
        .marks {
          font-size: 15px;
          color: #222222;
          margin-right: 8px;
        }
      }
    }
  }
  .contentBox {
    .payBox {
      .rightBox {
        color: #fbc400;
      }
    }
	 .leftBox {
                .items {
				margin-top:10px;
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
.c_blue{
    border-color: #fbc400;
    color: #fbc400;
}
}
</style>