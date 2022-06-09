<template>
  <div id="vue-memo">
    <!--  工具栏  -->
    <div class="cover-layer"></div>
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand"></a>
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-collapse" aria-expanded="false">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
        </div>
        <div class="collapse navbar-collapse navbar-right">
          <ul class="nav navbar-nav">

            <!--  新建  -->
            <li class="add dropdown">
              <a class="create-new dropdown-toggle" data-toggle="dropdown">new</a>
              <ul class="dropdown-menu">
                <li @click="createMarkdown">
                  <a>Markdown</a>
                </li>
                <li @click="createDoodle">
                  <a>graffiti</a>
                </li>
              </ul>
            </li>
            <!--  -->

            <!--  类别过滤器  -->
            <li class="categories dropdown">
              <a class="current-category dropdown-toggle" data-toggle="dropdown">
                {{ categories[currentCategoryId] }}
                <span class="count badge">{{ memosFiltered.length }}</span>
              </a>
              <ul class="dropdown-menu">
                <li class="total" @click="filterBy(0, queryString)">
                  <a>
                    all
                    <span class="count badge">{{ memos.length }}</span>
                  </a>
                </li>
                <li class="divider"></li>
                <li @click="filterBy(1, queryString)">
                  <a>
                    work
                    <span class="count badge">{{ memosInWorkCate.length }}</span>
                  </a>
                </li>
                <li @click="filterBy(2, queryString)">
                  <a>
                    life
                    <span class="count badge">{{ memosInLivingCate.length }}</span>
                  </a>
                </li>
                <li @click="filterBy(3, queryString)">
                  <a>
                    study
                    <span class="count badge">{{ memosInStudyCate.length }}</span>
                  </a>
                </li>
              </ul>
            </li>
            <!--  -->

            <!--  排序器  -->
            <li class="sort-by dropdown">
              <a class="dropdown-toggle" data-toggle="dropdown">
                {{ currentSortBy }}
              </a>
              <ul class="dropdown-menu">
                <li @click="sortByTimeOrTitle('title')">
                  <a>Sort by title</a>
                </li>
                <li @click="sortByTimeOrTitle('timeStamp')">
                  <a>Sort by creation time</a>
                </li>
              </ul>
            </li>
            <!--  -->

            <!--  字符串过滤器  -->
            <li>
              <input
                type="text"
                class="search-box form-control"
                placeholder="Filter the title、content、time"
                v-model="queryString"
                @keyup="filterBy(currentCategoryId, queryString)">
            </li>
            <!--  -->

          </ul>
        </div>
      </div>
    </nav>

    <!--  memos  -->
    <div id="memos" class="container">
      <memo-item @editMarkdown='editMarkdown'  @editDoodle='editDoodle' v-for="(memo,index) in memosFiltered" :memo="memo" :key='index'></memo-item>
    </div>
    <!--  -->

    <!--  编辑器  -->
    <memo-editor ref="edit"></memo-editor>
    <!--  -->

  </div>
</template>

<script>
import helpers from './helpers';
import storeUtil from './storage';
import memoItem from './components/memoItem.vue';
import memoEditor from './components/memoEditor.vue';

let store = storeUtil.store;
let Memo = storeUtil.Memo;

export default {
  data () {
    return {
      memos: store.memos,
      memosFiltered: [],
      currentSortBy: '',
      currentCategoryId: '',
      queryString: '',
      categories: {
        0: 'all',
        1: 'work',
        2: 'life',
        3: 'study',
      },
      helpers,
    };
  },
  components: {
    memoItem,
    memoEditor,
  },
  created(){
        setTimeout(()=>{
            helpers.resizeMemos();
        },1000)
  },
  methods: {
      fatherMethod() {
        //console.log('父组件方法');
      },

    // 过滤
    filterBy (categoryId, queryString) {
      let result = [];
      // 先按照【类别id】过滤
      switch (categoryId) {
        case 0:
          result = this.memos;
          this.currentCategoryId = 0;
          break;
        case 1:
          result = this.memosInWorkCate;
          this.currentCategoryId = 1;
          break;
        case 2:
          result = this.memosInLivingCate;
          this.currentCategoryId = 2;
          break;
        case 3:
          result = this.memosInStudyCate;
          this.currentCategoryId = 3;
          break;
      }
      if (queryString !== '') {
        result = result.filter((item) => {
          let matchesQuery = false;
          // 若【标题】或【日期字符串】包含查询字符串
          if (item.title.indexOf(queryString) !== -1 || item.timeStamp.indexOf(queryString) !== -1) {
            matchesQuery = true;
          }
          // 或【文本类型 memo 的内容】包含查询字符串
          if (item.type === 0 && item.content.indexOf(queryString) !== -1) {
            matchesQuery = true;
          }
          // 则过滤之
          return matchesQuery;
        });
      }
      this.memosFiltered = result;
      this.sortByTimeOrTitle('title');
    },
    // 排序
    sortByTimeOrTitle (option) {
      this.memosFiltered.sort((m1, m2) => {
        if (m1[option] < m2[option]) {
          return -1;
        } else {
          return 1;
        }
      });
      this.currentSortBy =
        option === 'timeStamp'
        ? 'Sort by creation time'
        : 'Sort by title';
    },
    // 接收 memoItem 组件分发来的事件，广播给 memoEditor 组件
    createMarkdown () {
        this.$refs.edit.createMarkdown()
    },
    createDoodle () {
        this.$refs.edit.createDoodle()
    },
    editMarkdown (memo) {
        this.$refs.edit.editMarkdown(memo)
    //  this.$broadcast('editMarkdown', memo);
    },
    editDoodle (memo) {
        this.$refs.edit.editDoodle(memo)
     // this.$broadcast('editDoodle', memo);
    },
  },
  computed: {
    memosInWorkCate () {
      return this.memos.filter((item) => {
        return item.categoryId === 1;
      });
    },
    memosInLivingCate () {
      return this.memos.filter((item) => {
        return item.categoryId === 2;
      });
    },
    memosInStudyCate () {
      return this.memos.filter((item) => {
        return item.categoryId === 3;
      });
    },
  },
  events: {
   
  },
  // 周期钩子
  mounted () {
    this.filterBy(0, this.queryString);
    this.sortByTimeOrTitle('title');
  },
  watch: {
    memosFiltered () {
      helpers.resizeMemos();
    }
  }
};
</script>

