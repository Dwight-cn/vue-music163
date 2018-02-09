<template>
  <div class="playlist">
    <!-- 头部 -->
    <my-header :title="playlistInfo ? playlistInfo.name : ''" class="playlist-header"></my-header>
    <!-- 专辑封面（模糊） -->
    <div ref="bgImageRef" class="playlist-bg" v-lazy:background-image="playlistInfo ? playlistInfo.coverImgUrl : ''"></div>
    <div class="playlist-con">
      <scroll class="playlist-scroll">
        <!-- 专辑信息 -->
        <div class="playlist-info">
          <div class="playlist-img" v-lazy:background-image="playlistInfo ? playlistInfo.coverImgUrl : ''">
          </div>
          <div class="playlist-detail" v-if="playlistInfo">
            <h3>{{ playlistInfo.name }}</h3>
            <h4><router-link :to="`/user/${playlistInfo.creator.userId}`"><span>{{ playlistInfo.creator.nickname }}</span> ></router-link></h4>
          </div>
        </div>
        <!-- 专辑歌曲 -->
        <ul class="playlist-songslist">
          <li @click="_playAll(songs)">
            <cell class="play-all">
              <i class="iconfont icon-play" slot="left"></i>
              <div slot="tit">播放全部<span>（共{{ songs.length }}首）</span></div>
            </cell>
          </li>
          <loading v-if="!songs.length"></loading>
          <li v-for="(item,index) in songs">
            <song-cell :tit="item.name" :sub-tit="item.ar.name" :index="index+1" :song="item"></song-cell>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/base/Header/Header';
import Scroll from '@/components/base/Scroll/Scroll';
import Cell from '@/components/base/Cell/Cell';
import SongCell from '@/components/base/SongCell/SongCell';
import Loading from '@/components/base/Loading/Loading';
import { mapState } from 'vuex';
import { time } from '@/assets/js/tool';
import { getPlaylist } from '@/api/playlist';
import { songMixin } from '@/assets/js/mixin';

export default {
  mixins: [songMixin],
  components: {
    myHeader,
    Scroll,
    Cell,
    SongCell,
    Loading,
  },
  data() {
    return {
      playlistId: this.$route.params.id,
      playlistInfo: null,
      songs: [],
    };
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'searchResult',
    ]),
  },
  methods: {
    // 获取专辑详情
    _pgetPlaylist() {
      getPlaylist(this.playlistId).then((res) => {
        // console.log(res.data);
        this.songs = res.data.playlist.tracks;
        this.playlistInfo = res.data.playlist;
        console.log(res.data);
      }).catch((err) => {
        console.log(err);
      });
    },
    // 格式化日期
    _formatDate(date) {
      const d = new Date(date);
      return time.formatDate(d, 'yyyy-MM-dd');
    },
  },
  created() {
    this._pgetPlaylist();
  },
  mounted() {

  },
};
</script>

<style scoped>
  .playlist{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .header.playlist-header{
    background-color: transparent;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 0, 0, 0.2)), to(rgba(0, 0, 0, 0)));
  }
  .playlist-bg{
    height: 50%;
    background-color: #323232;
    background-size: cover;
    background-position: center;
    filter: blur(20px) brightness(80%);
    transform: scale(1.2);
  }
  .playlist-scroll{
    height: 100%;
  }
  .playlist-con{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .playlist-info{
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
  }
  .playlist-img{
    background-color: rgb(223, 223, 223);
    flex: 0 0 auto;
    width: 40%;
    padding-top: 40%;
    margin-right: 5%;
    background-size: cover;
    position: relative;
  }

  .playlist-detail{
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.5;
  }
  .playlist-detail h3{
    font-size: 16px;
    color: #fff;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .playlist-detail h4>a{
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: normal;
  }
  .playlist-detail h4>a>span{
    color: #fff;
  }
  .playlist-detail h5{
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: normal;
  }
  .playlist-songslist{
    background-color: #fff;
    min-height: 90vh;
  }

  /* 播放全部 */
  .cell.play-all{
    height: 50px;
  }
  .play-all i{
    display: inline-block;
    width: 24px;
    font-size: 16px;
    color: #000;
    text-align: center;
    padding-right: 10px;
  }
</style>
