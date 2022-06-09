<template>
  <div class="contractItem">
    <!-- {{nowCoinInfo.nowPrice}} -->
    <div class="titleBox flex-between bor_b c666">
      <!-- 普通委托 -->
      <!-- <span v-if="type=='entrust'"> -->

      <!-- 已成交 -->
    
      <span v-show="currentHistoryType=='1'" >
         <!-- 判断奇数为 平仓前单子 -->
          

          <!-- 绿色  多单  平空 -->
          <!-- 红色  空单  平多 -->
         
          <span v-show="list.tradeType=='OPEN_UP'" class="green_text ">
            <span :class="xiabiao%2==0?'':'red_text'">
               {{xiabiao%2==0?'多单':(list.closeType=='BURST'?'多强平':'平多')}} {{list.pairsName}}永续 {{list.leverNum | toFixed(2)}}X
            </span>

            </span>

          <span v-show="list.tradeType=='OPEN_DOWN'" class="green_text ">
            <span :class="xiabiao%2==0?'red_text':''">
              {{xiabiao%2==0?'空单':(list.closeType=='BURST'?'空强平':'平空')}} {{list.pairsName}}永续 {{list.leverNum | toFixed(2)}}X
            </span>

          </span>
      </span>
        <!-- 其他 -->
       <span v-show="currentHistoryType!='1'" >
          <span v-show="list.tradeType=='OPEN_UP'" class="green_text ">多单 {{list.pairsName}}永续 {{list.leverNum | toFixed(2)}}X</span>
          <span v-show="list.tradeType=='OPEN_DOWN'" class="green_text red_text">空单 {{list.pairsName}}永续 {{list.leverNum | toFixed(2)}}X</span>
      </span>
      <!-- 持仓 -->
      <!-- <span v-else>
         <span v-show="list.tradeType=='OPEN_UP'" class="green_text ">多单 {{list.pairsName}}永续 {{list.avgLevel | toFixed(2)}}X</span>
         <span v-show="list.tradeType=='OPEN_DOWN'" class="green_text red_text">空单 {{list.pairsName}}永续 {{list.avgLevel | toFixed(2)}}X</span>
      </span> -->

      <span v-if="type=='entrust'">
        <span v-if="subType=='revoke'">已撤销</span>
        <span v-else>未成交</span>
      </span>
      <img
        @click="shareFun(list,false)"
        src="../assets/images/home/share.png"
        class="share"
        v-if="type!='entrust'&&type!='history'"
      />
    </div>
    <div class="bor_b">
      <div v-if="type=='entrust'||type=='history'">
        <van-row gutter="20" class="lists c666">
          <van-col span="8" class="markers">

            <div v-show="type=='entrust'" >{{list.contractHands | SubString(4)}}</div>  
            <div v-show="type=='history'"  :class="currentHistoryType==2?'':'bold_num size14'">{{list.contractHands | SubString(4)}}</div>  
            
            <!-- 撤销的 -->
            <div v-if="currentHistoryType==2" class="mar_t_6">委托数量</div>
            <div v-else class="mar_t_6">{{type=='entrust'?'委托数量':'成交数量'}}</div>
          </van-col>
          <van-col span="8" class="center_text">
        <!-- // console.log(this.xiabiao) -->
            <!-- xiabiao 为 0 是其他的，因为默认0 如果1 起步 说明 已成交的 -->
            <!-- 1.其他 -->
            <div v-if="xiabiao==0">{{list.price|SubStringZreo(4)}}</div> 
            <!-- 2.历史记录的 已成交 -->
            <div v-else>
                <!-- 判断奇数为 平仓前单子 -->
            

                 <div  :class="type=='history'?'bold_num size14':''">
                    <span v-if="xiabiao%2==0">{{list.price|SubStringZreo(4)}}</span>
                    <span v-else>{{list.matchPrice|SubStringZreo(4)}}</span>
                </div>  

            </div> 
                <!-- 撤销的 -->
           
            <div v-if="currentHistoryType==2" class="mar_t_6">委托价格</div>
            <div v-else class="mar_t_6">{{type=='entrust'?'委托价格':'成交价格'}}</div>
          </van-col>
          <van-col span="8" class="right_text markers">

            <div :class="type=='history'?'bold_num size14':''">

                <div v-if="list.matchFee=='--'" class="dark_text">
                  --
                </div>

                <div v-else>
                  <div
                    v-if="type=='history'"
                    :class="list.matchFee>0?'green_text':list.matchFee<0?'orange_text':'dark_text'"
                  >
                    <span v-if="xiabiao%2==0" class="c333">
                      --
                    </span>
                    <span v-else>
                      {{list.matchFee|toFixedRate(2)}}
                    </span>
                  </div>
                  <div v-else>0</div>
                </div>

            </div>
          
            <div class="mar_t_6" v-if="type=='history'">盈亏</div>
            <div class="mar_t_6" v-else>已成交</div>
          </van-col>
        </van-row>
      </div>
      <div v-else>

        <van-row gutter="20" class="lists size15 c666">
          <van-col span="8" class="c222 bold">{{list.avePrice|SubStringZreo(4)}}</van-col>
          <van-col span="8" class="center_text" :class="list.unProfitLoss>0?'c_green':'c_red'">{{list.unProfitLoss>0?'+':''}}{{list.unProfitLoss|SubStringZreo(4)}}</van-col>
          <van-col span="8" class="right_text " :class="list.profitUp>0?'c_green':'c_red'">{{list.profitUp>0?'+':''}}{{list.profitUp*100|SubStringZreo(2)}}%</van-col>
        </van-row>

        <van-row gutter="20" class="lists mar_t_6 c666">
          <van-col span="8" class="markers">持仓均价</van-col>
          <van-col span="8" class="center_text">未实现盈亏</van-col>
          <van-col span="8" class="right_text markers">收益率</van-col>
        </van-row>
      </div>
      <div class="lists c666">
        <!-- 当前委托 -->
        <div class="tableBox" v-if="type=='entrust'">
          <!-- <div class="items">
            <span>止盈价格</span>
            <span class="markers">{{list.triggerPrice|SubString(4)}}</span>
          </div>
          <div class="items">
            <span>止损价格</span>
            <span class="markers">{{list.ordPrice|SubString(4)}}</span>
          </div> -->
          <div class="items">
            <span>可撤销手数</span>
            <span class="markers">{{list.isContractHands}}</span>
          </div>
          <div class="items">
            <span>时间</span>
            <span class="markers">{{list.updateTime | yndhms}}</span>
          </div>
        </div>
        <!-- 历史  -->  
        <div class="tableBox" v-else-if="type=='history'">
          <div class="items">
            <span>手续费</span>
            <!-- <span class="markers">{{0.00451|SubString(4)}}</span> -->
            <span v-if="currentHistoryType==2" class="markers">{{0| SubString(4)}}</span>
            <span v-else class="markers">{{list.takeFee| SubString(4)}}</span>
            
          </div>
          <div class="items">
            <span>方式</span>
            <!-- 第二行 -->
            <span v-if="xiabiao%2==0" class="markers">{{list.priceType=='CUSTOM_PRICE'?'限价':'市价'}}</span>
            <!-- 第一行 -->
            <span v-else class="markers">市价</span>
            
          </div>
          <div class="items " style="padding-right:0">
            <span>成交时间</span>
            
            <span v-if="xiabiao%2==0" class="markers">{{list.createTime | yndhms}}</span>
            <span v-else class="markers">{{list.updateTime | yndhms}}</span>
          </div>
        </div>
        <div class="tableBox" v-else>
          <div class="items">
            <span>预估强平价</span>
            <span v-if="list.forcePrice<=0" class="markers">--</span>
            <span v-else class="markers">{{list.forcePrice|toFixed(4)}}</span>
          </div>
          <div class="items">
            <span>手数</span>
            <span class="markers">{{list.hands}}</span>
          </div>
          <div class="items">
            <span>占用保证金</span>
            <span class="markers">{{list.margin|SubStringZreo(4)}}</span>
          </div>
          <div class="items">
            <span>维持保证金率</span>
            <span class="markers">{{ensure *100|SubStringZreo(2)}}%</span>
          </div>
          <div class="items">
            <span>止盈价格</span>
            <span class="markers">{{list.triggerPrice|SubStringZreo(4)}}</span>
          </div>
          <div class="items">
            <span>止损价格</span>
            <span class="markers">{{list.ordPrice|SubStringZreo(4)}}</span>
          </div>
          <!-- <div class="items">
            <span>止盈手数</span>
            <span class="markers">{{list.triggerNum}}</span>
          </div>
          <div class="items">
            <span>止损手数</span>
            <span class="markers">{{list.ordNum}}</span>
          </div> -->
        </div>

        <div class="columLines"></div>
      </div>
    </div>

    <div  v-if="type!='history'&&subType!='revoke'">
        <!-- 普通委托 -->
      <div v-if="type=='entrust'" class="tabBox1">
              <!-- 
              <div class="items" >
                <img src="../assets/images/home/transaction_4.png" alt class="imgs" />
                <p class="name">撤销</p>
              </div> -->
              <div class="btn" @click="chedan(list)">
                撤单
              </div>


      </div>
      <!-- 持仓列表 -->
      <div v-else >
        <div v-if="currentHistoryType==3" class="tabBox">


        </div>
        <div v-else class="tabBox c444">

         <div class="items" @click="pingcang(list)">
            <img src="../assets/images/home/transaction_1.png" alt class="imgs" />
            <p class="name">平仓</p>
          </div>
          <div class="items" @click="zhingying(list)">
            <img src="../assets/images/home/transaction_2.png" alt class="imgs" />
            <p class="name">止盈</p>
          </div>
          <div class="items" @click="zhisun(list)">
            <img src="../assets/images/home/transaction_3.png" alt class="imgs" />
            <p class="name">止损</p>
          </div>


        </div>

      </div>
    

    </div>

    <div class="darkLine"></div>



    <van-popup v-model="show" style="background:none">
      <div class="wrap">
        <div v-show="iszhiying" class="size17 c333 a_center hei60 linehei60 ">
            止盈
        </div>
         <div v-show="!iszhiying" class="size17 c333 a_center hei60 linehei60">
            止损
        </div>
        <div class="hei20"></div>
        <van-row class="pad_l_r_15 hei38 linehei38 size14">
          <van-col :span="12" class="c333">
            <span v-show="iszhiying">止盈触发价格</span>
            <span v-show="!iszhiying">止损触发价格</span>
          </van-col>
          <van-col :span="12" >
            <input v-model="price" placeholder="价格" class="size14 pad_l_8 input3 c666" type="number" />
          </van-col>
        </van-row>


         <van-row class="pad_l_r_15 hei40 linehei30  size14 c333">
          <van-col :span="12">
            <span >当前价格：</span>
          </van-col>
          <van-col :span="12" >
            <span>{{nowCoinInfo.nowPrice | SubStringZreo(4)}}</span>
          </van-col>
        </van-row>

 


        <van-row class=" hei40 linehei40 size14 a_center bor_t">
          <van-col :span="12">
            <div @click="show=false" class="c333">取消</div>
            
          </van-col>
          <van-col :span="12" class="c_blue bor_l" >
            <div @click="ok(iszhiying)">确定</div>
            
          </van-col>
        </van-row>

        

      </div>
    </van-popup>


