<template>
  <!-- 单项选择器的组件 -->
  <div id="single_picker">
    <van-cell title="开户行" is-link @click="showFn()">
      <span slot="default" class="c222" v-if='index>-1'>{{list[index].text}}</span>
    </van-cell>
    <van-popup v-model="show" position="bottom" :style="{ height: '40%' }" >
      <van-picker
        :columns="list"
        @change="onChange"
         @confirm="onConfirm"
        @cancel="cancelFn"
        show-toolbar
        :default-index="index<0?0:index"
        ref="pickers"
      />
    </van-popup>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      show: false,
    };
  },
  props: ["list","index"],
  mounted() {
  },
  methods: {
    onChange(picker, value, index) {
    },
    showFn() {
      this.show = true;
    },
    onConfirm(value, index) {
      this.$emit("pickerIdx", index);
      this.show = false;
    },
    cancelFn(value,index) {
        this.show = false;
      // 取消
    //   this.show = false;
    }
  }
};
</script>
 
<style scoped="scoped">
#single_picker {
  display: inline-block;
}
</style>