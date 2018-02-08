<!--头部组件-->
<template>
  <div class="header" v-if="$route.name === 'Index' || $route.name === 'Search'">
    <search-box class="header-search" ref="searchboxref"></search-box>
    <transition name="fade">
      <div >
        <player-mini :playing="playing" v-if="!searching"></player-mini>
      </div>
    </transition>
    <transition name="slide">
      <span class="cancle-search" v-if="searching" @click="cancleSearch">取消</span>
    </transition>
  </div>
</template>

<script>
import SearchBox from '@/components/base/SearchBox/searchBox';
import PlayerMini from '@/components/base/PlayerMini/PlayerMini';
import { mapState } from 'vuex';

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
    ]),
  },
  methods: {
    cancleSearch() {
      this.$refs.searchboxref.clearKeywords();
      this.$router.push('/');
    },
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
    /* z-index: 2; */
  }
  .header-search{
    margin-right: 44px;
  }
  .cancle-search{
    display: block;
    position: absolute;
    right: 10px;
    top: 12px;
    line-height: 22px;
    color: #fff;
    font-size: 16px;
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
</style>
