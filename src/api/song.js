import axios from 'axios';
import apiConfig from './config';

// 获取歌曲播放url
export function getSongUrl(songid) {
  const url = `${apiConfig.baseUrl}/music/url?id=${songid}`;
  return axios.get(url);
}

// 获取歌曲详情
export function getSongUrlDetail(songid) {
  const url = `${apiConfig.baseUrl}/song/detail?ids=${songid}`;
  return axios.get(url);
}

// 获取歌词
export function getSongLrc(songid) {
  const url = `${apiConfig.baseUrl}/lyric?id=${songid}`;
  return axios.get(url);
}
