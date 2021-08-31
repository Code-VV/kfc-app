<template>
<div class="header_home">
    <!-- 菜单弹出 -->

    <van-popup v-model="show" position="left" :style="{ width: '80%' ,height:'100%'}" @closed="closed" :safe-area-inset-bottom="true">
        
		<div class="ceng">
            <div class="top_pop pad_l_r_35">
				<div class="logo  a_center size16 c222">
			<div class="logo_img">
				<img src="./../assets/images/logo.png" alt="">
			</div>
		</div>
                <div class="moshi">
                    <div>
                        <div @click="changeTheme(1)" v-show="isDay">
                            <img src="../assets/images/user/day.png" alt class="wid33 hei18" />
                        </div>
                        <div @click="changeTheme(2)" v-show="!isDay">
                            <img src="../assets/images/user/night.png" alt class="wid33 hei18" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="top_middle pad_l_r_35 c222 size14">
                <div v-if="isLogin ">
                    <!-- <div v-show="isPhone" class="size18 bold">{{userAccount | encryptionphone}}</div>
            <div v-show="!isPhone" class="size18 bold">{{userAccount | encryptionmail}}</div>-->
                    <div class="size18 bold">
                        <div v-if="isInit" class="size18 bold flex align_center">
                            <span v-show="nickName">{{nickName}}</span>
                            <div v-show="userInfo&&!nickName">
                                <div v-show="!encryption">
                                    <div v-show="isPhone" class="size18 bold">
                                        {{userAccount}}
                                        <van-icon class="io" name="eye-o" @click="closeAsset()" />
                                        <!-- <van-icon name="closed-eye" /> -->
                                    </div>
                                    <div v-show="!isPhone" class="size18 bold">
                                        {{userAccount}}
                                        <van-icon class="io" name="eye-o" @click="closeAsset()" />
                                        <!-- <van-icon name="closed-eye" /> -->
                                    </div>
                                </div>
                                <div v-show="encryption">
                                    <div v-show="isPhone" class="size18 bold">
                                        {{userAccount | encryptionphone}}
                                        <van-icon class="io" name="eye-o"  @click="closeAsset()" />
                                        <!-- <van-icon name="closed-eye" /> -->
                                    </div>
                                    <div v-show="!isPhone" class="size18 bold">
                                        {{userAccount | encryptionmail}}
                                        <!-- <van-icon name="eye-o" /> -->
                                        <van-icon class="io" name="closed-eye" @click="closeAsset()" />
                                    </div>
                                </div>
                                <!-- <div class="iconBox"> -->
                                    <!-- <img src="../assets/images" alt=""> -->
                                    <!-- <img src="" alt class="icons" v-show="true" @click="closeAsset" />
                                    <img src="" alt class="icons" v-show="true" @click="closeAsset" /> -->
                                    <!-- <van-icon name="eye-1" />
                                     -->
                                    <!-- <van-icon name="eye-o" />
                                    <van-icon name="closed-eye" /> -->
                                <!-- </div> -->

                            </div>
                            
                            <!-- <div class="pad_l_r_15" @click="editeName" v-if="!nickName">
                                <img src="../assets/images/home/edit.png" alt srcset class="wid15 hei17" />
                            </div> -->
                        </div>
                        <div v-else style="opacity:0">{{i18n.yhm}}</div>
                    </div>
                    <div class="pad_t_8 pad_b_15 size12 flex align_center">
                        <div class="pad_r_8">
                            UID:
                            <!-- <input
                  id="target"
                  type="text"
                  readonly
                  class="copyText"
                  :value="userId"
                />-->
                            <span class="copyText">{{userId}}</span>
                        </div>
                        <button class="copyUid" data-clipboard-action="copy" data-clipboard-target="#target" v-if="userId" @click="copythat(userId)"></button>
                        <button class="copyUid" v-else></button>
                        <!-- <img
                class="wid10 hei11 inline a_center"
                src="./../../src/assets/images/user/uid.png"
                alt
              />-->
                    </div>
                </div>
                <div v-else @click="login">
                    <!-- <router-link to="/login"> -->
                    <!-- <div class="size18 bold">点击登录</div> -->
                    <div class="size18 bold">{{i18n.djdl}}</div>
                    <div class="pad_t_8 pad_b_15 size12">
                        <!-- <span class="c999">欢迎来到NASDAQ/span> -->
                        <span class="c999">{{i18n.hyld}}</span>
                    </div>
                    <!-- </router-link> -->
                </div>

                <div class="pad_t_b_12 threen c444 size13">
                    <div @click="goCoinCharging">
                        <img src="./../assets/images/home/coinCharging.png" />
                        <div class="pad_t_10">{{i18n.cb}}</div>
                    </div>
                    <div @click="goWithdrawCoin">
                        <img src="./../assets/images/home/withdrawCoin.png" />
                        <div class="pad_t_10">{{i18n.tb}}</div>
                    </div>
                    <div @click="goTransfer">
                        <img src="./../assets/images/home/transfer.png" />
                        <div class="pad_t_10">{{i18n.hz}}</div>
                    </div>
                </div>

                <div class="list pad_t_23">
                    <!-- <div class="item hei40 linehei40">
              <router-link to="/orderManger">
                <img
                  src="./../assets/images/user/dingdan.png"
                  alt
                  class="wid17 a_sub hei17 inline_block"
                />
                <span class="pad_l_16">订单管理</span>
              </router-link>
            </div>-->
                    <div class="item hei40 linehei40 flex-between align_center" @click="goRealname">
                        <div>
                            <img src="./../assets/images/user/renzheng.png" class="wid17 hei17 a_sub inline_block" />
                            <span class="pad_l_16">{{i18n.sfrz}}</span>
                        </div>
                        <img src="../assets/images/user/shenfen.png" srcset class="wid15 hei15" />
                    </div>

                    <!-- <div class="item hei40 linehei40" @click="goInvitation">
              <img
                src="./../assets/images/user/yaoqing.png"
                alt
                class="wid17 hei17 a_sub inline_block"
              />
              <span class="pad_l_16">{{$t('headerPopup.invitefriends')}}</span>
            </div>-->

                    <div class="item hei40 linehei40" @click="accountCenter">
                        <img src="./../assets/images/user/zhanghuzhongxin.png" alt class="wid17 hei17 a_sub inline_block" />
                        <span class="pad_l_16">{{i18n.zhzx}}</span>
                    </div>

                    <div class="item hei40 linehei40" @click="setting">
                        <img src="./../assets/images/user/shezhi.png" alt class="wid17 hei17 a_sub inline_block" />
                        <span class="pad_l_16">{{i18n.szzx}}</span>
                    </div>
                    <!-- <div class="item hei40 linehei40" @click="goPayment">
                        <img src="./../assets/images/user/payType.png" alt class="wid17 hei17 a_sub inline_block" />
                        <span class="pad_l_16">{{i18n.skfs}}</span>
                    </div> -->

                    <div class="item hei40 linehei40" @click="goHelpCenter">
                        <img src="./../assets/images/user/kefu.png" alt class="wid17 hei17 a_sub inline_block" />
                        <span class="pad_l_16">{{i18n.kfzx}}</span>
                    </div>
                    <div class="item hei40 linehei40" @click="goCustomer">
                        <img src="./../assets/images/user/help.png" class="wid17 hei17 a_sub inline_block" alt />
                        <span class="pad_l_16">{{i18n.bzzx}}</span>
                    </div>
                    <div class="item hei40 linehei40" @click="about">
                        <img src="./../assets/images/user/about.png" alt class="wid17 hei17 a_sub inline_block" />
                        <span class="pad_l_16">{{i18n.gywm}}</span>
                    </div>

                </div>
            </div>

            <div class="top_bottom bor_t">
                <van-row class="hei00 linehei54">
                    <van-col :span="12" class="bor_r hei00 a_center" @click="shareApp">
                        <img src="./../assets/images/user/share.png" class="hei17 wid17 inline" alt />
                        <span class="c222 size13 pad_l_13">{{i18n.fxyy}}</span>
                    </van-col>
                    <van-col :span="12" class=" hei00 a_center" @click="invitationRegister">
                        <img src="./../assets/images/user/invitationRegister.png" class="hei17 wid17 inline" alt />
                        <span class="c222 size13 pad_l_13">{{i18n.yqzc}}</span>
                    </van-col>
                </van-row>
            </div>
        </div>
    </van-popup>
    <shareBox v-if="isShow" :types="shareBoxTypes" :codeObj="{}" @closePopup="closePopup" />
