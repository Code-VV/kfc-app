<template>
<div class="container_common realname flex">
    <div v-if="!isRenzhang" class="flex_column" style="min-height:100%;width:100%;overflow-y: auto;overflow-x:hidden">
        <div class="flex1">
        <div class="countryCode" @click="chooseArea">
          <img src="../../assets/images/home/realnameIcon1.png" alt srcset class="leftIcon" />
          <span class="names flex1">{{countryCode?'国家':'请选择国家或地区'}}</span>
          <div class="rightBox">
            <span v-if="countryCode">{{countryName+'（'+countryCode+'）'}}</span>
            <span class="rightIcon"></span>
          </div>
      </div>

        <van-cell-group class="formBox">
            <van-field v-model="name" :placeholder="$t('form.in_your_name')" clearable>
                <!-- <van-field v-model="name" placeholder="请输入姓名" clearable> -->
                <img src="../../assets/images/home/realnameIcon2.png" alt srcset slot="left-icon" class="leftIcon" />
            </van-field>
            <van-field v-model="idCard" :placeholder="$t('form.in_your_Id')" clearable>
                <!-- <van-field v-model="idCard" placeholder="请输入身份证号" clearable> -->
                <img src="../../assets/images/home/realnameIcon3.png" alt srcset slot="left-icon" class="leftIcon" />
            </van-field>
        </van-cell-group>
        <!-- <div class="uploadBox size14">
          <p class="titles pad_t_15 pad_b_12 center_text">上传身份证正反面</p>
          <div class="uploadgroup flex-between">
            <div class="wid161 relative">
              <van-image :src="imgBox.img1" v-if="imgBox.img1" class="wid161 hei116 border_radius"></van-image>
              <img
                @click="addImgs(1)"
                src="../../assets/images/home/realnameImg1.png"
                alt
                class="imgs wid161 hei116"
                v-else
              />
              <van-icon name="cross" class="close" v-if="imgBox.img1" @click="close(1)" />
              <p class="span">点击上传带头像的一面</p>
            </div>
            <div class="relative mar_r_7">
              <van-image :src="imgBox.img2" v-if="imgBox.img2" class="wid161 hei116 border_radius"></van-image>
              <img
                @click="addImgs(2)"
                src="../../assets/images/home/realnameImg2.png"
                alt
                class="imgs wid161 hei116"
                v-else
              />
              <van-icon name="cross" class="close" v-if="imgBox.img2" @click="close(2)" />
              <p class="span">点击上传带国徽的一面</p>
            </div>
          </div>
        </div>
        <div class="uploadBox size14">
          <p class="titles pad_t_15 pad_b_12 center_text">上传手持身份证照片</p>
          <div class="uploadgroup flex flex_center">
            <div class="wid161 relative">
              <van-image :src="imgBox.img3" v-if="imgBox.img3" class="wid161 hei116 border_radius"></van-image>
              <img
                @click="addImgs(3)"
                src="../../assets/images/home/realnameImg3.png"
                alt
                class="imgs wid161 hei116"
                v-else
              />            
              <van-icon name="cross" class="close" v-if="imgBox.img3" @click="close(3)" />
              <p class="span">点击上传手持身份证照片</p>
            </div>
          </div>
      </div>-->
        <van-button class="hei42 size16 mar_t_100" type="info" block @click="submit">{{$t("form.submit")}}</van-button>
    </div>
            </div>
    <!-- <div v-else class="flex align_center size15 pad_t_10" style=“width:100%>
      <img src="../../assets/images/home/realnameIcon4.png" alt class="wid20 hei20 mar_r_15" />
      <span>张彦龙</span>
      <div class="right_text flex1">{{idNUm|cardNum}}</div>
    </div> -->

    <div v-else class=" size15 pad_t_20" style="width:100%">
        <van-row>
            <van-col :span="3">
                <img src="../../assets/images/home/realnameIcon4.png" alt class="wid20 hei20 mar_r_15" />
            </van-col>
            <van-col :span="7">
                <span class="c333">{{IdName}}</span>
            </van-col>
            <van-col :span="14">
                <div class="right_text c333">{{idNUm|cardNum}}</div>
            </van-col>
        </van-row>

    </div>

