<template>
<div class="container_common langue_set">
    <div class="pad_l_r_10 c333 size14">

        <div v-for="(item,i) in list" :key="item.lang" class="bor_b hei40 flexdd" @click="selLangue(item,i)">
            <div> {{item.name}}</div>
            <!-- <div class="a_right"> -->
            <img v-show="item.active" src="./../../assets/images/user/langue.png" alt="" class="win17 hei14 a_sub inline-block">
            <!-- </div> -->

        </div>

    </div>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
export default {
    created() {
        this.init();
    },
    components: {},
    data() {
        return {
            list: [{
                    lang: 'zh',
                    name: '简体中文',
                    active: true
                },
                {
                    lang: 'en',
                    name: 'English',
                    active: false
                },
                {
                    lang: 'zh_f',
                    name: '繁体',
                    active: false
                }
            ]
        };
    },
    mounted() {
        let current = window.localStorage.getItem('currentLangue');
        let lange = '';
        if (current == null) {
            lange = 'en'
        } else {
            lange = current;
        }

        let index = '';
        this.list.forEach((ele, i) => {
            if (ele.lang == lange) {
                index = i
            }
            ele.active = false
        })

        this.list[index].active = true;

    },
    computed: {},
    watch: {},
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow"
        ]),
        selLangue(item, i) {
            if (item.active) {
                return
            }
            let cun = item.lang;
            // console.log(cun);
            this.list.forEach(ele => {
                ele.active = false
            })
            this.list[i].active = true;

            window.localStorage.setItem('currentLangue', cun)
            this.$i18n.locale = cun;
            setTimeout(() => {
                this.$router.go(-1)
            }, 100)
        },
        init() {
            this.setnavTitle(this.$t("seeting.langue")); //{{$t("announcement.Notice")}}
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        } // 初始化页面
    }
};
</script>

<style lang="scss">
</style><style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.langue_set {
    @include base-background();

    .flexdd {
        display: flex;
        justify-content: space-between;
        align-items: center
    }

}
</style>
