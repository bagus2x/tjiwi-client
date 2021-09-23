import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { getStorageMemberID } from '../../services/storage';
import { Failure, privateClient, Success } from '../../services/web-api';

interface GetBasePaperResponse {
  id: number;
  storageID: number;
  gsm: number;
  width: number;
  io: number;
  materialNumber: number;
  quantity: number;
  location?: string;
  createdAt: number;
  updatedAt: number;
}

const getBasePaper = (basePaperID: number, storageID: number) => async () => {
  const res = await privateClient.get<Success<GetBasePaperResponse>>(`/basepapers/${basePaperID}`, {
    headers: {
      'X-Storage-Member': getStorageMemberID(storageID)
    }
  });

  return res.data.data;
};

const useGetBasePaper = (basePaperID: number, enabled = false) => {
  const { storageID } = useParams<{ storageID: string }>();

  return useQuery<GetBasePaperResponse, Failure>(
    ['BASE_PAPER', basePaperID],
    getBasePaper(basePaperID, parseInt(storageID)),
    {
      retry: false,
      staleTime: 5000,
      cacheTime: 5000,
      enabled: basePaperID > 0 && enabled
    }
  );
};

export default useGetBasePaper;
