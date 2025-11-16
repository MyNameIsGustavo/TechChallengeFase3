import axios from 'axios';

export const chronosAPI = axios.create({ baseURL: 'https://chronos-latest.onrender.com/' })