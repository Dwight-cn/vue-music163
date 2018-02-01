import { mapActions } from 'vuex';

export const songMixin = {
  methods: {
    // 向播放列表添加歌曲
    _insertSong(song) {
      this.insertSong(song);
    },
    ...mapActions([
      'insertSong',
    ]),
  },
};
