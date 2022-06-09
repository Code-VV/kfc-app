<template>
  <div @click="goQuotesDetail()">
    <van-row
      gutter="20"
      class="listItems size16 bor_b c222 bold"
      :class="{ border_none: l - 1 - n == 0 }"
    >
      <van-col span="8">
        <div class="leftBox">
          <span>{{ list.tokenCur }}</span>
          <span class="size12 c999"> /{{ list.mainCur }}</span>
          <!-- <span>{{list.pairsName}}</span> -->
          <!-- <span class="marks" v-if="type=='UPDOWN'">/{{list.mainCur}}</span> -->
        </div>
      </van-col>
      <van-col span="8">
        <div v-if="qh" class="center_text">{{ list.price | SubString(2) }}</div>
        <div v-else class="center_text">
          {{ list.chPrice | SubString3(2, 2) }}
        </div>
      </van-col>
      <van-col span="8">
        <div class="flex flex_end rightBox">
          <span class="btns earn" v-if="type == 'VOLUME'">{{
            list.volume | SubString1(2)
          }}</span>
          <span
            class="btns"
            :class="
              list.updown > 0
                ? 'green_bg'
                : list.updown == 0
                ? 'dark_bg'
                : 'orange_bg'
            "
            v-else
            >{{ list.updown > 0 ? "+" : list.updown == 0 ? "" : ""
            }}{{ (list.updown * 100) | SubString(2) }}%</span
          >
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
    type: {
      type: String,
      default: "",
    },
    n: {
      type: Number,
    },
    qh:{
      type:Boolean
    },
    l: {
      type: Number,
    },
  },
  data() {
    return {
        ip:this.$store.state.target,
    };
  },
  methods: {
    ...mapActions(["setPairsName", "setPairsName1"]),
    init() {

    },
    //行情详情
    goQuotesDetail() {
      this.setPairsName1(this.list.pairsName);
      this.$router.push({
        // path: `/quotes/quotesDetail?id=${id}`
        path: `/quotes/quotesDetail`,
        query: {
          type: this.$no_bb ? "contract" : "bibi",
        },
      });
    },
  },
  mounted() {},
  computed: {},
};
</script>

<style lang="scss" scoped>
.listItems {
  font-family: Din;
  font-weight: 400;
  align-items: center;
  display: flex;
  margin-top: 15px;

  font-size: 15px;
  padding-bottom: 10px;

  // border-bottom: 1px solid rgba(227, 227, 227, 0.4);
  .leftBox {
    .marks {
      color: #999999;
      font-size: 11px;
    }
  }

  .rightBox {
    .btns {
      min-width: 65px;
      text-align: center;
      display: inline-block;
      border-radius: 2px;
      height: 25px;
      line-height: 25px;
      font-size: 13px;
    }

    .earn {
      background: #38bb96;
      color: #fff;
      padding: 0 4px;
    }
  }
}
</style>
