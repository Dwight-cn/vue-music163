import axios from 'axios';
import apiConfig from './config';

// 获取用户详情
export function getUserDetail(userid) {
  const url = `${apiConfig.baseUrl}/user/detail?uid=${userid}`;
  return axios.get(url);
}

// 获取用户歌单
export function getUserPlaylist(userid) {
  const url = `${apiConfig.baseUrl}/user/playlist?uid=${userid}`;
  return axios.get(url);
}
