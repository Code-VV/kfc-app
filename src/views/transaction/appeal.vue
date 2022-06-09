<template>
  <div class="container_common appeal" id="appeal">
    <van-field
      v-model="message"
      rows="4"
      type="textarea"
      maxlength="240"
      placeholder="描述问题需要10个字以上"
      show-word-limit
      style="padding:0"
    />
    <div class="darkLine mar_t_5"></div>
    <div class="size15 c999 mar_t_10 flex-between align_center">
      <span>请提供相关问题的截图或照片</span>
      <span class="size12">{{imgBox.length}}/2</span>
    </div>
    <div class="uploadBox mar_t_15">
      <div class="uploadgroup flex align_center">
        <!--   -->
        <div v-if="imgBox.length>0" class="flex align_center">
          <!--  -->
          <div class="relative wid85 hei85 mar_r_20" v-for="(item,i) in imgBox" :key="i">
            <img :src="item" class="wid85 hei85 border_radius" />
            <van-icon name="cross" class="close" @click="close(i)" />
          </div>
        </div>
        <div class="imgs b_bg" v-if="imgBox.length<2">
          <getPicture
            class="absolute"
            style="top:0;right:0;bottom:0;left:0;z-index:99"
            @getImg="getImgSrc"
          />
        </div>
      </div>
    </div>
    <van-button type="info" block class="mar_t_40 bold size15" @click="submitEvent">提交</van-button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import axios from "../../axios/index";
import getPicture from "../../components/getPicture";
import $ from "jquery";
export default {
  created() {
    this.init();
  },
  components: {
    getPicture
  },
  mounted() {
    this.id = this.$route.query.id || "";
    setTimeout(() => {
      if (this.$store.state.nowThemeInfo == "night-theme") {
        $(".van-cell-group").css("cssText", "background-color:#000!important"); //;要想修改多个属性，可以这么做：
      } else {
      }
    }, 100);
  },
  data() {
    return {
      imgBox: [], //上传反馈图片
      // imgBox: '', //上传反馈图片
      message: "", //留言
      id: ""
    };
  },
  computed: {},
  watch: {},
  methods: {
    ...mapActions([
      "setnavTitle",
      "setnavBarState",
      "settabBarState",
      "setbackRouter",
      "setnavBarArrow"
    ]),
    submitEvent() {
      if (!this.message) {
        this.Toast("请输入问题描述");
        return;
      }
      if (this.message.length < 10) {
        this.Toast("问题描述需要10个字以上");
        return;
      }
      var data = {
        msg: this.message,
        pic: this.imgBox,
        priceOrderId: this.id,
        userId: this.$store.state.userId
      };
      var fd = new FormData();
      fd.append("msg", data.msg);
      fd.append("priceOrderId", data.priceOrderId);
      data.pic.forEach((item, i) => {
        if (i == 0) {
          fd.append("file", this.$util.base64toFile(item));
        } else {
          fd.append("file1", this.$util.base64toFile(item));
        }
      });
      this.$util.showLoading();
      this.$post1(
        "otc/order/appeal",
        { userId: this.$store.state.userId },
        fd
      ).then(res => {
        if (res && res.status == "SUCCEED") {
          this.Toast("申诉提交成功");
          setTimeout(res => {
            this.$router.go(-1);
          }, 300);
        } else {
          this.Toast(res.errorMessage);
        }
      });
    },
    init() {
      this.setnavTitle("申诉反馈");
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    }, // 初始化页面
    county_pickerIdx(idx) {
      // console.log(
      //   "子组件传给夫级的选择器的下标和结果",
      //   idx,
      //   this.countyList[idx]
      // );
      this.index = idx;
    },
    //选择国家
    chooseArea() {
      this.$router.push({
        path: `/chooseArea`
      });
    },
    getImgSrc(e) {
      this.imgBox.push(e);
    },
    //删除图片
    close(index) {
      this.imgBox.splice(index, 1);
    }
  },
  destroyed() {}
};
</script>
<style lang="scss">
@import "@/assets/scss/theme.scss";
#appeal {
  .van-cell:not(:last-child)::after {
    border: none !important;
  }
}
.appeal {
  @include base-background();
  .van-hairline--top-bottom::after,
  .van-hairline-unset--top-bottom::after {
    border-top: 0;
  }
  .van-button--info {
    background: #499C7A;
    border: 1px solid #499C7A;
  }
  .formBox {
    .van-cell:not(:last-child)::after {
      left: 0;
    }
    .van-cell {
      padding: 12px 0;
    }
    .van-field__control {
      text-align: right;
    }
  }

  .uploadgroup {
    .border_radius {
      border-radius: 4px;
      // .van-image__img {
      //   border-radius: 4px;
      // }
    }
    .imgs {
      width: 85px;
      height: 85px;
      border-radius: 4px;
      position: relative;
      &::after {
        content: "+";
        font-size: 40px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        color: #878789;
      }
    }
    .close {
      position: absolute;
      background: #c1c1c1;
      border-radius: 50%;
      padding: 2px;
      right: -7px;
      top: -7px;
    }
    .van-icon-cross:before {
      color: #fff;
    }
  }
}
</style>
<style lang="scss" scoped>
.appeal {
  .formBox {
    .leftIcon {
      width: 18px;
      height: 18px;
    }
  }
  .uploadgroup {
    .span {
      margin-top: 6px;
    }
  }
}
</style>