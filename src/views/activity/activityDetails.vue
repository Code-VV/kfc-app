<template>
<div class="activity container_common1">
    <header class="header" :style="{ paddingTop: safeTop+'px'}">
        <div class="header_custom">
            <div class="left" :class="isNight=='night-theme'?'whiteIcons':'darkIcons'">
                <van-icon name="arrow-left" @click="$router.go(-1)" />
            </div>
        </div>
    </header>
    <div class="content c444" v-if="detail">
        <div class="title nav-title">{{$t("activity.xmxq")}}</div>
        <div class="item">
            <img :src="detail.projectImg" class="img">
            <div class="body">
                <div class="title">{{detail.projectName}}</div>
                <!-- <div class="desc">SYTOG认购活动第一期</div> -->
                <!-- <div class="thumbs-up">
                    <van-slider v-model="slider" bar-height="10px" active-color="#3d77e0">
                        <template #button>
                            <div></div>
                        </template>
                    </van-slider>
                    <div class="right" @click="alert('点赞')">
                        <img src="../../assets/images/activity/dz.png" class="img" />
                        <div class="count">333</div>
                    </div>
                </div> -->
                <div class="date c000">
                    <div class="item">
                        <div class="top">{{detail.startTime|ynd}}</div>
                        <div class="bottom">{{$t("activity.ks")}}</div>
                    </div>
                    <div class="item">
                        <div class="top">{{detail.endTime|ynd}}</div>
                        <div class="bottom">{{$t("activity.js")}}</div>
                    </div>
                    <!-- <div class="item">
                        <div class="top">2216:0817</div>
                        <div class="bottom">剩余时间</div>
                    </div> -->
                </div>
                <div class="percentage c000">
                    <div class="name">USDT(ERC20)</div>
                    <van-slider class="slider" :value="(detail.nowNum/detail.sumNum)*100" bar-height="10px" active-color="#fbc400">
                        <template #button>
                            <div></div>
                        </template>
                    </van-slider>
                    <div class="val">{{(detail.nowNum/detail.sumNum)*100|toNumber(2)}}%</div>
                </div>
                <!-- <div class="participate">
                    <div class="item">
                        <div class="top">0</div>
                        <div class="bottom">参与人数</div>
                    </div>
                    <div class="item">
                        <div class="top">0</div>
                        <div class="bottom">参与次数</div>
                    </div>
                </div> -->
                <div class="tit">{{$t("activity.xmxx")}}:</div>
                <div class="row">
                    <div class="label">{{$t("activity.xmmc")}}:</div>
                    <div class="value">{{detail.projectName}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.xmdz")}}:</div>
                    <div class="value">{{detail.projectUrl}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.smkssj")}}:</div>
                    <div class="value">{{detail.startTime|ynd}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.smjssj")}}:</div>
                    <div class="value">{{detail.endTime|ynd}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.yjsmsl")}}:</div>
                    <div class="value">{{detail.nowNum}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.sms")}}:</div>
                    <div class="value">{{detail.sumNum}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.zdsl")}}:</div>
                    <div class="value">{{detail.maxNum}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.zxsl")}}:</div>
                    <div class="value">{{detail.minNum}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.dj")}}:</div>
                    <div class="value">{{detail.coinPice}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.bzmc")}}:</div>
                    <div class="value">{{detail.coinName}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.zt")}}:</div>
                    <div class="value">{{detail.status=="ING"?"进行中":detail.status=="WAIT"?"即将开始":"已结束"}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.cjsj")}}:</div>
                    <div class="value">{{detail.createTime|ynd}}</div>
                </div>
                <div class="row">
                    <div class="label">{{$t("activity.gxsj")}}:</div>
                    <div class="value">{{detail.updateTime|ynd}}</div>
                </div>
                <!-- <div class="row" @click="checked = !checked">
                    <van-checkbox name="1" icon-size="14px" v-model="checked" checked-color="#fbc400">本人已阅读并同意<span class="sel">《交易安全协议》</span>
                    </van-checkbox>
                </div> -->
                <div class="btn" v-if="detail.status=='ING'" @click.stop="showDialog(detail.id)">
                    {{$t("activity.ljrg")}}
                </div>
            </div>
        </div>
    </div>
    <van-dialog v-model="openDialog" title="认购" class="dialog" show-cancel-button cancel-button-color="#ccc" confirm-button-text="认购" confirm-button-color="#fbc400" @confirm="buy">
        <div class="dialog-content">
            <input type="Number" v-model="count" :placeholder="placeNum" class="input"/>
        </div>
    </van-dialog>
</div>
</template>

<script>
import {
    mapActions,
    mapState
} from "vuex";
import {
    Slider,
    Checkbox
} from 'vant';
export default {
    name: "detail",
    components: {
        Slider,
        Checkbox
    },
    computed: {
        ...mapState(["nowThemeInfo"]),

        safeTop() {
            return this.$store.state.safeAreaTop;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        },
        isLogin() {
            return this.$store.state.isLogin;
        },
        i18n() {
            return this.$t("activity");
        }
    },
    data() {
        return {
            detail: undefined,
            id: "",
            type: "",
            count: "",
            openDialog: false,
            checked: false,
            placeNum:''
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.type = this.$route.query.type;
        this.getPeList();
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setCurrency",
            "setPairsName",
            "setPairsName1",
            "setnavBarShowRight"
        ]),
        init() {
            // this.setnavTitle("活动");
            this.setnavTitle("");
            this.setbackRouter("/activity");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(false);
            this.setCurrency("");
            if (this.nowThemeInfo !== "night-theme") {
                document.querySelector(".nav-title").style.color = "#323233";
            } else {
                document.querySelector(".nav-title").style.color = "#fff";
            }
        },
        // 获取列表
        getPeList() {
            this.$get(`/otc/ieo/peList?status=${this.type}`).then(res => {
                if (res.status === "SUCCEED") {
                    let temp = res.result.filter(elem => elem.id == this.id);
                    if (temp.length) {
                        this.detail = temp[0];
                        this.placeNum = "请输入认购数量("+this.detail.minNum+"-"+this.detail.maxNum+")"
                    }
                } else {
                    this.Toast(res.errorMessage);
                }
            });
        },
        // 显示认购框
        showDialog(id) {
            if (!this.$util.isLogin()) {
                return;
            } else {
                this.productId = id;
                this.openDialog = true;
                this.count = "";
            }
        },
        // 认购
        buy() {
            if (this.count < this.detail.minNum || this.count > this.detail.maxNum) {
                 this.Toast(`可购买数量${this.detail.minNum}-${this.detail.maxNum}之间`);
                return;
            }
            this.$util.showLoading();
            this.$post1(`/otc/ieo/order`, {
                projectId: this.id,
                member: this.$store.state.userId,
                num: this.count
            }).then(res => {
                this.Toast.clear();
                if (res.status === "SUCCEED") {
                    this.Toast("认购成功");
                } else {
                    this.Toast(res.errorMessage);
                }
            }).catch(err => {
                this.Toast.clear();
            });
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.dialog {
    .dialog-content {
        width: 100%;
        display: flex;
        justify-content: center;
        margin: 10px auto;

        .input {
            padding: 0 10px;
            margin: auto;
            width: 80%;
            height: 40px;
            border: 1px solid #eaeaea;
            border-radius: 7px;
           
        }
        .input::placeholder{
             color: #a1a1a1;
        }
    }
}

.activity {
    @include base-background();

    .content {
        width: 100vw !important;
        height: 90%;
        overflow-y: auto;
        margin-left: -15px;
        padding: 20px 15px 100px;

        .title {
            font-weight: bold;
            font-size: 28px;
            margin: 0 0 20px;
        }

        .tit {
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0 10px;
        }

        .item {
            .img {
                width: 100%;
                object-fit: contain;
            }
        }

        .body {
            margin: 5px auto 0;

            .img {
                width: 100%;
                height: 150px;
            }

            .title {
                font-weight: bold;
                font-size: 16px;
                margin: 20px 0 20px;
            }

            .desc {
                line-height: 30px;
                font-size: 14px;
            }

            .thumbs-up {
                display: flex;
                align-items: center;

                .right {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    margin-left: 15px;

                    .img {
                        width: 20px;
                        height: 20px;
                    }

                    .count {
                        margin-top: 2px;
                        font-size: 12px;
                    }
                }
            }

            .date {
                margin: 5px 0 20px -15px;
                display: flex;
                justify-content: space-around;
                width: 100vw;
                padding: 20px 15px 0;
                border-top: 5px solid #efefef;

                .item {
                    width: 50%;
                    text-align: center;
                    border-right: 1px solid #efefef;

                    &:last-child {
                        border-right: none;

                        // .top {
                        //     color: #fbc400;
                        // }
                    }

                    .top {
                        font-size: 14px;
                    }

                    .bottom {
                        font-size: 12px;
                        padding-top: 10px;
                    }
                }
            }

            .percentage {
                margin: 10px auto;
                display: flex;
                font-size: 14px;
                align-items: center;
                width: 100vw;
                padding: 0 15px 15px;
                margin-left: -15px;
                border-bottom: 5px solid #efefef;

                .slider {
                    margin: 0 4px;
                }
            }

            .participate {
                margin: 5px 0 10px -15px;
                display: flex;
                justify-content: space-between;
                width: 100vw;
                padding: 10px 15px 15px;
                border-bottom: 5px solid #efefef;

                .item {
                    width: 50%;
                    text-align: center;
                    border-right: 1px solid #efefef;

                    &:last-child {
                        border-right: none;
                    }

                    .top {
                        font-size: 14px;
                    }

                    .bottom {
                        font-size: 12px;
                        padding-top: 10px;
                    }
                }
            }

            .row {
                height: 30px;
                line-height: 30px;
                display: flex;
                align-items: center;

                .label {
                    font-size: 14px;
                }

                .value {
                    font-size: 14px;
                }

                .sel {
                    color: #fbc400;
                }
            }

            .btn {
                width: 95%;
                height: 45px;
                text-align: center;
                line-height: 50px;
                background-color: #fbc400;
                position: fixed;
                margin: auto;
                left: 0;
                right: 0;
                bottom: 0;
                font-size: 16px;
                border-radius: 30px;
                bottom: 20px;
            }
        }

        .footer {
            margin: 5px auto 0;
            text-align: center;
            padding: 20px 0 50px;
        }
    }

    .header {
        position: relative;
        height: 46px;
        width: 100%;

        .header_custom {
            width: 100%;
            position: fixed;
            left: 0;

            .left {
                width: 100%;
                height: 46px;
                font-size: 16px;
                line-height: 46px;
                position: absolute;
                left: 15px;
            }
        }
    }
}
</style>
