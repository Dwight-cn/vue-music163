<template>
  <transition name="slide">
    <div class="player" v-show="playerShow">
      <!--模糊背景-->
      <div class="player-bg" :style="`background-image:url(${songCover});`"></div>
      <div class="player-wrap">
        <!--头部-->
        <div class="player-header">
          <i class="iconfont icon-back" @click="hidePlayer"></i>
          <div class="song-name">
            <h4 class="overflow-ellipsis">{{ currentSong.name }}</h4>
            <h5 class="overflow-ellipsis"><span v-for="a in currentSong.artists" :key="a.id">{{a.name}}</span></h5>
          </div>
        </div>
        <div class="player-middle">
          <!--唱片-->
          <div class="cd-wrapper" ref="cdRef">
            <img src="./img/cd-stylus.png" alt="" class="cd-stylus" :class="{playing: playing}">
            <div class="cd" :class="{playing: playing}">
              <img src="./img/cd.png" alt="">
              <div class="cd-img">
                <img :src="songCover" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="player-bottom">
          <!--进度条-->
          <div class="progress-wrapper">
            <span class="time time-l">{{ currentTime  | format }}</span>

            <div class="progress-bar-wrapper">
              <progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
            </div>

            <span class="time time-r">{{ currentSong.duration / 1000 | format }}</span>
          </div>
          <!--控制区-->
          <ul class="player-ctrl">
            <li class="player-crtl-1">
              <i class="iconfont" :class="iconMode"></i>
            </li>
            <li class="player-crtl-2">
              <i class="iconfont icon-prev" @click="prevSong"></i>
            </li>
            <li class="player-crtl-3">
              <i class="iconfont" :class="playing ? 'icon-stop' : 'icon-play'" @click="togglePlaying"></i>
            </li>
            <li class="player-crtl-4">
              <i class="iconfont icon-next" @click="nextSong"></i>
            </li>
            <li class="player-crtl-5">
              <i class="iconfont icon-playlist"></i>
            </li>
          </ul>
        </div>
      </div>

      <!-- 播放器 -->
      <audio ref="audioRef" :src="currentSongUrl" @play="ready" @error="error" @timeupdate="timeupdate" @ended="ended">Your browser does not support the audio element.</audio>
    </div>
  </transition>
</template>

<script>
import ProgressBar from '@/components/base/ProgressBar/ProgressBar';
import { mapState, mapGetters, mapMutations } from 'vuex';
import { getSongUrl, getSongUrlDetail } from '@/api/song';
import { playMode } from '@/store/default';