<!-- share 分享 -->
<!-- <van-overlay :show="show" @click="show = false" /> -->
<van-overlay :show="shareShow" @click="shareShow = false">
  <div class="share_wrap" @click.stop>
     

     <div class="con" >

        <div class="content_share a_re">
          <!-- <img src="./../assets/images/share/share_bg8.png" alt=""  style="width:100%;height:100%;z-index:1"> -->
          <div class="close_ahow" @click="shareShow=false">
            <img class="hei20 wid20" src="./../assets/images/share/close.png" alt="">
          </div>

          <div class="numdata ">
            <div class="list_data">
                <div class="title_allen">
                  {{profitUp>=0?('+' + (profitUp*100).toFixed(2)):((profitUp*100).toFixed(2))}}%
                </div>
                <van-row style="color:#6561F1" class="size12 pad_t_10">
                  <van-col :span="10">合约</van-col>
                  <van-col :span="7">开仓均价</van-col>
                  <van-col :span="7" class="right_text">最新价</van-col>
                </van-row>

                <van-row style="color:#2F2BCD;font-weight:600" class="size14 pad_t_6">
                  <van-col :span="10">{{pairsName}}永续</van-col>
                  <van-col :span="7">{{avePrice | toFixed(2)}}</van-col>
                  <van-col :span="7" class="right_text">{{closePrice | toFixed(2)}}</van-col>
                </van-row>
            </div>
  
          </div>

          <div class="a_ab bottom23 right60">
              <img  class="wid55 hei55" :src="code_img" alt="">
          </div>
          
        </div>

      </div>
      <div class="btn2" @click="shareFun(list,true)">
          <div class="btn_share">
            保存到相册
          </div>
      </div>
    

    </div>
     
