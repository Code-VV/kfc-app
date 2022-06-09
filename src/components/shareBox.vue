<template>
<div class="shareBox">
    <van-popup v-model="show" position="bottom" closeable class="models pad_t_b_20" @closed="closed">
        <div>
            <h4 class="center_text pad_l_r_15 size14 c333">{{$t("shareBox.Choose_poster")}}</h4>
            <!-- <h4 class="center_text pad_l_r_15 size14 c333">选择海报</h4> -->
            <div class="picBox">
                <div v-if="types == 1" class="items" @click="choosePosterHand(1)">
                    <img src="../assets/images/home/invitationImg1.png" alt srcset class="imgs" />
                    <img src="../assets/images/home/invitationIcon9.png" alt srcset class="icons" v-show="choosePoster==1" />
                </div>
                <div v-if="types == 2" class="items" @click="choosePosterHand(1)">
                    <img src="../assets/images/home/invitationImg2.png" alt srcset class="imgs" />
                    <img src="../assets/images/home/invitationIcon9.png" alt srcset class="icons" v-show="choosePoster==1" />
                </div>
            </div>
            <!-- <h4 class="center_text pad_l_r_15 size14 mar_t_20 c333">{{$t("shareBox.share")}}</h4> -->
            <div class="flex pad_l_r_15 shareDiv mar_t_15">
                <!-- <div class="items" @click="saveImage(1)">
          <img src="../assets/images/home/invitationIcon6.png" alt srcset class="imgs" />
        </div>
        <div class="items" @click="saveImage(2)">
          <img src="../assets/images/home/invitationIcon7.png" alt srcset class="imgs" />
          </div>-->
                <div class="items" @click="saveImage(3)">
                    <img src="../assets/images/home/invitationIcon8.png" alt srcset class="imgs" />
                    <p class="center_text mar_t_8 size14 c333">{{$t("shareBox.save")}}</p>
                </div>
            </div>
            <!-- style="opacity:0;bottom:-999px;" -->
            <canvas id="shareCanvas" width="100" height="100" class="canvas" v-show="false"></canvas>
            <div v-if="types == 2">
                <div v-if="user.welCode">
                    <vue-qr :text="'https://app.ccr.plus/reg.html#/register?invitation='+user.welCode" :size="220" class="qrcode" :callback="qrcodeCallback" :logoSrc='src2' :logoScale='30' v-show="false"></vue-qr>
                </div>
                <div v-else>
                    <vue-qr text="https://app.ccr.plus/reg.html#/register" :size="220" class="qrcode" :callback="qrcodeCallback" :logoSrc='src2' :logoScale='30' v-show="false"></vue-qr>
                </div>
            </div>
            <div v-if="types == 1">
                <vue-qr text="https://app.ccr.plus/reg.html#/download" :size="220" class="qrcode" :callback="qrcodeCallback" :logoSrc='src2' :logoScale='30' v-show="false"></vue-qr>
            </div>
        </div>
    </van-popup>
</div>
</template>