export default {
  name: 'HelloWorld',
  components: {
    ProgressBar,
  },
  data() {
    return {
      // 播放url
      currentSongUrl: '',
      // 歌曲封面
      songCover: '',
      // 标志位。歌曲已缓存好，可以播放了
      songReady: false,
      // 当前播放时间
      currentTime: 0,
    };
  },
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'playing',
      'playerShow',
      'mode',
      'playlist',
      'currentIndex',
    ]),
    ...mapGetters([
      'currentSong',
    ]),
    // 播放模式对应图标字体
    iconMode() {
      let cls = '';
      if (this.mode === 0) {
        cls = 'icon-lbxh';
      } else if (this.mode === 1) {
        cls = 'icon-dqxh';
      } else if (this.mode === 2) {
        cls = 'icon-sjbf';
      } else {
        cls = '';
      }
      return cls;
    },
    // 播放进度
    percent() {
      return this.currentTime / this.currentSong.duration * 1000;
    },
  },
  // 过滤器
  filters: {
    // 格式化时间
    format: (value) => {
      if (!value) return '00:00';
      const timestamp = Math.floor(value);

      const minute = (Math.floor(timestamp / 60)).toString().padStart(2, '0');
      const second = (timestamp % 60).toString().padStart(2, '0');
      return `${minute}:${second}`;
    },
  },
  methods: {
    // 获取歌曲播放链接
    _getSongUrl(songid) {
      getSongUrl(songid).then((res) => {
        const songUrl = res.data.data[0].url;
        this.currentSongUrl = songUrl;
      });
    },
    // 获取封面
    _getSongCover(songid) {
      getSongUrlDetail(songid).then((res) => {
        const songCoverUrl = res.data.songs[0].al.picUrl;
        this.songCover = songCoverUrl;
        this.songPlay();
      });
    },
    // 隐藏播放器
    hidePlayer() {
      this.setPlayerShow(false);
    },
    songPlay() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.$refs.audioRef.play();
      }, 1000);
    },
    // audio API canplay 当浏览器可以播放音频/视频时
    ready() {
      this.songReady = true;
      // 把当前歌曲写进 vuex 最近播放 playHistory 中
      // this.saveplayHistory(this.currentSong);
    },
    // audio API error 当在音频/视频加载期间发生错误时
    error() {
      this.songReady = true;
    },
    ended() {
      if (this.mode === playMode.loop) {
        this.loopSong();
      } else {
        this.nextSong();
      }
    },
    // HTML5 Audio/Video 属性 currentTime  设置或返回音频/视频中的当前播放位置（以秒计）
    timeupdate(e) {
      this.currentTime = e.target.currentTime;
    },
    // 播放按钮
    togglePlaying() {
      if (!this.songReady) {
        return;
      }
      this.setPlaying(!this.playing);
      // 暂停时，歌词也暂停
      /*  if (this.currentLyric) {
        this.currentLyric.togglePlay()
      } */
    },
    // 上一首
    prevSong() {
      if (!this.songReady) {
        return;
      }
      // 如果播放列表只要一条数据
      if (this.playlist.length === 1) {
        this.loopSong();
      } else {
        let index = this.currentIndex - 1;
        if (index === -1) {
          index = this.playlist.length - 1;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
          this.songReady = false;
        }
      }
    },
    // 下一首
    nextSong() {
      if (!this.songReady) {
        return;
      }
      // 如果播放列表只要一条数据
      if (this.playlist.length === 1) {
        this.loopSong();
      } else {
        let index = this.currentIndex + 1;
        if (index === this.playlist.length) {
          index = 0;
        }
        this.setCurrentIndex(index);
        if (!this.playing) {
          this.togglePlaying();
        }
      }
      this.songReady = false;
    },
    // 单曲循环
    loopSong() {
      this.$refs.audioRef.currentTime = 0;
      this.$refs.audioRef.play();
      // this.setPlaying(true);
      // this.songReady = true;
      // 单曲循环时，歌词也单曲循环
      // if (this.currentLyric) {
      //   this.currentLyric.seek(0);
      // }
    },
    // props down，当进度改变了
    percentChange(newPercent) {
      const currentTime = this.currentSong.duration / 1000 * newPercent;
      this.$refs.audioRef.currentTime = currentTime;

      // 进度改变后自动播放
      if (!this.playing) {
        this.togglePlaying();
      }

     /* if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      } */
    },
    pauseCD() {

    },
    ...mapMutations({
      setPlayerShow: 'SET_PLAYER_SHOW',
      setPlaying: 'SET_PLAYING',
      setCurrentIndex: 'SET_CURRENT_INDEX',
    }),
  },
  created() {

  },
  mounted() {

  },
  watch: {
    currentSong(newVal) {
      console.log(newVal);
      // 播放列表没有歌曲就退出
      if (!newVal.id) {
        return;
      }
      this._getSongUrl(newVal.id);
      this._getSongCover(newVal.id);
    },
    // 播放 or 暂停
    playing(newVal) {
      const audio = this.$refs.audioRef;
      this.$nextTick(() => {
        newVal ? audio.play() : audio.pause();
      });
    },
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
    background: #999;
    overflow: hidden;
  }
  .player-bg, .player-wrap{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .player-bg{
    background-size: cover;
    background-position: center;
    -webkit-filter: blur(30px);
    transform: scale(1.2);
  }
  .player-wrap{
    display: flex;
    flex-direction: column;
  }
  .player-header{
    position: relative;
    height: 44px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    width: 100%;
    text-align: center;
  }
  .icon-back{
    position: absolute;
    left: 0;
    top: 0;
    color: #fff;
    line-height: 44px;
    font-size: 24px;
    margin-left: 10px;
  }

  .song-name{
    padding: 6px 50px 0;
    text-align: center;
  }
  .song-name h4, .song-name h5{
    color: #fff;
    font-weight: normal;
    line-height: 1.2;
  }
  .song-name h4{
    font-size: 16px;
  }
  .song-name h5{
    font-size: 12px;
  }

  .player-middle{
    flex: 1 1 auto;
    position: relative;
    /*background-color: #f00;*/
  }
  .player-middle .cd-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*display: flex;*/
    /*justify-content: center;*/
  }
  .cd-wrapper .cd-stylus{
    position: absolute;
    width: 30%;
    left: 50%;
    top: 0;
    margin-top: -3%;
    margin-left: -5%;
    z-index: 2;
    transition: all 0.5s;
    transform-origin: 3% 5%;
    transform: rotate(-25deg);
  }
  .cd-wrapper .cd-stylus.playing{
    transform: rotate(0deg);
  }
  .cd-wrapper .cd{
    width: 80%;
    margin: 20% auto 0;
    position: relative;
    animation: round 12s linear 0s both infinite; 
    animation-play-state: paused;
    -webkit-animation-play-state:paused;
  }
  .cd-wrapper .cd>img{
    width: 100%;
  }
  .cd-wrapper .cd .cd-img{
    width: 63%;
    height: 63%;
    position: absolute;
    left: 18.5%;
    top: 18.5%;
    border-radius: 50%;
    overflow: hidden;
    background: url('img/cd-default.png') no-repeat;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .cd-wrapper .cd .cd-img img{
    width: 100%;
    height: 100%;
  }
  .cd-wrapper .cd::before{
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: url(img/cd-light.png) no-repeat;
    background-size: 100% 100%;
    z-index: 2;
  }
  .cd-wrapper .cd.playing{
    animation-play-state: running;
    -webkit-animation-play-state: running;
  }

  .player-bottom{
    flex: 0 0 auto;
    height: 140px;
    /*background: #0f0;*/
  }
  .player-ctrl{
    margin-top: 32px;
    width: 100%;
    height: 50px;
    display: flex;
  }
  .player-ctrl>li{
    flex: 1;
    line-height: 50px;
    color: rgba(255, 255, 255, 0.8);
    text-align: center;
  }
  .player-crtl-1 i{
    font-size: 30px;
  } 
  .player-crtl-2 i, .player-crtl-4 i{
    font-size: 30px;
  }
  .player-crtl-3 i{
    font-size: 50px;
  }
  .player-crtl-5 i{
    font-size: 30px;
  }

  /*进度条*/
  .progress-wrapper{
    display: flex;
    width: 100%;
    margin: 10px auto;
  }
  .progress-wrapper .time{
    flex: 0 0 auto;
    font-size: 10px;
    line-height: 16px;
    color: rgba(255, 255, 255, 0.8);
    padding: 0 1em;
  }
  .progress-bar-wrapper{
    flex: 1 1 auto;
  }

  /*播放器过渡*/
  .slide-enter-active, .slide-leave-active{
    transition: all .3s ease;
  }
  .slide-enter, .slide-leave-to{
    transform: translateX(100%);
    opacity: 0.5;
  }

  /*转动动画*/
  @keyframes round {
    100% {
      transform: rotate(1turn);
    }
  }
</style>