<style>
[v-cloak] {
	display: none
}

* {
	padding: 0;
	margin: 0;
	border: 0;
	list-style: none;
	text-decoration: none
}

body {
	/* background: url("./images/pixels.png") */
	background: url("./images/bg.jpg")
}

blockquote p {
	font-size: 14px
}

.dropdown-menu a {
	cursor: pointer!important
}

#vue-memo {
	border: 1px solid #e1e1e1;
	box-shadow: 0 0 4px 0 #e1e1e1;
	padding: 0;
	z-index: 1;
}

.navbar {
	border-radius: 0;
	margin-bottom: 0;
	z-index: 1;
	cursor: default;
	user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	-webkit-user-select: none
}

.navbar .navbar-right a {
	cursor: pointer
}

.navbar .navbar-right .search-box {
	width: calc(100% - 24px);
	min-width: 180px;
	margin: 6px 12px
}

.navbar .dropdown-toggle {
	position: relative;
	padding-right: 45px!important;
	transition: .2s ease-in-out
}

.navbar .dropdown-toggle:hover {
	background: #e7e7e7!important
}

.navbar .dropdown-toggle:after {
	position: absolute;
	width: 24px;
	height: 24px;
	top: 8px;
	right: 18px;
	background: url("./images/icons/icon-dropdown.png") 0 0 no-repeat;
	content: " ";
	opacity: .6
}

@media (min-width:768px) {
	.navbar .dropdown-toggle:after {
		top: 13px
	}
}

.navbar .count {
	border-radius: 5px;
	float: right;
	margin-top: 3px
}

.navbar .current-category .count {
	float: none;
	margin: -2px 6px 0 9px
}

#memos {
	min-height: 800px;
	margin-top:50px;
	padding: 0
}

.memo-container {
	padding: 6px;
	float: left
}

.memo {
	position: relative;
	border: 1px solid #bdbdbd;
	border-radius: 5px;
	padding: 9px;
	background-color: #fff;
	transition: all .15s ease-in-out
}

.memo:hover {
	box-shadow: 0 0 6px 0 #757575
}

.memo:hover .mark {
	display: block
}

.memo[data-completed=true] {
	border-color: #4dabf5
}

.memo[data-completed=true] .mark {
	display: block
}

.memo .mark {
	display: none;
	position: absolute;
	width: 24px;
	height: 24px;
	top: -8px;
	left: -8px;
	border-radius: 50%;
	background: #4dabf5 url("./images/icons/icon-done.svg") no-repeat 3px 3px;
	background-size: 18px 18px;
	transition: all .2s ease-in-out;
	cursor: pointer
}

.memo .mark:hover {
	-webkit-transform: scale(1.2);
	transform: scale(1.2)
}

.memo .memo-heading {
	position: relative;
	width: 100%
}

.memo .memo-heading .tools {
	float: right;
	margin-top: 6px
}

.memo .memo-heading .tools>li {
	width: 20px;
	height: 20px;
	float: left;
	margin-left: 10px;
	opacity: .5;
	transition: opacity .2s ease-in-out
}

.memo .memo-heading .tools>li:hover {
	cursor: pointer;
	opacity: 1
}

.memo .memo-heading .tools>li.edit {
	background: url("./images/icons/icon-edit.png") no-repeat 0 0
}

.memo .memo-heading .tools>li.delete {
	background: url("./images/icons/icon-delete.png") no-repeat 0 0
}

.memo .memo-heading .title {
	display: inline-block;
	margin-top: 6px;
	margin-bottom: 6px;
	padding-bottom: 6px;
	border-bottom: 1px solid #bdbdbd;
	text-overflow: ellipsis;
	white-space: nowrap;
	overflow: hidden;
	max-width: calc(100% - 60px)
}

.memo .memo-info {
	margin: 0 auto 12px;
	color: #757575;
	font-weight: 300
}

