import { useMutation } from 'react-query';
import { getStorageMemberID } from '../../services/storage';
import { privateClient, Success } from '../../services/web-api';

interface AddBasePaperRequest {
	storageID: number;
  gsm: number;
  width: number;
  io: number;
  materialNumber: number;
  quantity: number;
}

interface AddBasePaperResponse {
  id: number;
  gsm: number;
  width: number;
  io: number;
  materialNumber: number;
  quantity: number;
  createdAt: number;
  updatedAt: number;
}

const addBasePaper = async (req: AddBasePaperRequest) => {
  const res = await privateClient.put<Success<AddBasePaperResponse>>('/basepapers', req, {
    headers: {
      'X-Storage-Member': getStorageMemberID(req.storageID)
    }
  });

  return res.data.data;
};

const useAddBasePaper = () => {
  return useMutation('ADD_BASE_PAPER', addBasePaper);
};

export default useAddBasePaper;