</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import axios from "../../axios/index";
import $ from 'jquery'
export default {
    created() {
        this.init();
        this.getUserInfo()
    },
    components: {},
    mounted() {
        setTimeout(() => {
            if (this.$store.state.nowThemeInfo == 'night-theme') {
                $(".van-cell-group").css("cssText", "background-color:#000!important") //;要想修改多个属性，可以这么做：

            } else {

            }
        }, 100)

    },
    data() {
        return {
            isRenzhang: false,
            // country: "中国（+86）", //国家code码
            idNUm: '',
            IdName: '',
            name: "", //姓名
            idCard: "", //身份证号
            imgBox: {
                img1: "", //正面
                img2: "", //反面
                img3: "" //反面
            }, //图片上传
            domain: ""
        };
    },
    computed: {
        countryCode() {
            return this.$store.state.countryCode;
        },
        countryName() {
            return this.$store.state.countryName;
        }
    },
    watch: {
        name(val) {
            this.name = val.replace(/\s+/g, "");
        },
        idCard(val) {
            this.idCard = val.replace(/\s+/g, "");
        }
    },
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setCountryCode",
            "setCountryName"
        ]),
        init() {
            this.setnavTitle(this.$t("realname.IDverification"));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        }, // 初始化页面

        getUserInfo() {

            this.$get('member/member/getMember', {
                member: this.$store.state.userId
            }).then(res => {
                if (res.status == "FAILED") {
                    this.Toast(res.errorMessage)
                } else if (res.status == "SUCCEED") {
                    let data = res.result;
                    if (data.cardNo == '') {
                        this.isRenzhang = false;
                    } else {
                        this.isRenzhang = true;
                        this.idNUm = data.cardNo;
                        this.IdName = data.uname;
                    }

                }
            })
        },

        //选择国家
        chooseArea() {
            this.$router.push({
                path: `/chooseArea`
            });
        },
        addImgs(type) {
            var _this = this;
            api.actionSheet({
                    title: "",
                    cancelTitle: this.$t("from.cancel"),
                    // cancelTitle: "取消",
                    buttons: [this.$t("from.Take_a_picture"), this.$t("from.Select_from_phone_album")]
                    // buttons: ["拍照", "从手机相册选择"]
                },
                function (ret, err) {
                    if (ret) {
                        _this.getPicture(ret.buttonIndex, type);
                    }
                }
            );
        },
        getPicture: function (sourceType, type) {
            var _this = this;
            if (sourceType == 1) {
                // 拍照
                //获取一张图片
                api.getPicture({
                        sourceType: "camera", //拍照
                        encodingType: "png",
                        mediaValue: "pic",
                        allowEdit: false,
                        quality: 90,
                        saveToPhotoAlbum: true
                    },
                    function (ret, err) {
                        //var imgSrc = ret.base64Data;  如果是base64，要用这个属性获取地址
                        // 获取拍照数据并处理
                        if (ret) {
                            var imgSrc = ret.data;
                            // alert(imgSrc);
                            _this.getuploadToken(imgSrc, type);
                        }
                    }
                );
            } else if (sourceType == 2) {
                // 从相册中选择
                api.getPicture({
                        sourceType: "album", //从相册中选择
                        encodingType: "jpg",
                        mediaValue: "pic",
                        allowEdit: false,
                        quality: 90,
                        saveToPhotoAlbum: true
                    },
                    function (ret, err) {
                        // 获取拍照数据并处理
                        if (ret) {
                            var imgSrc = ret.data;
                            _this.getuploadToken(imgSrc, type);
                        }
                    }
                );
            }
        },
        getuploadToken(imgSrc, type) {
            var _this = this;
            axios
                .post("https://upload-z1.qiniup.com", {})
                .then(res => {
                    _this.domain = res.domain;
                    _this.uploadImg(res.upToken, imgSrc, type);
                })
                .catch(err => {
                    this.Toast(this.$t("toast.Upload_failed"));
                    // this.Toast("上传失败，请稍后重试");
                });
        },
        uploadImg(token, url, type) {
            var _this = this;
            axios
                .post("https://upload-z1.qiniup.com", {
                    token: token
                })
                .then(res => {
                    this.Toast(this.$t("toast.Uploaded_successfully"));
                    // this.Toast("上传成功");
                    if (type == 1) {
                        this.imgBox.img1 = _this.domain + "/" + ret.hash;
                    } else if (type == 2) {
                        this.imgBox.img2 = _this.domain + "/" + ret.hash;
                    } else {
                        this.imgBox.img3 = _this.domain + "/" + ret.hash;
                    }
                });
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
            if (index == 1) {
                this.imgBox.img1 = "";
            } else if (index == 2) {
                this.imgBox.img2 = "";
            } else {
                this.imgBox.img3 = "";
            }
        },
        //提交
        submit() {
            var _this = this;
            // var regIdNo = /[\u4E00-\u9FA5]/g; //身份证号
            // var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            var userName = _this.name;
            var idCard = _this.idCard;
            var regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
            // if (!this.countryCode) {
            //   this.Toast("请选择国家");
            //   return false;
            // }
            if (!userName) {
                this.Toast(this.$t("toast.Name_required"));
                // this.Toast("名称不能为空");
                return false;
            }
            if (regEn.test(userName) || regCn.test(userName)) {
                this.Toast(this.$t("toast.Cannot_contain_special_characters"));

                // this.Toast("名称不能包含特殊字符");
                return false;
            }
            if (!idCard) {
                this.Toast(this.$t("toast.Id_card_required"));

                // this.Toast("身份证不能为空");
                return false;
            }
            // if (!regIdNo.test(idCard)) {
            //     this.Toast(this.$t("toast.Enter_ID_number"));

            //     // this.Toast("请输入正确的身份证号！");
            //     return false;
            // }
            this.toSubmit()
        },

        toSubmit() {
            this.$util.showLoading();
            let pr = {
                member: this.$store.state.userId,
                name: this.name,
                cardNo: this.idCard
            }
            this.$post1('member/member/setAuthen', pr).then(res => {
                this.Toast.clear();
                if (res.status == "FAILED") {
                    this.Toast(res.errorMessage)
                } else if (res.status == "SUCCEED") {

                    this.Toast(this.$t("toast.Submitted_successfully"));

                    // this.Toast('提交成功')
                    setTimeout(() => {
                        this.$router.go(-1)
                    }, 500)

                }
            })
        }
    },
    destroyed() {
        this.setCountryCode("");
        this.setCountryName("");
    }
};
</script>

<style lang="scss">
@import '@/assets/scss/theme.scss';

.realname {
    @include base-background();

    .van-hairline--top-bottom::after,
    .van-hairline-unset--top-bottom::after {
        border-top: 0;
    }

    .formBox {
        .van-cell:not(:last-child)::after {
            left: 0;
        }

        .van-cell {
            padding: 12px 0;
        }

        .van-field__left-icon {
            display: flex;
            align-items: center;
            margin-right: 10px;
        }
    }

    .van-button--info {
        background: #fbc400;
        border: 1px solid #fbc400;
    }

    .uploadgroup {
        .border_radius {
            .van-image__img {
                border-radius: 4px;
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
</style><style lang="scss" scoped>
.realname {
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
