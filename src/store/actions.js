import * as types from './mutations-types';

export const setSearchResultData = ({ commit, state }, { id, data }) => {
  const searchResultcopy = [...state.searchResult];
  const searchResultItem = searchResultcopy.find((item) => {
    return item.id === parseInt(id, 10);
  });
  searchResultItem.result = data;
  commit(types.SET_SEARCH_RESULT, searchResultcopy);
};

export const clearSearchResultData = ({ commit, state }) => {
  const searchResultcopy = [...state.searchResult];
  searchResultcopy.forEach((item) => {
    item.result = [];
  });
  commit(types.SET_SEARCH_RESULT, searchResultcopy);
};
