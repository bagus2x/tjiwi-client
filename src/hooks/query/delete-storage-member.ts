import { useMutation, useQueryClient } from 'react-query';
import { privateClient } from '../../services/web-api';
import { GetStoragesResponse } from './get-storages';

export const deleteStorageMember = async (stormembID: number) => {
  return await privateClient.delete(`/storagemembers/${stormembID}`);
};

const useDeleteStorageMember = () => {
  const queryClient = useQueryClient();

  return useMutation('DELETE_STORAGE_MEMBER', deleteStorageMember, {
    onMutate: async (storageID) => {
      await queryClient.cancelQueries('STORAGES');

      const prevStorages = queryClient.getQueryData<GetStoragesResponse>('STORAGE_MEMBERS_BY_STORAGE_ID');

      if (prevStorages) {
        const filtered = prevStorages.filter((storage) => storage.id !== storageID);
        queryClient.setQueryData('STORAGE_MEMBERS_BY_STORAGE_ID', filtered);
      }

      return { prevStorages };
    },
    onError: async (_error, _req, ctx: any) => {
      if (ctx.prevStorages) {
        await queryClient.setQueryData('STORAGE_MEMBERS_BY_STORAGE_ID', ctx.prevStorages);
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('STORAGE_MEMBERS_BY_STORAGE_ID');
    }
  });
};

export default useDeleteStorageMember;
