<template>
<div class="header_home">
    <van-row class="flex align_center" style="height:100%;">
        <van-col :span="8" class>
            <img @click="openPoup" class="wid30 a_middle me_img" src="./../assets/images/home/user-icon-def.png" alt />
        </van-col>
        <van-col :span="8" class="a_center size16 c333 title">Nasdaq</van-col>
        <van-col :span="8" class="a_right a_re" v-show="languageShow">
            <van-dropdown-menu active-color="#fbc400" :overlay="false" class="language">
                <van-dropdown-item v-model="language" title-class="c333" :options="languageList" />
            </van-dropdown-menu>
        </van-col>
    </van-row>
    <!-- 菜单弹出 -->
</div>
</template>

<script>
import Clipboard from "clipboard";
import {
    mapActions
} from "vuex";
export default {
    props: {
        languageShow: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            show: false,
            isDay: true,

            userAccount: "",
            isPhone: true,
            UUID: "",
            language: "en",
            languageList: [{
                    text: "简体中文",
                    value: "zh"
                },
                {
                    text: "English",
                    value: "en"
                },
                {
                    text: "繁体中文",
                    value: "zh_f"
                },
            ],
        };
    },
    created() {
        this.language = window.localStorage.getItem('currentLangue') || "en";
    },
    watch: {
        language(val) {
            window.localStorage.setItem('currentLangue', val)
            this.$i18n.locale = val;
        }
    },
    methods: {
        ...mapActions(["setShowHeadPopup"]),
        // 打开右侧弹框
        openPoup() {
            this.$hub.$emit("showHeadPopup");
            // this.isShowPopup = true;
            this.setShowHeadPopup(true)
        },
        _toView(path) {
            this.$router.push({
                path
            });
        }
    },

    computed: {

    }
};
</script>

<style lang="scss">
.language {
    &:after {
        border: none !important;
        transform: scale(1) !important;
    }

    &.van-dropdown-menu {
        background-color: transparent;
    }

    .van-dropdown-menu__item {
        justify-content: flex-end;
        font-weight: 400;
        margin-right: 10px;
    }

    .van-dropdown-item {
        width: 100px;
        top: 68px !important;
        left: unset;
        right: 10px;
    }

    .van-cell__title {
        text-align: center;
    }

    .van-cell__value {
        display: none;
    }

}
</style><style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.header_home {
    @include base-background();

    .message {
        min-width: 12px;
        height: 12px;
        font-size: 10px;
        color: #fff;
        background: red;
        border-radius: 6px;
        // line-height: 12px;
        text-align: center;
        position: absolute;
        right: -4px;
        top: -4px;
        padding: 0 1px;

    }

    height: 46px;

    .me_img {
        width: 0.8rem;
        height: 0.8rem;
    }

    .title {
        font-weight: 500;
    }

    .ceng {
        height: 100%;
        display: flex;
        box-sizing: border-box;
        flex-direction: column;

        .top_pop {
            padding-top: 60px;
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
                    height: 31px;
                }
            }
        }

        .top_bottom {
            height: 54px;
            border-top: 1px solid #e3e3e3;
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
    border: none;
    width: 100px;
}
</style>