.memo .memo-info .category {
	float: right
}

.memo .content {
	border: 1px solid #f8f8f8;
	bottom: 12px;
	overflow-y: scroll;
	text-overflow: ellipsis
}

.memo .content[data-type=doodle] {
	overflow: hidden
}

.cover-layer,.memo .content img {
	width: 100%;
	height: 100%
}

.cover-layer {
	top: 0;
	left: 0;
	background-color: #222;
	opacity: .5;
	z-index: 2
}

.cover-layer,.editor-layer {
	display: none;
	position: absolute
}

.editor-layer {
	background-color: #fff;
	top: 50%;
	left: 50%;
	margin-left: -142px;
	margin-top: -142px;
	padding: 10px;
	border: 1px solid #f8f8f8;
	border-radius: 3px;
	box-shadow: 0 0 6px 0 #f8f8f8;
	z-index: 3
}

.editor-layer .editor-top {
	position: relative;
	margin-bottom: 10px;
	width: 100%
}

.editor-layer .editor-top .tools {
	position: absolute;
	top: 6px;
	right: 0
}

.editor-layer .editor-top .tools>li {
	width: 20px;
	height: 20px;
	float: left;
	margin-left: 10px;
	opacity: .5;
	transition: opacity .2s ease-in-out
}

.editor-layer .editor-top .tools>li:hover {
	cursor: pointer;
	opacity: 1
}

.editor-layer .editor-top .tools>li.save {
	background: url("./images/icons/icon-save.png") no-repeat 0 0
}

.editor-layer .editor-top .tools>li.cancel {
	background: url("./images/icons/icon-cancel.png") no-repeat 0 0
}

.editor-layer .editor-top .editor-title {
	width: calc(100% - 140px)
}

html #edit-doodle .editor-title,html #edit-markdown .editor-title {
	width: calc(100% - 60px)
}

.editor-layer .editor-top .select-category {
	position: absolute;
	right: 62px;
	top: 0;
	transition: all .2s ease-in-out
}

.editor-layer .editor-top .select-category .dropdown-menu {
	min-width: 0
}

.editor-layer .text-content {
	width: 262px;
	height: 262px;
	font-size: 12px;
	resize: none
}

.editor-layer .canvas-wrapper {
	position: relative;
	width: 262px;
	height: 262px;
	border: 1px solid #bdbdbd
}

.editor-layer .canvas-wrapper * {
	cursor: pointer
}

.editor-layer .canvas-wrapper .doodle-controllers {
	position: absolute;
	top: 6px;
	right: 6px
}

.editor-layer .canvas-wrapper .doodle-controllers>li {
	float: left;
	width: 24px;
	height: 24px;
	opacity: .5;
	transition: opacity .2s ease-in-out
}

.editor-layer .canvas-wrapper .doodle-controllers>li:hover {
	cursor: pointer;
	opacity: 1
}

.editor-layer .canvas-wrapper .doodle-controllers>li.undo {
	background: url("./images/icons/icon-undo.png") no-repeat 2px 2px;
	background-size: 83.3%
}

.editor-layer .canvas-wrapper .doodle-controllers>li.redo {
	background: url("./images/icons/icon-redo.png") no-repeat 2px 2px;
	background-size: 83.3%
}

.editor-layer .canvas-wrapper .doodle-controllers>li.clear {
	background: url("./images/icons/icon-clear.png") no-repeat 2px 2px;
	background-size: 83.3%
}

.editor-layer .canvas-wrapper .doodle-colors {
	position: absolute;
	top: 6px;
	left: 0;
	padding: 6px
}

.editor-layer .canvas-wrapper .doodle-colors>li {
	float: left;
	width: 16px;
	height: 16px;
	margin-left: 6px;
	border: 2px solid #222;
	border-radius: 50%;
	transition: .2s ease-in-out
}

.editor-layer .canvas-wrapper .doodle-colors>li.current,.editor-layer .canvas-wrapper .doodle-colors>li:hover {
	box-shadow: 0 0 6px #222
}

.editor-layer .canvas-wrapper .doodle-colors>li[data-color=green] {
	background-color: #5cb85c
}

.editor-layer .canvas-wrapper .doodle-colors>li[data-color=yellow] {
	background-color: #f0ad4e
}

.editor-layer .canvas-wrapper .doodle-colors>li[data-color=red] {
	background-color: #d9534f
}

.editor-layer .canvas-wrapper .doodle-colors>li[data-color=black] {
	background-color: #222
}

.editor-layer .canvas-wrapper .doodle-colors>li[data-color=white] {
	background-color: #fff
}

.editor-layer .canvas-wrapper .doodle-content {
	cursor: pointer
}

@media (max-width:768px) {
	#memos {
		padding: 0 5px
	}

	.memo-container {
		padding: 2px;
		margin-top: 0;
		width: 50%
	}
}

@media (min-width:768px) and (max-width:992px) {
	.memo-container {
		width: 33.3%
	}
}

@media (min-width:992px) and (max-width:1200px) {
	.memo-container {
		width: 25%
	}
}

@media (min-width:1200px) {
	.memo-container {
		width: 25%
	}
}
            
</style>