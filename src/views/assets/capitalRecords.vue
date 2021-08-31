<template>
<!-- :up="mescrollUp" -->

<div class="capitalRecords container_common">
    <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="capitalRecordsList" v-if="capitalRecordsList.length>0">
            <!-- <div class="date">2019-07</div> -->
            <!--  :class="{'border_none':capitalRecordsList.length-1==i}" -->
            <div v-for="(item,i) in capitalRecordsList" :key="i">
                <recordsItem :list="item" :l="capitalRecordsList.length" :n="i" :type='type' />
            </div>
        </div>
        <div v-else>
            <nodata :title="$t('capitalRecords.zwjr')" class="pad_t_100"></nodata>
        </div>
    </mescroll-vue>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
import recordsItem from "../../components/recordsItem";
export default {
    components: {
        recordsItem
    },

    data() {
        return {
            address: "", //提币地址
            coinNum: null, //提币金额
            capitalRecordsList: [], //资金记录列表
            mescrollDown: {
                offset: 46,
                callback: this.downCallback,
                textInOffset:this.$t('add.xlsx'),
                textOutOffset:this.$t('add.sfgx'),
                textLoading:this.$t('add.jzz'),
                auto: false //是否在初始化完毕之后自动执行下拉回调callback; 默认true
            }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
            mescrollUp: {
                callback: this.upCallback,
                auto: false, //是否在初始化完毕之后自动执行下拉回调callback; 默认true
                htmlNodata: '<p class="upwarp-nodata">没有更多数据了</p>'
            },
            type: "",
            pageNum: 1, //当前页码
            pageSize: 20, //当前页数
            noMores: true //没有更多数据了
        };
    },
    methods: {
        ...mapActions([
            "setnavTitle",
            "setnavBarState",
            "settabBarState",
            "setbackRouter",
            "setnavBarArrow",
            "setnavBarBgColor"
        ]),
        init() {
            this.setnavTitle(this.$t('capitalRecords.zjjr'));
            this.setbackRouter("");
            this.setnavBarState(true);
            this.settabBarState(false);
            this.setnavBarArrow(true);
        },

        // mescroll组件初始化的回调,可获取到mescroll对象
        mescrollInit(mescroll) {
            this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
        },
        //下拉刷新
        downCallback() {
            this.pageNum = 1;
            this.getCapitalRecords();
        },
        //上拉加载
        upCallback() {
            if (this.noMores) {
                return;
            }
            this.getCapitalRecords();
        },
        //获取资金记录
        getCapitalRecords(type) {
            console.debug("sssssss");
            var url;
            var data = {
                memberId: this.$store.state.userId,
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };
            if (this.type == "withdrawCoin") {
                //提现
                url = "member/balance/withdraw_recording";
            } else if (this.type == "coinCharging") {
                url = "member/balance/recharge_recording";
                //充币
            } else if (this.type == "transfer") {
                //划转
                url = "member/balance/transfer_recording";
            }
            this.$util.showLoading();
            this.$get(url, data)
                .then(res => {
                    this.Toast.clear();
                    if (res && res.status == "SUCCEED" && res.result) {
                        if (this.pageNum == 1) {
                            this.capitalRecordsList = res.result.records || [];
                        } else {
                            this.capitalRecordsList = this.capitalRecordsList.concat(
                                res.result.records
                            );
                        }
                        if (res.result.records.length < this.pageSize) {
                            this.noMores = true;
                        } else {
                            this.pageNum = this.pageNum + 1;
                            this.noMores = false;
                        }
                        this.mescroll.endSuccess(res.result.records.length, !this.noMores);
                    } else {
                        this.mescroll.endErr();
                    }
                })
                .catch(err => {
                    this.Toast.clear();
                    this.mescroll.endSuccess(10, false);
                });
        }
    },
    mounted() {
        this.init();
        this.type = this.$route.query.type;
        this.getCapitalRecords(1);
    }
};
</script>

<style lang="scss">
</style><style lang="scss" scoped>
@import '@/assets/scss/theme.scss';

.capitalRecords {

    @include base-background();

    .capitalRecordsList {
        .date {
            background: #f8f7fd;
            margin: 0 -15px;
            padding: 8px 15px;
            font-size: 12px;
        }

    }
}
</style>
