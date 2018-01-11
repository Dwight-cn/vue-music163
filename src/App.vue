<template>
  <div id="app">
    <top></top>
    <router-view/>
  </div>
</template>

<script>
import Top from '@/components/base/Top/Top';

export default {
  name: 'app',
  components: {
    Top,
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
