<template>
  <div class="order_manger a_title">
    <div class="tabs size15 bor_b">
      <tabs-title :titles="title" active="1" @currentTab="currentTabfun">
      </tabs-title>
    </div>

    <div class="con" v-show="current == 1">
      <van-list
        class="item"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad1"
      >
        <van-cell
          v-for="(item, i) in list"
          :key="i"
          class="pad_l_r_15"
          style="border-bottom: 7px solid #f8f7fd"
        >
          <div class="FLEX pad_t_15" :class="i % 2 == 0 ? 'c_green' : 'c_red'">
            <div class="size16">OCT/USDT</div>
            <div
              v-show="i % 2 == 0"
              class="
                size10
                btn_green
                mar_l_12
                wid32
                hei15
                c_green
                linehei15
                a_center
              "
            >
              买入
            </div>
            <div
              v-show="i % 2 == 1"
              class="
                size10
                btn_red
                mar_l_12
                wid32
                hei15
                c_red
                linehei15
                a_center
              "
            >
              卖出
            </div>
          </div>
          <van-row class="pad_t_b_10 bor_b c666 size11 a_left">
            <van-col :span="6">
              <div class="pad_b_4">价格(USDT)</div>
              <div>实际交易量(OCT)</div>

              <!-- <div class="pad_t_6">触发条件</div> -->
            </van-col>
            <van-col :span="6" class="c222 size13">
              <div class="pad_b_4">78.0987</div>
              <div>6789</div>
              <!-- <div class="pad_t_4">>=1000</div> -->
            </van-col>
            <van-col :span="6">
              <div class="pad_b_4">数量(USDT)</div>
              <div>下单时间</div>
            </van-col>
            <van-col :span="6" class="c222 size13">
              <div class="pad_b_4">6789</div>
              <div>12:21:00</div>
            </van-col>
          </van-row>
          <div class="bbtn">
            <div class="bbtn1">撤单</div>
          </div>
          <!-- <div class="hei4 a_bg">sdfghj</div> -->
        </van-cell>
      </van-list>
    </div>

    <div class="con2" v-show="current == 2">
      <div class="top c666">
        <div
          @click="con2Tab = 1"
          class="item2"
          :class="con2Tab == 1 ? '' : 'c_blue btnstayle'"
        >
          持仓
        </div>
        <div
          @click="con2Tab = 2"
          class="item2"
          :class="con2Tab == 2 ? '' : 'c_blue btnstayle'"
        >
          当前委托
        </div>
      </div>
      <van-list
        class="item"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad1"
      >
        <van-cell
          v-for="(item, i) in list"
          :key="i"
          class="pad_l_r_15"
          style="border-bottom: 7px solid #f8f7fd"
        >
          <div class="FLEX pad_t_15" :class="i % 2 == 0 ? 'c_green' : 'c_red'">
            <div class="size16">OCT/USDT</div>
            <div
              v-show="i % 2 == 0"
              class="
                size10
                btn_green
                mar_l_12
                wid32
                hei15
                c_green
                linehei15
                a_center
              "
            >
              买入
            </div>
            <div
              v-show="i % 2 == 1"
              class="
                size10
                btn_red
                mar_l_12
                wid32
                hei15
                c_red
                linehei15
                a_center
              "
            >
              卖出
            </div>
          </div>
          <van-row class="pad_t_b_10 bor_b c666 size11 a_left">
            <van-col :span="6">
              <div class="pad_b_4">{{i18n.home}}(USDT)</div>
              <div>实际交易量(OCT)</div>

              <!-- <div class="pad_t_6">触发条件</div> -->
            </van-col>
            <van-col :span="6" class="c222 size13">
              <div class="pad_b_4">78.0987</div>
              <div>6789</div>
              <!-- <div class="pad_t_4">>=1000</div> -->
            </van-col>
            <van-col :span="6">
              <div class="pad_b_4">数量(USDT)</div>
              <div>下单时间</div>
            </van-col>
            <van-col :span="6" class="c222 size13">
              <div class="pad_b_4">6789</div>
              <div>12:21:00</div>
            </van-col>
          </van-row>
          <div class="bbtn">
            <div class="bbtn1">撤单</div>
          </div>
          <!-- <div class="hei4 a_bg">sdfghj</div> -->
        </van-cell>
      </van-list>
    </div>
    <div class="con3" v-show="current == 3">
      <van-list
        class="item"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad1"
      >
        <van-cell
          v-for="(item, i) in list"
          :key="i"
          class="pad_l_r_15"
          style="border-bottom: 7px solid #f8f7fd"
        >
          <div class="FLEX pad_t_15" :class="i % 2 == 0 ? 'c_green' : 'c_red'">
            <div class="size16">OCT/USDT</div>
            <div
              v-show="i % 2 == 0"
              class="
                size10
                btn_green
                mar_l_12
                wid32
                hei15
                c_green
                linehei15
                a_center
              "
            >
              买入
            </div>
            <div
              v-show="i % 2 == 1"
              class="
                size10
                btn_red
                mar_l_12
                wid32
                hei15
                c_red
                linehei15
                a_center
              "
            >
              卖出
            </div>
          </div>
          <van-row class="pad_t_b_10 bor_b c666 size11 a_left">
            <van-col :span="6">
              <div class="pad_b_4">价格(USDT)</div>
              <div>实际交易量(OCT)</div>

              <!-- <div class="pad_t_6">触发条件</div> -->
            </van-col>
            <van-col :span="6" class="c222 size13">
              <div class="pad_b_4">78.0987</div>
              <div>6789</div>
              <!-- <div class="pad_t_4">>=1000</div> -->
            </van-col>
            <van-col :span="6">
              <div class="pad_b_4">数量(USDT)</div>
              <div>下单时间</div>
            </van-col>
            <van-col :span="6" class="c222 size13">
              <div class="pad_b_4">6789</div>
              <div>12:21:00</div>
            </van-col>
          </van-row>
          <div class="bbtn">
            <div class="bbtn1">撤单</div>
          </div>
          <!-- <div class="hei4 a_bg">sdfghj</div> -->
        </van-cell>
      </van-list>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import tabsTitle from "./../../components/tabsTitle.vue";

