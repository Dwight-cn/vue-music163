<!--头部组件-->
<template>
  <div class="search">
    <scroll class="search-scroll">
        <ul>
            <li v-for="i in 100" :key="i">{{i}}</li>
        </ul>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/components/base/Scroll/Scroll'
import { getSearchSuggest } from '@/api/search.js'

export default {
  components: {
    Scroll,
  },
  data() {
    return {

    };
  },
  methods: {
    _getSearchSuggest(val) {
      getSearchSuggest(val).then((res) => {
        console.log(res)
      })
    }
  },
  created() {
    this._getSearchSuggest('1')
  },
};
</script>

<style scoped>
  .search{
    position: fixed;
    top: 44px;
    bottom: 0;
    width: 100%;
  }
  .search-scroll{
    height: 100%;
    overflow: hidden;
  }
</style>
