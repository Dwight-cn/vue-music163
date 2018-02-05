<template>
  <div class="header">
    <div class="left">
      <slot name="left">
        <i class="iconfont icon-back" @click="back"></i>
      </slot>
    </div>
    <div class="middle">
      <h4 class="overflow-ellipsis">{{ title }}</h4>
    </div>
    <div class="right">
      <slot name="right">
        <player-mini :playing="playing"></player-mini>
      </slot>
    </div>

  </div>
</template>

<script>
import PlayerMini from '@/components/base/PlayerMini/PlayerMini';
import { mapState } from 'vuex';

export default {
  name: 'HelloWorld',
  components: {
    PlayerMini,
  },
  props: {
    title: [String, Number],
  },
  data() {
    return {

    };
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'playing',
    ]),
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
  created() {

  },
  mounted() {

  },
};
</script>

<style scoped>
  .header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 10px;
    height: 44px;
    line-height: 44px;
    text-align: center;
    display: flex;
    background-color: #d63c34;
    color: #fff;
    z-index: 2;
  }
  .left, .right{
    flex: 0.2;
  }
  .left{
    text-align: left;
  }
  .left .iconfont, .right .iconfont{
    font-size: 24px;
  }
  .right{
    text-align: center;
  }
  .middle{
    flex: 1;
    overflow: hidden;
  }
</style>
