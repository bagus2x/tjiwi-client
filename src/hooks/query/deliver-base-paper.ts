import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { privateClient, Success } from '../../services/web-api';
import useStorageMemberID from '../storage-memberID';
import { SearchBasePaperResponse, useQueryKey } from './search-base-paper-list';

interface DeliiverRequest {
  basePaperID: number;
  quantity: number;
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

const deliverBasePaper = (storMembID: number) => async (req: DeliiverRequest) => {
  const url = `/basepapers/${req.basePaperID}/deliver`;
  const res = await privateClient.put<Success<MoveResponse>>(url, req, {
    headers: {
      'X-Storage-Member': storMembID
    }
  });

  return res.data.data;
};

const useDeliverBasePaper = () => {
  const queryClient = useQueryClient();
  const queryKey = useQueryKey();
  const storMembID = useStorageMemberID();

  return useMutation('DELIVER_BASE_PAPER', deliverBasePaper(storMembID as number), {
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

export default useDeliverBasePaper;
