<!-- 搜索框组件 -->
<template>
  <div class="search-box">
    <i class="iconfont icon-search"></i>
    <input type="search" v-model="keywords" placeholder="搜索音乐、歌手、歌词" @focus="searchFocus" @click="searchFocus" @blur="searchBlur" @keyup.enter="searchEnter" ref="searchinput">
    <i class="iconfont icon-close" v-if="keywords !== ''" @click="clearKeywords"></i>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      keywords: '',
    };
  },
  computed: {
    ...mapState([
      'searchKeyWords',
    ]),
  },
  methods: {
    // 清空搜索框
    clearKeywords() {
      this.keywords = '';
    },
    // 搜索框获取焦点时
    searchFocus() {
      this.$router.push('/search');
      this.setSearchFocus(true);
    },
    searchBlur() {
      this.setSearchFocus(false);
    },
    searchEnter() {
      this.blur();
      this.$router.push('/search/1');
    },
    // 提供给父组件调用
    blur() {
      this.$refs.searchinput.blur();
    },
    ...mapMutations({
      setSearchKeyWords: 'SET_SEARCH_KEYWORDS',
      setSearchFocus: 'SET_SEARCHING_FOCUS',
    }),
    ...mapActions([
      'clearSearchResultData',
    ]),
  },
  created() {

  },
  watch: {
    // 关键字改变时
    keywords(val) {
      this.setSearchKeyWords(val.trim());
    },
    searchKeyWords(val) {
      this.keywords = val;
      this.clearSearchResultData();
    },
  },
};
</script>

<style scoped>
  .search-box{
    position: relative;
    vertical-align: top;
    padding: 0 36px;
    background: #fff;
    border-radius: 22px;
  }
  .search-box input{
    vertical-align: top;
    width: 100%;
    border: none;
    padding: 0;
    height: 30px;
    line-height: 18px;
    font-size: 14px;
    outline: none;
    background: #fff;
    color: #000;
  }
  .icon-search{
    font-size: 14px;
    color: #d6d6d6;
    position: absolute;
    left: 12px;
    top: 0;
    line-height: 30px;
  }
  .icon-close{
    font-size: 14px;
    color: #d6d6d6;
    position: absolute;
    right: 12px;
    top: 0;
    line-height: 30px;
  }
</style>
