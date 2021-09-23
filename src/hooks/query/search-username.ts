import { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { publicClient, Success } from '../../services/web-api';

type SearchUsernamesResult = Array<{
  id: number;
  username: string;
  photo: string;
}>;

const searchUsernames = async (username: string) => {
  const res = await publicClient.get<Success<SearchUsernamesResult>>(`/users/search?username=${username}`);

  return res.data.data;
};

const useSearchUsernames = () => {
  const [data, setData] = useState<SearchUsernamesResult>([]);
  const [isError, setIsError] = useState(false);

  const handleUsernameChange = useDebouncedCallback(async (ev: ChangeEvent<any>) => {
    setIsError(false);

    if (!ev.target.value || ev.target.value.length < 3) return;

    try {
      const res = await searchUsernames(ev.target.value);
      setData(res);
    } catch (error) {
      setIsError(true);
    }
  }, 500);

  return {
    data,
    isError,
    handleUsernameChange
  };
};

export default useSearchUsernames;
