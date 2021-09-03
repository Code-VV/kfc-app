<template>
  <div class='my_page'>
              <div>
            <div class="qiquan">
                <!-- 下单数量遍历 -->
                <div class="Quantity">
                    <button class="quanBtn" v-for="i in quantity" :key="i" :class="{'selectQuantity':i==selectQuantity}" @click="QuantityClick(i)">{{i}}</button>
                </div>
               <div class="kc">
                <div class="kyye">{{$t("qiquan.kyye")}}:{{Balances.toFixed(2)}} {{currency}}</div>
                <div class="kcsj">{{$t("qiquan.kcsj")}}:{{Time.toFixed(0)}}s</div>
               </div>
               <div v-if="this.$store.state.isLogin" class="zd_btn">
                   <button class="kanz" @click="kanz(0)">{{$t("qiquan.kz")}}</button>
                   <button class="kand" @click="kand(1)">{{$t("qiquan.kd")}}</button>
               </div>
               <div v-else class="zd_btn">
                   <button class="kanz" @click="nologin()">{{$t("qiquan.qxdr")}}！</button>
                   <button class="kand" @click="nologin()">{{$t("qiquan.qxdr")}}！</button>
               </div>
               <div v-if="this.$store.state.isLogin" class="List">
                   <div>
                        <div v-if="history==0" class="nolist">
                            <div>
                                {{$t("qiquan.zwsj")}}！
                            </div>
                        </div>
                        <div v-else>
                            <div class="mas">
                                <div>{{$t("qiquan.kcje")}}</div>
                                <div>{{$t("qiquan.ycfx")}}</div>
                                <div>{{$t("qiquan.ycjg")}}</div>
                                <div>{{$t("qiquan.jjsl")}}</div>
                            </div>
                        
                            <div v-for="i in history" :key="i.id" class="History">
                                <div class="one">
                                    <div>{{i.betAmount}}</div>
                                    <div>{{i.direction}}</div>
                                    <div>{{i.result}}</div>
                                    <div>{{i.rewardAmount}}</div>
                                </div>
                                <!-- <div class="two">
                                    <div></div>
                                    <div></div>
                                    <div></div>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="nolist">
                    <div>
                        {{$t("qiquan.zwsj")}}！
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import Qs from "qs"
import axios from 'axios';
import { Dialog } from 'vant';

