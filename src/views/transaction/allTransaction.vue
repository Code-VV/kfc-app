<template>
  <div class="container_common1 allContract">
    <van-tabs
      v-model="active"
      class="allContract_tabBar bor_b"
      @change="changeTab"
    >
      <van-tab :title="$t('add.qbwt')"></van-tab>
      <van-tab :title="$t('add.lsjr')"></van-tab>
    </van-tabs>
    <!-- 列表 -->
    <mescroll-vue
      ref="mescroll"
      :down="mescrollDown"
      class="list"
      @init="mescrollInit"
    >
      <div v-if="type == 'entrust'">
        <div v-if="entrustList.length > 0">
          <div v-for="(item, i) in entrustList" :key="i">
            <transactionItem
              :type="type"
              :list="item"
              :n="i"
              @cancelorder="cancelorder"
            />
          </div>
        </div>
        <div v-else>
          <nodata :title="$t('add.zwdqwt')" class="pad_t_50"></nodata>
        </div>
      </div>
      <div v-else>
        <div v-if="historyEntrust.length > 0">
          <div v-for="(item, i) in historyEntrust" :key="i">
            <transactionItem :type="type" :list="item" :n="i" />
          </div>
        </div>
        <div v-else>
          <nodata :title="$t('add.zwlsjr')" class="pad_t_50"></nodata>
        </div>
      </div>
    </mescroll-vue>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import transactionItem from "../../components/transactionItem";
export default {
  mounted() {
    this.init();
    this.getEntrustList(1);
  },
  components: {
    transactionItem,
  },
  computed: {
    pairsName() {
      return this.$store.state.pairsName;
    },
  },
  data() {
    return {
      active: 0,
      type: "entrust", //当前tab类型，默认委托
      mescrollDown: {
        offset: 46,
        callback: this.downCallback,
        textInOffset: this.$t("add.xlsx"),
        textOutOffset: this.$t("add.sfgx"),
        textLoading: this.$t("add.jzz"),
        auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      entrustList: [], //委托列表
      historyEntrust: [], //历史记录
    };
  },
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
    ]),
    init() {
      this.setnavTitle(this.$t("add.qb"));
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    //tab切换
    changeTab(index) {
      this.type = index == 0 ? "entrust" : "history";
      if (index == 0) {
        this.getEntrustList(1); //委托列表
      } else {
        this.getHistoryEntrust(1); //历史列表
      }
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
      if (this.type == "entrust") {
        this.getEntrustList(); //委托列表
      } else {
        this.getHistoryEntrust(); //历史列表
      }
      setTimeout((res) => {
        this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
      }, 1000);
    },
    //获取历史记录
    getHistoryEntrust(type) {
      let pairsName = this.pairsName;
      if (type) {
        this.$util.showLoading();
      }
      this.$get("entrust/entrust/getHistoryEntrust", {
        member: this.$store.state.userId,
        pairsName: "",
        // pairsName: pairsName
      })
        .then((res) => {
          this.Toast.clear();
          if (res && res.status == "SUCCEED") {
            this.historyEntrust = res.result || [];
          }
        })
        .catch((err) => {
          this.Toast.clear();
        });
    },
    //获取委托列表
    getEntrustList(type) {
      let pairsName = this.pairsName;
      if (type) {
        this.$util.showLoading();
      }
      this.$get("entrust/entrust/getEntrustList", {
        member: this.$store.state.userId,
        pairsName: "",
      })
        .then((res) => {
          this.Toast.clear();
          if (res && res.status == "SUCCEED") {
            this.entrustList = res.result || [];
          }
        })
        .catch((err) => {
          this.Toast.clear();
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
    },
  },
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
      background-color: #499c7a;
      height: 2px;
      width: 37px !important;
    }
    .van-tab--active {
      color: #499c7a;
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