<template>
  <div class="index">
    <top></top>
    <div class="remd-wrap">
      <div class="remd-tit">
        推荐歌单 
        <!-- <i class="iconfont icon-right"></i> -->
      </div>
      <div class="loading" v-if="!remdPlaylist.length">
        <loading></loading>
      </div>
      <ul class="remd-con">
        <li v-if="remdPlaylist && index < 6" v-for="(item, index) in remdPlaylist">
          <router-link :to="`/playlist/${item.id}`">
            <div class="remd-item-img" v-lazy:background-image="item.picUrl"></div>
            <p class="remd-item-txt">
              {{ item.name }}
            </p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="remd-wrap">
      <div class="remd-tit">
        最新音乐 
        <!-- <i class="iconfont icon-right"></i> -->
      </div>
      <div class="loading" v-if="!remdSong.length">
        <loading></loading>
      </div>
      <ul class="remd-con">
        <li v-if="remdSong && index < 6" v-for="(item, index) in remdSong">
          <router-link :to="`/album/${item.song.album.id}`">
            <div class="remd-item-img" v-lazy:background-image="item.song.album.picUrl"></div>
            <p class="remd-item-txt">
              {{ item.name }}
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Top from '@/components/base/Top/Top';
import Loading from '@/components/base/Loading/Loading';
import { getRemdPlaylist, getRemdSong } from '@/api/index';

export default {
  name: 'Index',
  components: {
    Top,
    Loading,
  },
  data() {
    return {
      remdPlaylist: [],
      remdSong: [],
    };
  },
  methods: {
    // 初始化首页
    initIndex() {
      this._getRemdPlaylist();
      this._getRemdSong();
    },
    // 获取推荐歌单
    _getRemdPlaylist() {
      getRemdPlaylist().then((res) => {
        this.remdPlaylist = res.data.result;
        // console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    // 获取推荐音乐
    _getRemdSong() {
      getRemdSong().then((res) => {
        this.remdSong = res.data.result;
      }).catch((err) => {
        console.log(err);
      });
    },
  },
  created() {
    this.initIndex();
  },
  mounted() {

  },
};
</script>

<style scoped>
  .index{
    padding-top: 44px;
    overflow: hidden;
  }
  .remd-tit{
    font-size: 18px;
    line-height: 1;
    border-left: 2px solid #d63c34;
    padding-left: 10px;
    margin: 10px 0;
  }
  .remd-con{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .remd-con>li{
    margin-bottom: 10px;
    width: 33%;
    flex: 0 0 auto;
  }
  .remd-item-img{
    display: block;
    padding-top: 100%;
    background-size: cover;
    background-color: #e2e3e5; 
  }
  .remd-item-txt{
    padding: 4px 6px;
    font-size: 14px;
    color: #000;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  /* loading */
  .loading{
    padding: 40px 0;
  }
</style>
