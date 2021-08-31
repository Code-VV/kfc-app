<template>
<div class="container_common realname" v-if="isInit">
    <div class="uploadBox size15" v-if="userInfo.cardState==null||userInfo.cardState=='REFUSE'">
        <div class="uploadgroup">
            <div class="flex_column relative align_center mar_t_15">
                <!-- v-if="imgBox.img1" -->
                <div v-if="imgBox.img1 " class="relative imgs hei194">
                    <van-image :src="imgBox.img1" class="hei194 border_radius imgs"></van-image>
                    <div v-if="imgBox.img1">
                        <van-icon name="cross" class="close" @click="close(1)" />
                    </div>
                </div>
                


                <div v-if="!imgs.img01">
                    <van-uploader :after-read="afterRead1" :max-size="10*1024 * 1024" @oversize="onOversize">
                        <img src="../../assets/images/home/realnameImg1.png" alt class="imgs hei194" />    
                    </van-uploader>
                </div>
                <div v-else class="relative">
                    <!-- <van-uploader> -->
                    <img :src="imgs.img01" alt class="imgs hei194" />
                    <!-- </van-uploader> -->
                    <!-- <img src="../../assets/images/home/realnameImg1.png" alt class="imgs hei194" /> -->
                    <!-- <getPicture class="absolute" style="top:0;right:0;bottom:0;left:0;z-index:2" @getImg="getImgSrc(arguments)" :index="1" /> -->
                </div>

                <p class="span">{{$t('gjrz.zm')}}</p>
            </div>
            <div class="flex_column align_center mar_t_15">
                <div v-if="imgBox.img2 " class="relative imgs hei194">
                    <van-image :src="imgBox.img2" v-if="imgBox.img2" class="hei194 border_radius imgs"></van-image>
                    <div v-if="imgBox.img2">
                        <van-icon name="cross" class="close" @click="close(2)" />
                    </div>
                </div>



                <div v-if="!imgs.img02">
                    <van-uploader :after-read="afterRead2" :max-size="10*1024 * 1024" @oversize="onOversize">
                        <img src="../../assets/images/home/realnameImg2.png" alt class="imgs hei194" />    
                    </van-uploader>
                </div>
                <div v-else class="relative">
                    
                    <!-- <van-uploader> -->
                    <img :src="imgs.img02" alt class="imgs hei194" />    
                    <!-- </van-uploader> -->
                    
                    <!-- <getPicture class="absolute" style="top:0;right:0;bottom:0;left:0;z-index:99" @getImg="getImgSrc(arguments)" :index="2" /> -->
                </div>
                <p class="span">{{$t('gjrz.fm')}}</p>
            </div>
            <div class="flex_column align_center mar_t_15">
                <div v-if="imgBox.img3 " class="relative imgs hei194">
                    <van-image :src="imgBox.img3" v-if="imgBox.img3" class="hei194 border_radius imgs"></van-image>

                    <div v-if="imgBox.img3">
                        <van-icon name="cross" class="close" @click="close(3)" />
                    </div>
                </div>


                <div v-if="!imgs.img03">
                    <van-uploader :after-read="afterRead3" :max-size="10*1024 * 1024" @oversize="onOversize">
                        <img src="../../assets/images/home/realnameImg3.png" alt class="imgs hei194" />    
                    </van-uploader>
                </div>


                <div v-else class="relative">
                    <!-- <van-uploader> -->
                    <img :src="imgs.img03" alt class="imgs hei194" />    
                    <!-- </van-uploader> -->
                    <!-- <img src="../../assets/images/home/realnameImg3.png" alt class="imgs hei194" /> -->
                    <!-- <getPicture class="absolute" style="top:0;right:0;bottom:0;left:0;z-index:99" @getImg="getImgSrc(arguments)" :index="3" /> -->
                </div>
                <p class="span">{{$t('gjrz.sc')}}</p>
            </div>
        </div>
        <van-button class="hei42 size16 mar_t_20" type="info" block @click="submit">{{$t("form.submit")}}</van-button>
    </div>
    <div class="flex_column align_center" v-else>
        <img src="../../assets/images/home/examine.png" alt srcset class="mar_t_40 wid160 hei160" />
        <div class="size20 c222 bold mar_t_20">{{$t('gjrz.shz')}}</div>
        <p class="size15 c222" style="margin-top:10px">{{$t('gjrz.dd')}}</p>
        <van-button class="hei42 size16 mar_t_30" type="info" block @click="goHome">{{$t('gjrz.gun')}}</van-button>
    </div>
    <!-- <div v-else class="flex align_center size15 pad_t_10" style=“width:100%>
      <img src="../../assets/images/home/realnameIcon4.png" alt class="wid20 hei20 mar_r_15" />
      <span>张彦龙</span>
      <div class="right_text flex1">{{idNUm|cardNum}}</div>
    </div>-->
            <!-- <button @click="onOversize">测试</button> -->
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import axios from "../../axios/index";
import getPicture from "@/components/getPicture";
import $ from "jquery";
import { Dialog } from 'vant';
export default {
    created() {
        this.init();
    },
    components: {
        getPicture,
        [Dialog.Component.name]: Dialog.Component,
    },
    mounted() {
        this.getUserInfo();
        setTimeout(() => {
            if (this.$store.state.nowThemeInfo == "night-theme") {
                $(".van-cell-group").css("cssText", "background-color:#000!important"); //;要想修改多个属性，可以这么做：
            } else {}
        }, 100);
    },
    data() {
        return {
            imgBox: {
                img1: null, //正面
                img2: "", //反面
                img3: "" //反面
            }, //图片上传
            imgs:{
                img01:'',
                img02:'',
                img03:''
            },
            userInfo: {}, //个人信息
            isInit: false
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
            "setnavBarArrow",
            "setCountryCode",
            "setCountryName"
        ]),
        onOversize(){
            Dialog.alert({
                title: this.$t('gjrz.ts'),
                message: this.$t('gjrz.scwj'),
                }).then(() => {
            // on close
            });
        },
        afterRead1(file){
            console.log(this.imgs.img01);
            console.log("01");
            let form = new FormData();
            form.append('file', file.file);
            axios.post("/member/member/upload",form).then((res)=>{
                this.imgs.img01=res.path
                console.log("!!!!!!!!!!!!!");
            })
            console.log(this.imgs.img01);
        //   axios.post({
        //     url: "/member/member/upload",
        //     headers:{
        //       'Content-type': 'multipart/form-data'
        //     },
        //     data:file
        //         }).then(()=>{
        //             console.log(res);
        //         })
        },
        afterRead2(file){
            console.log(this.imgs.img01);
            console.log("01");
            let form = new FormData();
            form.append('file', file.file);
            axios.post("/member/member/upload",form).then((res)=>{
                this.imgs.img02=res.path
                console.log("!!!!!!!!!!!!!");
            })
            console.log(this.imgs.img01);
            // console.log("02");
            // let form = new FormData();
            // form.append('file', file.file);
            // axios.post("/member/member/upload",file).then((res)=>{
            //     console.log(res);
            // })
        },
        afterRead3(file){
            console.log(this.imgs.img01);
            console.log("01");
            let form = new FormData();
            form.append('file', file.file);
            axios.post("/member/member/upload",form).then((res)=>{
                this.imgs.img03=res.path
                console.log("!!!!!!!!!!!!!");
            })
            console.log(this.imgs.img01);
            // console.log("03");
            // let form = new FormData();
            // form.append('file', file.file);
            // axios.post("/member/member/upload",file).then((res)=>{
            //     console.log(res);
            // })
        },
        init() {
            this.setnavTitle(this.$t('gjrz.gjrz'));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        }, // 初始化页面
        //回首页
        goHome() {
            this.$router.push({
                path: `/home`
            });
        },
        //获取本地图片路径
        getImgSrc(e) {
            if (e["1"] == 3) {
                this.imgBox.img3 = e["0"];
            } else if (e["1"] == 2) {
                this.imgBox.img2 = e["0"];
            } else {
                this.imgBox.img1 = e["0"];
            }
        },
        //删除图片
        close(index) {
            if (index == 1) {
                this.imgBox.img1 = "";
            } else if (index == 2) {
                this.imgBox.img2 = "";
            } else if (index == 3) {
                this.imgBox.img3 = "";
            }
        },
        //提交
        submit() {
            // if (!this.imgBox.img1) {
            //     this.Toast("请上传身份证正面");
            //     return;
            // }
            // if (!this.imgBox.img2) {
            //     this.Toast("请上传身份证反面");
            //     return;
            // }
            // if (!this.imgBox.img3) {
            //     this.Toast("请上传手持证件照");
            //     return;
            // }
            if (!this.imgs.img01) {
                this.Toast(this.$t('add.qsczm'));
                return;
            }
            if (!this.imgs.img02) {
                this.Toast(this.$t('add.qscfm'));
                return;
            }
            if (!this.imgs.img03) {
                this.Toast(this.$t('add.qscsc'));
                return;
            }
            this.$util.showLoading();
            // 上传身份证照片
            var data = {
                member: this.$store.state.userId,
                positiveFile: this.imgs.img01,
                sideFile: this.imgs.img02,
                handLink: this.imgs.img03
            };

            // var fd = new FormData();
            // fd.append("positiveFile", this.$util.base64toFile(data.positiveFile));
            // fd.append("sideFile", this.$util.base64toFile(data.sideFile));
            // fd.append("handLink", this.$util.base64toFile(data.handLink));
            this.$post1(
                "member/member/setCardImg", {
                    member: this.$store.state.userId,
                    positiveFile: this.imgs.img01,
                    sideFile: this.imgs.img02,
                    handLink: this.imgs.img03
                },
            ).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.Toast("上传成功，请等待审核");
                    this.getUserInfo();
                } else {

                    this.Toast(res.errorMessage);
                }
            });
        },
        getUserInfo() {
            this.$get("member/member/getMember", {
                member: this.$store.state.userId
            }).then(res => {
                if (res.status == "FAILED") {
                    this.Toast(res.errorMessage);
                } else if (res.status == "SUCCEED") {
                    this.isInit = true;
                    let data = res.result;
                    this.userInfo = data;
                }
            });
        }
    },
    destroyed() {
        this.setCountryCode("");
        this.setCountryName("");
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

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

        .imgs {
            width: 269px;
        }
    }
}
</style>