</van-overlay>

   <canvas id="shareCanvas"  class="canvas" v-show="false"></canvas>
   
       <div v-if="welCode!=''">
          <vue-qr
          :text="'https://api.sytog.me/reg.html#/register?code='+welCode"
          :size="220"
          class="qrcode"
             :logoSrc='src2'
            :logoScale='30'
          :callback="qrcodeCallback"
          v-show="false"
        ></vue-qr>
        </div>

  </div>
</template>
<script>
import { mapState } from "vuex";
import $ from 'jquery'
import vueQr from "vue-qr";

export default {
  components:{
    vueQr
  },
  props: {
    ensure:{
      type:Number,  //保证金率
      default: 0
    },
        xiabiao:{
      type:Number,  // 下标
      default: 0
    },
    
    list: {
      type: Object,
      default: {}
    },
    type: {
      type: String, //entrust委托,history历史
      default: ""
    },
    subType: {
      type: String, //'contractType'全部类型，entrust委托，revoke撤销
      default: ""
    },
    currentHistoryType:{  // 1 已成交
      type: String,
      default: ""
    }
  },
  data() {
    return {
      src2:require('../assets/images/logo.png'),
      quickMark:'',
      welCode:'',
      show:false,
      price:'',
      // 分享
      avePrice:'',
      pairsName:'',
      closePrice:'',
      profitUp:0,
      code_img:'',

  
      iszhiying:true,
      nowCoinInfo:{
        volume: 0,
        nowPrice: 0,
        lowPrice: 0,
        chPrice: 0,
        higPrice: 0,
        updown: 0,
        open: 0,
      
      },
        shareShow:false,
        CANVAS:null,
    };
  },
  watch:{

    price(val){
      val = String(val)
      if(val.indexOf('.') !=-1){
         let len = val.split('.')[1].length;
         if(len>4){
           // console.log(len)
           this.price = val.substring(0,val.length-1)
         }
      }
    }
  },
  created(){
        // console.log(this.xiabiao)

    
   


     this.$hub.$on('close',res=>{
       this.close()
     })

      // 当前币种行情

    this.$hub.$on('nowCoinInfo',res=>{
       this.nowCoinInfo = res
     })



           this.$get('member/member/getMember',{
                  member:this.$store.state.userId
              }).then(res=>{
                  if(res.status=="FAILED"){
                    this.Toast(res.errorMessage)
                  }else if(res.status=="SUCCEED"){
                    this.welCode =   res.result.welCode;
                  }
              })

   

  },

  methods: {
       // 生成二维码路径
    qrcodeCallback(dataUrl, id) {
   
      this.quickMark = dataUrl || "";
    },
    setStyle(){
          if(this.$store.state.nowThemeInfo=='night-theme'){
              $('.contractItem').find('.wrap').css('background-color', this.$bg_night)
          }else{
              $('.contractItem').find('.wrap').css('background-color','#fff')
          }
          setTimeout(()=>{
             if(this.$store.state.nowThemeInfo=='night-theme'){
                  $('.contractItem').find('.wrap').css('background-color', this.$bg_night)
              }else{
                  $('.contractItem').find('.wrap').css('background-color','#fff')
              }
          },100)
    },
    pingcang(list){
     this.$emit('res',list,'MATCH')
    },

    zhingying(){
       this.iszhiying = true;
       this.price = '',
       this.show = true;
       setTimeout(() => {
           this.setStyle()
       }, 100);
     
    },

    zhisun(){
       this.iszhiying = false;
       this.price = '',
       this.show = true;
        setTimeout(() => {
           this.setStyle()
       }, 100);


    },
    close(){
    
      this.show = false;
    },
    ok(v){
       let nowPrice = this.nowCoinInfo.nowPrice;
        if(this.price==''|| this.price==0){
          this.Toast('请输入价格')
          return
        }
        if(v){  //止盈
           // console.log(this.list)
           if(this.list.tradeType=='OPEN_UP'){  //开多  买
              if(this.price<=nowPrice){
                this.Toast('止盈价格必须大于当前市价')
              }else{
                this.$emit('res',this.list,'TRIGGER',this.price)
              }
           }else{ //空 卖
              if(this.price >= nowPrice){
                this.Toast('止盈价格必须小于当前市价')
              }else{
                this.$emit('res',this.list,'TRIGGER',this.price)
              }
           }
        
        }else{ //止损
          if(this.list.tradeType=='OPEN_UP'){  //开多  买
             if(this.price >= nowPrice){
                this.Toast('止损价格必须小于当前市价')
              }else{
                this.$emit('res',this.list,'ORD',this.price)
              }
           }else{ //空 卖
              if(this.price<=nowPrice){
                this.Toast('止损价格必须大于当前市价')
              }else{
                this.$emit('res',this.list,'ORD',this.price)
              }
           }

          // this.$emit('res',this.list,'ORD',this.price)

        }
    },
    // 撤单
    chedan(item){
      this.$emit('res',item,'CHEDAN')

    },
    // share
    shareFun(data,save){

     
      // console.log(data)
      //  // console.log(data);
      this.shareShow = true;
      let _this = this;
     
      this.avePrice = data.avePrice;
      this.pairsName = data.pairsName;
      this.profitUp = data.profitUp;
      // this.closePrice = data.closePrice
      this.$get("data/data/getCoinInfo", {
        pairsName:this.pairsName
      }).then(res => {
        if (res && res.status == "SUCCEED") {
          let data = res.result;
          _this.closePrice = JSON.parse(data).nowPrice;
          _this.shareShow = true;
        
               _this.$get('member/member/getMember',{
                  member: _this.$store.state.userId
              }).then(res=>{
                  if(res.status=="FAILED"){
                    _this.Toast(res.errorMessage)
                  }else if(res.status=="SUCCEED"){
                    let codeImg = _this.quickMark;
                
                    _this.code_img = codeImg;
                      
                      if(save){
                         _this.getCanvas(_this.pairsName,_this.avePrice,_this.closePrice,codeImg, _this.profitUp);
                      }

                      
                  }
              })
          
        

        }
      });
    },

    // getERcode(){
    //      this.saveImage(data.profitUp)
    // },



    getCanvas(pairsName,avePrice,closePrice,img_code,sy){
     
      this.saveImage(pairsName,avePrice,closePrice,img_code,sy)

    
    },
        //生成海报
    saveImage(pairsName,avePrice,closePrice,img_code,sy) {
      var _this = this;
      var m = document.documentElement;
      // this.$util.showLoading("图片生成中...");
      var width =
        ((parseFloat(window.getComputedStyle(m).fontSize) * 10) / 375) * 2;
      var canvas = document.getElementById("shareCanvas");
      canvas.width = 375 * width;
      canvas.height = 590 * width;
      var ctx = canvas.getContext("2d");
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);


      var imgs = new Image();
      var srcImg = require("./../assets/images/share/share_bg8.png") // 背景图片
      imgs.src = srcImg;
      imgs.onload = function() {
        ctx.drawImage(imgs, 0, 0, canvas.width, width * 572);
        var img1 = new Image(); //二维码
        img1.src = img_code;
        img1.onload = function() {
          ctx.drawImage(img1, width * 250, width * 480, width * 55, width * 55);
          // var img2 = new Image();
          // img2.src = require("./../assets/images/share/share_bg8.png")
          // img2.onload = function() {
          //   ctx.drawImage(
          //     img2,
          //     width * 304,
          //     width * 597,
          //     width * 55,
          //     width * 55
          //   );
          //   // _this.saveImg(canvas, type);
          // };
          
            // 文字
      
   
            ctx.font = "bold normal " + 36 * width + "px sans-serif";
            ctx.fillStyle = "#2F2BCD";
            let shouyi = (sy<0?(sy*100).toFixed(2):('+' +(sy*100).toFixed(2))) + '%';
            ctx.fillText(shouyi, width * 110, 350 * width);

           
            ctx.font = "normal " + 12 * width + "px sans-serif";
            ctx.fillStyle = "#6561F1";
            ctx.fillText( "合约", width * 40, 395 * width );

               ctx.font = "normal " + 12 * width + "px sans-serif";
            ctx.fillStyle = "#6561F1";
            ctx.fillText( "开仓均价", width * 160, 395 * width );

               ctx.font = "normal " + 12 * width + "px sans-serif";
            ctx.fillStyle = "#6561F1";
            ctx.fillText( "最新价", width * 290, 395 * width );

              
            ctx.font = "normal " + 14 * width + "px sans-serif";
            ctx.fillStyle = "#2F2BCD";
            ctx.fillText( pairsName + "永续", width * 40, 425 * width );

               ctx.font = "normal " + 14 * width + "px sans-serif";
            ctx.fillStyle = "#2F2BCD";
            ctx.fillText( avePrice, width * 160, 425 * width );

               ctx.font = "normal " + 14 * width + "px sans-serif";
            ctx.fillStyle = "#2F2BCD";
            ctx.fillText( closePrice, width * 290, 425 * width );

         
            _this.saveImg(canvas)


        }; //图片加载完成再执行
      };
    },
    //保存图片
    saveImg(canvas) {
     
      // console.log(canvas)
      // return false

     
      this.$util.showLoading("图片保存中...");
      var _this = this;
      var imgsrc = canvas.toDataURL("image/png");
      imgsrc = imgsrc.replace("data:image/png;base64,", "");

      if (this.$util.confirmPer("photos", "存储")) {
        var trans = api.require("trans");
        var imgName = "share" + Math.random() * 10 + ".png";
        trans.saveImage(
          {
            base64Str: imgsrc,
            imgPath: "fs://BitFutres/",
            album: true,
            imgName: imgName
          },
          function(ret, err) {
            _this.Toast.clear();
            if (ret.status) {
                _this.Toast("保存图片成功");
            } else {
                _this.Toast("保存图片失败，请重试");
            
            }
          }
        );
      } else {
        _this.Toast.clear();
      }
    },

  },
  mounted() {
    this.setStyle()
  },
  computed: {}
};
</script>

