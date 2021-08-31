<template>
<van-tabbar active-color="#fbc400" :inactive-color="isNight=='night-theme'?'#888':'#222'" v-model="active" @change="onChange" id="TabBar" :fixed="false" class="footers bg_tabbar" :style="{ paddingBottom: safeBottom+'px'}">
    <van-tabbar-item v-for="(item,i) in headerList" :key="i" :name="item.name">
        <span>{{item.title}}</span>
        <img slot="icon" slot-scope="props" :src="props.active ?item.icon.active :item.icon.normal" />
    </van-tabbar-item>
</van-tabbar>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    data() {
        return {
            active: null,
        }
    },
    computed: {
        isNight() {
            return this.$store.state.nowThemeInfo;
        },
        isLogin() {
            return this.$store.state.isLogin;
        },
        safeBottom() {
            return this.$store.state.safeAreaBottom;
        },
        name() {
            return this.$route.name;
        },
        headerList() {
            return [{
                    title: this.$t("common.home"),
                    name: "home",
                    icon: {
                        normal: require("../assets/images/tabBar/home.png"),
                        active: require("../assets/images/tabBar/home_1.png")
                    },
                    path: "/"
                },
                {
                    title: this.$t("common.Markets"),
                    // title: "行情",
                    name: "quotes",
                    icon: {
                        normal: require("../assets/images/tabBar/quotation.png"),
                        active: require("../assets/images/tabBar/quotation_1.png")
                    },
                    path: "/quotes"
                },

                //  <!-- Allen 测试环境 注释此处 -->

                {
                    title: this.$t("common.trading"),
                    name: "transaction",
                    icon: {
                        normal: require("../assets/images/tabBar/transaction.png"),
                        active: require("../assets/images/tabBar/transaction_1.png")
                    },
                    path: "/transaction"
                },
                //  <!-- Allen 测试环境 放开此处 -->

                {
                    title: this.$t("common.activity"),
                    name: "activity",
                    icon: {
                        normal: require("../assets/images/tabBar/contract.png"),
                        active: require("../assets/images/tabBar/contract_1.png")
                    },
                    path: "/activity"
                },
                {
                    title: this.$t("common.balance"),
                    name: "assets",
                    icon: {
                        normal: require("../assets/images/tabBar/assets.png"),
                        active: require("../assets/images/tabBar/assets_1.png")
                    },
                    path: "/assets"
                }
            ]
        }

    },
    watch: {
        name(val) {
            // console.log(val)
            this.active = this.$route.name;
        }
    },
    mounted() {
        this.active = this.$route.name;
        // console.log(this.active);
    },
    methods: {
        onChange(index) {
            this.active = index;
            // console.log(this.active);
            if (index == "assets" && !this.isLogin) {
                this.$router.push({
                    path: `login`
                });
                return;
            }
            // if (index == "transaction") {
            //   this.Toast("敬请期待");
            //   return;
            // }
            this.$router.push({
                path: `/${index}`
            });
        }
    }
};
</script>

<style lang="scss" >
</style>
