<template>
<div class="nodata pad_t_b_15">
  <img :src="img" alt="" class="wid100 hei100 auto">
  <div class=" a_center c888 size12 pad_t_10">
    {{title}}
  </div>
</div>
  
</template>
<script>

export default {
  props: {
     title: {
      type: String,
      default: "No data"
    },
  },
  data() {
    return {
       img:require('./../assets/images/user/type3.png')
    };
  },
  computed: {

  },
  
  
  created() {
    // console.log(this.title)
     if(this.title=='暂无当前委托'){
        this.img = require('./../assets/images/user/type1.png')
     }
      if( this.title=='暂无持仓'){
        this.img = require('./../assets/images/user/type2.png')
        
     }
  },
  methods: {

  }
};
</script>
<style lang="scss" >

</style>
