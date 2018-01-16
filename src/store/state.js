import { searchResultDefault } from './default';

const state = {
  // 播放器播放状态
  playing: false,
  // 播放器是否显示
  playerShow: false,
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
  searchResult: searchResultDefault,
};

export default state;
