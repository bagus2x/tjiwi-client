import { useQuery } from 'react-query';
import { setStorageMemberID } from '../../services/storage';
import { minutesToMiliseconds } from '../../services/time';
import { privateClient, Success } from '../../services/web-api';

export type GetStorageMembersResponse = Array<{
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
}>;

const getStorageMembers = (memberID: number) => async () => {
  const url = `/storagemembers/member/${memberID}`;
  const res = await privateClient.get<Success<GetStorageMembersResponse>>(url);

  return res.data.data;
};

const useGetStorageMembers = (memberID: number, enabled = false) => {
  return useQuery('STORAGE_MEMBERS_BY_MEMBER_ID', getStorageMembers(memberID), {
    retry: false,
    staleTime: minutesToMiliseconds(1),
    cacheTime: minutesToMiliseconds(1),
    enabled: typeof memberID === 'number' && enabled,
    onSuccess: (data) => {
      data.forEach((storMemb) => {
        setStorageMemberID(storMemb.storage.id, storMemb.id);
      });
    }
  });
};

export default useGetStorageMembers;
