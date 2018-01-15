import * as types from './mutations-types';

const mutations = {
  [types.SET_PLAYING](state, flag) {
    state.playing = flag;
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
};

export default mutations;
