<template>
<div class="container_common invitation">
    <div class="topBox relative" :style="{ paddingTop: safeTop+'px'}">
        <div class="flex-between">
            <div class="leftIcon">
                <van-icon name="arrow-left" @click="back" />
            </div>
            <!-- <span class=" size13 linehei46 pad_r_15 bold1" @click="rules" style="color:#fff;">返佣规则</span> -->
            <span class=" size13 linehei46 pad_r_15 bold1" @click="rules" style="color:#fff;">{{$t("invitation.Rebate_rules")}}</span>
        </div>
    </div>
    <div class="stepBox pad_l_r_35 flex-between center_text  c666">
        <div class="items wid50">
            <img src="../../assets/images/home/invitationIcon1.png" alt srcset class="wid25 hei25 imgs" />
            <p class="mar_t_10 break_all">{{$t("invitation.Send_invitation_friends")}}</p>
            <!-- <p class="mar_t_10">发送邀请给好友</p> -->
        </div>
        <div class="items flex1 pad_l_r_30">
            <img src="../../assets/images/home/invitationIcon2.png" alt srcset class="wid25 hei25 imgs" />
            <p class="mar_t_10 break_all">{{$t("invitation.registration_transactions")}}</p>
            <!-- <p class="mar_t_10">好友完成注册并进行合约交易</p> -->
        </div>
        <div class="items wid50">
            <img src="../../assets/images/home/invitationIcon3.png" alt srcset class="wid25 hei25 imgs" />
            <p class="mar_t_10 break_all">{{$t("invitation.Get_rebates")}}</p>
            <!-- <p class="mar_t_10">获得相应比例返佣</p> -->
        </div>
    </div>
    <div class="shareBox">
        <div class="btnBox flex-between" @click="setStyle">
            <div class="btn btn1" @click="show=true;type='poster'">{{$t("invitation.Generate_poster")}}</div>
            <!-- <div class="btn btn1" @click="show=true;type='poster'">生成海报</div> -->
            <div class="btn btn2" @click="show1=true;type=''">{{$t("invitation.In_person_invitation")}}</div>
            <!-- <div class="btn btn2" @click="show1=true;type=''">面对面邀请</div> -->
        </div>
        <div class="codeBox flex-between align_center">
            <span class="c333">{{$t("invitation.My_nvitation_code")}}</span>
            <!-- <span class="c333">我的邀请码</span> -->
            <div class="flex align_center">
                <span class="num mar_r_10 c111" v-if="user.welCode">{{user.welCode}}</span>
                <!-- <input id="target" type="text" readonly class="num" value="123e4u" /> -->
                <button class="copy" data-clipboard-action="copy" data-clipboard-target="#target" v-if="user.welCode" @click="copythat(user.welCode)">{{$t("invitation.copy")}}</button>
                <!-- <button class="copy" v-else>复制</button> -->
                <button class="copy" v-else>{{$t("invitation.copy")}}</button>
            </div>
        </div>
    </div>
    <div v-if="invitationList.length>0">
        <div class="listTop flex flex_center align_center">
            <img src="../../assets/images/home/commissionIcon1.png" alt srcset class="icons wid37 mar_t_-5" />
            <span class="linehei31 bold">{{$t("invitation.My_rebates")}}</span>
            <!-- <span class="linehei31 bold">我的返佣</span> -->
        </div>

        <div class="invitationList invitationList1">
            <van-row class="tops flex bor_b pad_b_15 size12 c333">
                <van-col span="10">
                    <span class="leftBox">{{$t("invitation.User_invited_successfully")}}</span>
                    <!-- <span class="leftBox">成功邀请用户</span> -->
                </van-col>
                <van-col span="8" class="pad_l_r_10">
                    <span class="flex">{{$t("invitation.Registration_time")}}</span>
                    <!-- <span class="flex">注册时间</span> -->
                </van-col>
                <van-col span="6">
                    <span class="flex flex_end">{{$t("invitation.Get_rebate")}}</span>
                    <!-- <span class="flex flex_end">获得返佣金</span> -->
                </van-col>
            </van-row>

            <div class="list c333">
                <van-row class="flex size13 items" v-for="(item,i) in invitationList" :key="i">
                    <van-col span="10" class="break_all">
                        <span class="leftBox">{{item.phone}}</span>
                    </van-col>
                    <van-col span="8" class="pad_l_r_10">
                        <span class="flex">{{item.createTime|SubString2(10)}}</span>
                    </van-col>
                    <van-col span="6">
                        <span class="flex flex_end">{{item.number||0}}USDT</span>
                    </van-col>
                </van-row>
            </div>
        </div>
    </div>
    <div class="listTop flex flex_center align_center">
        <img src="../../assets/images/home/commissionIcon2.png" alt srcset class="wid37 mar_r_6" />
        <span class="linehei31 bold">{{$t("invitation.Leaderboard")}}</span>
        <!-- <span class="linehei31 bold">排行榜</span> -->
    </div>
    <div class="invitationList">
        <van-row class="tops flex bor_b pad_b_15 size12 c333">
            <van-col span="6">
                <span class="leftBox">{{$t("invitation.Ranking")}}</span>
                <!-- <span class="leftBox">排名</span> -->
            </van-col>
            <van-col span="10" class="pad_l_r_10">
                <span class="flex">{{$t("invitation.Invitor_account")}}</span>
                <!-- <span class="flex">邀请人账号</span> -->
            </van-col>
            <van-col span="8">
                <span class="flex flex_end">{{$t("invitation.Get_rebate")}}</span>
                <!-- <span class="flex flex_end">获得返佣金</span> -->
            </van-col>
        </van-row>

        <div class="list c333">
            <van-row class="flex size13 items" v-for="(item,i) in rankList" :key="i">
                <van-col span="6" class="flex align_center">
                    <img src="../../assets/images/home/no1.png" alt srcset class="wid35" v-if="i==0" />
                    <img src="../../assets/images/home/no2.png" alt srcset class="wid35" v-else-if="i==1" />
                    <img src="../../assets/images/home/no3.png" alt srcset class="wid35" v-else-if="i==2" />
                    <span class="leftBox" v-else>NO.{{i+1}}</span>
                </van-col>
                <van-col span="10" class="pad_l_r_10 flex align_center break_all">
                    <span class="flex">{{item.brokeragePhone}}</span>
                </van-col>
                <van-col span="8" class="flex align_center flex_end">
                    <span class="flex">{{item.number|SubString(4)}}USDT</span>
                </van-col>
            </van-row>
        </div>
    </div>
    <van-popup v-model="ruleModel" closeable class="ruleBox">
        <div class="title c222">{{$t("invitation.rules_title")}}</div>
        <div class="content c666">
            <p class="p">1.{{$t("invitation.rules1")}}</p>
            <p class="p">2.{{$t("invitation.rules2")}}</p>
            <p class="p">3.{{$t("invitation.rules3")}}</p>
            <p class="p">4.{{$t("invitation.rules4")}}</p>
            <p class="p">5.{{$t("invitation.rules5")}}</p>
            <p class="p">6.{{$t("invitation.rules6")}}</p>
            <!-- <p class="p">3.好友交易返佣每单统计一次，每天0：00结算，0：00之后产生的的返佣会顺延到下一个结算点。</p>
        <p class="p">4.返佣结算方法：返佣额=实际交易手续费*返佣比例。</p>
        <p class="p">5.目前支持返佣的交易有USDT永续合约交易，即被邀请人只有进行了合约交易才能获得返佣，返佣币种与手续费币种一致。</p>
        <p class="p">6.每月1号月度榜单可以看到上月数据。</p> -->
        </div>
    </van-popup>
    <van-popup v-model="show1" position="bottom" closeable class="models pad_t_b_20">
        <div class="flex align_center flex_center" style="height:100%">
            <img :src="user.quickMark" alt srcset class="wid140" v-if="user.quickMark" />
        </div>
    </van-popup>
    <shareBox v-if="show" types="2" :codeObj="user" @closePopup="closePopup" />
