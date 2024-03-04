import axios from 'axios';

export const getUserData = () => {
  return axios.get('http://seannas.myqnapcloud.com:7010');
};