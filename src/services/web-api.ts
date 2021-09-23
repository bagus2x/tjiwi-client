import axios, { AxiosError } from 'axios';
import history from './history';
import { clearToken, getAccessToken, getRefreshToken, setAccessToken, setRefreshToken } from './storage';

export interface Success<T> {
  success: boolean;
  data: T;
}

export interface Failure {
  success: boolean;
  error: {
    code: string;
    messages: Array<string>;
  };
}

interface RefreshTokenResponse {
  id: number;
  token: {
    access: string;
    refresh: string;
  };
}

export const BASE_URL = process.env.REACT_APP_WEB_SERVICE;

export const publicClient = axios.create({
  baseURL: BASE_URL
});

export const privateClient = axios.create({
  baseURL: BASE_URL
});

export const isWebApiError = (error: any): error is AxiosError<Failure> => {
  if(error === null) return false;
  if (axios.isAxiosError(error)) {
    if (error.response?.data) {
      if (error.response.data.error) return true;
    }
  }

  return false;
};

const ACCESS_EXPIRED_CODE = 'access_token_expired';
let isRefreshing = false;
let failedQueue: Array<{ resolve: (value: any) => void; reject: (reason: any) => void }> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

privateClient.interceptors.request.use((request) => {
  const accessToken = getAccessToken();
  request.headers['Authorization'] = `Bearer ${accessToken}`;
  return request;
});

privateClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (isWebApiError(error)) {
      const originalRequest = error.config;

      if (
        error.response?.status === 401 &&
        error.response.data.error.code === ACCESS_EXPIRED_CODE &&
        !(originalRequest as any)._retry
      ) {
        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then((accessToken) => {
              originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
              return axios(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        (originalRequest as any)._retry = true;
        isRefreshing = true;

        const token = getRefreshToken();
        return new Promise(function (resolve, reject) {
          publicClient
            .post<Success<RefreshTokenResponse>>('users/refresh', { token })
            .then(({ data }) => {
              const refresh = data.data.token.refresh;
              const access = data.data.token.access;
              setRefreshToken(refresh);
              setAccessToken(access);
              publicClient.defaults.headers.common['Authorization'] = `Bearer ${access}`;
              originalRequest.headers['Authorization'] = `Bearer ${access}`;
              processQueue(null, access);
              resolve(axios(originalRequest));
            })
            .catch((err) => {
              processQueue(err, null);
              history.replace('/');
              clearToken();
              reject(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }
    }
    return Promise.reject(error);
  }
);
