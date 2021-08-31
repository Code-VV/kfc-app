<template>
  <div class="container_common personalCenter" id="personalCenter">
    <div class="darkLine"></div>
    <div class="items pad_b_15 size14">
      <van-cell class="bor_b" v-if="isRenzhang">
        <span slot="title" class="size15 font1 c222">{{$t('sfrz.sfrz')}}</span>
        <div slot="default" class="flex align_center flex_end" v-if="isRenzhang">
          <img src="../../assets/images/user/sures.png" alt srcset class="wid14 hei14 mar_r_5" />
          <span class="c_blue font1">{{$t('sfrz.yrz')}}</span>
        </div>
      </van-cell>
      <van-cell is-link value="内容" class="bor_b" v-else to="/realname">
        <span slot="title" class="size15 font1 c222">{{$t('sfrz.sfrz')}}</span>
        <div slot="default" class="flex align_center flex_end">
          <img src="../../assets/images/user/shenfen.png" alt srcset class="wid14 hei14 mar_r_5" />
          <span class="c_red font1">{{$t('sfrz.qrz')}}</span>
        </div>
      </van-cell>
      <div v-if="isRenzhang" class="authBox">
        <van-cell>
          <span slot="title" class="size14 c999">{{$t('sfrz.xm')}}</span>
          <div slot="default" class="font1 c222">{{userInfo.uname}}</div>
        </van-cell>
        <van-cell>
          <span slot="title" class="size14 c999">{{$t('sfrz.zh')}}</span>
          <div slot="default" class="font1 c222" v-if="userInfo.phone">{{userInfo.phone|encryptionphone}}</div>
          <div slot="default" class="font1 c222" v-if="!userInfo.phone&&userInfo.mail">{{userInfo.mail|encryptionmail}}</div>
        </van-cell>
        <van-cell>
          <span slot="title" class="size14 c999">UID</span>
          <div slot="default" class="font1 c222 flex align_center flex_end">
            <span>{{userInfo.uuid}}</span>
            <div class="pad_l_5 pad_t_b_5" @click="copythat(userInfo.uuid)">
              <img src="../../assets/images/user/fuzhi.png" alt srcset class="wid11 hei12" />
            </div>
          </div>
        </van-cell>
        <van-cell>
          <span slot="title" class="size14 c999">{{$t('sfrz.zjhm')}}</span>
          <div slot="default" class="font1 c222">{{userInfo.cardNo|cardNum}}</div>
        </van-cell>
      </div>
      <div class="c999" v-else>
        <div class="mar_t_15">{{$t('sfrz.cjrzhtx')}}</div>
        <div class="mar_t_12">{{$t('sfrz.cjrzhhd')}}</div>
      </div>
    </div>
    <!-- 这个空的div不知道是干嘛用的 -->
    <div class="darkLine"></div>
    <!-- 二次认证 -->
    <div class="items pad_b_15 size14" v-if="isRenzhang">
      <van-cell class="bor_b" v-if="userInfo.cardState=='PASS'">
        <span slot="title" class="size15 font1 c222">{{$t('sfrz.gjrz')}}</span>
        <div slot="default" class="flex align_center flex_end">
          <img src="../../assets/images/user/sures.png" alt srcset class="wid14 hei14 mar_r_5" />
          <span class="c_blue font1">{{$t('sfrz.yrz')}}</span>
        </div>
      </van-cell>
      <van-cell is-link class="bor_b" v-else to="/realname1">
        <span slot="title" class="size15 font1 c222">{{$t('sfrz.gjrz')}}</span>
        <div slot="default" class="flex align_center flex_end">
          <img src="../../assets/images/user/shenfen.png" alt srcset class="wid14 hei14 mar_r_5" />
          <span class="c_red font1">{{userInfo.cardState=='WAIT'?$t('sfrz.shz'):$t('sfrz.qrz')}}</span>
        </div>
      </van-cell>
      <div class="size14 c999">
        <div class="mar_t_15">{{$t('sfrz.gjrzh')}}</div>
        <div class="mar_t_12">{{$t('sfrz.gjrztx')}}</div>
      </div>
    </div>
    <div class="items pad_b_15 size14" v-else>
      <van-cell is-link class="bor_b" @click='goReal'>
        <span slot="title" class="size15 font1 c222">{{$t('sfrz.gjrz')}}</span>
        <div slot="default" class="flex align_center flex_end">
          <img src="../../assets/images/user/shenfen.png" alt srcset class="wid14 hei14 mar_r_5" />
          <span class="c_red font1">{{$t('sfrz.qrz')}}</span>
        </div>
      </van-cell>
      <div class="size14 c999">
        <div class="mar_t_15">{{$t('sfrz.gjrzh')}}</div>
        <div class="mar_t_12">{{$t('sfrz.gjrztx')}}</div>
      </div>
    </div>
    <!-- <div @click="cs()">按钮</div> -->
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "../../axios/index";
import $ from "jquery";
export default {
  activated() {
    this.init();
    this.getUserInfo();
    setTimeout(() => {
      if (this.$store.state.nowThemeInfo == "night-theme") {
        $(".van-cell-group").css("cssText", "background-color:#000!important"); //;要想修改多个属性，可以这么做：
      } else {
      }
    }, 100);
  },
  components: {},
  mounted() {},
  data() {
    return {
      isRenzhang: false,
      userInfo: {},
    };
  },
  computed: {
 
  },
  watch: {

  },
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow",
    ]),
    cs(){
      // alert("按钮生效！")
    },
    init() {
      // this.setnavTitle(this.$t("realname.IDverification"));
      this.setnavTitle(this.$t('sfrz.grzx'));
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    copythat: function(text) {
      var self = this;
      if (!text) {
        return this.Toast("复制失败，请稍后重试");
      }
      var clipBoard = api.require("clipBoard");
      clipBoard.set(
        {
          value: text
        },
        function(ret, err) {
          if (ret) {
            return self.Toast("复制成功");
          } else {
            return self.Toast("复制失败，请稍后重试");
          }
        }
      );
    },
    goReal(){
      this.Toast('请先进行初级实名认证');
    },
    getUserInfo() {
      this.$get("member/member/getMember", {
        member: this.$store.state.userId
      }).then(res => {
        if (res.status == "FAILED") {
          this.Toast(res.errorMessage);
        } else if (res.status == "SUCCEED") {
          let data = res.result;
          this.userInfo = data;
          if (data.cardNo == "") {
            this.isRenzhang = false;
          } else {
            this.isRenzhang = true;
          }
        }
      });
    },
  },
  deactivated() {
  }
};
</script>
<style lang="scss">
@import "@/assets/scss/theme.scss";
#personalCenter {
  .van-cell:not(:last-child)::after {
    border: none !important;
  }
}
.personalCenter {
  @include base-background();
  .van-cell {
    margin: 0 -15px;
    width: auto;
  }
  .authBox {
    .van-cell {
      padding: 15px 15px 0 15px;
    }
  }
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-top: 0;
  }
  .van-button--info {
    background: #fbc400;
    border: 1px solid #fbc400;
  }
}
</style>
<style lang="scss" scoped>
.personalCenter {
  .countryCode {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #444444;
    padding: 12px 0;
    .leftIcon {
      width: 18px;
      height: 18px;
      margin-right: 10px;
    }
    .name {
      color: #222222;
    }
    .rightBox {
      min-width: 20px;
      display: flex;
      align-items: center;
      .rightIcon {
        width: 6px;
        height: 11px;
        margin-left: 15px;
        background: url(../../assets/images/home/rightArrow.png) no-repeat;
        background-size: 100% 100%;
      }
    }
  }
  .formBox {
    .leftIcon {
      width: 18px;
      height: 18px;
    }
  }
  .uploadgroup {
    .span {
      color: #999999;
      size: 12px;
      padding: 10px 0 5px;
      text-align: center;
    }
  }
}
</style>