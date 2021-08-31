<template>
<div class="container_common1 customer">
    <section class="missionCenter pad_b_40">
        <div class="questionList">
            <div class="div pad_l_r_15" v-if="list&&list.length>0">
                <div class="listItem bor_b flex align_center pad_t_b_15" v-for="(item,i) in list" :key="i" :class="{'border_none':i==list.length-1}">
                    <div class="left">
                        <img :src="item.icons" alt class="icon" />
                        <p class="title center_text size13 c111">{{item.name}}</p>
                    </div>
                    <div class="right bor_l pad_l_r_15 flex1 size13 c333">
                        <p class="rightItem bor_b pad_t_b_15" v-for="(item1,k) in item.data" :key="k" @click="openAnswer(i,k)">{{item1.name}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- <footer class="chat" @click="toChat">联系客服</footer> -->
    <!-- <footer class="footer center_text">
      <p class="name">若没找到您想要的答案，可发送问题至邮箱：</p>
      <p class="size15 blue_text mar_t_6">QULIAN@ghjj.com</p>
    </footer> -->
    <van-popup v-model="show" position="bottom" closeable class="models">
        <h2 class="title c222 bor_b">{{answerList.title}}</h2>
        <div class="answer">
            <p class="detail c666" v-for="(item,i) in answerList.answers" :key="i">{{item}}</p>
        </div>
    </van-popup>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import $ from 'jquery'
export default {
    created() {
        this.init();
    },
    data() {
        return {
            list: [],
            show: false, //问题显示
            answerList: {} //答案
        };
    },
    computed: {
        countryCode() {
            return this.$store.state.countryCode;
        }
    },
    mounted() {
        if (this.$store.state.nowThemeInfo == 'night-theme') {
            $('.customer').find('.questionList').css('border', '1px solid rgba(227, 227, 227, 0.1)')
        } else {
            $('.customer').find('.questionList').css('border', '1px solid rgba(227, 227, 227, 0.7)')
        }

        let data = [{
                name: this.$t('kef.zhaq'),
                icons: require("../../assets/images/home/customer1.png"),
                data: [{
                        name: this.$t('kef.rhzc'),
                        data: [
                            this.$t('kef.zc')
                        ]
                    },
                    {
                        name: this.$t('kef.mmzh'),
                        data: [this.$t('kef.gjmmzh')]
                    },
                    {
                        name: this.$t('kef.rhxg'),
                        data: [this.$t('kef.rhxgmm')]
                    }
                ]
            },
            {
                name: this.$t('kef.cht'),
                icons: require("../../assets/images/home/customer3.png"),
                data: [{
                        name: this.$t('kef.rhcb'),
                        data: [
                            this.$t('kef.rhcb1'),
                            this.$t('kef.rhcb2'),
                            this.$t('kef.rhcb3'),
                            this.$t('kef.rhcb4')
                        ]
                    },
                    {
                        name: this.$t('kef.cbdj'),
                        data: [this.$t('kef.cbdj0')]
                    },
                    {
                        name: this.$t('kef.zmtb'),
                        data: [
                            this.$t('kef.zmtb1'),
                            this.$t('kef.zmtb2'),
                            this.$t('kef.zmtb3')
                        ]
                    }
                ]
            },
            {
                name: this.$t('kef.jyxg'), //
                icons: require("../../assets/images/home/customer2.png"),
                data: [{
                        name: this.$t('kef.najg'),
                        data: [
                            this.$t('kef.qqjy')
                        ]
                    },
                    {
                        name: this.$t('kef.smsyx'),
                        data: [this.$t('kef.yxhys')]
                    },
                    {
                        name: this.$t('kef.xjhsj'),
                        data: [
                            this.$t('kef.xjjs'),
                            this.$t('kef.sjjs')
                        ]
                    },
                    {
                        name: this.$t('kef.smszy'),
                        data: [this.$t('kef.smszy1')]
                    },
                    {
                        name: this.$t('kef.smszs'),
                        data: [
                            this.$t('kef.zss')
                        ]
                    },
                    {
                        name: this.$t('kef.smskd'),
                        data: [this.$t('kef.kds')]
                    },
                    {
                        name: this.$t('kef.smskk'),
                        data: [this.$t('kef.kks')]
                    },
                    {
                        name: this.$t('kef.kcsq'),
                        data: [this.$t('kef.kcsqsm')]
                    },
                    {
                        name: this.$t('kef.pcsq'),
                        data: [
                            this.$t('kef.pcsq1'),
                            this.$t('kef.pcsq2'),
                            this.$t('kef.pcsq3')
                        ]
                    },
                    {
                        name: this.$t('kef.cfqp'),
                        data: [this.$t('kef.bc')]
                    }
                ]
            }
        ];
        this.list = data;
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
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setCountryCode"
        ]),
        init() {
            this.setnavTitle(this.$t('kef.kfzx'));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
            setIframe("block");
        }, // 初始化页面
        //显示答案
        openAnswer(i, k) {
            var data = {
                title: this.list[i].data[k].name,
                answers: this.list[i].data[k].data
            };
            this.answerList = data || {};
            this.show = true;
        },
        toChat() {
            this.$router.push({
                path: "/chat"
            });
        }
    },
    beforeDestroy() {
        setIframe();
    }

};
</script>

<style lang="scss">
.customer {
    .models {
        border-top-left-radius: 6px;
        border-top-right-radius: 6px;
    }
}
</style><style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.customer {
    @include base-background();

    .questionList {
        // border: 1px solid rgba(227, 227, 227, 0.7);
        margin-top: 10px;
        margin-bottom: 50px;

        .left {
            width: 88px;

            .icon {
                width: 30px;
                height: 30px;
                margin: 0 auto;
            }
        }

        .rightItem {
            padding: 12px 0;

            &:first-child {
                padding-top: 0;
            }

            &:last-child {
                border: none;
                padding-bottom: 0;
            }
        }
    }

    .chat {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #fff;
        background-color: #fbc400;
        font-size: 16px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    .footer {
        margin: 0 -15px;
        background: #f8f7fd;

        padding: 25px 0;

        .name {
            font-size: 14px;
            color: #666666;
        }
    }

    .models {
        @include base-background();

        min-width: 300px;

        .title {
            font-size: 18px;
            padding: 15px 35px;
            text-align: center;

        }

        .answer {
            height: 240px;
            padding: 10px 15px;
            overflow-y: auto;

            .detail {
                font-size: 14px;

                margin-top: 10px;
            }
        }
    }
}
</style>
