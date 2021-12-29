<template>
  <div class="assetsDetail container_common flex_column">
    <div class="lsit">
      <div v-for="(item,i) in assetList" :key="i">
        <assetItem :list="item" page="detail" :type="curType"></assetItem>
      </div>
    </div>
    <div class="darkLine"></div>
    <!-- 财务记录 -->
    <div class="financialRecords">
      <div class="titles c222">
        <span>{{$t('add.cwjr')}}</span>
        <img
          src="../../assets/images/home/select.png"
          alt
          srcset
          class="rightIcons"
          @click="selectHandle"
        />
      </div>
    </div>
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      :up="mescrollUp"
      @init="mescrollInit"
      class="details flex1"
    >
      <div class="capitalRecordsList" v-if="capitalRecordsList.length>0">
        <div v-for="(item,i) in capitalRecordsList" :key="i">
          <recordsItem :list="item" :l="capitalRecordsList.length" :n="i" :type="type" />
        </div>
      </div>
      <div v-else>
        <nodata :title="$t('add.zwjr')" class="pad_t_100"></nodata>
      </div>
    </mescroll-vue>
    <van-action-sheet
      v-model="isSelect1"
      :actions="actions1"
      :cancel-text="$t('add.qx')"
      @select="onSelect"
      :title="$t('add.qb')"
      @cancel="onCancel"
    />
    <van-action-sheet
      v-model="isSelect"
      :actions="actions"
      :cancel-text="$t('add.qx')"
      @select="onSelect"
      :title="$t('add.qb')"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
import assetItem from "../../components/assetItem";
import recordsItem from "../../components/recordsItem";
export default {
  components: {
    assetItem,
    recordsItem
  },
  activated() {
    let list = this.$GLOBAL.assetDetail.list;
    this.assetList = list;
    let type = this.$GLOBAL.assetDetail.types;
    this.curType = type - 0;
    this.init();
    this.currency = list[0].currency;
    if (!this.currency) {
      return;
    }
    // this.initBalanceList();
    this.getCapitalRecords();
  },
  deactivated() {
    this.capitalRecordsList=[];
  },
  computed: {
    userId() {
      return this.$store.state.userId;
    }
  },
  data() {
    return {
      assetList: [], //资产列表
      curType: 1, //当前币种
      currency: "", //当前主币
      isSelect: false, //筛选弹框
      isSelect1: false, //筛选弹框
      actions: [
        { name: this.$t('add.tb') },
        { name: this.$t('add.cb') }
        // { name: "系统" },
        // { name: "转入" },
        // { name: "转出" }
      ],
      actions1: [
        { name: this.$t('add.gm') },
        { name: this.$t('add.cs') }
        // { name: "系统" },
        // { name: "转入" },
        // { name: "转出" }
      ],
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
      pageSize: 20, //当前页数
      noMores: true, //没有更多数据了
      type: "withdrawCoin",
      capitalRecordsList: []
    };
  },
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
      "setnavBarBgColor"
    ]),
    setStyle() {
      setTimeout(() => {
        if (this.$store.state.nowThemeInfo == "night-theme") {
          $(".assetsDetail")
            .find(".van-popup")
            .css("background-color", "#000");

          $(".assetsDetail")
            .find(".van-action-sheet__header")
            .css("background-color", this.$bg_night);
        } else {
          $(".assetsDetail")
            .find(".van-action-sheet__header")
            .css("background-color", "#fff");
        }
      }, 50);
    },
    init() {
      this.setnavTitle(this.$t('add.xxxx'));
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
      this.setnavBarBgColor("");;
    },
    //财产记录筛选事件
    selectHandle() {
      if (this.curType == 3) {
        this.isSelect1 = true;
        // console.log(this.isSelect);
        this.setStyle();
        return;
      }
      this.isSelect = true;
      this.setStyle();
    },
    onCancel() {
      this.isSelect = false;
      this.isSelect1 = false;
    },
    onSelect(item) {
      if (this.curType == 3) {
        this.isSelect1 = false;
        return;
      }
      let type = this.type == "coinCharging" ? this.$t('add.cb') : this.$t('add.tb');
      this.isSelect = false;
      if (item.name.indexOf(type) != -1) {
        return;
      }
      this.pageNum = 1; //当前页码
      this.capitalRecordsList = [];
      if (item.name.indexOf(this.$t('add.cb')) != -1) {
        this.type = "coinCharging";
      }
      if (item.name.indexOf(this.$t('add.tb')) != -1) {
        this.type = "withdrawCoin";
      }
      this.getCapitalRecords();
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    //下拉刷新
    downCallback() {
      this.pageNum = 1;
      this.getCapitalRecords();
    },
    //上拉加载
    upCallback() {
      if (this.noMores) {
        return;
      }
      this.getCapitalRecords();
    },
    //获取资金记录
    getCapitalRecords(type) {
      var url;
      if (this.type == "withdrawCoin") {
        //提现
        url = "member/balance/withdraw_recording";
      } else if (this.type == "coinCharging") {
        url = "member/balance/recharge_recording";
        //充币
      }
      this.$util.showLoading();
      this.$get(url, {
        memberId: this.$store.state.userId,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        currency: this.currency
      })
        .then(res => {
          this.Toast.clear();
          if (res && res.status == "SUCCEED" && res.result) {
            if (this.pageNum == 1) {
              this.capitalRecordsList = res.result.records || [];
            } else {
              this.capitalRecordsList = this.capitalRecordsList.concat(
                res.result.records
              );
            }
            if (res.result.records.length < this.pageSize) {
              this.noMores = true;
            } else {
              this.pageNum = this.pageNum + 1;
              this.noMores = false;
            }
            this.mescroll.endSuccess(res.result.records.length, !this.noMores);
          } else {
            this.mescroll.endErr();
          }
        })
        .catch(err => {
          this.Toast.clear();
          this.mescroll.endErr();
        });
    }
  }
};
</script>
<style lang="scss">
.assetsDetail {
  .van-cell__value--alone {
    color: #39BB97;
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.assetsDetail {
  @include base-background();

  .lsit {
    margin: 0 -15px;
  }
  .details {
    overflow-y: auto;
  }
  .financialRecords {
    .titles {
      display: flex;
      justify-content: space-between;
      font-size: 15px;
      font-weight: 500;

      align-items: center;
      padding: 10px 0;
      .rightIcons {
        width: 17px;
        height: 17px;
      }
    }
  }
}
</style>