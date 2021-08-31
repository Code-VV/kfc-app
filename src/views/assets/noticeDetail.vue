<template>
<div class="notice-detail c222">
    <!--  -->
    <h1 class="title">{{noticeDetail.title}}</h1>
    <div class="content" v-html="noticeDetail.content" />
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    data() {
        return {
            // 公告id
            noticeId: "",
            // 公告详情
            noticeDetail: {},
        }
    },
    created() {
        this.noticeId = this.$route.query.id;
    },
    mounted() {
        this.init();
        this.getNoticeDetail();
    },
    destroyed() {
        this.setnavBarShowRight(false);
    },
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setnavBarBgColor",
            "setnavBarShowRight"
        ]),
        init() {
            this.setnavTitle("公告");
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
            this.setnavBarShowRight(false);
        },
        //公告详情
        getNoticeDetail() {
            let data = {
                noticeType: "OFFICIAL",
                global: "CHINESE_SIM"
            };
            //获取公告列表
            this.$get("data/data/getNotices", data).then(res => {
                if (res && res.status == "SUCCEED") {
                    if (res.result && res.result.length) {
                        this.noticeDetail = res.result.filter(elem => elem.id == this.noticeId)[0];
                        this.setnavTitle(this.noticeDetail.title);
                    }
                }
            });
        },

    },

};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.notice-detail {
    height: 100%;

    .title {
        text-align: center;
        margin: 30px 0;
        font-weight: bold;
        line-height: 30px;
    }

    .content {
        padding: 0 20px;
        margin-bottom: 100px;
        font-size: 14px;

        p {
            text-indent: 2em;
            line-height: 28px;
            color: inherit !important;
        }
    }
}
</style>
