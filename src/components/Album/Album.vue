<template>
  <div class="album">
    <!-- 头部 -->
    <my-header :title="albumInfo ? albumInfo.name : ''" class="album-header"></my-header>
    <!-- 专辑封面（模糊） -->
    <div ref="bgImageRef" class="album-bg" v-lazy:background-image="albumInfo ? albumInfo.blurPicUrl : ''"></div>
    <div class="album-con">
      <scroll class="album-scroll">
        <!-- 专辑信息 -->
        <div class="album-info">
          <div class="album-img" v-lazy:background-image="albumInfo ? albumInfo.blurPicUrl : ''">
          </div>
          <div class="album-detail" v-if="albumInfo">
            <h3>{{ albumInfo.name }}</h3>
            <h4><router-link :to="`/singer/${albumInfo.artist.id}`">歌手：<span>{{ albumInfo.artist.name }}</span> ></router-link></h4>
            <h5>发行时间：{{ _formatDate(albumInfo.publishTime) }}</h5>
          </div>
        </div>
        <!-- 专辑歌曲 -->
        <ul class="album-songslist">
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
import { getAlbum } from '@/api/album';
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
      albumId: this.$route.params.id,
      albumInfo: null,
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
    findAlbumById(arr, albumId) {
      return arr.find((item) => {
        return item.id && item.id === Number(albumId);
      });
    },
    // 从搜索结果获取歌手信息
    _getAlbumInfo() {
      const albumInfo = this.findAlbumById(this.searchResult[2].result, this.albumId);
      if (albumInfo) {
        this.albumInfo = albumInfo;
      }
      console.log(albumInfo);
    },
    // 获取专辑详情
    _getAlbum() {
      getAlbum(this.albumId).then((res) => {
        // console.log(res.data);
        this.songs = res.data.songs;
        this.albumInfo = res.data.album;
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
    this._getAlbumInfo();
    this._getAlbum();
  },
  mounted() {

  },
};
</script>

<style scoped>
  .album{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  .header.album-header{
    background-color: transparent;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 0, 0, 0.2)), to(rgba(0, 0, 0, 0)));
  }
  .album-bg{
    height: 50%;
    background-color: #323232;
    background-size: cover;
    background-position: center;
    filter: blur(20px) brightness(80%);
    transform: scale(1.2);
  }
  .album-scroll{
    height: 100%;
  }
  .album-con{
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .album-info{
    display: flex;
    padding: 10px;
    margin-bottom: 10px;
  }
  .album-img{
    background-color: rgb(223, 223, 223);
    flex: 0 0 auto;
    width: 40%;
    padding-top: 40%;
    margin-right: 10%;
    background-size: cover;
    position: relative;
  }
  .album-img::after{
    content: "";
    position: absolute;
    top: 5%;
    right: -15%;
    width: 15%;
    height: 90%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../assets/img/albums-bg.png);
  }
  .album-detail{
    flex: 1 1 auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 1.5;
  }
  .album-detail h3{
    font-size: 16px;
    color: #fff;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .album-detail h4>a{
    font-size: 14px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: normal;
  }
  .album-detail h4>a>span{
    color: #fff;
  }
  .album-detail h5{
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
    font-weight: normal;
  }
  .album-songslist{
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
