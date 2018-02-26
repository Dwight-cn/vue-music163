<template>
  <div class="singer">
    <div v-if="singer">
      <!-- 头部 -->
      <my-header :title="singer.name" class="singer-header"></my-header>
      <!-- 歌手照片 -->
      <div ref="bgImageRef" class="singer-img" :style="`background-image:url(${singer.img1v1Url});`"></div>

      <!-- 列表 -->
      <div class="singer-info">
        <scroll class="singer-info-scroll" @scroll="scroll" :probe-type="probeType" :listen-scroll="listenScroll">
          <div class="singer-info-inner" ref="sfiref">
            <div class="navigator-container" ref="viewport">
              <navigator :navList="tabs" @change="change" :currentTabIndex="currentTabIndex"></navigator>
            </div>
            <div class="tab-container">
              <!-- 热门单曲 -->
              <ul v-if="currentTabIndex === 0 && hotSongs">
                <li @click="_playAll(hotSongs)">
                  <cell class="play-all">
                    <i class="iconfont icon-play" slot="left"></i>
                    <div slot="tit">播放全部<span>（共{{ hotSongs.length }}首）</span></div>
                  </cell>
                </li>
                <li v-for="(item,index) in hotSongs" :key="item.id">
                  <song-cell :tit="item.name" :sub-tit="item.al.name" :index="index+1" :song="item"></song-cell>
                </li>
              </ul>
              <!-- 专辑列表 -->
              <ul v-if="currentTabIndex === 1">
                <li v-for="item in hotAlbums" :key="item.id">
                  <router-link :to="`/album/${item.id}`">
                    <cell :iconUrl="item.blurPicUrl" :tit="item.name" :sub-tit="item.artist.name" class="albums-cell"></cell>
                  </router-link>
                </li>
              </ul>
              <!-- 歌手信息 -->
              <ul v-if="currentTabIndex === 2" class="singer-desc">
                <li v-for="item in singerDesc" >
                  <h3>{{ item.ti }}</h3>
                  <p v-for="t in splitDesc(item.txt)">{{ t }}</p>
                </li>
              </ul>
            </div>
            
          </div>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
import myHeader from '@/components/base/Header/Header';
import Scroll from '@/components/base/Scroll/Scroll';
import Navigator from '@/components/base/Navigator/Navigator';
import Loading from '@/components/base/Loading/Loading';
import Cell from '@/components/base/Cell/Cell';
import SongCell from '@/components/base/SongCell/SongCell';
import { mapState } from 'vuex';
import { getSingerSongs, getSingerAlbum, getSingerDesc } from '@/api/singer';
import { songMixin } from '@/assets/js/mixin';

export default {
  mixins: [songMixin],
  components: {
    myHeader,
    Scroll,
    Navigator,
    Loading,
    Cell,
    SongCell,
  },
  data() {
    return {
      // 歌手id
      singerid: this.$route.params.id,
      // 歌手信息
      singer: null,
      // 热门歌曲
      hotSongs: [],
      // 专辑
      hotAlbums: [],
      // 歌手描述
      singerDesc: [],
      // 滚动区域scrollY
      scrollY: 0,
      // 当前标签索引
      currentTabIndex: 0,
      // tab标签
      tabs: [
        {
          id: 0,
          name: '热门50',
        },
        {
          id: 1,
          name: '专辑',
        },
        {
          id: 2,
          name: '歌手信息',
        },
      ],
      // 列表距顶部距离
      scrollTopDist: 0,
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
    initSinger() {
      this._getSingerInfo();
      this._getSingerSongs();
      this._getSingerAlbum();
      this._getSingerDesc();
    },
    // 从搜索结果获取歌手信息
    _getSingerInfo() {
      const singer = this.findSingerById(this.searchResult[1].result, this.singerid);
      if (singer) {
        this.singer = singer;
      }
    },
    // 获取歌手热门歌曲
    _getSingerSongs() {
      getSingerSongs(this.singerid).then((res) => {
        if (res.data.code === 200) {
          this.hotSongs = res.data.hotSongs;
          // this.singer.img1v1Url = res.data.artist.picUrl;
          this.singer = res.data.artist;
          console.log(res.data.hotSongs);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    // 获取歌手专辑
    _getSingerAlbum(offset) {
      getSingerAlbum(this.singerid, offset).then((res) => {
        this.hotAlbums = [...this.hotAlbums, ...res.data.hotAlbums];
      }).catch((err) => {
        console.log(err);
      });
    },
    // 获取歌手描述
    _getSingerDesc() {
      getSingerDesc(this.singerid).then((res) => {
        this.singerDesc = res.data.introduction;
      }).catch((err) => {
        console.log(err);
      });
    },
    change(item) {
      if (item !== undefined) {
        this.currentTabIndex = item.id;
        // this.$router.replace(`/search/${item.id}`);
      }
    },
    scroll(pos) {
      // console.log(pos.y);
      this.scrollY = pos.y;
    },
    splitDesc(txt) {
      return txt.split('\n');
    },
  },
  created() {
    this.probeType = 3;
    this.listenScroll = true;

    this.initSinger();
  },
  mounted() {
    this.scrollTopDist = window.parseFloat(getComputedStyle(this.$refs.sfiref).paddingTop);
  },
  watch: {
    scrollY(newVal) {
      let scale = 1;
      let blur = 0;
      const formula = Math.abs(newVal / 400);

      if (newVal > 0) {
        scale = 1 + formula;
        this.$refs.bgImageRef.style.transform = `scale(${scale})`;
        this.$refs.bgImageRef.style.webkitTransform = `scale(${scale})`;
      } else if (newVal <= 0 && newVal > -this.scrollTopDist) {
        blur = Math.min(10 * formula, 5);
        this.$refs.bgImageRef.style['-webkit-filter'] = `blur(${blur}px)`;
      }
    },
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
  .singer>div{
    width: 100%;
    height: 100%;
    /* display: flex; */
    /* flex-direction: column; */
  }
  .header.singer-header{
    background-color: transparent;
    background:-webkit-gradient(linear, 0 0, 0 bottom, from(rgba(0, 0, 0, 0.2)), to(rgba(0, 0, 0, 0)));
  }
  .singer-img{
    /* padding-top: 60%; */
    height: 40%;
    background-size: cover;
    background-position: center;
  }
  .singer-img-top{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 44px;
  }
  .singer-info{
    /* height: 65%; */
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .singer-info .singer-info-scroll{
    height: 100%;
    overflow: visible;
  }
  .singer-info .singer-info-scroll .singer-info-inner{
    padding-top: 50%;
  }
  .tab-container{
    min-height: 100vh;
    background-color: #fff;
  }
  

  /* 歌手描述 */
  .singer-desc>li{
    overflow: hidden;
  }
  .singer-desc>li>h3{
    font-size: 14px;
    color: #000;
    padding-left: 10px;
    border-left: 2px solid #d63c34;
    line-height: 1;
    margin-top: 10px;
  }
  .singer-desc>li>p{
    font-size: 12px;
    color:#9c9d9f;
    line-height: 1.5;
    padding: 0.1em 1em;
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
