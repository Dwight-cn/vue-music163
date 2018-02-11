<!--头部组件-->
<template>
  <div class="header">
    <search-box class="header-search" ref="searchboxref"></search-box>
    <transition name="sx">
      <div class="search-right" v-if="searching || playlist.length"></div>
    </transition>
    <transition name="fade">
      <player-mini :playing="playing" v-show="!searching" class="player-mini"></player-mini>
    </transition>
    <transition name="slide">
        <span class="cancle-search" v-show="searching" @click="cancleSearch">取消</span>
    </transition>
  </div>
</template>

<script>
import SearchBox from '@/components/base/SearchBox/searchBox';
import PlayerMini from '@/components/base/PlayerMini/PlayerMini';
import { mapState, mapMutations } from 'vuex';

export default {
  components: {
    SearchBox,
    PlayerMini,
  },
  data() {
    return {

    };
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'searching',
      'playing',
      'playlist',
    ]),
  },
  methods: {
    cancleSearch() {
      // this.$refs.searchboxref.clearKeywords();
      this.setSearchKeyWords('');
      this.$router.push('/');
    },
    focus() {
      this.$refs.searchboxref.focus();
    },
    ...mapMutations({
      setSearchKeyWords: 'SET_SEARCH_KEYWORDS',
    }),
  },
  watch: {
    searching: function searching(val) {
      if (!val) {
        // this.$refs.searchboxref.clearKeywords();
        this.$refs.searchboxref.blur();
      }
    },
  },
};
</script>

<style scoped>
  .header{
    position: relative;
    background: #d63c34;
    padding: 7px 10px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    /* z-index: 2; */
  }
  /* .header-search{
    transition: all 0.3s;
  } */
  .cancle-search{
    display: block;
    position: absolute;
    line-height: 30px;
    color: #fff;
    font-size: 16px;
    top: 7px;
    right: 10px;
    transform: translateX(0);
    opacity: 1;
  }
  .player-mini{
    position: absolute;
    right: 13px;
    top: 11px;
    opacity: 1;
  } 

  .search-right{
    width: 42px;
    flex: 0 0 auto;
  }

  /*取消按钮过渡*/
  .slide-enter-active, .slide-leave-active{
    transition: all .3s ease;
  }
  .slide-enter, .slide-leave-to{
    transform: translateX(100%);
    opacity: 0.5;
  }

  /*mini播放器过渡*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .sx-enter-active, .sx-leave-active {
    transition: all .2s;
  }
  .sx-enter, .sx-leave-to {
    width: 0;
  }
</style>
