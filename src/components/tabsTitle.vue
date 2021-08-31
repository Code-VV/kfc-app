<template>
  <div class="tabstitle c444 size15">

    <div @click="seltab(i+1)" class="item" v-for="(item,i) in titles" :key="i" :class="active1-1==i?'c_blue':''">
     <span>{{item}}</span>

     <div class="bor_1" v-show="active1-1==i"></div>
    </div>

  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ['titles','active']

  ,
  data() {
    return {
      active1: this.active
    };
  },
  methods: {
    seltab(n){
      // console.log(n)
      this.active1 = n;
      this.$emit('currentTab',n)
    }
  },
  mounted(){
    this.$emit('currentTab',this.active)
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.tabstitle {
  height: 45px;
  line-height: 45px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  .item{
    .bor_1{
      border:1px solid $blue;
      transform: translate(0px,-2px);/* 只写一个值，默认y=0 */
    }
  }
}
</style>
