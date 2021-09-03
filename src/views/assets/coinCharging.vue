<template>
    <div class="coinCharging container_common">
        <form id="audit">
        <div class="chooseCoin c222">
            <van-cell :title="i18n.bz" is-link :value="currency" to="/assets/chooseCoin"/>
        </div>
        
        <div class="addressPic1" v-if="currency=='USDT'">
            <van-cell :title="i18n.lm" is-link @click="selectHandle">
                <span slot="default">{{names}}</span>
            </van-cell>
        </div>
        <div class="addressPic">
            <p class="title c222">{{i18n.ndcbdz}}</p>
            <!-- <img src="../../assets/images/home/qrcode.png" alt class="qrcode" /> -->
            <vue-qr :text="copyAddress" :size="220" class="qrcode" :callback="qrcodeCallback"></vue-qr>
            <!--保存二维码-->
            <!-- <span class="savePicBtn bor_t c222" @click="savePic">{{i18n.bcewm}}</span>-->
            <textarea style="text-align: center" id="target" name="toAddress" type="text" readonly class="num c333" :value="copyAddress"></textarea>
            <!-- <button class="savePicBtn bor_t c222" data-clipboard-action="copy"  data-clipboard-target="#target" v-if="copyAddress" @click="copythat(copyAddress)">
                    {{i18n.fzdz}}
            </button> -->
            <button class="savePicBtn bor_t c222" v-clipboard:copy="copyAddress" v-clipboard:success="onCopy" v-clipboard:error="onError" v-if="copyAddress">
                    {{i18n.fzdz}}
            </button>
            <!-- v-clipboard:copy="message"

v-clipboard:success="onCopy"

v-clipboard:error="onError" -->
            <button class="savePicBtn bor_t c222" v-else>{{i18n.fzdz}}</button>
        </div>
        <input type="hidden" name="currency" v-model="currency">

           <!-- <van-cell-group class="withdrawCoinForm c222">
                <van-field v-model.trim="address" center clearable :label="i18n.tbdz" :placeholder="i18n.qsrtbdz">
                    <img src="../../assets/images/home/scan.png" alt srcset slot="right-icon" class="scan" @click="openScan" />
                </van-field>
                <van-field v-model.trim="coinNum" center clearable type="number" :label="i18n.sl" :placeholder="i18n.zdtbsl+wallets.money+currency">
                    <span slot="right-icon" class="allCoinNum" @click="allCoinNum">ssss</span>
                </van-field>
            </van-cell-group>-->
       <!-- <div class="addressPic">
            充值数量:
            <input name="amount"  type="number" v-model="amount"/>
        </div>
        <div class="addressPic">
            充币地址:
            <input name="fromAddress" v-model="fromAddress"/>
        </div>
        -->
        </form>
        <!--充值数量：-->
        <van-field v-model.trim="amount" center clearable :label="i18n.sl" :placeholder="i18n.amountPlaceholder"></van-field>
        <!--钱包地址：-->
        <!-- <van-field v-model.trim="fromAddress" center clearable :label="i18n.dz" :placeholder="i18n.myNdcbdzPlaceholder"></van-field> -->
        <span class="Font">{{$t('add.qscpz')}}</span>
        <div class="addressPic">
          <div v-if="imgshow" class="boxpzimg">
            <img class="pzimg" :src="img" alt="" @click="showbigimg()">
            <van-popup v-model="bigImgShow"><img class="pzimg" :src="img" alt=""></van-popup>
          </div>
          <van-uploader v-else :after-read="afterRead" />
          <!-- <img :src="" alt=""> -->
        </div>
        <div class="addressPic">
            <button type="button" id="saveAudit" @click="ssaveAudit()">{{$t('recharge.tjsh')}}</button>
        </div>
        <!-- <div class="tipDetail">
            <p>{{i18n.zxczje}}{{min_rechange_value}}{{currency}}{{i18n.bhdz}}</p>
            <p>{{i18n.qwcz}}{{currency}}{{i18n.bkzh}}</p>
            <p>{{i18n.qqb}}</p>
            <p>{{i18n.zxczje}}{{min_rechange_value}}{{currency}}{{i18n.bhdz}}</p>
        </div> -->
        <!-- 联系客服 -->
        <!-- <div class="customer-service c222">
            <div class="tit">{{i18n.qlxkf}}</div>
            <div class="tit flex-center" @click="copythat('FVT213')">
                <div class="i-block">
                    {{i18n.wxh}}<span class="color-red">FVT213</span>
                    <img src="../../assets/images/user/fuzhi.png" class="img" />
                </div>
            </div>
            <img class="img" src="../../assets/images/customerService.png" alt="" @click="check" />
        </div> -->
        <!-- 放大 -->
        <!-- <div v-if="isShow" class="check" @click="check">
            <img class="img" src="../../assets/images/customerService.png">
        </div> -->

        <van-action-sheet v-model="isSelect" :actions="actions" :cancel-text="i18n.qx" title @cancel="onCancel"
                          @select="onSelect" color="”#fbc400“"/>
        <van-dialog v-model="popShow" class="transactionPop c333" :title="i18n.cztx" :showConfirmButton="false"
                    show-cancel-button :cancelButtonText="i18n.wzdl">
            <div class="pad_15">
                {{i18n.sxfsqfs}}
                <span class="orange_text">{{i18n.czje}}{{min_rechange_value}}{{currency}}</span> {{i18n.bndz}}
            </div>
        </van-dialog>
        <!-- <button @click="cs()">按钮</button> -->
    </div>
