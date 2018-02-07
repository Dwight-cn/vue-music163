import { searchResultDefault, playMode } from './default';
import { loadSearchHistory } from '../assets/js/storage';

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
  searchHistory: loadSearchHistory(),
  // 搜索结果
  searchResult: searchResultDefault,
  // 播放歌曲列表
  playlist: [],
  // 顺序播放列表
  sequenceList: [],
  // 当前播放歌曲索引
  currentIndex: -1,
  // 播放模式
  mode: playMode.sequence,
  // audio ref
  audioRef: null,
};

export default state;
