<template>
  <div class="singer">
    <div v-if="singer">
      <!-- 头部 -->
      <my-header :title="singer.name" class="singer-header"></my-header>
      <!-- 歌手照片 -->
      <div class="singer-img" :style="`background-image:url(${singer.img1v1Url});`">

      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import myHeader from '@/components/base/Header/Header';

export default {
  name: 'HelloWorld',
  components: {
    myHeader,
  },
  data() {
    return {
      singerid: this.$route.params.id,
      singer: null,
    };
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'searchResult',
    ]),
  },
  methods: {
    findSingerById(arr, singerid) {
      return arr.find((item) => {
        return item.id && item.id === Number(singerid);
      });
    },
    _getSingerInfo() {
      const singer = this.findSingerById(this.searchResult[1].result, this.singerid);
      this.singer = singer;
      console.log(this.singer);
    },
  },
  created() {
    this._getSingerInfo();
  },
  mounted() {

  },
};
</script>

<style scoped>
  .singer{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .header.singer-header{
    background-color: transparent;
  }
  .singer-img{
    padding-top: 60%;
    background-size: cover;
    background-position: center;
  }
</style>
