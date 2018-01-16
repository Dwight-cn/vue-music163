<template>
  <div class="player" v-if="playerShow">
    <i class="icon-back"></i>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HelloWorld',
  components: {

  },
  data() {
    return {

    };
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'playerShow',
    ]),
  },
  methods: {

  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped>
  .player{
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    background: #f005;
  }
</style>
