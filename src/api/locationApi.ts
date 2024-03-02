import axios from 'axios';

export const locationApi = {
  getVNLocation() {
    return axios.get('https://provinces.open-api.vn/api/?depth=3');
  },
};
