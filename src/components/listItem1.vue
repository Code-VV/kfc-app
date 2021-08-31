<template>
  <div class="quot_listItem bor_b bold" :class="{'border_none':l-1-n==0}" @click="goQuotesDetail()">

    <van-row gutter="20" class="">
      <van-col span="10">
        <div class="left_box">
          <div class="title c222 " v-if="type=='contract'">
            
              <span>{{list.tokenCur}}</span>
              <span class="size12 c999"> /{{list.mainCur}}{{$t('quotes.yx')}}</span>
          </div>
          <div class="title c222 " v-else>
              <span>{{list.tokenCur}}</span>
              <span class="size12 c999"> /{{list.mainCur}}</span>
            <!-- <span class="marks">/ USDT</span> -->
          </div>
          <div class="detail">
            <span class="span c999">{{$t('quotes.z24h')}} {{list.volume|SubString(0)}}</span>
          </div>
        </div>
      </van-col>
      <van-col span="8">
        <div class="left_box">
          <div class="title c222">{{list.price|SubString3(2,4)}}</div>
          <div class="detail">
            <span class="span c999">¥ {{list.chPrice|SubString(2)}}</span>
          </div>
        </div>
      </van-col>
      <van-col span="6">
        <div class="right_box">
          <button
            class="button "
            :class="list.updown>0?'green_bg':list.updown==0?'dark_bg':'orange_bg'"
          >{{list.updown>0?'+':list.updown==0?'':''}}{{list.updown*100|SubString(2)}}%</button>
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
      type: Object
    },
    type: {
      type: String,
      default: ""
    },
    n: {
      type: Number,
      default: 0
    },
    l: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["setPairsName","setPairsName1"]),
    //行情详情
    goQuotesDetail() {
      if (this.type == "contract") {
        this.setPairsName(this.list.pairsName);
      }else{
         this.setPairsName1(this.list.pairsName);
      }

      this.$router.push({
        // path: `/quotes/quotesDetail?id=${id}`
        path: `/quotes/quotesDetail`,
        query: { type: this.type }
      });
    }
  },
  computed: {},
  created(){
    // console.log(this.list)
  }
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

      .marks {
        font-size: 12px;
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
      font-size: 14px;
      min-width: 65px;
      padding: 5px 0;
      text-align: center;
      border-radius: 2px;
    }
  }
}
</style>
