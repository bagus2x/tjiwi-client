import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getStorageMemberID } from '../../services/storage';
import { privateClient, Success } from '../../services/web-api';
import useQueryString from '../query-string';

interface FilterBasePaper {
  gsm: string | null;
  width: string | null;
  io: string | null;
  location: string | null;
  storage_id: string | null;
}

interface PageParam {
  dir: 'next' | 'prev';
  cursor: number;
  limit: number;
}

export interface SearchBasePaperResponse {
  basePapers: Array<{
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
  }>;
  cursor: {
    next: number;
    previous: number;
  };
}

type QueryCtx = QueryFunctionContext<[string, FilterBasePaper], PageParam>;

const defaultPageParam: PageParam = {
  cursor: 0,
  dir: 'next',
  limit: 20
};

const searchBasePaper = async ({ pageParam = defaultPageParam, queryKey }: QueryCtx) => {
  let params = {
    ...pageParam,
    ...queryKey[1]
  };

  const url = `/basepapers/storage/${queryKey[1]?.storage_id}/search-in-list`;
  const res = await privateClient.get<Success<SearchBasePaperResponse>>(url, { 
    params: params,
    headers: {
      'X-Storage-Member': getStorageMemberID(parseInt(queryKey[1].storage_id as string))
    }
   });

   if (!res.data.data.basePapers.length) throw new Error('Not found');

  return res.data.data;
};

export const QUERY_KEY = 'SEARCH_BASE_PAPERS_LIST';

export const useQueryKey = (): [string, FilterBasePaper] => {
  const queryString = useQueryString();
  const { storageID } = useParams<{ storageID: string }>();

  return [
    QUERY_KEY,
    {
      gsm: queryString.get('gsm'),
      width: queryString.get('width'),
      io: queryString.get('io'),
      location: queryString.get('location'),
      storage_id: storageID
    }
  ];
};

const useSearchBasePaperList = () => {
  const queryKey = useQueryKey();

  return useInfiniteQuery(queryKey, searchBasePaper, {
    getNextPageParam: (page) => {
      return {
        cursor: page.cursor.next,
        dir: 'next',
        limit: 20
      };
    },
    retry: 0,
    enabled: false,
    cacheTime: 5 * 1000,
    staleTime: 5 * 1000,

  });
};

export default useSearchBasePaperList;
