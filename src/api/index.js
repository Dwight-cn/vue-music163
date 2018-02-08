import axios from 'axios';
import apiConfig from './config';

// 获取推荐歌单
export function getRemdPlaylist() {
  const url = `${apiConfig.baseUrl}/personalized`;
  return axios.get(url);
}

// 获取推荐音乐
export function getRemdSong() {
  const url = `${apiConfig.baseUrl}/personalized/newsong`;
  return axios.get(url);
}
