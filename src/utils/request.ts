import axios from 'axios';

import { getUser } from '@ncsa/geo-explorer/utils/auth';

export const request = axios.create();

request.interceptors.request.use((config) => {
  const user = getUser();
  if (user) {
    config.headers['Authorization'] = `Bearer ${user.access_token}`;
  }
  return config;
}, null);
