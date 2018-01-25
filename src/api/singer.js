import axios from 'axios';
import apiConfig from './config';


// 获取歌手热门单曲
export function getSingerSongs(singerid) {
  const url = `${apiConfig.baseUrl}/artists?id=${singerid}`;
  return axios.get(url);
}

// 获取歌手专辑
// offset: 用于分页
export function getSingerAlbum(singerid, offset = 0) {
  const url = `${apiConfig.baseUrl}/artist/album?id=${singerid}&offset=${offset}`;
  return axios.get(url);
}
