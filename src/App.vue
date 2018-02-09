<template>
  <div id="app">
    <!-- <top></top> -->
    <router-view/>
    <player></player>
  </div>
</template>

<script>
// import Top from '@/components/base/Top/Top';
import Player from '@/components/base/Player/Player';

export default {
  name: 'app',
  components: {
    // Top,
    Player,
  },
};
</script>

<style>
@import "./assets/css/index.css";

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