<style>
/* 分享 样式 */
.share_wrap {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  height: 80%;

    padding-top:100px;

}

.share_wrap  .con {
  width: 100%;
  max-width: 600px;
  padding:55px 15px 0 15px;
  flex: 1;
}
.share_wrap  .con .content_share{
 
  position: relative;
  height: 460px;
  background:url('./../assets/images/share/share_bg8.png') no-repeat ;
  /* background:green; */
  background-size:100% 100%;

  padding-top:255px;
}
.share_wrap  .con .content_share .close_ahow{
  position: absolute;
  top:-6px;
  right:-6px;
}
.share_wrap  .con .content_share  .numdata{
  height:115px;
  padding:0px 40px;
}
.share_wrap  .con .content_share  .numdata .list_data{
  /* background: #ff0; */
  height:100%;
}
.share_wrap  .con .content_share  .numdata .list_data .title_allen{
   font-size: 36px;
   color:#2F2BCD;
   font-weight: 600;
   text-align: center

}




.share_wrap  .btn2 {
    width: 100%;
    max-width: 600px;

    padding:15px;
}
.share_wrap  .btn2 .btn_share{

    height:50px;
    line-height: 50px;
    text-align: center;
    background:linear-gradient(0deg,rgba(43,57,209,1),rgba(30,183,239,1));
    border-radius:25px;
    font-family:PingFang SC;
    font-weight:400;   
    font-size: 16px;
    color: #fff;
}