export default {
  // import引入的组件需要注入到对象中才能使用
  data () {
    // 这里存放数据
    return {
            quantity:[10,50,100,500,1000,2000,5000,10000],
            //选中数量
            selectQuantity:10,
            //使用货币
            currency:'USTD',
            //当前交易对
            Trade:"BTC/USDT",
            // 开仓时间
            Time: 60,
            //后端设定时间
            closeTimeGap:60,
            // 余额
            Balances:10,
            //期数的id
            id:0,
            // 历史订单
            history:null,
            //当前语言
            lang:12,
    }
  },
  computed:{
  },
  components:{
        [Dialog.Component.name]: Dialog.Component,
  },
  props:{
      trade:String
  },
    methods:{
        //确认选择的数量
        QuantityClick(i){
        this.selectQuantity=i;
        console.log(this.selectQuantity);
        },
        // 发送请求 coin-list 能返回数组 每个数组里是每个交易对的信息   有可选的额度  交易对名称  交易对创建时间   当前的开盘时间 秒，收盘时间 秒 
        coinList(){//不需要参数
            this.$post("/option/coin/coin-list").then(res => {
                return res.data
         });
        },
        // 发送请求coin-info：能返回可选择的额度，当前交易对，当前选择的期权合约，当前的开盘时间 秒，收盘时间 秒
        coinInfo(da){//需要参数 参数是当前的交易对
            return this.$post("/option/coin/coin-info?symbol="+this.trade,Qs.stringify(da)).then(res => {
                let data={
                    amount:res.data.amount,
                    closeTimeGap:res.data.closeTimeGap
                }
                return data
         });
        },
        // 发送请求 opening  可以获取开始时间从而计算出剩余时间  还有开盘价  还有一个ID  和当前交易对
        opening(da){//需要参数
            return this.$post("/option/option/opening?symbol="+this.trade,Qs.stringify(da)).then(res => {
            // let nowtime = new Date()
              let data={
                //  开始到现在经过了多久d
                 time:this.closeTimeGap-(Date.parse(new Date())-(res.data[0].openTime))/1000,
             }
             console.log("a");
             return data
         });
        },
        // 用来获取余额
        getBalances(da){//参数是当前用户的userID
            let d={
                currency: "USDT",//这个请求是请求币币账户的
                member: da,
                balanceType: "BALANCE_BB"
            }
            return this.$get("/member/balance/getBalances?currency=USDT&member="+d.member+"&balanceType=BALANCE_BB",Qs.stringify(d)).then(res => {
              let data={
                  balance:res.result[0].balance
             }
             return data
         });
        },
        // 通过 add 来发送看涨看跌请求
        add(da){
        // 判断账号是否冻结
        this.changeData("Options")
        switch (this.lang) {
                case 'en':
                    this.lang = "en_US";
                    break;
                case 'zh':
                    this.lang = "zh_CN";
                    break;
                case 'zh_f':
                    this.lang = "zh_HK";
                    break;
            }
            let d={
                symbol: this.trade,//控制交易对
                direction: da,  //用来控制 买的是 涨还是跌
                optionId: this.id,// 这个是当前期数的ID
                amount: this.selectQuantity,  //控制买的数量
                // lang:this.lang,
            }
            console.log(this.lang);
            console.log(d.lang);
            console.log("0"+this.lang);
            return axios({
                url:"/option/order/add",
                method: 'post',
                headers:{
				"Content-Type":"application/x-www-form-urlencoded", //改这里就好了
                "lang":this.lang
                },
                data:Qs.stringify(d)//这是处理请求参数
            })
//             headers: {

//             'token': 'Bearer ',

//             "Cookie" : 'sessionId=' + sessionId + '; recId=' + recId

//         }
            // this.$post("http://api.egm666.cn/option/order/add?symbol=BTC/USDT&direction="+da+"&optionId="+this.id+"&amount="+this.selectQuantity,Qs.stringify(d)).then(res => { 
            //     let data={
            //         message:res.message
            //     }
            //     return data
            // })
        },
        // 获取当前的期数的 ID
        starting(){
             let d={
                "symbol": this.trade,//控制交易对
            }
            return this.$get("/option/option/starting?symbol="+this.trade,Qs.stringify(d)).then(res => {
                let data={
                    id:res.data[0].id
                }
                return data
            })
        },
        // 用来发送看涨请求
        kanz(direction){
            this.starting().then((res)=>{
                this.id=res.id
                console.log(res);
                this.add(direction).then((res)=>{
                console.log(res);
                // alert(res.message)
                // console.log(res.message);
                Dialog.alert({
                    message: res.message,
                    confirmButtonText:this.$t('tc.qd')
                    }).then(() => {
                    // on close
                    });
                // 看跌后需要重新获取余额
                this.getBalances(window.localStorage.getItem('userId')).then((res)=>{
                this.Balances=res.balance
                console.log(res.balance);

                this.History().then((res)=>{
                this.history=res.data.content
            })
            })
            })
            })
        },
        // 用来发送看跌请求
        kand(direction){
            this.starting().then((res)=>{
                this.id=res.id
                console.log(res);
                this.add(direction).then((res)=>{
                console.log(res);
                // alert(res.message)
                Dialog.alert({
                    message: res.message,
                    confirmButtonText:this.$t('tc.qd')
                    }).then(() => {
                    // on close
                    });
                // 看跌后需要重新获取余额
                this.getBalances(window.localStorage.getItem('userId')).then((res)=>{
                this.Balances=res.balance
                console.log(res.balance);

                this.History().then((res)=>{
                this.history=res.data.content
            })
            })
            })
            })
            
        },
        // 获取历史订单
        History(){
             let d={
                "symbol": this.trade,//控制交易对
                pageNo:0,
                pageSize:10
            }
            console.log("a");
            return axios({
                url:"/option/order/history?symbol="+this.trade+"&pageNo=0&pageSize=10",
                method: 'get',
                // headers:{
				// "Content-Type":"application/x-www-form-urlencoded" //改这里就好了
                // },
                data:Qs.stringify(d)
            })
        },
        langs(){
            let current = window.localStorage.getItem("currentLangue");
                if (current == null) {
                    // this.langueText = "简体中文";
                    this.lang="en"
                } else {
                    if (current == "en") {
                        // this.langueText = "English";
                        this.lang="en_US"
                    }
                    if (current == "zh") {
                        // this.langueText = "简体中文";
                        this.lang="zh_CN"
                    }
                    if (current == "zh_f") {
                        // this.langueText = "简体中文";
                        this.lang="zh_HK"
                    }
                }
        }
        

  },
    watch:{
        // 控制时间倒计时，倒计时为0的时候 发送请求获取历史订单 并且重置时间
        Time:function(){
            if(this.Time===0){
                this.Time=this.closeTimeGap

                this.History().then((res)=>{
                this.history=res.data.content
                    })
                this.getBalances(window.localStorage.getItem('userId')).then((res)=>{
                this.Balances=res.balance
                console.log(res.balance);
                })
            }
            if(this.Time<0){
            this.opening(data).then((res) => {
                // 开始了多久
                this.Time=res.time
                // console.log(res.time,"!!!!!!!!!!!!!!!");
                
        });
            }
        }
        }
    ,
    // 路由的生命周期
     mounted(){
        let data={
             symbol:this.trade
        };
        // console.log(this.$store.state.isLogin+"!!!!!!!!!!!!!!!!");
        // console.log("开始");
        this.coinInfo(data).then((res)=>{
            // 可选择的额度
            // console.log(res.amount);
            // 开盘时间 秒
            // console.log(res.closeTimeGap);
            this.closeTimeGap=res.closeTimeGap
            this.quantity=res.amount.split(',');
            this.selectQuantity=this.quantity[0]
        });
        this.opening(data).then((res) => {
            // 开始了多久
            this.Time=res.time
            // console.log(res.time,"!!!!!!!!!!!!!!!");
            
        });
        window.setInterval(()=>{
            this.Time--
            // console.log(this.Time);
        },1000);
        // console.log("结束");
        if(this.$store.state.isLogin){
            this.getBalances(window.localStorage.getItem('userId')).then((res)=>{
                this.Balances=res.balance
                console.log(res.balance);
            })
            this.History().then((res)=>{
                this.history=res.data.content
            })
        }
        this.langs()
    }
}
</script>

<style lang="scss">
div.qiquan{
    // height: 500px;
}
div.Quantity{
    width: 100%;
    display: flex;
}
button.quanBtn{
    // width: 80px !important;
    // height: 40px !important;
    flex: 1;
}
div.qiquan div.Quantity button{
    width: 100px;
    height: 50px;
    margin: 20px 0;
    border: 1px solid rgba(94, 88, 86, 0.753);
    background:#12192d;
}
div.qiquan div.Quantity button.selectQuantity{
    border: 1px solid rgb(241, 223, 55);
    color: rgb(241, 223, 55);
    // width: 40px;
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


div.List{
    margin-top: 20px;
}
div.nolist{
    height: 110px;
    text-align: center;
}
div.nolist div{
    margin-top: 50px;
}
div.mas{
    display: flex;
}
div.mas div{
    flex: 1;
    width: 80px;
}
div.History div.one{
    display: flex;
}
div.History div.one div{
    flex: 1;
}

</style>
