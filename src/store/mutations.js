import * as types from './mutations-types';

const mutations = {
  [types.SET_PLAYING](state, flag) {
    state.playing = flag;
  },
  [types.SET_PLAYER_SHOW](state, flag) {
    state.playerShow = flag;
  },
  [types.SET_SEARCHING](state, flag) {
    state.searching = flag;
  },
  [types.SET_SEARCHING_FOCUS](state, flag) {
    state.searchFocus = flag;
  },
  [types.SET_SEARCH_KEYWORDS](state, searchKeyWords) {
    state.searchKeyWords = searchKeyWords;
  },
  [types.SET_SEARCH_SUGGEST](state, suggest) {
    state.searchSuggest = suggest;
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history;
  },
  [types.SET_SEARCH_RESULT](state, result) {
    state.searchResult = result;
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list;
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index;
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list;
  },
  [types.SET_MODE](state, mode) {
    state.mode = mode;
  },
  [types.SET_AUDIO_REF](state, ref) {
    state.audioRef = ref;
  },
};

export default mutations;
