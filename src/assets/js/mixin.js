import { mapState, mapMutations, mapActions } from 'vuex';

export const songMixin = {
  computed: {
    // 使用对象展开运算符将此对象混入到外部对象中
    ...mapState([
      'audioRef',
    ]),
  },
  methods: {
    // 向播放列表添加歌曲
    _insertSong(song) {
      // 解决iOS无法播放
      this.iOSplay();
      if (song) {
        this.insertSong(song);
      }
    },
    _playAll(songlist) {
      // 解决iOS无法播放
      this.iOSplay();
      this.playAll(songlist);
      this.setPlayerShow(true);
    },
    // 解决iOS无法播放
    iOSplay() {
      console.log('iOS快播放');
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        console.log(this.audioRef.src);
        this.audioRef.play();
      }, 300);
    },
    ...mapMutations({
      setPlayerShow: 'SET_PLAYER_SHOW',
    }),
    ...mapActions([
      'insertSong',
      'playAll',
    ]),
  },
};
