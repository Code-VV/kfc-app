<template>
<div class="reName">
    <van-popup v-model="show" class="updateBox" @closed="close" :close-on-click-overlay="false" :class="isTop?'inputTop':'inputAuto'">
        <div class="content flex1 size14 c_222 left_text">
            <img src="../assets/images/home/editeBg.png" alt srcset class="wid250 hei168" />
            <van-field v-model="name" :placeholder="$t('add.ncznsz')" class="userName size15 c999 mar_t_10" clearable />
        </div>

        <div class="confirmBtn mar_t_15 flex">
            <span class="flex1" @click="close">{{$t('add.qx')}}</span>
            <span class="blue_bg flex1" @click="submit">{{$t('add.qd')}}</span>
        </div>
    </van-popup>
</div>
</template>

<script>
import {
    mapActions
} from "vuex";
var mam;
export default {
    data() {
        return {
            show: true,
            // reason: {} //更新信息
            reason: {}, //更新信息
            name: "",
            isTop: false
        };
    },
    watch: {},
    mounted() {
        if (this.$util.IsIA() == 2) {
            document.body.addEventListener("focusin", () => {
                this.isTop = true;
            });
            document.body.addEventListener("focusout", () => {
                this.isTop = false;
            });
        }
    },
    destroyed() {},
    methods: {
        //关闭
        close() {
            this.$emit("editeClose");
        },
        submit() {
            // console.log(this.name);
            if (!this.name) {
                this.Toast(this.$t('add.qsrnc'));
                return;
            }
            let data = {
                member: this.$store.state.userId,
                nickName: this.name
            };
            this.$util.showLoading();
            this.$post1("member/member/setNickName", data).then(res => {
                this.Toast.clear();
                if (res && res.status == "SUCCEED") {
                    this.Toast(this.$t('add.sznccg'));
                    this.$emit("setNickName");
                    this.$emit("getUserInfo");
                } else {
                    this.Toast(res.errorMessage);
                }
            });
        }
    },
    computed: {}
};
</script>

<style lang="scss">
.reName {
    .van-popup__close-icon--top-right {
        top: 7px;
        right: 10px;
    }

    .van-icon-cross:before {
        color: #fff;
    }
}
</style><style lang="scss" scoped>
.reName {
    .updateBox {
        width: 300px;
        height: 309px;
        padding: 15px 0 0;
        display: flex;
        flex-direction: column;
        text-align: center;
        border-radius: 10px;

        &.inputTop {
            &.van-popup--center {
                top: 70%;
                transform: translate3d(-50%, -50%, 0);
            }
        }

        &.inputAuto {
            &.van-popup--center {
                top: 50%;
                transform: translate3d(-50%, -50%, 0);
            }
        }

        .content {
            padding: 0 25px;

            .userName {
                border: 1px solid rgba(204, 204, 204, 1);
                border-radius: 6px;
                padding: 10px;
            }
        }

        .confirmBtn {
            width: 100%;
            height: 50px;
            line-height: 49px;
            border-radius: 4px;
            text-align: center;
            border-top: 1px solid rgba(227, 227, 227, 0.7);
            font-size: 15px;
        }
    }
}
</style>
