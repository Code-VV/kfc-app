<template>
<div class="container_common helpCenter flex flex_column">
    <div class="titles2">
        <van-nav-bar title="帮助中心" left-text left-arrow="true" @click-left="onClickLeft" :class="isNight=='night-theme'?'whiteIcons':'darkIcons'" class="headers" :style="{ paddingTop: safeTop+'px'}" />
    </div>

    <!-- <div class=" hei00 con_help"></div> -->
    <div class="flex1 hei00 con_help" style="overflow:auto">
        <!-- <img
      src="../../assets/images/home/helpBanner1.png"
      alt
      srcset
      class="imgs"
      @click="goDetail(1)"
    />
    <img
      src="../../assets/images/home/helpBanner2.png"
      alt
      srcset
      class="mar_t_14 imgs"
      @click="goDetail(2)"
    />
    <img
      src="../../assets/images/home/helpBanner3.png"
      alt
      srcset
      class="mar_t_14 imgs"
      @click="goDetail(3)"
    />
    <img
      src="../../assets/images/home/helpBanner4.png"
      alt
      srcset
      class="mar_t_14 imgs"
      @click="goDetail(4)"
    />
     <img
      src="../../assets/images/home/helpBanner4.png"
      alt
      srcset
      class="mar_t_14 imgs"
      @click="goDetail(4)"
      />-->
    </div>
</div>
</template>

<script>
import $ from "jquery";
import {
    mapActions
} from "vuex";
export default {
    // activated() {

    // },

    components: {},
    data() {
        return {
            show: true
        };
    },
    computed: {
        safeTop() {
            return this.$store.state.safeAreaTop;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        }
    },
    mounted() {
        var _this = this;
        this.init();
        setTimeout(() => {
            this.openURLInWin()
        }, 200)
    },
    watch: {},
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setStatusBar"
        ]),
        openURLInWin() {
            // 打开新页面
            api.openFrame({
                name: "helpFrame",
                url: "https://fvexsupport.zendesk.com/hc/zh-cn",
                rect: {
                    x: 0,
                    y: $(".titles2").height(),
                    w: "auto",
                    h: "auto",
                    marginBottom: this.$store.state.safeAreaBottom
                },
                progress: {},
                bounces: false,
                bgColor: "rgba(0,0,0,0)",
                vScrollBarEnabled: true,
                hScrollBarEnabled: true
            });
            // 修改监听返回
            api.addEventListener({
                name: "keyback"
            }, () => this.onClickLeft());
        },
        // 初始化页面
        init() {
            this.setnavTitle("帮助中心");
            this.setbackRouter("");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(false);
        },
        // 返回上一页
        onClickLeft() {
            api.closeFrame({
                name: 'helpFrame'
            });
            setTimeout(() => {
                this.$router.go(-1);
            }, 10);
        },
        goDetail(num) {
            if (num == 1) {
                this.$router.push({
                    path: `/helpCenterDetail1`
                });
            } else if (num == 2) {
                this.$router.push({
                    path: `/helpCenterDetail2`
                });
            } else if (num == 3) {
                this.$router.push({
                    path: `/helpCenterDetail3`
                });
            } else {
                this.$router.push({
                    path: `/helpCenterDetail4`
                });
            }
        }
    },
    destroyed() {
        // 恢复监听返回
        api.addEventListener({
            name: "keyback"
        }, () => {
            if (isTabBar == true) {
                if (Date.now() - lastTapBackTime < 1000) {
                    api.closeWidget({
                        silent: true
                    });
                } else {
                    api.toast({
                        msg: "再次点击退出App"
                    });
                }
                lastTapBackTime = Date.now();
            } else {
                api.historyBack({
                    frameName: 'main'
                }, function (ret, err) {
                    if (!ret.status) {
                        api.closeWin();
                    }
                });
            }
        });
    }
};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.helpCenter {
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
        color: #fff;
    }

    .models {
        height: 400px;
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
}

.helpCenter {
    [class*="van-hairline"]::after {
        border: none;
    }

    .van-nav-bar {
        @include base-background();
    }

    .van-nav-bar__left,
    .van-nav-bar__right {
        bottom: 0;
        height: 46px;
        display: flex;
        align-items: center;
    }

    .van-nav-bar__left {
        .van-icon {
            padding-left: 15px;
        }

        left: 0;
    }

    .van-nav-bar__right {
        padding-right: 10px;
        // right: 0;
    }

    .van-nav-bar--fixed {
        z-index: 999 !important;
    }

    .whiteIcons {
        .van-icon-arrow-left:before {
            color: #fff !important;
        }

        .van-nav-bar__title {
            color: #fff;
        }
    }

    .darkIcons {
        .van-icon-arrow-left:before {
            color: #666666 !important;
        }

        .van-nav-bar__title {
            color: #333;
        }
    }
}
</style><style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.helpCenter {
    @include base-background();

    .imgs {
        width: 100%;
    }
}
</style>
