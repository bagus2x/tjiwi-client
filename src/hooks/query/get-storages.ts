import { useQuery } from 'react-query';
import { minutesToMiliseconds } from '../../services/time';
import { isWebApiError, privateClient, Success } from '../../services/web-api';

export type GetStoragesResponse = Array<{
  id: number;
  supervisor: {
    id: number;
  };
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}>;

export const getStorages = async () => {
  let res: GetStoragesResponse = [];
  try {
    res = (await privateClient.get<Success<GetStoragesResponse>>('/storages')).data.data;
  } catch (error) {
    if (isWebApiError(error) && error.response) {
      if (error.response.status === 404) return res;
      else throw error;
    }
  }

  return res;
};

const useGetStorages = () => {
  return useQuery('STORAGES', getStorages, {
    retry: false,
    staleTime: minutesToMiliseconds(5),
  });
};

export default useGetStorages;
