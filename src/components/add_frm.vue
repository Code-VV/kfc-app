<template>
  <div class="add_frm">
    <div id="line">
      <div class="lines"></div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
var set,
  h = 0;
export default {
  props: {},
  computed: {},
  watch: {},
  data() {
    return {
      isPwdShow: true,
      pwdValue: "", //密码
      showKeyboard: true //数字键盘显示
    };
  },
  methods: {
    moveline() {
      // console.log(h);
      if (h == 200) {
        h = 0;
      } else {
        h = h + 1;
      }
      var hstr = h + "px";
      document.querySelector(".lines").style.transform =
        "translateY(" + hstr + ")";
    }
  },
  mounted() {
    set = setInterval(this.moveline, 20);
  },
  destroyed(){
    if(set){
      clearInterval(set);
    }
  }
};
</script>
<style lang="scss">
</style>
<style  scoped>
.add_frm {
  display: flex;
  justify-content: center;
  align-items: center;
}
#line {
  width: 200px /*no*/;
  height: 200px /*no*/;
  background: url(../assets/images/home/sao.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
#line .lines {
  transform: translateY(0);
  width: 100%;
  height: 1px;
  margin: 0 auto;
  background: rgba(2, 123, 255, 0.63);
}
</style>
