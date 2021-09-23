import { useMutation, useQueryClient } from 'react-query';
import { privateClient, Success } from '../../services/web-api';

interface CreateStorageRequest {
  name: string;
  description: string;
}

const createStorage = async (req: CreateStorageRequest) => {
  const res = await privateClient.post<Success<CreateStorageRequest>>('/storages', req);

  return res.data;
};

const useCreateStorage = () => {
  const queryClient = useQueryClient();

  return useMutation('CREATE STORAGES', createStorage, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('STORAGES');
    }
  });
};

export default useCreateStorage;
