<template>
  <div class="container_common agreement">
    <div class="items c888">
      <h4 class="title c222">{{$t('about.yszc')}}</h4>
      <p class="p">
        {{$t('about.dyzs')}}
      </p>
    </div>
    <div class="items c888">
      <h4 class="title c222">{{$t('about.dez')}}</h4>
      <h5 class="subTit">{{$t('about.dyt')}}</h5>
      <h5 class="subTit">{{$t('about.gs')}}</h5>
      <p class="p">{{$t('about.gs1')}}</p>
      <p class="p">
        {{$t('about.gs2')}}
      </p>
      <h5 class="subTit">{{$t('about.sj')}}</h5>
      <p
        class="p"
      >{{$t('about.sj1')}}</p>
      <h5 class="subTit">{{$t('about.jr')}}</h5>
      <p
        class="p"
      >{{$t('about.jr1')}}</p>
      <h4 class="subTit">{{$t('about.xxsy')}}</h4>
      <h5 class="subTit">{{$t('about.tg')}}</h5>
      <div class="subContent">
        <p class="p">{{$t('about.tg1')}}</p>
        <p class="p">{{$t('about.tg2')}}</p>
        <p class="p">{{$t('about.tg3')}}</p>
        <p
          class="p"
        >{{$t('about.tg4')}}</p>
      </div>
      <h5 class="subTit">{{$t('about.gj')}}</h5>
      <p
        class="p"
      >{{$t('about.gj1')}}</p>
      <h4 class="subTit">{{$t('about.xxpr')}}</h4>
      <p class="p">{{$t('about.cxyx')}}</p>
      <div class="subContent">
        <p class="p">{{$t('about.xxpr1')}}</p>
        <p class="p">{{$t('about.xxpr2')}}</p>
        <p class="p">{{$t('about.xxpr3')}}</p>
        <p class="p">{{$t('about.xxpr4')}}</p>
        <p class="p">{{$t('about.xxpr5')}}</p>
      </div>

      <h5 class="subTit">{{$t('about.xxaq')}}</h5>
      <p class="p">{{$t('about.xxaq1')}}</p>
      <p class="p">{{$t('about.xxaq2')}}</p>
      <p
        class="p"
      >{{$t('about.xxaq3')}}</p>
      <h5 class="subTit">{{$t('about.mzsm')}}</h5>
      <p class="p">{{$t('about.mzsm0')}}</p>
      <div class="subContent">
        <p class="p">{{$t('about.mzsm1')}}</p>
        <p class="p">{{$t('about.mzsm2')}}</p>
        <p class="p">{{$t('about.mzsm3')}}</p>
        <p class="p">{{$t('about.mzsm4')}}</p>
        <p class="p">{{$t('about.mzsm5')}}</p>
        <p class="p">{{$t('about.mzsm6')}}</p>
        <p class="p">{{$t('about.mzsm7')}}</p>
        <p class="p">{{$t('about.mzsm8')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  created() {
    this.init();
  },
  components: {},
  data() {
    return {};
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
    init() {
      this.setnavTitle(this.$t(about.yszc));
      this.setbackRouter("");
      this.setnavBarState(true);
      this.settabBarState(false);
      this.setnavBarArrow(true);
    } // 初始化页面
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
 @import '@/assets/scss/theme.scss';

.agreement {
    @include base-background();

  .title {
    font-size: 15px;
    // color: #222222;
    padding: 15px 0 5px;
  }
  .items {
    .p {
      font-size: 13px;
      // color: #888888;
      text-indent: 26px;
      margin-top: 10px;
    }
    .subTit {
      font-size: 13px;
      margin-top: 10px;
    }
    .subContent {
      padding-left: 15px;
      .p {
        text-indent: unset;
      }
    }
  }
}
</style>