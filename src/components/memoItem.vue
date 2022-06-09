<template>
<div class="memo-container">
  <div class="memo" :data-completed="memo.isCompleted ? 'true' : 'false'">
    <div class="mark" @click="markAsDone"></div>
    <div class="memo-heading">
      <h5 class="title">{{ memo.title }}</h5>
      <ul class="tools">
        <li class="edit" @click="editMarkdown"></li>
        <li class="delete" @click="deleteMemo"></li>
      </ul>
    </div>
    <h6 class="memo-info">
      <span class="timeStamp">{{ memo.timeStamp }}</span>
      <span class="category">classification: {{ categories[memo.categoryId] }}</span>
    </h6>
    <div class="content" :data-type="memo.type === 0 ? 'text' : 'doodle'">
      <div v-if="memo.type === 0" v-html="marked(memo.content)"  class="text"></div>
      <img v-else :src="memo.content" class="doodle" />
    </div>
  </div>
</div>
</template>

<script>
import storeUtil from '../storage';
import memoEditor from './memoEditor.vue';

let store = storeUtil.store;

export default {
  props: ['memo'],
  data () {
    return {
      memos: store.memos,
      categories: {
        1: 'work',
        2: 'life',
        3: 'study',
      },
    };
  },
  created(){
    console.log(this.memos)
  },
  methods: {
    marked,
    deleteMemo () {
      if (confirm(`Are you sure you want to delete 「${this.memo.title}」？This operation cannot be undone.`)) {
        store.remove(this.memo);
        store.saveToLocalStorage();
      }
    },
    markAsDone () {
      this.memo.isCompleted =
        this.memo.isCompleted
        ? false
        : true;
      store.saveToLocalStorage();
    },
    // 根据 memo 类型分发不同的方法
    editMarkdown () {
      switch (this.memo.type) {
        case 0:
          this.$emit('editMarkdown',this.memo);
          break;
        case 1:
          this.$emit('editDoodle',this.memo);
          break;
      }
    },
  },
}
</script>
