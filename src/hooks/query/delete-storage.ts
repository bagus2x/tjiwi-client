import { useMutation, useQueryClient } from 'react-query';
import { privateClient, Success } from '../../services/web-api';
import { GetStoragesResponse } from './get-storages';

export const deleteStorage = async (storageID: number) => {
  const res = await privateClient.delete<Success<number>>(`/storages/${storageID}`);

  return res.data.data;
};

const useDeleteStorage = () => {
  const queryClient = useQueryClient();

  return useMutation('DELETE_STORAGE', deleteStorage, {
    onMutate: async (storageID) => {
      await queryClient.cancelQueries('STORAGES');

      const prevStorages = queryClient.getQueryData<GetStoragesResponse>('STORAGES');

      if (prevStorages) {
        const filtered = prevStorages.filter((storage) => storage.id !== storageID);
        queryClient.setQueryData('STORAGES', filtered);
      }

      return { prevStorages };
    },
    onError: async (_error, _req, ctx: any) => {
      if (!ctx.prevStorages) return;
      await queryClient.setQueryData('STORAGES', ctx.prevStorages);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('STORAGES');
    }
  });
};

export default useDeleteStorage;
