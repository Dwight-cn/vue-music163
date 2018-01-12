<!--头部组件-->
<template>
  <div class="header">
    <search-box class="header-search"></search-box>
    <player-mini :playing="playing" v-if="!searching"></player-mini>
    <span class="cancle-search" v-if="searching" @click="cancleSearch">取消</span>
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
      this.$router.push('/');
    },
  },
};
</script>

<style scoped>
  .header{
    position: relative;
    background: #d63c34;
    padding: 7px 10px;
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
</style>
