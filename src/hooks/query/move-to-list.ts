import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { privateClient, Success } from '../../services/web-api';
import useStorageMemberID from '../storage-memberID';
import { useQueryKey, SearchBasePaperResponse } from './search-base-paper-buffer-area';

interface MoveRequest {
  basePaperID: number;
  quantity: number;
  location: string;
}

interface MoveResponse {
  id: number;
  storageID: number;
  gsm: number;
  width: number;
  io: number;
  materialNumber: number;
  quantity: number;
  location: string;
  createdAt: number;
  updatedAt: number;
}

type Setter = InfiniteData<SearchBasePaperResponse>;

const moveToList = (storMembID: number) => async (req: MoveRequest) => {
  const url = `/basepapers/${req.basePaperID}/move-to-list`;
  const res = await privateClient.put<Success<MoveResponse>>(url, req, {
    headers: {
      'X-Storage-Member': storMembID
    }
  });

  return res.data.data;
};

const useMoveToBufferArea = () => {
  const queryClient = useQueryClient();
  const queryKey = useQueryKey();
  const storMembID = useStorageMemberID();

  return useMutation('MOVE_TO_LIST', moveToList(storMembID as number), {
    onMutate: async (req) => {
      await queryClient.cancelQueries(queryKey);

      const prevInfiniteData = queryClient.getQueryData<Setter>(queryKey);

      if (!prevInfiniteData) return null;
      queryClient.setQueryData<Setter>(queryKey, {
        pageParams: prevInfiniteData.pageParams,
        pages: prevInfiniteData.pages.map((page) => ({
          ...page,
          basePapers: page.basePapers.map((basePaper) => {
            return basePaper.id === req.basePaperID
              ? { ...basePaper, quantity: basePaper.quantity - req.quantity }
              : basePaper;
          })
        }))
      });

      return { prevInfiniteData };
    },
    onSuccess: async () => {
      await queryClient.refetchQueries(queryKey);
    },
    onError: (_error, _req, ctx: any) => {
      if (!ctx?.prevInfiniteData) return;
      queryClient.setQueriesData(queryKey, ctx.prevInfiniteData);
    }
  });
};

export default useMoveToBufferArea;
