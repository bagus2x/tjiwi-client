import { useQuery } from 'react-query';
import { minutesToMiliseconds } from '../../services/time';
import { privateClient, Success } from '../../services/web-api';

interface GetUserResponse {
  id: number;
  photo: string;
  username: string;
  email: string;
  createdAt: number;
  updatedAt: number;
}

const getUser = async () => {
  const res = await privateClient.get<Success<GetUserResponse>>('/users');

  return res.data.data;
};

export const useGetUser = () => {
  return useQuery('USER', getUser, {
    staleTime: minutesToMiliseconds(15)
  });
};
