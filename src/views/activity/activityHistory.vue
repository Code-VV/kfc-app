<template>
<div class="activity container_common1">
    <header class="header" :style="{ paddingTop: safeTop+'px',height:46+safeTop+'px'}">
        <div class="header_custom">
            <div class="left" :class="isNight=='night-theme'?'whiteIcons':'darkIcons'">
                <van-icon name="arrow-left" @click="back()" />
            </div>
            <div class="center nav-title">{{$t("activity.lsjr")}}</div>
        </div>
    </header>
    <div class="item-list c000" v-if="dataList.length>0">
        <div class="item" v-for="(item,index) in dataList" :key="index" @click="index !== indexSel?indexSel=index:indexSel=-1">
            <div class="row">
                <div class="name"><span class="label">{{$t("activity.mc")}}:</span>{{item.peProjectName}}</div>
                <div class="time">{{$t("activity.sj")}}:{{item.createTime|yndhms}}</div>
            </div>
            <div v-show="index === indexSel">
                <div class="row-start"><span class="label">BDBT{{$t("activity.dj")}}：</span>{{item.pePrice}}</div>
                <div class="row-start"><span class="label">{{$t("activity.sl")}}:</span>{{item.peNum}}</div>
                <div class="row-start"><span class="label">{{$t("activity.ze")}}:</span>{{item.peAmount}}</div>
            </div>
        </div>
    </div>
    <div v-else>
        <nodata :title="$t('qiquan.zwsj')" class="pad_t_100"></nodata>
    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapState
} from "vuex";
export default {
    name: "history",

    computed: {
        ...mapState(["nowThemeInfo"]),

        safeTop() {
            return this.$store.state.safeAreaTop;
        },
        isNight() {
            return this.$store.state.nowThemeInfo;
        },
        userId() {
            return this.$store.state.userId;
        },

        i18n() {
            return this.$t("activity");
        }
    },

    data() {
        return {
            indexSel: -1,
            dataList: [],
            curType: 1,
            mescroll: null, // mescroll实例对象
            mescrollDown: {
                offset: 46,
                callback: this.downCallback,
                textInOffset:this.$t('add.xlsx'),
                textOutOffset:this.$t('add.sfgx'),
                textLoading:this.$t('add.jzz'),
                auto: false //是否在初始化完毕之后自动执行下拉回调callback; 默认true
            } //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
        };
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
            this.setbackRouter("");
            this.setnavBarState(false);
            this.settabBarState(false);
            this.setnavBarArrow(false);
            this.setCurrency("");
            this.getPeOrderList();
            setTimeout(() => {
                if (this.nowThemeInfo !== "night-theme") {
                    document.querySelector(".nav-title").style.color = "#323233";
                } else {
                    document.querySelector(".nav-title").style.color = "#fff";
                }
            }, 100)

        },
        // 获取列表
        getPeOrderList() {
            this.$get(`/otc/ieo/peOrder?member=${this.userId}`).then(res => {
                if (res.status === "SUCCEED") {
                    this.dataList = res.result;
                } else {
                    this.Toast(res.errorMessage);
                }
            });
        },
        //返回上一页
        back() {
            this.$router.go(-1);
        },
        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
        },
        //下拉刷新
        downCallback() {
            this.getBanner(); //轮播图
            this.getNotice(); //公告列表
            setTimeout(res => {
                this.mescroll.endSuccess(); //无参. 注意结束下拉刷新是无参的
            }, 1000);
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/theme.scss";

.activity {
    @include base-background();

    .item-list {
        .item {
            border-bottom: 1px solid #efefef;
            width: 100vw;
            margin-left: -15px;
            padding: 0 15px;

            .row {
                display: flex;
                justify-content: space-between;
                margin: 20px 0;
                font-size: 14px;

                .label {
                    font-size: 12px;
                }

                .time {
                    font-size: 12px;
                }
            }

            .row-start {
                margin: 10px 0;
                font-size: 14px;
                display: flex;
                justify-content: flex-start;

                .label {
                    font-size: 12px;
                }
            }
        }
    }

    .header {
        position: relative;
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

            .center {
                width: 100%;
                height: 46px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 16px;
                line-height: 46px;
            }
        }
    }
}
</style>
