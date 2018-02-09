import axios from 'axios';
import apiConfig from './config';

// 获取歌曲播放url
export function getUserDetail(userid) {
  const url = `${apiConfig.baseUrl}/user/detail?uid=${userid}`;
  return axios.get(url);
}

