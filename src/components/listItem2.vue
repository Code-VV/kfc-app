<template>
  <div
    class="quot_listItem bor_b bold"
    :class="{ border_none: l - 1 - n == 0 }"
    @click="goQuotesDetail()"
  >
    <van-row gutter="20" class="">
      <img
        @click.stop="shoucang(list, n)"
        v-if="xz"
        class="wxz"
        src="@/assets/images/home/wxz.png"
        alt=""
      />
      <img
        @click.stop="shoucang(list, n)"
        v-else
        class="wxz"
        src="@/assets/images/home/xz.png"
        alt=""
      />

      <img class="icon" :src="ip+list.image" alt="" />
      <van-col span="8">
        <div class="left_box">
          <div class="title c222" v-if="type == 'contract'">
            <span>{{ list.tokenCur }}</span>
            <span class="size12 c999">
              /{{ list.mainCur }}{{ $t("quotes.yx") }}</span
            >
          </div>

          <div class="title c222" v-else>
            <span>{{ list.tokenCur }}</span>
            <span class="size12 c999"> /{{ list.mainCur }}</span>
            <!-- <span class="marks">/ USDT</span> -->
          </div>

          <div class="detail">
            <span class="span c999"
              >{{ $t("quotes.z24h") }} {{ list.volume | SubString(0) }}</span
            >
          </div>
        </div>
      </van-col>
      <van-col span="8">
        <div v-if="qh" class="left_box">
          <div class="title c222">{{ list.chPrice | SubString3(2, 4) }}</div>
          <div class="detail">
            <span class="span c999">${{ list.price | SubString(2) }}</span>
          </div>
        </div>
        <div v-else class="left_box">
          <div class="title c222">{{ list.price | SubString3(2, 4) }}</div>
          <div class="detail">
            <span class="span c999">¥{{ list.chPrice | SubString(2) }}</span>
          </div>
        </div>
      </van-col>
      <van-col span="6">
        <div class="right_box">
          <button
            class="button"
            :class="
              list.updown > 0
                ? 'green_bg'
                : list.updown == 0
                ? 'dark_bg'
                : 'orange_bg'
            "
          >
            {{ list.updown > 0 ? "+" : list.updown == 0 ? "" : ""
            }}{{ (list.updown * 100) | SubString(2) }}%
          </button>
        </div>
      </van-col>
    </van-row>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    list: {
      type: Object,
    },
    qh: {},
    type: {
      type: String,
      default: "",
    },
    n: {
      type: Number,
      default: 0,
    },
    l: {
      type: Number,
    },
  },
  data() {
    return {
      ip:this.$store.state.target,

      xz: true,
      price: "",
      type2: "0",
      sortType: 0, //筛选分类所在项
      isSort: false, //true升序,false降序
    };
  },

  watch: {},

  methods: {
    ...mapActions(["setPairsName", "setPairsName1"]),
    init() {
      this.scList();
    },
    xuanzhong() {},
    //行情详情
    goQuotesDetail() {
      if (this.type == "contract") {
        this.setPairsName(this.list.pairsName);
      } else {
        this.setPairsName1(this.list.pairsName);
      }

      this.$router.push({
        // path: `/quotes/quotesDetail?id=${id}`
        path: `/quotes/quotesDetail`,
        query: { type: this.type },
      });
    },
    shoucang(v, k) {
      this.xz = !this.xz;
      let data = {
        type: this.type2,
        coin: v.tokenCur,
        userId: this.$store.state.userId,
      };

      localStorage.setItem("coin", data.coin);
      this.$post1("/entrust/entrust/getCoinCollection", data).then((res) => {
      });
      this.$emit("getPairsByMainCur2");
      // this.$router.go(0);
    },
  },
  scList() {},
  computed: {},
  created() {
    this.xz = this.$store.state.xz;
  },
};
</script>
<style lang="scss">
.quot_listItem {
  .van-row {
    display: flex;
    align-items: center;
  }
}
</style>
<style lang="scss" scoped>
.quot_listItem {
  padding: 10px 0;
  // border-bottom: 1px solid rgba(227, 227, 227, .4);
  .left_box {
    .title {
      font-size: 16px;
      font-family: "Din";
      font-weight: 400;
      .marks {
        font-size: 12px;
        font-family: "Din";
        font-weight: 400;
      }
    }
    .detail {
      display: flex;
      .span {
        font-size: 12px;
        margin-top: 6px;
      }
    }
  }
  .right_box {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    .button {
      font-family: "Din";
      font-weight: 400;
      font-size: 14px;
      width: 68px;
      padding: 5px 0;
      text-align: center;
      border-radius: 2px;
    }
  }
}
.icon {
  width: 23px;
  height: 23px;
  margin-right: 10.5px;
}
.wxz {
  width: 13px;
  height: 13px;
  margin-left: 15px;
  margin-right: 6px;
}
.van-col--8 {
  padding: 0 !important;
}
</style>
