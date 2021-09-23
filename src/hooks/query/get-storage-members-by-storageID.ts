import { useQuery } from 'react-query';
import { minutesToMiliseconds } from '../../services/time';
import { privateClient, Success } from '../../services/web-api';

export type GetStorageMembersResponse = Array<{
  id: number;
  storage: {
    id: number;
  };
  member: {
    id: number;
    photo: string;
    username: string;
  };
  isAdmin: boolean;
  isActive: boolean;
  createdAt: number;
  updatedAt: number;
}>;

const getStorageMembers = (storageID: number) => async () => {
  const url = `/storagemembers/storage/${storageID}`;
  const res = await privateClient.get<Success<GetStorageMembersResponse>>(url);

  return res.data.data;
};

const useGetStorageMembers = (storageID: number) => {
  return useQuery('STORAGE_MEMBERS_BY_STORAGE_ID', getStorageMembers(storageID), {
    retry: false,
    staleTime: minutesToMiliseconds(5)
  });
};

export default useGetStorageMembers;