</template>

<script>
import {
  mapActions
} from 'vuex'
import assetItem from '../../components/assetItem'
import vueQr from 'vue-qr'
import axios from "../../axios/index";
import { ImagePreview } from 'vant';
export default {
  components: {
    assetItem,
    vueQr
  },

  data () {
    return {
      //上传成功后显示对应的图片
      imgshow:false,
      //大图是否展示
      bigImgShow:false,
      //上传成功后返回img地址
      img:null,
      // 显示大图
      isShow: false,
      currency: 'USDT', //当前币种
      copyAddress: '',//TO充值地址

        amount:'',//充值数量
        fromAddress:'',//FORM充值地址   后修改为img地址
      saveImg: '',
      isSelect: false, // 弹框
      names: 'ERC20',
      actions: [
      //   {
      //   name: 'OMNI'
      // },
      {name: "ERC20"},
          {name: "TRC20"}
        // { name: "系统" },
        // { name: "转入" },
        // { name: "转出" }
      ],
      popShow: false,
      min_rechange_value: 0, // 最小充币数
      rechangeList: [{
        name: 'BTC',
        value: 0.001
      },
      {
        name: 'ETH',
        value: 0.01
      },
      {
        name: 'EOS',
        value: 0.5
      },
      {
        name: 'BCH',
        value: 0.01
      },
      {
        name: 'LTC',
        value: 0.01
      },
      {
        name: 'DASH',
        value: 0.01
      },
      {
        name: 'XRP',
        value: 10
      }
      ]
    }
  },
  computed: {
    i18n () {
      return this.$t('coin')
    },
    userId () {
      return this.$store.state.userId
    },
    chooseCurrency () {
      return this.$store.state.chooseCurrency
    }
  },
  methods: {
    ...mapActions([
      'setnavTitle',
      'setnavBarState',
      'settabBarState',
      'setbackRouter',
      'setnavBarArrow',
      'setnavBarBgColor',
      'setnavBarShowRight'
    ]),
    cs(){
      // window.location.reload()
    },
    afterRead(file){
            let form = new FormData();
            // console.log("这里可以进行处理");
            form.append('file', file.file);
            axios.post("/member/member/upload",form).then((res)=>{
                this.img=res.path
                this.fromAddress=res.path
                this.imgshow=true
                console.log("!!!!!!!!!!!!!");
            })
            console.log(this.img);
    },
    showbigimg(){
      console.log("s");
      this.bigImgShow=true
    },
    //拷贝成功
    onCopy(){
      
    },
    //拷贝失败
    onError(){
      
    },
    init () {
      this.setnavTitle(this.i18n.cb)
      this.setbackRouter('')
      this.setnavBarState(true)
      this.settabBarState(false)
      this.setnavBarArrow(true)
      setTimeout(() => {
        this.setnavBarShowRight(true)
      }, 100)
    },
      ssaveAudit(){
        // 判断账号是否冻结
        this.changeData("Recharge")
          if(this.amount==0 || this.amount<0){
              alert(this.$t('coin.czslbn'));
              return;
          }
        if(this.fromAddress==''){
            alert(this.$t('coin.qsrczdz'));
            return;
        }
        let data = new FormData();
        data.append("coin",this.currency);
        data.append("toAddress",this.copyAddress);
        data.append("fromAddress",this.fromAddress);
        data.append("amount",this.amount);
          this.$post('member/balance/saveAudit',data).then(res => {
              if(res&&res.status=="SUCCEED"&&res.status) {
                    alert(this.$t('coin.sqcg'));
              }else{
                  alert(this.$t('coin.sqsb'));
              }
              // location.reload();
              this.amount=''
              // this.fromAddress=''
          })
      },
    check () {
      this.isShow = !this.isShow
    },
    copythat (text) {
      var self = this
      if (!text) {
        return this.Toast(self.i18n.fzsb)
      }
      var clipBoard = api.require('clipBoard')
      clipBoard.set({
        value: text
      },
      function (ret, err) {
        if (ret) {
          return self.Toast(self.i18n.fzcg)
        } else {
          return self.Toast(self.i18n.fzsb)
        }
      }
      )
    },
    // 查询资产列表
    getBalances () {
      let data = {
        member: this.userId,
        balanceType: 'BALANCE_BB'
      }
      this.$get('data/data/getIndexCoin?getCoinType=UPDOWN', data).then(res => {
        if (res && res.status == 'SUCCEED' && res.result) {
          let iindex = ''
          res.result.forEach((ele, i) => {
            if (!iindex && ele.isDw) {
              iindex = i
            }
            // if (ele.tokenCur == "ETH") {
            //     iindex = i;
            // }
          })
          // this.currency = this.chooseCurrency ? this.chooseCurrency : res.result[iindex]  ? res.result[iindex].tokenCur : ''
          // this.getRechargeMinLimit();
          this.popShow = !!(this.currency == 'USDT' && this.names == 'OMNI')
          if (this.currency == 'USDT') {
            this.getUsdtAddress()
          } else {
            this.initData()
          }
          // this.initData();
        }
      })
    },
    // 当前是usdt时
    getUsdtAddress () {
        //修改之前
     /* let data = {
        member: this.userId,
        type: this.names
      }
      this.$get('member/balance/getUsdtWallet', data).then(res => {
        if (res && res.status == 'SUCCEED' && res.result) {
          this.copyAddress = res.result || ''
        }
      })*/
        let data = {
            type: this.names
        }
        this.$get('member/balance/getAccountUsdtWallet', data).then(res => {
            if (res && res.status == 'SUCCEED' && res.result) {
                this.copyAddress = res.result.walletAddress || ''
            }
        })
    },
    // 获取充币地址
    initData () {
      // 修改之前
      // let data = {
      //     member: this.userId,
      //     currency: this.currency
      // };
      //
      // this.$get("member/balance/getWallet", data).then(res => {
      //     if (res && res.status == "SUCCEED" && res.result) {
      //         this.copyAddress = res.result || "";
      //     }
      // });
      // 修改之后
      let data = {
        tokenCur: this.currency
      }
      this.$get('member/balance/getAccountWallet', data).then(res => {
        if (res && res.status == 'SUCCEED' && res.result) {
          this.copyAddress = res.result || ''
        }
      })
        //初始化链名
        this.$get('member/balance/getAccountUsdtChainName').then(res => {
            if (res && res.status == 'SUCCEED' && res.result) {
                this.actions = res.result || [{name:"OMNI"}]
            }
        })
    },
    // 获取充值最小值
    getRechargeMinLimit () {
      let currency =
                    this.currency == 'USDT'
                      ? this.names == 'ERC20'
                        ? 'USDT/ERC20'
                        : 'USDT/OMNI'
                      : this.currency
      this.$get('member/quota/recharge_min_limit', {
        currency: currency
      }).then(res => {
        if (res && res.status == 'SUCCEED' && res.result) {
          // this.copyAddress = res.result.wallet || "";
          this.min_rechange_value = res.result || 0
        } else {
          this.rechangeList.map(item => {
            if (item.name == this.currency) {
              this.min_rechange_value = item.value
            }
          })
        }
      })
    },

    // 保存图片
    savePic () {
      let imgsrc = this.saveImg
      if (!imgsrc) {
        return
      }
      var _this = this
      _this.$util.showLoading()
      imgsrc = imgsrc.replace('data:image/png;base64,', '')
      setTimeout(res => {
        _this.Toast.clear()
      }, 10000)
      if (_this.$util.confirmPer('photos', this.i18n.cc)) {
        var trans = api.require('trans')
        // console.log(JSON.stringify(trans));
        // console.log(imgsrc);
        trans.saveImage({
          base64Str: imgsrc,
          imgPath: 'fs://BitFutres/',
          album: true,
          imgName: 'address' + Math.random() * 10 + '.png'
        },
        function (ret, err) {
          _this.Toast.clear()
          // console.log(JSON.stringify(ret));
          if (ret.status) {
            _this.Toast(_this.i18n.ybc)
          } else {
            _this.Toast(_this.i18n.bcsb)
          }
        }
        )
      } else {
        _this.Toast.clear()
      }
    },
    // 生成二维码路径
    qrcodeCallback (dataUrl, id) {
      this.saveImg = dataUrl || ''
    },
    // 财产记录筛选事件
    selectHandle () {
      this.isSelect = true
    },
    onCancel () {
      this.isSelect = false
    },
    onSelect (item) {
      this.isSelect = false
      if (this.names == item.name) {
        return
      }
      this.names = item.name
      this.getUsdtAddress()
      // this.getRechargeMinLimit();
    }
  },
  mounted () {
    var _this = this
    this.init()
    this.getBalances()
  },
  destroyed () {
    this.setnavBarShowRight(false)
  }
}
</script>