</div>
</template>

<script>
import Clipboard from "clipboard";
import {
    mapActions
} from "vuex";
import shareBox from "../../components/shareBox"; // tabbar
import $ from 'jquery'
export default {
    activated() {
        this.init();
        this.initRankList();
        this.initInvitationList(); //邀请列表
        this.getCode(); //获取二维码

        this.setStyle();

        if (this.$store.state.nowThemeInfo == 'night-theme') {
            $('.invitation').css('background-color', this.$bg_night)
            $('.invitation').find('.models').css('background-color', this.$bg_night_second)
            $('.invitation').find('.stepBox').css('background-color', this.$bg_night_second)

            $('.invitation').find('.shareBox').css('background-color', this.$bg_night_second)
            $('.invitation').find('.invitationList').css('background-color', this.$bg_night_second)
            $('.invitation').find('.invitationList1').css('background-color', this.$bg_night_second)
            // $('.invitation').find('.stepBox').css('background-color',this.$bg_night_second)

        } else {
            $('.invitation').css('background-color', '#f6f5f7')
            $('.invitation').find('.models').css('background-color', '#fff')
            $('.invitation').find('.stepBox').css('background-color', '#fff')

            $('.invitation').find('.shareBox').css('background-color', '#fff')
            $('.invitation').find('.invitationList').css('background-color', '#fff')
            $('.invitation').find('.invitationList1').css('background-color', '#fff')
            //  $('.invitation').find('.stepBox').css('background-color','#fff')
        }
    },
    components: {
        shareBox
    },
    data() {
        return {
            show: false,
            show1: false,
            ruleModel: false, //返佣规则弹框
            rankList: [], //排行榜
            invitationList: [], //邀请列表
            user: {}
        };
    },
    computed: {
        countryCode() {
            return this.$store.state.countryCode;
        },
        countryName() {
            return this.$store.state.countryName;
        },
        safeTop() {
            return this.$store.state.safeAreaTop;
        },
        userId() {
            return this.$store.state.userId;
        }
    },

    mounted() {
        var _this = this;
        //排行列表

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
        setStyle() {
            setTimeout(() => {
                if (this.$store.state.nowThemeInfo == 'night-theme') {
                    $('.invitation').find('.models').css('background-color', this.$bg_night_second)

                } else {
                    $('.invitation').find('.models').css('background-color', '#fff')
                }
            }, 0)

        },
        copythat: function (text) {
            var self = this;
            if (!text) {
                return this.Toast(self.$t("invitation.copy_fail"));
                // return this.Toast("复制失败，请稍后重试");
            }
            var clipBoard = api.require("clipBoard");
            clipBoard.set({
                    value: text
                },
                function (ret, err) {
                    if (ret) {
                        return self.Toast(self.$t("invitation.copy_sucess"));
                        // return self.Toast("复制成功");
                    } else {

                        return self.Toast(self.$t("invitation.copy_fail"));

                        // return self.Toast("复制失败，请稍后重试");
                    }
                }
            );
        },
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setStatusBar",
            "setnavBarBgColor"
        ]),
        init() {
            this.setnavTitle("");
            this.setbackRouter("");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(true);
            this.setnavBarBgColor("#2849F0");
            this.setStatusBar("bg");
        }, // 初始化页面
        back() {
            this.$router.go(-1);
        },
        //分享弹框关闭
        closePopup() {
            this.show = false;
        },
        //分享微信好友
        shareWxfriend(src, shareType) {
            var _this = this;
            var wx = api.require("wx");
            wx.isInstalled(function (ret) {
                if (!ret.installed) {
                    _this.Toast("您未安装微信，请使用其它分享方式！");
                    return;
                }
                wx.shareWebpage({
                        apiKey: "wx7209911149bf49ee",
                        scene: shareType ? "session" : "timeline",
                        title: "分享",
                        contentUrl: src
                    },
                    function (new_ret, err) {
                        if (!new_ret.status) {
                            if (err.code != 2) {
                                _this.Toast("分享失败");
                                return;
                            }
                            _this.Toast("取消分享");
                            return;
                        }
                        _this.Toast("分享成功");
                    }
                );
            });
        },

        //规则弹框
        rules() {
            this.ruleModel = true;
        },
        //排行列表
        initRankList() {
            this.$get("member/brokerage_top/month", {}).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.rankList = res.result || [];
                }
            });
        },
        //邀请列表
        initInvitationList() {
            this.$get("member/member/invite_record", {
                memberId: this.userId
            }).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.invitationList = res.result.inviteRecord || [];
                }
            });
        },
        //获取邀请码和二维码
        getCode() {
            this.$get("member/member/code", {
                memberId: this.userId
            }).then(res => {
                if (res && res.status == "SUCCEED" && res.result) {
                    this.user = res.result;
                }
            });
        }
    },
    deactivated() {
        this.setnavBarBgColor("");;
        // this.setStatusBar("dark");
    }
};
</script>