</style>
<style lang="scss">
.contractItem {
  .van-cell {
    padding-left: 0;
    padding-right: 0;
    font-size: 11px;
  }
  .van-cell__title {
    color: #666666;
  }
  .van-cell__value {
    color: #222222;
  }
}
</style>
<style lang="scss" scoped>
@import '@/assets/scss/theme.scss';
  
.contractItem {
   .bold_num{
     font-weight: 700
   }
       .wrap{
    width:80vw;
    height:200px;
      // @include base-background();
    border-radius: 10px;
    .input3{
      outline: none;
      border: 1px solid #e3e3e3;
      border-radius: 5px;
       @include base-background();
      width:100%;
      &:focus{
        border: 1px solid $blue
      }
    }

  }
   



  .titleBox {
    align-items: center;
    // border-bottom: 1px solid rgba(227, 227, 227, 0.2);
    font-size: 13px;
  
    padding: 15px 0;
    .green_text {
      font-weight: 500;
      font-size: 16px;
    }
    .share {
      width: 21px;
      height: 21px;
    }
  }
  .listContent {
    padding: 12px 0;
    // border-bottom: 1px solid rgba(227, 227, 227, 0.2);
    .lists {
      font-size: 11px;
     
      position: relative;
      .columLines {
        position: absolute;
        width: 1px;
        top: 23px;
        bottom: 5px;
        left: 50%;
        background: rgba(227, 227, 227, 0.2);
      }
      .markers {
        // color: #222222;
      }
    }
    .tableBox {
      padding: 12px 0 5px;
      display: flex;
      flex-wrap: wrap;

      .items {
        margin-top: 11px;
        display: flex;
        width: 50%;
        justify-content: space-between;
        &:nth-child(odd) {
          padding-right: 15px;
        }
        &:nth-child(even) {
          padding-left: 15px;
        }
      }
    }
  }
  .tabBox {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
  
    font-size: 13px;
    .items {
      display: flex;
      width: 33.3%;
      justify-content: center;
      .imgs {
        width: 21px;
        height: 21px;
        margin-right: 5px;
      }
    }
  }

    .tabBox1 {
    padding: 10px 0;
    display: flex;
    justify-content:flex-end;
    color: #444444;
    font-size: 13px;
    .btn{
      width:60px;
      height:25px;
      border:1px solid #499C7A;
      border-radius:3px;
      text-align: center;
      line-height: 25px;
      color:$blue
    }
    .items {
      display: flex;
      width: 33.3%;
      justify-content: center;
      .imgs {
        width: 21px;
        height: 21px;
        margin-right: 5px;
      }
    }
  }
}
</style>
