import { useMutation, useQueryClient } from 'react-query';
import { privateClient, Success } from '../../services/web-api';

interface AddNewStorageMemberRequest {
  memberID: number;
  storageID: number;
  isActive: boolean;
  isAdmin: boolean;
}

const addNewStorageMember = async (req: AddNewStorageMemberRequest) => {
  const res = await privateClient.post<Success<AddNewStorageMemberRequest>>('/storagemembers', req);
  return res.data.data;
};

const useAddStorageMember = () => {
  const queryClient = useQueryClient();

  return useMutation('ADD_STORAGE_MEMBER', addNewStorageMember, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('STORAGE_MEMBERS_BY_STORAGE_ID');
    }
  });
};

export default useAddStorageMember;
