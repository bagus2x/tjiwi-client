import { useQuery } from 'react-query';
import { privateClient, Success } from '../../services/web-api';

export type GetStorageMembersResponse = {
  id: number;
  storage: {
    id: number;
    name: string;
    description: string;
  };
  member: {
    id: number;
  };
  isAdmin: boolean;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
};

const getStorageMembers = (storMembID: number) => async () => {
  const url = `storagemembers/${storMembID}`;

  const res = await privateClient.get<Success<GetStorageMembersResponse>>(url);
  return res.data.data;
};

const useGetStorageMember = (storMembID: number) => {
  return useQuery('STORAGE_MEMBERS_BY_ID', getStorageMembers(storMembID), {
    retry: false,
    staleTime: 5 * 1000,
    enabled: typeof storMembID === 'number'
  });
};

export default useGetStorageMember;
