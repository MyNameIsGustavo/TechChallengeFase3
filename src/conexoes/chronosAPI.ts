import axios from 'axios';

export const chronosAPI = axios.create({ baseURL: process.env.REACT_APP_BACKEND })