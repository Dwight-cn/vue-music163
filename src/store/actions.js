import * as types from './mutations-types';
import { saveSearchHistory } from '../assets/js/storage';

function findSongIndex(list, song) {
  return list.findIndex((item) => {
    return item.id && item.id === song.id;
  });
}
function findIndex(arr, i) {
  return arr.findIndex((item) => {
    return item === i;
  });
}

// 设置搜索结果
export const setSearchResultData = ({ commit, state }, { id, data }) => {
  const searchResultcopy = [...state.searchResult];
  const searchResultItem = searchResultcopy.find((item) => {
    return item.id === parseInt(id, 10);
  });
  searchResultItem.result = data;
  commit(types.SET_SEARCH_RESULT, searchResultcopy);
};

// 清空搜索结果
export const clearSearchResultData = ({ commit, state }) => {
  const searchResultcopy = [...state.searchResult];
  searchResultcopy.forEach((item) => {
    item.result = [];
  });
  commit(types.SET_SEARCH_RESULT, searchResultcopy);
};

// 添加搜索历史
export const addSearchHistory = ({ commit, state }, keywords) => {
  if (keywords === '') {
    return;
  }
  const searchHistory = [...state.searchHistory];
  const historyIndex = findIndex(searchHistory, keywords);
  if (historyIndex !== -1) {
    searchHistory.splice(historyIndex, 1);
  }
  searchHistory.push(keywords);
  saveSearchHistory(searchHistory);
  commit(types.SET_SEARCH_HISTORY, searchHistory);
};

// 删除搜索历史
export const deleteSearchHistory = ({ commit, state }, keywords) => {
  const searchHistory = [...state.searchHistory];
  const historyIndex = findIndex(searchHistory, keywords);
  if (historyIndex !== -1) {
    searchHistory.splice(historyIndex, 1);
  }
  saveSearchHistory(searchHistory);
  commit(types.SET_SEARCH_HISTORY, searchHistory);
};

// 向播放列表添加歌曲
export const insertSong = ({ commit, state }, song) => {
  const playlist = [...state.playlist];
  const sequenceList = [...state.sequenceList];
  let currentIndex = state.currentIndex;
  // 记录当前歌曲
  const currentSong = playlist[currentIndex];
  // 查询待添加的歌曲是否已在播放列表中
  const fpIndex = findSongIndex(playlist, song);
  // 插入到当前索引
  currentIndex++;
  playlist.splice(currentIndex, 0, song);
  // 如果待添加的歌曲已在播放列表中，删除原有歌曲
  if (fpIndex > -1) {
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1);
      currentIndex--;
    } else {
      playlist.splice(fpIndex + 1, 1);
    }
  }
  // 插入到 sequenceList 中的位置
  const currentSIndex = findSongIndex(sequenceList, currentSong) + 1;
  // 查询待添加的歌曲是否已在 sequenceList 列表中
  const fsIndex = findSongIndex(sequenceList, song);
  // 插入到当前索引
  sequenceList.splice(currentSIndex, 0, song);
  // 如果待添加的歌曲已在播放列表中，删除原有歌曲
  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1);
    } else {
      sequenceList.splice(fsIndex + 1, 1);
    }
  }
  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);
  commit(types.SET_PLAYING, true);
  commit(types.SET_PLAYER_SHOW, true);
};

export const deleteSong = ({ commit, state }, song) => {
  const playlist = [...state.playlist];
  const sequenceList = [...state.sequenceList];
  let currentIndex = state.currentIndex;

  // 查询在播放列表中索引
  const pIndex = findSongIndex(playlist, song);
  playlist.splice(pIndex, 1);

  const sIndex = findIndex(sequenceList, song);
  sequenceList.splice(sIndex, 1);

  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--;
  }

  commit(types.SET_PLAYLIST, playlist);
  commit(types.SET_SEQUENCE_LIST, sequenceList);
  commit(types.SET_CURRENT_INDEX, currentIndex);

  const playingState = playlist.length > 0;
  commit(types.SET_PLAYING, playingState);
};
