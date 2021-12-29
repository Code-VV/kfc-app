<template>
<div id="NavBar" :style="{ paddingTop: safeTop+'px'}">
 
    <van-nav-bar :title="navTitle" left-text right-text :left-arrow="isleftarrow" @click-left="onClickLeft" @click-right="onClickRight" :class="[bgColor||isNight=='night-theme'?'whiteIcons':'darkIcons']" class="headers">
        <div class="pad_r_15" v-if="isShowRight" slot="right">
            <img :src="bgColor||isNight=='night-theme'?require('../assets/images/home/xq_1.png'):require('../assets/images/home/xq.png')" alt srcset class="rightIcons" />
        </div>
    </van-nav-bar>
</div>
</template>

<script>
import {
    mapState,
    mapGetters
} from "vuex";
export default {
    props: {
        isleftarrow: {
            type: Boolean,
            default: true
        },
        isShowRight: {
            type: Boolean,
            default: false
        },
        onClickLeft: {
            type: Function
        },
        onClickRight: {
            type: Function
        },
        bgColor: {
            type: String
        }
    },
    data() {
        return {};
    },
    watch: {
        bgColor(val) {
            this.initData();
        }
    },
    mounted() {
        this.initData();

        // console.log(this.$route.path)
        // if(this.$route.path=='/login'){
        //        document.querySelector(".van-nav-bar").style.backgroundColor = "#fff";
        //       document.querySelector(".van-nav-bar__title").style.color = "#323233";
        // }else{
        //    this.initData();
        // }

    },
    created() {

    },
    methods: {
        initData() {
            let bgColor = this.bgColor;
            // console.log(bgColor)
            if (bgColor) { //传来的

                document.querySelector("#NavBar").style.backgroundColor = bgColor;
                document.querySelector(".van-nav-bar").style.backgroundColor = bgColor;
                document.querySelector(".van-nav-bar__title").style.color = "#fff";
                // if(bgColor=='#fff'){
                //   document.querySelector(".van-nav-bar__title").style.color = "#323233";

                // }else{
                //   document.querySelector(".van-nav-bar__title").style.color = "#fff";

                // }
            } else { //根据当前 白天黑夜模式改变

                if (this.isNight == 'night-theme') { //黑夜模式
                    document.querySelector("#NavBar").style.backgroundColor = "#171E28";
                    document.querySelector(".van-nav-bar").style.backgroundColor = "#171E28";
                    document.querySelector(".van-nav-bar__title").style.color = "#fff";
                } else { //白天模式
                    document.querySelector("#NavBar").style.backgroundColor = "#fff";
                    document.querySelector(".van-nav-bar").style.backgroundColor = "#fff";
                    document.querySelector(".van-nav-bar__title").style.color = "#323233";
                }
            }
        }
        // onClickLeft() {
        //     // console.log(this.backRouter)
        //   if(this.backRouter==''){
        //     this.$router.go(-1)
        //   }else{
        //     this.$commons.backRouter(this.backRouter);
        //   }
        // },
        // onClickRight() {
        //   this.$toast("按钮");
        // }
    },
    computed: {
        isNight() {
            return this.$store.state.nowThemeInfo
        },
        ...mapState(["backRouter", "navTitle"]),
        safeTop() {
            return this.$store.state.safeAreaTop;
        }
    }
};
</script>

<style lang="scss">
#NavBar {
    [class*="van-hairline"]::after {
        border: none;
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
        // padding-right: 15px;
        right: 0;
    }

    .van-nav-bar--fixed {
        z-index: 999 !important;
    }

    .whiteIcons {
        .van-icon-arrow-left:before {
            color: #fff !important;
        }
    }

    .darkIcons {
        .van-icon-arrow-left:before {
            color: #666666 !important;
        }
    }
}
</style><style lang="scss" scoped>
.rightIcons {
    width: 16px;
    height: 16px;
}
</style>
