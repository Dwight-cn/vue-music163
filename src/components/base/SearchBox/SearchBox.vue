<!-- 搜索框组件 -->
<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="search" v-model="keywords" placeholder="搜索音乐、歌手、歌词" @focus="searchFocus" @click="searchFocus" ref="searchinput">
    <i class="icon-x-circle" v-if="keywords !== ''" @click="clearKeywords"></i>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      keywords: '',
    };
  },
  computed: {

  },
  methods: {
    // 清空搜索框
    clearKeywords() {
      this.keywords = '';
    },
    // 搜索框获取焦点时
    searchFocus() {
      this.$router.push('/search');
    },
    blur() {
      this.$refs.searchinput.blur();
    },
    ...mapMutations({
      setSearchKeyWords: 'SET_SEARCH_KEYWORDS',
    }),
  },
  created() {

  },
  watch: {
    // 关键字改变时
    keywords: function keywords(val) {
      this.setSearchKeyWords(val.trim());
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
    line-height: 30px;
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
  .icon-x-circle{
    font-size: 14px;
    color: #d6d6d6;
    position: absolute;
    right: 12px;
    top: 0;
    line-height: 30px;
  }
</style>
