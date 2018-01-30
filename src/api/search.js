import axios from 'axios';
import apiConfig from './config';

// 获取搜索建议
export function getSearchSuggest(val) {
  const url = `${apiConfig.baseUrl}/search/suggest?keywords=${val}`;
  return axios.get(url);
}

// 获取搜索结果
// type: 搜索类型；默认为 1 即单曲, 取值意义 : 1: 单曲 10: 专辑 100: 歌手 1000: 歌单 1002: 用户 1004: MV 1006: 歌词 1009: 电台
export function getSearchResult(keywords, type, page) {
  const ipage = page || 0;
  const itype = type || 1;
  const url = `${apiConfig.baseUrl}/search?keywords=${keywords}&offset=${ipage}&type=${itype}&limit=30`;
  return axios.get(url);
}
