import axios from 'axios';
import apiConfig from './config';

export function getSearchSuggest(val) {
  const url = `${apiConfig.baseUrl}/search/suggest?keywords=${val}`;
  return axios.get(url);
}
