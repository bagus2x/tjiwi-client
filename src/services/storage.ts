import decode from 'jwt-decode';

const ACCESS_KEY = 'access';
const REFRESH_KEY = 'refresh';

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_KEY, token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_KEY, token);
};

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_KEY);
};

export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_KEY);
};

export const removeAccessToken = () => {
  localStorage.removeItem(ACCESS_KEY);
};

export const removeRefreshToken = () => {
  localStorage.removeItem(REFRESH_KEY);
};

export const clearToken = () => {
  localStorage.clear();
};

export const isAuthenticated = () => {
  const access = getAccessToken();
  const refresh = getRefreshToken();

  if (!access || !refresh) return false;
  try {
    const { exp } = decode<{ exp: number }>(refresh);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  return true;
};

export const setStorageMemberID = (storageID: number, storageMemberID: number) => {
  localStorage.setItem(`storage-${storageID}`, storageMemberID.toString());
};

export const getStorageMemberID = (storageID: number) => {
  const id = localStorage.getItem(`storage-${storageID}`);
  if (!id) return null;
  return parseInt(id);
};

export const isStorageMember = (storageID: number) => {
  return getStorageMemberID(storageID) !== null;
};