export default {
  components: {
    tabsTitle,
  },
  data() {
    return {
      current: null,
      title: ["币币交易", "合约交易", "历史记录"],
      list: [],
      loading: false,
      finished: false,

      con2Tab: 1,
    };
  },
  computed: {
    i18n() {
      return this.$t("common");
    },
  },
  mounted() {},
  watch: {},
  created() {
    this.init();
  },
  beforeUpdate(to, from, next) {},
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
    ]),
    init() {
      this.setnavTitle("订单管理");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    sec(n) {
      this.index = n;
    },
    currentTabfun(n) {
      this.list = [];
      this.getList(n);
      // console.log(n)
      this.current = n;
    },
    getList(n) {
      this.loading = false;
      this.finished = false;

      this.list = [1, 2, 3, 4, 5];
    },
    onLoad1() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        //  // console.log(this.list)

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 30) {
          this.finished = true;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
.order_manger {
  .tabs {
    width: 100%;
    height: 45px;
    z-index: 100;
    background: #fff;
    position: fixed;
    width: 100%;
  }
  .con {
    padding-top: 49px;
    background: #f8f7fd;
    .item {
      // height: 100px;
      background: #fff;
      .FLEX {
        display: flex;
        .btn_green {
          border: 1px solid $green;
          border-radius: 2px;
        }
        .btn_red {
          border: 1px solid $red;
          border-radius: 2px;
        }
      }
    }
    .bbtn {
      display: flex;
      justify-content: flex-end;
      padding: 14px 0;
      .bbtn1 {
        width: 60px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: 1px solid $blue;
        border-radius: 2px;
        font-size: 13px;
        color: $blue;
      }
    }
  }

  .con2 {
    padding-top: 49px;
    background: #f8f7fd;
    .top {
      display: flex;
      height: 45px;
      line-height: 45px;
      .item2 {
        width: 100px;
        height: 30px;
        text-align: center;
        font-size: 12px;
      }
      .btnstayle {
        background: rgb(212, 212, 212);
        border-radius: 10px;
      }
    }

    .item {
      // height: 100px;
      background: #fff;
      .FLEX {
        display: flex;
        .btn_green {
          border: 1px solid $green;
          border-radius: 2px;
        }
        .btn_red {
          border: 1px solid $red;
          border-radius: 2px;
        }
      }
    }
    .bbtn {
      display: flex;
      justify-content: flex-end;
      padding: 14px 0;
      .bbtn1 {
        width: 60px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: 1px solid $blue;
        border-radius: 2px;
        font-size: 13px;
        color: $blue;
      }
    }
  }
  .con3 {
    padding-top: 49px;
    background: #f8f7fd;
    .item {
      // height: 100px;
      background: #fff;
      .FLEX {
        display: flex;
        .btn_green {
          border: 1px solid $green;
          border-radius: 2px;
        }
        .btn_red {
          border: 1px solid $red;
          border-radius: 2px;
        }
      }
    }
    .bbtn {
      display: flex;
      justify-content: flex-end;
      padding: 14px 0;
      .bbtn1 {
        width: 60px;
        height: 25px;
        line-height: 25px;
        text-align: center;
        border: 1px solid $blue;
        border-radius: 2px;
        font-size: 13px;
        color: $blue;
      }
    }
  }
}
</style>

