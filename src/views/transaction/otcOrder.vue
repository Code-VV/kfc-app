<template>
  <div class="container_common1 allContract">
    <van-tabs v-model="active" class="allContract_tabBar bor_b" @change="changeTab">
      <van-tab title="未完成"></van-tab>
      <van-tab title="已完成"></van-tab>
      <van-tab title="已取消"></van-tab>
    </van-tabs>
    <!-- 列表 -->
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      class="list flex1"
      @init="mescrollInit"
      :up="mescrollUp"
    >
      <div>
        <!-- v-if="orderList.length>0" -->
        <div v-if="orderList.length>0">
          <div v-for="(item,i) in orderList" :key="i">
            <orderItem :list="item" :n="i" :userId="userId" />
          </div>
        </div>
        <div v-else>
          <nodata :title="'暂无订单'" class="pad_t_50"></nodata>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import orderItem from "../../components/orderItem";
export default {
  activated() {
    this.init();
    if(this.$route.params&&this.$route.params.active){
      this.active=0;
      this.type=0;
      this.pageNum=1;
      this.orderList=[];
      this.getOrderList();
      return;
    }
    this.getOrderList();
  },
  components: {
    orderItem
  },
  computed: {
    pairsName() {
      return this.$store.state.pairsName;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  data() {
    return {
      active: 0,
      type: 0, //当前tab类型，默认委托
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
        htmlNodata:
          '<p class="upwarp-nodata" style="display:none">没有更多数据了</p>'
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
      "setnavBarArrow"
    ]),
    init() {
      this.setnavTitle("交易单");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    //tab切换
    changeTab(index) {
      if (index == this.type) {
        return;
      }
      this.pageNum = 1;
      // this.mescroll.resetUpScroll();
      this.mescroll.scrollTo(0);
      this.type = index;
      this.orderList = [];
      // this.mescroll.resetUpScroll() // 刷新列表数据
      this.getOrderList(1);
    },
    //二级tab切换
    switchType(type) {
      if (type == this.subCurType) {
        return;
      }
      this.subCurType = type;
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
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
      if (this.noMores) {
        return;
      }
      this.getOrderList();
    },
    getOrderList(t) {
      if (t) {
        this.$util.showLoading();
      }
      this.$post1("otc/order/ownOrderList", {
        priceOrderStatus:
          this.type == 0 ? "NONPAYMENT" : this.type == 1 ? "FINISH" : "CALLOFF",
        userId: this.$store.state.userId,
        page: this.pageNum,
        size: this.pageSize
      })
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
            this.$nextTick(() => {
              this.mescroll.endSuccess(res.result.data.length, !this.noMores);
            });
          } else {
            this.mescroll.endErr();
          }
        })
        .catch(err => {
          this.mescroll.endErr();
        });
    },
    //撤单
    cancelorder(e) {
      for (var i = 0; i < this.entrustList.length; i++) {
        var item = this.entrustList[i];
        if (item.id == e) {
          this.entrustList.splice(i, 1);
        }
      }
    }
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/theme.scss";

.allContract {
  @include base-background();

  .allContract_tabBar {
    margin: 0 -15px;
    padding: 0 15px;
    // border-bottom: 1px solid rgba(227,227,227,.2);
    .van-tab {
      font-size: 15px;
    }
    .van-tabs__line {
      background-color: #fbc400;
      height: 2px;
      width: 37px !important;
    }
    .van-tab--active {
      color: #fbc400;
    }
    .van-hairline--top-bottom::after {
      border: none;
    }
  }
  .screen {
    margin: 0 -15px;
    padding: 15px;
    background: #f8f7fd;
  }
}
</style>
<style lang="scss" scoped>
.allContract {
  display: flex;
  flex-direction: column;
  .list {
    overflow-y: auto;
    margin: 0 -15px;
    padding: 0 15px;
  }
}
</style>