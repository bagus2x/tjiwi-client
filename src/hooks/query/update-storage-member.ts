import { useMutation, useQueryClient } from 'react-query';
import { privateClient, Success } from '../../services/web-api';
import { GetStorageMembersResponse } from './get-storage-members-by-storageID';

interface UpdateStorMembRequest {
  id: number;
  isAdmin: boolean;
  isActive: boolean;
}

interface UpdateStorMembResponse {
  id: number;
  isAdmin: boolean;
  isActive: boolean;
  updatedAt: number;
}

const updateStorageMember = async (req: UpdateStorMembRequest) => {
  const res = await privateClient.patch<Success<UpdateStorMembResponse>>(`/storagemembers/${req.id}`, req);

  return res.data.data;
};

const useUpdateStorageMember = () => {
  const queryClient = useQueryClient();

  return useMutation('UPDATE_STORAGE_MEMBER', updateStorageMember, {
    onMutate: async (req) => {
      await queryClient.cancelQueries('STORAGE_MEMBERS_BY_STORAGE_ID');

      const prevStorMembs = queryClient.getQueryData<GetStorageMembersResponse>('STORAGE_MEMBERS_BY_STORAGE_ID');

      if (prevStorMembs) {
        const updated = prevStorMembs.map((storMemb) => (storMemb.id === req.id ? { ...storMemb, ...req } : storMemb));
        queryClient.setQueryData('STORAGE_MEMBERS_BY_STORAGE_ID', updated);
      }

      return { prevStorMembs };
    },
    onError: (_error, _req, ctx: any) => {
      if (ctx.prevStorMembs) queryClient.setQueryData('STORAGE_MEMBERS_BY_STORAGE_ID', ctx.prevStorMembs);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries('STORAGE_MEMBERS_BY_STORAGE_ID');
    }
  });
};

export default useUpdateStorageMember;
