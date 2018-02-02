<template>
  <div @click="_insertSong(song)" class="song-cell">
  <cell :tit="tit">
    <span slot="left" v-if="index" class="song-index" :class="{long: index>99}">{{ index }}</span>
    <slot slot="sub-tit" name="sub-tit">{{ subTit }}</slot>
  </cell>
  </div>
</template>

<script>
import Cell from '@/components/base/Cell/Cell';
import { songMixin } from '@/assets/js/mixin';

export default {
  mixins: [songMixin],
  components: {
    Cell,
  },
  props: {
    index: Number,
    tit: {
      type: [String, Number],
      default: '大标题',
    },
    subTit: [String, Number],
    song: Object,
  },
  data() {
    return {

    };
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
  .song-cell{
    width: 100%;
  }
  .song-index{
    display: inline-block;
    width: 24px;
    font-size: 16px;
    color: #9c9d9f;
    text-align: center;
    padding-right: 10px;
  }
  .song-index.long{
    font-size: 14px;
  }
</style>
