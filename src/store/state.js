const state = {
  // 播放器播放状态
  playing: false,
  // 是否在搜索
  searching: false,
  // 搜索框是否取得焦点
  searchFocus: false,
  // 搜索关键字
  searchKeyWords: '',
  // 搜索建议
  searchSuggest: {},
  // 搜索历史
  searchHistory: [],
  // 搜索结果
  searchResult: [
    {
      id: 1,
      name: '单曲',
      key: 'songs',
      page: 0,
      result: [],
    },
    {
      id: 100,
      name: '歌手',
      key: 'artists',
      page: 0,
      result: [],
    },
    {
      id: 10,
      name: '专辑',
      key: 'albums',
      page: 0,
      result: [],
    },
    {
      id: 1000,
      name: '歌单',
      key: 'playlists',
      page: 0,
      result: [],
    },
    {
      id: 1002,
      name: '用户',
      key: 'userprofiles',
      page: 0,
      result: [],
    },
  ],
};

export default state;
