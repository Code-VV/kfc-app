<template>
  <div style="width:100%;height:100%;">
    <div @click="addImgs" style="width:100%;height:100%;opacity:0"></div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import $ from "jquery";
// import api from '../assets/js/api.js'
export default {
  props: {
    index: {
      type: Number,
      default: 0
    }
  },
  created() {},
  components: {},
  mounted() {},
  data() {
    return {
      name: "用**", //姓名
      accountName: "账户", //账户名
      img1: "" //微信收款码
    };
  },
  computed: {},
  watch: {},
  methods: {
    addImgs(type) {
      var _this = this;
      api.actionSheet(
        {
          title: "",
          cancelTitle: this.$t("form.cancel"),
          // cancelTitle: "取消",
          buttons: [
            _this.$t("form.Select_from_phone_album"),
            _this.$t("form.Take_a_picture")
          ]
          // buttons: ["拍照", "从手机相册选择"]
        },
        function(ret, err) {
          if (ret) {
            _this.getPicture(ret.buttonIndex, type);
          }
        }
      );
    },
    getPicture: function(sourceType, type) {
      var _this = this;
      if (sourceType == 2) {
        // 拍照
        //获取一张图片
        if (!(_this.$util.confirmPer("camera", "相机"))) {
          return;
        }
        _this.$util.showLoading("上传中...");
        api.getPicture(
          {
            sourceType: "camera", //拍照
            encodingType: "png",
            mediaValue: "pic",
            destinationType: "base64",
            allowEdit: false,
            quality: 90,
            saveToPhotoAlbum: true
          },
          function(ret, err) {
            //var imgSrc = ret.base64Data;  如果是base64，要用这个属性获取地址
            // 获取拍照数据并处理
            _this.Toast.clear();
            if (ret) {
              // var imgSrc = ret.data;
              var imgSrc = ret.base64Data;
              _this.$util.dealImage(imgSrc, 500, res => {
                if (_this.index) {
                  _this.$emit("getImg", res, _this.index);
                } else {
                  _this.$emit("getImg", res);
                }
              });

              // _this.getuploadToken(imgSrc, type);
            }
          }
        );
      } else if (sourceType == 1) {
        if (!(_this.$util.confirmPer("photos", "相册"))) {
          return;
        }
        _this.$util.showLoading("上传中...");
        // 从相册中选择
        api.getPicture(
          {
            sourceType: "album", //从相册中选择
            encodingType: "jpg",
            mediaValue: "pic",
            destinationType: "base64",
            allowEdit: false,
            quality: 90,
            saveToPhotoAlbum: true
          },
          function(ret, err) {
            _this.Toast.clear();
            // 获取拍照数据并处理
            if (ret) {
              // var imgSrc = ret.data;
              var imgSrc = ret.base64Data;
              _this.$util.dealImage(imgSrc, 500, res => {
                // _this.$emit("getImg", res);
                if (_this.index) {
                  _this.$emit("getImg", res, _this.index);
                } else {
                  _this.$emit("getImg", res);
                }
              });
              // _this.$emit("getImg", imgSrc);
              // _this.getuploadToken(imgSrc, type);
            }
          }
        );
      }
    },

    // //身份证正面
    // afterRead(file) {
    //   this.imgBox.img1 = file.content || "";
    // },
    // //身份证反面
    // afterRead2(file) {
    //   this.imgBox.img2 = file.content || "";
    // },
    // //
    // afterRead3(file) {
    //   this.imgBox.img3 = file.content || "";
    // },
    //删除图片
    close(index) {
      this.img1 = "";
    }
  },
  destroyed() {}
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
</style>