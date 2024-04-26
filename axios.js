import axios from 'axios';
axios.defaults.baseURL = 'https://gitapp.dev.ongrid.run/';

const back = axios.create({
  baseURL: 'https://gitapp.dev.ongrid.run/',
});

export default back;
