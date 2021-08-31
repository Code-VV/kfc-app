<template>
  <div class="noconnet flex flex_column">
    <img src="../assets/images/home/noConnect.png" alt srcset class="wid104 hei104" />
    <p class="tips">当前无网络，请检查网络设置</p>
    <van-button class="refresh" @click="refreshs">重新加载</van-button>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: {},
  watch: {},
  data() {
    return {};
  },
  methods: {
    refreshs() {
      var connectionType = api.connectionType;
      // console.log(connectionType)
      if (connectionType != "none") {
         this.$emit('refreshEvent');
      } else {
        this.Toast('当前无网络，请检查网络设置')
      }
    }
  },
  mounted() {},
  computed: {}
};
</script>
<style lang="scss">
</style>
<style  scoped>
.noconnet {
  height: 100%;
  justify-content: center;
  align-items: center;
}
.noconnet .tips {
  color: #888888;
  font-size: 12px;
}
.noconnet .refresh {
  border: 1px solid #fbc400;
  color: #fbc400;
  font-size: 13px;
  height: 26px;
  line-height: 26px;
  margin-top: 20px;
}
</style>
