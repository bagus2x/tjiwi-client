import { InfiniteData, useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { getStorageMemberID } from '../../services/storage';
import { privateClient } from '../../services/web-api';
import { useQueryKey, SearchBasePaperResponse } from './search-base-paper-list';

type Setter = InfiniteData<SearchBasePaperResponse>;

const deleteBasePaper = (storageID: number) => async (basePaperID: number) => {
  await privateClient.delete(`/basepapers/${basePaperID}`, {
    headers: {
      'X-Storage-Member': getStorageMemberID(storageID)
    }
  });
};

const useDeleteBasePaper = () => {
  const queryKey = useQueryKey();
  const queryClient = useQueryClient();
  const { storageID } = useParams<{ storageID: string }>();

  return useMutation('DELETE_BASE_PAPER', deleteBasePaper(parseInt(storageID)), {
    onMutate: async (req) => {
      await queryClient.cancelQueries(queryKey);

      const prevInfiniteData = queryClient.getQueryData<Setter>(queryKey);

      if (!prevInfiniteData) return null;
      queryClient.setQueryData<Setter>(queryKey, {
        pageParams: prevInfiniteData.pageParams,
        pages: prevInfiniteData.pages.map((page) => ({
          ...page,
          basePapers: page.basePapers.filter((basePaper) => basePaper.id !== req)
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

export default useDeleteBasePaper;