<style lang="scss">
@import '@/assets/scss/theme.scss';

.invitation {
    .van-row {
        margin-left: 0;
        margin-right: 0;
    }

    .leftIcon {
        padding-left: 15px;
        height: 46px;
        display: flex;
        align-items: center;
        width: 35px;
    }

    .van-icon {
        font-size: 20px;
    }

    .van-icon-arrow-left:before {
        color: #fff !important;
    }

    .models {
        background-color: none;

        height: 400px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
}
</style><style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.invitation {

    // background: #f6f5f7;
    .models {
        height: 300px;
        background-color: none;

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
                    width: 12px;
                    height: 12px;
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

    .stepBox {
        // @include base-background-second();
        border-radius: 5px;
        // height: 100px;
        padding: 20px 30px;
        width: 100%;
        margin-top: -50px;
        position: relative;
        z-index: 1;

        .items {
            // color: #666666;
            font-size: 11px;

            .imgs {
                margin: 0 auto;
            }
        }
    }

    .shareBox {
        width: 100%;
        @include base-background-second();
        border-radius: 5px;
        margin-top: 25px;

        .btnBox {
            padding: 0 20px;

            .btn {
                width: 144px;
                line-height: 30px;
                color: #fff;
                font-size: 13px;
                text-align: center;
                margin-top: -10px;
            }

            .btn1 {
                background: url(../../assets/images/home/invitationIcon4.png) no-repeat;
                background-size: 100% 100%;
            }

            .btn2 {
                background: url(../../assets/images/home/invitationIcon5.png) no-repeat;
                background-size: 100% 100%;
            }
        }

        .codeBox {
            padding: 20px 15px;

            .num {
                border: none;
                background: transparent;
                font-size: 15px;
                font-weight: bold;
            }

            .copy {
                font-size: 11px;
                color: #499C7A;
                background: transparent;
                padding: 0;
            }
        }
    }

    .invitationList {
        @include base-background-second();
        // background: #fff;
        padding: 15px;
        width: 100%;
        border-radius: 5px;
        margin-top: 15px;

        .list {
            // height: 150px;
            // overflow-y: auto;
            padding-top: 15px;

            .items {
                margin-top: 15px;

                &:first-child {
                    margin-top: 0;
                }
            }
        }
    }

    //规则弹框
    .ruleBox {

        @include base-background-second();
        width: 345px;
        border-radius: 5px;
        padding: 0 22px 30px;

        .title {
            text-align: center;

            font-size: 15px;
            padding: 40px 0 20px;
        }

        .content {

            // max-height: 220px;
            // overflow-y: auto;
            .p {

                font-size: 13px;
                margin-top: 5px;

                &:first-child {
                    margin-top: 0;
                }
            }
        }
    }

    .listTop {
        width: 236px;
        height: 31px;
        background: url("../../assets/images/home/commissionBg.png") no-repeat;
        background-size: cover;
        margin: 15px auto 0;

        .icons {
            margin-top: -5px;
            margin-right: 6px;
        }
    }
}

.topBox {
    margin: 0 -15px;
    height: 340px;
    background: url("../../assets/images/home/invitationBg.png") no-repeat;
    background-size: 100% 100%;
}
</style>
