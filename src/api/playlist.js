import axios from 'axios';
import apiConfig from './config';

// 获取歌单详情
export function getPlaylist(playlistId) {
  const url = `${apiConfig.baseUrl}/playlist/detail?id=${playlistId}`;
  return axios.get(url);
}
