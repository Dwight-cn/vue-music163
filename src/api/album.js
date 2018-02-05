import axios from 'axios';
import apiConfig from './config';

// 获取专辑内容
export function getAlbum(albumid) {
  const url = `${apiConfig.baseUrl}/album?id=${albumid}`;
  return axios.get(url);
}
