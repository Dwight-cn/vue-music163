<!--头部组件-->
<template>
  <div class="header">
    <search-box class="header-search"></search-box>
    <player-mini :playing="playing"></player-mini>
  </div>
</template>

<script>
import SearchBox from '@/components/base/SearchBox/searchBox';
import PlayerMini from '@/components/base/PlayerMini/PlayerMini';

export default {
  components: {
    SearchBox,
    PlayerMini,
  },
  data() {
    return {
      playing: true,
    };
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
  
</style>
