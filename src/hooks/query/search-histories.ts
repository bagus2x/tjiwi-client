import { QueryFunctionContext, useInfiniteQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { privateClient, Success } from '../../services/web-api';
import useQueryString from '../query-string';

interface FilterHistories {
  storage_id: string | null;
  status: string | null;
  start: string | null;
  end: string | null;
}

interface PageParam {
  dir: 'next' | 'prev';
  cursor: number;
  limit: number;
}

export interface SearchHistoriesResponse {
  histories: Array<{
    id: number;
    basePaper: {
      id: number;
      gsm: number;
      width: number;
      io: number;
      materialNumber: number;
      quantity: number;
      location: string;
    };
    storageID: number;
    member: {
      id: string;
      photo: string;
      username: string;
    };
    affected: number;
    status: string;
    createdAt: number;
  }>;
  cursor: {
    next: number;
    previous: number;
  };
}

type QueryCtx = QueryFunctionContext<[string, FilterHistories], PageParam>;

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

  const url = `/histories/storage/${queryKey[1]?.storage_id}/search`;
  const res = await privateClient.get<Success<SearchHistoriesResponse>>(url, { params });

  if (!res.data.data.histories.length) throw new Error('Not found');

  return res.data.data;
};

export const QUERY_KEY = 'SEARCH_HISTORIES';

export const useQueryKey = (): [string, FilterHistories] => {
  const queryString = useQueryString();
  const { storageID } = useParams<{ storageID: string }>();

  return [
    QUERY_KEY,
    {
      storage_id: storageID,
      status: queryString.get('status'),
      start: queryString.get('start'),
      end: queryString.get('end')
    }
  ];
};

const useSearchHistories = () => {
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
    staleTime: 5 * 1000
  });
};

export default useSearchHistories;
