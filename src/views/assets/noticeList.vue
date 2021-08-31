<template>
<div class="notice-list">
    <van-cell v-for="(item,index) in noticeList" :key="index" :title="item.title" is-link :to="`/noticeDetail?id=${item.id}`" />
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    data() {
        return {
            // 公告列表
            noticeList: [],
        }
    },
    mounted() {
        this.init();
        this.getNotice();
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
            this.setnavTitle(this.$t('add.gg'));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
            this.setnavBarShowRight(false);
        },
        //公告列表
        getNotice() {
            let data = {
                noticeType: "OFFICIAL",
                global: "CHINESE_SIM"
            };
            //获取公告列表
            this.$get("data/data/getNotices", data).then(res => {
                if (res && res.status == "SUCCEED") {
                    this.noticeList = res.result || [];
                }
            });
        },

    },

};
</script>

<style lang="scss">
@import "@/assets/scss/theme.scss";

.notice-list {
    height: 100%;
}
</style>
