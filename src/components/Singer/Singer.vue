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
                <li v-for="(item,index) in hotSongs" :key="item.id" class="result-list-item" @click="_insertSong(item)">
                  <!-- <figure class="result-list-item-index">
                      {{ index + 1 }}
                  </figure>
                  <div class="result-list-item-con">
                    <h4 class="overflow-ellipsis">{{ item.name }}</h4>
                    <h5 class="overflow-ellipsis">
                      <span>{{ item.al.name }}</span>
                    </h5>
                  </div> -->
                  <song-cell :tit="item.name" :sub-tit="item.al.name" :index="index+1"></song-cell>
                </li>
              </ul>
              <!-- 专辑列表 -->
              <ul v-if="currentTabIndex === 1">
                <li v-for="item in hotAlbums" :key="item.id" class="result-list-item albums-result-list-item">
                  <figure class="result-list-item-img" :style="`background-image:url(${item.blurPicUrl})`"></figure>
                  <div class="result-list-item-con">
                    <h4 class="overflow-ellipsis">{{ item.name }}</h4>
                    <!-- <h5 class="overflow-ellipsis">{{ item.artist.name }}</h5> -->
                  </div>
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
  filters: {

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
      this.singer = singer;
    },
    // 获取歌手热门歌曲
    _getSingerSongs() {
      getSingerSongs(this.singerid).then((res) => {
        if (res.data.code === 200) {
          this.hotSongs = res.data.hotSongs;
          this.singer.img1v1Url = res.data.artist.picUrl;
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
    }
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
    z-index: 2;
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
  .result-list-item{
    display: flex;
    align-items: center;
    height: 60px;
    padding-left: 6px;
    box-sizing: border-box;
    width: 100%;
    background-color: #fff;
  }
  .result-list-item-index{
    width: 1.5em;
    font-size: 16px;
    color: #9c9d9f;
    text-align: center;
    padding-right: 10px;
  }
  .result-list-item .result-list-item-img{
    flex: 0 0 auto;
    position: relative;
    width: 54px;
    height: 54px;
    margin-right: 8px;
    line-height: 0;
    background-color: #e2e3e5;
    background-size: cover;
  }
  .result-list-item .result-list-item-img img{
    width: 100%;
  }
  .result-list-item .result-list-item-con{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1 1 auto;
    border-bottom: 1px solid #e2e3e5;
    overflow: hidden;
    padding-right: 30px;
  }
  .result-list-item .result-list-item-con span{
    color: #9c9d9f;
  }
  .result-list-item .result-list-item-con h4{
    font-size: 16px;
    font-weight: normal;
    color: #000;
    line-height: 1.5;
  }
  .result-list-item .result-list-item-con h5{
    font-size: 10px;
    font-weight: normal;
    color: #9c9d9f;
    line-height: 1.5;
  }
  /*专辑*/
  .albums-result-list-item .result-list-item-img{
    margin-right: 20px;
  }
  .albums-result-list-item .result-list-item-img::after{
    content: "";
    position: absolute;
    top: 2px;
    right: -10px;
    width: 10px;
    height: 50px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../assets/img/albums-bg.png);
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
</style>