</div>
</template>

<script>
import shareBox from "../components/shareBox"; // shareBox

import {
    mapState,
    mapActions,
    mapMutations
} from "vuex";

export default {
    props: {},
    components: {
        shareBox
    },
    data() {
        return {
            shareBoxTypes: 1,
            show: true,
            isDay: true,
            nickName: "", //昵称
            userId: "",
            userAccount: "",
            isPhone: true,
            isShow: false, //分享app
            isShowReName: false, //修改昵称
            themes: ["default", "red"], //所有主题
            isRenzhang: false, //是否实名认证
            userInfo: {},
            isInit: false,
            encryption:true
        };
    },
    created() {
        if (!this.isLogin) {
            return;
        }
        this.getUserInfo();
    },
    mounted() {
        var _this = this;
        // var clipboard = new Clipboard(".copyUid");
        // clipboard.on("success", function(e) {
        //   _this.Toast("复制成功");
        // });
        if (this.isShowHeadPopup == false) {
            this.show = false;
        }
        if (this.isNight == "night-theme") {
            this.isDay = false;
        } else {
            this.isDay = true;
        }
    },
    computed: {
        resetUserinfo() {
            return this.$store.state.resetUserinfo;
        }
    },
    watch: {
        isLogin(VAL) {
            // console.log(VAL);
            this.isLogin = VAL;
            if (!VAL) {
                return;
            }
            this.getUserInfo();
        },
        isShowHeadPopup(val) {
            if (val == false) {
                this.show = false;
            }
        },
        resetUserinfo(val) {
            if (val) {
                this.getUserInfo();
                this.setResetUserinfo(0)
            }
        }
    },
    methods: {
        ...mapMutations(["SET_THEMEINFO", "setStatusBar"]),
        ...mapActions(["setPhone", "setCountryCode", "setResetUserinfo"]),
        changeTheme(n) {
            // 传入的N 是1或者2
            // <!-- Allen 测试环境 注释此处 -->
            // return;
            this.isDay = !this.isDay;
            if (this.isDay) {
                //白天
                // SET_THEMEINFO 重新调取个人信息
                //设置状态栏颜色
                // dark 暗   linght  光
                this.SET_THEMEINFO("default");
                this.setStatusBar("dark");
            } else {
                this.SET_THEMEINFO("night");
                this.setStatusBar("light");
            }
        },
        closeAsset(){
            this.encryption=!this.encryption
        },
        copythat: function (text) {
            var self = this;
            if (!text) {
                return this.Toast("复制失败，请稍后重试");
            }
            var clipBoard = api.require("clipBoard");
            clipBoard.set({
                    value: text
                },
                function (ret, err) {
                    if (ret) {
                        return self.Toast("复制成功");
                    } else {
                        return self.Toast("复制失败，请稍后重试");
                    }
                }
            );
        },
        closed(type) {
            this.$emit("closeHeadPopup");
        },

        //修改昵称
        editeName() {
            // this.isShowReName = true;
            this.$hub.$emit("showReName");
        },
        editeClose() {
            this.isShowReName = false;
        },
        //设置昵称
        setNickName() {
            // this.$post1("member/member/setNickName", data).then(res => {
            //   if (res && res.status == "SUCCEED") {
            //     this.Toast("设置昵称成功");
            //     this.getUserInfo();
            //     this.isShowReName = false;
            //   } else {
            //     this.Toast(res.errorMessage);
            //   }
            // });
            this.getUserInfo();
            this.isShowReName = false;
        },
        //登录
        login() {
            this.show = false;
            this.$router.push({
                path: "/login"
            });
        },
        //去账号中心
        accountCenter() {
            this.show = false;
            if (!this.$util.isLogin()) {
                return;
            }
            this.$router.push({
                path: `/accountCenter`
            });
        },
        //关于我们
        about() {
            this.show = false;
            this.$router.push({
                path: `/about`
            });
        },
        //设置
        setting() {
            this.show = false;
            this.$router.push({
                path: `/setting`
            });
        },
        //付款方式
        goPayment() {
            this.show = false;
            if (!this.$util.isLogin()) {
                return;
            }
            if (!this.isRenzhang) {
                this.Dialog.confirm({
                        title: "",
                        message: "当前未实名认证，去认证"
                    })
                    .then(() => {
                        _this.$router.push("/realname");
                    })
                    .catch(() => {});
                return;
            }
            this.$router.push({
                path: `/payment`
            });
        },

        getUserInfo() {
            this.$get("member/member/getMember", {
                member: this.$store.state.userId
            }).then(res => {
                this.isInit = true;
                if (res.status == "FAILED") {
                    this.Toast(res.errorMessage);
                } else if (res.status == "SUCCEED" && res.result) {
                    this.userInfo = res.result;
                    this.setCountryCode(res.result.areaCode);
                    this.userId = res.result && res.result.uuid ? res.result.uuid : "";
                    this.nickName = res.result.nickName;
                    if (res.result.cardNo == "") {
                        this.isRenzhang = false;
                    } else {
                        this.isRenzhang = true;
                    }
                    if (res.result.phone == "") {
                        this.userAccount = res.result.mail;
                        this.isPhone = false;
                    } else {
                        this.userAccount = res.result.phone;
                        this.isPhone = true;
                        this.setPhone(res.result.phone);
                    }
                }
            });
        },
        //充币
        goCoinCharging() {
            this.show = false;
            if (!this.$util.isLogin()) {
                return;
            }
            this.$router.push({
                path: `/assets/coinCharging`
            });
        },
        //分享app
        shareApp() {
            this.shareBoxTypes = 1;
            this.isShow = true;
        },
        //邀请注册
        invitationRegister() {
            this.shareBoxTypes = 2;
            this.isShow = true;
        },
        //分享弹框关闭
        closePopup() {
            this.isShow = false;
        },
        //提币
        goWithdrawCoin() {
            this.show = false;
            if (!this.$util.isLogin()) {
                return;
            }
            this.$router.push({
                path: `/assets/withdrawCoin`
            });
        },
        //划转
        goTransfer() {
            this.show = false;
            if (!this.$util.isLogin()) {
                return;
            }
            this.$router.push({
                path: `/assets/transfer`
            });
        },
        //实名认证
        goRealname() {
            this.show = false;
            if (!this.$util.isLogin()) {
                return;
            }
            this.$router.push({
                path: `/personalCenter`
            });
        },
        //客服
        goCustomer() {
            this.show = false;
            this.$router.push({
                path: `/customer`
            });
        },
        //好友邀请
        goInvitation() {
            this.show = false;
            if (!this.$util.isLogin()) {
                return;
            }
            this.$router.push({
                path: `/invitation`
            });
        },
        //帮助中心
        goHelpCenter() {
            window.open('http://kf.5621a.cn/index/index/home?visiter_id=&visiter_name=&avatar=&business_id=1&groupid=0&special=1',"_blank")
            // this.show = false;
            // this.$router.push({
            //   path: `/helpCenter`
            // });
            // 打开新页面
            // api.openWin({
                // name: "helpFrame",
                // url: "https://fvexsupport.zendesk.com/hc/zh-cn",
                // bgColor: "#fff"
            // });
            // api.execScript({
                //在指定页面中执行srcipt中脚本
                // name: "helpFrame", //打开外部网页的Win名
                // script: "api.historyBack(function(ret, err) {if (!ret.status) {api.closeWin();}});"
            // }); //要执行的脚本字符串

        }
    },

    computed: {
        i18n() {
            return this.$t("headerPopup");
        },
        isLogin() {
            return this.$store.state.isLogin;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        },
        isShowHeadPopup() {
            return this.$store.state.isShowHeadPopup; //首页弹框显示隐藏
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";
        .iconBox {
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 5px;

            .icons {
                width: 17px;
                height: 17px;
            }
        }
.io{
    margin-top: 3px;
}
.header_home {

    .ceng {
        height: 100%;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;
        @include base-background();
.logo {
    display: flex;
   
	
	.logo_img,.logo_img img {
    width: 2rem;
    height: 2rem;
	}
}
        .top_pop {
            padding-top: 30px;
            padding-bottom: 25px;

            .moshi {
                display: flex;
                justify-content: flex-end;
            }
        }

        .top_middle {
            flex: 1;

            .threen {
                display: flex;
                justify-content: space-between;

                img {
                    width: 31px;
                    height: 23px;
                }
            }
        }

        .top_bottom {
            height: 54px;
        }
    }
}

.copyUid {
    padding: 0;
    display: inline-block;
    width: 10px;
    height: 11px;
    background: url(../../src/assets/images/user/uid.png) no-repeat;
    background-size: 100% 100%;
}

.copyText {
    display: inline-block;
    min-width: 30px;
}
</style>
