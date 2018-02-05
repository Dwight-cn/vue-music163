import { mapMutations, mapActions } from 'vuex';

export const songMixin = {
  methods: {
    // 向播放列表添加歌曲
    _insertSong(song) {
      if (song) {
        this.insertSong(song);
      }
    },
    _playAll(songlist) {
      this.playAll(songlist);
      this.setPlayerShow(true);
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