<style lang="scss">
    @import "@/assets/scss/theme.scss";

    .coinCharging {
        @include base-background();

        .transactionPop {
            @include base-background();
        }

        // .van-cell__value {
        //     // color: #222222;
        // }

        .chooseCoin {
            .van-cell {
                display: flex;
                align-items: center;
                background: #f8f7fd;
            }
        }

        .van-popup--bottom.van-popup--round {
            border-radius: 6px;
        }
    }
</style>
<style lang="scss" scoped>
    @import "@/assets/scss/theme.scss";

    .chooseCoin {
        margin: 0 -15px;
    }
    .Font{
      font-size: 14px;
    }
    .addressPic1 {
        font-size: 14px;
        box-shadow: 0px 1px 11px 1px rgba(121, 121, 121, 0.09);
        border-radius: 5px;
        margin-top: 14px;
    }

    .addressPic {
        @include base-background-second();
        padding: 18px 25px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        box-shadow: 0px 1px 11px 1px rgba(121, 121, 121, 0.09);
        border-radius: 5px;
        margin-top: 14px;

        .qrcode {
            width: 130px;
            height: 130px;
            margin-top: 10px;
        }

        .savePicBtn {
            // color: #222222;
            font-size: 15px;
            padding-top: 15px;
            margin-top: 15px;
            // border-top: 1px solid rgba(227, 227, 227, 0.2);
            width: 100%;
            text-align: center;
            background: transparent;
        }

        .num {
            font-size: 14px;
            word-break: break-all;
            width: 100%;
            border: none;
            background: none;
        }
    }

    .tipDetail {
        color: #999999;
        font-size: 12px;
        margin-top: 30px;
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
    .boxpzimg{
      width: 300px;
      height: 200px;
    }
    .pzimg{
      width: 100%;
      height: 100%;
      // width: 300px;
      // height: 200px;
    }
    .bigpz{
      width: 100%;
      height: 100%;
    }
</style>
