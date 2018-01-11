<!-- 搜索框组件 -->
<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" v-model="value" placeholder="搜索音乐、歌手、歌词" @focus="searchFocus">
    <i class="icon-x-circle" v-if="value !== ''" @click="clearValue"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    clearValue() {
      this.value = '';
    },
    searchFocus() {
      this.$router.push('/search')
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
