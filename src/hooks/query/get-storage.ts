import { useQuery } from 'react-query';
import { minutesToMiliseconds } from '../../services/time';
import { privateClient, Success } from '../../services/web-api';

interface GetStorageResponse {
  id: number;
  supervisor: {
    id: number;
    username: string;
    email: string;
  };
  name: string;
  description: string;
  createdAt: number;
  updatedAt: number;
}

const getStorage = (storageID: number) => async () => {
  const res = await privateClient.get<Success<GetStorageResponse>>(`/storages/${storageID}`);

  return res.data.data;
};

const useGetStorage = (storageID: number) => {
  return useQuery(['STORAGE', storageID], getStorage(storageID), {
    retry: false,
    staleTime: minutesToMiliseconds(5)
  });
};

export default useGetStorage;
