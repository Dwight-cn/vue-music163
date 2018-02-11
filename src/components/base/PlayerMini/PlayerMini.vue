<!--mini播放器组件-->
<template>
  <div class="player-mini" :class="{playing: playing}" @click="showPlayer" v-if="playlist.length">
    <span class="player-mini-item player-mini-item-1"></span>
    <span class="player-mini-item player-mini-item-2"></span>
    <span class="player-mini-item player-mini-item-3"></span>
    <span class="player-mini-item player-mini-item-4"></span>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: ['playing'],
  computed: {
    ...mapState([
      'playlist',
    ]),
  },
  methods: {
    showPlayer() {
      this.setPlayerShow(true);
    },
    ...mapMutations({
      setPlayerShow: 'SET_PLAYER_SHOW',
    }),
  },
};
</script>

<style scoped>
  .player-mini{
    /* position: absolute; */
    height: 22px;
    width: 23px;
    /* margin-right: 13px;
    margin-top: 4px; */
    font-size: 0;
    line-height: 22px;
  }
  .player-mini-item{
    display: inline-block;
    width: 2px;
    height: 100%;
    margin-right: 5px;
    background: #fff;
    vertical-align: bottom;
    transform-origin: center bottom; 
  }
  .player-mini-item-1{
    height: 55%;
  }
  .player-mini-item-2{
    height: 100%;
  }
  .player-mini-item-3{
    height: 65%;
  }
  .player-mini-item-4{
    height: 80%;
    margin-right: 0;
  }

  .player-mini.playing .player-mini-item-1{
    animation: playerIcon1 0.5s linear 0s infinite alternate both;
  }
  .player-mini.playing .player-mini-item-2{
  animation: playerIcon2 0.5s linear 0s infinite alternate both;
  }
  .player-mini.playing .player-mini-item-3{
    animation: playerIcon1 0.5s linear 0s infinite alternate both;
  }
  .player-mini.playing .player-mini-item-4{
    animation: playerIcon2 0.5s linear 0s infinite alternate both;
  }

  @keyframes playerIcon1{
    100%{
      transform: scaleY(2);
    }
  }
  @keyframes playerIcon2{
    100%{
      transform: scaleY(0.5);
    }
  }
</style>