<script>
import vueQr from "vue-qr";
export default {
    components: {
        vueQr
    },
    props: {
        types: {
            type: Number, //1弹框分享应用 2分享邀请注册
            default: ""
        },
        codeObj: {
            type: Object, //1弹框分享应用
            default: {}
        },
        isShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: true,
            type: "poster", //选择海报
            user: {},
            choosePoster: 1,
            quickMark: "", //二维码
            src2: require('../assets/images/logo.png')
        };
    },
    created() {
        this.isLogin = this.$store.state.isLogin;
    },
    mounted() {
        if (this.types == 2) {
            this.isLogin && this.getCode();
        } else {
            this.user = this.codeObj;
        }
    },
    watch: {
        isLogin(val) {
            val && this.getCode();
            this.isLogin = val;
        },
        isShowHeadPopup(val) {
            if (val == false) {
                this.show = false;
            }
        }
    },
    methods: {
        // 生成二维码路径
        qrcodeCallback(dataUrl, id) {
            this.quickMark = dataUrl || "";
        },
        closed() {
            this.$emit("closePopup");
        },
        //选择海报
        choosePosterHand(type) {
            if (this.choosePoster == type) {
                this.choosePoster = 0;
            } else {
                this.choosePoster = type;
            }
        },
        //获取邀请码和二维码
        getCode() {
            this.$get("member/member/code", {
                memberId: this.userId,
            }).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.user = res.result;
                }
            });
        },
        //生成海报
        saveImage(type) {
            var _this = this;
            if (this.choosePoster == 0) {
                // this.Toast("请选择海报");
                this.Toast(this.$t("shareBox.select_poster"));
                return;
            }
            var m = document.documentElement;
            // this.$util.showLoading("海报生成中...");
            this.$util.showLoading(this.$t("shareBox.Poster_generation") + "...");
            var width =
                ((parseFloat(window.getComputedStyle(m).fontSize) * 10) / 375) * 2;

            var canvas = document.getElementById("shareCanvas");
            canvas.width = 375 * width;
            canvas.height = 667 * width;
            var ctx = canvas.getContext("2d");
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = "bold normal " + 17 * width + "px sans-serif";
            ctx.fillStyle = "#222222";
            ctx.fillText("Meta Currency", width * 80, 620 * width);
            ctx.font = "normal " + 12 * width + "px sans-serif";
            ctx.fillStyle = "#666666";
            ctx.fillText(
                // "邀请你加入SYTOG，长按识别二维码",
                _this.$t("shareBox.Invite_join"),
                width * 80,
                640 * width
            );
            var imgs = new Image();
            var srcImg = this.types == 1 ? require("../assets/images/home/invitationImg1.png") : require("../assets/images/home/invitationImg2.png");
            imgs.src = srcImg;
            imgs.onload = function () {
                ctx.drawImage(imgs, 0, 0, canvas.width, width * 572);
                var img1 = new Image();
                img1.src = require("../assets/images/home/logo1.png");
                img1.onload = function () {
                    ctx.drawImage(img1, width * 9, width * 594, width * 62, width * 62);
                    var img2 = new Image();
                    // img2.src = require("../assets/images/home/qrcode1.png");
                    if (!_this.quickMark) {
                        _this.Toast.clear();
                        return;
                    }
                    setTimeout(res => {
                        _this.Toast.clear();
                    }, 60000);
                    img2.src = _this.quickMark;
                    img2.setAttribute("crossOrigin", "anonymous");
                    img2.onload = function () {
                        ctx.drawImage(
                            img2,
                            width * 304,
                            width * 597,
                            width * 55,
                            width * 55
                        );
                        _this.saveImg(canvas, type);
                    };
                }; //图片加载完成再执行
            };
        },
        //保存图片
        saveImg(canvas, type) {
            var _this = this;
            var imgsrc = canvas.toDataURL("image/png");
            imgsrc = imgsrc.replace("data:image/png;base64,", "");

            /*if (this.$util.confirmPer("photos", "存储")) {*/
                var trans = api.require("trans");
                var imgName = "share" + Math.random() * 10 + ".png";
                trans.saveImage({
                        base64Str: imgsrc,
                        imgPath: "fs://BitFutres/",
                        album: true,
                        imgName: imgName
                    },

                    function (ret, err) {
                        _this.Toast.clear();
                        if (ret.status) {
                            if (type == 1) {
                                _this.shareWxfriend(api.fsDir + "/BitFutres/" + imgName, 1);
                            } else if (type == 2) {
                                _this.shareWxfriend(api.fsDir + "/BitFutres/" + imgName);
                            } else {
                                _this.Toast(_this.$t("shareBox.Picture_saved_successfully"));
                                // _this.Toast("保存图片成功");
                            }
                        } else {
                            if (type == 3) {
                                // _this.Toast("保存图片失败，请重试");
                                _this.Toast(_this.$t("shareBox.Failed_save_picture"));
                            } else {
                                // _this.Toast("海报生成失败，请重试");
                                _this.Toast(_this.$t("shareBox.Poster_generation_failed"));
                            }
                        }
                    }
                );
            /*} else {
                _this.Toast.clear();
            }*/
        }
    },

    computed: {
        userId() {
            return this.$store.state.userId;
        }
    }
};
</script>

<style lang="scss">
.shareBox {
    .models {
        height: 400px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.shareBox {
    .models {
        @include base-background-second();

        .picBox {
            display: flex;
            padding-left: 15px;
            width: 100%;
            overflow-x: auto;
            margin-top: 15px;

            .items {
                padding-right: 20px;
                flex-shrink: 0;
                position: relative;

                img {
                    width: 120px;
                    height: 180px;
                    border-radius: 3px;
                }

                .icons {
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    bottom: 8px;
                    right: 28px;
                }
            }
        }

        .shareDiv {
            .items {
                margin-right: 25px;
            }

            .imgs {
                width: 45px;
            }
        }
    }
}
</style>
